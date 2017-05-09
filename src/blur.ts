namespace PIXI {
    export class BlurDemo implements IDemo {
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

            loader.load(() => {
                let cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = Resize.COVER;
                this.stage.addChild(cover);

                let flower = PIXI.Sprite.fromFrame("flowerTop.png");
                flower.dock = Dock.CENTER_ALL;
                flower.interactive = true;
                this.stage.addChild(flower);

                flower.on("tap", () => {
                    this.game.alpha.run();
                });

                const blurFilter1 = new PIXI.filters.BlurFilter();
                const blurFilter2 = new PIXI.filters.BlurFilter();

                cover.filters = [blurFilter1];
                flower.filters = [blurFilter2];

                let time = 0;
                this.renderer.on('prerender', () => {
                    blurFilter1.blurX = Math.max(5 * Math.cos(time), 0);
                    blurFilter1.blurY = Math.max(5 * Math.cos(time), 0);

                    blurFilter2.blurX = Math.max(5 * Math.sin(time), 0)
                    blurFilter2.blurY = Math.max(5 * Math.sin(time), 0);

                    time += 0.02;
                });

                this.game.start();
                this.game.resize();
            });
        }
    }
}