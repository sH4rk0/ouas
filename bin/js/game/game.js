var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var core;
(function (core) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot(test) {
            return _super.call(this, {
                key: "Boot"
            }) || this;
        }
        Boot.prototype.preload = function () {
            var graphics = this.make.graphics({ x: 0, y: 0, add: false });
            graphics.fillStyle(0x6c5eb5, 1);
            graphics.fillRect(0, 0, 1080, 720);
            graphics.generateTexture("bg-commodore", 1080, 720);
            var graphics = this.make.graphics({ x: 0, y: 0, add: false });
            graphics.fillStyle(0x352879, 1);
            graphics.fillRect(0, 0, 640, 400);
            graphics.generateTexture("bg-commodore-blue", 640, 400);
            var graphics = this.make.graphics({ x: 0, y: 0, add: false });
            graphics.fillStyle(0xffffff, 1);
            graphics.fillRect(0, 0, 800, 450);
            graphics.generateTexture("foto-fade", 800, 450);
            var graphics = this.make.graphics({ x: 0, y: 0, add: false });
            graphics.fillStyle(0xffffff, 1);
            graphics.fillRect(0, 0, 2, 2);
            graphics.generateTexture("star", 2, 2);
            var graphics = this.make.graphics({ x: 0, y: 0, add: false });
            graphics.fillStyle(0x000000, 1);
            graphics.fillRect(0, 0, 1080, 70);
            graphics.generateTexture("scroll-bg", 1080, 70);
            //graphics.clear();
            /*var graphics2 = this.make.graphics({ x: 0, y: 0, add: false });
                  graphics2.fillRect(0, 0, 50, 126);
                  graphics2.generateTexture("playerHitArea", 50, 126);
                  graphics2.clear();*/
            console.log("Boot:preload");
        };
        Boot.prototype.create = function () {
            console.log("Boot:create");
            this.scene.start("Preloader");
        };
        return Boot;
    }(Phaser.Scene));
    core.Boot = Boot;
})(core || (core = {}));
var core;
(function (core) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader(test) {
            return _super.call(this, {
                key: "Preloader"
            }) || this;
        }
        Preloader.prototype.preload = function () {
            console.log("Preloader:preload");
            this.loadAssets();
        };
        Preloader.prototype.init = function () {
            this.body = document.getElementsByTagName("body")[0];
        };
        Preloader.prototype.create = function () {
            //console.log("Preloader:create");
        };
        Preloader.prototype.loadAssets = function () {
            var _this = this;
            this.body.className = "loading";
            this.load.on("start", function () {
                //progress.destroy();
                console.log("load start");
            });
            this.load.on("fileprogress", function (file, value) {
                //console.log(file, value);
                /*if (file.key === 'goldrunner')
                                {
                                    progress.clear();
                                    progress.fillStyle(0xffffff, 0.4);
                                    progress.fillRect(450, 500 - (value * 400), 200, value * 400);
                                }
                                */
            });
            this.load.on("complete", function () {
                //progress.destroy();
                console.log("load assetts complete");
                core.gameData.assets.sounds.forEach(function (element) {
                    var _sound = _this.sound.add(element.name);
                    core.pushSound(_sound);
                });
                _this.body.className = "";
                core.goState(core.presentationData.slides[0].state, _this.game);
            });
            //Assets Load
            //--------------------------
            // IMAGES
            core.gameData.assets.images.forEach(function (element) {
                // console.log(element);
                _this.load.image(element.name, element.path);
            });
            // SPRITESHEETS
            core.gameData.assets.spritesheets.forEach(function (element) {
                _this.load.spritesheet(element.name, element.path, {
                    frameWidth: element.width,
                    frameHeight: element.height,
                    endFrame: element.frames
                });
            });
            //bitmap fonts
            core.gameData.assets.bitmapfont.forEach(function (element) {
                _this.load.bitmapFont(element.name, element.imgpath, element.xmlpath);
            });
            // SOUNDS
            core.gameData.assets.sounds.forEach(function (element) {
                _this.load.audio(element.name, element.paths);
            });
        };
        return Preloader;
    }(Phaser.Scene));
    core.Preloader = Preloader;
})(core || (core = {}));
var core;
(function (core) {
    var slide1 = (function (_super) {
        __extends(slide1, _super);
        function slide1(test) {
            var _this = _super.call(this, { key: "slide1" }) || this;
            _this.letters = [];
            _this.texts = [
                [],
                ["O", "C", "T", "2", "7", "2", "0", "1", "8", "1", "0", "0", "0"]
            ];
            return _this;
        }
        slide1.prototype.preload = function () {
            console.log("slide1:preload");
        };
        slide1.prototype.create = function () {
            var _this = this;
            core.playSound(core.gameSound.intro);
            this.texts[0] = [
                "O",
                "C",
                "T",
                "2",
                "7",
                "1",
                "9",
                "8",
                "8",
                "1",
                "0",
                "0",
                "0"
            ]; //this.dateArray();
            // console.log(_month + "" + _day + "" + _year + "" + _hour + "" + _minute);
            var offset = 0;
            this.groupPast = this.add.container(540, 0);
            this.groupPast.add(this.add.image(0, 0, "introNow"));
            var _dot = this.add.sprite(348, 0, "dots2");
            if (_dot.anims.animationManager.get("anim") == undefined) {
                _dot.anims.animationManager.create({
                    key: "anim",
                    frames: this.anims.generateFrameNumbers("dots2", {
                        frames: [0, 1]
                    }),
                    frameRate: 2,
                    repeat: -1
                });
            }
            _dot.play("anim");
            this.groupPast.add(_dot);
            this.groupPast.setY(-100).setAlpha(0);
            offset = 0;
            this.letters = [];
            this.texts[0].forEach(function (element, index) {
                if (index == 3) {
                    offset = 60;
                }
                if (index == 5) {
                    offset = 120;
                }
                if (index == 9) {
                    offset = 210;
                }
                if (index == 11) {
                    offset = 270;
                }
                _this.letters.push(new core.introLetter(_this, 52 * index + 45 + offset - 510, -55, element, 200 * index + 4000, 0xfcb13c, 0xfcb13d, 0x422304, _this.groupPast));
            });
            this.add.tween({
                targets: this.groupPast,
                alpha: 1,
                y: 150,
                duration: 1000,
                delay: 4000
            });
            this.groupNow = this.add.container(540, 0);
            this.groupNow.setAlpha(0).setY(720);
            this.groupNow.add(this.add.image(0, 0, "introPast"));
            var _dot2 = this.add.sprite(345, 0, "dots");
            if (_dot.anims.animationManager.get("anim2") == undefined) {
                _dot2.anims.animationManager.create({
                    key: "anim2",
                    frames: this.anims.generateFrameNumbers("dots", {
                        frames: [0, 1]
                    }),
                    frameRate: 2,
                    repeat: -1
                });
            }
            _dot2.play("anim2");
            this.groupNow.add(_dot2);
            offset = 0;
            this.texts[1].forEach(function (element, index) {
                if (index == 3) {
                    offset = 60;
                }
                if (index == 5) {
                    offset = 120;
                }
                if (index == 9) {
                    offset = 210;
                }
                if (index == 11) {
                    offset = 270;
                }
                new core.introLetter(_this, 52 * index + 45 + offset - 510, -55, element, 200 * index + 10000, 0x00ff00, 0x00ee00, 0x04200a, _this.groupNow);
            });
            this.add.tween({
                targets: this.groupNow,
                alpha: 1,
                y: 580,
                duration: 1000,
                delay: 10000
            });
            var raster3 = this.make.sprite({
                x: 540,
                y: 300,
                key: "raster",
                add: true
            });
            raster3.setAlpha(0);
            var raster2 = this.make.sprite({
                x: 540,
                y: 300,
                key: "raster",
                add: true
            });
            raster2.setAlpha(0);
            var raster = this.make.sprite({
                x: 540,
                y: 300,
                key: "raster",
                add: true
            });
            raster.setAlpha(0);
            this.celebrating = this.add.image(540, 370, "ouas");
            this.celebrating.setAlpha(0);
            this.add.tween({
                targets: [this.celebrating],
                alpha: 1,
                onComplete: function () {
                    _this.add.tween({
                        targets: raster,
                        alpha: 1,
                        y: {
                            value: 440,
                            duration: 1500,
                            ease: "Sine.easeInOut",
                            yoyo: true,
                            repeat: -1
                        },
                        duration: 1000,
                        delay: 0
                    });
                    _this.add.tween({
                        targets: raster2,
                        alpha: 1,
                        y: {
                            value: 440,
                            duration: 1500,
                            ease: "Sine.easeInOut",
                            yoyo: true,
                            repeat: -1
                        },
                        duration: 1000,
                        delay: 300
                    });
                    _this.add.tween({
                        targets: raster3,
                        alpha: 1,
                        y: {
                            value: 440,
                            duration: 1500,
                            ease: "Sine.easeInOut",
                            yoyo: true,
                            repeat: -1
                        },
                        duration: 1000,
                        delay: 600
                    });
                },
                duration: 1000,
                delay: 15500
            });
            this.time.addEvent({
                delay: 1000 * 60,
                callback: function () {
                    _this.updateDate();
                },
                callbackScope: this,
                loop: true
            });
        };
        slide1.prototype.updateDate = function () {
            var _this = this;
            console.log("updateDate");
            this.texts[0] = this.dateArray();
            console.log(this.texts[0], this.letters);
            this.letters.forEach(function (letter, index) {
                letter.updateValue(_this.texts[0][index]);
            });
        };
        slide1.prototype.dateArray = function () {
            var arr = [];
            var newDate = new Date();
            var _day;
            var _month;
            var _year;
            var _hour;
            var _minute;
            if (newDate.getDate().toString().length == 1) {
                _day = "0" + newDate.getDate().toString();
            }
            else {
                _day = newDate.getDate().toString();
            }
            var locale = "en-us";
            _month = newDate
                .toLocaleString(locale, { month: "long" })
                .toUpperCase()
                .substr(0, 3);
            _year = newDate.getFullYear();
            if (newDate.getHours().toString().length == 1) {
                _hour = "0" + newDate.getHours().toString();
            }
            else {
                _hour = newDate.getHours().toString();
            }
            if (newDate.getMinutes().toString().length == 1) {
                _minute = "0" + newDate.getMinutes().toString();
            }
            else {
                _minute = newDate.getMinutes().toString();
            }
            var _date = _month + "" + _day + "" + _year + "" + _hour + "" + _minute;
            for (var i = 0; i < _date.length; i++) {
                arr.push(_date[i]);
            }
            return arr;
        };
        slide1.prototype.update = function () { };
        return slide1;
    }(Phaser.Scene));
    core.slide1 = slide1;
})(core || (core = {}));
var core;
(function (core) {
    var slide2 = (function (_super) {
        __extends(slide2, _super);
        function slide2(test) {
            return _super.call(this, { key: "slide2" }) || this;
        }
        slide2.prototype.preload = function () {
            console.log("slide2:preload");
        };
        slide2.prototype.create = function () {
            console.log("slide2:create");
            var config = {
                image: "scrollFont",
                width: 8,
                height: 8,
                chars: " ABCDEFGHIJKLMNOPQRSTUVWXYZ!         %&'()*+,-./0123456789:     ",
                charsPerRow: 32,
                spacing: { x: 0, y: 0 },
                offset: { x: 0, y: 0 }
            };
            this.cache.bitmapFont.add("scrollFont", Phaser.GameObjects.RetroFont.Parse(this, config));
            //this.template = new template(this);
            this.s = { y: -8 };
            core.playSound(core.gameSound.fairlight);
            this.add
                .image(540, 200, "fairlight-logo")
                .setDepth(100)
                .setScale(2);
            var _raster = this.add
                .image(540, 80, "fairlight-raster")
                .setDepth(101)
                .setScale(2);
            this.tweens.add({
                targets: _raster,
                y: {
                    value: 360,
                    duration: 2000,
                    ease: "Quad.easeInOut",
                    repeat: -1,
                    yoyo: -1
                },
                onStart: function () { },
                onComplete: function () { },
                onYoyo: function () {
                    _raster.setDepth(99);
                },
                onRepeat: function () {
                    _raster.setDepth(101);
                }
            });
            this.add
                .dynamicBitmapText(0, 275, "scrollFont", "   THE HOME OF THE REAL CRACKERS  ")
                .setScale(4)
                .setDepth(100);
            this.add
                .dynamicBitmapText(0, 410, "scrollFont", "             PRESENTS")
                .setScale(4)
                .setDepth(100);
            this.add
                .dynamicBitmapText(0, 680, "scrollFont", "-- SWEDISH QUALITY AT IT'S BEST --")
                .setScale(4)
                .setDepth(100);
            this.raster2 = this.add
                .tileSprite(0, 480, 1080, 48, "fairlight-raster2")
                .setOrigin(0);
            this.add
                .bitmapText(0, 490, "commodore", "        THE YODAS CREW ++", 32) //"                                    "
                .setOrigin(0)
                .setDepth(100)
                .setTint(0x000000);
            this.scroller = this.add.dynamicBitmapText(0, 550, "scrollFont", "                                  FAIRLIGHT IS PROUD TO PRESENT A NEW RELEASE: THE YODAS CREW ++       CRACKED BY WOODOO ON 27/10/2018... ENJOY!");
            this.scroller.setScale(4);
            /* this.scroller.setDisplayCallback(data => {
              //data.y += 8 + this.s.y * Math.sin(data.index);
              data.y += 8 + this.s.y + Math.sin(this.s.y);
      
              return data;
            });*/
            this.tweens.add({
                targets: this.scroller,
                duration: 1000,
                y: 600,
                repeat: -1,
                ease: "Quad.easeIn",
                yoyo: true
            });
        };
        slide2.prototype.update = function (time, delta) {
            //this.template.update();
            this.raster2.tilePositionY += 0.45;
            this.scroller.scrollX += 0.05 * delta;
            if (this.scroller.scrollX > 1200) {
                this.scroller.scrollX = 0;
            }
        };
        return slide2;
    }(Phaser.Scene));
    core.slide2 = slide2;
})(core || (core = {}));
var core;
(function (core) {
    var slide3 = (function (_super) {
        __extends(slide3, _super);
        function slide3(test) {
            return _super.call(this, { key: "slide3" }) || this;
        }
        slide3.prototype.preload = function () {
            console.log("slide3:preload");
        };
        slide3.prototype.create = function () {
            console.log("slide3:create");
            this.template = new core.template(this);
            this.photo = new core.photoViewer(this, "foto1", "foto1-64", "                                                MR.KILLER, GARIBALDI, AND JUZZO... TYC 1986!");
        };
        slide3.prototype.update = function (time, delta) {
            this.template.update();
            this.photo.update();
        };
        return slide3;
    }(Phaser.Scene));
    core.slide3 = slide3;
})(core || (core = {}));
var core;
(function (core) {
    var slide4 = (function (_super) {
        __extends(slide4, _super);
        function slide4(test) {
            return _super.call(this, { key: "slide4" }) || this;
        }
        slide4.prototype.preload = function () {
            console.log("slide4:preload");
        };
        slide4.prototype.create = function () {
            console.log("slide4:create");
            this.template = new core.template(this);
            this.photo = new core.photoViewer(this, "foto2", "foto2-64", "                                                GARIBALDI, BIONIC, MR.KILLER AND JUZZO... TYC 1988!");
        };
        slide4.prototype.update = function (time, delta) {
            this.template.update();
            this.photo.update();
        };
        return slide4;
    }(Phaser.Scene));
    core.slide4 = slide4;
})(core || (core = {}));
var core;
(function (core) {
    var slide5 = (function (_super) {
        __extends(slide5, _super);
        function slide5(test) {
            return _super.call(this, { key: "slide5" }) || this;
        }
        slide5.prototype.preload = function () {
            console.log("slide5:preload");
        };
        slide5.prototype.create = function () {
            console.log("slide5:create");
            this.template = new core.template(this);
        };
        slide5.prototype.update = function (time, delta) {
            this.template.update();
        };
        return slide5;
    }(Phaser.Scene));
    core.slide5 = slide5;
})(core || (core = {}));
var core;
(function (core) {
    var slide6 = (function (_super) {
        __extends(slide6, _super);
        function slide6(test) {
            return _super.call(this, { key: "slide6" }) || this;
        }
        slide6.prototype.preload = function () {
            console.log("slide6:preload");
        };
        slide6.prototype.create = function () {
            console.log("slide6:create");
            this.template = new core.template(this);
        };
        slide6.prototype.update = function (time, delta) {
            this.template.update();
        };
        return slide6;
    }(Phaser.Scene));
    core.slide6 = slide6;
})(core || (core = {}));
var core;
(function (core) {
    var slide7 = (function (_super) {
        __extends(slide7, _super);
        function slide7(test) {
            return _super.call(this, { key: "slide7" }) || this;
        }
        slide7.prototype.preload = function () {
            console.log("slide7:preload");
        };
        slide7.prototype.create = function () {
            console.log("slide7:create");
            this.template = new core.template(this);
        };
        slide7.prototype.update = function (time, delta) {
            this.template.update();
        };
        return slide7;
    }(Phaser.Scene));
    core.slide7 = slide7;
})(core || (core = {}));
var core;
(function (core) {
    var slide8 = (function (_super) {
        __extends(slide8, _super);
        function slide8(test) {
            return _super.call(this, { key: "slide8" }) || this;
        }
        slide8.prototype.preload = function () {
            console.log("slide8:preload");
        };
        slide8.prototype.create = function () {
            console.log("slide8:create");
            this.template = new core.template(this);
        };
        slide8.prototype.update = function (time, delta) {
            this.template.update();
        };
        return slide8;
    }(Phaser.Scene));
    core.slide8 = slide8;
})(core || (core = {}));
var core;
(function (core) {
    var slide9 = (function (_super) {
        __extends(slide9, _super);
        function slide9(test) {
            return _super.call(this, { key: "slide9" }) || this;
        }
        slide9.prototype.preload = function () {
            console.log("slide9:preload");
        };
        slide9.prototype.create = function () {
            console.log("slide9:create");
            this.template = new core.template(this);
        };
        slide9.prototype.update = function (time, delta) {
            this.template.update();
        };
        return slide9;
    }(Phaser.Scene));
    core.slide9 = slide9;
})(core || (core = {}));
var core;
(function (core) {
    var slide10 = (function (_super) {
        __extends(slide10, _super);
        function slide10(test) {
            return _super.call(this, { key: "slide10" }) || this;
        }
        slide10.prototype.preload = function () {
            console.log("slide10:preload");
        };
        slide10.prototype.create = function () {
            console.log("slide10:create");
            this.template = new core.template(this);
        };
        slide10.prototype.update = function (time, delta) {
            this.template.update();
        };
        return slide10;
    }(Phaser.Scene));
    core.slide10 = slide10;
})(core || (core = {}));
var core;
(function (core) {
    var typeText;
    (function (typeText) {
        typeText[typeText["letters"] = 0] = "letters";
        typeText[typeText["numbers"] = 1] = "numbers";
    })(typeText = core.typeText || (core.typeText = {}));
    var introLetter = (function (_super) {
        __extends(introLetter, _super);
        function introLetter(scene, x, y, endChar, delay, color, color2, backColor, group) {
            var _this = _super.call(this, scene, x, y, "digital", "", 110) || this;
            _this.letters = [
                [
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "G",
                    "H",
                    "I",
                    "J",
                    "K",
                    "L",
                    "M",
                    "N",
                    "O",
                    "P",
                    "Q",
                    "R",
                    "S",
                    "T",
                    "U",
                    "V",
                    "W",
                    "X",
                    "Y",
                    "Z"
                ],
                ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            ];
            _this.endChar = endChar;
            _this.charType = typeText.letters;
            _this.color = color;
            _this.color2 = color2;
            _this.charBack = scene.add.bitmapText(x, y, "digital", "0", 110);
            _this.charBack.tint = backColor;
            group.add(_this.charBack);
            group.add(_this);
            _this.tint = color;
            _this.scene.time.delayedCall(delay, function () {
                _this.start();
            }, null, _this);
            return _this;
        }
        introLetter.prototype.update = function () { };
        introLetter.prototype.updateValue = function (value) {
            this.setText(value);
        };
        introLetter.prototype.start = function () {
            var _this = this;
            var scoreTween = this.scene.tweens.addCounter({
                from: 0,
                to: 100,
                duration: 1000,
                onUpdate: function () {
                    _this.setText(_this.letters[0][Phaser.Math.RND.integerInRange(0, 20)]);
                },
                onComplete: function () {
                    _this.setText(_this.endChar);
                }
            });
        };
        return introLetter;
    }(Phaser.GameObjects.BitmapText));
    core.introLetter = introLetter;
})(core || (core = {}));
var core;
(function (core) {
    var photoViewer = (function (_super) {
        __extends(photoViewer, _super);
        function photoViewer(scene, image, image2, text) {
            var _this = _super.call(this, scene, 0, 0) || this;
            _this.scene = scene;
            _this.scrollText = text;
            var config = {
                image: "scrollFont",
                width: 8,
                height: 8,
                chars: " ABCDEFGHIJKLMNOPQRSTUVWXYZ!         %&'()*+,-./0123456789:     ",
                charsPerRow: 32,
                spacing: { x: 0, y: 0 },
                offset: { x: 0, y: 0 }
            };
            _this.scene.cache.bitmapFont.add("scrollFont", Phaser.GameObjects.RetroFont.Parse(_this.scene, config));
            _this.raster = _this.scene.add
                .tileSprite(0, 160, 1080, 116, "fairlight-raster2")
                .setOrigin(0)
                .setAlpha(0);
            _this.image = _this.scene.add
                .image(540, 430, image)
                .setScale(1)
                .setAlpha(0);
            _this.add(_this.image);
            _this.image2 = _this.scene.add
                .image(740, 430, image2)
                .setScale(1)
                .setAlpha(0);
            _this.add(_this.image2);
            _this.fotoFade = _this.scene.add
                .image(540, 430, "foto-fade")
                .setScale(1)
                .setAlpha(0);
            _this.add(_this.fotoFade);
            _this.fotoFrame = _this.scene.add
                .image(740, 430, "foto-frame")
                .setScale(1)
                .setAlpha(0)
                .setDepth(100);
            _this.add(_this.fotoFrame);
            _this.scene.tweens.add({
                targets: _this.raster,
                alpha: { value: 1, duration: 1000, delay: 700 },
                y: {
                    value: 600,
                    duration: 2000,
                    ease: "Quad.easeInOut",
                    repeat: -1,
                    yoyo: -1
                }
            });
            _this.scene.tweens.add({
                targets: [_this.image2, _this.fotoFrame],
                x: 540,
                alpha: 1,
                duration: 1000,
                ease: "Sine.easeInOut",
                repeat: 0,
                yoyo: 0,
                onComplete: function () {
                    _this.scene.tweens.add({
                        targets: _this.fotoFade,
                        alpha: 1,
                        duration: 250,
                        ease: "Sine.easeInOut",
                        repeat: 0,
                        yoyo: 1,
                        delay: 1000,
                        onYoyo: function () {
                            _this.image2.setAlpha(0);
                            _this.image.setAlpha(1);
                        },
                        onComplete: function () { }
                    });
                }
            });
            var bg = _this.scene.add
                .image(0, 580, "scroll-bg")
                .setAlpha(0)
                .setDepth(50)
                .setOrigin(0);
            _this.scroller = _this.scene.add
                .dynamicBitmapText(0, 600, "scrollFont", _this.scrollText)
                .setOrigin(0)
                .setDepth(51);
            _this.scroller.setScale(4).setDepth(100);
            _this.scene.tweens.add({
                targets: [bg, _this.scroller],
                alpha: { value: 0.75, duration: 1000, delay: 700 },
                y: {
                    value: 650,
                    duration: 2000,
                    ease: "Quad.easeIn",
                    repeat: -1,
                    yoyo: -1
                }
            });
            _this.scene.tweens.add({
                targets: _this.scroller,
                alpha: { value: 1, duration: 1000, delay: 700 },
                y: {
                    value: 670,
                    duration: 2000,
                    ease: "Quad.easeIn",
                    repeat: -1,
                    yoyo: -1
                }
            });
            _this.scene.add.existing(_this);
            return _this;
        }
        photoViewer.prototype.update = function () {
            this.scroller.scrollX += 1;
            if (this.scroller.scrollX > this.scroller.width / 4) {
                this.scroller.scrollX = 0;
            }
        };
        return photoViewer;
    }(Phaser.GameObjects.Container));
    core.photoViewer = photoViewer;
})(core || (core = {}));
var core;
(function (core) {
    var star = (function (_super) {
        __extends(star, _super);
        function star(scene) {
            var _this = _super.call(this, scene, 0, 0, "star") || this;
            _this.customTint = [
                0xaaaaaa,
                0xbbbbbb,
                0xcccccc,
                0xdddddd,
                0xeeeeee,
                0xffffff
            ];
            _this.scene = scene;
            _this.setScale(1);
            _this.setX(Phaser.Math.RND.integerInRange(0, 1080));
            _this.setY(Phaser.Math.RND.integerInRange(0, 80));
            _this.vel = Phaser.Math.RND.integerInRange(2, 8);
            _this.setTint(_this.customTint[Phaser.Math.RND.integerInRange(0, 5)]);
            return _this;
        }
        star.prototype.update = function () {
            this.x -= this.vel;
            if (this.x < -10) {
                this.setY(Phaser.Math.RND.integerInRange(0, 80));
                this.setTint(this.customTint[Phaser.Math.RND.integerInRange(0, 5)]);
                this.vel = Phaser.Math.RND.integerInRange(2, 8);
                this.x = 1100;
            }
        };
        return star;
    }(Phaser.GameObjects.Sprite));
    core.star = star;
})(core || (core = {}));
/// <reference path="lib/phaser.d.ts"/>
/// <reference path="lib/firebase.d.ts"/>
/// <reference path="../source/phaserStates/boot.ts" />
/// <reference path="../source/phaserStates/preloader.ts" />
/// <reference path="../source/gameStates/slide1.ts" />
/// <reference path="../source/gameStates/slide2.ts" />
/// <reference path="../source/gameStates/slide3.ts" />
/// <reference path="../source/gameStates/slide4.ts" />
/// <reference path="../source/gameStates/slide5.ts" />
/// <reference path="../source/gameStates/slide6.ts" />
/// <reference path="../source/gameStates/slide7.ts" />
/// <reference path="../source/gameStates/slide8.ts" />
/// <reference path="../source/gameStates/slide9.ts" />
/// <reference path="../source/gameStates/slide10.ts" />
/// <reference path="../source/gameStates/introLetters.ts" />
/// <reference path="../source/gameStates/photoViewer.ts" />
/// <reference path="../source/gameStates/star.ts" />
var _initGame;
var WebFontConfig = {
    active: function () { },
    google: {
        families: ["Press Start 2P"]
    }
};
var fbConfig = {
    apiKey: "AIzaSyDhsh567YIHL1EHfBtHaWKQZt38A6TWfn8",
    authDomain: "livetest-32ea9.firebaseio.com",
    databaseURL: "https://livetest-32ea9.firebaseio.com/",
    projectId: "livetest-32ea9",
    storageBucket: "",
    messagingSenderId: ""
};
var core;
(function (core) {
    var _ismobile;
    var _gameSounds = [];
    var fbObj = null;
    var fbSlideObj = null;
    var currentSlide = null;
    core._config = {
        type: Phaser.AUTO,
        pixelArt: true,
        roundPixels: true,
        parent: "my-game",
        width: 1080,
        height: 720,
        scene: [
            core.Boot,
            core.Preloader,
            core.slide1,
            core.slide2,
            core.slide3,
            core.slide4,
            core.slide5,
            core.slide6,
            core.slide7,
            core.slide8,
            core.slide9,
            core.slide10
        ]
    };
    function createFbObj() {
        if (this.fbObj == null) {
            console.log("createFbObj");
            this.fbObj = firebase.initializeApp(fbConfig);
        }
    }
    core.createFbObj = createFbObj;
    function createFbListener() {
        if (this.fbSlideObj == null) {
            console.log("createFbListener");
            this.fbSlideObj = this.fbObj.database().ref("/");
            this.fbSlideObj.on("child_changed", function (data) {
                console.log(data.key, data.val());
                var _string = data.val();
                if (data.key == "currentSlide") {
                    console.log("goto:", core.presentationData.slides[data.val()].state);
                    core._currentIndex = data.val();
                    goState(core.presentationData.slides[data.val()].state, core._game);
                }
            });
        }
    }
    core.createFbListener = createFbListener;
    core._presentation = null;
    core._textClass = ["normal", "medium", "big"];
    core._fontSize = 0;
    function isMobile(game) {
        if (game.device.input.touch &&
            (game.device.os.iOS ||
                game.device.os.android ||
                game.device.os.windowsPhone)) {
            return true;
        }
        else {
            return false;
        }
    }
    core.isMobile = isMobile;
    var gameSound;
    (function (gameSound) {
        gameSound[gameSound["intro"] = 0] = "intro";
        gameSound[gameSound["fairlight"] = 1] = "fairlight";
    })(gameSound = core.gameSound || (core.gameSound = {}));
    function pushSound(_sound) {
        _gameSounds.push(_sound);
    }
    core.pushSound = pushSound;
    function getSound(_sound) {
        return _gameSounds[_sound];
    }
    core.getSound = getSound;
    function playSound(_sound) {
        _gameSounds[_sound].play();
    }
    core.playSound = playSound;
    function stopSound(_sound) {
        _gameSounds[_sound].stop();
    }
    core.stopSound = stopSound;
    function stopSoundAll() {
        _gameSounds.forEach(function (sound) {
            sound.stop();
        });
    }
    core.stopSoundAll = stopSoundAll;
    function pauseSound(_sound) {
        _gameSounds[_sound].stop();
    }
    core.pauseSound = pauseSound;
    function loadCode(_file) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState == 4) {
                core._code.innerHTML = xhr.responseText;
                hljs.highlightBlock(core._code);
            }
        };
        var _path = "data/" + _file + ".html";
        xhr.open("GET", _path, true);
        xhr.setRequestHeader("Content-type", "text/html");
        xhr.send();
    }
    core.loadCode = loadCode;
    function startTimer() {
        countdown("myTimer", 25, 0);
    }
    core.startTimer = startTimer;
    function countdown(elementName, minutes, seconds) {
        var element, endTime, hours, mins, msLeft, time;
        function twoDigits(n) {
            return n <= 9 ? "0" + n : n;
        }
        function updateTimer() {
            msLeft = endTime - +new Date();
            if (msLeft < 1000) {
                element.innerHTML = "countdown's over!";
            }
            else {
                time = new Date(msLeft);
                hours = time.getUTCHours();
                mins = time.getUTCMinutes();
                element.innerHTML =
                    (hours ? hours + ":" + twoDigits(mins) : mins) +
                        ":" +
                        twoDigits(time.getUTCSeconds());
                setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
            }
        }
        element = document.getElementById(elementName);
        endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500;
        updateTimer();
    }
    core.countdown = countdown;
    function setCurrentIndex(_state) {
        var _index = 0;
        core.presentationData.slides.forEach(function (element) {
            if (element.state === _state) {
                core._currentIndex = _index;
            }
            _index++;
        });
    }
    core.setCurrentIndex = setCurrentIndex;
    function setResize() {
        core._slidesContainer.style.height = window.innerHeight + "px";
        core._slidesContainer.style.width = window.innerWidth + "px";
        core._codeContainer.style.height = window.innerHeight + "px";
        //_codeContainer.style.width = window.innerWidth + "px";
    }
    core.setResize = setResize;
    function goState(_state, _game) {
        stopSoundAll();
        setUpSlide(_state);
        _game.scene.scenes.forEach(function (element) {
            if (_game.scene.isActive(element.scene.key))
                _game.scene.stop(element.scene.key);
            //_game.scene.sleep()
        });
        _game.scene.start(_state).bringToTop(_state);
    }
    core.goState = goState;
    function setUpSlide(_state) {
        var _obj = core.presentationData.slides[core._currentIndex];
        core._code.innerHTML = "";
        if (_obj.code != "") {
            loadCode(_obj.code);
            core._codeBtn.className = "menuBtn";
        }
        else {
            core._codeBtn.className = "menuBtn disabled";
        }
        if (core._currentIndex + 1 >= core.presentationData.slides.length) {
            core._nextBtn.className = "menuBtn disabled";
        }
        else {
            core._nextBtn.className = "menuBtn";
        }
        if (core._currentIndex - 1 == -1) {
            core._prevBtn.className = "menuBtn disabled";
        }
        else {
            core._prevBtn.className = "menuBtn";
        }
    }
    core.setUpSlide = setUpSlide;
    var initPresentation = (function () {
        function initPresentation(width, height) {
            var _this = this;
            var dpr = 1;
            core._currentIndex = 0;
            if (devicePixelRatio != undefined) {
                dpr = devicePixelRatio || 1;
                if (!width) {
                    width = screen.width * dpr;
                }
                if (!height) {
                    height = screen.height * dpr;
                }
            }
            core._game = new Phaser.Game(core._config);
            core._presentationMenu = document.getElementById("presentationMenu");
            core._slidesContainer = document.getElementById("slidesContainer");
            core._codeContainer = document.getElementById("codeContainer");
            core._slides = document.getElementById("slides");
            core._code = document.getElementById("code");
            var mString;
            var mElement;
            core.presentationData.slides.forEach(function (element) {
                mElement = document.createElement("div");
                mElement.id = element.state;
                mElement.className = "mSlide";
                mElement.innerHTML =
                    "<div style='background-image:url(" +
                        element.preview +
                        ");' class='mImage'></div><div class='mTitle'>" +
                        element.title +
                        "</div></div>";
                createFbObj();
                createFbListener();
                mElement.addEventListener("click", function () {
                    core._slidesContainer.className = "hide";
                    setCurrentIndex(element.state);
                    goState(element.state, core._game);
                });
                core._slides.appendChild(mElement);
            });
            core._slidesBtn = document.createElement("div");
            core._slidesBtn.id = "slidesBtn";
            core._slidesBtn.className = "menuBtn";
            core._slidesBtn.addEventListener("click", function () { return _this.toggleSlides(); });
            core._presentationMenu.appendChild(core._slidesBtn);
            core._prevBtn = document.createElement("div");
            core._prevBtn.id = "prevBtn";
            core._prevBtn.className = "menuBtn disabled";
            core._prevBtn.addEventListener("click", function () { return _this.prevState(); });
            core._presentationMenu.appendChild(core._prevBtn);
            core._nextBtn = document.createElement("div");
            core._nextBtn.id = "nextBtn";
            core._nextBtn.className = "menuBtn disabled";
            core._nextBtn.addEventListener("click", function () { return _this.nextState(); });
            core._presentationMenu.appendChild(core._nextBtn);
            core._codeBtn = document.createElement("div");
            core._codeBtn.id = "codeBtn";
            core._codeBtn.className = "menuBtn disabled";
            core._codeBtn.addEventListener("click", function () { return _this.toggleCode(); });
            core._presentationMenu.appendChild(core._codeBtn);
            core._textBtn = document.createElement("div");
            core._textBtn.id = "textBtn";
            core._textBtn.className = "menuBtn hide";
            core._textBtn.addEventListener("click", function () { return _this.toggleFontSize(); });
            core._presentationMenu.appendChild(core._textBtn);
            core._fullscreenBtn = document.createElement("div");
            core._fullscreenBtn.id = "fullscreenBtn";
            core._fullscreenBtn.className = "menuBtn";
            core._fullscreenBtn.addEventListener("click", function () { return _this.toggleFullScreen(); });
            core._presentationMenu.appendChild(core._fullscreenBtn);
            core._timer = document.createElement("div");
            core._timer.id = "myTimer";
            core._presentationMenu.appendChild(core._fullscreenBtn);
            window.onkeyup = function (e) {
                var key = e.keyCode ? e.keyCode : e.which;
                if (key == 39) {
                    _this.nextState();
                }
                else if (key == 37) {
                    _this.prevState();
                }
            };
            setResize();
        }
        initPresentation.prototype.toggleSlides = function () {
            if (core._slidesContainer.className === "") {
                core._slidesContainer.className = "hide";
            }
            else {
                core._slidesContainer.className = "";
            }
        };
        initPresentation.prototype.toggleFontSize = function () {
            core._fontSize++;
            if (core._fontSize == 3)
                core._fontSize = 0;
            core._code.className = "typescript " + core._textClass[core._fontSize] + " hljs";
        };
        initPresentation.prototype.toggleCode = function () {
            if (core._codeContainer.className === "") {
                core._codeContainer.className = "hide";
                core._textBtn.className = "menuBtn hide";
            }
            else {
                core._codeContainer.className = "";
                core._textBtn.className = "menuBtn";
            }
        };
        initPresentation.prototype.toggleFullScreen = function () {
            if ((document.fullScreenElement && document.fullScreenElement !== null) ||
                (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                this.setFullscreen();
            }
            else {
                this.removeFullscreen();
            }
        };
        initPresentation.prototype.setFullscreen = function () {
            core._fullscreenBtn.className = "menuBtn active";
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            }
            else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozReq;
                uestFullScreen();
            }
            else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        };
        initPresentation.prototype.removeFullscreen = function () {
            core._fullscreenBtn.className = "menuBtn";
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        };
        initPresentation.prototype.prevState = function () {
            if (core._currentIndex == 0)
                return;
            var lastState = core._currentIndex;
            core._currentIndex--;
            if (core._currentIndex < 0)
                core._currentIndex = 0;
            goState(core.presentationData.slides[core._currentIndex].state, core._game);
        };
        initPresentation.prototype.nextState = function () {
            if (core._currentIndex == core.presentationData.slides.length - 1)
                return;
            var lastState = core._currentIndex;
            core._currentIndex++;
            if (core._currentIndex >= core.presentationData.slides.length)
                core._currentIndex = core.presentationData.slides.length - 1;
            goState(core.presentationData.slides[core._currentIndex].state, core._game);
        };
        initPresentation.prototype.resize = function () {
            var canvas = document.querySelector("canvas");
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var windowRatio = windowWidth / windowHeight;
            var gameRatio = core._config.width / core._config.height;
            if (windowRatio < gameRatio) {
                canvas.style.width = windowWidth + "px";
                canvas.style.height = windowWidth / gameRatio + "px";
            }
            else {
                canvas.style.width = windowHeight * gameRatio + "px";
                canvas.style.height = windowHeight + "px";
            }
        };
        return initPresentation;
    }());
    core.initPresentation = initPresentation;
    window.onload = function () {
        _initGame = new core.initPresentation(1024, 768);
        _initGame.resize();
    };
    window.addEventListener("blur", function () {
        if (core._game != undefined) {
            console.log(core._currentIndex);
            core._game.scene.stop(core.presentationData.slides[core._currentIndex].state);
        }
    });
    window.addEventListener("focus", function () {
        if (core._game != undefined) {
            console.log(core._currentIndex);
            core._game.scene.start(core.presentationData.slides[core._currentIndex].state);
        }
    });
    window.onresize = function () { return _initGame.resize(); };
})(core || (core = {}));
var core;
(function (core) {
    core.presentationData = {
        slides: [
            {
                title: "OUAS",
                state: "slide1",
                preview: "assets/images/slide1/preview.png",
                code: ""
            },
            {
                title: "Fairlight",
                state: "slide2",
                preview: "assets/images/slide2/preview.png",
                code: ""
            },
            {
                title: "THE YODAS CREW",
                state: "slide3",
                preview: "assets/images/slide3/preview.png",
                code: ""
            },
            {
                title: "THE YODAS CREW",
                state: "slide4",
                preview: "assets/images/slide4/preview.png",
                code: ""
            },
            {
                title: "THE YODAS CREW",
                state: "slide5",
                preview: "assets/images/slide5/preview.png",
                code: ""
            },
            {
                title: "THE YODAS CREW",
                state: "slide6",
                preview: "assets/images/slide6/preview.png",
                code: ""
            },
            {
                title: "THE YODAS CREW",
                state: "slide7",
                preview: "assets/images/slide7/preview.png",
                code: ""
            },
            {
                title: "THE YODAS CREW",
                state: "slide8",
                preview: "assets/images/slide8/preview.png",
                code: ""
            },
            {
                title: "THE YODAS CREW",
                state: "slide9",
                preview: "assets/images/slide9/preview.png",
                code: ""
            },
            {
                title: "THE YODAS CREW",
                state: "slide10",
                preview: "assets/images/slide10/preview.png",
                code: ""
            }
        ]
    };
    core.gameData = {
        assets: {
            spritesheets: [
                {
                    name: "dots",
                    path: "assets/images/slide1/dots.png",
                    width: 33,
                    height: 62,
                    frames: 2
                },
                {
                    name: "dots2",
                    path: "assets/images/slide1/dots2.png",
                    width: 33,
                    height: 62,
                    frames: 2
                }
            ],
            images: [
                { name: "introPast", path: "assets/images/slide1/past.png" },
                { name: "introNow", path: "assets/images/slide1/now.png" },
                { name: "ouas", path: "assets/images/slide1/ouasMask.png" },
                { name: "raster", path: "assets/images/slide1/raster.png" },
                { name: "tyc", path: "assets/images/template/tyc.png" },
                { name: "subtitle", path: "assets/images/template/subtitle.png" },
                { name: "bg", path: "assets/images/template/_bg.png" },
                { name: "mountains", path: "assets/images/template/_mountains.png" },
                { name: "land", path: "assets/images/template/_land.png" },
                { name: "trees", path: "assets/images/template/_trees.png" },
                { name: "water", path: "assets/images/template/_water.png" },
                {
                    name: "fairlight-logo",
                    path: "assets/images/slide2/fairlight-logo.png"
                },
                {
                    name: "fairlight-raster",
                    path: "assets/images/slide2/fairlight-raster.png"
                },
                {
                    name: "fairlight-raster2",
                    path: "assets/images/slide2/fairlight-raster2.png"
                },
                { name: "scrollFont", path: "assets/fonts/test.png" },
                { name: "foto-frame", path: "assets/images/foto/foto-frame.png" },
                { name: "foto1", path: "assets/images/foto/foto1.jpg" },
                { name: "foto1-64", path: "assets/images/foto/foto1-64.png" },
                { name: "foto2", path: "assets/images/foto/foto2.jpg" },
                { name: "foto2-64", path: "assets/images/foto/foto2-64.png" }
            ],
            sounds: [
                {
                    name: "intro",
                    paths: ["assets/sounds/intro1.ogg", "assets/sounds/intro1.m4a"],
                    volume: 3,
                    loop: false
                },
                {
                    name: "fairlight",
                    paths: ["assets/sounds/fairlight.ogg", "assets/sounds/fairlight.m4a"],
                    volume: 3,
                    loop: true
                }
            ],
            bitmapfont: [
                {
                    name: "digital",
                    imgpath: "assets/fonts/digital_0.png",
                    xmlpath: "assets/fonts/digital.xml",
                    jsonpath: ""
                },
                {
                    name: "commodore",
                    imgpath: "assets/fonts/64_0.png",
                    xmlpath: "assets/fonts/64.xml",
                    jsonpath: ""
                }
            ]
        },
        map: [],
        levels: []
    };
})(core || (core = {}));
var core;
(function (core) {
    var template = (function (_super) {
        __extends(template, _super);
        function template(scene) {
            var _this = _super.call(this, scene, 0, 0) || this;
            _this.stars = [];
            _this.scene = scene;
            _this.stars = [];
            _this.scene.add.image(0, 0, "bg-commodore").setOrigin(0, 0);
            _this.scene.add.image(540, 430, "bg-commodore-blue").setOrigin(0.5);
            _this.bg = _this.scene.add
                .tileSprite(540, 0, 1080, 150, "bg")
                .setOrigin(0.5, 0)
                .setAlpha(0)
                .setTilePosition(500);
            _this.mountains = _this.scene.add
                .tileSprite(540, 50, 1080, 80, "mountains")
                .setAlpha(0)
                .setOrigin(0.5, 0);
            _this.mountains.setTilePosition(200).setDepth(9);
            _this.tyc = _this.scene.add
                .image(400, 40, "tyc")
                .setScale(1)
                .setAlpha(0)
                .setDepth(10);
            _this.trees = _this.scene.add
                .tileSprite(540, 100, 1080, 30, "trees")
                .setOrigin(0.5, 0)
                .setAlpha(0)
                .setDepth(11);
            _this.trees.setTilePosition(200);
            _this.water = _this.scene.add
                .tileSprite(540, 125, 1080, 35, "water")
                .setOrigin(0.5, 0)
                .setAlpha(0)
                .setDepth(12);
            _this.water.setTilePosition(200);
            _this.land = _this.scene.add
                .tileSprite(540, 125, 1080, 35, "land")
                .setOrigin(0.5, 0)
                .setAlpha(0)
                .setDepth(13);
            _this.land.setTilePosition(200);
            _this.scene.tweens.add({
                targets: [_this.bg, _this.mountains, _this.trees, _this.land, _this.water],
                alpha: 1,
                duration: 400
            });
            _this.scene.tweens.add({
                targets: _this.tyc,
                alpha: {
                    value: 1,
                    duration: 500,
                    repeat: 0
                },
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
            var _star;
            [0, 1, 2, 3, 4].forEach(function () {
                _star = new core.star(_this.scene);
                _star.setDepth(1);
                _this.stars.push(_star);
                _this.add(_star);
            });
            //this.subtitle = this.scene.add.image(540, 300, "subtitle").setScale(1);
            _this.scene.add.existing(_this);
            return _this;
        }
        template.prototype.update = function () {
            this.mountains.tilePositionX += 0.25;
            this.trees.tilePositionX += 0.35;
            this.land.tilePositionX += 0.35;
            this.water.tilePositionX += 0.45;
            this.stars.forEach(function (element) {
                element.update();
            });
        };
        return template;
    }(Phaser.GameObjects.Container));
    core.template = template;
})(core || (core = {}));
