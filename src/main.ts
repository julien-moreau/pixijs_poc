import * as PIXI from "pixi.js";

import Game from "../lib/application/game.js";
import { DockState } from "../lib/container/dockState.js";
import { ResizeType } from "../lib/container/resizeType.js";

export class Main {
    /**
     * Static members
     */
    public static Run () {
        let game = new Game();

        let loader = new PIXI.loaders.Loader("./assets");
        loader.add("floor.png");
        loader.add("reflectivity.png");
        loader.add("snow.jpg");
        
        loader.load(() => {
            let cover = PIXI.Sprite.fromFrame("snow.jpg");
            cover.resizeType = ResizeType.COVER;
            cover.dockState = DockState.CENTER_ALL;
            cover.name = "cover";
            game.backStage.addChild(cover);

            let back = PIXI.Sprite.fromFrame("floor.png");
            back.dockState = DockState.CENTER_ALL;
            back.name = "back";
            game.stage.addChild(back);

            let child = PIXI.Sprite.fromFrame("reflectivity.png");
            child.dockState = DockState.CENTER_ALL;
            child.name = "child";
            back.addChild(child);

            game.start();
        });

        window["game"] = game;
    }
}
