/// <reference types="pixi.js" />
declare namespace PIXI {
    interface IDemo {
        run(): void;
    }
    class Game extends Application {
        responsive: ResponsiveDemo;
        blur: BlurDemo;
        alpha: AlphaDemo;
        performance: PerformanceDemo;
        spine: SpineDemo;
        constructor(options: IApplicationOptions, noWebGL: boolean, useSharedTicket: boolean);
        resize(): void;
        clear(): void;
    }
}
