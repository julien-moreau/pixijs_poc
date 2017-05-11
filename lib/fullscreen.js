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
                    setTimeout(function () { return _this.game.responsive.run(); }, 3000);
                    var requestFunction = _this.game.view.requestFullscreen || _this.game.view.msRequestFullscreen || _this.game.view.webkitRequestFullscreen || _this.game.view.mozRequestFullScreen;
                    if (!requestFunction)
                        return;
                    requestFunction.call(_this.game.view);
                    _this.game.view.removeEventListener("click", enterFullscreen);
                    _this.game.view.removeEventListener("touchstart", enterFullscreen);
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
                _this.game.view.addEventListener("touchstart", enterFullscreen);
                _this.game.start();
            });
        };
        return FullscreenDemo;
    }());
    PIXI.FullscreenDemo = FullscreenDemo;
})(PIXI || (PIXI = {}));
//# sourceMappingURL=fullscreen.js.map