System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DockState;
    return {
        setters: [],
        execute: function () {
            (function (DockState) {
                DockState[DockState["LEFT"] = 1] = "LEFT";
                DockState[DockState["RIGHT"] = 2] = "RIGHT";
                DockState[DockState["TOP"] = 4] = "TOP";
                DockState[DockState["BOTTOM"] = 8] = "BOTTOM";
                DockState[DockState["CENTER_HORIZONTAL"] = 16] = "CENTER_HORIZONTAL";
                DockState[DockState["CENTER_VERTICAL"] = 32] = "CENTER_VERTICAL";
                DockState[DockState["CENTER_ALL"] = 48] = "CENTER_ALL";
            })(DockState || (DockState = {}));
            exports_1("DockState", DockState);
        }
    };
});
//# sourceMappingURL=dockState.js.map