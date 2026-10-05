class MechaEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.entities = [];
    this.running = false;
  }
  add(entity) { this.entities.push(entity); }
  start() {
    this.running = true;
    const tick = () => {
      if (!this.running) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.entities.forEach(e => { e.update(); e.draw(this.ctx); });
      requestAnimationFrame(tick);
    };
    tick();
  }
  stop() { this.running = false; }
}   