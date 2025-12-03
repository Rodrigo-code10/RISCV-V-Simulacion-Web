const instructionPaths = {
    // TIPO R:
    R: {
        color: 'r',
        path: [
            { type: 'component', id: 'pc' },
            { type: 'line', from: 'pc', fromPort: 'pc_out', to: 'sum-pc4', toPort: 'pc_in', offset: -25 },
            { type: 'component', id: 'sum-pc4' },
            { type: 'line', from: 'sum-pc4', fromPort: 'pc4_out', to: 'mux-pc', toPort: 'pc_normal', offset: 60 },
            { type: 'component', id: 'mux-pc' },
            { type: 'line', from: 'pc', fromPort: 'pc_out', to: 'mem-instr', toPort: 'address', offset: -65 },
            { type: 'component', id: 'mem-instr' },
            { type: 'line', from: 'mem-instr', fromPort: 'instr_out', to: 'decoder', toPort: 'instr_in', offset: 0 },
            { type: 'component', id: 'decoder' },
            { type: 'line', from: 'decoder', fromPort: 'rs1_out', to: 'reg-bank', toPort: 'rs1_addr', offset: 45 },
            { type: 'line', from: 'decoder', fromPort: 'rs2_out', to: 'reg-bank', toPort: 'rs2_addr', offset: 5 },
            { type: 'component', id: 'reg-bank' },
            { type: 'line', from: 'reg-bank', fromPort: 'rs1_data', to: 'alu', toPort: 'op1', offset: 40 },
            { type: 'line', from: 'reg-bank', fromPort: 'rs2_data', to: 'mux-alu', toPort: 'mux_rs2', offset: -45 },
            { type: 'component', id: 'mux-alu' },
            { type: 'line', from: 'mux-alu', fromPort: 'mux_out', to: 'alu', toPort: 'op2', offset: 0 },
            { type: 'component', id: 'alu' },
            { type: 'line', from: 'alu', fromPort: 'alu_result', to: 'mux-wb', toPort: 'wb_alu', offset: 40 },
            { type: 'component', id: 'mux-wb' },
            { type: 'line', from: 'mux-wb', fromPort: 'wb_out', to: 'reg-bank', toPort: 'wr_data', offset: 100 },
            { type: 'line', from: 'mux-pc', fromPort: 'pc_next', to: 'pc', toPort: 'pc_in', offset: 120 }
        ]
    },

    // TIPO I:
    I: {
        color: 'i',
        path: [
            { type: 'component', id: 'pc' },
            { type: 'line', from: 'pc', fromPort: 'pc_out', to: 'sum-pc4', toPort: 'pc_in', offset: -25 },
            { type: 'component', id: 'sum-pc4' },
            { type: 'line', from: 'sum-pc4', fromPort: 'pc4_out', to: 'mux-pc', toPort: 'pc_normal', offset: 60 },
            { type: 'component', id: 'mux-pc' },
            { type: 'line', from: 'pc', fromPort: 'pc_out', to: 'mem-instr', toPort: 'address', offset: -65 },
            { type: 'component', id: 'mem-instr' },
            { type: 'line', from: 'mem-instr', fromPort: 'instr_out', to: 'decoder', toPort: 'instr_in', offset: 0 },
            { type: 'component', id: 'decoder' },
            { type: 'line', from: 'decoder', fromPort: 'rs1_out', to: 'reg-bank', toPort: 'rs1_addr', offset: 45 },
            { type: 'line', from: 'decoder', fromPort: 'imm_out', to: 'sign-ext', toPort: 'imm_in', offset: 0 },
            { type: 'component', id: 'sign-ext' },
            { type: 'component', id: 'reg-bank' },
            { type: 'line', from: 'reg-bank', fromPort: 'rs1_data', to: 'alu', toPort: 'op1', offset: 40 },
            { type: 'line', from: 'sign-ext', fromPort: 'imm_ext', to: 'mux-alu', toPort: 'mux_imm', offset: -60 },
            { type: 'component', id: 'mux-alu' },
            { type: 'line', from: 'mux-alu', fromPort: 'mux_out', to: 'alu', toPort: 'op2', offset: 0 },
            { type: 'component', id: 'alu' },
            { type: 'line', from: 'alu', fromPort: 'alu_result', to: 'mux-wb', toPort: 'wb_alu', offset: 40 },
            { type: 'component', id: 'mux-wb' },
            { type: 'line', from: 'mux-wb', fromPort: 'wb_out', to: 'reg-bank', toPort: 'wr_data', offset: 100 },
            { type: 'line', from: 'mux-pc', fromPort: 'pc_next', to: 'pc', toPort: 'pc_in', offset: 120 }
        ]
    },

    // TIPO L:
    L: {
        color: 'l',
        path: [
            { type: 'component', id: 'pc' },
            { type: 'line', from: 'pc', fromPort: 'pc_out', to: 'sum-pc4', toPort: 'pc_in', offset: -25 },
            { type: 'component', id: 'sum-pc4' },
            { type: 'line', from: 'sum-pc4', fromPort: 'pc4_out', to: 'mux-pc', toPort: 'pc_normal', offset: 60 },
            { type: 'component', id: 'mux-pc' },
            { type: 'line', from: 'pc', fromPort: 'pc_out', to: 'mem-instr', toPort: 'address', offset: -65 },
            { type: 'component', id: 'mem-instr' },
            { type: 'line', from: 'mem-instr', fromPort: 'instr_out', to: 'decoder', toPort: 'instr_in', offset: 0 },
            { type: 'component', id: 'decoder' },
            { type: 'line', from: 'decoder', fromPort: 'rs1_out', to: 'reg-bank', toPort: 'rs1_addr', offset: 45 },
            { type: 'line', from: 'decoder', fromPort: 'imm_out', to: 'sign-ext', toPort: 'imm_in', offset: 0 },
            { type: 'component', id: 'sign-ext' },
            { type: 'component', id: 'reg-bank' },
            { type: 'line', from: 'reg-bank', fromPort: 'rs1_data', to: 'alu', toPort: 'op1', offset: 40 },
            { type: 'line', from: 'sign-ext', fromPort: 'imm_ext', to: 'mux-alu', toPort: 'mux_imm', offset: -60 },
            { type: 'component', id: 'mux-alu' },
            { type: 'line', from: 'mux-alu', fromPort: 'mux_out', to: 'alu', toPort: 'op2', offset: 0 },
            { type: 'component', id: 'alu' },
            { type: 'line', from: 'alu', fromPort: 'alu_result', to: 'mem-data', toPort: 'addr_in', offset: 15 },
            { type: 'component', id: 'mem-data' },
            { type: 'line', from: 'mem-data', fromPort: 'data_out', to: 'mux-wb', toPort: 'wb_mem', offset: -40 },
            { type: 'component', id: 'mux-wb' },
            { type: 'line', from: 'mux-wb', fromPort: 'wb_out', to: 'reg-bank', toPort: 'wr_data', offset: 100 },
            { type: 'line', from: 'mux-pc', fromPort: 'pc_next', to: 'pc', toPort: 'pc_in', offset: 120 }
        ]
    },

    // TIPO S:
    S: {
        color: 's',
        path: [
            { type: 'component', id: 'pc' },
            { type: 'line', from: 'pc', fromPort: 'pc_out', to: 'sum-pc4', toPort: 'pc_in', offset: -25 },
            { type: 'component', id: 'sum-pc4' },
            { type: 'line', from: 'sum-pc4', fromPort: 'pc4_out', to: 'mux-pc', toPort: 'pc_normal', offset: 60 },
            { type: 'component', id: 'mux-pc' },
            { type: 'line', from: 'pc', fromPort: 'pc_out', to: 'mem-instr', toPort: 'address', offset: -65 },
            { type: 'component', id: 'mem-instr' },
            { type: 'line', from: 'mem-instr', fromPort: 'instr_out', to: 'decoder', toPort: 'instr_in', offset: 0 },
            { type: 'component', id: 'decoder' },
            { type: 'line', from: 'decoder', fromPort: 'rs1_out', to: 'reg-bank', toPort: 'rs1_addr', offset: 45 },
            { type: 'line', from: 'decoder', fromPort: 'rs2_out', to: 'reg-bank', toPort: 'rs2_addr', offset: 5 },
            { type: 'line', from: 'decoder', fromPort: 'imm_out', to: 'sign-ext', toPort: 'imm_in', offset: 0 },
            { type: 'component', id: 'sign-ext' },
            { type: 'component', id: 'reg-bank' },
            { type: 'line', from: 'reg-bank', fromPort: 'rs1_data', to: 'alu', toPort: 'op1', offset: 40 },
            { type: 'line', from: 'sign-ext', fromPort: 'imm_ext', to: 'mux-alu', toPort: 'mux_imm', offset: -60 },
            { type: 'component', id: 'mux-alu' },
            { type: 'line', from: 'mux-alu', fromPort: 'mux_out', to: 'alu', toPort: 'op2', offset: 0 },
            { type: 'component', id: 'alu' },
            { type: 'line', from: 'alu', fromPort: 'alu_result', to: 'mem-data', toPort: 'addr_in', offset: 15 },
            { type: 'line', from: 'reg-bank', fromPort: 'rs2_data', to: 'mem-data', toPort: 'data_in', offset: -60 },
            { type: 'component', id: 'mem-data' },
            { type: 'line', from: 'mux-pc', fromPort: 'pc_next', to: 'pc', toPort: 'pc_in', offset: 120 }
        ]
    },

    // TIPO B:
    B: {
        color: 'b',
        path: [
            { type: 'component', id: 'pc' },
            { type: 'line', from: 'pc', fromPort: 'pc_out', to: 'sum-pc4', toPort: 'pc_in', offset: -25 },
            { type: 'component', id: 'sum-pc4' },
            { type: 'line', from: 'sum-pc4', fromPort: 'pc4_out', to: 'mux-pc', toPort: 'pc_normal', offset: 60 },
            { type: 'line', from: 'pc', fromPort: 'pc_out', to: 'sum-branch', toPort: 'pc_branch', offset: 70 },
            { type: 'line', from: 'pc', fromPort: 'pc_out', to: 'mem-instr', toPort: 'address', offset: -65 },
            { type: 'component', id: 'mem-instr' },
            { type: 'line', from: 'mem-instr', fromPort: 'instr_out', to: 'decoder', toPort: 'instr_in', offset: 0 },
            { type: 'component', id: 'decoder' },
            { type: 'line', from: 'decoder', fromPort: 'rs1_out', to: 'reg-bank', toPort: 'rs1_addr', offset: 45 },
            { type: 'line', from: 'decoder', fromPort: 'rs2_out', to: 'reg-bank', toPort: 'rs2_addr', offset: 5 },
            { type: 'line', from: 'decoder', fromPort: 'imm_out', to: 'sign-ext', toPort: 'imm_in', offset: 0 },
            { type: 'component', id: 'sign-ext' },
            { type: 'component', id: 'reg-bank' },
            { type: 'line', from: 'reg-bank', fromPort: 'rs1_data', to: 'alu', toPort: 'op1', offset: 40 },
            { type: 'line', from: 'reg-bank', fromPort: 'rs2_data', to: 'mux-alu', toPort: 'mux_rs2', offset: -45 },
            { type: 'component', id: 'mux-alu' },
            { type: 'line', from: 'mux-alu', fromPort: 'mux_out', to: 'alu', toPort: 'op2', offset: 0 },
            { type: 'component', id: 'alu' },
            { type: 'line', from: 'sign-ext', fromPort: 'imm_ext', to: 'sum-branch', toPort: 'offset_branch', offset: -80 },
            { type: 'component', id: 'sum-branch' },
            { type: 'line', from: 'sum-branch', fromPort: 'branch_result', to: 'mux-pc', toPort: 'pc_branch', offset: -50 },
            { type: 'component', id: 'mux-pc' },
            { type: 'line', from: 'mux-pc', fromPort: 'pc_next', to: 'pc', toPort: 'pc_in', offset: 120 }
        ]
    }
};

let activeInstruction = null;
let animationTimeout = null;
let allConnectionLines = [];
let currentStep = 0;

function getPortPosition(boxId, portName) {
    const box = document.getElementById(boxId);
    if (!box) return { x: 0, y: 0 };

    const boxRect = box.getBoundingClientRect();
    const port = box.querySelector(`[data-port="${portName}"]`);

    if (port) {
        const portRect = port.getBoundingClientRect();
        return {
            x: portRect.left + portRect.width / 2,
            y: portRect.top + portRect.height / 2
        };
    }

    return {
        x: boxRect.left + boxRect.width / 2,
        y: boxRect.top + boxRect.height / 2
    };
}

function createConnectionLine(id) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('id', id);
    line.setAttribute('class', 'connection-line');
    document.getElementById('connections-svg').appendChild(line);
    return line;
}

function drawConnection(lineId, from, to, offset = 0) {
    const startExtend = 50;
    const endExtend = 50;
    const midY = (from.y + to.y) / 2 + offset;

    const path = `M ${from.x} ${from.y}
                 L ${from.x + startExtend} ${from.y}
                 L ${from.x + startExtend} ${midY}
                 L ${to.x - endExtend} ${midY}
                 L ${to.x - endExtend} ${to.y}
                 L ${to.x} ${to.y}`;

    const line = document.getElementById(lineId);
    if (line) {
        line.setAttribute('d', path);
    }
}

function drawAllConnections() {
    allConnectionLines.forEach(lineId => {
        const line = document.getElementById(lineId);
        if (line) line.remove();
    });
    allConnectionLines = [];

    let lineCounter = 0;
    Object.keys(instructionPaths).forEach(instrType => {
        const config = instructionPaths[instrType];

        config.path.forEach(step => {
            if (step.type === 'line') {
                const lineId = `line-all-${lineCounter}`;
                createConnectionLine(lineId);

                const from = getPortPosition(step.from, step.fromPort);
                const to = getPortPosition(step.to, step.toPort);

                drawConnection(lineId, from, to, step.offset);
                allConnectionLines.push(lineId);
                lineCounter++;
            }
        });
    });
}

function activateInstruction(instruction) {
    if (activeInstruction === instruction) return;

    resetAll();
    activeInstruction = instruction;
    currentStep = 0;

    const config = instructionPaths[instruction];
    if (!config) return;

    // Activar botón
    document.querySelectorAll('.instr-button').forEach(btn => {
        if (btn.textContent.includes(instruction)) {
            btn.classList.add('active');
        }
    });

    // Iniciar animación secuencial
    animatePathStep(config);
}

function animatePathStep(config) {
    if (currentStep >= config.path.length) {
        return;
    }

    const step = config.path[currentStep];

    if (step.type === 'component') {
        // Activar componente
        const comp = document.getElementById(step.id);
        if (comp) {
            comp.classList.add(`active-${config.color}`);
            comp.classList.add('pulsing');

            const ports = comp.querySelectorAll('.port');
            ports.forEach(port => {
                port.classList.add(`active-${config.color}`);
            });
        }
    } else if (step.type === 'line') {
        // Crear y activar línea
        const lineId = `line-active-${currentStep}`;
        createConnectionLine(lineId);

        const from = getPortPosition(step.from, step.fromPort);
        const to = getPortPosition(step.to, step.toPort);

        drawConnection(lineId, from, to, step.offset);

        const line = document.getElementById(lineId);
        if (line) {
            line.classList.add(`active-${config.color}`);
        }
    }

    currentStep++;
    animationTimeout = setTimeout(() => animatePathStep(config), 300);
}

function resetAll() {
    if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
    }

    activeInstruction = null;
    currentStep = 0;

    document.querySelectorAll('.instr-button').forEach(btn => {
        btn.classList.remove('active');
    });

    document.querySelectorAll('.box').forEach(box => {
        box.classList.remove('active-r', 'active-i', 'active-l', 'active-s', 'active-b', 'pulsing');
    });

    document.querySelectorAll('.port').forEach(port => {
        port.classList.remove('active-r', 'active-i', 'active-l', 'active-s', 'active-b');
    });

    document.querySelectorAll('[id^="line-active-"]').forEach(line => {
        line.remove();
    });

    document.querySelectorAll('.box').forEach(box => {
        box.classList.add('pulsing');
    });
}
window.addEventListener('resize', drawAllConnections);
window.addEventListener('load', () => {
    drawAllConnections();
    document.querySelectorAll('.box').forEach(box => {
        box.classList.add('pulsing');
    });
});