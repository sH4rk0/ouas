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
        goState(
          presentationData.slides[0].state,
          presentationData.slides[0].state,
          this.game
        );
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

/*
module core {
	export class preloader extends Phaser.State {

		game: Phaser.Game;
		startBtn: Phaser.Image;
		loadingBar: Phaser.Image;
		loadingPerc: Phaser.Text;



		preload() {

			try {

				this.game.load.onLoadStart.add(() => { }, this);
				this.game.load.onFileStart.add(() => { }, this);
				this.game.load.onFileError.add((filekey, file) => { }, this);
				this.game.load.onFileComplete.add(this.fileComplete, this);

				this.game.load.onLoadComplete.add(() => {

					this.loadingBar.visible = false;
					this.loadingPerc.visible = false;
					this.startBtn.visible = true;
					this.startBtn.inputEnabled = true;
					this.startBtn.events.onInputDown.add(() => { this.startGame(); }, this);

					//this.game.input.onTap.addOnce(this.startGame, this);

				}, this);


				//start button
				//--------------------------
				this.startBtn = this.game.add.image(this.game.world.centerX, this.game.world.centerY, this.game.cache.getBitmapData('startBtn'));
				this.startBtn.anchor.setTo(0.5);

				var _spriteText = this.game.add.text(0, 0, 'START', { fill: '#ffffff' });

				_spriteText.anchor.set(0.5);
				this.startBtn.addChild(_spriteText);
				this.startBtn.visible = false;

				//Loading container
				//--------------------------

				this.loadingBar = this.game.add.image(this.game.world.centerX, this.game.world.centerY, this.game.cache.getBitmapData('loadingBar'));
				this.loadingBar.anchor.setTo(0.5);
				this.loadingPerc = this.game.add.text(0, 0, '0%', { wordWrap: true, wordWrapWidth: this.loadingBar.width, fill: '#ffffff', stroke: '#0096ff', strokeThickness: 5 });
				this.loadingPerc.anchor.set(0.5);
				this.loadingBar.addChild(this.loadingPerc);
				this.game.load.setPreloadSprite(this.loadingBar);

				//Assets Load
				//--------------------------	
				// IMAGES		
				for (var i = 0; i < gameData.assets.images.length; i++) { this.game.load.image(gameData.assets.images[i].name, gameData.assets.images[i].path); }

				// SPRITESHEETS		
				for (var i = 0; i < gameData.assets.spritesheets.length; i++) {
					this.game.load.spritesheet(gameData.assets.spritesheets[i].name, gameData.assets.spritesheets[i].path, gameData.assets.spritesheets[i].width, gameData.assets.spritesheets[i].height, gameData.assets.spritesheets[i].frames);
				}
				//bitmap fonts
				for (var i = 0; i < gameData.assets.bitmapfont.length; i++) {
					this.game.load.bitmapFont(gameData.assets.bitmapfont[i].name, gameData.assets.bitmapfont[i].imgpath, gameData.assets.bitmapfont[i].xmlpath);
				}

				// SOUNDS		

				for (var i = 0; i < gameData.assets.sounds.length; i++) {
					this.game.load.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].paths);
				}

				//this.game.load.script('webfont', '/js/libs/webfont.js');

			} catch (err) { }

		}

		fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

			try {
				this.loadingPerc.text = progress + "%";

			} catch (err) { }

		}


		startGame() {

			console.log("preload start")
			//startTimer();
			goState(presentationData.slides[0].state, fadeType.RANDOM, this.game);


		}


	}

}

*/
