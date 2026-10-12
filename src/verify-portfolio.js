const fs=require('fs');
const path=require('path');
const vm=require('vm');
const assert=require('assert');
const root=path.resolve(__dirname,'..');
const output=path.join(root,'index.html');
const html=fs.readFileSync(output,'utf8');

const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
for(const [i,script] of scripts.entries()){
  if(script[1].trim())new vm.Script(script[1],{filename:`inline-${i}.js`});
}

const projectText=html.match(/const PROJECTS=(\[[\s\S]*?\]);\s*const JOBS=/);
assert(projectText,'Project data found');
const projects=vm.runInNewContext(projectText[1]);
assert.deepStrictEqual(Array.from(projects,p=>p.id),['banking-platform','urban-tobacco','web-concepts','banner-design']);
assert.strictEqual(projects[3].title,'Banner & Poster Design');
assert(!html.includes("title:'Graphic Design'"));
assert(html.includes("const CASE_TOTAL={'banking-platform':13,'urban-tobacco':3,'web-concepts':11,'banner-design':12}"));
assert(html.includes("['Poster designs',GFX.p,'case-poster-grid','posters']"));
assert(html.includes('graphicCover():scene(SH[p.id].t)'));
assert(html.includes('.tool-logo[data-brand="notion"]{background:#fff;color:#111}'));
assert(!html.includes('<div class="marq"'));
assert(!html.includes("$('#marq')"));
assert(!html.includes('lns[0]'));
assert(html.includes("01 / 04"));

const gfxText=html.match(/const GFX=(\{[\s\S]*?\});\s*Object\.entries\(GFX\)/);
assert(gfxText,'Graphic gallery data found');
const gfx=vm.runInNewContext('('+gfxText[1]+')');
assert.strictEqual(gfx.b.length,3);
assert.strictEqual(gfx.p.length,9);
assert.strictEqual(new Set(Array.from(gfx.p,p=>p[0])).size,9);

const assets=html.match(/window\.IMG=(\{.*?\});window\.META=(\{.*?\});<\/script>/s);
assert(assets,'Embedded assets found');
const img=JSON.parse(assets[1]);
const meta=JSON.parse(assets[2]);
assert.strictEqual(Object.keys(img).length,39);
for(const [key] of [...gfx.b,...gfx.p])assert(img[key]&&meta[key],`${key} gallery asset found`);
for(let i=1;i<=3;i++){
  const key=`g-cbs${i}`;
  assert(img[key]&&meta[key],`${key} asset found`);
  const value=img[key];
  const match=value.match(/^data:image\/webp;base64,([A-Za-z0-9+/=]+)$/);
  assert(match,`${key} WebP encoding`);
  assert(Buffer.from(match[1],'base64').length>0,`${key} decodes`);
}
for(const key of ['g-post8','g-post10'])assert(img[key]&&meta[key],`${key} poster found`);
console.log(JSON.stringify({projects:projects.map(p=>p.title),assets:Object.keys(img).length,banners:gfx.b.length,posters:gfx.p.length,inlineScripts:scripts.length}));
