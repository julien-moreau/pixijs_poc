/// <reference types="pixi.js" />
declare namespace PIXI {
    class Game extends Application {
        constructor(options: IApplicationOptions, noWebGL: boolean, useSharedTicket: boolean);
        resize(): void;
    }
}
