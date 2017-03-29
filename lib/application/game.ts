import { Application } from "pixi.js";
import { DockState } from "../container/dockState.js";

// Import dependencies
import  "../container/container.js";

export default class Game extends Application {
    // Public members
    public backStage = new PIXI.Container();
    public frontStage = new PIXI.Container();

    // Constructor
    constructor () {
        // Initialize
        super(0, 0, {
            antialias: true,
            autoResize: false,
            backgroundColor: 0x0,
            view: <HTMLCanvasElement> document.getElementById("renderCanvas")
        }, false);

        // Configure stages
        this.backStage.name = "backStage";
        this.stage.name = "stage";
        this.frontStage.name = "frontStage";

        // Register resize event
        this.view.addEventListener("resize", () => this.resize());
        window.addEventListener("resize", () => this.resize());

        this.resize();
    }

    public render (): void {
        // Render back
        this.renderer.render(this.backStage);

        // Render middle
        const world = new PIXI.Matrix();
        if (this.renderer.height < this.renderer.width)
            world.translate(
                (this.screen.width / 2 / this.stage.scale.x) - (this.stage.width / this.stage.scale.x),
                this.stage.y
            );

        world.scale(this.stage.scale.x, this.stage.scale.y);
        world.rotate(this.stage.rotation);

        const baseTransform = this.stage.transform;

        const transform = new PIXI.Transform();
        transform.setFromMatrix(world);
        this.stage.transform = transform;

        this.renderer.render(this.stage, null, false);
        this.stage.transform = baseTransform;

        // Render front
        this.renderer.render(this.frontStage, null, false);
    }

    // Call to resize
    public resize (): void {
        this.renderer.resize(window.innerWidth, window.innerHeight);

        // Update stage width
        this.stage.width = this.renderer.width;
        this.stage.height = this.renderer.height;

        this.backStage.width = this.renderer.width;
        this.backStage.height = this.renderer.height;

        // Set proper scale
        this.stage.scale.set(1, 1);
        this.backStage.scale.set(1, 1);

        if (this.renderer.height < this.renderer.width)
            this.stage.scale.y = this.stage.scale.x = (this.renderer.height / this.renderer.width);
    }
}
