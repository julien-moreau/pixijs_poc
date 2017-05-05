namespace PIXI {
    export class Game extends Application {
        
        constructor (options: IApplicationOptions, noWebGL: boolean, useSharedTicket: boolean) {
            super(0, 0, {
                antialias: true,
                autoResize: true,
                backgroundColor: 0x0,
                view: options.view || <HTMLCanvasElement> document.getElementById("renderCanvas")
            }, noWebGL, useSharedTicket);

            this.stage.name = "stage";

            window.addEventListener("resize", () => this.resize());

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
                view.addChild(back);

                let child = PIXI.Sprite.fromFrame("reflectivity.png");
                child.dock = Dock.BOTTOM;
                child.name = "child";
                view.addChild(child);

                let container = new Container();
                container.name = "container";
                container.dock = Dock.RIGHT | Dock.CENTER_VERTICAL;
                container.scale.set(0.5, 0.5);
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

                this.start();
                this.resize();
            });
        }

        public resize () {
            this.renderer.resize(window.innerWidth, window.innerHeight);

            this.stage.width = this.renderer.width;
            this.stage.height = this.renderer.height;

            this.stage.scale.set(1, 1);
        }
    }
}