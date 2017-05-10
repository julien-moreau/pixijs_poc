namespace PIXI {
    export class PerformanceDemo implements IDemo {
        public stage: Container;
        public renderer: SystemRenderer;

        // Constructor
        constructor(public game: Game) {
            this.stage = game.stage;
            this.renderer = game.renderer;
        }

        public run () {
            this.game.clear();

            // Load
            let loader = new PIXI.loaders.Loader("./assets");
            loader.add("flowerTop.png");
            loader.add("snow.jpg");

            loader.load(() => {
                let cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = Resize.COVER;
                cover.name = "cover";
                this.stage.addChild(cover);

                // Create multiple sprites
                const sprites: Sprite[] = [];
                const count = 500;

                for (let i = 0; i < count; i++) {
                    const sprite = Sprite.fromImage("flowerTop.png");
                    sprite.x = this.renderer.width * Math.random();
                    sprite.y = this.renderer.height * Math.random();
                    sprite.pivot.x = sprite.width / 2;
                    sprite.pivot.y = sprite.height / 2;
                    this.stage.addChild(sprite);

                    sprites.push(sprite);
                }

                let time = 0;
                let inverse = 1.0;

                this.renderer.on('prerender', () => {
                    for (let i = 0; i < count; i++) {
                        time += 0.0001 * Math.random();
                        sprites[i].rotation = Math.tan(time);
                        inverse *= -1;
                    }
                });

                this.game.start();
                this.game.resize();
            });
        }
    }
}