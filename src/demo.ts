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

            loader.load(() => {
                let cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = Resize.COVER;
                cover.dock = Dock.CENTER_ALL;
                cover.name = "cover";
                this.stage.addChild(cover);

                let back = PIXI.Sprite.fromFrame("floor.png");
                back.dock = Dock.CENTER_ALL;
                back.name = "back";
                this.stage.addChild(back);

                let child = PIXI.Sprite.fromFrame("reflectivity.png");
                child.dock = Dock.CENTER_ALL;
                child.name = "child";
                back.addChild(child);

                this.start();
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