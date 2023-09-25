const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 0;
let spots = [];


const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}

function updateMousePosition(event) {
    mouse.x = event.pageX - canvas.getBoundingClientRect().left;
    mouse.y = event.pageY - canvas.getBoundingClientRect().top;
}


canvas.addEventListener('mousemove', function(event) {
    updateMousePosition(event);
    for (let i = 0; i < 3; i++) {
        const x = mouse.x;
        const y = mouse.y;
        createParticle(x, y);
    }
});

// Find the cursor container element
const cursorContainer = document.getElementById('cursor-container');

function createParticle(x, y) {
    spots.push(new Particle(x, y));
    const particle = document.createElement('div');
    particle.className = 'particle'; // Apply styles to this class
    particle.style.position = 'inherit';
    particle.style.top = y + 'px';
    particle.style.left = x + 'px';
    document.body.appendChild(particle);
}


class Particle {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 0.1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = 'hsl(' + hue + ', 100%, 60%)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.1) this.size -= 0.03;
    }
    draw() {
    ctx.fillstyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 0.5);
    ctx.fill();
    }
}


function handleParticle() {
    ctx.save();
    for (let i = 0; i < spots.length; i++) {
        spots[i].update();
        spots[i].draw();
        for(let j = i; j < spots.length; j++) {
            const dx = spots[i].x - spots[j].x;
            const dy = spots[i].y - spots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 90){
                ctx.beginPath();
                ctx.strokeStyle = spots[i].color;
                ctx.lineWidth = spots[i].size;
                ctx.moveTo(spots[i].x, spots[i].y);
                ctx.lineTo(spots[j].x, spots[j].y);
                ctx.stroke();
            }
        }
        if ( spots[i].size <= 0.3) {
            spots.splice(i, 1); 
            i--;
        }
    }
    ctx.restore();
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue++;
    requestAnimationFrame(animate);
}
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(window.innerHeight + window.scrollY, document.body.scrollHeight);
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight; 
    resizeCanvas();
    spots = []; // Clear particles when resizing
    animate();
});

canvas.addEventListener('mouseout', function(event) {
    createParticle(mouse.x, mouse.y);
});

resizeCanvas();
animate();