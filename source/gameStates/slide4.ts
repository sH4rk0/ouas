namespace core {
  export class slide4 extends Phaser.Scene {
    private template: template;
    private photo: photoViewer;

    constructor(test) {
      super({ key: "slide4" });
    }

    preload() {
      console.log("slide4:preload");
    }

    create() {
      console.log("slide4:create");
      this.template = new template(this);
      this.photo = new photoViewer(
        this,
        "foto2",
        "foto2-64",
        "                                                GARIBALDI, BIONIC, MR.KILLER AND JUZZO... TYC 1988!"
      );
    }

    update(time, delta): void {
      this.template.update();
      this.photo.update();
    }
  }
}
