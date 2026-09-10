# Joe Chan — Portfolio

Portfolio site for a Hong Kong-based Product Designer and Product Manager.

The homepage opens with a Three.js camera flight through 3D devices and
animated circuit traces, then reveals the collection. Projects are browsed
by dragging or flipping through the work selector. An optional coin-slot
access gate is available but is currently switched off.

## Stack

Static HTML, CSS and vanilla JavaScript. No build step, no framework.
Three.js r180 is served locally from `assets/vendor/three/` for the 3D entrance.
GSAP 3.12.5 loads from a CDN with a no-GSAP fallback, and every animation
degrades under `prefers-reduced-motion`.

## Running locally

```
npx http-server . -p 4174 -c-1
```

Then open <http://127.0.0.1:4174>.

## Entrance playback

[Replay the full entrance on the live site](https://joechannnn.github.io/joe-portfolio/?entrance=full)

The 3D entrance plays automatically once per tab session on the homepage.
`sessionStorage` records playback under `portfolio-entrance`; subsequent
visits in the same session use a short fade instead. Add `entrance=full` to
replay the full animation, including after refreshing the page.

| URL query | Effect |
| --- | --- |
| `?entrance=full` | Replay the full 3D entrance, ignoring the session playback marker. |
| `?gate=skip&entrance=full` | Bypass the access gate and replay the full 3D entrance. Saves a 30-day gate pass. |
| `?gate=skip` | Bypass the access gate and save a 30-day pass. Normal 3D playback rules still apply. |
| `?gate=preview` | Show the access gate even when it is disabled or a pass is saved. |
| `?gate=reset` | Clear the saved gate pass and show the access gate. Does not reset the 3D playback marker. |
| `?gate=reset&entrance=full` | Preview the access gate, then play the full 3D entrance after completing it. |

Local replay: <http://127.0.0.1:4174/?entrance=full>.
Use `&entrance=full` when adding the flag to a URL that already has query parameters.

The access gate is controlled by `GATE_MODE` in `assets/js/access.js`,
currently `"off"`. Set it to `"on"` to enable the gate for visitors without
a saved pass. The 3D entrance waits until the gate has closed; `entrance=full`
does not bypass the gate itself.

The full animation lasts approximately 2.5 seconds after assets are ready.
Click **Skip intro**, click/tap the page, press a key or scroll to skip it.
Reduced-motion preferences, a hidden tab or an initial scroll position more
than 80px down the page prevent full playback, even with `entrance=full`.
Resizing or hiding the tab during playback ends the animation. If WebGL or
asset preparation fails, the existing page remains usable.

## Structure

```
index.html          Home — crate hero, focus stats, work list, about, contact
projects/           Case studies, one file each
assets/css/         style.css (site) · access.css (gate) · entry.css (3D entrance)
assets/js/          main.js (work selector) · access.js (gate) · flows.js
                    entry.js (trigger) · entry-flight.js (camera and playback)
                    entry-devices.js (models) · entry-circuits.js (circuit lighting)
assets/vendor/      Local Three.js modules and license
assets/img/         Case imagery, thumbnails, circuit artwork
assets/video/       Optional access-gate film
```

Adding a project takes one `<li>` in `#worklist` with `data-cover`, `data-a`
and `data-b`, plus the case study page. Numbering, the counter and the crate
sleeve are all generated from that row.

## Contact

joechanwainam@gmail.com · [Medium](https://medium.com/@joechanwainam) · [LinkedIn](https://linkedin.com/in/joechanuiux)
