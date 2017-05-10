///<reference path="../node_modules/pixi-spine/bin/pixi-spine.d.ts" />

namespace PIXI {
    export class SpineDemo implements IDemo {
        public stage: Container;
        public renderer: SystemRenderer;

        // Constructor
        constructor(public game: Game) {
            this.stage = game.stage;
            this.renderer = game.renderer;
        }

        public run () {
            this.game.clear();
            this.game.resize();

            // Load
            loader.baseUrl = "./assets";
            loader.add("snow.jpg");
            loader.add("frond_03.png");
            loader.add("spineboy", "spineboy.json");

            loader.load((loader: PIXI.loaders.Loader, res: any) => {
                let cover = PIXI.Sprite.fromFrame("snow.jpg");
                cover.resize = Resize.COVER;
                cover.name = "cover";
                this.stage.addChild(cover);

                // Create contain container
                let container = new Container();
                container.resize = Resize.CONTAIN;
                container.dock = Dock.CENTER_ALL;
                container.viewport = new Viewport(1280, 800);
                this.stage.addChild(container);

                // Create multiple sprites
                let spineBoy = new PIXI.spine.Spine(res.spineboy.spineData);
                spineBoy.viewport = new Viewport(1, 1);
                spineBoy.state.setAnimation(0, "walk", true);
                spineBoy.x -= spineBoy.width;
                spineBoy.dock = Dock.BOTTOM;
                spineBoy.interactive = true;
                container.addChild(spineBoy);

                spineBoy.on("tap", () => {
                    this.game.performance.run();
                });

                TweenMax.to(spineBoy, 2, {
                    ease: Power0.easeNone,
                    x: this.renderer.width / 2,
                    onComplete: () => {
                        spineBoy.state.setAnimation(0, "jump", false).onComplete = () => {
                            TweenMax.to(spineBoy, 4, {
                                ease: Power0.easeNone,
                                x: this.renderer.width * 2,
                                onComplete: () => this.game.performance.run()
                            });
                        };

                        spineBoy.state.addAnimation(0, "walk", true, 0);

                        TweenMax.to(spineBoy, 1, {
                            ease: Power0.easeNone,
                            x: spineBoy.x + 300
                        });
                    }
                });

                // Stip
                const stripContainer = new Container();
                stripContainer.dock = Dock.CENTER_ALL;
                container.addChild(stripContainer);

                const stripTexture = PIXI.Texture.fromImage("frond_03.png");

                const points: Point[] = [];
                for (var i = 0; i < 25; i++)
                    points.push(new Point(stripTexture.width / 25 * i, 15));
                
                const strip = new mesh.Rope(stripTexture, points);
                strip.name = "strip";
                strip.dock = Dock.CENTER_ALL;
                strip.viewport = new Viewport(1, 1);
                stripContainer.addChild(strip);

                let time = 0;
                this.renderer.on("prerender", () => {
                    time += 0.05;

                    for (var i = 0; i < points.length; i++) {
                        points[i].y = Math.sin((i * 0.5) + time) * 30;
                        points[i].x = i * stripTexture.width / 25 + Math.cos((i * 0.3) + time) * 20;
                    }

                    stripTexture.update();
                });

                // Finish
                this.game.start();
                this.game.resize();
            });
        }
    }
}