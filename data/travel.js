/*
  Photos on the travel map. One entry per photo, placed at the exact spot it was taken.
  Nearby photos group into clusters and spread out to their own spots as you zoom in.

    src      – the full-size image (images/travel/)
    thumb    – a small copy used in the hover previews (images/travel/thumbs/)
    lat, lng – where it was taken
    place    – the city or area, used as the cluster's name (e.g. "Yosemite")
    country  – used for the countries count
    caption  – optional, shown under the photo
    date     – optional, e.g. "Sep 2026"
    featured – optional; true puts this photo first in its cluster's preview
*/
window.TRAVEL_PHOTOS = [
  {"src": "images/travel/baltimore-1.jpg", "thumb": "images/travel/thumbs/baltimore-1.jpg", "lat": 39.292162, "lng": -76.608567, "place": "Baltimore", "country": "United States", "date": "Jan 2026"},
  {"src": "images/travel/baltimore-2.jpg", "thumb": "images/travel/thumbs/baltimore-2.jpg", "lat": 39.281633, "lng": -76.592946, "place": "Baltimore", "country": "United States", "caption": "Fells Point", "date": "Jan 2026"},
  {"src": "images/travel/bryce-canyon-1.jpg", "thumb": "images/travel/thumbs/bryce-canyon-1.jpg", "lat": 37.6283, "lng": -112.1677, "place": "Bryce Canyon", "country": "United States", "caption": "Bryce Canyon"},
  {"src": "images/travel/bryce-canyon-2.jpg", "thumb": "images/travel/thumbs/bryce-canyon-2.jpg", "lat": 37.6283, "lng": -112.1677, "place": "Bryce Canyon", "country": "United States", "caption": "Bryce Canyon at sunrise", "date": "May 2026"},
  {"src": "images/travel/bryce-canyon-3.jpg", "thumb": "images/travel/thumbs/bryce-canyon-3.jpg", "lat": 37.624, "lng": -112.166, "place": "Bryce Canyon", "country": "United States", "caption": "Bryce Canyon", "date": "May 2026"},
  {"src": "images/travel/glacier-national-park-1.jpg", "thumb": "images/travel/thumbs/glacier-national-park-1.jpg", "lat": 48.531839, "lng": -113.999805, "place": "Glacier National Park", "country": "United States"},
  {"src": "images/travel/glacier-national-park-2.jpg", "thumb": "images/travel/thumbs/glacier-national-park-2.jpg", "lat": 48.480631, "lng": -113.377876, "place": "Glacier National Park", "country": "United States", "caption": "Two Medicine Lake"},
  {"src": "images/travel/glacier-national-park-3.jpg", "thumb": "images/travel/thumbs/glacier-national-park-3.jpg", "lat": 48.5005, "lng": -113.9849, "place": "Glacier National Park", "country": "United States", "caption": "West entrance", "date": "Aug 2025"},
  {"src": "images/travel/glacier-national-park-4.jpg", "thumb": "images/travel/thumbs/glacier-national-park-4.jpg", "lat": 48.6596, "lng": -113.787, "place": "Glacier National Park", "country": "United States", "date": "Aug 2025"},
  {"src": "images/travel/grand-teton-1.jpg", "thumb": "images/travel/thumbs/grand-teton-1.jpg", "lat": 43.790229, "lng": -110.682028, "place": "Grand Teton", "country": "United States", "date": "Jan 2026"},
  {"src": "images/travel/grand-teton-2.jpg", "thumb": "images/travel/thumbs/grand-teton-2.jpg", "lat": 43.79041, "lng": -110.681823, "place": "Grand Teton", "country": "United States", "date": "Jul 2026"},
  {"src": "images/travel/grand-teton-3.jpg", "thumb": "images/travel/thumbs/grand-teton-3.jpg", "lat": 43.741, "lng": -110.799, "place": "Grand Teton", "country": "United States", "caption": "The Tetons", "date": "Jul 2026"},
  {"src": "images/travel/jersey-city-1.jpg", "thumb": "images/travel/thumbs/jersey-city-1.jpg", "lat": 40.725055, "lng": -74.081542, "place": "Jersey City", "country": "United States", "date": "Aug 2026"},
  {"src": "images/travel/jersey-city-2.jpg", "thumb": "images/travel/thumbs/jersey-city-2.jpg", "lat": 40.721757, "lng": -74.034862, "place": "Jersey City", "country": "United States", "date": "Nov 2025"},
  {"src": "images/travel/luray-caverns-1.jpg", "thumb": "images/travel/thumbs/luray-caverns-1.jpg", "lat": 38.662995, "lng": -78.483195, "place": "Luray Caverns", "country": "United States", "caption": "Luray Caverns", "date": "Jan 2026"},
  {"src": "images/travel/mount-rainier-1.jpg", "thumb": "images/travel/thumbs/mount-rainier-1.jpg", "lat": 46.8523, "lng": -121.7603, "place": "Mount Rainier", "country": "United States", "caption": "Mount Rainier from the air"},
  {"src": "images/travel/multnomah-falls-1.jpg", "thumb": "images/travel/thumbs/multnomah-falls-1.jpg", "lat": 45.5762, "lng": -122.1158, "place": "Multnomah Falls", "country": "United States", "caption": "Multnomah Falls", "date": "Jul 2026"},
  {"src": "images/travel/new-york-1.jpg", "thumb": "images/travel/thumbs/new-york-1.jpg", "lat": 40.756585, "lng": -73.986248, "place": "New York", "country": "United States", "caption": "Times Square"},
  {"src": "images/travel/new-york-2.jpg", "thumb": "images/travel/thumbs/new-york-2.jpg", "lat": 40.7308, "lng": -73.9973, "place": "New York", "country": "United States", "caption": "Washington Square Park", "date": "May 2025"},
  {"src": "images/travel/new-york-3.jpg", "thumb": "images/travel/thumbs/new-york-3.jpg", "lat": 40.756912, "lng": -73.845463, "place": "New York", "country": "United States", "caption": "The Lumineers at Citi Field", "date": "Jul 2025"},
  {"src": "images/travel/new-york-4.jpg", "thumb": "images/travel/thumbs/new-york-4.jpg", "lat": 40.704345, "lng": -73.990535, "place": "New York", "country": "United States", "caption": "Pebble beach", "date": "Sep 2025"},
  {"src": "images/travel/new-york-5.jpg", "thumb": "images/travel/thumbs/new-york-5.jpg", "lat": 40.754011, "lng": -73.98394, "place": "New York", "country": "United States", "caption": "Ice rink", "date": "Nov 2025"},
  {"src": "images/travel/new-york-6.jpg", "thumb": "images/travel/thumbs/new-york-6.jpg", "lat": 40.758, "lng": -73.9855, "place": "New York", "country": "United States", "caption": "Times Square", "date": "Jun 2026"},
  {"src": "images/travel/new-york-7.jpg", "thumb": "images/travel/thumbs/new-york-7.jpg", "lat": 40.7587, "lng": -73.9787, "place": "New York", "country": "United States", "caption": "Rockefeller Center tree", "date": "Dec 2024"},
  {"src": "images/travel/new-york-8.jpg", "thumb": "images/travel/thumbs/new-york-8.jpg", "lat": 40.759, "lng": -73.977, "place": "New York", "country": "United States", "caption": "Holiday lights", "date": "Dec 2024"},
  {"src": "images/travel/new-york-9.jpg", "thumb": "images/travel/thumbs/new-york-9.jpg", "lat": 40.7752, "lng": -73.9706, "place": "New York", "country": "United States", "caption": "Cherry blossoms, Central Park", "date": "Apr 2026"},
  {"src": "images/travel/new-york-10.jpg", "thumb": "images/travel/thumbs/new-york-10.jpg", "lat": 40.7755, "lng": -73.97, "place": "New York", "country": "United States", "caption": "Cherry blossoms, Central Park", "date": "Apr 2026"},
  {"src": "images/travel/new-york-11.jpg", "thumb": "images/travel/thumbs/new-york-11.jpg", "lat": 40.7766, "lng": -73.9712, "place": "New York", "country": "United States", "caption": "Central Park", "date": "Apr 2026"},
  {"src": "images/travel/new-york-12.jpg", "thumb": "images/travel/thumbs/new-york-12.jpg", "lat": 40.7794, "lng": -73.9691, "place": "New York", "country": "United States", "caption": "Belvedere Castle", "date": "Apr 2026"},
  {"src": "images/travel/new-york-13.jpg", "thumb": "images/travel/thumbs/new-york-13.jpg", "lat": 40.741999, "lng": -74.010601, "place": "New York", "country": "United States", "date": "Oct 2026"},
  {"src": "images/travel/new-york-14.jpg", "thumb": "images/travel/thumbs/new-york-14.jpg", "lat": 40.7536, "lng": -73.9832, "place": "New York", "country": "United States", "caption": "Bryant Park Winter Village", "date": "Nov 2024"},
  {"src": "images/travel/north-cascades-1.jpg", "thumb": "images/travel/thumbs/north-cascades-1.jpg", "lat": 48.7104, "lng": -121.0985, "place": "North Cascades", "country": "United States", "caption": "Diablo Lake", "date": "Jul 2026"},
  {"src": "images/travel/north-cascades-2.jpg", "thumb": "images/travel/thumbs/north-cascades-2.jpg", "lat": 48.696, "lng": -121.12, "place": "North Cascades", "country": "United States", "date": "Jul 2026"},
  {"src": "images/travel/pittsburgh-1.jpg", "thumb": "images/travel/thumbs/pittsburgh-1.jpg", "lat": 40.4385, "lng": -80.0178, "place": "Pittsburgh", "country": "United States", "caption": "From Mount Washington", "date": "May 2026"},
  {"src": "images/travel/pittsburgh-2.jpg", "thumb": "images/travel/thumbs/pittsburgh-2.jpg", "lat": 40.4443, "lng": -79.9532, "place": "Pittsburgh", "country": "United States", "caption": "Cathedral of Learning", "date": "May 2026"},
  {"src": "images/travel/san-diego-1.jpg", "thumb": "images/travel/thumbs/san-diego-1.jpg", "lat": 32.747918, "lng": -117.129836, "place": "San Diego", "country": "United States", "caption": "Part Time Lovers", "date": "Jan 2026"},
  {"src": "images/travel/sausalito-1.jpg", "thumb": "images/travel/thumbs/sausalito-1.jpg", "lat": 37.854695, "lng": -122.478976, "place": "Sausalito", "country": "United States", "date": "Feb 2026"},
  {"src": "images/travel/seattle-1.jpg", "thumb": "images/travel/thumbs/seattle-1.jpg", "lat": 47.596701, "lng": -122.329116, "place": "Seattle", "country": "United States", "caption": "King Street Station", "date": "Jul 2025"},
  {"src": "images/travel/seattle-2.jpg", "thumb": "images/travel/thumbs/seattle-2.jpg", "lat": 47.620515, "lng": -122.349317, "place": "Seattle", "country": "United States", "date": "Feb 2026"},
  {"src": "images/travel/seattle-3.jpg", "thumb": "images/travel/thumbs/seattle-3.jpg", "lat": 47.6062, "lng": -122.3421, "place": "Seattle", "country": "United States", "date": "Jun 2026"},
  {"src": "images/travel/seattle-4.jpg", "thumb": "images/travel/thumbs/seattle-4.jpg", "lat": 47.5952, "lng": -122.3316, "place": "Seattle", "country": "United States", "caption": "Lumen Field", "date": "Jul 2026"},
  {"src": "images/travel/upstate-new-york-1.jpg", "thumb": "images/travel/thumbs/upstate-new-york-1.jpg", "lat": 42.622156, "lng": -73.755226, "place": "Upstate New York", "country": "United States", "caption": "Whitewater rafting"},
  {"src": "images/travel/yosemite-1.jpg", "thumb": "images/travel/thumbs/yosemite-1.jpg", "lat": 37.7456, "lng": -119.5936, "place": "Yosemite", "country": "United States", "date": "Sep 2026"},
  {"src": "images/travel/yosemite-2.jpg", "thumb": "images/travel/thumbs/yosemite-2.jpg", "lat": 37.729187, "lng": -119.573075, "place": "Yosemite", "country": "United States", "date": "Sep 2026"},
  {"src": "images/travel/yosemite-3.jpg", "thumb": "images/travel/thumbs/yosemite-3.jpg", "lat": 37.718992, "lng": -119.65062, "place": "Yosemite", "country": "United States", "date": "Sep 2026"},
  {"src": "images/travel/yosemite-4.jpg", "thumb": "images/travel/thumbs/yosemite-4.jpg", "lat": 37.833553, "lng": -119.460213, "place": "Yosemite", "country": "United States", "date": "Sep 2026"},
  {"src": "images/travel/yosemite-5.jpg", "thumb": "images/travel/thumbs/yosemite-5.jpg", "lat": 37.7156, "lng": -119.6773, "place": "Yosemite", "country": "United States", "caption": "Yosemite Valley", "date": "Sep 2026"},
  {"src": "images/travel/yosemite-6.jpg", "thumb": "images/travel/thumbs/yosemite-6.jpg", "lat": 37.8318, "lng": -119.4701, "place": "Yosemite", "country": "United States", "caption": "Tenaya Lake", "date": "Sep 2026"},
  {"src": "images/travel/yosemite-7.jpg", "thumb": "images/travel/thumbs/yosemite-7.jpg", "lat": 37.83, "lng": -119.465, "place": "Yosemite", "country": "United States", "caption": "Tenaya Lake", "date": "Sep 2026"},
  {"src": "images/travel/zion-1.jpg", "thumb": "images/travel/thumbs/zion-1.jpg", "lat": 37.2982, "lng": -113.0263, "place": "Zion", "country": "United States", "caption": "Zion National Park"},
  {"src": "images/travel/zion-2.jpg", "thumb": "images/travel/thumbs/zion-2.jpg", "lat": 37.2131, "lng": -112.942, "place": "Zion", "country": "United States", "caption": "Zion National Park", "date": "May 2026"}
];
