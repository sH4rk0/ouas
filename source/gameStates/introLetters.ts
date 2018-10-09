namespace core {
  export enum typeText {
    letters,
    numbers
  }
  export class introLetter extends Phaser.GameObjects.BitmapText {
    private letters: Array<Array<string>> = [
      [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],

      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    ];

    private endChar: string;
    private charType: typeText;
    private charBack: Phaser.GameObjects.BitmapText;
    private color: number;
    private color2: number;

    constructor(
      scene: Phaser.Scene,
      x: number,
      y: number,
      endChar: string,
      delay: number,
      color: number,
      color2: number,
      backColor: number,
      group: Phaser.GameObjects.Container
    ) {
      super(scene, x, y, "digital", "", 110);

      this.endChar = endChar;
      this.charType = typeText.letters;
      this.color = color;
      this.color2 = color2;

      this.charBack = scene.add.bitmapText(x, y, "digital", "0", 110);
      this.charBack.tint = backColor;
      group.add(this.charBack);

      group.add(this);

      this.tint = color;
      this.scene.time.delayedCall(
        delay,
        () => {
          this.start();
        },
        null,
        this
      );
    }

    update() {}

    updateValue(value: string) {
      this.setText(value);
    }

    start() {
      var scoreTween = this.scene.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 1000,
        onUpdate: () => {
          this.setText(this.letters[0][Phaser.Math.RND.integerInRange(0, 20)]);
        },
        onComplete: () => {
          this.setText(this.endChar);
        }
      });
    }
  }
}
