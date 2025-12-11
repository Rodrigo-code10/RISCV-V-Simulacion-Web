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


const instructionPaths = {
    R: {
        color: 'r',
        components: ['pc', 'mem-prog', 'decoder', 'control-unit', 'sign-ext', 'reg-bank', 'mux-d1', 'alu', 'mux-wb', 'sum-pc4', 'mux-pc'],
        connections: [
            // PC -> Memoria de Programa
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'mem-prog', toPort: 'addr_prog',
                waypoints: [
                    { x: 140, y: 100 },
                    { x: 200, y: 100 }
                ]
            },
            // PC -> Sumador PC+4
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'sum-pc4', toPort: 'pc_4_in',
                waypoints: [
                    { x: 140, y: 100 },
                    { x: 140, y: 240 },
                    { x: 105, y: 240 },
                    { x: 105, y: 270 }
                ]
            },
            // Decodificador -> Banco de Registro
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'reg-bank', toPort: 'wr_addr',
                waypoints: [
                    { x: 590, y: 85 },
                    { x: 630, y: 85 },
                    { x: 630, y: 430 },
                    { x: 420, y: 430 },
                    { x: 420, y: 376 }
                ]
            },
            // Memoria Programa -> Decodificador
            {
                from: 'mem-prog', fromPort: 'instr_prog',
                to: 'decoder', toPort: 'instr_in',
                waypoints: [
                    { x: 270, y: 170 },
                    { x: 270, y: 170 },
                    { x: 400, y: 170 },
                    { x: 400, y: 120 }
                ]
            },
            // Decodificador -> Unidad Control (opcode)
            {
                from: 'decoder', fromPort: 'opcode_out',
                to: 'control-unit', toPort: 'opcode_in',
                waypoints: [
                    { x: 500, y: 40 },
                    { x: 500, y: 10 },
                    { x: 800, y: 10 },
                    { x: 800, y: 220 },
                    { x: 750, y: 220 },
                    { x: 750, y: 420 },
                    { x: 800, y: 420 }
                ]
            },
            // Decodificador -> Sign Extend
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'sign-ext', toPort: 'imm_in',
                waypoints: [
                    { x: 590, y: 85 },
                    { x: 640, y: 85 },
                    { x: 640, y: 105 }
                ]
            },
            // Decodificador -> Banco Registros (rs1)
            {
                from: 'decoder', fromPort: 'rs1_out',
                to: 'reg-bank', toPort: 'rs1_addr',
                waypoints: [
                    { x: 590, y: 153 },
                    { x: 640, y: 153 },
                    { x: 640, y: 230 },
                    { x: 499, y: 230 }
                ]
            },
            // Decodificador -> Banco Registros (rs2)
            {
                from: 'decoder', fromPort: 'rs2_out',
                to: 'reg-bank', toPort: 'rs2_addr',
                waypoints: [
                    { x: 590, y: 120 },
                    { x: 630, y: 120 },
                    { x: 630, y: 220 },
                    { x: 546, y: 220 }
                ]
            },
            // Banco Registros do1 -> ALU op1
            {
                from: 'reg-bank', fromPort: 'do1_out',
                to: 'alu', toPort: 'op1',
                waypoints: [
                    { x: 620, y: 306 },
                    { x: 660, y: 306 },
                    { x: 660, y: 300 },
                    { x: 780, y: 300 },
                    { x: 780, y: 286 },
                    { x: 790, y: 286 }
                ]
            },
            // Banco Registros do2 -> MUX d1
            {
                from: 'reg-bank', fromPort: 'do2_out',
                to: 'mux-d1', toPort: 'd1_do2',
                waypoints: [
                    { x: 620, y: 338 },
                    { x: 650, y: 338 },
                    { x: 650, y: 338 },
                    { x: 705, y: 338 },
                    { x: 705, y: 300 }
                ]
            },
            // Sign Extend -> MUX d1
            {
                from: 'sign-ext', fromPort: 'imm_ext',
                to: 'mux-d1', toPort: 'd1_imm',
                waypoints: [
                    { x: 770, y: 105 },
                    { x: 800, y: 105 },
                    { x: 800, y: 180 },
                    { x: 680, y: 180 },
                    { x: 680, y: 232 }
                ]
            },
            // MUX d1 -> ALU op2
            {
                from: 'mux-d1', fromPort: 'd1_out',
                to: 'alu', toPort: 'op2',
                waypoints: [
                    { x: 740, y: 250 },
                    { x: 770, y: 250 },
                    { x: 770, y: 334 },
                    { x: 790, y: 334 }
                ]
            },
            // Unidad Control -> Banco Registros (RegWrite)
            {
                from: 'control-unit', fromPort: 'cu_out1',
                to: 'reg-bank', toPort: 'reg_write',
                waypoints: [
                    { x: 720, y: 477 },
                    { x: 483, y: 477 }
                ]
            },
            // Unidad Control -> MUX d1 (ALUSrc)
            {
                from: 'control-unit', fromPort: 'cu_out2',
                to: 'mux-d1', toPort: 'd1_control',
                waypoints: [
                    { x: 670, y: 500 },
                    { x: 670, y: 200 },
                    { x: 705, y: 200 }
                ]
            },
            // Unidad Control -> MUX WB (MemtoReg)
            {
                from: 'control-unit', fromPort: 'cu_out3',
                to: 'mux-wb', toPort: 'wb_control',
                waypoints: [
                    { x: 720, y: 523 },
                    { x: 720, y: 580 },
                    { x: 1040, y: 580 },
                    { x: 1040, y: 419 }
                ]
            },
            // Unidad Control -> ALU (ALUOp)
            {
                from: 'control-unit', fromPort: 'cu_out4',
                to: 'alu', toPort: 'alu_control',
                waypoints: [
                    { x: 880, y: 477 },
                    { x: 900, y: 477 },
                    { x: 900, y: 380 },
                    { x: 850, y: 380 }
                ]
            },
            // ALU -> MUX WB
            {
                from: 'alu', fromPort: 'alu_result',
                to: 'mux-wb', toPort: 'wb_alu',
                waypoints: [
                    { x: 910, y: 310 },
                    { x: 960, y: 310 },
                    { x: 960, y: 420 }
                ]
            },
            // MUX WB -> Banco Registros
            {
                from: 'mux-wb', fromPort: 'wb_out',
                to: 'reg-bank', toPort: 'wr_data',
                waypoints: [
                    { x: 1005, y: 470 },
                    { x: 1005, y: 590 },
                    { x: 380, y: 590 },
                    { x: 380, y: 420 },
                    { x: 578, y: 420 }
                ]
            },
            // Sumador PC+4 -> MUX PC
            {
                from: 'sum-pc4', fromPort: 'pc4_out',
                to: 'mux-pc', toPort: 'pc_normal',
                waypoints: [
                    { x: 150, y: 315 },
                    { x: 155, y: 315 },
                    { x: 155, y: 380 },
                    { x: 125, y: 380 }
                ]
            },
            // MUX PC -> PC
            {
                from: 'mux-pc', fromPort: 'pc_next',
                to: 'pc', toPort: 'pc_in',
                waypoints: [
                    { x: 125, y: 550 },
                    { x: 10, y: 550 },
                    { x: 10, y: 490 },
                    { x: 10, y: 100 },
                    { x: 40, y: 100 }
                ]
            }
        ]
    },

    I: {
        color: 'i',
        components: ['pc', 'mem-prog', 'decoder', 'control-unit', 'sign-ext', 'reg-bank', 'mux-d1', 'alu', 'mux-wb', 'sum-pc4', 'mux-pc'],
        connections: [
            // PC -> Memoria de Programa
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'mem-prog', toPort: 'addr_prog',
                waypoints: [
                    { x: 140, y: 100 },
                    { x: 200, y: 100 }
                ]
            },
            // PC -> Sumador PC+4
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'sum-pc4', toPort: 'pc_4_in',
                waypoints: [
                    { x: 140, y: 100 },
                    { x: 140, y: 240 },
                    { x: 105, y: 240 },
                    { x: 105, y: 270 }
                ]
            },
            // Memoria Programa -> Decodificador
            {
                from: 'mem-prog', fromPort: 'instr_prog',
                to: 'decoder', toPort: 'instr_in',
                waypoints: [
                    { x: 270, y: 170 },
                    { x: 270, y: 170 },
                    { x: 400, y: 170 },
                    { x: 400, y: 120 }
                ]
            },
            // Decodificador -> Unidad Control (opcode)
            {
                from: 'decoder', fromPort: 'opcode_out',
                to: 'control-unit', toPort: 'opcode_in',
                waypoints: [
                    { x: 500, y: 40 },
                    { x: 500, y: 10 },
                    { x: 800, y: 10 },
                    { x: 800, y: 220 },
                    { x: 750, y: 220 },
                    { x: 750, y: 420 },
                    { x: 800, y: 420 }
                ]
            },
            // Decodificador -> Banco Registros (rs1)
            {
                from: 'decoder', fromPort: 'rs1_out',
                to: 'reg-bank', toPort: 'rs1_addr',
                waypoints: [
                    { x: 590, y: 153 },
                    { x: 640, y: 153 },
                    { x: 640, y: 230 },
                    { x: 499, y: 230 }
                ]
            },
            // Decodificador -> Sign Extend
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'sign-ext', toPort: 'imm_in',
                waypoints: [
                    { x: 590, y: 85 },
                    { x: 640, y: 85 },
                    { x: 640, y: 105 }
                ]
            },
            // Decodificador -> Banco de Registro
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'reg-bank', toPort: 'wr_addr',
                waypoints: [
                    { x: 590, y: 85 },
                    { x: 630, y: 85 },
                    { x: 630, y: 430 },
                    { x: 420, y: 430 },
                    { x: 420, y: 376 }
                ]
            },
            // Sign Extend -> MUX d1
            {
                from: 'sign-ext', fromPort: 'imm_ext',
                to: 'mux-d1', toPort: 'd1_imm',
                waypoints: [
                    { x: 770, y: 105 },
                    { x: 800, y: 105 },
                    { x: 800, y: 180 },
                    { x: 680, y: 180 },
                    { x: 680, y: 232 }
                ]
            },
            // Banco Registros do1 -> ALU op1
            {
                from: 'reg-bank', fromPort: 'do1_out',
                to: 'alu', toPort: 'op1',
                waypoints: [
                    { x: 620, y: 306 },
                    { x: 660, y: 306 },
                    { x: 660, y: 300 },
                    { x: 780, y: 300 },
                    { x: 780, y: 286 },
                    { x: 790, y: 286 }
                ]
            },
            // MUX d1 -> ALU op2
            {
                from: 'mux-d1', fromPort: 'd1_out',
                to: 'alu', toPort: 'op2',
                waypoints: [
                    { x: 740, y: 250 },
                    { x: 770, y: 250 },
                    { x: 770, y: 334 },
                    { x: 790, y: 334 }
                ]
            },
            // ALU -> MUX WB
            {
                from: 'alu', fromPort: 'alu_result',
                to: 'mux-wb', toPort: 'wb_alu',
                waypoints: [
                    { x: 910, y: 310 },
                    { x: 960, y: 310 },
                    { x: 960, y: 420 }
                ]
            },
            // Unidad Control -> Banco Registros (RegWrite)
            {
                from: 'control-unit', fromPort: 'cu_out1',
                to: 'reg-bank', toPort: 'reg_write',
                waypoints: [
                    { x: 720, y: 477 },
                    { x: 483, y: 477 }
                ]
            },
            // Unidad Control -> MUX d1 (ALUSrc)
            {
                from: 'control-unit', fromPort: 'cu_out2',
                to: 'mux-d1', toPort: 'd1_control',
                waypoints: [
                    { x: 670, y: 500 },
                    { x: 670, y: 200 },
                    { x: 705, y: 200 }
                ]
            },
            // Unidad Control -> MUX WB (MemtoReg)
            {
                from: 'control-unit', fromPort: 'cu_out3',
                to: 'mux-wb', toPort: 'wb_control',
                waypoints: [
                    { x: 720, y: 523 },
                    { x: 720, y: 580 },
                    { x: 1040, y: 580 },
                    { x: 1040, y: 419 }
                ]
            },
            // Unidad Control -> ALU (ALUOp)
            {
                from: 'control-unit', fromPort: 'cu_out4',
                to: 'alu', toPort: 'alu_control',
                waypoints: [
                    { x: 880, y: 477 },
                    { x: 900, y: 477 },
                    { x: 900, y: 380 },
                    { x: 850, y: 380 }
                ]
            },
            // MUX WB -> Banco Registros
            {
                from: 'mux-wb', fromPort: 'wb_out',
                to: 'reg-bank', toPort: 'wr_data',
                waypoints: [
                    { x: 1005, y: 470 },
                    { x: 1005, y: 590 },
                    { x: 380, y: 590 },
                    { x: 380, y: 420 },
                    { x: 578, y: 420 }
                ]
            },
            // Sumador PC+4 -> MUX PC
            {
                from: 'sum-pc4', fromPort: 'pc4_out',
                to: 'mux-pc', toPort: 'pc_normal',
                waypoints: [
                    { x: 150, y: 315 },
                    { x: 155, y: 315 },
                    { x: 155, y: 380 },
                    { x: 125, y: 380 }
                ]
            },
            // MUX PC -> PC
            {
                from: 'mux-pc', fromPort: 'pc_next',
                to: 'pc', toPort: 'pc_in',
                waypoints: [
                    { x: 125, y: 550 },
                    { x: 10, y: 550 },
                    { x: 10, y: 490 },
                    { x: 10, y: 100 },
                    { x: 40, y: 100 }
                ]
            }
        ]
    },

    L: {
        color: 'l',
        components: ['pc', 'mem-prog', 'decoder', 'control-unit', 'sign-ext', 'reg-bank', 'mux-d1', 'alu', 'mem-data', 'mux-wb', 'sum-pc4', 'mux-pc'],
        connections: [
            // PC -> Memoria de Programa
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'mem-prog', toPort: 'addr_prog',
                waypoints: [
                    { x: 140, y: 100 },
                    { x: 200, y: 100 }
                ]
            },
            // PC -> Sumador PC+4
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'sum-pc4', toPort: 'pc_4_in',
                waypoints: [
                    { x: 140, y: 100 },
                    { x: 140, y: 240 },
                    { x: 105, y: 240 },
                    { x: 105, y: 270 }
                ]
            },
            // Memoria Programa -> Decodificador
            {
                from: 'mem-prog', fromPort: 'instr_prog',
                to: 'decoder', toPort: 'instr_in',
                waypoints: [
                    { x: 270, y: 170 },
                    { x: 270, y: 170 },
                    { x: 400, y: 170 },
                    { x: 400, y: 120 }
                ]
            },
            // Decodificador -> Unidad Control (opcode)
            {
                from: 'decoder', fromPort: 'opcode_out',
                to: 'control-unit', toPort: 'opcode_in',
                waypoints: [
                    { x: 500, y: 40 },
                    { x: 500, y: 10 },
                    { x: 800, y: 10 },
                    { x: 800, y: 220 },
                    { x: 750, y: 220 },
                    { x: 750, y: 420 },
                    { x: 800, y: 420 }
                ]
            },
            // Decodificador -> Banco Registros (rs1)
            {
                from: 'decoder', fromPort: 'rs1_out',
                to: 'reg-bank', toPort: 'rs1_addr',
                waypoints: [
                    { x: 590, y: 153 },
                    { x: 640, y: 153 },
                    { x: 640, y: 230 },
                    { x: 499, y: 230 }
                ]
            },
            // Decodificador -> Sign Extend
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'sign-ext', toPort: 'imm_in',
                waypoints: [
                    { x: 590, y: 85 },
                    { x: 640, y: 85 },
                    { x: 640, y: 105 }
                ]
            },
            // Decodificador -> Banco de Registro
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'reg-bank', toPort: 'wr_addr',
                waypoints: [
                    { x: 590, y: 85 },
                    { x: 630, y: 85 },
                    { x: 630, y: 430 },
                    { x: 420, y: 430 },
                    { x: 420, y: 376 }
                ]
            },
            // Sign Extend -> MUX d1
            {
                from: 'sign-ext', fromPort: 'imm_ext',
                to: 'mux-d1', toPort: 'd1_imm',
                waypoints: [
                    { x: 770, y: 105 },
                    { x: 800, y: 105 },
                    { x: 800, y: 180 },
                    { x: 680, y: 180 },
                    { x: 680, y: 232 }
                ]
            },
            // Banco Registros -> ALU
            {
                from: 'reg-bank', fromPort: 'do1_out',
                to: 'alu', toPort: 'op1',
                waypoints: [
                    { x: 620, y: 306 },
                    { x: 660, y: 306 },
                    { x: 660, y: 300 },
                    { x: 780, y: 300 },
                    { x: 780, y: 286 },
                    { x: 790, y: 286 }
                ]
            },
            // MUX d1 -> ALU
            {
                from: 'mux-d1', fromPort: 'd1_out',
                to: 'alu', toPort: 'op2',
                waypoints: [
                    { x: 740, y: 250 },
                    { x: 770, y: 250 },
                    { x: 770, y: 334 },
                    { x: 790, y: 334 }
                ]
            },
            // ALU -> Memoria Datos (dirección)
            {
                from: 'alu', fromPort: 'alu_result',
                to: 'mem-data', toPort: 'addr_in',
                waypoints: [
                    { x: 910, y: 310 },
                    { x: 950, y: 310 },
                    { x: 950, y: 162 },
                    { x: 970, y: 162 }
                ]
            },
            // Memoria Datos -> MUX WB
            {
                from: 'mem-data', fromPort: 'data_out',
                to: 'mux-wb', toPort: 'wb_mem',
                waypoints: [
                    { x: 1050, y: 340 },
                    { x: 1050, y: 365 },
                    { x: 1005, y: 365 },
                    { x: 1005, y: 370 }
                ]
            },
            // MUX WB -> Banco Registros
            {
                from: 'mux-wb', fromPort: 'wb_out',
                to: 'reg-bank', toPort: 'wr_data',
                waypoints: [
                    { x: 1005, y: 470 },
                    { x: 1005, y: 590 },
                    { x: 380, y: 590 },
                    { x: 380, y: 420 },
                    { x: 578, y: 420 }
                ]
            },
            // Unidad Control -> Banco Registros (RegWrite)
            {
                from: 'control-unit', fromPort: 'cu_out1',
                to: 'reg-bank', toPort: 'reg_write',
                waypoints: [
                    { x: 720, y: 477 },
                    { x: 483, y: 477 }
                ]
            },
            // Unidad Control -> MUX d1 (ALUSrc)
            {
                from: 'control-unit', fromPort: 'cu_out2',
                to: 'mux-d1', toPort: 'd1_control',
                waypoints: [
                    { x: 670, y: 500 },
                    { x: 670, y: 200 },
                    { x: 705, y: 200 }
                ]
            },
            // Unidad Control -> Memoria Datos (MemRead)
            {
                from: 'control-unit', fromPort: 'cu_out5',
                to: 'mem-data', toPort: 'mem_read',
                waypoints: [
                    { x: 880, y: 500 },
                    { x: 1150, y: 500 },
                    { x: 1150, y: 40 },
                    { x: 1050, y: 40 }
                ]
            },
            // Unidad Control -> MUX WB (MemtoReg)
            {
                from: 'control-unit', fromPort: 'cu_out3',
                to: 'mux-wb', toPort: 'wb_control',
                waypoints: [
                    { x: 720, y: 523 },
                    { x: 720, y: 580 },
                    { x: 1040, y: 580 },
                    { x: 1040, y: 419 }
                ]
            },
            // Unidad Control -> ALU (ALUOp)
            {
                from: 'control-unit', fromPort: 'cu_out4',
                to: 'alu', toPort: 'alu_control',
                waypoints: [
                    { x: 880, y: 477 },
                    { x: 900, y: 477 },
                    { x: 900, y: 380 },
                    { x: 850, y: 380 }
                ]
            },
            // Sumador PC+4 -> MUX PC
            {
                from: 'sum-pc4', fromPort: 'pc4_out',
                to: 'mux-pc', toPort: 'pc_normal',
                waypoints: [
                    { x: 150, y: 315 },
                    { x: 155, y: 315 },
                    { x: 155, y: 380 },
                    { x: 125, y: 380 }
                ]
            },
            // MUX PC -> PC
            {
                from: 'mux-pc', fromPort: 'pc_next',
                to: 'pc', toPort: 'pc_in',
                waypoints: [
                    { x: 125, y: 550 },
                    { x: 10, y: 550 },
                    { x: 10, y: 490 },
                    { x: 10, y: 100 },
                    { x: 40, y: 100 }
                ]
            }
        ]
    },

    S: {
        color: 's',
        components: ['pc', 'mem-prog', 'decoder', 'control-unit', 'sign-ext', 'reg-bank', 'mux-d1', 'alu', 'mem-data', 'sum-pc4', 'mux-pc'],
        connections: [
            // PC -> Memoria de Programa
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'mem-prog', toPort: 'addr_prog',
                waypoints: [
                    { x: 140, y: 100 },
                    { x: 200, y: 100 }
                ]
            },
            // PC -> Sumador PC+4
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'sum-pc4', toPort: 'pc_4_in',
                waypoints: [
                    { x: 140, y: 100 },
                    { x: 140, y: 240 },
                    { x: 105, y: 240 },
                    { x: 105, y: 270 }
                ]
            },
            // Memoria Programa -> Decodificador
            {
                from: 'mem-prog', fromPort: 'instr_prog',
                to: 'decoder', toPort: 'instr_in',
                waypoints: [
                    { x: 270, y: 170 },
                    { x: 270, y: 170 },
                    { x: 400, y: 170 },
                    { x: 400, y: 120 }
                ]
            },
            // Decodificador -> Unidad Control (opcode)
            {
                from: 'decoder', fromPort: 'opcode_out',
                to: 'control-unit', toPort: 'opcode_in',
                waypoints: [
                    { x: 500, y: 40 },
                    { x: 500, y: 10 },
                    { x: 800, y: 10 },
                    { x: 800, y: 220 },
                    { x: 750, y: 220 },
                    { x: 750, y: 420 },
                    { x: 800, y: 420 }
                ]
            },
            // Decodificador -> Banco Registros (rs1)
            {
                from: 'decoder', fromPort: 'rs1_out',
                to: 'reg-bank', toPort: 'rs1_addr',
                waypoints: [
                    { x: 590, y: 153 },
                    { x: 640, y: 153 },
                    { x: 640, y: 230 },
                    { x: 499, y: 230 }
                ]
            },
            // Decodificador -> Banco Registros (rs2)
            {
                from: 'decoder', fromPort: 'rs2_out',
                to: 'reg-bank', toPort: 'rs2_addr',
                waypoints: [
                    { x: 590, y: 120 },
                    { x: 630, y: 120 },
                    { x: 630, y: 220 },
                    { x: 546, y: 220 }
                ]
            },
            // Decodificador -> Sign Extend
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'sign-ext', toPort: 'imm_in',
                waypoints: [
                    { x: 590, y: 85 },
                    { x: 640, y: 85 },
                    { x: 640, y: 105 }
                ]
            },
            // Sign Extend -> MUX d1
            {
                from: 'sign-ext', fromPort: 'imm_ext',
                to: 'mux-d1', toPort: 'd1_imm',
                waypoints: [
                    { x: 770, y: 105 },
                    { x: 800, y: 105 },
                    { x: 800, y: 180 },
                    { x: 680, y: 180 },
                    { x: 680, y: 232 }
                ]
            },
            // Banco Registros do1 -> ALU
            {
                from: 'reg-bank', fromPort: 'do1_out',
                to: 'alu', toPort: 'op1',
                waypoints: [
                    { x: 620, y: 306 },
                    { x: 660, y: 306 },
                    { x: 660, y: 300 },
                    { x: 780, y: 300 },
                    { x: 780, y: 286 },
                    { x: 790, y: 286 }
                ]
            },
            // MUX d1 -> ALU op2
            {
                from: 'mux-d1', fromPort: 'd1_out',
                to: 'alu', toPort: 'op2',
                waypoints: [
                    { x: 740, y: 250 },
                    { x: 770, y: 250 },
                    { x: 770, y: 334 },
                    { x: 790, y: 334 }
                ]
            },
            // Banco Registros do2 -> Memoria Datos (dato) - RODEA POR ABAJO DE LA ALU
            {
                from: 'reg-bank', fromPort: 'do2_out',
                to: 'mem-data', toPort: 'data_in',
                waypoints: [
                    { x: 620, y: 338 },
                    { x: 650, y: 338 },
                    { x: 650, y: 410 },
                    { x: 930, y: 410 },
                    { x: 930, y: 218 },
                    { x: 970, y: 218 }
                ]
            },
            // ALU -> Memoria Datos (dirección)
            {
                from: 'alu', fromPort: 'alu_result',
                to: 'mem-data', toPort: 'addr_in',
                waypoints: [
                    { x: 910, y: 310 },
                    { x: 950, y: 310 },
                    { x: 950, y: 162 },
                    { x: 970, y: 162 }
                ]
            },
            // Sumador PC+4 -> MUX PC
            {
                from: 'sum-pc4', fromPort: 'pc4_out',
                to: 'mux-pc', toPort: 'pc_normal',
                waypoints: [
                    { x: 150, y: 315 },
                    { x: 155, y: 315 },
                    { x: 155, y: 380 },
                    { x: 125, y: 380 }
                ]
            },
            // Unidad Control -> MUX d1 (ALUSrc)
            {
                from: 'control-unit', fromPort: 'cu_out2',
                to: 'mux-d1', toPort: 'd1_control',
                waypoints: [
                    { x: 670, y: 500 },
                    { x: 670, y: 200 },
                    { x: 705, y: 200 }
                ]
            },
            // Unidad Control -> Memoria Datos (MemWrite)
            {
                from: 'control-unit', fromPort: 'cu_out6',
                to: 'mem-data', toPort: 'mem_write',
                waypoints: [
                    { x: 880, y: 523 },
                    { x: 950, y: 523 },
                    { x: 950, y: 40 },
                    { x: 1009, y: 40}
                ]
            },
            // Unidad Control -> ALU (ALUOp)
            {
                from: 'control-unit', fromPort: 'cu_out4',
                to: 'alu', toPort: 'alu_control',
                waypoints: [
                    { x: 880, y: 477 },
                    { x: 900, y: 477 },
                    { x: 900, y: 380 },
                    { x: 850, y: 380 }
                ]
            },
            // MUX PC -> PC
            {
                from: 'mux-pc', fromPort: 'pc_next',
                to: 'pc', toPort: 'pc_in',
                waypoints: [
                    { x: 125, y: 550 },
                    { x: 10, y: 550 },
                    { x: 10, y: 490 },
                    { x: 10, y: 100 },
                    { x: 40, y: 100 }
                ]
            }
        ]
    },

    B: {
        color: 'b',
        components: ['pc', 'mem-prog', 'orden-sign', 'sum-branch', 'and-gate', 'mux-pc', 'decoder', 'control-unit', 'reg-bank', 'mux-d1', 'alu', 'sum-pc4'],
        connections: [
            // PC -> Memoria de Programa
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'mem-prog', toPort: 'addr_prog',
                waypoints: [
                    { x: 140, y: 100 },
                    { x: 200, y: 100 }
                ]
            },
            // PC -> Sumador PC+4
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'sum-pc4', toPort: 'pc_4_in',
                waypoints: [
                    { x: 140, y: 100 },
                    { x: 140, y: 240 },
                    { x: 105, y: 240 },
                    { x: 105, y: 270 }
                ]
            },
            // PC -> Sumador Branch
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'sum-branch', toPort: 'pc_branch',
                waypoints: [
                    { x: 140, y: 100 },
                    { x: 140, y: 250 },
                    { x: 305, y: 250 },
                    { x: 305, y: 250 }
                ]
            },
            // Memoria Programa -> Orden & Sign Extend
            {
                from: 'mem-prog', fromPort: 'instr_prog',
                to: 'orden-sign', toPort: 'instr_orden',
                waypoints: [
                    { x: 270, y: 170 }
                ]
            },
            // Orden & Sign Extend -> Sumador Branch
            {
                from: 'orden-sign', fromPort: 'offset_out',
                to: 'sum-branch', toPort: 'offset_branch',
                waypoints: [
                    { x: 270, y: 250 },
                    { x: 270, y: 270 },
                    { x: 350, y: 270 },
                    { x: 350, y: 315 }
                ]
            },
            // Memoria Programa -> Decodificador
            {
                from: 'mem-prog', fromPort: 'instr_prog',
                to: 'decoder', toPort: 'instr_in',
                waypoints: [
                    { x: 270, y: 170 },
                    { x: 270, y: 170 },
                    { x: 400, y: 170 },
                    { x: 400, y: 120 }
                ]
            },
            // Decodificador -> Unidad Control (opcode)
            {
                from: 'decoder', fromPort: 'opcode_out',
                to: 'control-unit', toPort: 'opcode_in',
                waypoints: [
                    { x: 500, y: 40 },
                    { x: 500, y: 10 },
                    { x: 800, y: 10 },
                    { x: 800, y: 220 },
                    { x: 750, y: 220 },
                    { x: 750, y: 420 },
                    { x: 800, y: 420 }
                ]
            },
            // Decodificador -> Banco Registros (rs1)
            {
                from: 'decoder', fromPort: 'rs1_out',
                to: 'reg-bank', toPort: 'rs1_addr',
                waypoints: [
                    { x: 590, y: 153 },
                    { x: 640, y: 153 },
                    { x: 640, y: 230 },
                    { x: 499, y: 230 }
                ]
            },
            //Unidad de Control -> AND
            {
                from: 'control-unit', fromPort: 'cu_out1',
                to: 'and-gate', toPort: 'and_in1',
                waypoints: [
                    { x: 720, y: 476 },
                    { x: 170, y: 476 },
                    { x: 170, y: 303 }
                ]
            },
            //AND -> MUXPC
            {
                from: 'and-gate', fromPort: 'and_out',
                to: 'mux-pc', toPort: 'pc_normal',
                waypoints: [
                    { x: 240, y: 310 },
                    { x: 240, y: 400 },
                    { x: 125, y: 400 },
                    { x: 125, y: 410 }
                ]
            },
            // Decodificador -> Banco Registros (rs2)
            {
                from: 'decoder', fromPort: 'rs2_out',
                to: 'reg-bank', toPort: 'rs2_addr',
                waypoints: [
                    { x: 590, y: 120 },
                    { x: 630, y: 120 },
                    { x: 630, y: 220 },
                    { x: 546, y: 220 }
                ]
            },
            // Banco Registros do1 -> ALU
            {
                from: 'reg-bank', fromPort: 'do1_out',
                to: 'alu', toPort: 'op1',
                waypoints: [
                    { x: 620, y: 306 },
                    { x: 660, y: 306 },
                    { x: 660, y: 300 },
                    { x: 780, y: 300 },
                    { x: 780, y: 286 },
                    { x: 790, y: 286 }
                ]
            },
            // Banco Registros do2 -> MUX d1
            {
                from: 'reg-bank', fromPort: 'do2_out',
                to: 'mux-d1', toPort: 'd1_do2',
                waypoints: [
                    { x: 620, y: 338 },
                    { x: 650, y: 338 },
                    { x: 650, y: 338 },
                    { x: 705, y: 338 },
                    { x: 705, y: 300 }
                ]
            },
            // MUX d1 -> ALU
            {
                from: 'mux-d1', fromPort: 'd1_out',
                to: 'alu', toPort: 'op2',
                waypoints: [
                    { x: 740, y: 250 },
                    { x: 770, y: 250 },
                    { x: 770, y: 334 },
                    { x: 790, y: 334 }
                ]
            },
            // ALU Zero -> AND gate - RODEA TODO POR ARRIBA
            {
                from: 'alu', fromPort: 'alu_zero',
                to: 'and-gate', toPort: 'and_in2',
                waypoints: [
                    { x: 850, y: 240 },
                    { x: 850, y: 200 },
                    { x: 400, y: 200 },
                    { x: 400, y: 380 },
                    { x: 180, y: 380 },
                    { x: 180, y: 317 }
                ]
            },
            // Sumador Branch -> MUX PC
            {
                from: 'sum-branch', fromPort: 'branch_result',
                to: 'mux-pc', toPort: 'pc_branch_in',
                waypoints: [
                    { x: 305, y: 340 },
                    { x: 305, y: 400 },
                    { x: 160, y: 400 },
                    { x: 160, y: 490 }
                ]
            },
            // Unidad Control -> ALU (ALUOp)
            {
                from: 'control-unit', fromPort: 'cu_out4',
                to: 'alu', toPort: 'alu_control',
                waypoints: [
                    { x: 880, y: 477 },
                    { x: 900, y: 477 },
                    { x: 900, y: 380 },
                    { x: 850, y: 380 }
                ]
            },
            // Sumador PC+4 -> MUX PC
            {
                from: 'sum-pc4', fromPort: 'pc4_out',
                to: 'mux-pc', toPort: 'pc_normal',
                waypoints: [
                    { x: 150, y: 315 },
                    { x: 155, y: 315 },
                    { x: 155, y: 380 },
                    { x: 125, y: 380 }
                ]
            },
            // MUX PC -> PC
            {
                from: 'mux-pc', fromPort: 'pc_next',
                to: 'pc', toPort: 'pc_in',
                waypoints: [
                    { x: 125, y: 550 },
                    { x: 10, y: 550 },
                    { x: 10, y: 490 },
                    { x: 10, y: 100 },
                    { x: 40, y: 100 }
                ]
            }
        ]
    }
};

let activeInstruction = null;
let animationTimeout = null;
let currentConnectionIndex = 0;
let staticConnectionCounter = 0;

function getPortPosition(boxId, portName) {
    const box = document.getElementById(boxId);
    if (!box) return null;

    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const port = box.querySelector(`[data-port="${portName}"]`);

    if (port) {
        const portRect = port.getBoundingClientRect();
        return {
            x: portRect.left + portRect.width / 2 - containerRect.left + container.scrollLeft,
            y: portRect.top + portRect.height / 2 - containerRect.top + container.scrollTop
        };
    }
    return null;
}

function drawConnection(lineId, fromPos, toPos, waypoints) {
    const line = document.getElementById(lineId);
    if (!line || !fromPos || !toPos) return;

    let path = `M ${fromPos.x} ${fromPos.y}`;
    
    if (waypoints && waypoints.length > 0) {
        waypoints.forEach(point => {
            path += ` L ${point.x} ${point.y}`;
        });
    }
    
    path += ` L ${toPos.x} ${toPos.y}`;
    
    line.setAttribute('d', path);
}

function createConnectionLine(id, isStatic = false) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('id', id);
    line.setAttribute('class', isStatic ? 'connection-line static-line' : 'connection-line');
    document.getElementById('connections-svg').appendChild(line);
    return line;
}

function drawAllStaticConnections() {
    document.querySelectorAll('.static-line').forEach(line => line.remove());
    staticConnectionCounter = 0;
    
    Object.keys(instructionPaths).forEach(instrType => {
        const config = instructionPaths[instrType];
        
        config.connections.forEach(conn => {
            const lineId = `static-line-${staticConnectionCounter++}`;
            createConnectionLine(lineId, true);
            
            const fromPos = getPortPosition(conn.from, conn.fromPort);
            const toPos = getPortPosition(conn.to, conn.toPort);
            
            if (fromPos && toPos) {
                drawConnection(lineId, fromPos, toPos, conn.waypoints);
            }
        });
    });
}

function activateInstruction(instruction) {
    if (activeInstruction === instruction) return;
    
    resetAll();
    activeInstruction = instruction;
    currentConnectionIndex = 0;
    
    const config = instructionPaths[instruction];
    if (!config) return;
    
    document.querySelectorAll('.instr-button').forEach(btn => {
        if (btn.classList.contains(`${instruction.toLowerCase()}-btn`)) {
            btn.classList.add('active');
        }
    });
    
    animateConnection(config);
}

function animateConnection(config) {
    if (currentConnectionIndex >= config.connections.length) return;
    
    const conn = config.connections[currentConnectionIndex];
    
    config.components.forEach(compId => {
        const box = document.getElementById(compId);
        if (box) {
            box.classList.add(`active-${config.color}`);
            box.classList.remove('pulsing');
            box.querySelectorAll('.port').forEach(p => p.classList.add(`active-${config.color}`));
        }
    });
    
    const lineId = `line-active-${currentConnectionIndex}`;
    createConnectionLine(lineId);
    
    const fromPos = getPortPosition(conn.from, conn.fromPort);
    const toPos = getPortPosition(conn.to, conn.toPort);
    
    if (fromPos && toPos) {
        drawConnection(lineId, fromPos, toPos, conn.waypoints);
        
        const line = document.getElementById(lineId);
        if (line) line.classList.add(`active-${config.color}`);
    }
    
    currentConnectionIndex++;
    animationTimeout = setTimeout(() => animateConnection(config), 300);
}

function resetAll() {
    if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
    }
    
    activeInstruction = null;
    currentConnectionIndex = 0;
    
    document.querySelectorAll('.instr-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.box').forEach(box => {
        box.classList.remove('active-r', 'active-i', 'active-l', 'active-s', 'active-b');
        box.classList.add('pulsing');
    });
    document.querySelectorAll('.port').forEach(port => {
        port.classList.remove('active-r', 'active-i', 'active-l', 'active-s', 'active-b');
    });
    document.querySelectorAll('[id^="line-active-"]').forEach(line => line.remove());
}

function resetCPUState(cpu) {
    cpu.pc = 0;
    cpu.halted = false;
    cpu.pcChanged = false;

    // reiniciar registros
    cpu.registers.fill(0);
}

function stopRun() {
    isRunning = false;

    if (runInterval) {
        clearInterval(runInterval);
        runInterval = null;
    }

    if (runTimeout) {
        clearTimeout(runTimeout);
        runTimeout = null;
    }
}

function resetExecution(cpu) {
    resetAll();

    isAnimating = false;
    animationTimeout && clearTimeout(animationTimeout);
    animationTimeout = null;

    resetCPUState(cpu);
    resetAll();
    console.log("RESET COMPLETO");
}

function loadCodeFromStorage() {
    const savedCode = localStorage.getItem('assemblyCode');
    const codeViewer = document.getElementById('code-viewer');
    
    if (savedCode && savedCode.trim() !== '') {
        const lines = savedCode.split('\n');
        const currentHTML = codeViewer.innerHTML;
        const newHTML = lines
            .map((line, index) => `<div class="code-line" data-line="${index}">${line || '&nbsp;'}</div>`)
            .join('');
        
        if (currentHTML !== newHTML && !currentHTML.includes('code-line')) {
            codeViewer.innerHTML = newHTML;
        }
    } else {
        codeViewer.innerHTML = '<p class="code-placeholder">No hay código disponible</p>';
    }
}

function highlightCurrentLine() {
    document.querySelectorAll('.code-line').forEach(line => {
        line.classList.remove('highlight-line');
    });
    
    const currentInstructionIndex = cpu.pc / 4;
    
    const currentLine = document.querySelector(`.code-line[data-line="${currentInstructionIndex}"]`);
    if (currentLine) {
        currentLine.classList.add('highlight-line');
        currentLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

window.addEventListener('resize', () => {
    drawAllStaticConnections();
});

window.addEventListener('load', () => {
    drawAllStaticConnections();
    document.querySelectorAll('.box').forEach(box => box.classList.add('pulsing'));
    loadCodeFromStorage();
    setTimeout(() => highlightCurrentLine(), 100);
});

setInterval(loadCodeFromStorage, 1000);

// ==================== CPU Y EJECUCIÓN ====================

const savedProgram = localStorage.getItem('assemblyJSON');
let programObj = null;

if (savedProgram) {
    try {
        programObj = JSON.parse(savedProgram);
    } catch(e) {
        console.error("Error parseando el programa:", e);
    }
}

const cpu = createCPU(programObj);

const EXEC_TABLE = {
    add:  (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] + c.registers[R(a.args.rs2)],
    sub:  (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] - c.registers[R(a.args.rs2)],
    and:  (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] & c.registers[R(a.args.rs2)],
    or:   (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] | c.registers[R(a.args.rs2)],
    xor:  (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] ^ c.registers[R(a.args.rs2)],
    slt:  (c,a) => c.registers[R(a.args.rd)] = (c.registers[R(a.args.rs1)] < c.registers[R(a.args.rs2)]) ? 1 : 0,
    sltu: (c,a) => c.registers[R(a.args.rd)] = ((c.registers[R(a.args.rs1)]>>>0) < (c.registers[R(a.args.rs2)]>>>0)) ? 1 : 0,
    sll:  (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] << (c.registers[R(a.args.rs2)] & 0x1F),
    srl:  (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] >>> (c.registers[R(a.args.rs2)] & 0x1F),
    sra:  (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] >> (c.registers[R(a.args.rs2)] & 0x1F),
    addi: (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] + a.args.imm,
    andi: (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] & a.args.imm,
    ori:  (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] | a.args.imm,
    xori: (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] ^ a.args.imm,
    slti: (c,a) => c.registers[R(a.args.rd)] = (c.registers[R(a.args.rs1)] < a.args.imm) ? 1 : 0,
    sltui:(c,a) => c.registers[R(a.args.rd)] = ((c.registers[R(a.args.rs1)]>>>0) < (a.args.imm>>>0)) ? 1 : 0,
    slli: (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] << (a.args.imm & 0x1F),
    srli: (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] >>> (a.args.imm & 0x1F),
    srai: (c,a) => c.registers[R(a.args.rd)] = c.registers[R(a.args.rs1)] >> (a.args.imm & 0x1F),
    lw: (c,a) => {
        const addr = c.registers[R(a.args.base)] + a.args.offset;
        const dv = new DataView(c.mem);
        c.registers[R(a.args.rd)] = dv.getInt32(addr, true);
    },
    sw: (c,a) => {
        const addr = c.registers[R(a.args.base)] + a.args.offset;
        const dv = new DataView(c.mem);
        dv.setInt32(addr, c.registers[R(a.args.rs2)], true);
    },
    beq: (c,a) => { if(c.registers[R(a.args.rs1)] === c.registers[R(a.args.rs2)]) { c.pc += a.args.imm; c.pcChanged = true; } },
    bne: (c,a) => { if(c.registers[R(a.args.rs1)] !== c.registers[R(a.args.rs2)]) { c.pc += a.args.imm; c.pcChanged = true; } },
    blt: (c,a) => { if(c.registers[R(a.args.rs1)] < c.registers[R(a.args.rs2)]) { c.pc += a.args.imm; c.pcChanged = true; } },
    bge: (c,a) => { if(c.registers[R(a.args.rs1)] >= c.registers[R(a.args.rs2)]) { c.pc += a.args.imm; c.pcChanged = true; } },
    bltu:(c,a) => { if((c.registers[R(a.args.rs1)]>>>0) < (c.registers[R(a.args.rs2)]>>>0)) { c.pc += a.args.imm; c.pcChanged = true; } },
    bgeu:(c,a) => { if((c.registers[R(a.args.rs1)]>>>0) >= (c.registers[R(a.args.rs2)]>>>0)) { c.pc += a.args.imm; c.pcChanged = true; } },
};

function createCPU(programJSON) {
    return {
        registers: new Int32Array(32),
        pc: 0,
        mem: new ArrayBuffer(64*1024),
        halted: false,
        ir: programJSON ? programJSON.instructions : [],
        labels: programJSON ? programJSON.labels : {}
    };
}

function R(x){ return parseInt(x.replace("x","")); }

let isAnimating = false; 
function step(cpu) {
    if (cpu.halted) {
        mostrarMensaje("Ejecución completada", "#C2AF30");
        return Promise.resolve();
    }

    if (isAnimating) return Promise.resolve();
    const ins = cpu.ir[cpu.pc / 4];

    if (!ins) {
        cpu.halted = true;
        mostrarMensaje("Ejecución completada", "#C2AF30");
        return Promise.resolve();
    }

    isAnimating = true;
    highlightCurrentLine();
    activateInstruction(ins.format);

    cpu.pcChanged = false;

    const exec = EXEC_TABLE[ins.mnemonic];
    if(!exec) throw new Error("Instrucción no implementada: " + ins.mnemonic);

    const oldRegs = Array.from(cpu.registers);
    exec(cpu, ins);
    cpu.registers[0] = 0;
    if(!cpu.pcChanged) cpu.pc += 4;

    const config = instructionPaths[ins.format];
    const animationDuration = config ? config.connections.length * 300 : 300;

    return new Promise(resolve => {
        setTimeout(() => {
            isAnimating = false;
            resolve();   
        }, animationDuration);
    });
}
function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function run(cpu, maxSteps = 100000) {
    const extraDelay = 900;

    for (let i = 0; i < maxSteps && !cpu.halted; i++) {
        await step(cpu);     
        await delay(extraDelay); 
    }

    if (cpu.halted) {
        mostrarMensaje("Ejecución completada", "#C2AF30");
    }
}

document.querySelector('.step').addEventListener('click', () => step(cpu));
document.querySelector('.run').addEventListener('click', () => run(cpu));

document.querySelector('.r-btn').addEventListener('click', () => activateInstruction('R'));
document.querySelector('.i-btn').addEventListener('click', () => activateInstruction('I'));
document.querySelector('.l-btn').addEventListener('click', () => activateInstruction('L'));
document.querySelector('.s-btn').addEventListener('click', () => activateInstruction('S'));
document.querySelector('.b-btn').addEventListener('click', () => activateInstruction('B'));
document.querySelector('.reset-btn').addEventListener('click', () => resetExecution(cpu));

const modalConfigs = {
    'pc': {
        title: 'Program Counter (PC)',
        getContent: () => {
            return `
                <div style="font-family: 'Courier New', monospace;">
                    <p style="margin-bottom: 15px; color: #b0b0b0;">
                        El Program Counter contiene la dirección de la siguiente instrucción a ejecutar.
                    </p>
                    <div style="background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px; border: 1px solid #444;">
                        <p style="margin: 0;"><strong>Valor actual:</strong> <span style="color: #4CAF50;">${cpu.pc}</span></p>
                        <p style="margin: 10px 0 0 0;"><strong>En hexadecimal:</strong> <span style="color: #4CAF50;">0x${cpu.pc.toString(16).toUpperCase().padStart(8, '0')}</span></p>
                    </div>
                    
                    <!-- Aquí puedes agregar más código según necesites -->
                </div>
            `;
        }
    },
    
    'reg-bank': {
        title: 'Banco de Registros',
        getContent: () => {
            let registersHTML = '';
            for (let i = 0; i < 32; i++) {
                const value = cpu.registers[i];
                const hexValue = (value >>> 0).toString(16).toUpperCase().padStart(8, '0');
                registersHTML += `
                    <div style="display: flex; justify-content: space-between; padding: 8px; background: ${i % 2 === 0 ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)'}; border-radius: 4px; margin-bottom: 5px;">
                        <span style="color: #FF6F00; font-weight: bold;">x${i}:</span>
                        <span style="color: #4CAF50;">${value}</span>
                        <span style="color: #64B5F6;">0x${hexValue}</span>
                    </div>
                `;
            }
            
            return `
                <div style="font-family: 'Courier New', monospace;">
                    <p style="margin-bottom: 15px; color: #b0b0b0;">
                        32 registros de propósito general (x0 siempre es 0).
                    </p>
                    <div style="max-height: 400px; overflow-y: auto;">
                        ${registersHTML}
                    </div>
                    
                    <!-- Aquí puedes agregar más código según necesites -->
                </div>
            `;
        }
    },
    
    'mem-data': {
        title: 'Memoria de Datos',
        getContent: () => {
            let memHTML = '';
            const dv = new DataView(cpu.mem);
            
            for (let i = 0; i < 256; i += 16) {
                let rowHex = '';
                let rowAscii = '';
                
                for (let j = 0; j < 16 && (i + j) < 256; j++) {
                    const byte = dv.getUint8(i + j);
                    rowHex += byte.toString(16).toUpperCase().padStart(2, '0') + ' ';
                    rowAscii += (byte >= 32 && byte <= 126) ? String.fromCharCode(byte) : '.';
                }
                
                memHTML += `
                    <div style="display: flex; gap: 20px; padding: 5px; font-size: 0.85rem; font-family: 'Courier New', monospace;">
                        <span style="color: #FF6F00; min-width: 60px;">0x${i.toString(16).toUpperCase().padStart(4, '0')}:</span>
                        <span style="color: #4CAF50; flex: 1;">${rowHex}</span>
                        <span style="color: #64B5F6;">${rowAscii}</span>
                    </div>
                `;
            }
            
            return `
                <div>
                    <p style="margin-bottom: 15px; color: #b0b0b0;">
                        Visualización de los primeros 256 bytes de la memoria de datos.
                    </p>
                    <div style="background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px; border: 1px solid #444; max-height: 400px; overflow-y: auto;">
                        ${memHTML}
                    </div>
                    
                    <!-- Aquí puedes agregar más código según necesites -->
                </div>
            `;
        }
    }
};

function openModal(modalId) {
    const config = modalConfigs[modalId];
    if (!config) return;
    
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    title.textContent = config.title;
    body.innerHTML = config.getContent();
    
    overlay.classList.add('active');
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('active');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});