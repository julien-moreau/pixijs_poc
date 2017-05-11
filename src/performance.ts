namespace PIXI {
    export class PerformanceDemo implements IDemo {
        public renderer: SystemRenderer;

        // Constructor
        constructor(public game: Game) {
            this.renderer = game.renderer;
        }

        public run () {
            this.game.clear();
            this.game.resize();

            // Load
            let loader = new PIXI.loaders.Loader("./assets");
            loader.add("flowerTop.png");
            loader.add("snow.jpg");

            loader.load(() => {
                let cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = Resize.COVER;
                cover.name = "cover";
                this.game.stage.addChild(cover);

                // Create view
                const view = new Container();
                view.resize = Resize.CONTAIN;
                view.dock = Dock.CENTER_ALL;
                view.viewport = new Viewport(1280, 800);
                this.game.stage.addChild(view);

                // Create multiple sprites
                const sprites: Sprite[] = [];
                const count = 200;

                for (let i = 0; i < count; i++) {
                    const sprite = Sprite.fromImage("flowerTop.png");
                    sprite.x = 1280 * Math.random();
                    sprite.y = 800 * Math.random();
                    sprite.pivot.x = sprite.width / 2;
                    sprite.pivot.y = sprite.height / 2;
                    sprite.interactive = true;
                    sprite.on("tap", () => this.game.particlesDemo.run());
                    view.addChild(sprite);

                    sprites.push(sprite);
                }

                let time = 0;

                this.renderer.on('prerender', () => {
                    time += 0.05 * Math.random();
                    let inverse = 1.0;

                    for (let i = 0; i < count; i++) {
                        sprites[i].rotation = Math.tan(time) * inverse;
                        inverse *= -1;
                    }
                });

                this.game.start();
            });
        }
    }
}