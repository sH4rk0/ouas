namespace core {
  export class star extends Phaser.GameObjects.Sprite {
    scene: Phaser.Scene;
    private vel: number;
    private customTint: Array<number> = [
      0xaaaaaa,
      0xbbbbbb,
      0xcccccc,
      0xdddddd,
      0xeeeeee,
      0xffffff
    ];

    constructor(scene: Phaser.Scene) {
      super(scene, 0, 0, "star");
      this.scene = scene;
      this.setScale(1);
      this.setX(Phaser.Math.RND.integerInRange(0, 1080));
      this.setY(Phaser.Math.RND.integerInRange(0, 80));
      this.vel = Phaser.Math.RND.integerInRange(2, 8);
      this.setTint(this.customTint[Phaser.Math.RND.integerInRange(0, 5)]);
    }

    update(): void {
      this.x -= this.vel;

      if (this.x < -10) {
        this.setY(Phaser.Math.RND.integerInRange(0, 80));
        this.setTint(this.customTint[Phaser.Math.RND.integerInRange(0, 5)]);
        this.vel = Phaser.Math.RND.integerInRange(2, 8);
        this.x = 1100;
      }
    }
  }
}
