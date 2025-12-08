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
                    { x: 420, y: 373 },
                    { x: 440, y: 373 }
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
                    { x: 800, y: 130 }
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
                    { x: 720, y: 473 },
                    { x: 483, y: 473 }
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
                    { x: 720, y: 522 },
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
                    { x: 880, y: 473 },
                    { x: 900, y: 473 },
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
            // Decodificador -> Unidad Control
            {
                from: 'decoder', fromPort: 'opcode_out',
                to: 'control-unit', toPort: 'opcode_in',
                waypoints: [
                    { x: 500, y: 40 },
                    { x: 500, y: 10 },
                    { x: 800, y: 10 },
                    { x: 800, y: 430 }
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
                    { x: 420, y: 373 },
                    { x: 440, y: 373 }
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
                    { x: 720, y: 473 },
                    { x: 483, y: 473 }
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
                    { x: 720, y: 522 },
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
                    { x: 880, y: 473 },
                    { x: 900, y: 473 },
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
            // Decodificador -> Unidad Control
            {
                from: 'decoder', fromPort: 'opcode_out',
                to: 'control-unit', toPort: 'opcode_in',
                waypoints: [
                    { x: 500, y: 40 },
                    { x: 500, y: 10 },
                    { x: 800, y: 10 },
                    { x: 800, y: 430 }
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
                    { x: 420, y: 373 },
                    { x: 440, y: 373 }
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
                    { x: 720, y: 473 },
                    { x: 483, y: 473 }
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
                    { x: 720, y: 522 },
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
                    { x: 880, y: 473 },
                    { x: 900, y: 473 },
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
            // Decodificador -> Unidad Control
            {
                from: 'decoder', fromPort: 'opcode_out',
                to: 'control-unit', toPort: 'opcode_in',
                waypoints: [
                    { x: 500, y: 40 },
                    { x: 500, y: 10 },
                    { x: 800, y: 10 },
                    { x: 800, y: 430 }
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
                    { x: 880, y: 527 },
                    { x: 950, y: 527 },
                    { x: 950, y: 40 },
                    { x: 1009, y: 40}
                ]
            },
            // Unidad Control -> ALU (ALUOp)
            {
                from: 'control-unit', fromPort: 'cu_out4',
                to: 'alu', toPort: 'alu_control',
                waypoints: [
                    { x: 880, y: 473 },
                    { x: 900, y: 473 },
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
                    { x: 270, y: 255 },
                    { x: 350, y: 255 },
                    { x: 350, y: 295 }
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
            // Decodificador -> Unidad Control
            {
                from: 'decoder', fromPort: 'opcode_out',
                to: 'control-unit', toPort: 'opcode_in',
                waypoints: [
                    { x: 500, y: 40 },
                    { x: 500, y: 10 },
                    { x: 800, y: 10 },
                    { x: 800, y: 430 }
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
                    { x: 720, y: 473 },
                    { x: 170, y: 473 },
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
                    { x: 880, y: 473 },
                    { x: 900, y: 473 },
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

function loadCodeFromStorage() {
    const savedCode = localStorage.getItem('assemblyCode');
    const codeViewer = document.getElementById('code-viewer');
    
    if (savedCode && savedCode.trim() !== '') {
        const lines = savedCode.split('\n');
        codeViewer.innerHTML = lines
            .map(line => `<div class="code-line">${line || '&nbsp;'}</div>`)
            .join('');
    } else {
        codeViewer.innerHTML = '<p class="code-placeholder">No hay código disponible</p>';
    }
}

window.addEventListener('resize', () => {
    drawAllStaticConnections();
});

window.addEventListener('load', () => {
    drawAllStaticConnections();
    document.querySelectorAll('.box').forEach(box => box.classList.add('pulsing'));
    loadCodeFromStorage();
});

setInterval(loadCodeFromStorage, 1000);