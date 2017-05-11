namespace PIXI {
    export class ResponsiveDemo implements IDemo {
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
            loader.add("floor.png");
            loader.add("reflectivity.png");
            loader.add("snow.jpg");
            loader.add("touhou4dead2.jpg");

            loader.load(() => {
                let cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = Resize.COVER;
                cover.name = "cover";
                this.game.stage.addChild(cover);

                let view = new Container();
                view.name = "view";
                view.resize = Resize.CONTAIN;
                view.viewport = new Viewport(1024, 1024);
                this.game.stage.addChild(view);

                let back = PIXI.Sprite.fromFrame("touhou4dead2.jpg");
                back.name = "back";
                back.dock = Dock.CENTER_ALL;
                back.interactive = true;
                view.addChild(back);

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

                // GUI
                const gui = new dat.GUI();
                const docks = {
                    value: "CONTAIN",
                    values: ["CONTAIN", "FITCONTAIN", "NONE"]
                };
                gui.add(docks, "value", docks.values).name("Dock").onFinishChange((result: string) => {
                    view.resize = Resize[result];
                });

                // Events
                const next = () => {
                    gui.domElement.remove();
                    this.game.blur.run();
                };

                back.once("click", next);
                back.once("tap", next);
            });
        }
    }
}