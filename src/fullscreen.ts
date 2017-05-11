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
                    setTimeout(() => this.game.responsive.run(), 3000);

                    const requestFunction = this.game.view.requestFullscreen || this.game.view.msRequestFullscreen || this.game.view.webkitRequestFullscreen || this.game.view.mozRequestFullScreen;
                    if (!requestFunction)
                        return;
                    
                    requestFunction.call(this.game.view);

                    this.game.view.removeEventListener("click", enterFullscreen);
                    this.game.view.removeEventListener("touchstart", enterFullscreen);
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
                this.game.view.addEventListener("touchstart", enterFullscreen);

                this.game.start();
            });
        }
    }
}