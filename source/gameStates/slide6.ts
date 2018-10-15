namespace core {
  export class slide6 extends Phaser.Scene {
    private template: template;

    constructor(test) {
      super({ key: "slide6" });
    }

    preload() {
      console.log("slide6:preload");
    }

    create() {
      console.log("slide6:create");
      this.template = new template(this);
    }

    update(time, delta): void {
      this.template.update();
    }
  }
}
