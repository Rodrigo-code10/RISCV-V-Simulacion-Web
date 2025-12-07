import { mostrarMensaje } from './mensajes.js';

//Declaración de reglas aceptadas por RISCV-V
const ISA_RULES = {
    // R: rd, rs1, rs2
    add:  { fmt: 'R', args: ['rd','rs1','rs2'] },
    sub:  { fmt: 'R', args: ['rd','rs1','rs2'] },
    and:  { fmt: 'R', args: ['rd','rs1','rs2'] },
    or:   { fmt: 'R', args: ['rd','rs1','rs2'] },
    xor:  { fmt: 'R', args: ['rd','rs1','rs2'] },
    slt:  { fmt: 'R', args: ['rd','rs1','rs2'] },
    sltu: { fmt: 'R', args: ['rd','rs1','rs2'] },
    sll:  { fmt: 'R', args: ['rd','rs1','rs2'] },
    srl:  { fmt: 'R', args: ['rd','rs1','rs2'] },
    sra:  { fmt: 'R', args: ['rd','rs1','rs2'] },
  
    // I arithmetic: rd, rs1, imm
    addi:  { fmt: 'I', args: ['rd','rs1','imm'] },
    andi:  { fmt: 'I', args: ['rd','rs1','imm'] },
    ori:   { fmt: 'I', args: ['rd','rs1','imm'] },
    xori:  { fmt: 'I', args: ['rd','rs1','imm'] },
    slti:  { fmt: 'R', args: ['rd','rs1','imm'] },
    sltui: { fmt: 'R', args: ['rd','rs1','imm'] },
    slli:  { fmt: 'R', args: ['rd','rs1','imm'] },
    srli:  { fmt: 'R', args: ['rd','rs1','imm'] },
    srai:  { fmt: 'R', args: ['rd','rs1','imm'] },
  
    //Loads: rd, offset(base)
    lw:  { fmt: 'Ild', args: ['rd','offset'] },
  
    //Stores: rs2, offset(base)
    sw:  { fmt: 'S', args: ['rs2','offset'] },
  
    //Branches: rs1, rs2, label
    beq:  { fmt: 'B', args: ['rs1','rs2','label'] },
    bne:  { fmt: 'B', args: ['rs1','rs2','label'] },
    blt:  { fmt: 'B', args: ['rs1','rs2','label'] },
    bge:  { fmt: 'B', args: ['rs1','rs2','label'] },
    bltu: { fmt: 'B', args: ['rs1','rs2','label'] },
    bgeu: { fmt: 'B', args: ['rs1','rs2','label'] },
};


//Parsear la entrada para su validación
function isRegisterToken(tok) {
  if (!tok) return false;
  if (/^x([0-9]|[12][0-9]|3[01])$/.test(tok)) return true;
  const aliases = ['zero','ra','sp','gp','tp','t0','t1','t2','s0','s1','a0','a1','a2','a3','a4','a5','a6','a7',
                   's2','s3','s4','s5','s6','s7','s8','s9','s10','s11','t3','t4','t5','t6','fp'];
  return aliases.includes(tok);
}

function normalizeRegister(tok) {
  return tok;
}

function parseImmediateToken(tok) {
  if (tok === undefined || tok === null) throw new Error('Immediate ausente');
  const t = tok.trim();
  if (/^-?\d+$/.test(t)) return parseInt(t,10);
  if (/^-?0x[0-9a-fA-F]+$/.test(t)) return parseInt(t,16);
  return t;
}

function tokenizeLine(line) {
  //Quitar Comentarios
  const cIdxHash = line.indexOf('#');
  const cIdxSlash = line.indexOf('//');
  let cut = line;
  if (cIdxHash !== -1) cut = line.slice(0, cIdxHash);
  if (cIdxSlash !== -1) cut = cut.slice(0, cIdxSlash);
  cut = cut.trim();
  if (!cut) return [];

  const labelDecl = cut.match(/^([A-Za-z_\.][A-Za-z0-9_\.]*)\s*:\s*$/);
  if (labelDecl) return [{type:'label_decl', value: labelDecl[1]}];
  
  const labelInstr = cut.match(/^([A-Za-z_\.][A-Za-z0-9_\.]*)\s*:\s*(.+)$/);
  if (labelInstr) {
    const label = labelInstr[1];
    cut = labelInstr[2].trim();
    return [{type:'label_decl', value: label}].concat(_tokenizeInstr(cut));
  }

  return _tokenizeInstr(cut);
}

function _tokenizeInstr(instr) {
  const m = instr.match(/^([A-Za-z+.]+)\s*(.*)$/);
  if (!m) return [{type:'error', value: 'No pude leer instrucción'}];
  const opcode = m[1].toLowerCase();
  let rest = m[2].trim();
s
  const operands = [];
  let cur = '';
  let paren = 0;
  for (let ch of rest) {
    if (ch === '(') paren++;
    if (ch === ')') paren = Math.max(0, paren-1);
    if (ch === ',' && paren === 0) {
      operands.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) operands.push(cur.trim());

  const toks = [{type:'mnemonic', value: opcode}];  //Nomalizar
  for (const op of operands) {
    toks.push({type:'operand', value: op});
  }
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

  if (tokens[idx].type !== 'mnemonic') throw new Error('Falta mnemónica');
  const op = tokens[idx].value.toLowerCase();
  idx++;

  const rule = ISA_RULES[op];
  if (!rule) throw new Error(`Opcode desconocido: ${op}`);

  const operandStrs = [];
  while (idx < tokens.length) {
    if (tokens[idx].type === 'operand') operandStrs.push(tokens[idx].value);
    idx++;
  }

  if (operandStrs.length !== rule.args.length) {
    throw new Error(`Forma inválida para '${op}': se esperaban ${rule.args.length} operandos, vinieron ${operandStrs.length}`);
  }

  const args = {};
  for (let i = 0; i < rule.args.length; i++) {
    const need = rule.args[i];
    const raw = operandStrs[i];

    if (need === 'rd' || need === 'rs1' || need === 'rs2') {

      const r = raw.replace(/\s+/g,'');
      if (!isRegisterToken(r)) throw new Error(`Se esperaba registro (${need}) en '${op}', vino: '${raw}'`);
      args[need] = normalizeRegister(r);
    } else if (need === 'imm') {

      const maybe = raw.replace(/\s+/g,''); //Inmediato o etiqueta
      const parsed = parseImmediateToken(maybe);
      args.imm = parsed;
    } else if (need === 'label') {
      const name = raw.replace(/\s+/g,'');
      if (!/^[A-Za-z_\.][A-Za-z0-9_\.]*$/.test(name)) throw new Error(`Label inválida: '${raw}'`);
      args.label = name;
    } else if (need === 'label') {

      const m = raw.match(/^\s*(-?0x[0-9a-fA-F]+|-?\d+)\s*\(\s*([A-Za-z0-9_]+)\s*\)\s*$/);
      if (!m) throw new Error(`Se esperaba offset(base) como 12(x2), vino: '${raw}'`);
      const imm = parseImmediateToken(m[1]);
      const base = m[2];
      if (!isRegisterToken(base)) throw new Error(`Base inválida en offset(base): '${base}'`);
      args.offset = imm;
      args.base = normalizeRegister(base);
    } else {
      throw new Error(`Regla desconocida '${need}' para opcode ${op}`);
    }
  }

  const node = {
    mnemonic: op,
    format: rule.fmt,
    args,
    label: label || null,
    lineno
  };
  return node;
}

function buildIRFromCode(codeStr) {
  const lines = codeStr.split(/\r?\n/);
  const ir = [];
  const errors = [];
  for (let i = 0; i < lines.length; i++) {
    const lineno = i + 1;
    try {
      const tokens = tokenizeLine(lines[i]);
      if (tokens.length === 0) continue; // empty or comment only
      const node = parseTokensToIR(tokens, lineno);
      if (!node) continue;
      if (node.type === 'label_only') {
        ir.push({ type: 'label_only', label: node.label, lineno });
      } else {
        ir.push({ type: 'instr', ...node });
      }
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
        throw new Error(`Etiqueta duplicada '${node.label}' en línea ${node.lineno}`);
      }
      labelPos[node.label] = pcIndex * 4;
    } else if (node.type === 'instr') {
      if (node.label) {
        if (labelPos[node.label] !== undefined) throw new Error(`Etiqueta duplicada '${node.label}' en línea ${node.lineno}`);
        labelPos[node.label] = pcIndex * 4;
      }
      node.addr = pcIndex * 4; //Sumarle por instruccion
      pcIndex++;
    }
  }

  // Second pass: resolve label references (branches,)
  const final = [];
  const errors = [];
  for (const node of ir) {
    if (node.type !== 'instr') continue;
    const copy = JSON.parse(JSON.stringify(node)); // shallow copy
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

function saveIRToLocalStorage(programJSON) {    //Guardar en local
  localStorage.setItem('assemblyJSON', JSON.stringify(programJSON));
}

function showParserErrors(errors) {
  // try to show in a DOM container with id 'parser-errors'; if not present, log to console
  const container = document.getElementById('parser-errors');
  if (!container) {
    console.group('Parser Errors');
    errors.forEach(e => console.error(`Line ${e.lineno}: ${e.msg}`, e.raw ?? ''));
    console.groupEnd();
    return;
  }
  container.innerHTML = '';
  if (!errors || errors.length === 0) {
    container.innerHTML = '<div class="ok">Sin errores de parseo.</div>';
    return;
  }
  const ul = document.createElement('ul');
  ul.className = 'parser-error-list';
  errors.forEach(e => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>L${e.lineno}:</strong> ${escapeHtml(e.msg)} <pre class="raw">${escapeHtml(e.raw ?? '')}</pre>`;
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

function escapeHtml(s) {
  return (s+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}






const textarea = document.getElementById('editor');
const lineCounter = document.getElementById('linea-contador');
const btnLimpiar = document.querySelector('.btn');

if (!textarea) throw new Error('No encontré textarea#editor en el DOM');

function updateLineNumbers() {
  const lines = textarea.value.split(/\r?\n/).length;
  let s = '';
  for (let i = 1; i <= lines; i++) s += i + '\n';
  lineCounter.textContent = s.trim();
}

function validateAndSave() {
  const code = textarea.value;

  const { ir, errors: errs1 } = buildIRFromCode(code);

  if (errs1 && errs1.length) {
    showParserErrors(errs1);
    return { ok: false, errors: errs1 };
  }

  // Resolver labels
  const res = resolveLabels(ir);
  if (res.errors && res.errors.length) {
    showParserErrors(res.errors);
    return { ok: false, errors: res.errors };
  }

  // Save final IR
  const programJSON = {
    generatedAt: new Date().toISOString(),
    instructions: res.final,
    labels: res.labelPos
  };
  saveIRToLocalStorage(programJSON);
  showParserErrors([]); // clear errors, show OK
  console.log('Programa parseado y guardado en assemblyJSON:', programJSON);
  return { ok: true, programJSON };
}


let validateTimeout = null;
textarea.addEventListener('input', () => {
  updateLineNumbers();
  if (validateTimeout) clearTimeout(validateTimeout);
  validateTimeout = setTimeout(() => validateAndSave(), 300); // 300ms debounce
});

//Scroll con numereracion de linea
textarea.addEventListener('scroll', () => {
  lineCounter.scrollTop = textarea.scrollTop;
});

// Boton de limpiar
if (btnLimpiar) {
  btnLimpiar.addEventListener('click', () => {
    textarea.value = '';
    updateLineNumbers();
    showParserErrors([]);
    localStorage.removeItem('assemblyCode');
    localStorage.removeItem('assemblyJSON');
  });
}

(function init() {

  const saved = localStorage.getItem('assemblyCode');
  if (saved) {
    textarea.value = saved;
  }
  updateLineNumbers();

  //Validar y guardar
  const result = validateAndSave();
  textarea.addEventListener('input', () => {
    localStorage.setItem('assemblyCode', textarea.value);
  });
})();