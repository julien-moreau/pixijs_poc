namespace PIXI {
    export interface IDemo {
        run(): void;
    }

    export class Game extends Application {
        // Public members
        public responsive: ResponsiveDemo;
        public blur: BlurDemo;
        public alpha: AlphaDemo;
        public performance: PerformanceDemo;
        public spine: SpineDemo;

        // Constructor
        constructor (options: IApplicationOptions, noWebGL: boolean, useSharedTicket: boolean) {
            super(0, 0, {
                antialias: true,
                autoResize: true,
                backgroundColor: 0x0,
                view: options.view || <HTMLCanvasElement> document.getElementById("renderCanvas")
            }, noWebGL, useSharedTicket);

            this.stage.name = "stage";
            window.addEventListener("resize", () => this.resize());

            // Demos
            this.responsive = new ResponsiveDemo(this);
            this.blur = new BlurDemo(this);
            this.alpha = new AlphaDemo(this);
            this.performance = new PerformanceDemo(this);
            this.spine = new SpineDemo(this);

            // Run
            this.responsive.run();
        }

        // Resizes the stage
        public resize () {
            this.renderer.resize(window.innerWidth, window.innerHeight);

            this.stage.width = this.renderer.width;
            this.stage.height = this.renderer.height;

            this.stage.scale.set(1, 1);
        }

        // Clears the stage
        public clear () {
            this.stop();
            this.stage.children.forEach(c => this.stage.removeChild(c));
        }
    }
}