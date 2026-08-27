# Joe Chan — Portfolio

Portfolio site for a Hong Kong-based Product Designer and Product Manager.

The site runs on one idea: an immersive portfolio, where browsing the work
feels like flipping through a record crate. The hero is a crate of sleeves you
drag and flip through, each case study is a record, and the entrance is a coin
slot rather than a landing page. Everything else — type, palette, motion —
follows from that.

## Stack

Static HTML, CSS and vanilla JavaScript. No build step, no framework.
GSAP 3.12.5 loads from a CDN with a no-GSAP fallback, and every animation
degrades under `prefers-reduced-motion`.

## Running locally

```
npx http-server . -p 4174 -c-1
```

Then open <http://127.0.0.1:4174>.

Query flags for the entrance:

| Flag            | Effect                                            |
| --------------- | ------------------------------------------------- |
| `?gate=skip`    | Bypass the entrance and open the work directly    |
| `?gate=preview` | Always show the entrance, ignoring the saved pass |
| `?gate=reset`   | Clear the 30-day pass cookie                      |

## Structure

```
index.html          Home — crate hero, focus stats, work list, about, contact
projects/           Case studies, one file each
assets/css/         style.css (site) · access.css (entrance)
assets/js/          main.js (crate + interactions) · access.js (entrance) · flows.js
assets/img/         Case imagery, thumbnails, circuit artwork
assets/video/       Entrance film
```

Adding a project takes one `<li>` in `#worklist` with `data-cover`, `data-a`
and `data-b`, plus the case study page. Numbering, the counter and the crate
sleeve are all generated from that row.

## Contact

joechanwainam@gmail.com · [Medium](https://medium.com/@joechanwainam) · [LinkedIn](https://linkedin.com/in/joechanuiux)
