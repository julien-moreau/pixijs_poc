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
                cover.dock = Dock.CENTER_ALL;
                cover.name = "cover";
                this.stage.addChild(cover);

                let view = new PIXI.Container();
                view.name = "view";
                view.dock = Dock.CENTER_ALL;
                view.resize = Resize.CONTAIN;
                this.stage.addChild(view);

                let container = new PIXI.Container();
                container.name = "container";
                //container.dock = Dock.CENTER_ALL;
                view.addChild(container);

                let back = PIXI.Sprite.fromFrame("bg1.jpg");
                //back.dock = Dock.CENTER_ALL;
                back.name = "back";
                container.addChild(back);

                let child = PIXI.Sprite.fromFrame("reflectivity.png");
                child.dock = Dock.RIGHT | Dock.TOP;
                child.name = "child";
                container.addChild(child);

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