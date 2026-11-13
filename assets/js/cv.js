/* Local, dependency-free CV choreography. The source document remains unchanged.
   Three role-labelled demonstration cursors create frames, type and place artwork.
   Reduced motion, pause, skip, reading view and the original PDF are first-class. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const NS = 'http://www.w3.org/2000/svg';
  const W = 841.89, H = 595.275;
  const pageNames = ['Profile & approach', 'Selected work', 'Experience & capabilities'];
  const owners = [
    {name: 'Layout', colour: '#0b71e8'},
    {name: 'Type', colour: '#8649d8'},
    {name: 'Visuals', colour: '#bc4b2b'},
  ];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const state = {pages: [], page: -1, running: false, time: 0, last: 0, raf: 0, ready: false, zoom: 1, reading: false, timeline: [], total: 1, autoPaused: false, panUnits: 0};
  let layers = [], cursors = [], boxes = [], rows = [], fitScale = 1;

  const clamp = (x, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, x));
  const ease = (t) => 1 - Math.pow(1 - clamp(t), 3);
  const lerp = (a, b, t) => a + (b - a) * t;
  const rectPath = (x, y, w, h) => `M${x},${y}h${Math.max(0,w)}v${Math.max(0,h)}h${-Math.max(0,w)}z`;
  const svgNode = (name, attrs) => {
    const el = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  };
  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const setStatus = (text) => {
    if ($('animation-status').textContent !== text) $('animation-status').textContent=text;
  };

  function buildSchedule(page,index) {
    const lead=index > 0 ? .7 : 0;
    const clocks = [.62+lead, .8+lead, .9+lead];
    let textCount = 0;
    const items = page.layers.map((layer) => {
      const owner = layer.kind === 'image' ? 2 : textCount++ % 2;
      const duration = layer.kind === 'image' ? 1.05 : .98 + Math.min(.2, (layer.lines?.length || 2) * .015);
      const item = {...layer, owner, start: clocks[owner], duration};
      clocks[owner] += duration + .11;
      return item;
    });
    return {items, lead, duration: Math.max(...clocks, 4.7+lead) + .65};
  }

  function resizeCanvas() {
    const viewport = $('canvas-viewport');
    if (!viewport.clientWidth || !viewport.clientHeight) return;
    const pad = getComputedStyle(viewport);
    const roomW = viewport.clientWidth - parseFloat(pad.paddingLeft) - parseFloat(pad.paddingRight);
    const roomH = viewport.clientHeight - parseFloat(pad.paddingTop) - parseFloat(pad.paddingBottom);
    fitScale = Math.max(.1, Math.min(roomW / W, roomH / H));
    const width = W * fitScale * state.zoom;
    $('artboard-space').style.width = `${width}px`;
    $('artboard-space').style.height = `${H * fitScale * state.zoom}px`;
    $('artboard-space').style.maxWidth = 'none';
    $('artboard-space').style.setProperty('--frame-gap',`${72*fitScale*state.zoom}px`);
    $('artboard-space').style.transform=`translateX(${state.panUnits*fitScale*state.zoom}px)`;
    $('zoom-fit').textContent = state.zoom === 1 ? 'Fit' : `${Math.round(fitScale * state.zoom * 100)}%`;
    $('zoom-out').disabled = state.zoom <= 1;
    $('zoom-in').disabled = state.zoom >= 3;
    cursors.forEach((cursor) => {
      if (cursor.dataset.x) cursor.style.transform=`translate(${+cursor.dataset.x*fitScale*state.zoom}px,${+cursor.dataset.y*fitScale*state.zoom}px)`;
    });
  }

  function makeCursors() {
    $('cursor-plane').replaceChildren();
    $('assembly-overlays').replaceChildren();
    cursors = owners.map((owner) => {
      const cursor = document.createElement('div');
      cursor.className = 'design-cursor';
      cursor.style.setProperty('--cursor-colour', owner.colour);
      cursor.innerHTML = `<svg class="cursor-arrow" viewBox="0 0 24 28"><path d="M2 2 20 15l-8 1-4 9z"/></svg><span class="cursor-click"></span><span class="cursor-name">${owner.name}<span class="cursor-action"></span></span>`;
      $('cursor-plane').append(cursor);
      return cursor;
    });
    boxes = owners.map((owner) => {
      const box = document.createElement('div');
      box.className = 'selection-box';
      box.style.setProperty('--cursor-colour', owner.colour);
      box.innerHTML = '<span class="selection-size"></span><span class="typing-caret"></span>';
      $('assembly-overlays').append(box);
      return box;
    });
  }

  function displayPage(index, complete = false) {
    $('artboard-space').getAnimations().forEach((animation)=>animation.cancel());
    state.page = index;
    state.panUnits=0;
    $('artboard-space').classList.remove('is-panning');
    $('artboard-space').querySelectorAll('.canvas-neighbor').forEach((frame)=>frame.remove());
    // Previous frames stay in the same canvas. They are actual completed SVG
    // artboards placed one frame-width apart, not transition screenshots.
    state.pages.forEach((other,i)=>{
      if (i===index || (!complete && i>index)) return;
      const frame=document.createElement('div');
      frame.className='canvas-neighbor';
      frame.setAttribute('aria-hidden','true');
      frame.style.left=`calc(${(i-index)*100}% + var(--frame-gap) * ${i-index})`;
      const label=document.createElement('div');
      label.className='artboard-label';
      label.innerHTML=icon('frame');
      const text=document.createElement('span'); text.textContent=pageNames[i]; label.append(text);
      const paper=document.createElement('div'); paper.className='neighbor-paper';
      paper.append(other.svg.cloneNode(true)); frame.append(label,paper);
      $('artboard-space').prepend(frame);
    });
    const page = state.pages[index];
    const svg = page.svg.cloneNode(true);
    let defs = svg.querySelector('defs');
    if (!defs) { defs = svgNode('defs', {}); svg.prepend(defs); }
    layers = [...svg.querySelectorAll('[data-layer]')].map((node, i) => {
      const metadata = page.layers[i];
      const wrapper = svgNode('g', {});
      node.before(wrapper);
      wrapper.append(node);
      const clipId = `typing-${index}-${i}`;
      const clip = svgNode('clipPath', {id: clipId, clipPathUnits: 'userSpaceOnUse'});
      const path = svgNode('path', {d: ''});
      clip.append(path); defs.append(clip);
      if (!complete) wrapper.style.opacity = '0';
      return {node, wrapper, path, clipId, ...metadata};
    });
    $('document-page').replaceChildren(svg);
    $('artboard').style.clipPath = complete ? '' : 'inset(0 100% 100% 0)';
    $('artboard').setAttribute('aria-label', `CV page ${index + 1}: ${pageNames[index]}. Choose Read CV for the full text.`);
    $('canvas-page-title').textContent = `0${index + 1} — ${pageNames[index]}`;
    $('artboard-name').textContent = pageNames[index];
    $('status-page').textContent = `0${index + 1} / 03`;
    document.querySelectorAll('[data-page].page-link').forEach((button) => {
      const active = +button.dataset.page === index;
      button.classList.toggle('is-active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    $('layer-list').replaceChildren();
    rows = page.layers.map((layer) => {
      const li = document.createElement('li');
      li.className = `layer-row${complete ? '' : ' is-pending'}`;
      li.innerHTML = icon(layer.kind === 'image' ? 'image' : 'text');
      const label = document.createElement('span'); label.textContent = layer.label; li.append(label);
      $('layer-list').append(li);
      return li;
    });
    makeCursors();
    if (complete) {
      cursors.forEach((c) => c.style.opacity = '0');
      boxes.forEach((b) => b.style.opacity = '0');
      updateProperties({label: pageNames[index], kind: 'frame', bounds: [0,0,W,H]});
    }
    $('canvas-viewport').scrollTo(0,0);
    resizeCanvas();
  }

  function updateProperties(item) {
    const [x,y,w,h] = item.bounds;
    $('selection-name').textContent = item.label;
    $('selection-type').textContent = item.kind === 'image' ? 'Place image · Keep original proportions' : item.kind === 'frame' ? 'A4 landscape · Original CV layout' : 'Create text box · Type & align';
    $('prop-x').textContent = Math.round(x);
    $('prop-y').textContent = Math.round(y);
    $('prop-width').textContent = Math.round(w);
    $('prop-height').textContent = Math.round(h);
  }

  // Reveal complete lines and then individual character-width increments on the
  // current line. Original glyph outlines render the text with exact fidelity.
  function revealText(layer, progress) {
    const [x,y,w,h] = layer.bounds;
    const fallbackCount = Math.max(1,Math.round(h / 14));
    const lines = layer.lines?.length ? layer.lines : Array.from({length:fallbackCount}, (_, i) => ({x,y:y+i*h/fallbackCount,width:w,height:h/fallbackCount,text:' '.repeat(35)}));
    const totalChars = lines.reduce((n,l) => n + Math.max(1,l.text.length), 0);
    let remaining = Math.floor(clamp(progress) * totalChars);
    let d = '', caret = [x,y,14];
    for (const [lineIndex,line] of lines.entries()) {
      const count = Math.max(1,line.text.length);
      const fraction = clamp(remaining / count);
      const character = Math.min(count,Math.max(0,remaining));
      const advance = line.advances?.[character-1] ?? line.width*fraction;
      // Type3 font boxes are taller than visible glyphs. Trim the reveal before
      // the next baseline so typing one row never exposes fragments of another.
      const next = lines[lineIndex+1];
      const lineBottom = next && next.baseline > (line.baseline || line.y+line.height)
        ? Math.min(line.y+line.height,next.baseline-next.fontSize*.96)
        : line.y+line.height;
      if (remaining > 0) d += rectPath(line.x-1,line.y-1,advance+2,lineBottom-line.y+2);
      if (remaining >= 0) caret = [line.x+advance,line.baseline ? line.baseline-line.fontSize*.8 : line.y,line.fontSize ? line.fontSize*.82 : line.height];
      remaining -= count;
    }
    layer.path.setAttribute('d', d);
    layer.wrapper.setAttribute('clip-path', `url(#${layer.clipId})`);
    return caret;
  }

  function placeCursor(owner, x, y, action, opacity, click = 0) {
    const cursor = cursors[owner];
    cursor.dataset.x=x; cursor.dataset.y=y;
    cursor.style.transform = `translate(${x * fitScale * state.zoom}px,${y * fitScale * state.zoom}px)`;
    cursor.style.opacity = opacity;
    cursor.querySelector('.cursor-action').textContent = action;
    const ring = cursor.querySelector('.cursor-click');
    ring.style.opacity = click > 0 ? 1 - click : 0;
    ring.style.transform = `scale(${1 + click * 2})`;
  }

  function drawBox(owner, bounds, progress = 1, opacity = 1, caret = null) {
    const [x,y,w,h] = bounds;
    const box = boxes[owner];
    box.style.left = `${x/W*100}%`; box.style.top = `${y/H*100}%`;
    box.style.width = `${w/W*100 * progress}%`; box.style.height = `${h/H*100 * progress}%`;
    box.style.opacity = opacity;
    box.querySelector('.selection-size').textContent = `${Math.round(w*progress)} × ${Math.round(h*progress)}`;
    const insertion = box.querySelector('.typing-caret');
    insertion.style.display = caret ? 'block' : 'none';
    if (caret) {
      insertion.style.left = `${(caret[0]-x)/w*100}%`;
      insertion.style.top = `${(caret[1]-y)/h*100}%`;
      insertion.style.height = `${caret[2]/h*100}%`;
    }
  }

  function renderTime(time) {
    let index = state.timeline.findIndex((p) => time < p.offset + p.duration);
    if (index < 0) index = 2;
    const schedule = state.timeline[index];
    const t = time - schedule.offset;
    if (state.page !== index) displayPage(index);
    // Move the camera along the shared canvas, then draw the adjacent frame.
    // Pan shares the playback clock so pause/skip remain exact mid-transition.
    state.panUnits=index > 0 ? (W+72)*(1-ease(t/.95)) : 0;
    $('artboard-space').style.transform=`translateX(${state.panUnits*fitScale*state.zoom}px)`;
    $('artboard-space').classList.toggle('is-panning',index>0 && t<.95);
    const frameTime=t-schedule.lead;
    const frameProgress = ease(frameTime / .55);
    $('artboard').style.clipPath = frameProgress >= 1 ? '' : `inset(0 ${(1-frameProgress)*100}% ${(1-frameProgress)*100}% 0)`;
    cursors.forEach((c) => c.style.opacity = '0');
    boxes.forEach((b) => b.style.opacity = '0');
    if (frameTime < .62) {
      placeCursor(0, W * frameProgress, H * frameProgress, 'Frame', 1);
      drawBox(0, [0,0,W,H], frameProgress);
    }
    let activeLabel = '';
    schedule.items.forEach((item,i) => {
      const layer = layers[i];
      const p = (t-item.start)/item.duration;
      const active = p >= 0 && p < 1;
      rows[i].classList.toggle('is-building', active);
      rows[i].classList.toggle('is-pending', p < .25);
      rows[i].dataset.owner = item.owner;
      if (p < 0) { layer.wrapper.style.opacity='0'; return; }
      if (p >= 1) {
        layer.wrapper.style.opacity='1'; layer.wrapper.removeAttribute('clip-path');
        layer.wrapper.style.transform = ''; return;
      }
      const [x,y,w,h] = item.bounds;
      const boxDraw = ease((p-.14)/.18);
      const reveal = clamp((p-.32)/.56);
      layer.wrapper.style.opacity = p < .32 ? '0' : '1';
      let caret = null;
      if (item.kind === 'image') {
        layer.wrapper.style.opacity = `${ease(reveal)}`;
        layer.wrapper.style.transform = `translate(${(1-ease(reveal))*8}px,${(1-ease(reveal))*5}px)`;
      } else if (p >= .32) caret = revealText(layer, reveal);
      drawBox(item.owner, item.bounds, boxDraw, p > .9 ? (1-p)*10 : 1, caret);
      const prev = schedule.items.filter((a) => a.owner === item.owner && a.start < item.start).at(-1);
      const origin = prev ? [prev.bounds[0]+prev.bounds[2],prev.bounds[1]+prev.bounds[3]] : [W*(.2+item.owner*.3),H*.15];
      let cx,cy;
      if (p < .14) { cx=lerp(origin[0],x,ease(p/.14)); cy=lerp(origin[1],y,ease(p/.14)); }
      else if (p < .32) { cx=x+w*boxDraw; cy=y+h*boxDraw; }
      else if (caret) { cx=caret[0]+4; cy=caret[1]+caret[2]*.65; }
      else { cx=x+w*.78; cy=y+h*.73; }
      placeCursor(item.owner,cx,cy,p < .32 ? (item.kind === 'image' ? 'Place' : 'Text box') : item.kind === 'image' ? 'Align' : 'Typing',1,p > .14 && p < .24 ? (p-.14)*10 : 0);
      activeLabel = item.label;
      updateProperties(item);
    });
    setStatus(t < schedule.lead ? `Moving to frame ${index+1} on the canvas` : frameTime < .6 ? `Creating frame ${index+1} of 3` : activeLabel ? `Building ${pageNames[index].toLowerCase()}` : 'Aligning the final details');
    const progress = clamp(time/state.total);
    $('progress-fill').style.transform = `scaleX(${progress})`;
    const percent=String(Math.round(progress*100));
    if ($('assembly-progress').getAttribute('aria-valuenow') !== percent) $('assembly-progress').setAttribute('aria-valuenow',percent);
  }

  function setPlaybackLabel(playing) {
    $('play-pause').innerHTML = icon(playing ? 'pause' : 'play') + `<span>${playing ? 'Pause' : 'Play'}</span>`;
    $('play-pause').setAttribute('aria-label', playing ? 'Pause CV animation' : state.time >= state.total ? 'Play CV animation again' : 'Resume CV animation');
  }
  function pause() {
    state.running=false; cancelAnimationFrame(state.raf); setPlaybackLabel(false);
  }
  function finish(page = state.page < 0 ? 0 : state.page) {
    pause(); state.time=state.total; state.autoPaused=false;
    displayPage(page,true);
    $('skip').disabled=true;
    $('status-dot').classList.add('is-ready');
    setStatus('CV ready · Explore all 3 pages');
    $('progress-fill').style.transform='scaleX(1)';
    $('assembly-progress').setAttribute('aria-valuenow','100');
    setPlaybackLabel(false);
  }
  function tick(now) {
    if (!state.running) return;
    state.time += Math.min((now-state.last)/1000,.08); state.last=now;
    if (state.time >= state.total) { finish(2); return; }
    renderTime(state.time);
    state.raf=requestAnimationFrame(tick);
  }
  function play(restart = false) {
    if (!state.ready) return;
    if (restart || state.time >= state.total) {
      state.time=0; state.page=-1;
      state.zoom=1;
    }
    state.running=true; state.last=performance.now();
    $('skip').disabled=false; $('status-dot').classList.remove('is-ready');
    setPlaybackLabel(true);
    cancelAnimationFrame(state.raf); state.raf=requestAnimationFrame(tick);
  }

  $('play-pause').addEventListener('click', () => state.running ? pause() : play());
  $('replay').addEventListener('click', () => play(true));
  $('skip').addEventListener('click', () => finish());
  document.querySelectorAll('.page-link').forEach((button) => button.addEventListener('click', () => {
    if (!state.ready) return;
    const previous=state.page;
    const target=+button.dataset.page;
    finish(target);
    if (previous !== target && !reducedMotion.matches) {
      const distance=(target-previous)*(W+72)*fitScale*state.zoom;
      $('artboard-space').animate([{transform:`translateX(${distance}px)`},{transform:'translateX(0)'}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)'});
    }
  }));
  $('zoom-in').addEventListener('click', () => { state.zoom=Math.min(3,state.zoom+.5); resizeCanvas(); });
  $('zoom-out').addEventListener('click', () => { state.zoom=Math.max(1,state.zoom-.5); resizeCanvas(); });
  $('zoom-fit').addEventListener('click', () => { state.zoom=1; resizeCanvas(); $('canvas-viewport').scrollTo(0,0); });
  $('reader-toggle').addEventListener('click', () => {
    state.reading=!state.reading;
    if (state.reading) pause();
    document.body.classList.toggle('is-reading',state.reading);
    $('reader').hidden=!state.reading;
    $('reader-toggle').setAttribute('aria-pressed',state.reading);
    $('reader-toggle').innerHTML=icon(state.reading ? 'frame' : 'book')+`<span>${state.reading ? 'Canvas view' : 'Read CV'}</span>`;
    if (!state.reading) resizeCanvas();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.running) { state.autoPaused=true; pause(); }
    else if (!document.hidden && state.autoPaused) { state.autoPaused=false; play(); }
  });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches && state.ready) finish(0); });
  new ResizeObserver(resizeCanvas).observe($('canvas-viewport'));

  async function load() {
    const getText = async (path) => {
      const response=await fetch(path);
      if (!response.ok) throw new Error(`Could not load ${path}`);
      return response.text();
    };
    try {
      const [manifestText,transcript,...svgs] = await Promise.all([
        getText('assets/cv/manifest.json'), getText('assets/cv/transcript.html'),
        ...[1,2,3].map((n) => getText(`assets/cv/page-${n}.svg`)),
      ]);
      const manifest=JSON.parse(manifestText);
      state.pages=manifest.pages.map((page,i) => {
        const svg=new DOMParser().parseFromString(svgs[i],'image/svg+xml').documentElement;
        if (svg.nodeName !== 'svg' || svg.querySelector('parsererror')) throw new Error('CV artwork is unavailable');
        return {...page,svg};
      });
      $('reader-content').innerHTML=transcript;
      let offset=0;
      state.timeline=state.pages.map((page,index) => {
        const schedule=buildSchedule(page,index); const result={...schedule,offset};
        offset+=schedule.duration; return result;
      });
      state.total=offset;
      state.ready=true;
      $('load-message').hidden=true;
      [$('replay'),$('play-pause'),$('skip'),$('reader-toggle')].forEach((b) => b.disabled=false);
      if (reducedMotion.matches) finish(0);
      else { displayPage(0); play(); }
    } catch (error) {
      $('load-message').innerHTML='<p>The canvas could not load.</p><a class="button download" href="assets/cv/Joe_Chan_CV_Updated.pdf">Open the CV as a PDF</a><button class="button quiet" id="retry-canvas">Try again</button>';
      setStatus('The CV is still available as a PDF');
      $('retry-canvas').addEventListener('click',load,{once:true});
      console.error('CV canvas:',error);
    }
  }
  load();
})();
