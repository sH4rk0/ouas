namespace core {
  export class slide2 extends Phaser.Scene {
    private template: template;
    constructor(test) {
      super({ key: "slide2" });
    }

    preload() {
      console.log("slide2:preload");
    }

    create() {
      console.log("slide2:create");
      this.template = new template(this);
    }

    update() {
      this.template.update();
    }
  }
}
