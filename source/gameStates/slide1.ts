namespace core {
  export class slide1 extends Phaser.Scene {
    constructor(test) {
      super({ key: "slide1" });
    }

    preload() {
      console.log("slide1:preload");
    }

    public groupPast: Phaser.GameObjects.Container;
    public groupNow: Phaser.GameObjects.Container;
    private celebrating: Phaser.GameObjects.Image;
    private fade: Phaser.GameObjects.Sprite;
    private letters: Array<introLetter> = [];
    private texts: Array<Array<string>> = [
      [],
      ["O", "C", "T", "2", "7", "2", "0", "1", "8", "1", "0", "0", "0"]
    ];

    create() {
      playSound(gameSound.intro);

      this.texts[0] = this.dateArray();
      // console.log(_month + "" + _day + "" + _year + "" + _hour + "" + _minute);

      let offset: number = 0;
      this.groupPast = this.add.container(540, 0);
      this.groupPast.add(this.add.image(0, 0, "introNow"));
      let _dot = this.add.sprite(348, 0, "dots2");

      if (_dot.anims.animationManager.get("anim") == undefined) {
        _dot.anims.animationManager.create({
          key: "anim",
          frames: this.anims.generateFrameNumbers("dots2", {
            frames: [0, 1]
          }),
          frameRate: 2,
          repeat: -1
        });
      }
      _dot.play("anim");
      this.groupPast.add(_dot);
      this.groupPast.setY(-100).setAlpha(0);
      offset = 0;
      this.letters = [];
      this.texts[0].forEach((element, index) => {
        if (index == 3) {
          offset = 60;
        }
        if (index == 5) {
          offset = 120;
        }
        if (index == 9) {
          offset = 210;
        }
        if (index == 11) {
          offset = 270;
        }

        this.letters.push(
          new introLetter(
            this,
            52 * index + 45 + offset - 510,
            -55,
            element,
            200 * index + 4000,
            0xfcb13c,
            0xfcb13d,
            0x422304,
            this.groupPast
          )
        );
      });

      this.add.tween({
        targets: this.groupPast,
        alpha: 1,
        y: 150,
        duration: 1000,
        delay: 4000
      });

      this.groupNow = this.add.container(540, 0);
      this.groupNow.setAlpha(0).setY(720);
      this.groupNow.add(this.add.image(0, 0, "introPast"));
      let _dot2 = this.add.sprite(345, 0, "dots");

      if (_dot.anims.animationManager.get("anim2") == undefined) {
        _dot2.anims.animationManager.create({
          key: "anim2",
          frames: this.anims.generateFrameNumbers("dots", {
            frames: [0, 1]
          }),
          frameRate: 2,
          repeat: -1
        });
      }
      _dot2.play("anim2");
      this.groupNow.add(_dot2);
      offset = 0;
      this.texts[1].forEach((element, index) => {
        if (index == 3) {
          offset = 60;
        }
        if (index == 5) {
          offset = 120;
        }
        if (index == 9) {
          offset = 210;
        }
        if (index == 11) {
          offset = 270;
        }
        new introLetter(
          this,
          52 * index + 45 + offset - 510,
          -55,
          element,
          200 * index + 10000,
          0x00ff00,
          0x00ee00,
          0x04200a,
          this.groupNow
        );
      });

      this.add.tween({
        targets: this.groupNow,
        alpha: 1,
        y: 580,
        duration: 1000,
        delay: 10000
      });

      var raster3 = this.make.sprite({
        x: 540,
        y: 300,
        key: "raster",
        add: true
      });
      raster3.setAlpha(0);

      var raster2 = this.make.sprite({
        x: 540,
        y: 300,
        key: "raster",
        add: true
      });
      raster2.setAlpha(0);

      var raster = this.make.sprite({
        x: 540,
        y: 300,
        key: "raster",
        add: true
      });
      raster.setAlpha(0);

      this.celebrating = this.add.image(540, 370, "ouas");
      this.celebrating.setAlpha(0);

      this.add.tween({
        targets: [this.celebrating],
        alpha: 1,
        onComplete: () => {
          this.add.tween({
            targets: raster,
            alpha: 1,
            y: {
              value: 440,
              duration: 1500,
              ease: "Sine.easeInOut",
              yoyo: true,
              repeat: -1
            },
            duration: 1000,
            delay: 0
          });

          this.add.tween({
            targets: raster2,
            alpha: 1,
            y: {
              value: 440,
              duration: 1500,
              ease: "Sine.easeInOut",
              yoyo: true,
              repeat: -1
            },
            duration: 1000,
            delay: 300
          });

          this.add.tween({
            targets: raster3,
            alpha: 1,
            y: {
              value: 440,
              duration: 1500,
              ease: "Sine.easeInOut",
              yoyo: true,
              repeat: -1
            },
            duration: 1000,
            delay: 600
          });
        },
        duration: 1000,
        delay: 15500
      });

      this.time.addEvent({
        delay: 1000 * 60,
        callback: () => {
          this.updateDate();
        },
        callbackScope: this,
        loop: true
      });
    }

    updateDate() {
      console.log("updateDate");

      this.texts[0] = this.dateArray();

      console.log(this.texts[0], this.letters);
      this.letters.forEach((letter: introLetter, index: number) => {
        letter.updateValue(this.texts[0][index]);
      });
    }
    introLetter;

    dateArray(): Array<string> {
      let arr: Array<string> = [];

      let newDate = new Date();
      let _day: string;
      let _month: string;
      let _year: number;
      let _hour: string;
      let _minute: string;

      if (newDate.getDay().toString().length == 1) {
        _day = "0" + newDate.getDay().toString();
      } else {
        _day = newDate.getDay().toString();
      }

      let locale = "en-us";
      _month = newDate
        .toLocaleString(locale, { month: "long" })
        .toUpperCase()
        .substr(0, 3);
      _year = newDate.getFullYear();

      if (newDate.getHours().toString().length == 1) {
        _hour = "0" + newDate.getHours().toString();
      } else {
        _hour = newDate.getHours().toString();
      }

      if (newDate.getMinutes().toString().length == 1) {
        _minute = "0" + newDate.getMinutes().toString();
      } else {
        _minute = newDate.getMinutes().toString();
      }

      let _date = _month + "" + _day + "" + _year + "" + _hour + "" + _minute;

      for (var i = 0; i < _date.length; i++) {
        arr.push(_date[i]);
      }
      return arr;
    }

    update() {}
  }
}
