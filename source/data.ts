namespace core {
  export const presentationData = {
    slides: [
      {
        title: "OUAS",
        state: "slide1",
        preview: "assets/images/slide1/preview.png",
        code: ""
      },

      {
        title: "TYC",
        state: "slide2",
        preview: "assets/images/slide2/bg.png",
        code: ""
      }
    ]
  };

  export const gameData = {
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
        { name: "tyc", path: "assets/images/slide2/tyc.png" },
        { name: "subtitle", path: "assets/images/slide2/subtitle.png" },
        { name: "bg", path: "assets/images/slide2/_bg.png" },
        { name: "mountains", path: "assets/images/slide2/_mountains.png" },
        { name: "land", path: "assets/images/slide2/_land.png" },
        { name: "trees", path: "assets/images/slide2/_trees.png" },
        { name: "water", path: "assets/images/slide2/_water.png" }
      ],
      sounds: [
        {
          name: "intro",
          paths: ["assets/sounds/intro1.ogg", "assets/sounds/intro1.m4a"],
          volume: 3,
          loop: false
        }
      ],
      bitmapfont: [
        {
          name: "digital",
          imgpath: "assets/fonts/digital_0.png",
          xmlpath: "assets/fonts/digital.xml",
          jsonpath: ""
        }
      ]
    },
    map: [],
    levels: []
  };
}
