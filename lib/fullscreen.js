var PIXI;
(function (PIXI) {
    var FullscreenDemo = (function () {
        // Constructor
        function FullscreenDemo(game) {
            this.game = game;
            this.renderer = game.renderer;
        }
        FullscreenDemo.prototype.run = function () {
            var _this = this;
            this.game.clear();
            this.game.resize();
            // Load
            var loader = new PIXI.loaders.Loader("./assets");
            loader.add("snow.jpg");
            loader.load(function () {
                var cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = PIXI.Resize.COVER;
                cover.name = "cover";
                _this.game.stage.addChild(cover);
                // Methods
                var enterFullscreen = function () {
                    var requestFunction = _this.game.view.requestFullscreen || _this.game.view.msRequestFullscreen || _this.game.view.webkitRequestFullscreen || _this.game.view.mozRequestFullScreen;
                    if (!requestFunction)
                        return;
                    requestFunction.call(_this.game.view);
                    // Draw text
                    var text = new PIXI.Text("Next :)", {
                        fill: "ffffff",
                        fontSize: 86,
                        fontFamily: "comic sans ms",
                        fontStyle: "bold"
                    });
                    text.dock = PIXI.Dock.CENTER_HORIZONTAL | PIXI.Dock.BOTTOM;
                    text.resize = PIXI.Resize.CONTAIN;
                    _this.game.stage.addChild(text);
                    text.interactive = true;
                    text.on("tap", function () {
                        _this.game.responsive.run();
                        _this.game.view.removeEventListener("click", enterFullscreen);
                    });
                };
                var exitFullscreen = function () {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                    else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    }
                    else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                    else if (document.msCancelFullScreen) {
                        document.msCancelFullScreen();
                    }
                };
                _this.game.view.addEventListener("click", enterFullscreen);
                _this.game.start();
            });
        };
        return FullscreenDemo;
    }());
    PIXI.FullscreenDemo = FullscreenDemo;
})(PIXI || (PIXI = {}));
//# sourceMappingURL=fullscreen.js.map