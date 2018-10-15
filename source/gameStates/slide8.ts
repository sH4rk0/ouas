namespace core {
  export class slide8 extends Phaser.Scene {
    private template: template;

    constructor(test) {
      super({ key: "slide8" });
    }

    preload() {
      console.log("slide8:preload");
    }

    create() {
      console.log("slide8:create");
      this.template = new template(this);
    }

    update(time, delta): void {
      this.template.update();
    }
  }
}
