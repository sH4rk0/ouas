namespace core {
  export class Preloader extends Phaser.Scene {
    body: HTMLElement;

    constructor(test) {
      super({
        key: "Preloader"
      });
    }

    preload() {
      console.log("Preloader:preload");

      this.loadAssets();
    }

    init() {
      this.body = document.getElementsByTagName("body")[0];
    }

    create() {
      //console.log("Preloader:create");
    }

    loadAssets(): void {
      this.body.className = "loading";

      this.load.on("start", () => {
        //progress.destroy();

        console.log("load start");
      });

      this.load.on("fileprogress", (file, value) => {
        //console.log(file, value);
        /*if (file.key === 'goldrunner')
						{
							progress.clear();
							progress.fillStyle(0xffffff, 0.4);
							progress.fillRect(450, 500 - (value * 400), 200, value * 400);
						}
						*/
      });

      this.load.on("complete", () => {
        //progress.destroy();
        console.log("load assetts complete");
        gameData.assets.sounds.forEach(element => {
          var _sound: Phaser.Sound.BaseSound = this.sound.add(element.name);
          pushSound(_sound);
        });

        this.body.className = "";
        goState(presentationData.slides[0].state, this.game);
      });

      //Assets Load
      //--------------------------
      // IMAGES
      gameData.assets.images.forEach(element => {
        // console.log(element);
        this.load.image(element.name, element.path);
      });

      // SPRITESHEETS
      gameData.assets.spritesheets.forEach(element => {
        this.load.spritesheet(element.name, element.path, {
          frameWidth: element.width,
          frameHeight: element.height,
          endFrame: element.frames
        });
      });

      //bitmap fonts
      gameData.assets.bitmapfont.forEach(element => {
        this.load.bitmapFont(element.name, element.imgpath, element.xmlpath);
      });

      // SOUNDS
      gameData.assets.sounds.forEach(element => {
        this.load.audio(element.name, element.paths);
      });
    }
  }
}
