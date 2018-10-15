namespace core {
  export class photoViewer extends Phaser.GameObjects.Container {
    scene: Phaser.Scene;
    private image: Phaser.GameObjects.Image;
    private image2: Phaser.GameObjects.Image;
    private fotoFade: Phaser.GameObjects.Image;
    private raster: Phaser.GameObjects.TileSprite;
    private fotoFrame: Phaser.GameObjects.Image;
    private scroller: Phaser.GameObjects.DynamicBitmapText;
    private scrollText: string;

    constructor(
      scene: Phaser.Scene,
      image: string,
      image2: string,
      text: string
    ) {
      super(scene, 0, 0);
      this.scene = scene;
      this.scrollText = text;
      let config = {
        image: "scrollFont",
        width: 8,
        height: 8,
        chars:
          " ABCDEFGHIJKLMNOPQRSTUVWXYZ!         %&'()*+,-./0123456789:     ",
        charsPerRow: 32,
        spacing: { x: 0, y: 0 },
        offset: { x: 0, y: 0 }
      };

      this.scene.cache.bitmapFont.add(
        "scrollFont",
        Phaser.GameObjects.RetroFont.Parse(this.scene, config)
      );

      this.raster = this.scene.add
        .tileSprite(0, 160, 1080, 116, "fairlight-raster2")
        .setOrigin(0)
        .setAlpha(0);

      this.image = this.scene.add
        .image(540, 430, image)
        .setScale(1)
        .setAlpha(0);

      this.add(this.image);

      this.image2 = this.scene.add
        .image(740, 430, image2)
        .setScale(1)
        .setAlpha(0);

      this.add(this.image2);

      this.fotoFade = this.scene.add
        .image(540, 430, "foto-fade")
        .setScale(1)
        .setAlpha(0);

      this.add(this.fotoFade);

      this.fotoFrame = this.scene.add
        .image(740, 430, "foto-frame")
        .setScale(1)
        .setAlpha(0)
        .setDepth(100);

      this.add(this.fotoFrame);

      this.scene.tweens.add({
        targets: this.raster,
        alpha: { value: 1, duration: 1000, delay: 700 },
        y: {
          value: 600,
          duration: 2000,
          ease: "Quad.easeInOut",
          repeat: -1,
          yoyo: -1
        }
      });

      this.scene.tweens.add({
        targets: [this.image2, this.fotoFrame],
        x: 540,
        alpha: 1,
        duration: 1000,
        ease: "Sine.easeInOut",
        repeat: 0,
        yoyo: 0,

        onComplete: () => {
          this.scene.tweens.add({
            targets: this.fotoFade,
            alpha: 1,
            duration: 250,
            ease: "Sine.easeInOut",
            repeat: 0,
            yoyo: 1,
            delay: 1000,
            onYoyo: () => {
              this.image2.setAlpha(0);
              this.image.setAlpha(1);
            },

            onComplete: () => {}
          });
        }
      });

      let bg = this.scene.add
        .image(0, 580, "scroll-bg")
        .setAlpha(0)
        .setDepth(50)
        .setOrigin(0);

      this.scroller = this.scene.add
        .dynamicBitmapText(0, 600, "scrollFont", this.scrollText)
        .setOrigin(0)
        .setDepth(51);

      this.scroller.setScale(4).setDepth(100);

      this.scene.tweens.add({
        targets: [bg, this.scroller],
        alpha: { value: 0.75, duration: 1000, delay: 700 },
        y: {
          value: 650,
          duration: 2000,
          ease: "Quad.easeIn",
          repeat: -1,
          yoyo: -1
        }
      });

      this.scene.tweens.add({
        targets: this.scroller,
        alpha: { value: 1, duration: 1000, delay: 700 },
        y: {
          value: 670,
          duration: 2000,
          ease: "Quad.easeIn",
          repeat: -1,
          yoyo: -1
        }
      });

      this.scene.add.existing(this);
    }

    update() {
      this.scroller.scrollX += 1;

      if (this.scroller.scrollX > this.scroller.width / 4) {
        this.scroller.scrollX = 0;
      }
    }
  }
}
