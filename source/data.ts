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
}
