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
            let loader = new PIXI.loaders.Loader("./assets");
            loader.add("snow.jpg");
            loader.add("flowerTop.png");
            loader.add("floor.png");

            loader.load(() => {
                let cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = Resize.COVER;
                this.stage.addChild(cover);

                let flower = PIXI.Sprite.fromFrame("flowerTop.png");
                flower.dock = Dock.CENTER_ALL;
                flower.interactive = true;
                flower.pivot.set(flower.width / 2, flower.height / 2);
                this.stage.addChild(flower);

                let mask = PIXI.Sprite.fromFrame("floor.png");
                mask.pivot.set(mask.width / 2, mask.height / 2);
                flower.addChild(mask);
                flower.mask = mask;

                flower.on("tap", () => {
                    debugger;
                });

                let time = 0;
                this.renderer.on('prerender', () => {
                    mask.rotation = Math.cos(time);
                    flower.rotation = Math.sin(time);
                    time += 0.02;
                });

                this.game.start();
                this.game.resize();
            });
        }
    }
}