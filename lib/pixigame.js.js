System.register(["./application/game", "./container/resizeType", "./container/dockState", "./container/viewport-container"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var game_1, resizeType_1, dockState_1, viewport_container_1;
    return {
        setters: [
            function (game_1_1) {
                game_1 = game_1_1;
            },
            function (resizeType_1_1) {
                resizeType_1 = resizeType_1_1;
            },
            function (dockState_1_1) {
                dockState_1 = dockState_1_1;
            },
            function (viewport_container_1_1) {
                viewport_container_1 = viewport_container_1_1;
            }
        ],
        execute: function () {
            exports_1("PixiGame", game_1.default);
            exports_1("ResizeType", resizeType_1.ResizeType);
            exports_1("DockState", dockState_1.DockState);
            exports_1("ViewPortContainer", viewport_container_1.default);
        }
    };
});
//# sourceMappingURL=pixigame.js.js.map