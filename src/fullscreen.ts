namespace PIXI {
    export class FullscreenDemo implements IDemo {
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
            loader.add("snow.jpg");

            loader.load(() => {
                let cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = Resize.COVER;
                cover.name = "cover";
                this.game.stage.addChild(cover);

                // Methods
                const enterFullscreen = () => {
                    const requestFunction = this.game.view.requestFullscreen || this.game.view.msRequestFullscreen || this.game.view.webkitRequestFullscreen || this.game.view.mozRequestFullScreen;
                    if (!requestFunction) return;
                    requestFunction.call(this.game.view);

                    // Draw text
                    const text = new Text("Next :)", {
                        fill: "ffffff",
                        fontSize: 86,
                        fontFamily: "comic sans ms",
                        fontStyle: "bold"
                    });
                    text.dock = Dock.CENTER_HORIZONTAL | Dock.BOTTOM;
                    text.resize = Resize.CONTAIN;
                    this.game.stage.addChild(text);
                    text.interactive = true;
                    text.on("tap", () => {
                        this.game.responsive.run();
                        this.game.view.removeEventListener("click", enterFullscreen);
                    });
                };

                const exitFullscreen = () => {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.msCancelFullScreen) {
                        document.msCancelFullScreen();
                    }
                };

                this.game.view.addEventListener("click", enterFullscreen);

                this.game.start();
            });
        }
    }
}