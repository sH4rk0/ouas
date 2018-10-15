namespace core {
  export class Boot extends Phaser.Scene {
    constructor(test) {
      super({
        key: "Boot"
      });
    }

    preload() {
      var graphics = this.make.graphics({ x: 0, y: 0, add: false });
      graphics.fillStyle(0x6c5eb5, 1);
      graphics.fillRect(0, 0, 1080, 720);
      graphics.generateTexture("bg-commodore", 1080, 720);

      var graphics = this.make.graphics({ x: 0, y: 0, add: false });
      graphics.fillStyle(0x352879, 1);
      graphics.fillRect(0, 0, 640, 400);
      graphics.generateTexture("bg-commodore-blue", 640, 400);

      var graphics = this.make.graphics({ x: 0, y: 0, add: false });
      graphics.fillStyle(0xffffff, 1);
      graphics.fillRect(0, 0, 800, 450);
      graphics.generateTexture("foto-fade", 800, 450);

      var graphics = this.make.graphics({ x: 0, y: 0, add: false });
      graphics.fillStyle(0xffffff, 1);
      graphics.fillRect(0, 0, 2, 2);
      graphics.generateTexture("star", 2, 2);

      var graphics = this.make.graphics({ x: 0, y: 0, add: false });
      graphics.fillStyle(0x000000, 1);
      graphics.fillRect(0, 0, 1080, 70);
      graphics.generateTexture("scroll-bg", 1080, 70);

      //graphics.clear();

      /*var graphics2 = this.make.graphics({ x: 0, y: 0, add: false });
			graphics2.fillRect(0, 0, 50, 126);
			graphics2.generateTexture("playerHitArea", 50, 126);
			graphics2.clear();*/

      console.log("Boot:preload");
    }

    create() {
      console.log("Boot:create");
      this.scene.start("Preloader");
    }
  }
}
