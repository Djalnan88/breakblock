export class Bar {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.maxX = x + width;
        this.maxY = y + height;
        this.vx = speed;
    }

    move(e, stageWidth) {
        if (
            this.x > 0 && 
            (e == "a" || e == "A" || e == "ArrowLeft")
        ) {
            this.x -= this.vx;
            this.maxX -= this.vx;
        }
        if (
            this.maxX < stageWidth &&
            (e == "d" || e == "D" || e == "ArrowRight")
        ) {
            this.x += this.vx;
            this.maxX += this.vx;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "#800814";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.maxX, this.y);
        ctx.lineTo(this.maxX, this.maxY);
        ctx.lineTo(this.x, this.maxY);
        ctx.fill();
        ctx.closePath();
    }
}
