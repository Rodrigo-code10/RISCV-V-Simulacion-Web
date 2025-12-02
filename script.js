// Configuración de caminos predefinidos para cada color
const pathConfigurations = {
    red: {
        // Camino ROJO: Box1 -> Box2 -> Box5 -> Box4 -> Box1
        boxes: ['box1', 'box2', 'box5', 'box4', 'box1'],
        lines: ['line-red-1', 'line-red-2', 'line-red-3', 'line-red-4'],
        connections: [
            { from: 'box1', fromPort: 'dout', to: 'box2', toPort: 'din', offset: 15 },
            { from: 'box2', fromPort: 'dout', to: 'box5', toPort: 'din', offset: 10 },
            { from: 'box5', fromPort: 'dout', to: 'box4', toPort: 'i1', offset: -20 },
            { from: 'box4', fromPort: 'o1', to: 'box1', toPort: 'din', offset: 100 }
        ]
    },
    green: {
        // Camino VERDE: Box1 -> Box3 -> Box2 -> Box5 -> Box1
        boxes: ['box1', 'box3', 'box2', 'box5', 'box1'],
        lines: ['line-green-1', 'line-green-2', 'line-green-3', 'line-green-4'],
        connections: [
            { from: 'box1', fromPort: 'dout', to: 'box3', toPort: 'clk', offset: -50 },
            { from: 'box3', fromPort: 'dout', to: 'box2', toPort: 'clk', offset: -30 },
            { from: 'box2', fromPort: 'dout', to: 'box5', toPort: 'clk', offset: -10 },
            { from: 'box5', fromPort: 'dout', to: 'box1', toPort: 'clk', offset: 120 }
        ]
    },
    blue: {
        // Camino AZUL: Box1 -> Box4 -> Box5 -> Box3 -> Box1
        boxes: ['box1', 'box4', 'box5', 'box3', 'box1'],
        lines: ['line-blue-1', 'line-blue-2', 'line-blue-3', 'line-blue-4'],
        connections: [
            { from: 'box1', fromPort: 'dout', to: 'box4', toPort: 'i0', offset: 40 },
            { from: 'box4', fromPort: 'o0', to: 'box5', toPort: 'reset', offset: 5 },
            { from: 'box5', fromPort: 'dout', to: 'box3', toPort: 'reset', offset: -60 },
            { from: 'box3', fromPort: 'dout', to: 'box1', toPort: 'reset', offset: -80 }
        ]
    }
};

let activeColor = null;
let animationTimeout = null;

// obtiene la salida que quieres
function getPortPosition(boxId, portName) {
    const box = document.getElementById(boxId);
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
        y: boxRect.top + boxRect.height / 2// viene por default en centro de la caja
    };
}

// Función para dibujar las conexiones con offset para evitar superposición
function drawConnections() {
    Object.keys(pathConfigurations).forEach(color => {
        const config = pathConfigurations[color];
        
        config.connections.forEach((conn, index) => {
            const from = getPortPosition(conn.from, conn.fromPort);
            const to = getPortPosition(conn.to, conn.toPort);
            const lineId = config.lines[index];
            const offset = conn.offset;
            const startExtend = from.x + 50;
            const endExtend = to.x - 50;
            const midY = (from.y + to.y) / 2 + offset;
            
            const path = `M ${from.x} ${from.y} 
                        L ${startExtend} ${from.y} 
                        L ${startExtend} ${midY} 
                        L ${endExtend} ${midY} 
                        L ${endExtend} ${to.y} 
                        L ${to.x} ${to.y}`;
            
            const lineElement = document.getElementById(lineId);
            if (lineElement) {
                lineElement.setAttribute('d', path);
            }
        });
    });
}

// activaun camino especifico
function activatePath(color) {
    // Si ya está activo no hace nada
    if (activeColor === color) {
        return;
    }
    resetAll();
    
    activeColor = color;
    const config = pathConfigurations[color];
    
    // Activar el botón correspondiente
    document.querySelector(`.${color}-btn`).classList.add('active');
    
    // Animar el camino secuencialmente
    animatePathSequence(config, color);
}

function animatePathSequence(config, color) {
    let step = 0;
    function animateNextStep() {
        if (step < config.boxes.length) {
            // Activar cuadro
            const boxId = config.boxes[step];
            const box = document.getElementById(boxId);
            box.classList.add(`active-${color}`);
            box.classList.add('pulsing');
            
            // Activar puertos
            const ports = box.querySelectorAll('.port');
            ports.forEach(port => {
                port.classList.add(`active-${color}`);
            });
            
            // Activar línea (si no es el último paso)
            if (step < config.lines.length) {
                const lineId = config.lines[step];
                const line = document.getElementById(lineId);
                line.classList.add(`active-${color}`);
            }
            
            step++;
            animationTimeout = setTimeout(animateNextStep, 500);
        }
    }
    
    animateNextStep();
}

function resetAll() {
    if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
    }
    
    activeColor = null;
    document.querySelectorAll('.color-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.box').forEach(box => {
        box.classList.remove('active-red', 'active-green', 'active-blue', 'pulsing');
    });
    
    document.querySelectorAll('.port').forEach(port => {
        port.classList.remove('active-red', 'active-green', 'active-blue');
    });
    
    document.querySelectorAll('.connection-line').forEach(line => {
        line.classList.remove('active-red', 'active-green', 'active-blue');
    });
}

// Dibujar conexiones al cargar y al redimensionar
window.addEventListener('load', () => {
    drawConnections();
    
    // Añadir animación de pulsación inicial a todos los cuadros
    document.querySelectorAll('.box').forEach(box => {
        box.classList.add('pulsing');
    });
});

window.addEventListener('resize', drawConnections);

// Autoreset despues de completar un camino
function setupAutoReset() {
    const originalActivatePath = activatePath;
    window.activatePath = function(color) {
        originalActivatePath(color);
        
        // Calcular duración total de la animación
        const config = pathConfigurations[color];
        const totalDuration = config.boxes.length * 500 + 2000;
        
        setTimeout(() => {
            if (activeColor === color) {
                resetAll();
                document.querySelectorAll('.box').forEach(box => {
                    box.classList.add('pulsing');
                });
            }
        }, totalDuration);
    };
}
setupAutoReset();