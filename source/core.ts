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
  active: function() {},
  google: {
    families: ["Press Start 2P"]
  }
};

var fbConfig = {
  apiKey: "++++",
  authDomain: "livetest-32ea9.firebaseio.com",
  databaseURL: "https://livetest-32ea9.firebaseio.com/",
  projectId: "livetest-32ea9",
  storageBucket: "",
  messagingSenderId: ""
};

namespace core {
  let _ismobile: boolean;
  let _gameSounds: Array<Phaser.Sound.BaseSound> = [];
  let fbObj: any = null;
  let fbSlideObj: any = null;
  let currentSlide: number = null;

  export const _config = {
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    parent: "my-game",
    width: 1080,
    height: 720,
    scene: [
      Boot,
      Preloader,
      slide1,
      slide2,
      slide3,
      slide4,
      slide5,
      slide6,
      slide7,
      slide8,
      slide9,
      slide10
    ]
  };

  export function createFbObj() {
    if (this.fbObj == null) {
      console.log("createFbObj");
      this.fbObj = firebase.initializeApp(fbConfig);
    }
  }

  export function createFbListener() {
    if (this.fbSlideObj == null) {
      console.log("createFbListener");

      this.fbSlideObj = this.fbObj.database().ref("/");

      this.fbSlideObj.on("child_changed", data => {
        console.log(data.key, data.val());

        let _string = <string>data.val();

        if (data.key == "currentSlide") {
          console.log("goto:", presentationData.slides[data.val()].state);
          _currentIndex = data.val();
          goState(presentationData.slides[data.val()].state, _game);
        }
      });
    }
  }

  export let _presentation: Phaser.Game = null;

  export let _textClass: Array<string> = ["normal", "medium", "big"];

  //export let _newPresentation: initPresentation;
  export let _slidesContainer: HTMLElement;
  export let _slides: HTMLElement;
  export let _codeContainer: HTMLElement;
  export let _code: HTMLElement;
  export let _presentationMenu: HTMLElement;
  export let _game: Phaser.Game;
  export let _timer: HTMLElement;
  export let _currentIndex: number;
  export let _slidesBtn: HTMLElement;
  export let _nextBtn: HTMLElement;
  export let _prevBtn: HTMLElement;
  export let _codeBtn: HTMLElement;
  export let _textBtn: HTMLElement;
  export let _fontSize: number = 0;

  export let _fullscreenBtn: HTMLElement;

  export function isMobile(game: Phaser.Game): boolean {
    if (
      game.device.input.touch &&
      (game.device.os.iOS ||
        game.device.os.android ||
        game.device.os.windowsPhone)
    ) {
      return true;
    } else {
      return false;
    }
  }
  export enum gameSound {
    intro,
    fairlight
  }
  export function pushSound(_sound: Phaser.Sound.BaseSound): void {
    _gameSounds.push(_sound);
  }

  export function getSound(_sound: gameSound): Phaser.Sound.BaseSound {
    return _gameSounds[_sound];
  }

  export function playSound(_sound: gameSound): void {
    _gameSounds[_sound].play();
  }

  export function stopSound(_sound: gameSound): void {
    _gameSounds[_sound].stop();
  }

  export function stopSoundAll(): void {
    _gameSounds.forEach(sound => {
      sound.stop();
    });
  }

  export function pauseSound(_sound: gameSound): void {
    _gameSounds[_sound].stop();
  }

  export function loadCode(_file: string) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = e => {
      if (xhr.readyState == 4) {
        _code.innerHTML = xhr.responseText;

        hljs.highlightBlock(_code);
      }
    };
    let _path: string = "data/" + _file + ".html";
    xhr.open("GET", _path, true);
    xhr.setRequestHeader("Content-type", "text/html");
    xhr.send();
  }

  export function startTimer(): void {
    countdown("myTimer", 25, 0);
  }

  export function countdown(
    elementName: string,
    minutes: number,
    seconds: number
  ) {
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits(n) {
      return n <= 9 ? "0" + n : n;
    }

    function updateTimer(): void {
      msLeft = endTime - +new Date();
      if (msLeft < 1000) {
        element.innerHTML = "countdown's over!";
      } else {
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

  export function setCurrentIndex(_state: string): void {
    let _index = 0;
    presentationData.slides.forEach(element => {
      if (element.state === _state) {
        _currentIndex = _index;
      }
      _index++;
    });
  }

  export function setResize(): void {
    _slidesContainer.style.height = window.innerHeight + "px";
    _slidesContainer.style.width = window.innerWidth + "px";
    _codeContainer.style.height = window.innerHeight + "px";
    //_codeContainer.style.width = window.innerWidth + "px";
  }

  export function goState(_state: string, _game: Phaser.Game): void {
    stopSoundAll();
    setUpSlide(_state);

    _game.scene.scenes.forEach((element: Phaser.Scene) => {
      if (_game.scene.isActive(element.scene.key))
        _game.scene.stop(element.scene.key);
      //_game.scene.sleep()
    });

    _game.scene.start(_state).bringToTop(_state);
  }

  export function setUpSlide(_state: string) {
    let _obj: { title: string; state: string; preview: string; code: string } =
      presentationData.slides[_currentIndex];
    _code.innerHTML = "";

    if (_obj.code != "") {
      loadCode(_obj.code);
      _codeBtn.className = "menuBtn";
    } else {
      _codeBtn.className = "menuBtn disabled";
    }

    if (_currentIndex + 1 >= presentationData.slides.length) {
      _nextBtn.className = "menuBtn disabled";
    } else {
      _nextBtn.className = "menuBtn";
    }

    if (_currentIndex - 1 == -1) {
      _prevBtn.className = "menuBtn disabled";
    } else {
      _prevBtn.className = "menuBtn";
    }
  }

  export class initPresentation {
    constructor(width?: number, height?: number) {
      let dpr: number = 1;
      _currentIndex = 0;

      if (devicePixelRatio != undefined) {
        dpr = devicePixelRatio || 1;

        if (!width) {
          width = screen.width * dpr;
        }
        if (!height) {
          height = screen.height * dpr;
        }
      }

      _game = new Phaser.Game(_config);

      _presentationMenu = document.getElementById("presentationMenu");
      _slidesContainer = document.getElementById("slidesContainer");
      _codeContainer = document.getElementById("codeContainer");
      _slides = document.getElementById("slides");
      _code = document.getElementById("code");

      let mString: string;
      let mElement: HTMLElement;
      presentationData.slides.forEach(element => {
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

        mElement.addEventListener("click", () => {
          _slidesContainer.className = "hide";
          setCurrentIndex(element.state);
          goState(element.state, _game);
        });

        _slides.appendChild(mElement);
      });

      _slidesBtn = document.createElement("div");
      _slidesBtn.id = "slidesBtn";
      _slidesBtn.className = "menuBtn";
      _slidesBtn.addEventListener("click", () => this.toggleSlides());
      _presentationMenu.appendChild(_slidesBtn);

      _prevBtn = document.createElement("div");
      _prevBtn.id = "prevBtn";
      _prevBtn.className = "menuBtn disabled";
      _prevBtn.addEventListener("click", () => this.prevState());
      _presentationMenu.appendChild(_prevBtn);

      _nextBtn = document.createElement("div");
      _nextBtn.id = "nextBtn";
      _nextBtn.className = "menuBtn disabled";
      _nextBtn.addEventListener("click", () => this.nextState());
      _presentationMenu.appendChild(_nextBtn);

      _codeBtn = document.createElement("div");
      _codeBtn.id = "codeBtn";
      _codeBtn.className = "menuBtn disabled";
      _codeBtn.addEventListener("click", () => this.toggleCode());
      _presentationMenu.appendChild(_codeBtn);

      _textBtn = document.createElement("div");
      _textBtn.id = "textBtn";
      _textBtn.className = "menuBtn hide";
      _textBtn.addEventListener("click", () => this.toggleFontSize());
      _presentationMenu.appendChild(_textBtn);

      _fullscreenBtn = document.createElement("div");
      _fullscreenBtn.id = "fullscreenBtn";
      _fullscreenBtn.className = "menuBtn";
      _fullscreenBtn.addEventListener("click", () => this.toggleFullScreen());
      _presentationMenu.appendChild(_fullscreenBtn);

      _timer = document.createElement("div");
      _timer.id = "myTimer";
      _presentationMenu.appendChild(_fullscreenBtn);

      window.onkeyup = e => {
        let key = e.keyCode ? e.keyCode : e.which;

        if (key == 39) {
          this.nextState();
        } else if (key == 37) {
          this.prevState();
        }
      };

      setResize();
    }

    toggleSlides(): void {
      if (_slidesContainer.className === "") {
        _slidesContainer.className = "hide";
      } else {
        _slidesContainer.className = "";
      }
    }

    toggleFontSize(): void {
      _fontSize++;
      if (_fontSize == 3) _fontSize = 0;

      _code.className = "typescript " + _textClass[_fontSize] + " hljs";
    }

    toggleCode(): void {
      if (_codeContainer.className === "") {
        _codeContainer.className = "hide";
        _textBtn.className = "menuBtn hide";
      } else {
        _codeContainer.className = "";
        _textBtn.className = "menuBtn";
      }
    }

    toggleFullScreen(): void {
      if (
        (document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)
      ) {
        this.setFullscreen();
      } else {
        this.removeFullscreen();
      }
    }

    setFullscreen(): void {
      _fullscreenBtn.className = "menuBtn active";

      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozReq;
        uestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    }

    removeFullscreen(): void {
      _fullscreenBtn.className = "menuBtn";
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }

    prevState(): void {
      if (_currentIndex == 0) return;
      let lastState = _currentIndex;
      _currentIndex--;
      if (_currentIndex < 0) _currentIndex = 0;
      goState(presentationData.slides[_currentIndex].state, _game);
    }

    nextState(): void {
      if (_currentIndex == presentationData.slides.length - 1) return;
      let lastState = _currentIndex;
      _currentIndex++;
      if (_currentIndex >= presentationData.slides.length)
        _currentIndex = presentationData.slides.length - 1;
      goState(presentationData.slides[_currentIndex].state, _game);
    }

    resize() {
      var canvas = document.querySelector("canvas");
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var windowRatio = windowWidth / windowHeight;
      var gameRatio = core._config.width / core._config.height;
      if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = windowWidth / gameRatio + "px";
      } else {
        canvas.style.width = windowHeight * gameRatio + "px";
        canvas.style.height = windowHeight + "px";
      }
    }
  }

  window.onload = () => {
    _initGame = new core.initPresentation(1024, 768);
    _initGame.resize();
  };

  window.addEventListener("blur", () => {
    if (_game != undefined) {
      console.log(_currentIndex);
      _game.scene.stop(presentationData.slides[_currentIndex].state);
    }
  });

  window.addEventListener("focus", () => {
    if (_game != undefined) {
      console.log(_currentIndex);
      _game.scene.start(presentationData.slides[_currentIndex].state);
    }
  });

  window.onresize = () => _initGame.resize();
}
