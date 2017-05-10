namespace PIXI {
    export class SpineDemo implements IDemo {
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
            loader.baseUrl = "./assets";
            loader.add("flowerTop.png");
            loader.add("snow.jpg");
            loader.add("spineboy", "spineboy.json");

            loader.load((loader: PIXI.loaders.Loader, res: any) => {
                let cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = Resize.COVER;
                cover.name = "cover";
                this.stage.addChild(cover);

                // Create contain container
                let container = new Container();
                container.resize = Resize.CONTAIN;
                container.dock = Dock.CENTER_ALL;
                container.viewport = new Viewport(928, 863);
                this.stage.addChild(container);

                // Create multiple sprites
                let spineBoy: Container = new PIXI.spine.Spine(res.spineboy.spineData);
                spineBoy.viewport = new Viewport(1, 1);
                spineBoy.state.setAnimation(0, "walk", true);
                spineBoy.dock = Dock.CENTER_HORIZONTAL | Dock.BOTTOM;
                spineBoy.interactive = true;
                container.addChild(spineBoy);

                spineBoy.on("tap", () => {
                    this.game.performance.run();
                });

                // Greensock


                this.game.start();
                this.game.resize();
            });
        }
    }
}