/// <reference types="pixi.js" />
declare namespace PIXI {
    interface IDemo {
        run(): void;
    }
    class Game extends Application {
        responsive: ResponsiveDemo;
        blur: BlurDemo;
        alpha: AlphaDemo;
        spine: SpineDemo;
        performance: PerformanceDemo;
        particlesDemo: ParticlesDemo;
        fullscreenDemo: FullscreenDemo;
        constructor(options: IApplicationOptions, noWebGL: boolean, useSharedTicket: boolean);
        resize(): void;
        clear(): void;
    }
}
