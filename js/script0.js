(function(){
    let tc = document.getElementById("toast-container");
    if (!tc) {
        tc = document.createElement("div");
        tc.id = "toast-container";
        tc.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            display: flex;
            flex-direction: column-reverse;
            gap: 10px;
            z-index: 99999;
        `;
        document.body.appendChild(tc);
    }
})();

// Notificaciones apilables
function mostrarMensaje(mensaje, color) {
    const div = document.createElement('div');
    div.textContent = mensaje;
    div.style.cssText = `
        padding: 12px 20px;
        border-radius: 6px;
        color: white;
        background: ${color};
        font-family: monospace;
        box-shadow: 0 0 10px rgba(0,0,0,.25);
        animation: fadeIn .25s ease-out, fadeOut .25s ease-out 2.5s forwards;
    `;
    document.getElementById("toast-container").appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

//Declaración de reglas aceptadas por RISCV-V
const ISA_RULES = {
    // R: rd, rs1, rs2
    add:  { fmt: 'R', args: ['rd', 'rs1', 'rs2'] },
    sub:  { fmt: 'R', args: ['rd', 'rs1', 'rs2'] },
    and:  { fmt: 'R', args: ['rd', 'rs1', 'rs2'] },
    or:   { fmt: 'R', args: ['rd', 'rs1', 'rs2'] },
    xor:  { fmt: 'R', args: ['rd', 'rs1', 'rs2'] },
    slt:  { fmt: 'R', args: ['rd', 'rs1', 'rs2'] },
    sltu: { fmt: 'R', args: ['rd', 'rs1', 'rs2'] },
    sll:  { fmt: 'R', args: ['rd', 'rs1', 'rs2'] },
    srl:  { fmt: 'R', args: ['rd', 'rs1', 'rs2'] },
    sra:  { fmt: 'R', args: ['rd', 'rs1', 'rs2'] },

    // I arithmetic: rd, rs1, imm
    addi: { fmt: 'I', args: ['rd', 'rs1', 'imm'] },
    andi: { fmt: 'I', args: ['rd', 'rs1', 'imm'] },
    ori:  { fmt: 'I', args: ['rd', 'rs1', 'imm'] },
    xori: { fmt: 'I', args: ['rd', 'rs1', 'imm'] },
    slti: { fmt: 'I', args: ['rd', 'rs1', 'imm'] },
    sltui:{ fmt: 'I', args: ['rd', 'rs1', 'imm'] },
    slli: { fmt: 'I', args: ['rd', 'rs1', 'imm'] },
    srli: { fmt: 'I', args: ['rd', 'rs1', 'imm'] },
    srai: { fmt: 'I', args: ['rd', 'rs1', 'imm'] },

    //Loads: rd, offset(base)
    lw:   { fmt: 'Ild', args: ['rd', 'offset'] },

    //Stores: rs2, offset(base)
    sw:   { fmt: 'S', args: ['rs2', 'offset'] },

    //Branches: rs1, rs2, label
    beq:  { fmt: 'B', args: ['rs1', 'rs2', 'label'] },
    bne:  { fmt: 'B', args: ['rs1', 'rs2', 'label'] },
    blt:  { fmt: 'B', args: ['rs1', 'rs2', 'label'] },
    bge:  { fmt: 'B', args: ['rs1', 'rs2', 'label'] },
    bltu: { fmt: 'B', args: ['rs1', 'rs2', 'label'] },
    bgeu: { fmt: 'B', args: ['rs1', 'rs2', 'label'] },
};

function isRegisterToken(tok) {
    if (!tok) return false;
    if (/^x([0-9]|[12][0-9]|3[01])$/.test(tok)) return true;
    const aliases = ['zero', 'ra', 'sp', 'gp', 'tp', 't0', 't1', 't2', 's0', 's1', 'a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7',
        's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 't3', 't4', 't5', 't6', 'fp'];
    return aliases.includes(tok);
}

function normalizeRegister(tok) { return tok; }

function parseImmediateToken(tok) {
    if (tok === undefined || tok === null) {
        throw new Error('Immediate ausente');
    }
    const t = tok.trim();
    if (/^-?\d+$/.test(t)) return parseInt(t, 10);
    if (/^-?0x[0-9a-fA-F]+$/.test(t)) return parseInt(t, 16);
    throw new Error(`Immediate inválido: ${tok}`);
}

function tokenizeLine(line) {
    const cIdxHash = line.indexOf('#');
    const cIdxSlash = line.indexOf('//');

    let cut = line;
    if (cIdxHash !== -1) cut = line.slice(0, cIdxHash);
    if (cIdxSlash !== -1) cut = cut.slice(0, cIdxSlash);

    cut = cut.trim();
    if (!cut) return [];

    const labelDecl = cut.match(/^([A-Za-z_\.][A-Za-z0-9_\.]*)\s*:\s*$/);
    if (labelDecl) return [{ type: 'label_decl', value: labelDecl[1] }];

    const labelInstr = cut.match(/^([A-Za-z_\.][A-Za-z0-9_\.]*)\s*:\s*(.+)$/);
    if (labelInstr) {
        const label = labelInstr[1];
        cut = labelInstr[2].trim();
        return [{ type: 'label_decl', value: label }].concat(_tokenizeInstr(cut));
    }

    return _tokenizeInstr(cut);
}

function _tokenizeInstr(instr) {
    instr = instr.replace(/;$/, "");

    const m = instr.match(/^([A-Za-z+.]+)\s*(.*)$/);
    if (!m) {
        return [{ type: 'error', value: 'No pude leer instrucción' }];
    }

    const opcode = m[1].toLowerCase();
    let rest = m[2].trim();
    const operands = [];
    let cur = '';
    let paren = 0;

    for (let ch of rest) {
        if (ch === '(') paren++;
        if (ch === ')') paren = Math.max(0, paren - 1);

        if (ch === ',' && paren === 0) {
            operands.push(cur.replace(/;$/, "").trim());
            cur = '';
        } else {
            cur += ch;
        }
    }
    if (cur.trim()) operands.push(cur.replace(/;$/, "").trim());

    const clean = operands.filter(op => op !== "");
    const toks = [{ type: 'mnemonic', value: opcode }];
    for (const op of clean) toks.push({ type: 'operand', value: op });
    return toks;
}

function parseTokensToIR(tokens, lineno) {
    let idx = 0;
    let label = null;

    if (tokens.length === 0) return null;

    if (tokens[0].type === 'label_decl') {
        label = tokens[0].value;
        idx++;
        if (idx >= tokens.length) {
            return { type: 'label_only', label, lineno };
        }
    }

    if (tokens[idx].type !== 'mnemonic') {
        throw new Error('Falta mnemónica');
    }

    const op = tokens[idx].value.toLowerCase();
    idx++;

    const rule = ISA_RULES[op];
    if (!rule) {
        throw new Error(`Opcode desconocido: ${op}`);
    }

    const operandStrs = [];
    while (idx < tokens.length) {
        if (tokens[idx].type === 'operand')
            operandStrs.push(tokens[idx].value);
        idx++;
    }

    if (operandStrs.length !== rule.args.length) {
        throw new Error(
            `Forma inválida para '${op}': se esperaban ${rule.args.length}, vinieron ${operandStrs.length}`
        );
    }

    const args = {};

    for (let i = 0; i < rule.args.length; i++) {
        const need = rule.args[i];
        const raw = operandStrs[i];
        const r = raw.replace(/\s+/g, '');

        if (need === 'rd' || need === 'rs1' || need === 'rs2') {

            if (!isRegisterToken(r)) {
                throw new Error(`Se esperaba registro (${need}) en '${op}', vino '${raw}'`);
            }
            args[need] = normalizeRegister(r);

        } else if (need === 'imm') {

            const parsed = parseImmediateToken(r);
            args.imm = parsed;

        } else if (need === 'label') {

            if (!/^[A-Za-z_\.][A-Za-z0-9_\.]*$/.test(r)) {
                throw new Error(`Label inválida: ${raw}`);
            }
            args.label = r;

        } else if (need === 'offset') {

            const m = raw.match(/^\s*(-?0x[0-9a-fA-F]+|-?\d+)\s*\(\s*([A-Za-z0-9_]+)\s*\)\s*$/);
            if (!m) {
                throw new Error(`Se esperaba offset(base) como 12(x2), vino '${raw}'`);
            }

            const imm = parseImmediateToken(m[1]);
            const base = m[2];

            if (!isRegisterToken(base)) {
                throw new Error(`Base inválida en offset(base): '${base}'`);
            }

            args.offset = imm;
            args.base = normalizeRegister(base);

        } else {
            throw new Error(`Regla desconocida '${need}' para opcode ${op}`);
        }
    }

    return {
        type: 'instr',
        mnemonic: op,
        format: rule.fmt,
        args,
        label: label || null,
        lineno
    };
}

function buildIRFromCode(codeStr) {
    const lines = codeStr.split(/\r?\n/);
    const ir = [];
    const errors = [];

    for (let i = 0; i < lines.length; i++) {
        const lineno = i + 1;

        try {
            const tokens = tokenizeLine(lines[i]);
            if (tokens.length === 0) continue;

            const node = parseTokensToIR(tokens, lineno);
            if (!node) continue;

            ir.push(node);

        } catch (e) {
            errors.push({ lineno, msg: e.message, raw: lines[i] });
        }
    }

    return { ir, errors };
}

function resolveLabels(ir) {
    const labelPos = {};
    let pcIndex = 0;

    for (const node of ir) {

        if (node.type === 'label_only') {
            if (labelPos[node.label] !== undefined) {
                throw new Error(`Etiqueta duplicada '${node.label}'`);
            }
            labelPos[node.label] = pcIndex * 4;     //Cambiar si es que se va a manejar de 1 por 1

        } else if (node.type === 'instr') {

            if (node.label) {
                if (labelPos[node.label] !== undefined) {
                    throw new Error(`Etiqueta duplicada '${node.label}'`);
                }
                labelPos[node.label] = pcIndex * 4;     //Cambiar si es que se va a manejar de 1 por 1
            }

            node.addr = pcIndex * 4;        //Cambiar si es que se va a manejar de 1 por 1
            pcIndex++;
        }
    }

    const final = [];
    const errors = [];

    for (const node of ir) {
        if (node.type !== 'instr') continue;

        const copy = JSON.parse(JSON.stringify(node));

        if (copy.args && copy.args.label) {
            const lbl = copy.args.label;

            if (labelPos[lbl] === undefined) {
                errors.push({ lineno: copy.lineno, msg: `Etiqueta no definida: ${lbl}` });
            } else {
                copy.args.imm = labelPos[lbl] - copy.addr;
                delete copy.args.label;
            }
        }

        final.push(copy);
    }

    return { final, labelPos, errors };
}

function saveIRToLocalStorage(programJSON) {
    localStorage.setItem('assemblyJSON', JSON.stringify(programJSON));
}

function escapeHtml(s) {
    return (s + '').replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function showParserErrors(errors) {
    if (!errors || errors.length === 0) return;

    errors.forEach(e => {
        const msg = e.raw
            ? `L${e.lineno}: ${e.msg} → "${e.raw}"`
            : `L${e.lineno}: ${e.msg}`;
        mostrarMensaje(msg, "red");
    });
}

function validateAndSave() {
    const code = textarea.value;

    const { ir, errors: errs1 } = buildIRFromCode(code);

    if (errs1 && errs1.length) {
        showParserErrors(errs1);
        mostrarMensaje("Corrige los errores", "red");
        return { ok: false, errors: errs1 };
    }

    let res;
    try {
        res = resolveLabels(ir);
    } catch (e) {
        mostrarMensaje(e.message, "red");
        mostrarMensaje("Corrige los errores", "red");
        return { ok: false, errors: [e.message] };
    }

    if (res.errors && res.errors.length) {
        showParserErrors(res.errors);
        mostrarMensaje("Corrige los errores", "red");
        return { ok: false, errors: res.errors };
    }

    const programJSON = {
        generatedAt: new Date().toISOString(),
        instructions: res.final,
        labels: res.labelPos
    };

    saveIRToLocalStorage(programJSON);

    mostrarMensaje("Código ensamblado correctamente", "green");

    return { ok: true, programJSON };
}

const textarea = document.getElementById('editor');
const lineCounter = document.getElementById('linea-contador');
const btnLimpiar = document.querySelector('.btn');

if (!textarea) throw new Error("No encontré textarea#editor");

function updateLineNumbers() {
    const lines = textarea.value.split(/\r?\n/).length;
    let s = '';
    for (let i = 1; i <= lines; i++) s += i + '\n';
    lineCounter.textContent = s.trim();
}

let validateTimeout = null;
textarea.addEventListener('input', () => {
    updateLineNumbers();
    localStorage.setItem('assemblyCode', textarea.value);
});

textarea.addEventListener('scroll', () => {
    lineCounter.scrollTop = textarea.scrollTop;
});

if (btnLimpiar) {
    btnLimpiar.addEventListener('click', () => {
        textarea.value = '';
        updateLineNumbers();
        localStorage.removeItem('assemblyCode');
        localStorage.removeItem('assemblyJSON');
    });
}

(function init() {
    const saved = localStorage.getItem('assemblyCode');
    if (saved) textarea.value = saved;

    updateLineNumbers();
    validateAndSave();

    textarea.addEventListener('input', () => {
        localStorage.setItem('assemblyCode', textarea.value);
    });
})();

const btnSimulador = document.getElementById("tab-simulador");
btnSimulador.addEventListener("click", () => {
    const res = validateAndSave();

    if (!res.ok) {
        return;
    }
    window.location.href = 'index.html';
});