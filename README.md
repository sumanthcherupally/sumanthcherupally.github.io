# sumanthcherupally.github.io

My personal site: plain HTML, CSS and JavaScript, served by GitHub Pages. No build step.

## Files

- `index.html` – home: about, experience, projects, travel map, publications
- `hobbies.html` – chess, skiing, ice skating, photography
- `assets/css/style.css` – all styles; colors and fonts are at the top
- `assets/js/main.js` – greeting, photo viewer, hobby galleries, chess board
- `assets/js/travel.js` – the travel map (Leaflet + CARTO map tiles)
- `data/travel.js` – **places on the map** (edit this to add trips)
- `data/hobbies.js` – **hobby photos** and the chess position

## Adding a trip

1. Resize and copy the photos: `scripts/add-photos.sh travel ~/Desktop/paris/*.jpg`
2. Add a block to `data/travel.js` with the place name, country, coordinates and the photo paths it printed.

## Preview locally

```
python3 -m http.server 8000
```
Then open http://localhost:8000.
