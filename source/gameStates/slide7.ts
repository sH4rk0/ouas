namespace core {
  export class slide7 extends Phaser.Scene {
    private template: template;

    constructor(test) {
      super({ key: "slide7" });
    }

    preload() {
      console.log("slide7:preload");
    }

    create() {
      console.log("slide7:create");
      this.template = new template(this);
    }

    update(time, delta): void {
      this.template.update();
    }
  }
}
