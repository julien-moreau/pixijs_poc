namespace PIXI {
    export class AlphaDemo implements IDemo {
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
            let loader = new PIXI.loaders.Loader();
            loader.add("./assets/bg.jpg");
            loader.add("./assets/flowerTop.png");
            loader.add("./assets/floor.png");
            loader.add("./assets/mask.png");
            loader.add("./assets/sprites.png");
            loader.add("./assets/sprites.json");

            loader.load(() => {
                let cover = Sprite.fromFrame("./assets/bg.jpg");
                cover.resize = Resize.COVER;
                this.stage.addChild(cover);

                // Simple
                let flower = Sprite.fromFrame("./assets/flowerTop.png");
                flower.x = -100;
                flower.dock = Dock.CENTER_ALL;
                flower.interactive = true;
                flower.pivot.set(flower.width / 2, flower.height / 2);
                this.stage.addChild(flower);

                let mask = Sprite.fromFrame("./assets/floor.png");
                mask.pivot.set(mask.width / 2, mask.height / 2);
                flower.addChild(mask);
                flower.mask = mask;

                flower.on("tap", () => {
                    this.game.spine.run();
                });

                // Spritesheet
                // sp_mask_diamond.png
                let maskSp = new Sprite(Texture.fromFrame("sp_mask_diamond.png"));
                maskSp.texture = this.renderer.generateTexture(maskSp);
                maskSp.cacheAsBitmap = true;
                maskSp.dock = Dock.CENTER_HORIZONTAL;

                let container = new Container();
                container.x = 100;
                container.dock = Dock.CENTER_ALL;
                container.mask = maskSp;
                container.addChild(maskSp);
                this.stage.addChild(container);

                for (let i =0; i < 7; i++) {
                    let diamond = Sprite.fromFrame("blue/sp_diamond_blue_0" + i + ".png");
                    diamond.y = -7 * 40 + i * 80;
                    container.addChild(diamond);
                }

                // Update
                let time = 0;
                this.renderer.on('prerender', () => {
                    mask.rotation = Math.cos(time);
                    flower.rotation = Math.sin(time);
                    time += 0.02;

                    maskSp.y = -250 + 300 * Math.cos(time / 4);
                });

                this.game.start();
                this.game.resize();
            });
        }
    }
}