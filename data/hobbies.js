/*
  Photos for the Hobbies page. Put the files in images/hobbies/ and list them here.
  Each hobby's gallery shows its photos; an empty list shows "Photos coming soon" boxes.
*/
window.HOBBY_PHOTOS = {
  // { src: "images/hobbies/cooking-1.jpg", thumb: "optional small copy", caption: "..." }
  hiking: [
    { src: "images/travel/glacier-national-park-1.jpg", thumb: "images/travel/thumbs/glacier-national-park-1.jpg", caption: "Glacier National Park" },
    { src: "images/travel/yosemite-1.jpg", thumb: "images/travel/thumbs/yosemite-1.jpg", caption: "Yosemite" },
    { src: "images/travel/north-cascades-2.jpg", thumb: "images/travel/thumbs/north-cascades-2.jpg", caption: "North Cascades" },
    { src: "images/travel/bryce-canyon-1.jpg", thumb: "images/travel/thumbs/bryce-canyon-1.jpg", caption: "Bryce Canyon" },
    { src: "images/travel/glacier-national-park-4.jpg", thumb: "images/travel/thumbs/glacier-national-park-4.jpg", caption: "Glacier National Park" },
    { src: "images/travel/multnomah-falls-1.jpg", thumb: "images/travel/thumbs/multnomah-falls-1.jpg", caption: "Multnomah Falls" },
    { src: "images/travel/yosemite-2.jpg", thumb: "images/travel/thumbs/yosemite-2.jpg", caption: "Yosemite" },
    { src: "images/photography/photo-08.jpg", thumb: "images/photography/thumbs/photo-08.jpg" }
  ],
  photography: [
    { src: "images/photography/photo-01.jpg", thumb: "images/photography/thumbs/photo-01.jpg", caption: "Zabriskie Point, Death Valley" },
    { src: "images/photography/photo-05.jpg", thumb: "images/photography/thumbs/photo-05.jpg", caption: "Catskills, New York" },
    { src: "images/photography/photo-02.jpg", thumb: "images/photography/thumbs/photo-02.jpg", caption: "Salt Lake City, Utah" },
    { src: "images/photography/photo-04.jpg", thumb: "images/photography/thumbs/photo-04.jpg", caption: "Manhattan from Brooklyn" },
    { src: "images/photography/photo-03.jpg", thumb: "images/photography/thumbs/photo-03.jpg", caption: "Grand Canyon" },
    { src: "images/photography/photo-06.jpg", thumb: "images/photography/thumbs/photo-06.jpg", caption: "Yellowstone Lake" },
    { src: "images/photography/photo-07.jpg", thumb: "images/photography/thumbs/photo-07.jpg" },
    { src: "images/photography/photo-14.jpg", thumb: "images/photography/thumbs/photo-14.jpg" },
    { src: "images/photography/photo-10.jpg", thumb: "images/photography/thumbs/photo-10.jpg" },
    { src: "images/photography/photo-11.jpg", thumb: "images/photography/thumbs/photo-11.jpg" },
    { src: "images/travel/yosemite-5.jpg", thumb: "images/travel/thumbs/yosemite-5.jpg", caption: "Yosemite Valley" },
    { src: "images/photography/photo-13.jpg", thumb: "images/photography/thumbs/photo-13.jpg" }
  ],
  cooking: []
};

/*
  The chess board on the Hobbies page. FEN is the standard way to write a chess position
  (copy it from Lichess or Chess.com: Share > FEN). This one is the position after 1.d4.
*/
window.CHESS_POSITION = {
  fen: "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR",
  caption: "My go-to with white: 1.d4"
};
