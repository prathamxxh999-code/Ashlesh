const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const source = path.join(__dirname, 'original.html');
const output = path.join(root, 'index.html');
const publicDir = path.join(root, 'public');
let html = fs.readFileSync(source, 'utf8');
const assetScript = html.match(/<script>window\.IMG=(\{.*?\});window\.META=(\{.*?\});<\/script>/s);
if (!assetScript) throw new Error('Embedded project assets not found');
const projectImages = JSON.parse(assetScript[1]);
const projectImageMeta = JSON.parse(assetScript[2]);
for (const key of Object.keys(projectImages)) {
  if (/^g-flyer/.test(key) || key === 'g-post3') {
    delete projectImages[key];
    delete projectImageMeta[key];
  }
}
html = html.replace(assetScript[0], `<script>window.IMG=${JSON.stringify(projectImages)};window.META=${JSON.stringify(projectImageMeta)};</script>`);
const resumeTag = html.match(/<script id="resumeB64" type="text\/plain">([^<]+)<\/script>/);
if (!resumeTag) throw new Error('Embedded resume not found');
const resume = Buffer.from(resumeTag[1], 'base64');
fs.writeFileSync(path.join(root, 'Ashlesh_Gavas_Resume.pdf'), resume);
fs.mkdirSync(publicDir, {recursive:true});
fs.writeFileSync(path.join(publicDir, 'Ashlesh_Gavas_Resume.pdf'), resume);
html = html.replace(resumeTag[0], '');

function replaceOnce(before, after) {
  const first = html.indexOf(before);
  if (first < 0 || html.indexOf(before, first + before.length) >= 0) {
    throw new Error(`Expected exactly one match: ${before.slice(0, 100)}`);
  }
  html = html.slice(0, first) + after + html.slice(first + before.length);
}

const logo = (slug) => {
  const raw = fs.readFileSync(path.join(__dirname, slug + '.svg'), 'utf8');
  const pathData = raw.match(/<path d="([^"]+)"\s*\/?\s*>/);
  if (!pathData) throw new Error(`Missing SVG path: ${slug}`);
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="${pathData[1]}"/></svg>`;
};

const brandIcons = {
  Figma: `<svg viewBox="0 0 24 36" aria-hidden="true" focusable="false"><path fill="#F24E1E" d="M6 0h6v12H6A6 6 0 0 1 6 0Z"/><path fill="#FF7262" d="M12 0h6a6 6 0 0 1 0 12h-6Z"/><path fill="#A259FF" d="M6 12h6v12H6a6 6 0 0 1 0-12Z"/><circle fill="#1ABCFE" cx="18" cy="18" r="6"/><path fill="#0ACF83" d="M6 24h6v6a6 6 0 1 1-6-6Z"/></svg>`,
  FigJam: `<svg viewBox="0 0 24 36" aria-hidden="true" focusable="false"><path fill="#F24E1E" d="M6 0h6v12H6A6 6 0 0 1 6 0Z"/><path fill="#FF7262" d="M12 0h6a6 6 0 0 1 0 12h-6Z"/><path fill="#A259FF" d="M6 12h6v12H6a6 6 0 0 1 0-12Z"/><circle fill="#1ABCFE" cx="18" cy="18" r="6"/><path fill="#0ACF83" d="M6 24h6v6a6 6 0 1 1-6-6Z"/></svg>`,
  'Figma AI': `<svg viewBox="0 0 24 36" aria-hidden="true" focusable="false"><path fill="#F24E1E" d="M6 0h6v12H6A6 6 0 0 1 6 0Z"/><path fill="#FF7262" d="M12 0h6a6 6 0 0 1 0 12h-6Z"/><path fill="#A259FF" d="M6 12h6v12H6a6 6 0 0 1 0-12Z"/><circle fill="#1ABCFE" cx="18" cy="18" r="6"/><path fill="#0ACF83" d="M6 24h6v6a6 6 0 1 1-6-6Z"/></svg>`,
  Framer: logo('framer'),
  Notion: logo('notion'),
  HTML: logo('html5'),
  CSS: logo('css'),
  JavaScript: logo('javascript'),
  Bootstrap: logo('bootstrap'),
  Claude: logo('claude'),
};

replaceOnce('</style>', `
/* Premium presentation refinements */
:root{--ease-out:cubic-bezier(.16,1,.3,1)}
.hero-grid{grid-template-columns:1fr;max-width:980px;gap:0;width:100%}
.hero{padding-top:clamp(130px,13vw,180px);padding-bottom:clamp(70px,7vw,100px);isolation:isolate;overflow:hidden;text-align:center}
.hero .wrap{display:flex;flex-direction:column;align-items:center;width:100%}
.hero::before{content:"";position:absolute;z-index:-1;top:7%;left:50%;width:min(88vw,870px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(120,84,255,.25) 0%,rgba(170,107,255,.16) 35%,rgba(255,155,203,.08) 52%,transparent 70%);filter:blur(15px);transform:translate(-50%,0);animation:spotlight-drift 13s ease-in-out infinite alternate;pointer-events:none}
.hero::after{content:"";position:absolute;z-index:-1;inset:0;background:linear-gradient(112deg,transparent 42%,rgba(255,255,255,.23) 50%,transparent 58%);background-size:230% 100%;background-position:180% center;animation:spotlight-sweep 10s ease-in-out infinite;pointer-events:none}
@keyframes spotlight-drift{0%{transform:translate(-72%,-8%) scale(.83)}50%{transform:translate(-38%,10%) scale(1.08)}100%{transform:translate(-58%,-4%) scale(.95)}}
@keyframes spotlight-sweep{0%,18%{background-position:180% center}65%,100%{background-position:-90% center}}
.name{font-size:clamp(72px,12.4vw,180px);margin:25px 0 clamp(34px,5vw,72px);max-width:100%}
.name .mask{padding-top:.06em;padding-inline:.07em;margin-inline:-.07em}
.name .ln:nth-child(2){padding-left:0;text-shadow:0 12px 42px rgba(95,54,214,.12)}
.hero-statement{font-family:var(--display);font-size:clamp(30px,4.5vw,66px);font-weight:700;letter-spacing:-.045em;line-height:1.1;margin:0 auto 30px}
.hero-statement>span:first-child{display:block}
.hero-words{display:block;height:1.16em;overflow:hidden;color:var(--acc)}
.hero-words-track{display:flex;flex-direction:column;animation:hero-word-cycle 11s cubic-bezier(.7,0,.25,1) infinite}
.hero-words-track span{height:1.16em;flex:none;white-space:nowrap;text-align:center}
@keyframes hero-word-cycle{0%,27%{transform:translateY(0)}33%,60%{transform:translateY(-25%)}66%,93%{transform:translateY(-50%)}100%{transform:translateY(-75%)}}
.hero .lead{max-width:720px;margin-inline:auto}.hero .cta{justify-content:center}
.about{display:block;max-width:900px;margin-inline:auto}
#work .sh p{position:relative;z-index:1;background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:14px 18px;box-shadow:0 12px 28px -25px rgba(30,15,90,.35)}
.hero-art{height:clamp(290px,32vw,410px);position:relative;isolation:isolate;perspective:1000px;pointer-events:none}
.hero-art::before{content:"";position:absolute;inset:8% 7%;border:1px solid var(--line);border-radius:50%;transform:rotate(-21deg) rotateX(58deg)}
.hero-art::after{content:"";position:absolute;inset:19% 17%;background:radial-gradient(circle,var(--orb1),transparent 68%);filter:blur(13px);z-index:-1}
.art-tile{position:absolute;display:grid;place-items:center;border:1px solid rgba(255,255,255,.55);border-radius:28px;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset -8px -12px 22px rgba(16,7,70,.14),0 26px 44px -18px rgba(21,13,80,.5);transform-style:preserve-3d;animation:art-float 6s ease-in-out infinite;will-change:transform}
.art-tile::after{content:"";position:absolute;inset:12px -8px -11px 9px;border-radius:inherit;background:rgba(21,13,80,.18);filter:blur(2px);z-index:-1;transform:translateZ(-20px)}
.art-tile svg{width:42%;height:42%;filter:drop-shadow(0 10px 8px rgba(10,4,45,.22))}
.art-main{width:48%;aspect-ratio:1;left:28%;top:18%;background:linear-gradient(145deg,#B8A5FF 0%,#6C4BFF 56%,#3922AC 100%);color:#fff;transform:rotate(-12deg) rotateY(-18deg) rotateX(12deg)}
.art-small{width:26%;aspect-ratio:1;right:6%;top:3%;border-radius:23px;background:linear-gradient(145deg,#FFD6BD,#FF8765 55%,#D94337);color:#fff;animation-delay:-1.7s;transform:rotate(13deg) rotateY(18deg)}
.art-low{width:27%;aspect-ratio:1;left:7%;bottom:8%;border-radius:23px;background:linear-gradient(145deg,#C8F9E8,#42CFA8 55%,#0B846B);color:#fff;animation-delay:-3.1s;transform:rotate(10deg) rotateY(-18deg)}
.art-caption{position:absolute;right:0;bottom:10%;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--mute);writing-mode:vertical-rl}
@keyframes art-float{50%{translate:0 -13px}}
.thumb{isolation:isolate;background:radial-gradient(circle at 78% 18%,rgba(255,255,255,.32),transparent 36%),linear-gradient(135deg,var(--a),var(--b))}
.thumb::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px);background-size:34px 34px;mask-image:linear-gradient(90deg,transparent,black);opacity:.55}
.thumb::after{content:"";position:absolute;width:56%;aspect-ratio:1;right:-18%;bottom:-35%;border-radius:50%;background:rgba(255,255,255,.19);filter:blur(7px);z-index:-1}
.thumb .scene{z-index:1}
.thumb-kind{position:absolute;top:18px;left:18px;z-index:4;color:#fff;background:rgba(16,10,53,.32);border:1px solid rgba(255,255,255,.32);backdrop-filter:blur(10px);padding:6px 11px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;line-height:1.2}
.thumb-count{position:absolute;right:18px;bottom:16px;z-index:4;display:flex;align-items:baseline;gap:5px;color:#fff;text-shadow:0 2px 10px rgba(20,9,72,.5)}
.thumb-count b{font-family:var(--display);font-size:24px;letter-spacing:-.06em;line-height:1}
.thumb-count small{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em}
.thumb-artwork{background:radial-gradient(circle at 45% 45%,#484068 0%,#1D1730 55%,#120E20 100%)}
.thumb-artwork::before{opacity:.13}.thumb-artwork::after{background:rgba(153,111,255,.18)}
.graphic-cover{position:absolute;inset:0;pointer-events:none}
.cover-piece{position:absolute;display:block;overflow:hidden;border:5px solid #fff;border-radius:8px;background:#fff;box-shadow:0 22px 36px rgba(5,2,18,.44);transition:transform .55s var(--ease-out)}
.cover-piece img{display:block;width:100%;height:100%;object-fit:cover}
.cover-banner{left:8%;top:17%;width:65%;aspect-ratio:16/9;transform:rotate(-8deg);z-index:1}
.cover-poster-a{right:8%;top:12%;width:29%;aspect-ratio:4/5;transform:rotate(8deg);z-index:3}
.cover-poster-b{left:23%;top:39%;width:27%;aspect-ratio:4/5;transform:rotate(-5deg);z-index:2}
.card:hover .cover-banner{transform:translateY(-7px) rotate(-10deg)}
.card:hover .cover-poster-a{transform:translateY(-10px) rotate(10deg)}
.card:hover .cover-poster-b{transform:translateY(-12px) rotate(-7deg)}
.card{overflow:hidden}.card .meta{position:relative;z-index:1}
.device-window{width:100%;box-shadow:0 34px 55px -26px rgba(9,6,43,.52)}
.device-window .shot{width:100%}
.device-window .win-bar{padding:1.2% 1.6%;gap:.7%}
.device-window .win-bar i{width:1%;height:auto;aspect-ratio:1}
.device-window .win-bar u{font-size:clamp(4px,.85vw,10px);padding:0 2%;margin-left:1%}
.device-phone{position:relative;width:100%;aspect-ratio:9/19.2;background:linear-gradient(145deg,#31303D,#08090E 60%,#40414A);border-radius:14%/6.6%;padding:3.3%;box-shadow:inset 0 0 0 1px rgba(255,255,255,.25),0 32px 45px -20px rgba(10,5,40,.62)}
.device-phone::before{content:"";position:absolute;left:-1.1%;top:18%;width:1%;height:12%;border-radius:4px;background:#494951}
.device-phone::after{content:"";position:absolute;right:-1.1%;top:25%;width:1%;height:9%;border-radius:4px;background:#494951}
.device-phone .shot{height:100%;border-radius:11%/5%;overflow:hidden}
.device-phone .sx{height:100%;border:0;border-radius:0}
.device-phone .p-in{height:100%}
.device-phone .device-island{position:absolute;z-index:2;top:3.1%;left:50%;transform:translateX(-50%);width:27%;height:2.5%;background:#050509;border-radius:999px}
.scene.ph .device-phone{flex:1 1 0;min-width:0}
.gal .device-phone{width:min(50%,240px);transform:translateY(8%)}
.gal .device-window{width:100%;transform:translateY(8%)}
.p-hero .scene.ph .device-phone{flex:1 1 0}
.p-hero{background:radial-gradient(circle at 75% 12%,rgba(255,255,255,.3),transparent 40%),linear-gradient(135deg,var(--a),var(--b))}
.case-caption{display:flex;gap:10px;align-items:center;margin-top:22px;font-size:14px;color:var(--mute)}
.case-caption i{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--acc)}
.tool{padding:8px 16px 8px 8px;box-shadow:0 8px 18px -16px rgba(20,10,60,.5)}
.tool-logo{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:var(--paper);color:var(--c,var(--acc));box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 3px 10px -5px rgba(12,8,38,.4);flex:none}
.tool-logo svg{width:20px;height:20px;display:block}
.tool-logo[data-brand="figma"] svg{width:16px;height:24px}
.tool-logo[data-brand="notion"]{background:#fff;color:#111}
.tool-logo[data-brand="javascript"]{color:#F7DF1E;background:#24222C}
.tool-logo[data-brand="claude"]{color:#D97757}
.portrait{background:radial-gradient(circle at 32% 24%,rgba(255,255,255,.4),transparent 42%),linear-gradient(145deg,#8C74FF,#4228B4 70%);box-shadow:var(--shadow)}
.portrait::before{content:"";position:absolute;inset:13%;border-radius:50%;border:1px solid rgba(255,255,255,.35);box-shadow:0 0 0 22px rgba(255,255,255,.06),0 0 0 58px rgba(255,255,255,.045)}
.portrait span{font-size:clamp(100px,14vw,190px);text-shadow:0 18px 23px rgba(21,8,80,.25)}
.sc-block{box-shadow:0 20px 60px -50px rgba(43,24,139,.3)}
.sc-block:nth-child(even){background:linear-gradient(135deg,var(--glass2),var(--glass))}
.fig:hover .lap,.fig:hover .iph,.fig:hover .win{filter:drop-shadow(0 15px 15px rgba(29,17,80,.2))}
.fig:focus-visible{outline-offset:8px}
.case-gallery{margin-top:clamp(72px,10vw,136px);padding:0}
.case-gallery-head{display:grid;grid-template-columns:1.2fr .8fr;gap:24px 64px;align-items:end;margin-bottom:clamp(30px,5vw,58px)}
.case-gallery-head h2{font-size:clamp(42px,6vw,78px);letter-spacing:-.045em}
.case-gallery-head p,.case-set>p{color:var(--mute);max-width:34em}
.case-eyebrow{display:block;font-size:13px;font-weight:700;letter-spacing:.17em;text-transform:uppercase;color:var(--acc);margin-bottom:12px}
.case-total{display:inline-flex;font-family:var(--body);font-size:14px;letter-spacing:0;font-weight:700;vertical-align:top;margin-left:16px;border:1px solid var(--line);padding:8px 11px;border-radius:999px;color:var(--mute)}
.case-set{margin-top:clamp(40px,7vw,84px)}
.case-set-head{display:flex;justify-content:space-between;align-items:baseline;gap:20px;margin-bottom:10px;border-bottom:1px solid var(--line);padding-bottom:18px}
.case-set-head h3{font-size:clamp(28px,3.5vw,44px)}
.case-set-head span{color:var(--mute);font-size:14px;white-space:nowrap}
.case-set>p{margin-bottom:28px}
.case-screen-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(18px,3vw,34px);align-items:start}
.case-figure{padding:clamp(14px,2.3vw,28px);border-radius:24px;background:radial-gradient(circle at 80% 15%,var(--orb1),transparent 48%),var(--glass);border:1px solid var(--line);min-width:0}
.case-figure .fc{margin-top:18px;font-weight:600;color:var(--ink)}
.case-phones{grid-template-columns:repeat(3,minmax(0,1fr))}
.case-phones .case-figure{padding:clamp(12px,2.2vw,28px) clamp(12px,5vw,65px)}
.case-preview-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.case-preview{margin:0;overflow:hidden;border-radius:26px;border:1px solid var(--line);background:var(--glass)}
.case-preview:first-child{grid-column:1/-1}
.case-preview-art{min-height:300px;aspect-ratio:16/10;display:flex;justify-content:center;align-items:flex-end;padding:8% 9% 0;background:radial-gradient(circle at 80% 12%,rgba(255,255,255,.3),transparent 40%),linear-gradient(135deg,var(--a),var(--b));overflow:hidden}
.case-preview:first-child .case-preview-art{height:clamp(340px,45vw,520px);aspect-ratio:auto}
.case-preview-art>.lap,.case-preview-art>.win{width:min(88%,740px);transform:translateY(9%)}
.case-preview-art>.device-phone{width:min(34%,220px);min-width:132px;transform:translateY(10%)}
.case-preview:not(:first-child) .case-preview-art{height:380px;aspect-ratio:auto}
.case-preview:not(:first-child) .case-preview-art>.device-phone{width:min(42%,190px)}
.case-preview figcaption{display:flex;align-items:center;gap:13px;padding:20px 24px;font-family:var(--display);font-size:clamp(20px,2.2vw,28px);font-weight:700}
.case-preview figcaption span{font-family:var(--body);font-size:12px;font-weight:700;color:var(--acc);letter-spacing:.14em}
.scr{container-type:normal}
#grid{display:flex;gap:20px;overflow-x:auto;overflow-y:hidden;scroll-snap-type:none;scroll-behavior:auto;scrollbar-width:none;overscroll-behavior-inline:contain;padding:7px 6px 20px;margin:-7px -6px 0;align-items:stretch}
#grid::-webkit-scrollbar{display:none}
#grid>.card,#grid>.card:nth-child(n){flex:0 0 min(72vw,540px);width:min(72vw,540px);grid-column:auto}
.project-stage{position:relative}.project-sticky{position:sticky;top:100px;max-height:calc(100svh - 120px);overflow:hidden}
.project-rail-head{display:flex;align-items:center;justify-content:space-between;gap:16px}
.project-rail-head{margin:0 0 16px}.project-rail-count{font-family:var(--display);font-size:15px;font-weight:700;letter-spacing:.08em;color:var(--mute)}
.project-scroll-cue{font-size:13px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--acc)}
.project-rail-track{height:3px;background:var(--line);border-radius:99px;overflow:hidden;margin-top:20px}.project-rail-track span{display:block;height:100%;width:20%;transform-origin:left;background:linear-gradient(90deg,var(--acc),var(--acc2));border-radius:inherit;transition:width .25s var(--ease-out)}
.case-graphic-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.case-graphic{cursor:zoom-in}.case-graphic:first-child{grid-column:1/-1}.case-graphic img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:14px;background:#fff}.case-graphic .fc{font-size:14px}
.case-poster-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.case-poster-grid .case-graphic:first-child{grid-column:auto}.case-poster-grid .case-graphic img{aspect-ratio:4/5}
@media(max-width:900px){.case-poster-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:700px){.case-gallery-head{grid-template-columns:1fr}.case-screen-grid,.case-preview-grid{grid-template-columns:1fr}.case-phones{grid-template-columns:repeat(2,minmax(0,1fr))}.case-phones .case-figure{padding:10px}.case-preview:first-child{grid-column:auto}.case-preview:first-child .case-preview-art,.case-preview:not(:first-child) .case-preview-art{height:250px;min-height:0}}
@media(max-width:560px){.case-graphic-grid{grid-template-columns:1fr}.case-graphic:first-child{grid-column:auto}}
@media(max-width:560px){.case-poster-grid{grid-template-columns:1fr}}
@media(max-width:600px){#grid>.card,#grid>.card:nth-child(n){flex-basis:calc(100vw - 70px);width:calc(100vw - 70px)}.project-sticky{top:90px;max-height:calc(100svh - 105px)}}
@media(max-width:420px){.case-phones{grid-template-columns:1fr}.case-phones .case-figure{padding:20px 55px}.case-preview-art>.device-phone{width:43%}}
@media(max-width:620px){.hero{padding-top:125px;padding-bottom:75px}.name{font-size:clamp(66px,14vw,96px);margin-bottom:44px}.hero-statement{font-size:clamp(28px,7.5vw,42px)}.thumb-kind{top:12px;left:12px;font-size:10px}.card .meta{padding:18px 8px 10px}.device-window .win-bar{min-height:8px}}
@media(prefers-reduced-motion:reduce){.hero-words-track,.hero::before,.hero::after{animation:none}.fig:hover .lap,.fig:hover .iph,.fig:hover .win{filter:none}}
</style>`);
const artCssStart=html.indexOf('.hero-art{');
const artCssEnd=html.indexOf('.thumb{isolation:isolate',artCssStart);
if(artCssStart<0||artCssEnd<0)throw new Error('Hero icon styles not found');
html=html.slice(0,artCssStart)+html.slice(artCssEnd);
replaceOnce('transform:translateY(min(0px,calc(-100% + 100cqh)))','transform:translateY(var(--travel,0%))');
replaceOnce('const m=META[key],r=m[1]/m[0],scroll=r>ratio*1.12,dur=','const m=META[key],r=m[1]/m[0],scroll=r>ratio*1.12,travel=Math.max(0,(r-ratio)/r*100),dur=');
replaceOnce('--dur:${dur.toFixed(1)}s${ar?','--dur:${dur.toFixed(1)}s;--travel:-${travel.toFixed(2)}%${ar?');

replaceOnce(`<div class="hero-grid">
        <div>
          <p class="lead">`, `<div class="hero-grid">
        <div>
          <p class="hero-statement" aria-label="Making complex work feel simple"><span aria-hidden="true">Making complex</span><span class="hero-words" aria-hidden="true"><span class="hero-words-track"><span>work feel simple.</span><span>flows feel natural.</span><span>systems feel human.</span><span>work feel simple.</span></span></span></p>
          <p class="lead">`);

replaceOnce(`      <div class="portrait rv" role="img" aria-label="Placeholder portrait for Ashlesh Gavas"><span>AG</span><small>Placeholder. Swap in your portrait.</small></div>
`, ``);
replaceOnce(`<canvas id="gl" aria-hidden="true"></canvas>
`, ``);
replaceOnce(`<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
`, ``);
replaceOnce(`    <a href="#/" data-go="showcase">Showcase</a>\n`, ``);
replaceOnce(`<h2><span class="clip"><span>Selected work</span></span></h2>`, `<h2><span class="clip"><span>Projects</span></span></h2>`);
const marqueeMarkup=html.match(/^  <div class="marq" aria-hidden="true"><div id="marq"><\/div><\/div>\r?\n/m);
const marqueeInit=html.match(/^\$\('#marq'\)\.innerHTML=.*\r?\n/m);
const marqueeCss=html.match(/\/\* marquee \*\/[\s\S]*?@keyframes slide\{to\{transform:translateX\(-50%\)\}\}\r?\n/);
if(!marqueeMarkup||!marqueeInit||!marqueeCss)throw new Error('Marquee not found');
html=html.replace(marqueeMarkup[0],'').replace(marqueeInit[0],'').replace(marqueeCss[0],'');
replaceOnce(`const MARQ=['Web','Mobile','SaaS','Fintech','Design systems','Admin dashboards','Approval workflows','Prototyping','Research'];`, ``);
replaceOnce(`style="padding-block:clamp(50px,7vw,90px)"`, `style="padding-block:clamp(32px,5vw,65px)"`);
replaceOnce(`const bar=$('#progress'),tl=$('#tl'),fill=$('#tlFill'),lns=$$('.name .ln');`, `const bar=$('#progress'),tl=$('#tl'),fill=$('#tlFill');`);
const nameParallax=html.match(/^\s*if\(!RM&&y<innerHeight\*1\.2\)\{lns\[0\].*\}\r?\n/m);
if(!nameParallax)throw new Error('Name parallax not found');
html=html.replace(nameParallax[0],'\n');
replaceOnce(`Open any project to see the problem, the process and what changed. Filter by the kind of product.`, `Scroll down and the projects move sideways. Open any project to see its overview, process and screens.`);
replaceOnce(`<div class="grid" id="grid"></div>`, `<div class="project-stage" id="projectStage"><div class="project-sticky" id="projectSticky">
        <div class="project-rail-head"><span class="project-rail-count" id="projectCount" aria-live="polite">01 / 04</span><span class="project-scroll-cue">Scroll to explore ↓</span></div>
        <div class="grid" id="grid" role="region" aria-label="Projects move horizontally as you scroll down" tabindex="0"></div>
        <div class="project-rail-track" aria-hidden="true"><span id="projectProgress"></span></div>
      </div></div>`);
const showcaseStart=html.indexOf('  <section id="showcase" class="sc">');
const showcaseEnd=html.indexOf('  <section id="capabilities"',showcaseStart);
if(showcaseStart<0||showcaseEnd<0)throw new Error('Showcase section boundaries not found');
html=html.slice(0,showcaseStart)+html.slice(showcaseEnd);
replaceOnce(`  <section id="credentials" style="padding-top:0">
    <div class="wrap">
      <div class="sh" data-io>
        <h2><span class="clip"><span>Credentials</span></span></h2>
        <p>Add real certifications and recognition here. The cards below are placeholders.</p>
      </div>
      <div class="creds">
        <div class="rv"><h3>Certifications</h3><div class="credit"><b>UX design certification</b><span>Provider name · Year</span></div><div class="credit"><b>UI design course</b><span>Platform name · Year</span></div><div class="credit"><b>Design systems workshop</b><span>Provider name · Year</span></div></div>
        <div class="rv" style="--d:100ms"><h3>Recognition</h3><div class="credit"><b>Award or recognition title</b><span>Organisation name · Year</span></div><div class="credit"><b>Another recognition</b><span>Organisation name · Year</span></div></div>
      </div>
    </div>
  </section>

`, ``);

replaceOnce(`dur:'Add dates',tools:['Figma','Design system']`, `dur:'2025',tools:['Figma','Design system']`);
replaceOnce(`dur:'Add dates',tools:['Figma']`, `dur:'2025',tools:['Figma']`);
replaceOnce(`  outs:[['Concept','self-initiated']]}
];
const JOBS=[`, `  outs:[['Concept','self-initiated']]},
 {id:'web-concepts',title:'Web Concepts',cats:['Web','Concept'],type:'web',year:'2025',a:'#7B4EE8',b:'#F0A36B',
  org:'Self-initiated',role:'UI/UX Designer',dur:'Concept collection',tools:['Figma'],
  blurb:'Landing page studies across commerce, travel, fintech and gaming.',
  problem:'Different audiences and products call for different visual hierarchies, while each page still needs a clear path through its content.',
  steps:[['Explore directions','Studied visual approaches for a range of product categories.'],['Structure the page','Used hierarchy, typography and imagery to guide attention.'],['Refine the concepts','Developed individual page concepts with a consistent level of finish.']],
  outs:[['11','web concepts in the collection'],['4+','product categories explored']]},
 {id:'banner-design',title:'Banner & Poster Design',cats:['Visual'],type:'web',year:'2025',a:'#582EC4',b:'#B96AE8',
  org:'Design collection',role:'Visual Designer',dur:'Collection',tools:['Figma'],
  blurb:'Campaign banners and posters for banking, travel, automotive and product stories.',
  problem:'Each message needed to read quickly across wide banners and portrait posters while keeping the composition clear and memorable.',
  steps:[['Set the message','Made the core idea easy to understand at a glance.'],['Build the composition','Balanced type, imagery and colour for each format.'],['Adapt the format','Developed wide banners and portrait posters for different audiences and placements.']],
  outs:[['3','campaign banners'],['9','poster designs']]}
];
const JOBS=[`);
const removedProjectIds=['admin-panel','service-booking','learning-hub','phonepe','fixspire','note-me'];
const projectsStart=html.indexOf('const PROJECTS=[');
const jobsStart=html.indexOf('];\nconst JOBS=[',projectsStart);
if(projectsStart<0||jobsStart<0)throw new Error('Project data boundaries not found');
let projectData=html.slice(projectsStart,jobsStart);
for(const id of removedProjectIds){
  const match=new RegExp(`\\n \\{id:'${id}'[\\s\\S]*?(?=\\n \\{id:|$)`);
  if(!match.test(projectData))throw new Error(`Project not found: ${id}`);
  projectData=projectData.replace(match,'');
}
html=html.slice(0,projectsStart)+projectData+html.slice(jobsStart);
replaceOnce(`{id:'gfx',title:'Graphic design',tint:'rgba(122,63,228,.2)',chips:['Brochures','Social posts','Banners'],lay:'gfx',
  desc:'Marketing creatives and collateral: product banners, social media posts and brochures.'}`, `{id:'gfx',title:'Banner & Poster Design',tint:'rgba(122,63,228,.2)',chips:['Campaign','Banners','Posters'],lay:'gfx',
  desc:'Campaign banners and portrait posters across banking, travel, automotive and product themes.'}`);
replaceOnce(`const GFX={
 b:[['g-cbs1','Core banking banner 1'],['g-cbs2','Core banking banner 2'],['g-cbs3','Core banking banner 3']],
 p:[['g-post1','Business finance post'],['g-post2','Growth campaign post'],['g-post3','Growth campaign post'],['g-post4','Vendor loans post'],['g-post7','Corporate banking post'],['g-kerala','Travel poster'],['g-post10','Heritage poster'],['g-post5','Automotive poster'],['g-post6','Motivational poster'],['g-post8','Product poster']],
 f:[['g-flyer1','Products brochure'],['g-flyer2','Contact brochure'],['g-flyer3','Next-generation banking'],['g-flyer4','Brochure variation 1'],['g-flyer5','Brochure variation 2']]
};`, `const GFX={
 b:[['g-cbs1','Core banking banner 1'],['g-cbs2','Core banking banner 2'],['g-cbs3','Core banking banner 3']],
 p:[['g-post1','Business finance poster'],['g-post2','Growth campaign poster'],['g-post4','Vendor loans poster'],['g-post7','Corporate banking poster'],['g-kerala','Kerala travel poster'],['g-post10','Maharashtra travel poster'],['g-post5','Automotive poster'],['g-post6','Motivational poster'],['g-post8','Product poster']]
};`);
replaceOnce(`body=sec('Campaign banners','3 designs','pgrid b3',GFX.b,pst)+sec('Social media posts','10 designs','pgrid p5',GFX.p,pst)+sec('Brochures and flyers','5 designs','cols5',GFX.f,pst);`, `body=sec('Campaign banners','3 banners','pgrid b3',GFX.b,pst)+sec('Poster designs','9 posters','pgrid p5',GFX.p,pst);`);
replaceOnce(`const count=b.lay==='gfx'?'18 designs':`, `const count=b.lay==='gfx'?'12 designs':`);
replaceOnce(`const KIT=[`, `const BRAND_ICONS=${JSON.stringify(brandIcons)};
const KIT=[`);
replaceOnce(`const shot=k=>k.startsWith('img:')?realShot(k):SHOT[k]();`, `const shot=k=>{
  if(k.startsWith('img:'))return realShot(k);
  const ui=SHOT[k]();
  if(k.startsWith('phone:'))return \`<div class="device-phone"><i class="device-island"></i>\${ui}</div>\`;
  if(k.startsWith('web:'))return \`<div class="win device-window"><div class="win-bar"><i></i><i></i><i></i><u>Design preview</u></div>\${ui}</div>\`;
  return \`<div class="lap device-laptop"><div class="lap-lid">\${ui}</div><div class="lap-base"></div></div>\`;
};`);
replaceOnce(`const lio=new IntersectionObserver`, `SH['web-concepts']={t:['img:lap:w-nike','img:lap:w-dive'],g:['img:lap:w-fashion','img:lap:w-bank']};
SH['banner-design']={t:['img:win:g-cbs1','img:win:g-cbs2'],g:['img:win:g-cbs2','img:win:g-cbs3']};
const CASE_TOTAL={'banking-platform':13,'urban-tobacco':3,'web-concepts':11,'banner-design':12};
const lio=new IntersectionObserver`);
replaceOnce(`return winF(key,key.startsWith('u-')?'urbantobaccomachinery.com':'idsspl.com');`, `return winF(key,key.startsWith('u-')?'urbantobaccomachinery.com':key.startsWith('g-')?'Design collection':key.startsWith('w-')?'Web concept':'idsspl.com');`);
replaceOnce(`function scene(keys){`, `function graphicCover(){return \`<div class="graphic-cover" aria-hidden="true"><span class="cover-piece cover-banner"><img data-src="g-cbs1" alt=""></span><span class="cover-piece cover-poster-a"><img data-src="g-post8" alt=""></span><span class="cover-piece cover-poster-b"><img data-src="g-post10" alt=""></span></div>\`}
function scene(keys){`);
replaceOnce(`/* ---------- router ---------- */`, fs.readFileSync(path.join(__dirname,'gallery-snippet.js'),'utf8') + `\n/* ---------- router ---------- */`);
replaceOnce(`<div class="tilt"><div class="thumb">\${scene(SH[p.id].t)}<span class="go"`, `<div class="tilt"><div class="thumb\${p.id==='banner-design'?' thumb-artwork':''}"><span class="thumb-kind">\${p.id==='banner-design'?'Banners & posters':CASE_TOTAL[p.id]?'Project screens':'Design preview'}</span>\${p.id==='banner-design'?graphicCover():scene(SH[p.id].t)}<span class="thumb-count"><b>\${String(CASE_TOTAL[p.id]||3).padStart(2,'0')}</b><small>\${p.id==='banner-design'?'designs':CASE_TOTAL[p.id]?'screens':'previews'}</small></span><span class="go"`);
replaceOnce(`$('#filters').addEventListener('click',e=>{
  const b=e.target.closest('.f');if(!b)return;
  $$('.f').forEach(x=>x.setAttribute('aria-pressed',x===b));
  $$('.card').forEach(c=>c.classList.toggle('gone',b.dataset.c!=='All'&&!c.dataset.cats.split(',').includes(b.dataset.c)));
});`, `const projectRail=$('#grid');
const projectStage=$('#projectStage'),projectSticky=$('#projectSticky');
let activeProjectFilter='All',projectListReady=false,targetProjectX=0,projectFrame=0;
const projectClamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function updateRailStatus(){
  const cards=$$('#grid a.card:not(.gone)');
  const step=cards.length>1?cards[1].offsetLeft-cards[0].offsetLeft:(cards[0]?.offsetWidth||1);
  const idx=Math.min(cards.length-1,Math.max(0,Math.round(projectRail.scrollLeft/Math.max(step,1))));
  $('#projectCount').textContent=String(idx+1).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0');
  const maxX=Math.max(1,projectRail.scrollWidth-projectRail.clientWidth);
  $('#projectProgress').style.width=(projectRail.scrollWidth<=projectRail.clientWidth?100:Math.max(10,projectRail.scrollLeft/maxX*100))+'%';
}
function animateProjectRail(){
  const delta=targetProjectX-projectRail.scrollLeft;
  if(Math.abs(delta)<1){projectRail.scrollLeft=targetProjectX;projectFrame=0;updateRailStatus();return;}
  projectRail.scrollLeft+=delta*(RM?1:.18);
  projectFrame=requestAnimationFrame(animateProjectRail);
}
function updateProjectScroll(){
  const maxX=Math.max(0,projectRail.scrollWidth-projectRail.clientWidth);
  const stickyTop=parseFloat(getComputedStyle(projectSticky).top)||0;
  const stageTop=projectStage.getBoundingClientRect().top+scrollY;
  const travel=Math.max(1,projectStage.offsetHeight-projectSticky.offsetHeight);
  const p=maxX?projectClamp((scrollY-(stageTop-stickyTop))/travel,0,1):0;
  targetProjectX=p*maxX;
  if(!projectFrame)projectFrame=requestAnimationFrame(animateProjectRail);
}
function measureProjectStage(){
  const maxX=Math.max(0,projectRail.scrollWidth-projectRail.clientWidth);
  const travel=maxX?Math.min(innerHeight*4,Math.max(innerHeight*2,maxX*.75)):0;
  projectStage.style.height=(projectSticky.offsetHeight+travel)+'px';
  updateProjectScroll();
}
function updateProjectList(){
  const ids=new Set(PROJECTS.filter(p=>activeProjectFilter==='All'||p.cats.includes(activeProjectFilter)).map(p=>p.id));
  $$('#grid .card[data-cats]').forEach(c=>c.classList.toggle('gone',!ids.has(c.getAttribute('href').split('/').pop())));
  projectRail.scrollLeft=0;
  targetProjectX=0;
  updateRailStatus();
  requestAnimationFrame(measureProjectStage);
  if(projectListReady){observe();lazy();}
}
$('#filters').addEventListener('click',e=>{
  const b=e.target.closest('.f');if(!b)return;
  $$('#filters .f').forEach(x=>x.setAttribute('aria-pressed',x===b));
  activeProjectFilter=b.dataset.c;updateProjectList();
});
projectRail.addEventListener('scroll',updateRailStatus,{passive:true});
addEventListener('scroll',updateProjectScroll,{passive:true});
addEventListener('resize',measureProjectStage);
addEventListener('load',measureProjectStage);
updateProjectList();projectListReady=true;`);
replaceOnce(`<div class="cs"><h2>The problem</h2>`, `<div class="cs"><h2>Overview</h2>`);
replaceOnce(`['work','showcase','capabilities','journey','toolkit','process','about','contact']`, `['work','capabilities','journey','toolkit','process','about','contact']`);
replaceOnce(`$('#scBlocks').innerHTML=SC.map(blockHTML).join('');
$('#scNav').innerHTML=SC.map(b=>\`<button class="f" type="button" data-sc="\${b.id}">\${b.title}</button>\`).join('');
$('#scNav').addEventListener('click',e=>{const b=e.target.closest('[data-sc]');if(b)document.getElementById('sc-'+b.dataset.sc).scrollIntoView({behavior:RM?'auto':'smooth',block:'start'})});`, `SC.forEach(blockHTML);`);
replaceOnce(`$('#scBlocks').addEventListener('click',e=>{const f=e.target.closest('.fig');if(f)lbOpen(f.dataset.g,+f.dataset.i,f)});
$('#scBlocks').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('fig')){e.preventDefault();lbOpen(e.target.dataset.g,+e.target.dataset.i,e.target)}});`, ``);
replaceOnce(`const t=$('.tilt',c),r=c.getBoundingClientRect()`, `const t=$('.tilt',c);if(!t)return;const r=c.getBoundingClientRect()`);
replaceOnce(`const t=$('.tilt',c);t.style.setProperty('--rx','0deg');`, `const t=$('.tilt',c);if(!t)return;t.style.setProperty('--rx','0deg');`);
replaceOnce(`<span class="tool"><i style="--c:\${t[2]}">\${t[1]}</i>\${t[0]}</span>`, `<span class="tool"><span class="tool-logo" data-brand="\${t[0].toLowerCase().replace(/[^a-z]/g,'')}" style="--c:\${t[2]}">\${BRAND_ICONS[t[0]]}</span>\${t[0]}</span>`);
replaceOnce(`<p class="note">Screens shown are illustrative placeholders. Real UI and case-study detail can be dropped in per project.</p>`, `<p class="case-caption"><i aria-hidden="true"></i>\${CASE_REAL[p.id]?'Selected project images are shown in curated layouts.':'The device previews illustrate this project’s described experience.'}</p>`);
replaceOnce(`<div class="gal"><div>\${shot(SH[p.id].g[0])}</div><div>\${shot(SH[p.id].g[1])}</div></div>`, `\${renderCaseGallery(p)}`);
replaceOnce(`<button class="btn btn-pri sm" type="button" data-resume>Resume</button>`, `<a class="btn btn-pri sm" data-resume download="Ashlesh_Gavas_Resume.pdf">Resume</a>`);
replaceOnce(`<button class="btn btn-pri" type="button" data-resume>Download my resume</button>`, `<a class="btn btn-pri" data-resume download="Ashlesh_Gavas_Resume.pdf">Download my resume</a>`);

const resumeStart=html.indexOf(`$$('[data-resume]').forEach`);
const resumeEnd=html.indexOf(`addEventListener('keydown'`,resumeStart);
if(resumeStart<0||resumeEnd<0)throw new Error('Resume script block not found');
html=html.slice(0,resumeStart)+`$$('[data-resume]').forEach(a=>a.href='Ashlesh_Gavas_Resume.pdf');
`+html.slice(resumeEnd);

// A shorter first impression keeps the motion without delaying access to the work.
replaceOnce(`introT=setTimeout(endIntro,2900);`, `introT=setTimeout(endIntro,1550);`);
replaceOnce(`animation:bar 2.3s .1s`, `animation:bar 1.2s .1s`);

fs.mkdirSync(path.dirname(output), {recursive:true});
fs.writeFileSync(output, html);
fs.writeFileSync(path.join(publicDir, 'index.html'), html);
console.log(output);
