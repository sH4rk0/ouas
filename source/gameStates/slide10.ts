namespace core {
  export class slide10 extends Phaser.Scene {
    private template: template;

    constructor(test) {
      super({ key: "slide10" });
    }

    preload() {
      console.log("slide10:preload");
    }

    create() {
      console.log("slide10:create");
      this.template = new template(this);
    }

    update(time, delta): void {
      this.template.update();
    }
  }
}
