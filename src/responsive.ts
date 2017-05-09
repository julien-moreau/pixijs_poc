namespace PIXI {
    export class ResponsiveDemo implements IDemo {
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
            loader.add("floor.png");
            loader.add("reflectivity.png");
            loader.add("snow.jpg");
            loader.add("bg1.jpg");

            loader.load(() => {
                let cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = Resize.COVER;
                cover.name = "cover";
                this.stage.addChild(cover);

                let view = new Container();
                view.name = "view";
                view.dock = Dock.CENTER_ALL;
                view.resize = Resize.CONTAIN;
                view.viewport = new Viewport(1024, 768);
                this.stage.addChild(view);

                let back = PIXI.Sprite.fromFrame("bg1.jpg");
                back.name = "back";
                back.interactive = true;
                view.addChild(back);

                back.once("tap", () => {
                    this.game.blur.run();
                });

                let child = PIXI.Sprite.fromFrame("reflectivity.png");
                child.dock = Dock.BOTTOM;
                child.name = "child";
                view.addChild(child);

                let container = new Container();
                container.name = "container";
                container.dock = Dock.RIGHT | Dock.CENTER_VERTICAL;
                container.scale.set(0.3, 0.3);
                container.x = 50;
                view.addChild(container);

                let spriteContainer1 = PIXI.Sprite.fromFrame("floor.png");
                container.addChild(spriteContainer1);

                container.pivot.x = spriteContainer1.width / 2;
                container.pivot.y = spriteContainer1.height / 2;

                let time = 0;
                this.renderer.on('prerender', () => {
                    child.rotation += 0.1;

                    container.x = 400 * Math.cos(time * 4);
                    container.y = 400 * Math.sin(time * 4);
                    container.rotation = time;

                    time += 0.01;
                });

                this.game.start();
                this.game.resize();
            });
        }
    }
}