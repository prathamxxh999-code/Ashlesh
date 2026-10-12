# Ashlesh Gavas Portfolio

A single page portfolio with project case studies, a scroll driven project gallery, and banner and poster design work.

## View the portfolio

Open [index.html](index.html) in a browser. The site is self contained apart from the linked resume PDF.

## Source and build

- `src/original.html` is the supplied portfolio and embedded project artwork.
- `src/build-portfolio.js` and `src/gallery-snippet.js` contain the changes used to produce the finished site.
- `src/*.svg` contains the tool icons used by the build.
- `index.html` is the finished portfolio; `Ashlesh_Gavas_Resume.pdf` is its downloadable resume.

Node.js is the only build requirement. Run `npm run build` to regenerate the site, `npm run verify` to check it, or `npm run preview` to serve it locally on port 5179.
