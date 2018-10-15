namespace core {
  export class slide3 extends Phaser.Scene {
    private template: template;
    private photo: photoViewer;

    constructor(test) {
      super({ key: "slide3" });
    }

    preload() {
      console.log("slide3:preload");
    }

    create() {
      console.log("slide3:create");
      this.template = new template(this);

      this.photo = new photoViewer(
        this,
        "foto1",
        "foto1-64",
        "                                                MR.KILLER, GARIBALDI, AND JUZZO... TYC 1986!"
      );
    }

    update(time, delta): void {
      this.template.update();
      this.photo.update();
    }
  }
}
