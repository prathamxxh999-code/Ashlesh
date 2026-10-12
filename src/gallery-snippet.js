/* Expanded case-study screen sets. These are coded visual previews for projects
   without source screenshots; actual project images remain labelled as such. */
Object.assign(SHOT, {
  'desk:approvals': () => desk('admin.suite/approvals',
    nav(['Users','Roles','Approvals','Audit log','Settings'],2,'Admin') +
    `<div class="s-main">${tp('Approval queue','<div class="s-search">Search requests</div>')}
      <div class="s-kpis">${kpi('Awaiting review','23','8 need action',1)}${kpi('Approved today','14','+4 vs yesterday')}${kpi('Escalated','2','Needs attention',1)}</div>
      <div class="panel"><h6>Requests needing a decision</h6>${tbl('1.3fr 1.2fr 1.2fr 1fr',['Request','Submitted by','Date','Priority'],[
        [b1('Raise transfer limit'),c1('Rohan Mehta'),c1('Today, 10:12'),ch('High','o')],
        [b1('New branch access'),c1('Kavita Rao'),c1('Today, 09:45'),ch('Normal','y')],
        [b1('Update approver role'),c1('Priya Nair'),c1('Yesterday'),ch('High','o')],
        [b1('Export audit report'),c1('Arun Shah'),c1('Yesterday'),ch('Normal','y')]
      ])}</div></div>`),
  'phone:booking2': () => phone(`<p class="p-s">← Your booking</p><p class="p-h">All set, Aarya!</p>
    <div class="p-card"><small>Booking confirmed</small><b style="font-size:6.5cqw">AC servicing</b><span>Tue, 15 July · 11:30 am</span></div>
    <div class="p-svc"><span>Service address<small>Lake View Road, Pune</small></span><b>›</b></div>
    <div class="p-svc"><span>Payment<small>Pay after service</small></span><b>₹499</b></div>
    <p class="p-s">You can reschedule up to 2 hours before the visit.</p><div class="p-btn">View booking</div>`),
  'phone:lesson': () => phone(`<p class="p-s">← Spoken English 1</p><p class="p-h">Everyday conversations</p>
    <div class="p-card"><small>Lesson 09 · 8 min</small><b style="font-size:7cqw">Speak with confidence</b><span>Practice with guided prompts</span></div>
    <div class="p-svc"><span>1. Listen and learn<small>Short dialogue</small></span><b>✓</b></div>
    <div class="p-svc on"><span>2. Practice speaking<small>Interactive exercise</small></span><b>→</b></div>
    <div class="p-svc"><span>3. Review phrases<small>Quick recap</small></span><b>→</b></div>
    <div class="p-btn">Continue lesson</div>`),
  'phone:pay3': () => phone(`<p class="p-s">← Bill payment</p><p class="p-h">Review payment</p>
    <div class="p-card"><small>Electricity bill</small><b>₹1,840</b><span>Due in 6 days · Account •••• 6428</span></div>
    <div class="p-svc"><span>Bill amount<small>Electricity board</small></span><b>₹1,840</b></div>
    <div class="p-svc"><span>Paying from<small>UPI account •••• 4821</small></span><b>›</b></div>
    <div class="p-svc"><span>Convenience fee<small>No additional fee</small></span><b>₹0</b></div>
    <div class="p-btn">Pay ₹1,840</div>`),
  'phone:fixspire2': () => phone(`<p class="p-s">← Work orders</p><p class="p-h">Replace AHU filter</p>
    <div class="p-chips"><span class="on">Urgent</span><span>Open</span></div>
    <div class="p-card"><small>Work order #FS-1082</small><b style="font-size:6.5cqw">Block B · Level 3</b><span>Assigned to Arjun K.</span></div>
    <div class="p-svc"><span>Reported issue<small>Airflow below threshold</small></span><b>›</b></div>
    <div class="p-svc"><span>Required by<small>Today, 5:00 pm</small></span><b>›</b></div>
    <div class="p-svc"><span>Attachments<small>2 reference photos</small></span><b>›</b></div>
    <div class="p-btn">Start work</div>`),
  'phone:notes3': () => phone(`<p class="p-s">← All notes</p><p class="p-h">New note</p>
    <div class="p-svc on"><span>Title<small>What’s on your mind?</small></span></div>
    <div class="p-ln" style="width:92%"></div><div class="p-ln" style="width:78%"></div><div class="p-ln" style="width:87%"></div>
    <div class="p-ln" style="width:57%"></div>
    <div class="p-chips"><span class="on">Personal</span><span>Ideas</span><span>Work</span></div>
    <div class="p-fab">✓</div><div class="p-tab"><i></i><i></i><i></i><i></i></div>`)
});

const CASE_REAL = {
  'banking-platform': ['cbs','net','corp','mobile'],
  'urban-tobacco': ['urban'],
  'web-concepts': ['web'],
  'banner-design': ['gfx']
};
const CASE_PREVIEWS = {
  'admin-panel': [['desk:admin','Roles and permissions'],['desk:approvals','Approval queue'],['desk:audit','Audit activity']],
  'service-booking': [['desk:booking','Provider dashboard'],['phone:booking','Choose a service'],['phone:booking2','Booking confirmation']],
  'learning-hub': [['web:learn','Learning hub'],['phone:learn','My courses'],['phone:lesson','Lesson detail']],
  'phonepe': [['phone:pay','Bill payment'],['phone:history','Transaction history'],['phone:pay3','Payment review']],
  'fixspire': [['desk:fixspire','Work orders dashboard'],['phone:fixspire','My tickets'],['phone:fixspire2','Work order detail']],
  'note-me': [['phone:notes','All notes'],['phone:notes2','Checklist'],['phone:notes3','New note']]
};

function renderCaseGallery(p){
  const realGroups=CASE_REAL[p.id];
  const galleryTitle=p.id==='banner-design'?'Banners &amp; posters':p.id==='web-concepts'?'Concept gallery':'Screens &amp; flows';
  const galleryDescription=p.id==='banner-design'?'Three campaign banners and nine distinct posters. Open any design to inspect it full size.':p.id==='web-concepts'?'Self-initiated web studies. Open any page to inspect it full size.':realGroups?'Selected project screens. Open any image to inspect it full size.':'Illustrative screens presenting the key flows in this project.';
  let sets='',total=0;
  if(realGroups){
    sets=realGroups.map(id=>{
      const group=SC.find(x=>x.id===id);
      if(id==='gfx'){
        const collections=[['Campaign banners',GFX.b,'','banners'],['Poster designs',GFX.p,'case-poster-grid','posters']];
        let index=0;
        total=collections.reduce((sum,[,items])=>sum+items.length,0);
        return collections.map(([title,items,layout,unit])=>`<div class="case-set"><div class="case-set-head"><h3>${title}</h3><span>${items.length} ${unit}</span></div>
          <div class="case-screen-grid case-graphic-grid ${layout}">${items.map(([k,cap])=>`<figure class="fig case-figure case-graphic" data-g="gfx" data-i="${index++}" tabindex="0" role="button" aria-label="View ${cap} full size"><img data-src="${k}" alt="${cap}" decoding="async"><figcaption class="fc">${cap}</figcaption></figure>`).join('')}</div></div>`).join('');
      }
      total+=group.items.length;
      const mobile=id==='mobile';
      return `<div class="case-set"><div class="case-set-head"><h3>${group.title}</h3><span>${group.items.length} screens</span></div>
        <p>${group.desc}</p><div class="case-screen-grid ${mobile?'case-phones':''}">${group.items.map((item,i)=>{
          const [kind,k,cap,url,ar]=item;
          const frame=kind==='lap'?lapF(k):kind==='iph'?iphF(k):winF(k,url,ar,ar?1/ar:.625);
          return fig(frame,id,i,cap,'case-figure');
        }).join('')}</div></div>`;
    }).join('');
  }else{
    const items=CASE_PREVIEWS[p.id]||[];
    total=items.length;
    sets=`<div class="case-screen-grid case-preview-grid">${items.map(([k,cap],i)=>
      `<figure class="case-preview"><div class="case-preview-art" style="--a:${p.a};--b:${p.b}">${shot(k)}</div><figcaption><span>0${i+1}</span>${cap}</figcaption></figure>`
    ).join('')}</div>`;
  }
  return `<section class="case-gallery" aria-labelledby="case-gallery-title">
    <div class="case-gallery-head"><div><span class="case-eyebrow">Explore the work</span><h2 id="case-gallery-title">${galleryTitle}<span class="case-total">${String(total).padStart(2,'0')}</span></h2></div>
    <p>${galleryDescription}</p></div>
    ${sets}</section>`;
}

$('#project').addEventListener('click',e=>{
  const figure=e.target.closest('.fig[data-g]');
  if(figure)lbOpen(figure.dataset.g,+figure.dataset.i,figure);
});
$('#project').addEventListener('keydown',e=>{
  if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('fig')){
    e.preventDefault();lbOpen(e.target.dataset.g,+e.target.dataset.i,e.target);
  }
});
