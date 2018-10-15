namespace core {
  export class slide2 extends Phaser.Scene {
    private template: template;
    private raster2: Phaser.GameObjects.TileSprite;
    private scroller: Phaser.GameObjects.DynamicBitmapText;
    private s: any;

    constructor(test) {
      super({ key: "slide2" });
    }

    preload() {
      console.log("slide2:preload");
    }

    create() {
      console.log("slide2:create");

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

      this.cache.bitmapFont.add(
        "scrollFont",
        Phaser.GameObjects.RetroFont.Parse(this, config)
      );
      //this.template = new template(this);
      this.s = { y: -8 };
      playSound(gameSound.fairlight);

      this.add
        .image(540, 200, "fairlight-logo")
        .setDepth(100)
        .setScale(2);
      let _raster = this.add
        .image(540, 80, "fairlight-raster")
        .setDepth(101)
        .setScale(2);
      this.tweens.add({
        targets: _raster,
        y: {
          value: 360,
          duration: 2000,
          ease: "Quad.easeInOut",
          repeat: -1,
          yoyo: -1
        },
        onStart: function() {},
        onComplete: function() {},
        onYoyo: function() {
          _raster.setDepth(99);
        },
        onRepeat: function() {
          _raster.setDepth(101);
        }
      });

      this.add
        .dynamicBitmapText(
          0,
          275,
          "scrollFont",
          "   THE HOME OF THE REAL CRACKERS  "
        )
        .setScale(4)
        .setDepth(100);

      this.add
        .dynamicBitmapText(0, 410, "scrollFont", "             PRESENTS")
        .setScale(4)
        .setDepth(100);

      this.add
        .dynamicBitmapText(
          0,
          680,
          "scrollFont",
          "-- SWEDISH QUALITY AT IT'S BEST --"
        )
        .setScale(4)
        .setDepth(100);

      this.raster2 = this.add
        .tileSprite(0, 480, 1080, 48, "fairlight-raster2")
        .setOrigin(0);

      this.add
        .bitmapText(0, 490, "commodore", "        THE YODAS CREW ++", 32) //"                                    "
        .setOrigin(0)
        .setDepth(100)
        .setTint(0x000000);

      this.scroller = this.add.dynamicBitmapText(
        0,
        550,
        "scrollFont",
        "                                  FAIRLIGHT IS PROUD TO PRESENT A NEW RELEASE: THE YODAS CREW ++       CRACKED BY WOODOO ON 27/10/2018... ENJOY!"
      );

      this.scroller.setScale(4);
      /* this.scroller.setDisplayCallback(data => {
        //data.y += 8 + this.s.y * Math.sin(data.index);
        data.y += 8 + this.s.y + Math.sin(this.s.y);

        return data;
      });*/

      this.tweens.add({
        targets: this.scroller,
        duration: 1000,
        y: 600,
        repeat: -1,
        ease: "Quad.easeIn",
        yoyo: true
      });
    }

    update(time, delta): void {
      //this.template.update();
      this.raster2.tilePositionY += 0.45;

      this.scroller.scrollX += 0.05 * delta;

      if (this.scroller.scrollX > 1200) {
        this.scroller.scrollX = 0;
      }
    }
  }
}
