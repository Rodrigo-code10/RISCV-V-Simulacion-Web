const instructionPaths = {
    R: {
        color: 'r',
        components: ['pc', 'sum-pc4', 'mux-pc', 'mem-instr', 'decoder', 'control-unit', 'reg-bank', 'mux-alu', 'alu', 'mux-wb'],
        connections: [
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'sum-pc4', toPort: 'pc_in',
                waypoints: []
            },
            {
                from: 'sum-pc4', fromPort: 'pc4_out',
                to: 'mux-pc', toPort: 'pc_normal',
                waypoints: [
                    { x: 360, y: 90 },
                    { x: 360, y: 30 },
                    { x: 985, y: 30 },
                    { x: 985, y: 40 }
                ]
            },
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'mem-instr', toPort: 'address',
                waypoints: [
                    { x: 160, y: 90 },
                    { x: 160, y: 160 },
                    { x: 30, y: 160 },
                    { x: 30, y: 210 },
                    { x: 195, y: 210 }
                ]
            },
            {
                from: 'mem-instr', fromPort: 'instr_out',
                to: 'decoder', toPort: 'instr_in',
                waypoints: [
                    { x: 280, y: 270 },
                    { x: 360, y: 270 }
                ]
            },
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'control-unit', toPort: 'opcode_in',
                waypoints: [
                    { x: 520, y: 280 },
                    { x: 560, y: 280 },
                    { x: 560, y: 150 },
                    { x: 510, y: 150 }
                ]
            },
            {
                from: 'decoder', fromPort: 'rs1_out',
                to: 'reg-bank', toPort: 'rs1_addr',
                waypoints: [
                    { x: 405, y: 360 },
                    { x: 405, y: 380 },
                    { x: 60, y: 380 },
                    { x: 60, y: 420 },
                    { x: 95, y: 420 }
                ]
            },
            {
                from: 'decoder', fromPort: 'rs2_out',
                to: 'reg-bank', toPort: 'rs2_addr',
                waypoints: [
                    { x: 440, y: 360 },
                    { x: 440, y: 370 },
                    { x: 45, y: 370 },
                    { x: 45, y: 420 },
                    { x: 155, y: 420 }
                ]
            },
            {
                from: 'reg-bank', fromPort: 'rs1_data',
                to: 'alu', toPort: 'op1',
                waypoints: [
                    { x: 210, y: 479 },
                    { x: 230, y: 479 },
                    { x: 230, y: 600 },
                    { x: 460, y: 600 },
                    { x: 460, y: 472 },
                    { x: 480, y: 472 }
                ]
            },
            {
                from: 'reg-bank', fromPort: 'rs2_data',
                to: 'mux-alu', toPort: 'mux_rs2',
                waypoints: [
                    { x: 210, y: 521 },
                    { x: 280, y: 521 },
                    { x: 280, y: 482 },
                    { x: 310, y: 482 }
                ]
            },
            {
                from: 'mux-alu', fromPort: 'mux_out',
                to: 'alu', toPort: 'op2',
                waypoints: [
                    { x: 410, y: 495 },
                    { x: 440, y: 495 },
                    { x: 440, y: 508 },
                    { x: 480, y: 508 }
                ]
            },
            {
                from: 'alu', fromPort: 'alu_result',
                to: 'mux-wb', toPort: 'wb_alu',
                waypoints: [
                    { x: 660, y: 490 },
                    { x: 700, y: 490 },
                    { x: 700, y: 420 },
                    { x: 930, y: 420 },
                    { x: 930, y: 486 },
                    { x: 950, y: 486 }
                ]
            },
            {
                from: 'mux-wb', fromPort: 'wb_out',
                to: 'reg-bank', toPort: 'wr_data',
                waypoints: [
                    { x: 1000, y: 550 },
                    { x: 1000, y: 700 },
                    { x: 15, y: 700 },
                    { x: 15, y: 580 },
                    { x: 125, y: 580 }
                ]
            },
            {
                from: 'mux-pc', fromPort: 'pc_next',
                to: 'pc', toPort: 'pc_in',
                waypoints: [
                    { x: 985, y: 140 },
                    { x: 985, y: 160 },
                    { x: 1080, y: 160 },
                    { x: 1080, y: 660 },
                    { x: 10, y: 660 },
                    { x: 10, y: 140 },
                    { x: 100, y: 140 }
                ]
            }
        ]
    },

    I: {
        color: 'i',
        components: ['pc', 'sum-pc4', 'mux-pc', 'mem-instr', 'decoder', 'control-unit', 'sign-ext', 'reg-bank', 'mux-alu', 'alu', 'mux-wb'],
        connections: [
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'sum-pc4', toPort: 'pc_in',
                waypoints: []
            },
            {
                from: 'sum-pc4', fromPort: 'pc4_out',
                to: 'mux-pc', toPort: 'pc_normal',
                waypoints: [
                    { x: 360, y: 90 },
                    { x: 360, y: 30 },
                    { x: 985, y: 30 },
                    { x: 985, y: 40 }
                ]
            },
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'mem-instr', toPort: 'address',
                waypoints: [
                    { x: 160, y: 90 },
                    { x: 160, y: 160 },
                    { x: 30, y: 160 },
                    { x: 30, y: 210 },
                    { x: 195, y: 210 }
                ]
            },
            {
                from: 'mem-instr', fromPort: 'instr_out',
                to: 'decoder', toPort: 'instr_in',
                waypoints: [
                    { x: 280, y: 270 },
                    { x: 360, y: 270 }
                ]
            },
            {
                from: 'decoder', fromPort: 'rs1_out',
                to: 'reg-bank', toPort: 'rs1_addr',
                waypoints: [
                    { x: 405, y: 360 },
                    { x: 405, y: 380 },
                    { x: 60, y: 380 },
                    { x: 60, y: 420 },
                    { x: 95, y: 420 }
                ]
            },
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'control-unit', toPort: 'opcode_in',
                waypoints: [
                    { x: 520, y: 280 },
                    { x: 560, y: 280 },
                    { x: 560, y: 150 },
                    { x: 510, y: 150 }
                ]
            },
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'sign-ext', toPort: 'imm_in',
                waypoints: [
                    { x: 520, y: 280 },
                    { x: 610, y: 280 }
                ]
            },
            {
                from: 'reg-bank', fromPort: 'rs1_data',
                to: 'alu', toPort: 'op1',
                waypoints: [
                    { x: 210, y: 479 },
                    { x: 230, y: 479 },
                    { x: 230, y: 600 },
                    { x: 460, y: 600 },
                    { x: 460, y: 472 },
                    { x: 480, y: 472 }
                ]
            },
            {
                from: 'sign-ext', fromPort: 'imm_ext',
                to: 'mux-alu', toPort: 'mux_imm',
                waypoints: [
                    { x: 685, y: 320 },
                    { x: 685, y: 360 },
                    { x: 360, y: 360 },
                    { x: 360, y: 440 }
                ]
            },
            {
                from: 'mux-alu', fromPort: 'mux_out',
                to: 'alu', toPort: 'op2',
                waypoints: [
                    { x: 410, y: 495 },
                    { x: 440, y: 495 },
                    { x: 440, y: 508 },
                    { x: 480, y: 508 }
                ]
            },
            {
                from: 'alu', fromPort: 'alu_result',
                to: 'mux-wb', toPort: 'wb_alu',
                waypoints: [
                    { x: 660, y: 490 },
                    { x: 700, y: 490 },
                    { x: 700, y: 420 },
                    { x: 930, y: 420 },
                    { x: 930, y: 486 },
                    { x: 950, y: 486 }
                ]
            },
            {
                from: 'mux-wb', fromPort: 'wb_out',
                to: 'reg-bank', toPort: 'wr_data',
                waypoints: [
                    { x: 1000, y: 550 },
                    { x: 1000, y: 700 },
                    { x: 15, y: 700 },
                    { x: 15, y: 580 },
                    { x: 125, y: 580 }
                ]
            },
            {
                from: 'mux-pc', fromPort: 'pc_next',
                to: 'pc', toPort: 'pc_in',
                waypoints: [
                    { x: 985, y: 140 },
                    { x: 985, y: 160 },
                    { x: 1080, y: 160 },
                    { x: 1080, y: 660 },
                    { x: 10, y: 660 },
                    { x: 10, y: 140 },
                    { x: 100, y: 140 }
                ]
            }
        ]
    },

    L: {
        color: 'l',
        components: ['pc', 'sum-pc4', 'mux-pc', 'mem-instr', 'decoder', 'control-unit', 'sign-ext', 'reg-bank', 'mux-alu', 'alu', 'mem-data', 'mux-wb'],
        connections: [
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'sum-pc4', toPort: 'pc_in',
                waypoints: []
            },
            {
                from: 'sum-pc4', fromPort: 'pc4_out',
                to: 'mux-pc', toPort: 'pc_normal',
                waypoints: [
                    { x: 360, y: 90 },
                    { x: 360, y: 30 },
                    { x: 985, y: 30 },
                    { x: 985, y: 40 }
                ]
            },
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'mem-instr', toPort: 'address',
                waypoints: [
                    { x: 160, y: 90 },
                    { x: 160, y: 160 },
                    { x: 30, y: 160 },
                    { x: 30, y: 210 },
                    { x: 195, y: 210 }
                ]
            },
            {
                from: 'mem-instr', fromPort: 'instr_out',
                to: 'decoder', toPort: 'instr_in',
                waypoints: [
                    { x: 280, y: 270 },
                    { x: 360, y: 270 }
                ]
            },
            {
                from: 'decoder', fromPort: 'rs1_out',
                to: 'reg-bank', toPort: 'rs1_addr',
                waypoints: [
                    { x: 405, y: 360 },
                    { x: 405, y: 380 },
                    { x: 60, y: 380 },
                    { x: 60, y: 420 },
                    { x: 95, y: 420 }
                ]
            },
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'control-unit', toPort: 'opcode_in',
                waypoints: [
                    { x: 520, y: 280 },
                    { x: 560, y: 280 },
                    { x: 560, y: 150 },
                    { x: 510, y: 150 }
                ]
            },
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'sign-ext', toPort: 'imm_in',
                waypoints: [
                    { x: 520, y: 280 },
                    { x: 610, y: 280 }
                ]
            },
            {
                from: 'reg-bank', fromPort: 'rs1_data',
                to: 'alu', toPort: 'op1',
                waypoints: [
                    { x: 210, y: 479 },
                    { x: 230, y: 479 },
                    { x: 230, y: 600 },
                    { x: 460, y: 600 },
                    { x: 460, y: 472 },
                    { x: 480, y: 472 }
                ]
            },
            {
                from: 'sign-ext', fromPort: 'imm_ext',
                to: 'mux-alu', toPort: 'mux_imm',
                waypoints: [
                    { x: 685, y: 320 },
                    { x: 685, y: 360 },
                    { x: 360, y: 360 },
                    { x: 360, y: 440 }
                ]
            },
            {
                from: 'mux-alu', fromPort: 'mux_out',
                to: 'alu', toPort: 'op2',
                waypoints: [
                    { x: 410, y: 495 },
                    { x: 440, y: 495 },
                    { x: 440, y: 508 },
                    { x: 480, y: 508 }
                ]
            },
            {
                from: 'alu', fromPort: 'alu_result',
                to: 'mem-data', toPort: 'addr_in',
                waypoints: [
                    { x: 660, y: 490 },
                    { x: 680, y: 490 },
                    { x: 680, y: 480 },
                    { x: 730, y: 480 }
                ]
            },
            {
                from: 'mem-data', fromPort: 'data_out',
                to: 'mux-wb', toPort: 'wb_mem',
                waypoints: []
            },
            {
                from: 'mux-wb', fromPort: 'wb_out',
                to: 'reg-bank', toPort: 'wr_data',
                waypoints: [
                    { x: 1000, y: 550 },
                    { x: 1000, y: 700 },
                    { x: 15, y: 700 },
                    { x: 15, y: 580 },
                    { x: 125, y: 580 }
                ]
            },
            {
                from: 'mux-pc', fromPort: 'pc_next',
                to: 'pc', toPort: 'pc_in',
                waypoints: [
                    { x: 985, y: 140 },
                    { x: 985, y: 160 },
                    { x: 1080, y: 160 },
                    { x: 1080, y: 660 },
                    { x: 10, y: 660 },
                    { x: 10, y: 140 },
                    { x: 100, y: 140 }
                ]
            }
        ]
    },

    S: {
        color: 's',
        components: ['pc', 'sum-pc4', 'mux-pc', 'mem-instr', 'decoder', 'control-unit', 'sign-ext', 'reg-bank', 'mux-alu', 'alu', 'mem-data'],
        connections: [
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'sum-pc4', toPort: 'pc_in',
                waypoints: []
            },
            {
                from: 'sum-pc4', fromPort: 'pc4_out',
                to: 'mux-pc', toPort: 'pc_normal',
                waypoints: [
                    { x: 360, y: 90 },
                    { x: 360, y: 30 },
                    { x: 985, y: 30 },
                    { x: 985, y: 40 }
                ]
            },
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'mem-instr', toPort: 'address',
                waypoints: [
                    { x: 160, y: 90 },
                    { x: 160, y: 160 },
                    { x: 30, y: 160 },
                    { x: 30, y: 210 },
                    { x: 195, y: 210 }
                ]
            },
            {
                from: 'mem-instr', fromPort: 'instr_out',
                to: 'decoder', toPort: 'instr_in',
                waypoints: [
                    { x: 280, y: 270 },
                    { x: 360, y: 270 }
                ]
            },
            {
                from: 'decoder', fromPort: 'rs1_out',
                to: 'reg-bank', toPort: 'rs1_addr',
                waypoints: [
                    { x: 405, y: 360 },
                    { x: 405, y: 380 },
                    { x: 60, y: 380 },
                    { x: 60, y: 420 },
                    { x: 95, y: 420 }
                ]
            },
            {
                from: 'decoder', fromPort: 'rs2_out',
                to: 'reg-bank', toPort: 'rs2_addr',
                waypoints: [
                    { x: 440, y: 360 },
                    { x: 440, y: 370 },
                    { x: 45, y: 370 },
                    { x: 45, y: 420 },
                    { x: 155, y: 420 }
                ]
            },
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'control-unit', toPort: 'opcode_in',
                waypoints: [
                    { x: 520, y: 280 },
                    { x: 560, y: 280 },
                    { x: 560, y: 150 },
                    { x: 510, y: 150 }
                ]
            },
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'sign-ext', toPort: 'imm_in',
                waypoints: [
                    { x: 520, y: 280 },
                    { x: 610, y: 280 }
                ]
            },
            {
                from: 'reg-bank', fromPort: 'rs1_data',
                to: 'alu', toPort: 'op1',
                waypoints: [
                    { x: 210, y: 479 },
                    { x: 230, y: 479 },
                    { x: 230, y: 600 },
                    { x: 460, y: 600 },
                    { x: 460, y: 472 },
                    { x: 480, y: 472 }
                ]
            },
            {
                from: 'sign-ext', fromPort: 'imm_ext',
                to: 'mux-alu', toPort: 'mux_imm',
                waypoints: [
                    { x: 685, y: 320 },
                    { x: 685, y: 360 },
                    { x: 360, y: 360 },
                    { x: 360, y: 440 }
                ]
            },
            {
                from: 'mux-alu', fromPort: 'mux_out',
                to: 'alu', toPort: 'op2',
                waypoints: [
                    { x: 410, y: 495 },
                    { x: 440, y: 495 },
                    { x: 440, y: 508 },
                    { x: 480, y: 508 }
                ]
            },
            {
                from: 'alu', fromPort: 'alu_result',
                to: 'mem-data', toPort: 'addr_in',
                waypoints: [
                    { x: 660, y: 490 },
                    { x: 680, y: 490 },
                    { x: 680, y: 480 },
                    { x: 730, y: 480 }
                ]
            },
            {
                from: 'reg-bank', fromPort: 'rs2_data',
                to: 'mem-data', toPort: 'data_in',
                waypoints: [
                    { x: 210, y: 521 },
                    { x: 240, y: 521 },
                    { x: 240, y: 680 },
                    { x: 700, y: 680 },
                    { x: 700, y: 570 },
                    { x: 700, y: 470 }
                ]
            },
            {
                from: 'mux-pc', fromPort: 'pc_next',
                to: 'pc', toPort: 'pc_in',
                waypoints: [
                    { x: 985, y: 140 },
                    { x: 985, y: 160 },
                    { x: 1080, y: 160 },
                    { x: 1080, y: 660 },
                    { x: 10, y: 660 },
                    { x: 10, y: 140 },
                    { x: 100, y: 140 }
                ]
            }
        ]
    },

    B: {
        color: 'b',
        components: ['pc', 'sum-pc4', 'sum-branch', 'mux-pc', 'mem-instr', 'decoder', 'control-unit', 'sign-ext', 'reg-bank', 'mux-alu', 'alu'],
        connections: [
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'sum-pc4', toPort: 'pc_in',
                waypoints: []
            },
            {
                from: 'sum-pc4', fromPort: 'pc4_out',
                to: 'mux-pc', toPort: 'pc_normal',
                waypoints: [
                    { x: 360, y: 90 },
                    { x: 360, y: 30 },
                    { x: 985, y: 30 },
                    { x: 985, y: 40 }
                ]
            },
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'sum-branch', toPort: 'pc_branch',
                waypoints: [
                    { x: 160, y: 90 },
                    { x: 160, y: 15 },
                    { x: 710, y: 15 },
                    { x: 710, y: 90 }
                ]
            },
            {
                from: 'pc', fromPort: 'pc_out',
                to: 'mem-instr', toPort: 'address',
                waypoints: [
                    { x: 160, y: 90 },
                    { x: 160, y: 160 },
                    { x: 30, y: 160 },
                    { x: 30, y: 210 },
                    { x: 195, y: 210 }
                ]
            },
            {
                from: 'mem-instr', fromPort: 'instr_out',
                to: 'decoder', toPort: 'instr_in',
                waypoints: [
                    { x: 280, y: 270 },
                    { x: 360, y: 270 }
                ]
            },
            {
                from: 'decoder', fromPort: 'rs1_out',
                to: 'reg-bank', toPort: 'rs1_addr',
                waypoints: [
                    { x: 405, y: 360 },
                    { x: 405, y: 380 },
                    { x: 60, y: 380 },
                    { x: 60, y: 420 },
                    { x: 95, y: 420 }
                ]
            },
            {
                from: 'decoder', fromPort: 'rs2_out',
                to: 'reg-bank', toPort: 'rs2_addr',
                waypoints: [
                    { x: 440, y: 360 },
                    { x: 440, y: 370 },
                    { x: 45, y: 370 },
                    { x: 45, y: 420 },
                    { x: 155, y: 420 }
                ]
            },
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'control-unit', toPort: 'opcode_in',
                waypoints: [
                    { x: 520, y: 280 },
                    { x: 560, y: 280 },
                    { x: 560, y: 150 },
                    { x: 510, y: 150 }
                ]
            },
            {
                from: 'decoder', fromPort: 'imm_out',
                to: 'sign-ext', toPort: 'imm_in',
                waypoints: [
                    { x: 520, y: 280 },
                    { x: 610, y: 280 }
                ]
            },
            {
                from: 'reg-bank', fromPort: 'rs1_data',
                to: 'alu', toPort: 'op1',
                waypoints: [
                    { x: 210, y: 479 },
                    { x: 230, y: 479 },
                    { x: 230, y: 600 },
                    { x: 460, y: 600 },
                    { x: 460, y: 472 },
                    { x: 480, y: 472 }
                ]
            },
            {
                from: 'reg-bank', fromPort: 'rs2_data',
                to: 'mux-alu', toPort: 'mux_rs2',
                waypoints: [
                    { x: 210, y: 521 },
                    { x: 280, y: 521 },
                    { x: 280, y: 482 },
                    { x: 310, y: 482 }
                ]
            },
            {
                from: 'mux-alu', fromPort: 'mux_out',
                to: 'alu', toPort: 'op2',
                waypoints: [
                    { x: 410, y: 495 },
                    { x: 440, y: 495 },
                    { x: 440, y: 508 },
                    { x: 480, y: 508 }
                ]
            },
            {
                from: 'sign-ext', fromPort: 'imm_ext',
                to: 'sum-branch', toPort: 'offset_branch',
                waypoints: [
                    { x: 685, y: 320 },
                    { x: 685, y: 340 },
                    { x: 795, y: 340 },
                    { x: 795, y: 150 }
                ]
            },
            {
                from: 'sum-branch', fromPort: 'branch_result',
                to: 'mux-pc', toPort: 'pc_branch',
                waypoints: [
                    { x: 870, y: 90 },
                    { x: 920, y: 90 }
                ]
            },
            {
                from: 'mux-pc', fromPort: 'pc_next',
                to: 'pc', toPort: 'pc_in',
                waypoints: [
                    { x: 985, y: 140 },
                    { x: 985, y: 160 },
                    { x: 1080, y: 160 },
                    { x: 1080, y: 660 },
                    { x: 10, y: 660 },
                    { x: 10, y: 140 },
                    { x: 100, y: 140 }
                ]
            }
        ]
    }
};

let activeInstruction = null;
let animationTimeout = null;
let currentConnectionIndex = 0;

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

function createConnectionLine(id) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('id', id);
    line.setAttribute('class', 'connection-line');
    document.getElementById('connections-svg').appendChild(line);
    return line;
}

function drawAllConnections() {
    document.querySelectorAll('.connection-line').forEach(line => line.remove());
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

window.addEventListener('resize', drawAllConnections);
window.addEventListener('load', () => {
    drawAllConnections();
    document.querySelectorAll('.box').forEach(box => box.classList.add('pulsing'));
    loadCodeFromStorage();
});

setInterval(loadCodeFromStorage, 1000);