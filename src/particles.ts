namespace PIXI {
    export class ParticlesDemo implements IDemo {
        public renderer: SystemRenderer;

        // Constructor
        constructor(public game: Game) {
            this.renderer = game.renderer;
        }

        public run () {
            this.game.clear();
            this.game.resize();

            // Load
            let loader = new PIXI.loaders.Loader("./assets");
            loader.add("eggHead.png");
            loader.add("blue.jpg");

            loader.load(() => {
                let cover = PIXI.Sprite.fromFrame("blue.jpg");
                cover.resize = Resize.COVER;
                cover.name = "cover";
                this.game.stage.addChild(cover);

                // Create multiple sprites
                const sprites: Sprite[] = [];
                const count = 1000;

                const view = new Container();
                view.resize = Resize.CONTAIN;
                view.dock = Dock.CENTER_ALL;
                view.viewport = new Viewport(1280, 800);
                this.game.stage.addChild(view);

                const particle = new particles.ParticleContainer(count, {
                    scale: true,
                    position: true,
                    rotation: true,
                    uvs: true,
                    alpha: true
                });
                view.addChild(particle);

                for (let i = 0; i < count; i++) {
                    const sprite = Sprite.fromImage("eggHead.png");
                    sprite.x = 1280 * Math.random();
                    sprite.y = 800 * Math.random();
                    sprite.anchor.set(0.5, 0.5);

                    sprites.push(sprite);
                    particle.addChild(sprite);
                }

                // Next button
                const text = new Text("Next :)", {
                    fill: "ffffff",
                    fontSize: 86,
                    fontFamily: "comic sans ms",
                    fontStyle: "bold"
                });
                text.dock = Dock.CENTER_HORIZONTAL | Dock.BOTTOM;
                text.interactive = true;
                text.on("tap", () => this.game.fullscreenDemo.run());
                view.addChild(text);

                // Update
                let time = 0;
                this.renderer.on('prerender', () => {
                    time += 0.05 * Math.random();
                    let inverse = 1.0;

                    for (let i = 0; i < count; i++) {
                        sprites[i].rotation = Math.tan(time) * inverse;
                        inverse *= -1;
                    }
                });

                this.game.start();
            });
        }
    }
}