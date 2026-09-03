# antonpirro.com — static portfolio site

Plain HTML/CSS/JS. No build step, no framework, no dependencies.
Everything on the site is generated from **`data/projects.js`** — that is the
only file you need to touch for normal updates.

```
index.html          page shell (head, top bar, footer)
assets/site.css     all styling
assets/site.js      rendering + routing
data/projects.js    ← all content lives here
assets/img/         thumbnails / posters
assets/video/       self-hosted video files
```

---

## Preview it locally

```bash
cd ~/Documents/GitHub/antonpirro-site && python3 -m http.server 4321
```

Then open <http://localhost:4321>. Ctrl-C to stop.

After editing `data/projects.js`, reload with **Cmd+Shift+R** — a normal refresh
can serve you a cached copy of the old data and you'll think nothing happened.

---

## Adding or editing a project

Open `data/projects.js`, copy an existing `{ ... }` block, paste it where you
want it in the list, and change the text. Fields:

| field | what it is |
|---|---|
| `slug` | the URL: `#/work/your-slug`. Lowercase, hyphens, no spaces. |
| `title` / `kicker` | e.g. `Code Name Brenda` / `Scene demo` |
| `year` | free text — `Winter 2025`, `3 – 7 November 2025` |
| `group` | `films` or `studies` (the two list headings) |
| `featured` | `true` puts it in the big grid at the top. Keep it to 3. |
| `blurb` | one optional line under the title |
| `roles` | the tags in the index — this is what shows range |
| `video` | see below |
| `poster` | still image, only needed for self-hosted video |
| `notes` | array of paragraphs — the old "process box" text |
| `spec` | the old basic info: `['Goal', '...'], ['Created', '...']` |
| `credits`, `sources`, `links` | lists; `sources` and `links` take `{label, href}` |
| `stills` | process images under the notes: `{src, caption}` |
| `rights` | the "all visuals belong to…" line |

Anything left empty just doesn't render.

---

## Video: YouTube or self-hosted?

**Use unlisted YouTube for anything that's yours.** It's free, it streams at
whatever quality the viewer's connection can take, it works on every phone, and
it costs your site nothing. Unlisted means it doesn't show up in search or on
your channel — only people with the link (i.e. visitors to this site) see it.

```js
video: { type: 'youtube', id: 'dQw4w9WgXcQ' }
```

The ID is the part after `v=` in `youtube.com/watch?v=dQw4w9WgXcQ`. The
thumbnail is pulled automatically, and nothing loads from YouTube until someone
clicks play.

**Self-host the ones with other people's footage in them.** Blade Runner 2049,
Stranger Things, Loving Vincent, Cosmic Ontological Shock — YouTube's Content ID
may mute, block, or region-lock those, and you don't want dead frames in a
portfolio. Put the file in the repo instead:

```js
video: { type: 'file', src: 'assets/video/blade-runner-2049.mp4' },
poster: 'assets/img/blade-runner-2049.jpg'
```

Compress before committing — GitHub rejects files over 100 MB, and you want
these under ~40 MB anyway:

```bash
ffmpeg -i input.mov -vf scale=-2:1080 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 160k -movflags +faststart assets/video/name.mp4
```

Grab a poster frame from 5 seconds in:

```bash
ffmpeg -ss 5 -i assets/video/name.mp4 -frames:v 1 -q:v 3 assets/img/name.jpg
```

(`brew install ffmpeg` if you don't have it.)

Leave `video: null` and the page shows a placeholder instead of breaking.

---

## Putting it online

1. Make a GitHub repo named `antonpirro.github.io` (or any name).
2. Push this folder to it.
3. Repo → **Settings → Pages** → Source: `Deploy from a branch`, branch `main`,
   folder `/ (root)`. Give it a minute.
4. It's live at `https://<username>.github.io` (or `/<repo-name>`).

Netlify and Cloudflare Pages work the same way and are equally free — drag the
folder in or connect the repo.

## Custom domain

Buy the name anywhere reasonable — Cloudflare, Porkbun, and Namecheap are all
around $10–15/year for a `.com`. Then:

1. Add a file called `CNAME` in this folder containing exactly your domain,
   e.g. `antonpirro.com`.
2. At the registrar's DNS settings, add:
   - four `A` records for `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - one `CNAME` record for `www` → `<username>.github.io`
3. Repo → Settings → Pages → Custom domain → type the domain → check
   **Enforce HTTPS** once the certificate is issued (usually under an hour).

The Wix site keeps working until you take it down, so there's no rush — point
the domain when you're happy with this one.

---

## The treeline background

There's a canopy silhouette pinned to the top of the window, tinted with the
text colour and faded out downward, at 6% opacity in light mode and 11% in dark.
A drawn placeholder ships in `assets/img/treeline.svg`.

The one in use is traced from `assets/img/source-treeline.jpg` (IMG_3040). To
redo it, or to swap in a different photo — a dark treeline against a bright sky
works best — replace that file and run:

```bash
python3 tools/treeline.py assets/img/source-treeline.jpg -c 0,0.42 -t 0.86
```

`-c` is the vertical slice of the photo to keep (top,bottom as fractions) —
here the top 42%, which is the branches and crowns.

That writes `assets/img/treeline.png` and the site picks it up automatically.
`-t` is the cutoff: higher keeps more of the misty mid-tones, lower keeps only
the hard silhouettes.
Delete `treeline.png` to go back to the drawn version.
