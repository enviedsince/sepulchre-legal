/* Sepulchre public website — no bot token, no credential collection, no checkout. */
(() => {
  'use strict';
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = $('.site-header');
  const toggle = $('.nav-toggle');
  const shell = $('.nav-shell');
  const menu = $('.nav-links');
  const setMenu = open => {
    if(!shell || !toggle) return;
    shell.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '✕' : '☰';
  };
  toggle?.addEventListener('click', () => setMenu(!shell.classList.contains('open')));
  menu?.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false) });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') setMenu(false) });
  document.addEventListener('click', e => { if(shell && !shell.contains(e.target)) setMenu(false) });
  window.addEventListener('resize', () => { if(window.innerWidth>800) setMenu(false) },{passive:true});
  const backTop = $('.backtop');
  const updateScroll = () => {
    header?.classList.toggle('is-stuck', window.scrollY>55);
    backTop?.classList.toggle('show',window.scrollY>500);
  };
  window.addEventListener('scroll', updateScroll, {passive:true});updateScroll();
  if ('IntersectionObserver' in window && !prefersReduced) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      for(const item of entries) if (item.isIntersecting) {item.target.classList.add('visible');observer.unobserve(item.target)}
    },{rootMargin:'0px 0px -40px 0px',threshold:.06});
    $$('.reveal').forEach(el=>observer.observe(el));
  } else $$('.reveal').forEach(el=>el.classList.add('visible'));

  const toastEl = $('#toast');let toastTimer;
  const toast = message => {if(!toastEl)return;toastEl.textContent=message;toastEl.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove('show'),2300)};

  // Lightweight original ambient particle field. Never used as fake metrics or live data.
  const canvas = $('#field-canvas');
  if(canvas && !prefersReduced){
    const ctx = canvas.getContext('2d');const hero=$('.hero');
    let width=0,height=0,stars=[],mouseX=-1000,mouseY=-1000,frameId=0,last=0;
    function resize(){const r=hero.getBoundingClientRect();const scale=Math.min(2,devicePixelRatio||1);width=r.width;height=r.height;canvas.width=Math.round(width*scale);canvas.height=Math.round(height*scale);canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(scale,0,0,scale,0,0);const n=Math.min(120,Math.floor(width*height/11800));stars=Array.from({length:n},(_,i)=>({x:Math.random()*width,y:Math.random()*height,v:.13+Math.random()*.4,rad:.5+Math.random()*1.15,red:i%7===0,tw:Math.random()*7}));}
    resize();window.addEventListener('resize',resize,{passive:true});
    hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();mouseX=e.clientX-r.left;mouseY=e.clientY-r.top},{passive:true});
    hero.addEventListener('pointerleave',()=>{mouseX=-1000;mouseY=-1000},{passive:true});
    function draw(t){frameId=requestAnimationFrame(draw);if(t-last<28 || document.hidden) return;last=t;ctx.clearRect(0,0,width,height);
      for(const s of stars){s.y-=s.v;if(s.y<-8){s.y=height+8;s.x=Math.random()*width}const d=Math.hypot(s.x-mouseX,s.y-mouseY);const near=Math.max(0,1-d/130);const alpha=(.13+.18*Math.sin(t*.0012+s.tw)+near*.3);ctx.beginPath();ctx.arc(s.x,s.y,s.rad+near*1.3,0,2*Math.PI);ctx.fillStyle=s.red?`rgba(255,68,99,${Math.max(.06,alpha)})`:`rgba(222,204,218,${Math.max(.04,alpha)})`;ctx.fill()}
    }frameId=requestAnimationFrame(draw);
    document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frameId)}else{last=0;frameId=requestAnimationFrame(draw)}});
  }

  // Search the existing *published* source catalog. Never substitute invented commands.
  const grid=$('#cmd-grid');
  if(grid){
    const field=$('#cmd-search'),category=$('#cmd-category'),access=$('#cmd-access'),legacy=$('#cmd-legacy'),count=$('#cmd-count'),pager=$('#cmd-pager');
    let items=[],page=1;const perPage=18;
    const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
    const copy=async value=>{try{await navigator.clipboard.writeText(value);toast('Command copied')}catch(e){toast('Clipboard unavailable — select and copy the command')}};
    const render=()=>{
      const term=field.value.toLowerCase().trim();const cat=category.value;const acc=access.value;
      const found=items.filter(x=>(legacy.checked||!String(x.catalog_status||'').toLowerCase().includes('legacy'))&&(!cat||x.category===cat)&&(!acc||x.access_hint===acc)&&(!term||[x.command,x.description,x.category,x.access_hint].some(v=>String(v||'').toLowerCase().includes(term))));
      const pages=Math.max(1,Math.ceil(found.length/perPage));page=Math.min(page,pages);grid.replaceChildren();
      count.textContent=`${found.length} matching source declarations · ${items.length} in official catalog`;
      if(!found.length){grid.append(make('div','empty-state','No matching commands. Try a different category or search.'))}
      else{let frag=document.createDocumentFragment();for(const cmd of found.slice((page-1)*perPage,page*perPage)){
        const card=make('article','command-card');const head=make('div','command-top');head.append(make('span','cmd-cat',cmd.category||'GENERAL'));const b=make('button','cmd-copy','COPY ⧉');b.type='button';b.setAttribute('aria-label',`Copy ${cmd.command}`);b.addEventListener('click',()=>copy(cmd.command));head.append(b);card.append(head,make('h3','',cmd.command||'Unnamed command'),make('p','',cmd.description||'No description in the source catalog'),make('small','',String(cmd.access_hint||'Access unverified').replace(' check indicated','')));frag.append(card)}grid.append(frag)}
      pager.replaceChildren();if(pages>1){const prev=make('button','','← Previous'),label=make('span','',`Page ${page} / ${pages}`),next=make('button','','Next →');prev.disabled=page<=1;next.disabled=page>=pages;prev.onclick=()=>{page--;render();field.scrollIntoView({block:'nearest'})};next.onclick=()=>{page++;render();field.scrollIntoView({block:'nearest'})};pager.append(prev,label,next)}
    };
    const load = async()=>{
      let error;
      for(const path of ['commands-data.json','https://raw.githubusercontent.com/Sepulchrebot/sepulchrebot.github.io/main/commands-data.json']){
        try{const response=await fetch(path,{cache:'no-cache'});if(!response.ok)throw Error('HTTP '+response.status);const data=await response.json();if(!Array.isArray(data.commands)||!data.commands.length)throw Error('No command list');items=data.commands;break}catch(e){error=e}}
      if(!items.length){grid.innerHTML='<div class="empty-state">The official command catalog could not be fetched here. <a href="https://sepulchrebot.github.io/commands/" target="_blank" rel="noopener noreferrer">Open Sepulchre’s official command browser ↗</a></div>';count.textContent='Live source catalog not reachable in this browser.';return}
      const unique=(key)=>[...new Set(items.map(x=>x[key]).filter(Boolean))].sort();
      for(const item of unique('category')){const o=document.createElement('option');o.value=item;o.textContent=item;category.append(o)}
      for(const item of unique('access_hint')){const o=document.createElement('option');o.value=item;o.textContent=item.replace(' check indicated','');access.append(o)}
      const qs=new URLSearchParams(location.search);if(qs.has('q'))field.value=qs.get('q').slice(0,150);render();
    };
    load();[field,category,access,legacy].forEach(el=>el.addEventListener(el===field?'input':'change',()=>{page=1;render()}));
    window.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();field.focus()}});
  }

  // FAQ search
  const faqSearch=$('#faq-search');if(faqSearch){faqSearch.addEventListener('input',()=>{
    let any=false;const term=faqSearch.value.trim().toLowerCase();$$('[data-faq-group]').forEach(group=>{let visible=0;$$('[data-faq-item]',group).forEach(item=>{const match=item.textContent.toLowerCase().includes(term);item.hidden=!match;if(match)visible++});group.hidden=visible===0;any ||= visible>0});const empty=$('#faq-empty');if(empty)empty.hidden=any;
  })}

  // Public embed composer: local-only JSON preview and export.
  const editor=$('#embed-title');if(editor){
    const ids=['author','title','desc','footer','color'];const el=Object.fromEntries(ids.map(id=>[id,$('#embed-'+id)]));
    const sample={author:'Sepulchre',title:'Welcome to the community',desc:'Everything you need to know starts here. Explore the rules, find support, and enjoy your stay.',footer:'SEPULCHRE • COMMUNITY',color:'#ef274a'};
    const refresh=()=>{$('#preview-author').textContent=el.author.value;$('#preview-title').textContent=el.title.value;$('#preview-desc').textContent=el.desc.value;$('#preview-footer').textContent=el.footer.value;$('#embed-preview').style.borderLeftColor=el.color.value};
    const payload=()=>{const x={color:parseInt(el.color.value.slice(1),16)};if(el.author.value.trim())x.author={name:el.author.value.trim()};if(el.title.value.trim())x.title=el.title.value.trim();if(el.desc.value.trim())x.description=el.desc.value.trim();if(el.footer.value.trim())x.footer={text:el.footer.value.trim()};return {embeds:[x]}};
    const reset=()=>{for(const k of ids)el[k].value=sample[k];refresh()};reset();
    ids.forEach(k=>el[k].addEventListener('input',refresh));
    $('#embed-reset').addEventListener('click',()=>{reset();toast('Draft reset')});
    $('#embed-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(JSON.stringify(payload(),null,2));toast('Embed JSON copied')}catch(e){toast('Clipboard unavailable; use Download JSON')}});
    $('#embed-download').addEventListener('click',()=>{const blob=new Blob([JSON.stringify(payload(),null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='sepulchre-embed-draft.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('Draft JSON downloaded')});
  }
})();
