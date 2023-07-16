const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 2;
let hue = 0;
let spots = [];

const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}

function updateMousePosition(event) {
    mouse.x = event.clientX + window.scrollX;
    mouse.y = event.clientY + window.scrollY;
}

canvas.addEventListener('mousemove', function (event){
    updateMousePosition(event);
    for (let i = 0; i < 3; i++) {
        const x = mouse.x;
        const y = mouse.y;
    createParticle(x,y);
    }
});

window.addEventListener('scroll', function() {
    canvas.width = window.innerWidth + this.window.scrollX;
    canvas.height = window.innerHeight + this.window.scrollY;
});

function createParticle(x, y) {
    spots.push(new Particle(x, y));
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

function clearCanvas() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function handleParticle() {
    clearCanvas();
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
}
function animate() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    handleParticle();
    hue++;
    requestAnimationFrame(animate);
}
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    spots = [];
}

window.addEventListener('resize', function() {
    resizeCanvas();
    animate();
});
window.addEventListener('mouseout', function (){
    mouse.x = this.window.innerWidth/2;
    mouse.y = this.window.innerHeight/2;
})
resizeCanvas();
animate();