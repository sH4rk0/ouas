namespace core {
  export class slide5 extends Phaser.Scene {
    private template: template;

    constructor(test) {
      super({ key: "slide5" });
    }

    preload() {
      console.log("slide5:preload");
    }

    create() {
      console.log("slide5:create");
      this.template = new template(this);
    }

    update(time, delta): void {
      this.template.update();
    }
  }
}
