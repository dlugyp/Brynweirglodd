# Bryn-Weirglodd website

A simple, responsive one-page website for Bryn-Weirglodd, a farmhouse holiday home in Cwmystradllyn, Garndolbenmaen, Gwynedd LL51 9AZ.

Plain HTML, CSS and a little JavaScript. No build step, no dependencies. Open `index.html` in a browser to preview it.

## Structure

```
index.html        the page
css/style.css     all styling
js/main.js        photo viewer, maps button, footer year
images/           photos and favicon
.nojekyll         tells GitHub Pages to serve files as-is
```

## Adding the photos

The page expects these files in `images/`. Until a photo is added, its slot shows a neutral tile with a caption, so the page never looks broken.

| File | Shows |
| --- | --- |
| `hero.jpg` | Main banner: the house in the valley (landscape, at least 2000px wide) |
| `exterior-1.jpg` | The farmhouse from the garden (large first tile) |
| `view-1.jpg` | View down the valley |
| `living-room.jpg` | Living room with log fire |
| `kitchen.jpg` | Kitchen-diner |
| `bedroom-ground.jpg` | Ground-floor twin bedroom |
| `wet-room.jpg` | Accessible wet room |
| `bedroom-double.jpg` | A first-floor double bedroom |
| `bathroom.jpg` | Family bathroom |
| `garden.jpg` | Private garden |

Tips: landscape photos work best. Resize to about 1600px on the long edge (2000px for `hero.jpg`) and keep each file under ~400 KB. To add, remove or reorder photos, edit the `<ul class="gallery">` list in `index.html`; the alt text doubles as the caption.

Only use photos the owner holds the rights to.

## Deploying

Any static host works: upload the folder as-is.

- **GitHub Pages:** repository Settings → Pages → Deploy from a branch → `main` / root.
- **Netlify / Cloudflare Pages:** connect the repository, leave the build command empty, publish directory `/`.
