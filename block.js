export class Block {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.maxX = x + width;
        this.maxY = y + height;
        this.color = "#" + color*64*64*8;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.maxX, this.y);
        ctx.lineTo(this.maxX, this.maxY);
        ctx.lineTo(this.x, this.maxY);
        ctx.fill();
        ctx.closePath();
    }
}