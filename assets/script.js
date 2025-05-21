
const fallingContainer = document.getElementById('falling-container');

const pngImages = [
  'https://cdn-icons-png.flaticon.com/128/2160/2160424.png',  
  'https://cdn-icons-png.flaticon.com/128/2160/2160424.png', 
  'https://cdn-icons-png.flaticon.com/128/2160/2160424.png'   
];

const maxImages = 35;

class FallingImage {
  constructor(src) {
    this.el = document.createElement('img');
    this.el.src = src;
    this.el.className = 'falling-img';
    this.reset();
    fallingContainer.appendChild(this.el);
  }

  reset() {
    this.x = Math.random() * window.innerWidth;
    this.y = -50 - (Math.random() * 200);
    this.size = 20 + Math.random() * 30;
    this.speedY = 1 + Math.random() * 2;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.el.style.width = this.size + 'px';
    this.el.style.height = 'auto';
    this.el.style.transform = `translate(${this.x}px, ${this.y}px) rotate(0deg)`;
    this.rot = 0;
    this.rotSpeed = (Math.random() - 0.5) * 1.5;
    this.opacity = 0.5 + Math.random() * 0.5;
    this.el.style.opacity = this.opacity;
    this.el.style.zIndex = '0';
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rot += this.rotSpeed;

    if (this.y > window.innerHeight) {
      this.reset();
    }

    this.el.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rot}deg)`;
  }

  // ÚJ: arányos újrapozícionálás képernyőméret változásakor
  resizeX(ratio) {
    this.x *= ratio;
  }
}

const fallingImages = [];

function populateFallingImages() {
  for (let i = 0; i < maxImages; i++) {
    const src = pngImages[i % pngImages.length];
    const fi = new FallingImage(src);
    fi.y = Math.random() * window.innerHeight;
    fallingImages.push(fi);
  }
}

function animate() {
  fallingImages.forEach(fi => fi.update());
  requestAnimationFrame(animate);
}

populateFallingImages();
animate();

// ✅ Reagálás a képernyő átméretezésére
let previousWidth = window.innerWidth;

window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const ratio = newWidth / previousWidth;
  fallingImages.forEach(fi => fi.resizeX(ratio));
  previousWidth = newWidth;
});


