/// <reference path="../node_modules/pixi-spine/bin/pixi-spine.d.ts" />
/// <reference types="pixi.js" />
declare namespace PIXI {
    class SpineDemo implements IDemo {
        game: Game;
        renderer: SystemRenderer;
        constructor(game: Game);
        run(): void;
    }
}
