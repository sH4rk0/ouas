namespace core {
  export class template extends Phaser.GameObjects.Container {
    scene: Phaser.Scene;
    private tyc: Phaser.GameObjects.Image;
    private subtitle: Phaser.GameObjects.Image;
    private bg: Phaser.GameObjects.TileSprite;
    private mountains: Phaser.GameObjects.TileSprite;
    private trees: Phaser.GameObjects.TileSprite;
    private land: Phaser.GameObjects.TileSprite;
    private water: Phaser.GameObjects.TileSprite;

    constructor(scene: Phaser.Scene) {
      super(scene, 0, 0);
      this.scene = scene;

      this.scene.add.image(0, 0, "bg-commodore").setOrigin(0, 0);
      this.scene.add.image(540, 400, "bg-commodore-blue").setOrigin(0.5);

      this.bg = this.scene.add
        .tileSprite(540, 0, 1080, 150, "bg")
        .setOrigin(0.5, 0)
        .setTilePosition(500);

      this.mountains = this.scene.add
        .tileSprite(540, 50, 1080, 80, "mountains")
        .setOrigin(0.5, 0);

      this.mountains.setTilePosition(200);

      this.tyc = this.scene.add
        .image(400, 40, "tyc")
        .setScale(1)
        .setAlpha(1);

      this.trees = this.scene.add
        .tileSprite(540, 100, 1080, 30, "trees")
        .setOrigin(0.5, 0);

      this.trees.setTilePosition(200);

      this.water = this.scene.add
        .tileSprite(540, 125, 1080, 35, "water")
        .setOrigin(0.5, 0);

      this.water.setTilePosition(200);

      this.land = this.scene.add
        .tileSprite(540, 125, 1080, 35, "land")
        .setOrigin(0.5, 0);

      this.land.setTilePosition(200);

      this.scene.tweens.add({
        targets: this.tyc,
        x: {
          value: 700,
          duration: 3200,
          ease: "Sine.easeInOut",
          repeat: -1,
          yoyo: -1
        },
        y: {
          value: 100,
          duration: 800,
          ease: "Quad.easeIn",
          repeat: -1,
          yoyo: -1
        }
      });

      this.subtitle = this.scene.add.image(540, 300, "subtitle").setScale(1);

      this.scene.add.existing(this);
    }

    update() {
      this.mountains.tilePositionX += 0.25;
      this.trees.tilePositionX += 0.35;
      this.land.tilePositionX += 0.35;
      this.water.tilePositionX += 0.45;
    }
  }
}
