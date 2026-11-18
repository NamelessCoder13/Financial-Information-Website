/* Shared utilities + interactive tools */
(function () {
  'use strict';

  /* ---------------- Utilities ---------------- */
  const Store = {
    get(key, def) {
      try { const v = localStorage.getItem('fic:' + key); return v == null ? def : JSON.parse(v); }
      catch (e) { return def; }
    },
    set(key, val) {
      try { localStorage.setItem('fic:' + key, JSON.stringify(val)); } catch (e) { /* storage unavailable */ }
    },
    clearAll() {
      try { Object.keys(localStorage).filter(k => k.startsWith('fic:')).forEach(k => localStorage.removeItem(k)); } catch (e) { /* ignore */ }
    }
  };

  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function num(n, dp = 0) {
    if (n == null || !isFinite(n)) return '–';
    return Number(n).toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });
  }
  // Financial format: negatives in parentheses
  function fin(n, dp = 1) {
    if (n == null || !isFinite(n)) return '–';
    if (Math.abs(n) < 0.5 * Math.pow(10, -dp)) return dp ? (0).toFixed(dp) : '0';
    const s = num(Math.abs(n), dp);
    return n < 0 ? '(' + s + ')' : s;
  }
  function signed(n, dp = 2) {
    if (n == null || !isFinite(n)) return '–';
    if (Math.abs(n) < 0.5 * Math.pow(10, -dp)) return '0';
    return (n > 0 ? '+' : '–') + num(Math.abs(n), dp);
  }
  const pct = (n, dp = 1) => (n == null || !isFinite(n)) ? '–' : (n * 100).toFixed(dp) + '%';
  const money = (n, dp = 2) => (n == null || !isFinite(n)) ? '–' : (n < 0 ? '–$' : '$') + num(Math.abs(n), dp);
  const cls = (n) => n > 1e-9 ? 'pos' : (n < -1e-9 ? 'neg' : '');

  function field(id, label, value, o = {}) {
    const step = o.step ?? 'any';
    const pre = o.prefix ? `<span class="affix">${o.prefix}</span>` : '';
    const suf = o.suffix ? `<span class="affix">${o.suffix}</span>` : '';
    return `<label class="field${o.wide ? ' wide' : ''}" for="${id}"><span class="field-label">${label}</span>
      <span class="input-wrap">${pre}<input id="${id}" class="input-hard" type="number" inputmode="decimal" step="${step}" value="${value}"${o.min != null ? ` min="${o.min}"` : ''}${o.max != null ? ` max="${o.max}"` : ''}>${suf}</span>
      ${o.hint ? `<span class="field-hint">${o.hint}</span>` : ''}</label>`;
  }
  function select(id, label, options, value) {
    return `<label class="field" for="${id}"><span class="field-label">${label}</span>
      <span class="input-wrap"><select id="${id}">${options.map(([v, t]) => `<option value="${v}"${String(v) === String(value) ? ' selected' : ''}>${t}</option>`).join('')}</select></span></label>`;
  }
  const v = (root, id) => { const e = root.querySelector('#' + id); if (!e) return 0; const x = parseFloat(e.value); return isFinite(x) ? x : 0; };
  const sv = (root, id) => { const e = root.querySelector('#' + id); return e ? e.value : ''; };
  function bindAll(root, fn) {
    root.addEventListener('input', fn);
    root.addEventListener('change', fn);
    fn();
  }

  function irr(cfs) {
    const npvAt = (r) => cfs.reduce((s, c, t) => s + c / Math.pow(1 + r, t), 0);
    let lo = -0.99, hi = 10, flo = npvAt(lo), fhi = npvAt(hi);
    if (!isFinite(flo) || !isFinite(fhi) || flo * fhi > 0) return NaN;
    for (let i = 0; i < 200; i++) {
      const mid = (lo + hi) / 2, f = npvAt(mid);
      if (Math.abs(f) < 1e-9) return mid;
      if (f * flo < 0) { hi = mid; fhi = f; } else { lo = mid; flo = f; }
    }
    return (lo + hi) / 2;
  }

  /* ---------------- Charts (inline SVG) ---------------- */
  function niceTicks(min, max, count = 5) {
    if (min === max) { min -= 1; max += 1; }
    const span = max - min;
    const raw = span / count;
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const norm = raw / mag;
    const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
    const lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step;
    const ticks = [];
    for (let t = lo; t <= hi + step * 0.5; t += step) ticks.push(Math.round(t / step) * step);
    return ticks;
  }

  function lineChart(container, o) {
    const W = 640, H = o.height || 260, L = 60, R = 18, T = 16, B = 42;
    const xs = o.xs;
    const all = o.series.flatMap(s => s.ys).filter(isFinite);
    let yMin = o.yMin ?? Math.min(...all), yMax = o.yMax ?? Math.max(...all);
    const yt = niceTicks(yMin, yMax, 5);
    yMin = yt[0]; yMax = yt[yt.length - 1];
    const xMin = xs[0], xMax = xs[xs.length - 1];
    const X = (x) => L + (x - xMin) / (xMax - xMin) * (W - L - R);
    const Y = (y) => T + (1 - (y - yMin) / (yMax - yMin)) * (H - T - B);
    const xt = o.xTicks || niceTicks(xMin, xMax, 6).filter(t => t >= xMin && t <= xMax);
    let s = `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="${esc(o.label || 'Chart')}">`;
    yt.forEach(t => { s += `<line x1="${L}" x2="${W - R}" y1="${Y(t)}" y2="${Y(t)}" class="grid"/><text x="${L - 8}" y="${Y(t) + 4}" text-anchor="end" class="tick">${o.yFmt(t)}</text>`; });
    xt.forEach(t => { s += `<text x="${X(t)}" y="${H - B + 18}" text-anchor="middle" class="tick">${o.xFmt(t)}</text>`; });
    s += `<line x1="${L}" x2="${W - R}" y1="${H - B}" y2="${H - B}" class="axis"/>`;
    if (o.xLabel) s += `<text x="${(L + W - R) / 2}" y="${H - 6}" text-anchor="middle" class="axis-label">${esc(o.xLabel)}</text>`;
    if (o.zero && yMin < 0 && yMax > 0) s += `<line x1="${L}" x2="${W - R}" y1="${Y(0)}" y2="${Y(0)}" class="zero"/>`;
    (o.vlines || []).forEach(vl => {
      if (vl.x >= xMin && vl.x <= xMax) s += `<line x1="${X(vl.x)}" x2="${X(vl.x)}" y1="${T}" y2="${H - B}" class="vline"/><text x="${X(vl.x) + 5}" y="${T + 12}" class="tick strong">${esc(vl.label)}</text>`;
    });
    o.series.forEach((se) => {
      let d = '';
      se.ys.forEach((y, i) => { if (isFinite(y)) d += (d ? 'L' : 'M') + X(xs[i]).toFixed(1) + ',' + Y(Math.max(yMin, Math.min(yMax, y))).toFixed(1); });
      s += `<path d="${d}" fill="none" stroke="${se.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"${se.dash ? ' stroke-dasharray="6 5"' : ''}/>`;
    });
    (o.points || []).forEach(p => { s += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="5" fill="${p.color}" stroke="var(--surface)" stroke-width="2"/>`; });
    s += `<line class="xhair" x1="0" x2="0" y1="${T}" y2="${H - B}" visibility="hidden"/>`;
    o.series.forEach((se, i) => { s += `<circle class="hdot" data-i="${i}" r="4.5" fill="${se.color}" stroke="var(--surface)" stroke-width="2" visibility="hidden"/>`; });
    s += `<rect class="hit" x="${L}" y="${T}" width="${W - L - R}" height="${H - T - B}" fill="transparent"/></svg>`;
    const legend = o.series.length > 1 ? `<div class="legend">${o.series.map(se => `<span><i style="background:${se.color}"${se.dash ? ' class="dashed"' : ''}></i>${esc(se.name)}</span>`).join('')}</div>` : '';
    container.innerHTML = `<div class="chart-wrap">${legend}${s}<div class="tooltip" hidden></div></div>`;
    const svg = container.querySelector('svg'), tip = container.querySelector('.tooltip'), xh = svg.querySelector('.xhair');
    const dots = svg.querySelectorAll('.hdot');
    const hit = svg.querySelector('.hit');
    function move(ev) {
      const r = svg.getBoundingClientRect();
      const sx = (ev.clientX - r.left) / r.width * W;
      let best = 0, bd = Infinity;
      xs.forEach((x, i) => { const d = Math.abs(X(x) - sx); if (d < bd) { bd = d; best = i; } });
      const px = X(xs[best]);
      xh.setAttribute('x1', px); xh.setAttribute('x2', px); xh.setAttribute('visibility', 'visible');
      dots.forEach((dt, i) => { const y = o.series[i].ys[best]; if (isFinite(y) && y >= yMin && y <= yMax) { dt.setAttribute('cx', px); dt.setAttribute('cy', Y(y)); dt.setAttribute('visibility', 'visible'); } else dt.setAttribute('visibility', 'hidden'); });
      tip.innerHTML = `<div class="tt-h">${esc(o.xFmt(xs[best], true))}</div>` + o.series.map(se => `<div class="tt-r"><i style="background:${se.color}"></i>${esc(se.name)}<b>${esc(o.yFmt(se.ys[best], true))}</b></div>`).join('');
      tip.hidden = false;
      const wrapR = container.querySelector('.chart-wrap').getBoundingClientRect();
      const left = (px / W) * r.width + (r.left - wrapR.left);
      tip.style.left = Math.min(Math.max(left + 12, 0), wrapR.width - tip.offsetWidth - 4) + 'px';
      tip.style.top = (r.top - wrapR.top + 10) + 'px';
    }
    function leave() { tip.hidden = true; xh.setAttribute('visibility', 'hidden'); dots.forEach(d => d.setAttribute('visibility', 'hidden')); }
    hit.addEventListener('pointermove', move);
    hit.addEventListener('pointerdown', move);
    hit.addEventListener('pointerleave', leave);
  }

  function barChart(container, o) {
    // o: { items: [{label, value, color}], fmt, horizontal }
    const items = o.items;
    const W = o.width || 640, rowH = 34;
    if (o.horizontal) {
      const L = 150, R = 64, T = 8;
      const H = T + items.length * rowH + 8;
      const maxAbs = Math.max(...items.map(i => Math.abs(i.value)), 1e-9);
      const hasNeg = items.some(i => i.value < 0);
      const zeroX = hasNeg ? L + (W - L - R) * 0.3 : L;
      const scale = (hasNeg ? (W - L - R) * 0.7 : (W - L - R)) / maxAbs;
      let s = `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="${esc(o.label || 'Bar chart')}">`;
      s += `<line x1="${zeroX}" x2="${zeroX}" y1="${T - 4}" y2="${H - 4}" class="axis"/>`;
      items.forEach((it, i) => {
        const y = T + i * rowH + 6, w = Math.abs(it.value) * scale, x = it.value >= 0 ? zeroX : zeroX - w;
        s += `<g class="bar" data-i="${i}"><rect x="0" y="${y - 6}" width="${W}" height="${rowH}" fill="transparent"/>`;
        s += `<text x="${L - 10}" y="${y + 15}" text-anchor="end" class="tick">${esc(it.label)}</text>`;
        s += `<rect x="${x}" y="${y}" width="${Math.max(w, 1)}" height="20" rx="3" fill="${it.color}"/>`;
        s += `<text x="${it.value >= 0 ? x + w + 6 : x - 6}" y="${y + 15}" text-anchor="${it.value >= 0 ? 'start' : 'end'}" class="tick strong">${esc(o.fmt(it.value))}</text></g>`;
      });
      s += '</svg>';
      container.innerHTML = `<div class="chart-wrap">${s}</div>`;
      return;
    }
    const H = 240, L = 56, R = 12, T = 14, B = 40;
    const vals = items.map(i => i.value);
    const yt = niceTicks(Math.min(0, ...vals), Math.max(0, ...vals), 5);
    const yMin = yt[0], yMax = yt[yt.length - 1];
    const Y = (y) => T + (1 - (y - yMin) / (yMax - yMin)) * (H - T - B);
    const slot = (W - L - R) / items.length, bw = Math.min(56, slot * 0.6);
    let s = `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="${esc(o.label || 'Bar chart')}">`;
    yt.forEach(t => { s += `<line x1="${L}" x2="${W - R}" y1="${Y(t)}" y2="${Y(t)}" class="grid"/><text x="${L - 8}" y="${Y(t) + 4}" text-anchor="end" class="tick">${o.fmt(t)}</text>`; });
    s += `<line x1="${L}" x2="${W - R}" y1="${Y(0)}" y2="${Y(0)}" class="axis"/>`;
    items.forEach((it, i) => {
      const cx = L + slot * (i + 0.5), y0 = Y(0), y1 = Y(it.value);
      const top = Math.min(y0, y1), h = Math.max(Math.abs(y1 - y0), 1);
      s += `<g class="bar" data-i="${i}"><rect x="${cx - slot / 2}" y="${T}" width="${slot}" height="${H - T - B}" fill="transparent"/>`;
      s += `<rect x="${cx - bw / 2}" y="${top}" width="${bw}" height="${h}" rx="3" fill="${it.color}"/>`;
      s += `<text x="${cx}" y="${H - B + 18}" text-anchor="middle" class="tick">${esc(it.label)}</text></g>`;
    });
    s += '</svg>';
    const legend = o.legend ? `<div class="legend">${o.legend.map(l => `<span><i style="background:${l[1]}"></i>${esc(l[0])}</span>`).join('')}</div>` : '';
    container.innerHTML = `<div class="chart-wrap">${legend}${s}<div class="tooltip" hidden></div></div>`;
    const tip = container.querySelector('.tooltip'), svg = container.querySelector('svg');
    svg.querySelectorAll('.bar').forEach(g => {
      const show = (ev) => {
        const it = items[+g.dataset.i];
        tip.innerHTML = `<div class="tt-h">${esc(it.label)}</div><div class="tt-r"><i style="background:${it.color}"></i>${esc(it.series || 'Value')}<b>${esc(o.fmt(it.value))}</b></div>`;
        tip.hidden = false;
        const wr = container.querySelector('.chart-wrap').getBoundingClientRect();
        tip.style.left = Math.min(ev.clientX - wr.left + 12, wr.width - tip.offsetWidth - 4) + 'px';
        tip.style.top = Math.max(ev.clientY - wr.top - 50, 0) + 'px';
      };
      g.addEventListener('pointermove', show);
      g.addEventListener('pointerdown', show);
      g.addEventListener('pointerleave', () => { tip.hidden = true; });
    });
  }

  /* ---------------- Tool: Statement simulator ---------------- */
  const EVENTS = [
    { id: 'dep', group: 'Non-cash expenses', name: 'Depreciation increases', why: 'Depreciation is non-cash but tax-deductible, so the only cash effect is the tax saving.',
      f: (x, t) => ({ is: [['Depreciation expense', x], ['Pre-tax income', -x], ['Tax expense', -t * x], ['Net income', -x * (1 - t)]],
        cfs: [['Net income', -x * (1 - t)], ['+ Depreciation (non-cash)', x]], A: [['PP&E, net', -x]], LE: [['Retained earnings', -x * (1 - t)]] }) },
    { id: 'invwd', group: 'Non-cash expenses', name: 'Inventory is written down', why: 'A write-down is a non-cash, tax-deductible expense, just like depreciation.',
      f: (x, t) => ({ is: [['Write-down (COGS)', x], ['Pre-tax income', -x], ['Tax expense', -t * x], ['Net income', -x * (1 - t)]],
        cfs: [['Net income', -x * (1 - t)], ['+ Write-down (non-cash)', x]], A: [['Inventory', -x]], LE: [['Retained earnings', -x * (1 - t)]] }) },
    { id: 'ppeimp', group: 'Non-cash expenses', name: 'PP&E impairment (tax-deductible)', why: 'Treated like an accelerated depreciation charge: non-cash, with a tax saving.',
      f: (x, t) => ({ is: [['Impairment charge', x], ['Pre-tax income', -x], ['Tax expense', -t * x], ['Net income', -x * (1 - t)]],
        cfs: [['Net income', -x * (1 - t)], ['+ Impairment (non-cash)', x]], A: [['PP&E, net', -x]], LE: [['Retained earnings', -x * (1 - t)]] }) },
    { id: 'gwimp', group: 'Non-cash expenses', name: 'Goodwill impairment (not deductible)', why: 'Goodwill impairments are generally not tax-deductible, so taxes and cash do not change.',
      f: (x) => ({ is: [['Impairment charge', x], ['Pre-tax income', -x], ['Tax expense', 0], ['Net income', -x]],
        cfs: [['Net income', -x], ['+ Impairment (non-cash)', x]], A: [['Goodwill', -x]], LE: [['Retained earnings', -x]] }) },
    { id: 'sbc', group: 'Non-cash expenses', name: 'Stock-based compensation is recorded', why: 'SBC is a non-cash expense paid in shares, so equity rises through common stock/APIC while retained earnings falls.',
      f: (x, t) => ({ is: [['SBC expense', x], ['Pre-tax income', -x], ['Tax expense', -t * x], ['Net income', -x * (1 - t)]],
        cfs: [['Net income', -x * (1 - t)], ['+ Stock-based comp (non-cash)', x]], A: [], LE: [['Common stock & APIC', x], ['Retained earnings', -x * (1 - t)]] }) },
    { id: 'invcash', group: 'Working capital', name: 'Buy inventory with cash', why: 'Nothing is sold yet, so there is no expense; cash simply converts into inventory.',
      f: (x) => ({ is: [], cfs: [['Increase in inventory', -x]], A: [['Inventory', x]], LE: [] }) },
    { id: 'invcredit', group: 'Working capital', name: 'Buy inventory on credit (AP)', why: 'Inventory and accounts payable both rise; the working-capital changes offset, so cash is unchanged.',
      f: (x) => ({ is: [], cfs: [['Increase in inventory', -x], ['Increase in accounts payable', x]], A: [['Inventory', x]], LE: [['Accounts payable', x]] }) },
    { id: 'ar', group: 'Working capital', name: 'Sale on credit (AR increases)', why: 'Revenue is earned and taxed now, but cash has not been collected, so cash falls by the tax paid.',
      f: (x, t) => ({ is: [['Revenue', x], ['Pre-tax income', x], ['Tax expense', t * x], ['Net income', x * (1 - t)]],
        cfs: [['Net income', x * (1 - t)], ['Increase in accounts receivable', -x]], A: [['Accounts receivable', x]], LE: [['Retained earnings', x * (1 - t)]] }) },
    { id: 'arcollect', group: 'Working capital', name: 'Collect cash from receivables', why: 'Revenue was already recognized; collecting it just converts AR into cash.',
      f: (x) => ({ is: [], cfs: [['Decrease in accounts receivable', x]], A: [['Accounts receivable', -x]], LE: [] }) },
    { id: 'defrev', group: 'Working capital', name: 'Customer prepays (deferred revenue)', why: 'Cash arrives before it is earned, so it sits in deferred revenue, a liability.',
      f: (x) => ({ is: [], cfs: [['Increase in deferred revenue', x]], A: [], LE: [['Deferred revenue', x]] }) },
    { id: 'defrec', group: 'Working capital', name: 'Deferred revenue is recognized', why: 'Revenue is earned now on cash received earlier, so the only cash effect is the tax on it.',
      f: (x, t) => ({ is: [['Revenue', x], ['Pre-tax income', x], ['Tax expense', t * x], ['Net income', x * (1 - t)]],
        cfs: [['Net income', x * (1 - t)], ['Decrease in deferred revenue', -x]], A: [], LE: [['Deferred revenue', -x], ['Retained earnings', x * (1 - t)]] }) },
    { id: 'accrued', group: 'Working capital', name: 'Expense accrued but not yet paid', why: 'The expense hits income now, but the cash is not paid yet, so accrued liabilities rise.',
      f: (x, t) => ({ is: [['Operating expense', x], ['Pre-tax income', -x], ['Tax expense', -t * x], ['Net income', -x * (1 - t)]],
        cfs: [['Net income', -x * (1 - t)], ['Increase in accrued expenses', x]], A: [], LE: [['Accrued expenses', x], ['Retained earnings', -x * (1 - t)]] }) },
    { id: 'capex', group: 'Investing', name: 'Buy PP&E with cash (capex)', why: 'Capex is capitalized onto the balance sheet; it is expensed over time through depreciation.',
      f: (x) => ({ is: [], cfs: [['Capital expenditures (CFI)', -x]], A: [['PP&E, net', x]], LE: [] }) },
    { id: 'sellppe', group: 'Investing', name: 'Sell PP&E (enter book value and sale price)', p2: { label: 'Sale price', def: 15 }, why: 'The gain is taxed and appears on the income statement, but it is subtracted in CFO because the full proceeds show up in CFI.',
      f: (x, t, p) => { const g = p - x; return { is: [['Gain (loss) on sale', g], ['Pre-tax income', g], ['Tax expense', t * g], ['Net income', g * (1 - t)]],
        cfs: [['Net income', g * (1 - t)], ['– Gain on sale (CFO)', -g], ['Proceeds from sale (CFI)', p]], A: [['PP&E, net', -x]], LE: [['Retained earnings', g * (1 - t)]] }; } },
    { id: 'debt', group: 'Financing', name: 'Raise debt', why: 'Borrowing is a financing inflow; nothing touches the income statement until interest accrues.',
      f: (x) => ({ is: [], cfs: [['Debt issued (CFF)', x]], A: [], LE: [['Debt', x]] }) },
    { id: 'repay', group: 'Financing', name: 'Repay debt principal', why: 'Principal repayment is a financing outflow, not an expense.',
      f: (x) => ({ is: [], cfs: [['Debt repaid (CFF)', -x]], A: [], LE: [['Debt', -x]] }) },
    { id: 'interest', group: 'Financing', name: 'Pay interest expense in cash', why: 'Interest is a tax-deductible cash expense, so cash falls by the after-tax amount.',
      f: (x, t) => ({ is: [['Interest expense', x], ['Pre-tax income', -x], ['Tax expense', -t * x], ['Net income', -x * (1 - t)]],
        cfs: [['Net income', -x * (1 - t)]], A: [], LE: [['Retained earnings', -x * (1 - t)]] }) },
    { id: 'equity', group: 'Financing', name: 'Issue new shares', why: 'Equity issuance is a financing inflow that raises common stock/APIC.',
      f: (x) => ({ is: [], cfs: [['Shares issued (CFF)', x]], A: [], LE: [['Common stock & APIC', x]] }) },
    { id: 'div', group: 'Financing', name: 'Pay a dividend', why: 'Dividends are a distribution of profits, not an expense, so they bypass the income statement.',
      f: (x) => ({ is: [], cfs: [['Dividends paid (CFF)', -x]], A: [], LE: [['Retained earnings', -x]] }) },
    { id: 'buyback', group: 'Financing', name: 'Buy back shares', why: 'Repurchased shares are recorded as treasury stock, a reduction in equity.',
      f: (x) => ({ is: [], cfs: [['Share repurchase (CFF)', -x]], A: [], LE: [['Treasury stock', -x]] }) }
  ];

  function toolStatements(root) {
    const groups = [...new Set(EVENTS.map(e => e.group))];
    const saved = Store.get('tool:statements', { ev: 'dep', x: 10, t: 25, p: 15 });
    root.innerHTML = `
      <div class="tool-controls">
        <label class="field wide" for="st-ev"><span class="field-label">Event</span><span class="input-wrap"><select id="st-ev">
          ${groups.map(g => `<optgroup label="${g}">${EVENTS.filter(e => e.group === g).map(e => `<option value="${e.id}"${e.id === saved.ev ? ' selected' : ''}>${e.name}</option>`).join('')}</optgroup>`).join('')}
        </select></span></label>
        ${field('st-x', 'Amount', saved.x, { prefix: '$' })}
        ${field('st-t', 'Tax rate', saved.t, { suffix: '%' })}
        <span id="st-p2wrap">${field('st-p', 'Sale price', saved.p, { prefix: '$' })}</span>
      </div>
      <div class="st-grid" id="st-out"></div>
      <div id="st-check"></div>
      <div class="say" id="st-say"></div>`;
    const out = root.querySelector('#st-out'), chk = root.querySelector('#st-check'), say = root.querySelector('#st-say');
    function list(rows, emptyText) {
      if (!rows.length) return `<div class="st-empty">${emptyText}</div>`;
      return rows.map(([l, val, strong]) => `<div class="st-row${strong ? ' strong' : ''}"><span>${esc(l)}</span><span class="${cls(val)}">${signed(val)}</span></div>`).join('');
    }
    bindAll(root, () => {
      const ev = EVENTS.find(e => e.id === sv(root, 'st-ev'));
      const x = v(root, 'st-x'), t = v(root, 'st-t') / 100, p = v(root, 'st-p');
      root.querySelector('#st-p2wrap').hidden = !ev.p2;
      if (ev.p2) root.querySelector('label[for="st-x"] .field-label').textContent = 'Book value'; else root.querySelector('label[for="st-x"] .field-label').textContent = 'Amount';
      Store.set('tool:statements', { ev: ev.id, x, t: t * 100, p });
      const r = ev.f(x, t, p);
      const cash = r.cfs.reduce((s, c) => s + c[1], 0);
      const ni = (r.is.find(i => i[0] === 'Net income') || [0, 0])[1];
      const A = [['Cash', cash], ...r.A];
      const totA = A.reduce((s, c) => s + c[1], 0), totLE = r.LE.reduce((s, c) => s + c[1], 0);
      const isRows = r.is.map(row => [row[0], row[1], row[0] === 'Net income']);
      out.innerHTML = `
        <section class="st-card"><h4>Income statement</h4>${list(isRows, 'No impact. Nothing is earned or expensed.')}</section>
        <section class="st-card"><h4>Cash flow statement</h4>${list(r.cfs, '')}<div class="st-row strong total"><span>Net change in cash</span><span class="${cls(cash)}">${signed(cash)}</span></div></section>
        <section class="st-card"><h4>Balance sheet</h4>
          <div class="st-sub">Assets</div>${list(A, '')}<div class="st-row strong total"><span>Total assets</span><span class="${cls(totA)}">${signed(totA)}</span></div>
          <div class="st-sub">Liabilities &amp; equity</div>${list(r.LE, 'No change')}<div class="st-row strong total"><span>Total L + E</span><span class="${cls(totLE)}">${signed(totLE)}</span></div>
        </section>`;
      const ok = Math.abs(totA - totLE) < 1e-6;
      chk.innerHTML = `<div class="balance ${ok ? 'ok' : 'bad'}">${ok ? '✓ Balance sheet balances' : '✗ Does not balance'}: assets ${signed(totA)} = liabilities + equity ${signed(totLE)}</div>`;
      const isTxt = r.is.length ? `On the income statement, net income ${ni >= 0 ? 'rises' : 'falls'} by $${num(Math.abs(ni), 2)}${t && Math.abs(ni) > 0 && ev.id !== 'gwimp' ? ` (a pre-tax change of $${num(Math.abs(r.is[1][1]), 2)} at a ${num(t * 100, 0)}% tax rate)` : ''}.` : 'There is no income statement impact.';
      const cfsTxt = `On the cash flow statement, ${r.cfs.map(c => c[0].replace(/^[+–] /, '').toLowerCase() + ' ' + signed(c[1])).join(', ')}, so cash ${Math.abs(cash) < 1e-9 ? 'is unchanged' : (cash > 0 ? 'is up' : 'is down') + ' $' + num(Math.abs(cash), 2)}.`;
      const bsTxt = `On the balance sheet, assets change by ${signed(totA)} and liabilities plus equity by ${signed(totLE)}, so it balances.`;
      say.innerHTML = `<div class="say-label">How to say it</div><p>${esc(isTxt + ' ' + cfsTxt + ' ' + bsTxt)}</p><p class="small"><strong>Why:</strong> ${esc(ev.why)}</p>`;
    });
  }

  /* ---------------- Tool: EV bridge ---------------- */
  function toolEV(root) {
    root.innerHTML = `
      <div class="tool-cols">
        <div>
          <h4 class="tool-h">Share count</h4>
          <div class="tool-controls">
            ${field('ev-p', 'Share price', 50, { prefix: '$' })}
            ${field('ev-sh', 'Basic shares (m)', 100)}
            ${field('ev-o1', 'Options tranche 1 (m)', 6)}
            ${field('ev-k1', 'Strike 1', 30, { prefix: '$' })}
            ${field('ev-o2', 'Options tranche 2 (m)', 4)}
            ${field('ev-k2', 'Strike 2', 60, { prefix: '$' })}
            ${field('ev-rsu', 'RSUs (m)', 2)}
            ${field('ev-cv', 'Convertible face ($m)', 200)}
            ${field('ev-cp', 'Conversion price', 40, { prefix: '$' })}
          </div>
          <h4 class="tool-h">Bridge items ($m)</h4>
          <div class="tool-controls">
            ${field('ev-debt', 'Debt (excl. convert)', 1500)}
            ${field('ev-pref', 'Preferred stock', 100)}
            ${field('ev-nci', 'Noncontrolling interest', 150)}
            ${field('ev-cash', 'Cash & equivalents', 600)}
            ${field('ev-inv', 'Equity investments', 250)}
            ${field('ev-ebitda', 'LTM EBITDA', 900)}
            ${field('ev-ni', 'LTM net income', 400)}
          </div>
        </div>
        <div id="ev-out"></div>
      </div>`;
    const out = root.querySelector('#ev-out');
    bindAll(root, () => {
      const P = v(root, 'ev-p'), sh = v(root, 'ev-sh');
      const tr = [[v(root, 'ev-o1'), v(root, 'ev-k1')], [v(root, 'ev-o2'), v(root, 'ev-k2')]];
      let rows = '', optNet = 0;
      tr.forEach(([n, k], i) => {
        const itm = P > k && n > 0;
        const net = itm ? n - n * k / P : 0;
        optNet += net;
        rows += `<tr><td>Tranche ${i + 1}: ${num(n, 1)}m @ $${num(k, 2)}</td><td>${itm ? `${num(n, 2)} – ${num(n * k / P, 2)} repurchased` : 'Out of the money, excluded'}</td><td>${num(net, 2)}</td></tr>`;
      });
      const rsu = v(root, 'ev-rsu');
      const cvF = v(root, 'ev-cv'), cvP = v(root, 'ev-cp');
      const cvItm = cvP > 0 && P > cvP;
      const cvSh = cvItm ? cvF / cvP : 0;
      rows += `<tr><td>RSUs</td><td>Added in full</td><td>${num(rsu, 2)}</td></tr>`;
      rows += `<tr><td>Convertible: $${num(cvF)}m @ $${num(cvP, 2)}</td><td>${cvItm ? 'In the money: treat as converted' : 'Out of the money: counted as debt'}</td><td>${num(cvSh, 2)}</td></tr>`;
      const dil = sh + optNet + rsu + cvSh;
      const eq = dil * P;
      const debt = v(root, 'ev-debt') + (cvItm ? 0 : cvF);
      const pref = v(root, 'ev-pref'), nci = v(root, 'ev-nci'), cash = v(root, 'ev-cash'), inv = v(root, 'ev-inv');
      const ev = eq + debt + pref + nci - cash - inv;
      const ebitda = v(root, 'ev-ebitda'), ni = v(root, 'ev-ni');
      out.innerHTML = `
        <h4 class="tool-h">Treasury stock method</h4>
        <div class="table-scroll"><table class="fin num"><thead><tr><th>Security</th><th>Treatment</th><th>Net new shares (m)</th></tr></thead>
        <tbody><tr><td>Basic shares</td><td></td><td>${num(sh, 2)}</td></tr>${rows}
        <tr class="total"><td>Diluted shares</td><td></td><td>${num(dil, 2)}</td></tr></tbody></table></div>
        <h4 class="tool-h">Equity value → enterprise value ($m)</h4>
        <div class="statement">
          <div class="row"><span>Diluted equity value (${num(dil, 1)}m × $${num(P, 2)})</span><span>${fin(eq)}</span></div>
          <div class="row sub"><span>+ Debt${cvItm ? '' : ' (incl. convertible)'}</span><span>${fin(debt)}</span></div>
          <div class="row sub"><span>+ Preferred stock</span><span>${fin(pref)}</span></div>
          <div class="row sub"><span>+ Noncontrolling interest</span><span>${fin(nci)}</span></div>
          <div class="row sub"><span>– Cash</span><span>${fin(-cash)}</span></div>
          <div class="row sub"><span>– Equity investments</span><span>${fin(-inv)}</span></div>
          <div class="row total grand"><span>Enterprise value</span><span>${fin(ev)}</span></div>
        </div>
        <div class="kpis">
          <div class="kpi"><span>EV / EBITDA</span><b>${ebitda ? num(ev / ebitda, 1) + 'x' : '–'}</b></div>
          <div class="kpi"><span>P / E</span><b>${ni ? num(eq / ni, 1) + 'x' : '–'}</b></div>
          <div class="kpi"><span>Dilution vs. basic</span><b>${pct(dil / sh - 1)}</b></div>
        </div>`;
    });
  }

  /* ---------------- Tool: NPV / IRR ---------------- */
  function toolTVM(root) {
    const saved = Store.get('tool:tvm', { r: 10, cfs: [-1000, 400, 400, 400] });
    root.innerHTML = `
      <div class="tool-controls">${field('tv-r', 'Discount rate', saved.r, { suffix: '%' })}</div>
      <h4 class="tool-h">Cash flows</h4>
      <div class="cf-row" id="tv-cfs"></div>
      <div class="btn-row"><button class="btn ghost" id="tv-add" type="button">+ Add year</button><button class="btn ghost" id="tv-rem" type="button">– Remove year</button><button class="btn ghost" id="tv-ex" type="button">Load PE-style example</button></div>
      <div class="kpis" id="tv-k"></div>
      <div id="tv-chart"></div>
      <h4 class="tool-h">Growing perpetuity</h4>
      <div class="tool-controls">${field('tv-c1', 'Next-year cash flow', 4, { prefix: '$' })}${field('tv-pr', 'Discount rate', 8, { suffix: '%' })}${field('tv-pg', 'Growth rate', 3, { suffix: '%' })}</div>
      <div class="kpis" id="tv-perp"></div>`;
    const wrap = root.querySelector('#tv-cfs');
    let cfs = saved.cfs.slice();
    function draw() {
      wrap.innerHTML = cfs.map((c, i) => `<label class="field cf" for="tv-cf${i}"><span class="field-label">Year ${i}</span><span class="input-wrap"><input id="tv-cf${i}" class="input-hard" type="number" step="any" value="${c}"></span></label>`).join('');
    }
    draw();
    root.querySelector('#tv-add').onclick = () => { cfs.push(cfs[cfs.length - 1] > 0 ? cfs[cfs.length - 1] : 100); draw(); calc(); };
    root.querySelector('#tv-rem').onclick = () => { if (cfs.length > 2) { cfs.pop(); draw(); calc(); } };
    root.querySelector('#tv-ex').onclick = () => { cfs = [-500, 0, 0, 0, 0, 1250]; draw(); calc(); };
    function calc() {
      cfs = cfs.map((_, i) => v(root, 'tv-cf' + i));
      const r = v(root, 'tv-r') / 100;
      Store.set('tool:tvm', { r: r * 100, cfs });
      const npv = cfs.reduce((s, c, t) => s + c / Math.pow(1 + r, t), 0);
      const ir = irr(cfs);
      const inv = -cfs.filter(c => c < 0).reduce((s, c) => s + c, 0);
      const ret = cfs.filter(c => c > 0).reduce((s, c) => s + c, 0);
      let cum = 0, pay = null;
      for (let i = 0; i < cfs.length; i++) { const prev = cum; cum += cfs[i]; if (pay == null && cum >= 0 && i > 0) { pay = i - 1 + (cfs[i] ? -prev / cfs[i] : 0); } }
      root.querySelector('#tv-k').innerHTML = `
        <div class="kpi"><span>NPV @ ${num(r * 100, 1)}%</span><b class="${cls(npv)}">${money(npv, 1)}</b></div>
        <div class="kpi"><span>IRR</span><b>${isFinite(ir) ? pct(ir) : 'n/a'}</b></div>
        <div class="kpi"><span>MOIC</span><b>${inv ? num(ret / inv, 2) + 'x' : '–'}</b></div>
        <div class="kpi"><span>Payback</span><b>${pay != null ? num(pay, 1) + ' yrs' : 'Never'}</b></div>
        <div class="kpi wide"><span>Decision</span><b>${npv > 0 ? 'Accept: NPV &gt; 0, returns exceed the discount rate' : 'Reject: NPV ≤ 0'}</b></div>`;
      const rates = []; for (let k = 0; k <= 40; k++) rates.push(k);
      lineChart(root.querySelector('#tv-chart'), {
        label: 'NPV profile', xs: rates, series: [{ name: 'NPV', color: 'var(--viz-1)', ys: rates.map(k => cfs.reduce((s, c, t) => s + c / Math.pow(1 + k / 100, t), 0)) }],
        xFmt: (x) => x + '%', yFmt: (y, full) => full ? money(y, 1) : num(y, 0), xLabel: 'Discount rate', zero: true,
        vlines: isFinite(ir) && ir * 100 <= 40 && ir >= 0 ? [{ x: ir * 100, label: 'IRR ' + pct(ir) }] : []
      });
      const c1 = v(root, 'tv-c1'), pr = v(root, 'tv-pr') / 100, pg = v(root, 'tv-pg') / 100;
      root.querySelector('#tv-perp').innerHTML = pr > pg
        ? `<div class="kpi"><span>Value = C₁ / (r – g)</span><b>${money(c1 / (pr - pg), 2)}</b></div><div class="kpi"><span>Implied multiple of C₁</span><b>${num(1 / (pr - pg), 1)}x</b></div>`
        : `<div class="kpi wide"><span>Invalid</span><b class="neg">The discount rate must exceed the growth rate.</b></div>`;
    }
    bindAll(root, calc);
  }

  /* ---------------- Tool: WACC ---------------- */
  function toolWACC(root) {
    root.innerHTML = `
      <div class="tool-cols">
        <div class="tool-controls">
          ${field('w-rf', 'Risk-free rate', 4.0, { suffix: '%' })}
          ${field('w-erp', 'Equity risk premium', 5.5, { suffix: '%' })}
          ${field('w-bu', 'Unlevered beta (peer median)', 0.9)}
          ${field('w-de', 'Target debt / equity', 0.5, { hint: '0.5 means 33% debt, 67% equity' })}
          ${field('w-t', 'Tax rate', 25, { suffix: '%' })}
          ${field('w-kd', 'Pre-tax cost of debt', 6.0, { suffix: '%' })}
          ${field('w-sp', 'Size / country premium', 0, { suffix: '%' })}
        </div>
        <div id="w-out"></div>
      </div>
      <h4 class="tool-h">How capital structure changes WACC</h4>
      <p class="small">Illustrative: assumes the pre-tax cost of debt climbs as leverage rises (default risk), and equity gets riskier through the Hamada formula.</p>
      <div id="w-chart"></div>`;
    bindAll(root, () => {
      const rf = v(root, 'w-rf') / 100, erp = v(root, 'w-erp') / 100, bu = v(root, 'w-bu'), de = v(root, 'w-de'), t = v(root, 'w-t') / 100, kd0 = v(root, 'w-kd') / 100, sp = v(root, 'w-sp') / 100;
      const calc = (d, kd) => { const bl = bu * (1 + (1 - t) * d); const ke = rf + bl * erp + sp; const wd = d / (1 + d); return { bl, ke, kdat: kd * (1 - t), wd, we: 1 - wd, wacc: (1 - wd) * ke + wd * kd * (1 - t) }; };
      const r = calc(de, kd0);
      root.querySelector('#w-out').innerHTML = `
        <div class="statement">
          <div class="row"><span>Relevered beta = ${num(bu, 2)} × [1 + (1 – ${num(t * 100, 0)}%) × ${num(de, 2)}]</span><span>${num(r.bl, 3)}</span></div>
          <div class="row"><span>Cost of equity = ${pct(rf)} + ${num(r.bl, 2)} × ${pct(erp)}${sp ? ' + ' + pct(sp) : ''}</span><span>${pct(r.ke, 2)}</span></div>
          <div class="row"><span>After-tax cost of debt = ${pct(kd0)} × (1 – ${pct(t, 0)})</span><span>${pct(r.kdat, 2)}</span></div>
          <div class="row"><span>Weights: equity / debt</span><span>${pct(r.we)} / ${pct(r.wd)}</span></div>
          <div class="row total grand"><span>WACC</span><span>${pct(r.wacc, 2)}</span></div>
        </div>`;
      const xs = []; for (let k = 0; k <= 30; k++) xs.push(k / 10);
      const kdAt = (d) => kd0 * (1 + 0.15 * d * d);
      const rows = xs.map(d => calc(d, kdAt(d)));
      lineChart(root.querySelector('#w-chart'), {
        label: 'WACC versus debt to equity', xs,
        series: [
          { name: 'Cost of equity', color: 'var(--viz-2)', ys: rows.map(x => x.ke * 100) },
          { name: 'WACC', color: 'var(--viz-1)', ys: rows.map(x => x.wacc * 100) },
          { name: 'After-tax cost of debt', color: 'var(--viz-3)', ys: rows.map(x => x.kdat * 100) }
        ],
        xFmt: (x, full) => full ? 'D/E ' + num(x, 1) + 'x' : num(x, 1) + 'x', yFmt: (y, full) => num(y, full ? 2 : 0) + '%', xLabel: 'Debt / equity',
        vlines: [{ x: Math.min(3, Math.max(0, Math.round(de * 10) / 10)), label: 'Your D/E' }]
      });
    });
  }

  /* ---------------- Tool: DCF ---------------- */
  function toolDCF(root) {
    root.innerHTML = `
      <div class="tool-controls dense">
        ${field('d-rev', 'LTM revenue ($m)', 1000)}
        ${field('d-g1', 'Growth, year 1', 12, { suffix: '%' })}
        ${field('d-g5', 'Growth, year 5', 5, { suffix: '%', hint: 'Fades linearly from year 1' })}
        ${field('d-m', 'EBITDA margin', 25, { suffix: '%' })}
        ${field('d-da', 'D&A % of revenue', 4, { suffix: '%' })}
        ${field('d-cx', 'Capex % of revenue', 5, { suffix: '%' })}
        ${field('d-nwc', 'NWC % of Δ revenue', 10, { suffix: '%' })}
        ${field('d-t', 'Tax rate', 25, { suffix: '%' })}
        ${field('d-w', 'WACC', 9, { suffix: '%' })}
        ${field('d-tg', 'Terminal growth', 2.5, { suffix: '%' })}
        ${field('d-xm', 'Exit EV/EBITDA', 10, { suffix: 'x' })}
        ${select('d-meth', 'Terminal value method', [['g', 'Perpetuity growth'], ['x', 'Exit multiple'], ['avg', 'Average of both']], 'g')}
        ${select('d-mid', 'Discounting', [['0', 'End of year'], ['1', 'Mid-year convention']], '0')}
        ${field('d-nd', 'Net debt ($m)', 500)}
        ${field('d-sh', 'Diluted shares (m)', 100)}
      </div>
      <div class="kpis" id="d-k"></div>
      <div class="table-scroll"><table class="fin num" id="d-tbl"></table></div>
      <div class="tool-cols">
        <div><h4 class="tool-h">Terminal value</h4><div id="d-tv"></div></div>
        <div><h4 class="tool-h">Where the value comes from</h4><div id="d-chart"></div></div>
      </div>
      <h4 class="tool-h" id="d-sens-h">Sensitivity: implied share price</h4>
      <div class="table-scroll"><table class="fin num sens" id="d-sens"></table></div>`;
    function model(p) {
      const yrs = [1, 2, 3, 4, 5];
      let rev = p.rev; const rows = [];
      yrs.forEach((y, i) => {
        const g = p.g1 + (p.g5 - p.g1) * i / 4;
        const nrev = rev * (1 + g);
        const ebitda = nrev * p.m, da = nrev * p.da, ebit = ebitda - da, tax = Math.max(ebit, 0) * p.t;
        const capex = nrev * p.cx, dnwc = (nrev - rev) * p.nwc;
        const ufcf = ebit - tax + da - capex - dnwc;
        const per = p.mid ? y - 0.5 : y;
        const df = 1 / Math.pow(1 + p.w, per);
        rows.push({ y, g, rev: nrev, ebitda, da, ebit, tax, nopat: ebit - tax, capex, dnwc, ufcf, df, pv: ufcf * df });
        rev = nrev;
      });
      const last = rows[4];
      const tvG = p.w > p.tg ? last.ufcf * (1 + p.tg) / (p.w - p.tg) : NaN;
      const tvX = last.ebitda * p.xm;
      const dfG = 1 / Math.pow(1 + p.w, p.mid ? 4.5 : 5), dfX = 1 / Math.pow(1 + p.w, 5);
      const pvG = tvG * dfG, pvX = tvX * dfX;
      const pvTV = p.meth === 'g' ? pvG : p.meth === 'x' ? pvX : (pvG + pvX) / 2;
      const sumPV = rows.reduce((s, r) => s + r.pv, 0);
      const ev = sumPV + pvTV, eq = ev - p.nd;
      return { rows, tvG, tvX, pvG, pvX, pvTV, sumPV, ev, eq, px: eq / p.sh, impMult: tvG / last.ebitda, impG: (tvX * p.w - last.ufcf) / (tvX + last.ufcf) };
    }
    bindAll(root, () => {
      const p = { rev: v(root, 'd-rev'), g1: v(root, 'd-g1') / 100, g5: v(root, 'd-g5') / 100, m: v(root, 'd-m') / 100, da: v(root, 'd-da') / 100, cx: v(root, 'd-cx') / 100, nwc: v(root, 'd-nwc') / 100, t: v(root, 'd-t') / 100, w: v(root, 'd-w') / 100, tg: v(root, 'd-tg') / 100, xm: v(root, 'd-xm'), meth: sv(root, 'd-meth'), mid: sv(root, 'd-mid') === '1', nd: v(root, 'd-nd'), sh: v(root, 'd-sh') };
      const r = model(p);
      const bad = !(p.w > p.tg) && p.meth !== 'x';
      root.querySelector('#d-k').innerHTML = bad ? `<div class="kpi wide"><span>Check inputs</span><b class="neg">WACC must exceed the terminal growth rate.</b></div>` : `
        <div class="kpi"><span>Enterprise value</span><b>${money(r.ev, 0)}m</b></div>
        <div class="kpi"><span>Equity value</span><b>${money(r.eq, 0)}m</b></div>
        <div class="kpi accent"><span>Implied share price</span><b>${money(r.px, 2)}</b></div>
        <div class="kpi"><span>TV share of EV</span><b>${pct(r.pvTV / r.ev, 0)}</b></div>`;
      const R = r.rows;
      const line = (label, key, f = (x) => fin(x), c = '') => `<tr class="${c}"><td>${label}</td>${R.map(x => `<td>${f(x[key])}</td>`).join('')}</tr>`;
      root.querySelector('#d-tbl').innerHTML = `<thead><tr><th>$m</th>${R.map(x => `<th>Year ${x.y}</th>`).join('')}</tr></thead><tbody>
        ${line('Revenue', 'rev')}${line('Growth', 'g', (x) => pct(x), 'muted')}${line('EBITDA', 'ebitda')}${line('– D&amp;A', 'da', (x) => fin(-x))}
        ${line('EBIT', 'ebit', undefined, 'sub-total')}${line('– Taxes on EBIT', 'tax', (x) => fin(-x))}${line('NOPAT', 'nopat', undefined, 'sub-total')}
        ${line('+ D&amp;A', 'da')}${line('– Capex', 'capex', (x) => fin(-x))}${line('– Increase in NWC', 'dnwc', (x) => fin(-x))}
        ${line('Unlevered FCF', 'ufcf', undefined, 'total')}${line('Discount factor', 'df', (x) => x.toFixed(3), 'muted')}${line('PV of UFCF', 'pv', undefined, 'sub-total')}</tbody>`;
      root.querySelector('#d-tv').innerHTML = `<div class="statement">
        <div class="row"><span>Gordon TV = ${fin(R[4].ufcf)} × (1 + ${pct(p.tg)}) / (${pct(p.w)} – ${pct(p.tg)})</span><span>${fin(r.tvG)}</span></div>
        <div class="row sub"><span>Implied exit multiple</span><span>${num(r.impMult, 1)}x</span></div>
        <div class="row"><span>Exit TV = ${fin(R[4].ebitda)} × ${num(p.xm, 1)}x</span><span>${fin(r.tvX)}</span></div>
        <div class="row sub"><span>Implied perpetuity growth</span><span>${pct(r.impG, 2)}</span></div>
        <div class="row"><span>PV of TV (${p.meth === 'g' ? 'perpetuity' : p.meth === 'x' ? 'exit multiple' : 'average'}${p.mid && p.meth !== 'x' ? ', perpetuity discounted at 4.5 yrs' : ''})</span><span>${fin(r.pvTV)}</span></div>
        <div class="row sub"><span>+ Sum of PV of UFCF</span><span>${fin(r.sumPV)}</span></div>
        <div class="row total"><span>Enterprise value</span><span>${fin(r.ev)}</span></div>
        <div class="row sub"><span>– Net debt</span><span>${fin(-p.nd)}</span></div>
        <div class="row total grand"><span>Equity value ÷ ${num(p.sh, 1)}m shares</span><span>${money(r.px, 2)}</span></div></div>`;
      barChart(root.querySelector('#d-chart'), {
        label: 'Present value by year and terminal value',
        items: [...R.map(x => ({ label: 'Y' + x.y, value: x.pv, color: 'var(--viz-1)', series: 'PV of UFCF' })), { label: 'TV', value: r.pvTV, color: 'var(--viz-2)', series: 'PV of terminal value' }],
        width: 480, fmt: (x) => '$' + num(x, 0), legend: [['PV of annual UFCF', 'var(--viz-1)'], ['PV of terminal value', 'var(--viz-2)']]
      });
      // Sensitivity
      const ws = [-0.01, -0.005, 0, 0.005, 0.01].map(d => p.w + d);
      const useX = p.meth === 'x';
      const cs = useX ? [-2, -1, 0, 1, 2].map(d => p.xm + d) : [-0.01, -0.005, 0, 0.005, 0.01].map(d => p.tg + d);
      root.querySelector('#d-sens-h').textContent = 'Sensitivity: implied share price (WACC vs. ' + (useX ? 'exit multiple' : 'terminal growth') + ')';
      const vals = ws.map(w => cs.map(c => { const q = Object.assign({}, p, { w }); if (useX) q.xm = c; else q.tg = c; return (q.w > q.tg || useX) ? model(q).px : NaN; }));
      const flat = vals.flat().filter(isFinite), lo = Math.min(...flat), hi = Math.max(...flat);
      root.querySelector('#d-sens').innerHTML = `<thead><tr><th>WACC ↓ / ${useX ? 'Exit multiple' : 'g'} →</th>${cs.map(c => `<th>${useX ? num(c, 1) + 'x' : pct(c)}</th>`).join('')}</tr></thead><tbody>${ws.map((w, i) => `<tr><th>${pct(w)}</th>${vals[i].map((x, j) => { const k = isFinite(x) && hi > lo ? (x - lo) / (hi - lo) : 0.5; return `<td class="${i === 2 && j === 2 ? 'base' : ''}" style="--k:${k.toFixed(3)}">${isFinite(x) ? money(x, 2) : 'n/a'}</td>`; }).join('')}</tr>`).join('')}</tbody>`;
    });
  }

  /* ---------------- Tool: Merger model ---------------- */
  function toolMerger(root) {
    root.innerHTML = `
      <div class="tool-cols">
        <div>
          <h4 class="tool-h">Buyer</h4>
          <div class="tool-controls">${field('m-ap', 'Share price', 50, { prefix: '$' })}${field('m-as', 'Shares (m)', 100)}${field('m-ani', 'Net income ($m)', 400)}</div>
          <h4 class="tool-h">Target</h4>
          <div class="tool-controls">${field('m-tp', 'Unaffected share price', 20, { prefix: '$' })}${field('m-ts', 'Shares (m)', 40)}${field('m-tni', 'Net income ($m)', 100)}${field('m-prem', 'Premium', 25, { suffix: '%' })}</div>
          <h4 class="tool-h">Funding mix &amp; assumptions</h4>
          <div class="tool-controls">${field('m-cash', 'Cash', 0, { suffix: '%' })}${field('m-debt', 'New debt', 50, { suffix: '%' })}
            <div class="field"><span class="field-label">Stock (remainder)</span><span class="input-wrap readonly" id="m-stock">50%</span></div>
            ${field('m-ic', 'Interest earned on cash', 4, { suffix: '%' })}${field('m-id', 'Interest rate on debt', 7, { suffix: '%' })}${field('m-t', 'Tax rate', 25, { suffix: '%' })}
            ${field('m-syn', 'Pre-tax synergies ($m)', 0)}${field('m-da', 'New D&A from write-ups ($m)', 0)}</div>
        </div>
        <div id="m-out"></div>
      </div>`;
    bindAll(root, () => {
      const ap = v(root, 'm-ap'), as = v(root, 'm-as'), ani = v(root, 'm-ani');
      const tp = v(root, 'm-tp'), ts = v(root, 'm-ts'), tni = v(root, 'm-tni'), prem = v(root, 'm-prem') / 100;
      let c = Math.max(0, v(root, 'm-cash')) / 100, d = Math.max(0, v(root, 'm-debt')) / 100;
      if (c + d > 1) { d = Math.max(0, 1 - c); }
      const s = 1 - c - d;
      root.querySelector('#m-stock').textContent = pct(s, 0);
      const ic = v(root, 'm-ic') / 100, id = v(root, 'm-id') / 100, t = v(root, 'm-t') / 100, syn = v(root, 'm-syn'), da = v(root, 'm-da');
      const offer = tp * (1 + prem), price = offer * ts;
      const newSh = price * s / ap;
      const lostInt = price * c * ic * (1 - t), newInt = price * d * id * (1 - t);
      const pfNI = ani + tni - lostInt - newInt + (syn - da) * (1 - t);
      const pfSh = as + newSh;
      const eps0 = ani / as, eps1 = pfNI / pfSh, acc = eps1 / eps0 - 1;
      const costCash = ic * (1 - t), costDebt = id * (1 - t), costStock = ani / (ap * as);
      const wCost = c * costCash + d * costDebt + s * costStock, tYield = tni / price;
      const shortfall = eps0 * pfSh - (ani + tni - lostInt - newInt - da * (1 - t));
      const beSyn = shortfall > 0 ? shortfall / (1 - t) : 0;
      const ok = acc >= 0;
      const maxC = Math.max(wCost, tYield, 0.01) * 1.25;
      root.querySelector('#m-out').innerHTML = `
        <div class="verdict ${ok ? 'pos' : 'neg'}">${ok ? 'Accretive' : 'Dilutive'} <b>${signed(acc * 100, 1)}%</b></div>
        <div class="statement">
          <div class="row"><span>Offer price per share (${pct(prem, 0)} premium)</span><span>${money(offer)}</span></div>
          <div class="row"><span>Equity purchase price</span><span>${money(price, 0)}m</span></div>
          <div class="row sub"><span>Purchase P/E</span><span>${num(price / tni, 1)}x</span></div>
          <div class="row sub"><span>New shares issued</span><span>${num(newSh, 2)}m</span></div>
          <div class="row"><span>Buyer net income</span><span>${fin(ani)}</span></div>
          <div class="row"><span>+ Target net income</span><span>${fin(tni)}</span></div>
          <div class="row sub"><span>– Foregone interest on cash (after tax)</span><span>${fin(-lostInt)}</span></div>
          <div class="row sub"><span>– Interest on new debt (after tax)</span><span>${fin(-newInt)}</span></div>
          <div class="row sub"><span>+ Synergies – new D&amp;A (after tax)</span><span>${fin((syn - da) * (1 - t))}</span></div>
          <div class="row total"><span>Pro forma net income</span><span>${fin(pfNI)}</span></div>
          <div class="row"><span>Pro forma shares</span><span>${num(pfSh, 2)}m</span></div>
          <div class="row total grand"><span>Pro forma EPS vs. standalone ${money(eps0)}</span><span>${money(eps1)}</span></div>
        </div>
        <h4 class="tool-h">Shortcut check</h4>
        <div class="gauge">
          <div class="gauge-row"><span>Weighted after-tax cost of acquisition</span><div class="gauge-bar"><i style="width:${Math.min(100, wCost / maxC * 100)}%;background:var(--viz-1)"></i></div><b>${pct(wCost, 2)}</b></div>
          <div class="gauge-row"><span>Target earnings yield at purchase price</span><div class="gauge-bar"><i style="width:${Math.min(100, tYield / maxC * 100)}%;background:var(--viz-2)"></i></div><b>${pct(tYield, 2)}</b></div>
        </div>
        <p class="small">Cost of cash ${pct(costCash, 2)} · cost of debt ${pct(costDebt, 2)} · cost of stock (buyer E/P) ${pct(costStock, 2)}. Cost below yield means accretive before synergies and write-ups.</p>
        <div class="kpis"><div class="kpi"><span>Breakeven pre-tax synergies</span><b>${beSyn > 0 ? money(beSyn, 1) + 'm' : 'None needed'}</b></div></div>`;
    });
  }

  /* ---------------- Tool: LBO ---------------- */
  function toolLBO(root) {
    root.innerHTML = `
      <div class="btn-row"><button class="btn ghost" type="button" id="l-paper">Load the paper LBO example</button><button class="btn ghost" type="button" id="l-reset">Reset defaults</button></div>
      <div class="tool-controls dense">
        ${field('l-e', 'Entry EBITDA ($m)', 100)}${field('l-em', 'Entry multiple', 10, { suffix: 'x' })}${field('l-lev', 'Debt / EBITDA', 5, { suffix: 'x' })}
        ${field('l-r', 'Interest rate', 9, { suffix: '%' })}
        ${select('l-imode', 'Interest calculated on', [['beg', 'Opening balance'], ['init', 'Initial debt (paper LBO)']], 'beg')}
        ${select('l-gmode', 'EBITDA growth as', [['pct', '% per year'], ['abs', '$m per year']], 'pct')}
        ${field('l-g', 'EBITDA growth', 7)}
        ${field('l-da', 'D&A % of EBITDA', 15, { suffix: '%' })}${field('l-cx', 'Capex % of EBITDA', 15, { suffix: '%' })}${field('l-nwc', 'NWC % of Δ EBITDA', 10, { suffix: '%' })}
        ${field('l-t', 'Tax rate', 25, { suffix: '%' })}${field('l-fee', 'Fees % of EV', 2, { suffix: '%' })}${field('l-n', 'Hold period (years)', 5, { min: 1, max: 10, step: 1 })}${field('l-xm', 'Exit multiple', 10, { suffix: 'x' })}
      </div>
      <div class="kpis" id="l-k"></div>
      <div class="tool-cols">
        <div><h4 class="tool-h">Sources &amp; uses ($m)</h4><div id="l-su"></div></div>
        <div><h4 class="tool-h">Where the returns came from</h4><div id="l-attr"></div></div>
      </div>
      <h4 class="tool-h">Debt paydown schedule</h4>
      <div class="table-scroll"><table class="fin num" id="l-tbl"></table></div>
      <h4 class="tool-h">IRR sensitivity: entry vs. exit multiple</h4>
      <div class="table-scroll"><table class="fin num sens" id="l-sens"></table></div>`;
    const set = (id, val) => { root.querySelector('#' + id).value = val; };
    root.querySelector('#l-paper').onclick = () => {
      [['l-e', 100], ['l-em', 10], ['l-lev', 5], ['l-r', 10], ['l-imode', 'init'], ['l-gmode', 'abs'], ['l-g', 10], ['l-da', 10], ['l-cx', 10], ['l-nwc', 0], ['l-t', 25], ['l-fee', 0], ['l-n', 5], ['l-xm', 10]].forEach(([k, x]) => set(k, x));
      root.dispatchEvent(new Event('input'));
    };
    root.querySelector('#l-reset').onclick = () => {
      [['l-e', 100], ['l-em', 10], ['l-lev', 5], ['l-r', 9], ['l-imode', 'beg'], ['l-gmode', 'pct'], ['l-g', 7], ['l-da', 15], ['l-cx', 15], ['l-nwc', 10], ['l-t', 25], ['l-fee', 2], ['l-n', 5], ['l-xm', 10]].forEach(([k, x]) => set(k, x));
      root.dispatchEvent(new Event('input'));
    };
    function model(p) {
      const ev = p.e * p.em, debt0 = p.e * p.lev, fees = ev * p.fee, eq0 = ev + fees - debt0;
      let debt = debt0, cash = 0, e = p.e; const rows = [];
      // In the paper LBO convention D&A and capex are fixed amounts based on entry EBITDA
      for (let y = 1; y <= p.n; y++) {
        const ne = p.gmode === 'abs' ? e + p.g : e * (1 + p.g / 100);
        const base = p.gmode === 'abs' ? p.e : ne;
        const da = base * p.da, capex = base * p.cx, dnwc = (ne - e) * p.nwc;
        const interest = (p.imode === 'init' ? debt0 : debt) * p.r;
        const ebt = ne - da - interest, tax = Math.max(ebt, 0) * p.t;
        const fcf = ebt - tax + da - capex - dnwc;
        const pay = Math.min(Math.max(fcf, 0), debt);
        const begDebt = debt;
        debt -= pay; cash += fcf - pay;
        rows.push({ y, ebitda: ne, interest, tax, fcf, begDebt, pay, debt, cash, lev: debt / ne });
        e = ne;
      }
      const exitEV = e * p.xm, netDebt = debt - cash, eqX = exitEV - netDebt;
      const moic = eqX / eq0, irrv = eqX > 0 && eq0 > 0 ? Math.pow(moic, 1 / p.n) - 1 : NaN;
      return { ev, debt0, fees, eq0, rows, exitEV, netDebt, eqX, moic, irr: irrv, eN: e,
        attr: { growth: (e - p.e) * p.em, mult: (p.xm - p.em) * e, delever: debt0 - netDebt, fees: -fees } };
    }
    bindAll(root, () => {
      const p = { e: v(root, 'l-e'), em: v(root, 'l-em'), lev: v(root, 'l-lev'), r: v(root, 'l-r') / 100, imode: sv(root, 'l-imode'), gmode: sv(root, 'l-gmode'), g: v(root, 'l-g'), da: v(root, 'l-da') / 100, cx: v(root, 'l-cx') / 100, nwc: v(root, 'l-nwc') / 100, t: v(root, 'l-t') / 100, fee: v(root, 'l-fee') / 100, n: Math.max(1, Math.min(10, Math.round(v(root, 'l-n')))), xm: v(root, 'l-xm') };
      root.querySelector('label[for="l-g"] .field-label').textContent = p.gmode === 'abs' ? 'EBITDA growth ($m/yr)' : 'EBITDA growth (%/yr)';
      const m = model(p);
      const eqPct = m.eq0 / (m.ev + m.fees);
      root.querySelector('#l-k').innerHTML = `
        <div class="kpi accent"><span>IRR</span><b>${isFinite(m.irr) ? pct(m.irr) : 'n/a'}</b></div>
        <div class="kpi"><span>MOIC</span><b>${num(m.moic, 2)}x</b></div>
        <div class="kpi"><span>Exit equity</span><b>${money(m.eqX, 0)}m</b></div>
        <div class="kpi"><span>Sponsor equity at entry</span><b>${money(m.eq0, 0)}m (${pct(eqPct, 0)})</b></div>`;
      root.querySelector('#l-su').innerHTML = `<div class="su">
        <div class="statement"><div class="row head"><span>Sources</span><span></span></div>
          <div class="row"><span>Debt (${num(p.lev, 1)}x)</span><span>${fin(m.debt0)}</span></div>
          <div class="row"><span>Sponsor equity</span><span>${fin(m.eq0)}</span></div>
          <div class="row total"><span>Total</span><span>${fin(m.debt0 + m.eq0)}</span></div></div>
        <div class="statement"><div class="row head"><span>Uses</span><span></span></div>
          <div class="row"><span>Purchase EV (${num(p.em, 1)}x)</span><span>${fin(m.ev)}</span></div>
          <div class="row"><span>Fees</span><span>${fin(m.fees)}</span></div>
          <div class="row total"><span>Total</span><span>${fin(m.ev + m.fees)}</span></div></div></div>`;
      const a = m.attr;
      barChart(root.querySelector('#l-attr'), {
        horizontal: true, width: 480, label: 'Value creation attribution',
        items: [
          { label: 'EBITDA growth', value: a.growth, color: a.growth >= 0 ? 'var(--viz-1)' : 'var(--neg)' },
          { label: 'Multiple expansion', value: a.mult, color: a.mult >= 0 ? 'var(--viz-1)' : 'var(--neg)' },
          { label: 'Debt paydown & cash', value: a.delever, color: a.delever >= 0 ? 'var(--viz-1)' : 'var(--neg)' },
          { label: 'Fees', value: a.fees, color: 'var(--neg)' },
          { label: 'Total value created', value: m.eqX - m.eq0, color: 'var(--viz-2)' }
        ], fmt: (x) => (x < 0 ? '–$' : '$') + num(Math.abs(x), 0) + 'm'
      });
      root.querySelector('#l-tbl').innerHTML = `<thead><tr><th>$m</th>${m.rows.map(r => `<th>Year ${r.y}</th>`).join('')}</tr></thead><tbody>
        <tr><td>EBITDA</td>${m.rows.map(r => `<td>${fin(r.ebitda)}</td>`).join('')}</tr>
        <tr><td>Interest</td>${m.rows.map(r => `<td>${fin(-r.interest)}</td>`).join('')}</tr>
        <tr><td>Cash taxes</td>${m.rows.map(r => `<td>${fin(-r.tax)}</td>`).join('')}</tr>
        <tr class="sub-total"><td>Free cash flow</td>${m.rows.map(r => `<td>${fin(r.fcf)}</td>`).join('')}</tr>
        <tr><td>Debt repaid</td>${m.rows.map(r => `<td>${fin(-r.pay)}</td>`).join('')}</tr>
        <tr class="total"><td>Ending debt</td>${m.rows.map(r => `<td>${fin(r.debt)}</td>`).join('')}</tr>
        <tr class="muted"><td>Debt / EBITDA</td>${m.rows.map(r => `<td>${num(r.lev, 1)}x</td>`).join('')}</tr>
        <tr class="muted"><td>Excess cash</td>${m.rows.map(r => `<td>${fin(r.cash)}</td>`).join('')}</tr></tbody>`;
      const ems = [-2, -1, 0, 1, 2].map(d => p.em + d), xms = [-2, -1, 0, 1, 2].map(d => p.xm + d);
      const grid = ems.map(em => xms.map(xm => { const q = Object.assign({}, p, { em, xm }); return model(q).irr; }));
      const flat = grid.flat().filter(isFinite), lo = Math.min(...flat), hi = Math.max(...flat);
      root.querySelector('#l-sens').innerHTML = `<thead><tr><th>Entry ↓ / Exit →</th>${xms.map(x => `<th>${num(x, 1)}x</th>`).join('')}</tr></thead><tbody>${ems.map((em, i) => `<tr><th>${num(em, 1)}x</th>${grid[i].map((x, j) => { const k = isFinite(x) && hi > lo ? (x - lo) / (hi - lo) : 0.5; return `<td class="${i === 2 && j === 2 ? 'base' : ''}" style="--k:${k.toFixed(3)}">${isFinite(x) ? pct(x) : 'n/a'}</td>`; }).join('')}</tr>`).join('')}</tbody>`;
    });
  }

  /* ---------------- Tool: Bond ---------------- */
  function toolBond(root) {
    root.innerHTML = `
      <div class="tool-controls">
        ${field('b-f', 'Face value', 1000, { prefix: '$' })}${field('b-c', 'Coupon rate', 5, { suffix: '%' })}${field('b-n', 'Years to maturity', 5)}
        ${select('b-m', 'Coupon frequency', [['1', 'Annual'], ['2', 'Semi-annual']], '1')}
        ${field('b-y', 'Yield to maturity', 6, { suffix: '%' })}
      </div>
      <div class="kpis" id="b-k"></div>
      <div id="b-chart"></div>`;
    function price(F, c, n, m, y) {
      const N = Math.round(n * m), C = F * c / m, r = y / m;
      let p = 0, wt = 0, cx = 0;
      for (let k = 1; k <= N; k++) { const cf = C + (k === N ? F : 0); const pv = cf / Math.pow(1 + r, k); p += pv; wt += pv * k / m; cx += pv * k * (k + 1) / Math.pow(1 + r, 2); }
      const mac = wt / p; return { p, mac, mod: mac / (1 + r), conv: cx / (p * m * m) };
    }
    bindAll(root, () => {
      const F = v(root, 'b-f'), c = v(root, 'b-c') / 100, n = Math.max(0.5, v(root, 'b-n')), m = +sv(root, 'b-m'), y = v(root, 'b-y') / 100;
      const r = price(F, c, n, m, y);
      const up = price(F, c, n, m, y + 0.01).p;
      const estUp = r.p * (1 - r.mod * 0.01), estUp2 = r.p * (1 - r.mod * 0.01 + 0.5 * r.conv * 0.0001);
      const status = Math.abs(r.p - F) < 0.005 ? 'Par' : r.p > F ? 'Premium' : 'Discount';
      root.querySelector('#b-k').innerHTML = `
        <div class="kpi accent"><span>Price</span><b>${money(r.p, 2)}</b></div>
        <div class="kpi"><span>Trades at</span><b>${status}</b></div>
        <div class="kpi"><span>Current yield</span><b>${pct(F * c / r.p, 2)}</b></div>
        <div class="kpi"><span>Macaulay duration</span><b>${num(r.mac, 2)} yrs</b></div>
        <div class="kpi"><span>Modified duration</span><b>${num(r.mod, 2)}</b></div>
        <div class="kpi"><span>Convexity</span><b>${num(r.conv, 1)}</b></div>
        <div class="kpi wide"><span>If yield rises 100bp</span><b>Actual ${money(up, 2)} · duration estimate ${money(estUp, 2)} · duration + convexity ${money(estUp2, 2)}</b></div>`;
      const ys = []; for (let k = 0; k <= 30; k++) ys.push(k * 0.5);
      lineChart(root.querySelector('#b-chart'), {
        label: 'Price versus yield', xs: ys,
        series: [
          { name: 'Actual price', color: 'var(--viz-1)', ys: ys.map(q => price(F, c, n, m, q / 100).p) },
          { name: 'Duration (straight-line) estimate', color: 'var(--viz-2)', dash: true, ys: ys.map(q => r.p * (1 - r.mod * (q / 100 - y))) }
        ],
        points: [{ x: y * 100, y: r.p, color: 'var(--viz-1)' }],
        xFmt: (x, full) => full ? 'Yield ' + num(x, 1) + '%' : num(x, 0) + '%', yFmt: (q, full) => full ? money(q, 2) : '$' + num(q, 0), xLabel: 'Yield to maturity', yMin: 0
      });
    });
  }

  /* ---------------- Tool: Mental math ---------------- */
  function rnd(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  const MATH = {
    mult: () => { const a = rnd(12, 99), b = rnd(3, 19); return { q: `${a} × ${b}`, a: a * b, tol: 0 }; },
    pct: () => { const p = [5, 10, 15, 20, 25, 30, 35, 40, 12.5, 7.5][rnd(0, 9)], b = rnd(4, 96) * 10; return { q: `${p}% of ${b}`, a: p / 100 * b, tol: 0.01 }; },
    div: () => { const b = [4, 5, 8, 12, 15, 16, 20, 25, 40][rnd(0, 8)], a = b * rnd(6, 80); return { q: `${num(a)} ÷ ${b}`, a: a / b, tol: 0 }; },
    growth: () => { const a = rnd(20, 200) * 5, g = [5, 8, 10, 12, 15, 20, 25][rnd(0, 6)]; const n = rnd(2, 3); return { q: `${num(a)} growing ${g}% a year for ${n} years`, a: a * Math.pow(1 + g / 100, n), tol: 0.02, hint: 'Within 2%' }; },
    irr: () => { const m = [1.5, 2, 2.5, 3, 4][rnd(0, 4)], n = [3, 4, 5, 7][rnd(0, 3)]; return { q: `IRR of ${m}x over ${n} years (%)`, a: (Math.pow(m, 1 / n) - 1) * 100, tol: 'abs2', hint: 'Within 2 points' }; },
    mult2: () => { const e = rnd(4, 30) * 10, x = [6, 7, 8, 9, 10, 11, 12, 14][rnd(0, 7)]; return { q: `EV at ${x}x EBITDA of ${e}`, a: e * x, tol: 0 }; }
  };
  const MATH_NAMES = { mult: 'Multiplication', pct: 'Percentages', div: 'Division', growth: 'Compounding', irr: 'IRR from MOIC', mult2: 'Multiples' };
  function toolMath(root) {
    root.innerHTML = `
      <p class="small">10 questions per round. Type your answer and press Enter. Rounded answers within the stated tolerance count as correct.</p>
      <div class="chip-row" id="mm-types">${Object.keys(MATH).map(k => `<label class="chip"><input type="checkbox" value="${k}" checked> ${MATH_NAMES[k]}</label>`).join('')}</div>
      <div class="mm-card" id="mm-card"><button class="btn" id="mm-start" type="button">Start round</button><p class="small" id="mm-best"></p></div>`;
    const card = root.querySelector('#mm-card');
    const best = Store.get('math:best', null);
    root.querySelector('#mm-best').textContent = best ? `Best round: ${best.score}/10 in ${best.time}s` : '';
    root.querySelector('#mm-start').onclick = start;
    function start() {
      const types = [...root.querySelectorAll('#mm-types input:checked')].map(i => i.value);
      if (!types.length) return;
      let i = 0, score = 0; const t0 = Date.now(); const log = [];
      next();
      function next() {
        if (i >= 10) return finish();
        const k = types[rnd(0, types.length - 1)]; const pr = MATH[k]();
        card.innerHTML = `<div class="mm-meta">Question ${i + 1} of 10 · ${MATH_NAMES[k]}${pr.hint ? ' · ' + pr.hint : ''}</div>
          <div class="mm-q">${pr.q}</div>
          <form id="mm-f" class="mm-form"><input id="mm-a" type="number" step="any" inputmode="decimal" autocomplete="off" aria-label="Your answer"><button class="btn" type="submit">Check</button></form><div id="mm-fb" class="mm-fb"></div>`;
        const inp = card.querySelector('#mm-a'); inp.focus();
        card.querySelector('#mm-f').onsubmit = (e) => {
          e.preventDefault();
          const x = parseFloat(inp.value);
          const ok = isFinite(x) && (pr.tol === 'abs2' ? Math.abs(x - pr.a) <= 2 : pr.tol ? Math.abs(x - pr.a) <= Math.abs(pr.a) * pr.tol + 1e-9 : Math.abs(x - pr.a) < 0.051);
          if (ok) score++;
          log.push({ q: pr.q, a: pr.a, x, ok });
          card.querySelector('#mm-fb').innerHTML = `<span class="${ok ? 'pos' : 'neg'}">${ok ? '✓ Correct' : '✗ Answer: ' + num(pr.a, pr.a % 1 ? 2 : 0)}</span>`;
          inp.disabled = true;
          i++; setTimeout(next, ok ? 500 : 1400);
        };
      }
      function finish() {
        const time = Math.round((Date.now() - t0) / 1000);
        const b = Store.get('math:best', null);
        if (!b || score > b.score || (score === b.score && time < b.time)) Store.set('math:best', { score, time });
        card.innerHTML = `<div class="mm-q">${score}/10 in ${time}s</div>
          <ul class="mm-log">${log.map(l => `<li class="${l.ok ? 'pos' : 'neg'}">${l.ok ? '✓' : '✗'} ${l.q} = ${num(l.a, l.a % 1 ? 2 : 0)}${l.ok ? '' : ` (you: ${isFinite(l.x) ? l.x : '–'})`}</li>`).join('')}</ul>
          <button class="btn" id="mm-again" type="button">Go again</button>`;
        card.querySelector('#mm-again').onclick = start;
      }
    }
  }

  /* ---------------- Tool: Market notes ---------------- */
  function toolNotes(root) {
    const d = Store.get('notes', {});
    const f = [['sp', 'S&P 500'], ['nq', 'Nasdaq Composite'], ['t10', '10-year Treasury yield'], ['t2', '2-year Treasury yield'], ['ff', 'Fed funds target range'], ['oil', 'WTI oil'], ['vix', 'VIX'], ['fx', 'Dollar index / your currency']];
    const ta = [['macro', 'Macro view: rates, inflation, Fed expectations'], ['deal1', 'Deal 1: buyer, target, price, multiple, rationale, financing, your view'], ['deal2', 'Deal 2'], ['pitch', 'Stock pitch notes'], ['firm', 'Firm-specific notes (people met, recent deals)']];
    root.innerHTML = `
      <p class="small">Fill these in before each interview from a live source. Saved in this browser only. <span id="nt-stamp"></span></p>
      <div class="tool-controls">${f.map(([k, l]) => `<label class="field" for="nt-${k}"><span class="field-label">${l}</span><span class="input-wrap"><input id="nt-${k}" type="text" value="${esc(d[k] || '')}" placeholder="e.g., level and 1-month change"></span></label>`).join('')}</div>
      ${ta.map(([k, l]) => `<label class="field wide" for="nt-${k}"><span class="field-label">${l}</span><textarea id="nt-${k}" rows="4">${esc(d[k] || '')}</textarea></label>`).join('')}`;
    const stamp = root.querySelector('#nt-stamp');
    const show = () => { const s = Store.get('notes', {}); stamp.textContent = s._t ? 'Last edited ' + new Date(s._t).toLocaleString() + '.' : ''; };
    show();
    root.addEventListener('input', () => {
      const o = { _t: Date.now() };
      [...f, ...ta].forEach(([k]) => { o[k] = root.querySelector('#nt-' + k).value; });
      Store.set('notes', o); show();
    });
  }

  /* ---------------- Tool: Story builder ---------------- */
  const BEH_Q = ['Tell me about a time you led a team.', 'Describe a conflict with a teammate and how you resolved it.', 'Tell me about a time you failed.', 'Describe a time you worked under a tight deadline.', 'Tell me about a mistake you made and how you handled it.', 'Describe something you started on your own initiative.', 'Tell me about a time you had to persuade someone.', 'Describe a time you received difficult feedback.', 'Tell me about an ethical dilemma you faced.', 'What is your greatest weakness?', 'What is your greatest strength?', 'Why should we hire you over other candidates?'];
  function toolStory(root) {
    const s = Store.get('story', { b: '', m: '', e: '', bank: [] });
    root.innerHTML = `
      <h4 class="tool-h">Tell me about yourself</h4>
      <div class="story-grid">
        <label class="field wide" for="sb-b"><span class="field-label">Beginning: background and the spark (≈15s)</span><textarea id="sb-b" rows="3" placeholder="I'm a third-year economics student at… I got interested in finance when…">${esc(s.b)}</textarea></label>
        <label class="field wide" for="sb-m"><span class="field-label">Middle: 2–3 experiences and what each taught you (≈45s)</span><textarea id="sb-m" rows="5" placeholder="Last summer I interned at… where I… That led me to…">${esc(s.m)}</textarea></label>
        <label class="field wide" for="sb-e"><span class="field-label">End: why this role, now (≈20s)</span><textarea id="sb-e" rows="3" placeholder="That's why I'm excited about this role: …">${esc(s.e)}</textarea></label>
      </div>
      <div class="timer-bar"><div class="timer-fill" id="sb-fill"></div></div>
      <div class="small" id="sb-stat"></div>
      <h4 class="tool-h">STAR story bank</h4>
      <div class="btn-row"><button class="btn ghost" type="button" id="sb-q">Give me a random behavioral question</button></div>
      <div class="prompt-box" id="sb-qbox" hidden></div>
      <div id="sb-bank"></div>
      <details class="add-story"><summary class="btn">+ Add a story</summary>
        <div class="story-grid">
          <label class="field wide" for="sb-t"><span class="field-label">Title</span><input id="sb-t" type="text" placeholder="e.g., Led investment club pitch"></label>
          <label class="field wide" for="sb-s"><span class="field-label">Situation &amp; task</span><textarea id="sb-s" rows="2"></textarea></label>
          <label class="field wide" for="sb-a"><span class="field-label">Action (what you did)</span><textarea id="sb-a" rows="3"></textarea></label>
          <label class="field wide" for="sb-r"><span class="field-label">Result &amp; lesson</span><textarea id="sb-r" rows="2"></textarea></label>
          <label class="field wide" for="sb-tags"><span class="field-label">Themes it answers</span><input id="sb-tags" type="text" placeholder="leadership, conflict, failure"></label>
          <button class="btn" type="button" id="sb-save">Save story</button>
        </div></details>`;
    const fill = root.querySelector('#sb-fill'), stat = root.querySelector('#sb-stat');
    function count() {
      const st = Store.get('story', { bank: [] });
      ['b', 'm', 'e'].forEach(k => { st[k] = root.querySelector('#sb-' + k).value; });
      Store.set('story', st);
      const words = (st.b + ' ' + st.m + ' ' + st.e).trim().split(/\s+/).filter(Boolean).length;
      const secs = Math.round(words / 150 * 60);
      fill.style.width = Math.min(100, secs / 120 * 100) + '%';
      fill.className = 'timer-fill ' + (secs < 45 ? 'short' : secs <= 95 ? 'good' : 'long');
      stat.textContent = `${words} words ≈ ${secs} seconds at a natural speaking pace. ${secs < 45 ? 'A bit short: add an experience or a lesson.' : secs <= 95 ? 'Good length.' : 'Too long: aim for 60–90 seconds.'}`;
    }
    ['b', 'm', 'e'].forEach(k => root.querySelector('#sb-' + k).addEventListener('input', count));
    count();
    function drawBank() {
      const st = Store.get('story', { bank: [] });
      const bank = st.bank || [];
      root.querySelector('#sb-bank').innerHTML = bank.length ? bank.map((b, i) => `<div class="story-card"><div class="story-top"><b>${esc(b.t || 'Untitled')}</b><button class="link-btn" data-del="${i}" type="button">Delete</button></div>
        ${b.tags ? `<div class="chip-row">${b.tags.split(',').map(x => x.trim()).filter(Boolean).map(x => `<span class="chip static">${esc(x)}</span>`).join('')}</div>` : ''}
        <p><strong>S/T:</strong> ${esc(b.s)}</p><p><strong>A:</strong> ${esc(b.a)}</p><p><strong>R:</strong> ${esc(b.r)}</p></div>`).join('')
        : '<p class="small">No stories yet. Aim for five or six that together cover leadership, teamwork, conflict, failure, pressure and initiative.</p>';
      root.querySelectorAll('[data-del]').forEach(btn => btn.onclick = () => { const s2 = Store.get('story', { bank: [] }); s2.bank.splice(+btn.dataset.del, 1); Store.set('story', s2); drawBank(); });
    }
    drawBank();
    root.querySelector('#sb-save').onclick = () => {
      const st = Store.get('story', { bank: [] }); st.bank = st.bank || [];
      const g = (k) => root.querySelector('#sb-' + k).value.trim();
      if (!g('t') && !g('a')) return;
      st.bank.push({ t: g('t'), s: g('s'), a: g('a'), r: g('r'), tags: g('tags') });
      Store.set('story', st);
      ['t', 's', 'a', 'r', 'tags'].forEach(k => { root.querySelector('#sb-' + k).value = ''; });
      root.querySelector('.add-story').open = false;
      drawBank();
    };
    root.querySelector('#sb-q').onclick = () => { const b = root.querySelector('#sb-qbox'); b.hidden = false; b.textContent = BEH_Q[rnd(0, BEH_Q.length - 1)]; };
  }

  window.U = { Store, esc, num, fin, pct, money, signed, irr };
  window.TOOLS = {
    statements: { name: 'Statement Simulator', desc: 'Trace any "$10 change" through all three statements, with a generated interview answer.', run: toolStatements, module: 'accounting' },
    ev: { name: 'EV Bridge & Dilution', desc: 'Treasury stock method, convertibles and the full equity-to-enterprise value bridge.', run: toolEV, module: 'ev' },
    tvm: { name: 'NPV / IRR Calculator', desc: 'Cash flows to NPV, IRR, MOIC and payback, with an NPV profile chart.', run: toolTVM, module: 'tvm' },
    wacc: { name: 'WACC Calculator', desc: 'CAPM, relevered beta and after-tax cost of debt, plus how leverage moves WACC.', run: toolWACC, module: 'dcf' },
    dcf: { name: 'DCF Builder', desc: 'A 5-year unlevered DCF with both terminal value methods and a sensitivity grid.', run: toolDCF, module: 'dcf' },
    merger: { name: 'Merger Model', desc: 'Accretion/dilution, cost-of-acquisition shortcut and breakeven synergies.', run: toolMerger, module: 'ma' },
    lbo: { name: 'LBO Model', desc: 'Sources & uses, debt paydown, IRR/MOIC, return attribution and sensitivities.', run: toolLBO, module: 'lbo' },
    bond: { name: 'Bond Calculator', desc: 'Price, yield, duration and convexity, with the price-yield curve.', run: toolBond, module: 'credit' },
    math: { name: 'Mental Math Trainer', desc: 'Timed drills for percentages, multiples, compounding and IRR estimates.', run: toolMath, module: 'lbo' },
    notes: { name: 'Market Notes', desc: 'Record current market levels, deals and your stock pitch before each interview.', run: toolNotes, module: 'markets' },
    story: { name: 'Story Builder', desc: 'Time your "tell me about yourself" and keep a STAR story bank.', run: toolStory, module: 'behavioral' }
  };
})();
