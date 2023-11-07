import { Ball } from "./ball.js";
import { Block } from "./block.js";
import { Bar } from "./bar.js";

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        document.addEventListener("keydown", this.key_down.bind(this), false);

        this.block = [];
        this.blockbreak = [];

        this.ball = new Ball(200, 400, 10, 2);
        this.bar = new Bar(250, 480, 100, 5, 10);
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 4; j++) {
                this.block[i*4+j] = new Block((i+1)*50, (j+1)*50, 50, 50, i*4+j);
                this.blockbreak[i*4+j] = 1;
            }
        }
        window.requestAnimationFrame(this.animate.bind(this));
    }

    key_down(e) {
        this.bar.move(e.key, this.stageWidth);
    }

    resize() {
        this.stageWidth = 500;
        this.stageHeight = 500;

        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
    }

    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.canvas.width*2, this.canvas.height*2);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.bar);
        this.bar.draw(this.ctx);
        for (var i = 0; i < 8; i++) {
            for(var j = 0; j < 4; j++) {
                if(this.blockbreak[i*4+j] == 1) {
                    this.block[i*4+j].draw(this.ctx);
                    this.blockbreak[i*4+j] = this.ball.bounceBlock(this.block[i*4+j]);
                }
            }
        }
        this.ball.bounceBar(this.bar);
    }
}

window.onload = () => {
    new App();
};
