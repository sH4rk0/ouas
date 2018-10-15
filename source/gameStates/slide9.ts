namespace core {
  export class slide9 extends Phaser.Scene {
    private template: template;

    constructor(test) {
      super({ key: "slide9" });
    }

    preload() {
      console.log("slide9:preload");
    }

    create() {
      console.log("slide9:create");
      this.template = new template(this);
    }

    update(time, delta): void {
      this.template.update();
    }
  }
}
