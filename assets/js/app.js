/* App shell: routing, views, progress, quizzes, flashcards, mock interviews, search */
(function () {
  'use strict';
  const C = window.COURSE, T = window.TOOLS, U = window.U, S = U.Store, esc = U.esc;
  const view = document.getElementById('view');
  const MODS = C.modules;
  const LESSONS = MODS.flatMap(m => m.lessons.map(l => Object.assign({ module: m }, l)));
  const ALLCARDS = MODS.flatMap(m => m.cards.map((c, i) => Object.assign({ key: m.id + ':' + i, module: m }, c)));
  const ALLQ = MODS.flatMap(m => m.quiz.map((q, i) => Object.assign({ key: m.id + ':' + i, module: m }, q)));
  const DIFF = { 1: ['Core', 't1'], 2: ['Standard', 't2'], 3: ['Advanced', 't3'] };

  /* ---------------- Progress ---------------- */
  const P = {
    get() { return S.get('progress', { lessons: {}, quiz: {}, cards: {}, mock: [], last: null }); },
    save(p) { S.set('progress', p); },
    done(id) { return !!this.get().lessons[id]; },
    toggle(id) { const p = this.get(); if (p.lessons[id]) delete p.lessons[id]; else p.lessons[id] = Date.now(); this.save(p); },
    setLast(id) { const p = this.get(); p.last = id; this.save(p); },
    modPct(m) { const p = this.get(); return m.lessons.length ? m.lessons.filter(l => p.lessons[l.id]).length / m.lessons.length : 0; }
  };
  const DAY = 864e5, INTERVAL = [0, 0, 1, 3, 7, 14];
  function cardState(key) { return P.get().cards[key] || { box: 0, due: 0 }; }
  function rateCard(key, r) {
    const p = P.get(); const c = p.cards[key] || { box: 0, due: 0 };
    if (r === 'again') c.box = 1; else if (r === 'hard') c.box = Math.max(1, c.box); else c.box = Math.min(5, Math.max(1, c.box) + 1);
    c.due = Date.now() + (r === 'again' ? 0 : r === 'hard' ? DAY : INTERVAL[c.box] * DAY);
    c.seen = (c.seen || 0) + 1;
    p.cards[key] = c; P.save(p);
  }
  const isDue = (k) => cardState(k).due <= Date.now();

  /* ---------------- Helpers ---------------- */
  const icon = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    ext: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
  };
  function ring(p, size = 64, stroke = 7) {
    const r = (size - stroke) / 2, c = 2 * Math.PI * r;
    return `<svg class="ring" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="${stroke}"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--accent)" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p)}" transform="rotate(-90 ${size / 2} ${size / 2})"/></svg>`;
  }
  const bar = (p) => `<div class="pbar"><i style="width:${Math.round(p * 100)}%"></i></div>`;
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function setTitle(t) { document.title = t ? t + ' · Superday Prep' : 'Superday Prep'; }
  function nextLesson() { const p = P.get(); return LESSONS.find(l => !p.lessons[l.id]); }

  /* ---------------- Sidebar ---------------- */
  function renderNav(route) {
    const p = P.get();
    const nav = document.getElementById('nav');
    const item = (href, label, extra = '') => `<a href="#${href}" class="nav-link${route === href ? ' active' : ''}">${label}${extra}</a>`;
    const dueCount = ALLCARDS.filter(c => isDue(c.key)).length;
    nav.innerHTML = `
      ${item('home', 'Dashboard')}
      <div class="nav-h">Course</div>
      ${MODS.map(m => {
        const pc = P.modPct(m);
        const activeMod = route === 'module-' + m.id || m.lessons.some(l => route === 'lesson-' + l.id) || route === 'quiz-' + m.id;
        return `<a href="#module-${m.id}" class="nav-link mod${activeMod ? ' active' : ''}"><span class="nav-num">${m.num}</span><span class="nav-t">${esc(m.title)}</span><span class="nav-dot${pc === 1 ? ' full' : pc > 0 ? ' part' : ''}" title="${Math.round(pc * 100)}% complete"></span></a>
        ${activeMod ? `<div class="nav-sub">${m.lessons.map(l => `<a href="#lesson-${l.id}" class="${route === 'lesson-' + l.id ? 'active' : ''}">${p.lessons[l.id] ? '<span class="tick">' + icon.check + '</span>' : '<span class="tick empty"></span>'}${esc(l.title)}</a>`).join('')}${m.quiz.length ? `<a href="#quiz-${m.id}" class="${route === 'quiz-' + m.id ? 'active' : ''}"><span class="tick empty q">?</span>Module quiz</a>` : ''}</div>` : ''}`;
      }).join('')}
      <div class="nav-h">Practice</div>
      ${item('flashcards', 'Flashcards', dueCount ? `<span class="badge">${dueCount}</span>` : '')}
      ${item('mock', 'Mock interview')}
      ${item('quiz-final', 'Final exam')}
      <div class="nav-h">Tools</div>
      ${item('tools', 'All tools')}
      ${Object.entries(T).map(([k, t]) => item('tool-' + k, esc(t.name))).join('')}
      <div class="nav-h">Reference</div>
      ${item('formulas', 'Formula sheet')}
      ${item('glossary', 'Glossary')}
      ${item('resources', 'Resources')}`;
  }

  /* ---------------- Views ---------------- */
  function vHome() {
    setTitle('');
    const p = P.get();
    const done = LESSONS.filter(l => p.lessons[l.id]).length;
    const quizzes = MODS.filter(m => m.quiz.length);
    const passed = quizzes.filter(m => (p.quiz[m.id] || {}).best >= 0.8).length;
    const mastered = ALLCARDS.filter(c => cardState(c.key).box >= 4).length;
    const due = ALLCARDS.filter(c => isDue(c.key)).length;
    const nl = (p.last && !p.lessons[p.last] && LESSONS.find(l => l.id === p.last)) || nextLesson();
    const totalMin = LESSONS.reduce((s, l) => s + l.minutes, 0);
    view.innerHTML = `
      <section class="hero">
        <div class="hero-text">
          <p class="eyebrow">Finance interview course</p>
          <h1>Walk into the room knowing the answer <span class="hl">and why it's right.</span></h1>
          <p class="lede">${LESSONS.length} lessons across ${MODS.length - 1} modules, from the three statements to paper LBOs. Every topic comes with interview-ready answers, a working model you can change, a quiz, flashcards and hand-picked videos.</p>
          <div class="btn-row">
            ${nl ? `<a class="btn" href="#lesson-${nl.id}">${done ? 'Continue' : 'Start'}: ${esc(nl.title)}</a>` : '<a class="btn" href="#mock">Run a mock interview</a>'}
            <a class="btn ghost" href="#mock">Mock interview</a>
          </div>
        </div>
        <div class="hero-card" aria-label="Your progress">
          <div class="ring-wrap">${ring(done / LESSONS.length, 120, 10)}<div class="ring-label"><b>${Math.round(done / LESSONS.length * 100)}%</b><span>complete</span></div></div>
          <dl class="stats">
            <div><dt>Lessons</dt><dd>${done}/${LESSONS.length}</dd></div>
            <div><dt>Quizzes passed</dt><dd>${passed}/${quizzes.length}</dd></div>
            <div><dt>Cards mastered</dt><dd>${mastered}/${ALLCARDS.length}</dd></div>
            <div><dt>Mock interviews</dt><dd>${p.mock.length}</dd></div>
          </dl>
          <a class="due-link" href="#flashcards">${due ? `<b>${due}</b> flashcards due for review →` : 'No flashcards due. Nice work.'}</a>
        </div>
      </section>

      <section>
        <div class="sec-head"><h2>Modules</h2><span class="muted">${Math.round(totalMin / 60)} hours of reading · ${ALLQ.length} quiz questions · ${ALLCARDS.length} flashcards</span></div>
        <div class="mod-grid">
          ${MODS.map(m => {
            const pc = P.modPct(m), q = p.quiz[m.id];
            return `<a class="mod-card" href="#module-${m.id}">
              <div class="mod-top"><span class="mod-num">${m.num}</span>${pc === 1 ? `<span class="pill pos">${icon.check} Done</span>` : ''}</div>
              <h3>${esc(m.title)}</h3><p>${esc(m.tagline)}</p>
              <div class="mod-foot">${bar(pc)}<span>${m.lessons.filter(l => p.lessons[l.id]).length}/${m.lessons.length} lessons${q ? ` · quiz best ${Math.round(q.best * 100)}%` : ''}</span></div></a>`;
          }).join('')}
        </div>
      </section>

      <section>
        <div class="sec-head"><h2>Models you can run</h2><a href="#tools" class="muted">All tools →</a></div>
        <p class="muted small">Numbers in <span class="input-demo">blue</span> are inputs, as in a banker's Excel model. Change them and everything recalculates.</p>
        <div class="tool-strip">${['statements', 'dcf', 'lbo', 'merger', 'wacc', 'ev'].map(k => `<a class="tool-tile" href="#tool-${k}"><b>${esc(T[k].name)}</b><span>${esc(T[k].desc)}</span></a>`).join('')}</div>
      </section>`;
  }

  function vModule(id) {
    const m = MODS.find(x => x.id === id); if (!m) return vNotFound();
    setTitle(m.title);
    const p = P.get(), q = p.quiz[m.id];
    const tools = Object.entries(T).filter(([, t]) => t.module === m.id);
    view.innerHTML = `
      <nav class="crumbs"><a href="#home">Dashboard</a> / Module ${m.num}</nav>
      <header class="page-head"><p class="eyebrow">Module ${m.num}</p><h1>${esc(m.title)}</h1><p class="lede">${esc(m.tagline)}</p>
        <div class="meta-row"><span>${icon.clock} ${m.lessons.reduce((s, l) => s + l.minutes, 0)} min</span><span>${m.lessons.length} lessons</span>${m.quiz.length ? `<span>${m.quiz.length}-question quiz</span>` : ''}${m.cards.length ? `<span>${m.cards.length} flashcards</span>` : ''}</div>
        ${bar(P.modPct(m))}</header>
      <ol class="lesson-list">
        ${m.lessons.map((l, i) => `<li><a href="#lesson-${l.id}" class="lesson-row${p.lessons[l.id] ? ' done' : ''}">
          <span class="lr-n">${p.lessons[l.id] ? icon.check : i + 1}</span>
          <span class="lr-t"><b>${esc(l.title)}</b><span>${esc(l.summary)}</span></span>
          <span class="lr-m">${l.minutes} min${l.videos.length ? ` · ${l.videos.length} video${l.videos.length > 1 ? 's' : ''}` : ''}</span></a></li>`).join('')}
      </ol>
      <div class="mod-actions">
        ${m.quiz.length ? `<a class="action-card" href="#quiz-${m.id}"><b>Module quiz</b><span>${q ? `Best score ${Math.round(q.best * 100)}% · last ${Math.round(q.last * 100)}%` : `${m.quiz.length} questions with explanations`}</span></a>` : ''}
        ${m.cards.length ? `<a class="action-card" href="#flashcards-${m.id}"><b>Flashcards</b><span>${m.cards.length} interview questions with model answers</span></a>` : ''}
        ${tools.map(([k, t]) => `<a class="action-card" href="#tool-${k}"><b>${esc(t.name)}</b><span>${esc(t.desc)}</span></a>`).join('')}
      </div>`;
  }

  function videoBlock(l) {
    const vids = l.videos || [];
    return `<section class="videos"><h2>Watch</h2>
      <p class="small muted">Videos open on YouTube in a new tab. Independent creators publish these, so content and availability can change; the search link always works.</p>
      <div class="video-list">
        ${vids.map(vd => `<a class="video" href="${esc(vd.u)}" target="_blank" rel="noopener noreferrer"><span class="vplay">${icon.play}</span><span class="vt">${esc(vd.t)}</span><span class="vext">${icon.ext}</span></a>`).join('')}
        <a class="video search" href="${esc(C.yt(l.search || l.title))}" target="_blank" rel="noopener noreferrer"><span class="vplay">${icon.search}</span><span class="vt">Search YouTube: "${esc(l.search || l.title)}"</span><span class="vext">${icon.ext}</span></a>
      </div></section>`;
  }

  function vLesson(id) {
    const i = LESSONS.findIndex(l => l.id === id); if (i < 0) return vNotFound();
    const l = LESSONS[i], m = l.module, prev = LESSONS[i - 1], next = LESSONS[i + 1];
    setTitle(l.title); P.setLast(l.id);
    const done = P.done(l.id);
    const tool = l.tool && T[l.tool];
    view.innerHTML = `
      <nav class="crumbs"><a href="#home">Dashboard</a> / <a href="#module-${m.id}">${m.num} ${esc(m.title)}</a></nav>
      <article class="lesson">
        <header class="page-head"><p class="eyebrow">Module ${m.num} · Lesson ${m.lessons.indexOf(m.lessons.find(x => x.id === l.id)) + 1} of ${m.lessons.length}</p>
          <h1>${esc(l.title)}</h1><p class="lede">${esc(l.summary)}</p>
          <div class="meta-row"><span>${icon.clock} ${l.minutes} min read</span>${done ? `<span class="pill pos">${icon.check} Completed</span>` : ''}</div></header>
        <div class="prose">${l.body}</div>
        ${tool ? `<details class="tool-embed" id="embed"><summary><span><b>Try it: ${esc(tool.name)}</b><span class="small muted">${esc(tool.desc)}</span></span><span class="btn ghost sm">Open</span></summary><div class="tool-body" id="embed-body"></div></details>` : ''}
        ${videoBlock(l)}
        <div class="lesson-end">
          <button class="btn${done ? ' ghost' : ''}" id="mark" type="button">${done ? 'Mark as not complete' : 'Mark complete'}</button>
          <div class="pager">
            ${prev ? `<a href="#lesson-${prev.id}" class="pg prev"><span>Previous</span><b>${esc(prev.title)}</b></a>` : '<span></span>'}
            ${next ? `<a href="#lesson-${next.id}" class="pg next"><span>${next.module !== m ? 'Next module' : 'Next'}</span><b>${esc(next.title)}</b></a>` : `<a href="#quiz-final" class="pg next"><span>Finish</span><b>Final exam</b></a>`}
          </div>
          ${next && next.module !== m && m.quiz.length ? `<p class="small">Before moving on: <a href="#quiz-${m.id}">take the ${esc(m.title)} quiz</a>.</p>` : ''}
        </div>
      </article>`;
    document.getElementById('mark').onclick = () => {
      const wasDone = P.done(l.id);
      P.toggle(l.id);
      if (!wasDone && next) location.hash = 'lesson-' + next.id; else route();
    };
    const emb = document.getElementById('embed');
    if (emb) emb.addEventListener('toggle', () => { const b = document.getElementById('embed-body'); if (emb.open && !b.dataset.ready) { tool.run(b); b.dataset.ready = '1'; } });
  }

  function vTools() {
    setTitle('Tools');
    view.innerHTML = `<header class="page-head"><p class="eyebrow">Practice by doing</p><h1>Tools &amp; models</h1>
      <p class="lede">Every model recalculates as you type. <span class="input-demo">Blue numbers</span> are inputs; black numbers are calculated, the same convention bankers use in Excel.</p></header>
      <div class="tool-strip big">${Object.entries(T).map(([k, t]) => `<a class="tool-tile" href="#tool-${k}"><b>${esc(t.name)}</b><span>${esc(t.desc)}</span></a>`).join('')}</div>`;
  }
  function vTool(id) {
    const t = T[id]; if (!t) return vNotFound();
    setTitle(t.name);
    const m = MODS.find(x => x.id === t.module);
    view.innerHTML = `<nav class="crumbs"><a href="#tools">Tools</a>${m ? ` / related: <a href="#module-${m.id}">${esc(m.title)}</a>` : ''}</nav>
      <header class="page-head"><h1>${esc(t.name)}</h1><p class="lede">${esc(t.desc)}</p></header>
      <div class="tool-body full" id="tool-root"></div>`;
    t.run(document.getElementById('tool-root'));
  }

  /* ---------------- Quiz ---------------- */
  function vQuiz(id) {
    const final = id === 'final';
    const m = final ? null : MODS.find(x => x.id === id);
    if (!final && (!m || !m.quiz.length)) return vNotFound();
    const qs = final ? shuffle(ALLQ).slice(0, 25) : shuffle(m.quiz.map((q, i) => Object.assign({ key: m.id + ':' + i, module: m }, q)));
    setTitle(final ? 'Final exam' : m.title + ' quiz');
    let i = 0, score = 0; const answers = [];
    const head = `<nav class="crumbs"><a href="#home">Dashboard</a>${m ? ` / <a href="#module-${m.id}">${m.num} ${esc(m.title)}</a>` : ''}</nav>
      <header class="page-head"><p class="eyebrow">${final ? 'All modules · 25 random questions' : 'Module ' + m.num + ' quiz'}</p><h1>${final ? 'Final exam' : esc(m.title)}</h1></header>`;
    function show() {
      const q = qs[i];
      const order = shuffle(q.o.map((t, k) => ({ t, k })));
      view.innerHTML = head + `<div class="quiz">
        <div class="quiz-top"><span>Question ${i + 1} of ${qs.length}</span><span>Score ${score}</span></div>${bar(i / qs.length)}
        ${final ? `<p class="eyebrow small">${esc(q.module.title)}</p>` : ''}
        <h2 class="quiz-q">${esc(q.q)}</h2>
        <div class="opts">${order.map((o, n) => `<button class="opt" data-k="${o.k}" type="button"><span class="opt-l">${'ABCD'[n]}</span><span>${esc(o.t)}</span></button>`).join('')}</div>
        <div id="qfb"></div></div>`;
      view.querySelectorAll('.opt').forEach(b => b.onclick = () => pick(+b.dataset.k));
    }
    function pick(k) {
      const q = qs[i], ok = k === q.a;
      if (ok) score++;
      answers.push({ q, k, ok });
      view.querySelectorAll('.opt').forEach(b => { b.disabled = true; const bk = +b.dataset.k; if (bk === q.a) b.classList.add('right'); else if (bk === k) b.classList.add('wrong'); });
      document.getElementById('qfb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'bad'}"><b>${ok ? 'Correct.' : 'Not quite.'}</b> ${esc(q.e)}</div>
        <button class="btn" id="qnext" type="button">${i + 1 < qs.length ? 'Next question' : 'See results'}</button>`;
      const nb = document.getElementById('qnext'); nb.focus(); nb.onclick = () => { i++; if (i < qs.length) show(); else finish(); };
    }
    function finish() {
      const pc = score / qs.length;
      const p = P.get(); const key = final ? 'final' : m.id;
      const prev = p.quiz[key]; p.quiz[key] = { best: Math.max(pc, prev ? prev.best : 0), last: pc, at: Date.now() }; P.save(p);
      const wrong = answers.filter(a => !a.ok);
      const byMod = {};
      if (final) answers.forEach(a => { const t = a.q.module.title; byMod[t] = byMod[t] || [0, 0]; byMod[t][1]++; if (a.ok) byMod[t][0]++; });
      view.innerHTML = head + `<div class="quiz result">
        <div class="result-top">${ring(pc, 120, 10)}<div><h2>${score} / ${qs.length} (${Math.round(pc * 100)}%)</h2><p>${pc >= 0.9 ? 'Interview-ready on this material.' : pc >= 0.8 ? 'Passed. Review the misses below, then retake in a couple of days.' : 'Below 80%. Reread the lessons for the questions you missed, then retake.'}</p>
        <div class="btn-row"><button class="btn" id="retake" type="button">Retake</button>${m ? `<a class="btn ghost" href="#flashcards-${m.id}">Review flashcards</a>` : ''}</div></div></div>
        ${final ? `<h3>By module</h3><div class="by-mod">${Object.entries(byMod).map(([t, [a, b]]) => `<div><span>${esc(t)}</span>${bar(a / b)}<b>${a}/${b}</b></div>`).join('')}</div>` : ''}
        ${wrong.length ? `<h3>Review your misses</h3>${wrong.map(a => `<div class="miss"><p><b>${esc(a.q.q)}</b></p><p class="neg small">Your answer: ${esc(a.q.o[a.k])}</p><p class="pos small">Correct: ${esc(a.q.o[a.q.a])}</p><p class="small">${esc(a.q.e)}</p></div>`).join('')}` : ''}</div>`;
      document.getElementById('retake').onclick = () => vQuiz(id);
    }
    show();
  }

  /* ---------------- Flashcards ---------------- */
  function vFlash(modId) {
    setTitle('Flashcards');
    const st = S.get('flash:filter', { mode: 'due', diff: 'all' });
    const mod = modId ? MODS.find(m => m.id === modId) : null;
    function deck() {
      let c = mod ? ALLCARDS.filter(x => x.module === mod) : ALLCARDS;
      if (st.diff !== 'all') c = c.filter(x => String(x.d) === st.diff);
      if (st.mode === 'due') c = c.filter(x => isDue(x.key));
      else if (st.mode === 'weak') c = c.filter(x => { const s = cardState(x.key); return s.seen && s.box <= 2; });
      return st.mode === 'all' ? shuffle(c) : c.sort((a, b) => cardState(a.key).box - cardState(b.key).box);
    }
    const boxes = [0, 0, 0, 0, 0, 0];
    (mod ? ALLCARDS.filter(x => x.module === mod) : ALLCARDS).forEach(c => boxes[cardState(c.key).box]++);
    view.innerHTML = `<header class="page-head"><p class="eyebrow">Spaced repetition</p><h1>Flashcards${mod ? ': ' + esc(mod.title) : ''}</h1>
      <p class="lede">Say your answer out loud, then flip. Cards you know come back less often; cards you miss come back today.</p></header>
      <div class="flash-controls">
        <label class="field" for="fc-mod"><span class="field-label">Deck</span><span class="input-wrap"><select id="fc-mod"><option value="">All modules</option>${MODS.filter(m => m.cards.length).map(m => `<option value="${m.id}"${mod === m ? ' selected' : ''}>${m.num} ${esc(m.title)}</option>`).join('')}</select></span></label>
        <label class="field" for="fc-mode"><span class="field-label">Show</span><span class="input-wrap"><select id="fc-mode"><option value="due"${st.mode === 'due' ? ' selected' : ''}>Due now</option><option value="all"${st.mode === 'all' ? ' selected' : ''}>All, shuffled</option><option value="weak"${st.mode === 'weak' ? ' selected' : ''}>Weak cards</option></select></span></label>
        <label class="field" for="fc-diff"><span class="field-label">Difficulty</span><span class="input-wrap"><select id="fc-diff"><option value="all">All</option><option value="1"${st.diff === '1' ? ' selected' : ''}>Core</option><option value="2"${st.diff === '2' ? ' selected' : ''}>Standard</option><option value="3"${st.diff === '3' ? ' selected' : ''}>Advanced</option></select></span></label>
      </div>
      <div class="boxes" aria-label="Cards by box">${['New', 'Box 1', 'Box 2', 'Box 3', 'Box 4', 'Box 5'].map((n, k) => `<div class="box${k >= 4 ? ' strong' : ''}"><b>${boxes[k]}</b><span>${n}</span></div>`).join('')}</div>
      <div id="fc-stage"></div>`;
    document.getElementById('fc-mod').onchange = (e) => { location.hash = e.target.value ? 'flashcards-' + e.target.value : 'flashcards'; };
    document.getElementById('fc-mode').onchange = (e) => { st.mode = e.target.value; S.set('flash:filter', st); vFlash(modId); };
    document.getElementById('fc-diff').onchange = (e) => { st.diff = e.target.value; S.set('flash:filter', st); vFlash(modId); };
    const cards = deck(); let i = 0, flipped = false;
    const stage = document.getElementById('fc-stage');
    function show() {
      if (i >= cards.length) {
        stage.innerHTML = `<div class="fc-empty"><h3>${cards.length ? 'Session complete.' : 'Nothing to review here.'}</h3><p>${cards.length ? `You reviewed ${cards.length} card${cards.length > 1 ? 's' : ''}.` : 'No cards match this filter. Try "All, shuffled" or another deck.'}</p><button class="btn" id="fc-all" type="button">Practice all cards anyway</button></div>`;
        document.getElementById('fc-all').onclick = () => { st.mode = 'all'; S.set('flash:filter', st); vFlash(modId); };
        return;
      }
      const c = cards[i]; flipped = false;
      const [dn, dc] = DIFF[c.d] || DIFF[2];
      stage.innerHTML = `<div class="fc-meta"><span>${i + 1} / ${cards.length}</span><span class="tag ${dc}">${dn}</span><span>${esc(c.module.title)}</span></div>
        <button class="fc" id="fc" type="button" aria-live="polite"><span class="fc-q">${esc(c.q)}</span><span class="fc-a" hidden>${esc(c.a)}</span><span class="fc-hint">Tap or press Space to flip</span></button>
        <div class="fc-rate" hidden><button class="btn bad" data-r="again" type="button">Again <kbd>1</kbd></button><button class="btn mid" data-r="hard" type="button">Shaky <kbd>2</kbd></button><button class="btn good" data-r="good" type="button">Got it <kbd>3</kbd></button></div>`;
      document.getElementById('fc').onclick = flip;
      stage.querySelectorAll('[data-r]').forEach(b => b.onclick = () => rate(b.dataset.r));
    }
    function flip() {
      flipped = !flipped;
      const f = document.getElementById('fc'); f.classList.toggle('flipped', flipped);
      f.querySelector('.fc-a').hidden = !flipped; f.querySelector('.fc-hint').hidden = flipped;
      stage.querySelector('.fc-rate').hidden = !flipped;
    }
    function rate(r) { rateCard(cards[i].key, r); i++; show(); renderNav(currentRoute()); }
    keyHandler = (e) => {
      if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
      if (e.code === 'Space') { e.preventDefault(); if (i < cards.length) flip(); }
      else if (flipped && ['1', '2', '3'].includes(e.key)) rate(['again', 'hard', 'good'][+e.key - 1]);
    };
    show();
  }

  /* ---------------- Mock interview ---------------- */
  function vMock() {
    setTitle('Mock interview');
    const cfg = S.get('mock:cfg', { mods: MODS.filter(m => m.cards.length).map(m => m.id), n: 10, secs: 90, diff: 'all' });
    const hist = P.get().mock;
    view.innerHTML = `<header class="page-head"><p class="eyebrow">Simulate the real thing</p><h1>Mock interview</h1>
      <p class="lede">Questions come one at a time with a timer. Answer out loud as if an interviewer were across the table, then reveal the model answer and grade yourself honestly.</p></header>
      <div class="mock-setup">
        <div class="field wide"><span class="field-label">Topics</span><div class="chip-row" id="mk-mods">${MODS.filter(m => m.cards.length).map(m => `<label class="chip"><input type="checkbox" value="${m.id}"${cfg.mods.includes(m.id) ? ' checked' : ''}> ${esc(m.title)}</label>`).join('')}</div></div>
        <div class="tool-controls">
          <label class="field" for="mk-n"><span class="field-label">Questions</span><span class="input-wrap"><select id="mk-n">${[5, 10, 15, 20].map(n => `<option${n === cfg.n ? ' selected' : ''}>${n}</option>`).join('')}</select></span></label>
          <label class="field" for="mk-s"><span class="field-label">Time per question</span><span class="input-wrap"><select id="mk-s">${[[60, '60 seconds'], [90, '90 seconds'], [120, '2 minutes'], [0, 'No timer']].map(([s, t]) => `<option value="${s}"${s === cfg.secs ? ' selected' : ''}>${t}</option>`).join('')}</select></span></label>
          <label class="field" for="mk-d"><span class="field-label">Difficulty</span><span class="input-wrap"><select id="mk-d"><option value="all">Mixed</option><option value="1"${cfg.diff === '1' ? ' selected' : ''}>Core only</option><option value="12"${cfg.diff === '12' ? ' selected' : ''}>Core + standard</option><option value="3"${cfg.diff === '3' ? ' selected' : ''}>Advanced only</option></select></span></label>
        </div>
        <button class="btn" id="mk-go" type="button">Start interview</button>
      </div>
      ${hist.length ? `<h3>Recent sessions</h3><div class="hist">${hist.slice(-6).reverse().map(h => `<div class="hist-row"><span>${new Date(h.at).toLocaleDateString()}</span>${bar(h.score)}<b>${Math.round(h.score * 100)}%</b><span class="muted small">${h.n} questions</span></div>`).join('')}</div>` : ''}`;
    document.getElementById('mk-go').onclick = () => {
      const c = { mods: [...view.querySelectorAll('#mk-mods input:checked')].map(x => x.value), n: +sv('mk-n'), secs: +sv('mk-s'), diff: sv('mk-d') };
      if (!c.mods.length) return;
      S.set('mock:cfg', c); runMock(c);
    };
  }
  function sv(id) { return document.getElementById(id).value; }
  function runMock(c) {
    let pool = ALLCARDS.filter(x => c.mods.includes(x.module.id));
    if (c.diff !== 'all') pool = pool.filter(x => c.diff.includes(String(x.d)));
    if (!pool.length) pool = ALLCARDS.filter(x => c.mods.includes(x.module.id));
    const qs = shuffle(pool).slice(0, c.n);
    let i = 0; const res = [];
    function show() {
      const q = qs[i]; let left = c.secs; let revealed = false;
      view.innerHTML = `<div class="mock">
        <div class="quiz-top"><span>Question ${i + 1} of ${qs.length}</span><span>${esc(q.module.title)}</span></div>${bar(i / qs.length)}
        <div class="interviewer"><span class="avatar" aria-hidden="true">I</span><p>${esc(q.q)}</p></div>
        ${c.secs ? `<div class="timer"><div class="timer-bar"><div class="timer-fill good" id="mk-tf" style="width:100%"></div></div><span id="mk-tt">${c.secs}s</span></div>` : ''}
        <div class="btn-row"><button class="btn" id="mk-rev" type="button">Reveal model answer</button><button class="btn ghost" id="mk-end" type="button">End session</button></div>
        <div id="mk-ans"></div></div>`;
      const tf = document.getElementById('mk-tf'), tt = document.getElementById('mk-tt');
      clearInterval(timer);
      if (c.secs) timer = setInterval(() => {
        left--; if (tt) tt.textContent = Math.max(0, left) + 's';
        if (tf) { tf.style.width = Math.max(0, left / c.secs * 100) + '%'; tf.className = 'timer-fill ' + (left > c.secs * 0.33 ? 'good' : left > 0 ? 'short' : 'long'); }
        if (left <= 0) { clearInterval(timer); if (!revealed) reveal(true); }
      }, 1000);
      document.getElementById('mk-rev').onclick = () => reveal(false);
      document.getElementById('mk-end').onclick = () => { clearInterval(timer); finish(); };
      function reveal(timeout) {
        revealed = true; clearInterval(timer);
        document.getElementById('mk-rev').hidden = true;
        document.getElementById('mk-ans').innerHTML = `${timeout ? '<p class="neg small">Time is up. In a real interview, lead with the conclusion so you never run out of time.</p>' : ''}
          <div class="say"><div class="say-label">Model answer</div><p>${esc(q.a)}</p></div>
          <p class="small muted">How did you do?</p>
          <div class="fc-rate"><button class="btn bad" data-s="0" type="button">Missed it</button><button class="btn mid" data-s="0.5" type="button">Partially</button><button class="btn good" data-s="1" type="button">Nailed it</button></div>`;
        document.querySelectorAll('[data-s]').forEach(b => b.onclick = () => {
          const s = +b.dataset.s; res.push({ q, s });
          rateCard(q.key, s === 1 ? 'good' : s === 0.5 ? 'hard' : 'again');
          i++; if (i < qs.length) show(); else finish();
        });
      }
    }
    function finish() {
      clearInterval(timer);
      if (!res.length) return vMock();
      const score = res.reduce((s, r) => s + r.s, 0) / res.length;
      const p = P.get(); p.mock.push({ at: Date.now(), score, n: res.length }); P.save(p);
      const by = {}; res.forEach(r => { const t = r.q.module.title; by[t] = by[t] || [0, 0]; by[t][0] += r.s; by[t][1]++; });
      const weak = res.filter(r => r.s < 1);
      view.innerHTML = `<header class="page-head"><p class="eyebrow">Session complete</p><h1>${Math.round(score * 100)}% interview-ready</h1>
        <p class="lede">${score >= 0.85 ? 'Strong session. Push the difficulty up next time.' : score >= 0.6 ? 'Solid base. The topics below need another pass.' : 'Plenty to work on, which is exactly what practice is for. Start with the weakest topic below.'}</p></header>
        <div class="by-mod">${Object.entries(by).map(([t, [a, b]]) => `<div><span>${esc(t)}</span>${bar(a / b)}<b>${Math.round(a / b * 100)}%</b></div>`).join('')}</div>
        ${weak.length ? `<h3>Questions to revisit</h3><p class="small muted">These have been moved to the front of your flashcard queue.</p>${weak.map(r => `<div class="miss"><p><b>${esc(r.q.q)}</b></p><p class="small">${esc(r.q.a)}</p></div>`).join('')}` : ''}
        <div class="btn-row"><button class="btn" id="mk-again" type="button">New session</button><a class="btn ghost" href="#flashcards">Go to flashcards</a></div>`;
      document.getElementById('mk-again').onclick = vMock;
      renderNav(currentRoute());
    }
    show();
  }

  /* ---------------- Reference pages ---------------- */
  function vGlossary() {
    setTitle('Glossary');
    view.innerHTML = `<header class="page-head"><h1>Glossary</h1><p class="lede">${C.glossary.length} terms you should be able to define in one sentence.</p></header>
      <label class="field wide" for="gl-q"><span class="field-label">Filter</span><span class="input-wrap"><input id="gl-q" type="search" placeholder="Type a term, e.g. WACC"></span></label>
      <dl class="glossary" id="gl"></dl>`;
    const draw = (q) => {
      const t = q.toLowerCase();
      const rows = C.glossary.filter(([a, b]) => !t || a.toLowerCase().includes(t) || b.toLowerCase().includes(t));
      document.getElementById('gl').innerHTML = rows.length ? rows.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('') : '<p class="muted">No matching terms.</p>';
    };
    document.getElementById('gl-q').oninput = (e) => draw(e.target.value);
    draw('');
  }

  function vFormulas() {
    setTitle('Formula sheet');
    const F = [
      ['Accounting', [['Balance sheet', 'Assets = Liabilities + Equity'], ['EBITDA', 'EBIT + D&A'], ['After-tax impact', 'Pre-tax change × (1 – t)'], ['Operating working capital', '(AR + Inventory + Prepaids) – (AP + Accrued + Deferred revenue)'], ['Cash conversion cycle', 'DSO + DIO – DPO']]],
      ['Time value of money', [['Future value', 'PV × (1 + r)ⁿ'], ['Present value', 'FV / (1 + r)ⁿ'], ['Perpetuity', 'C / r'], ['Growing perpetuity', 'C₁ / (r – g)'], ['Annuity', 'C × [1 – (1 + r)⁻ⁿ] / r'], ['Rule of 72', 'Years to double ≈ 72 / rate%']]],
      ['Equity & enterprise value', [['Equity value', 'Share price × diluted shares'], ['Enterprise value', 'Equity value + debt + preferred + NCI – cash – non-operating assets'], ['Treasury stock method', 'Net new shares = options – (options × strike / price)']]],
      ['DCF', [['Unlevered FCF', 'EBIT × (1 – t) + D&A – capex – Δ NWC'], ['Levered FCF', 'Net income + D&A – capex – Δ NWC – mandatory debt repayment'], ['WACC', 'E/(D+E) × Ke + D/(D+E) × Kd × (1 – t)'], ['CAPM', 'Ke = Rf + β × ERP'], ['Unlever beta', 'βU = βL / [1 + (1 – t) × D/E]'], ['Relever beta', 'βL = βU × [1 + (1 – t) × D/E]'], ['Gordon TV', 'UFCFₙ × (1 + g) / (WACC – g)'], ['Exit TV', 'EBITDAₙ × exit multiple'], ['Implied g', '(TV × WACC – UFCFₙ) / (TV + UFCFₙ)']]],
      ['M&A', [['Pro forma EPS', '(Buyer NI + Target NI ± after-tax adjustments) / (Buyer shares + new shares)'], ['Cost of cash / debt', 'Rate × (1 – t)'], ['Cost of stock', 'Buyer NI / buyer equity value = 1 / P/E'], ['Target yield', 'Target NI / purchase equity price'], ['Goodwill', 'Purchase price – (book equity – old goodwill + write-ups – new DTL)'], ['Breakeven synergies', '(EPS shortfall × pro forma shares) / (1 – t)']]],
      ['LBO', [['MOIC', 'Exit equity / entry equity'], ['IRR (single in/out)', 'MOIC^(1/years) – 1'], ['Anchors', '2x/3y ≈ 26% · 2x/5y ≈ 15% · 2.5x/5y ≈ 20% · 3x/5y ≈ 25%'], ['Value creation', 'ΔEBITDA × entry multiple + Δmultiple × exit EBITDA + debt paydown – fees']]],
      ['Credit & bonds', [['Bond price', 'Σ C/(1+y)ᵗ + F/(1+y)ᴺ'], ['Current yield', 'Annual coupon / price'], ['Modified duration', 'Macaulay duration / (1 + y/m)'], ['Price change', '%ΔP ≈ –ModDur × Δy (+ ½ × convexity × Δy²)'], ['Leverage', 'Debt / EBITDA'], ['Interest coverage', 'EBITDA / interest']]]
    ];
    view.innerHTML = `<header class="page-head"><h1>Formula sheet</h1><p class="lede">Every formula in the course on one page. Review it the night before an interview.</p></header>
      <div class="formula-grid">${F.map(([h, rows]) => `<section class="fs"><h2>${esc(h)}</h2><dl>${rows.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl></section>`).join('')}</div>`;
  }

  function vResources() {
    setTitle('Resources');
    const R = C.resources;
    view.innerHTML = `<header class="page-head"><h1>Resources</h1><p class="lede">Where to go deeper once you've finished the course.</p></header>
      <h2>YouTube channels</h2><div class="res-list">${R.channels.map(([n, u, d]) => `<a class="res" href="${esc(u)}" target="_blank" rel="noopener noreferrer"><b>${esc(n)} ${icon.ext}</b><span>${esc(d)}</span></a>`).join('')}</div>
      <h2>Books</h2><div class="res-list">${R.books.map(([t, a, d]) => `<div class="res"><b>${esc(t)}</b><span class="muted">${esc(a)}</span><span>${esc(d)}</span></div>`).join('')}</div>
      <h2>Daily reading &amp; data</h2><div class="res-list">${R.sites.map(([t, d]) => `<div class="res"><b>${esc(t)}</b><span>${esc(d)}</span></div>`).join('')}</div>
      <h2>Your data</h2><p class="small">Progress, flashcard boxes, notes and stories are stored only in this browser.</p>
      <div class="btn-row"><button class="btn ghost" id="reset1" type="button">Reset all progress</button></div><div id="reset-confirm"></div>`;
    document.getElementById('reset1').onclick = () => {
      document.getElementById('reset-confirm').innerHTML = `<div class="feedback bad">This permanently clears lessons, quiz scores, flashcards, notes and stories in this browser. <button class="btn bad sm" id="reset2" type="button">Yes, reset everything</button></div>`;
      document.getElementById('reset2').onclick = () => { S.clearAll(); location.hash = 'home'; route(); };
    };
  }

  function vNotFound() { setTitle('Not found'); view.innerHTML = `<header class="page-head"><h1>Page not found</h1><p class="lede">That page doesn't exist. <a href="#home">Back to the dashboard</a>.</p></header>`; }

  /* ---------------- Search ---------------- */
  const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ');
  const INDEX = [
    ...LESSONS.map(l => ({ type: 'Lesson', title: l.title, sub: l.module.title, href: 'lesson-' + l.id, text: (l.title + ' ' + l.summary + ' ' + strip(l.body)).toLowerCase(), raw: strip(l.body) })),
    ...Object.entries(T).map(([k, t]) => ({ type: 'Tool', title: t.name, sub: t.desc, href: 'tool-' + k, text: (t.name + ' ' + t.desc).toLowerCase() })),
    ...C.glossary.map(([a, b]) => ({ type: 'Glossary', title: a, sub: b, href: 'glossary', text: (a + ' ' + b).toLowerCase() })),
    ...ALLCARDS.map(c => ({ type: 'Flashcard', title: c.q, sub: c.a, href: 'flashcards-' + c.module.id, text: (c.q + ' ' + c.a).toLowerCase() }))
  ];
  const dlg = document.getElementById('search');
  const sIn = document.getElementById('search-input'), sRes = document.getElementById('search-results');
  let sel = 0, hits = [];
  function openSearch() { dlg.hidden = false; sIn.value = ''; doSearch(); setTimeout(() => sIn.focus(), 0); }
  function closeSearch() { dlg.hidden = true; }
  function doSearch() {
    const q = sIn.value.trim().toLowerCase();
    if (!q) { hits = []; sRes.innerHTML = '<p class="muted small pad">Search lessons, tools, glossary terms and flashcards. Try "beta", "goodwill" or "paper LBO".</p>'; return; }
    const terms = q.split(/\s+/);
    hits = INDEX.map(it => {
      if (!terms.every(t => it.text.includes(t))) return null;
      let s = 0; terms.forEach(t => { if (it.title.toLowerCase().includes(t)) s += 10; });
      s += { Lesson: 4, Tool: 3, Glossary: 2, Flashcard: 1 }[it.type];
      return { it, s };
    }).filter(Boolean).sort((a, b) => b.s - a.s).slice(0, 30).map(x => x.it);
    sel = 0;
    const snippet = (it) => {
      if (it.type !== 'Lesson') return esc(it.sub.slice(0, 140));
      const k = it.raw.toLowerCase().indexOf(terms[0]);
      return esc((k > 40 ? '…' : '') + it.raw.slice(Math.max(0, k - 40), k + 100) + '…');
    };
    sRes.innerHTML = hits.length ? hits.map((it, n) => `<a href="#${it.href}" class="s-hit${n === 0 ? ' sel' : ''}" data-n="${n}"><span class="s-type">${it.type}</span><b>${esc(it.title)}</b><span>${snippet(it)}</span></a>`).join('') : '<p class="muted small pad">No results.</p>';
    sRes.querySelectorAll('.s-hit').forEach(a => a.onclick = closeSearch);
  }
  sIn.addEventListener('input', doSearch);
  sIn.addEventListener('keydown', (e) => {
    const items = sRes.querySelectorAll('.s-hit');
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!items.length) return; sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; items.forEach((x, n) => x.classList.toggle('sel', n === sel)); items[sel].scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'Enter' && hits[sel]) { e.preventDefault(); location.hash = hits[sel].href; closeSearch(); }
  });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) closeSearch(); });
  document.getElementById('search-btn').onclick = openSearch;

  /* ---------------- Theme & mobile nav ---------------- */
  const root = document.documentElement;
  function applyTheme(t) { if (t) root.setAttribute('data-theme', t); else root.removeAttribute('data-theme'); }
  applyTheme(S.get('theme', null));
  document.getElementById('theme-btn').onclick = () => {
    const cur = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const nt = cur === 'dark' ? 'light' : 'dark'; applyTheme(nt); S.set('theme', nt);
  };
  const shell = document.getElementById('shell');
  document.getElementById('menu-btn').onclick = () => shell.classList.toggle('nav-open');
  document.getElementById('scrim').onclick = () => shell.classList.remove('nav-open');

  /* ---------------- Router ---------------- */
  let keyHandler = null, timer = null;
  const currentRoute = () => decodeURIComponent(location.hash.replace(/^#/, '')) || 'home';
  function route() {
    clearInterval(timer); keyHandler = null;
    const r = currentRoute();
    shell.classList.remove('nav-open');
    if (r === 'home') vHome();
    else if (r.startsWith('module-')) vModule(r.slice(7));
    else if (r.startsWith('lesson-')) vLesson(r.slice(7));
    else if (r.startsWith('quiz-')) vQuiz(r.slice(5));
    else if (r === 'flashcards') vFlash(null);
    else if (r.startsWith('flashcards-')) vFlash(r.slice(11));
    else if (r === 'mock') vMock();
    else if (r === 'tools') vTools();
    else if (r.startsWith('tool-')) vTool(r.slice(5));
    else if (r === 'glossary') vGlossary();
    else if (r === 'formulas') vFormulas();
    else if (r === 'resources') vResources();
    else vNotFound();
    renderNav(r);
    window.scrollTo(0, 0);
    view.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', route);
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); dlg.hidden ? openSearch() : closeSearch(); return; }
    if (e.key === 'Escape' && !dlg.hidden) { closeSearch(); return; }
    if (e.key === '/' && dlg.hidden && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); return; }
    if (keyHandler && dlg.hidden) keyHandler(e);
  });
  route();
})();
