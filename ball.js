export class Ball {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = speed;
        this.vy = speed;
    }

    draw(ctx, stageWidth, stageHeight, bar) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x <= this.radius || this.x >= stageWidth - this.radius) {
            this.vx *= -1;
            this.x += this.vx;
        }
        if (this.y <= this.radius || this.y >= stageHeight - this.radius) {
            this.vy *= -1;
            this.y += this.vy;
        }
        this.bounceBar(bar);

        ctx.fillStyle = "#ff384e";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        if(this.y + this.radius >= stageHeight) {
            console.log("Game Over");
        }
    }

    bounceBar(bar) {
        if (
            this.x >= bar.x &&
            this.x <= bar.maxX &&
            this.y + this.radius >= bar.y &&
            this.y + this.radius <= bar.maxY
        ) {
            console.log("bounce");
            this.vy *= -1;
            this.y += this.vy;
        }
    }

    bounceBlock(block) {
        const minX = block.x - this.radius;
        const maxX = block.maxX + this.radius;
        const minY = block.y - this.radius;
        const maxY = block.maxY + this.radius;

        if (
            this.x >= minX &&
            this.x <= maxX &&
            this.y >= minY &&
            this.y <= maxY
        ) {
            const x1 = Math.abs(minX - this.x);
            const x2 = Math.abs(maxX - this.x);
            const y1 = Math.abs(minY - this.y);
            const y2 = Math.abs(maxY - this.y);
            const min1 = Math.min(x1, x2);
            const min2 = Math.min(y1, y2);
            const min = Math.min(min1, min2);

            if (min == min1) {
                this.vx *= -1;
                this.x += this.vx;
            } else if (min == min2) {
                this.vy *= -1;
                this.y += this.vy;
            }
            return 0;
        }
        return 1;
    }
}
