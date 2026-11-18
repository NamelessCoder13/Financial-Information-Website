/* Course content, part 2: Equity & Enterprise Value, Valuation Methods, DCF */
(function (C) {
  /* ------------------------------------------------------------------ */
  C.modules.push({
    id: 'ev',
    num: '03',
    title: 'Equity Value & Enterprise Value',
    tagline: 'The bridge between what shareholders own and what the whole business is worth.',
    lessons: [
      {
        id: 'ev-definitions',
        title: 'Equity value vs. enterprise value',
        minutes: 10,
        summary: 'Two ways to measure a company, and the house-with-a-mortgage analogy.',
        tool: 'ev',
        body: `
<p><mark>Equity value</mark> (market capitalization for a public company) is the value of the company to its <strong>common shareholders</strong> only:</p>
<div class="formula">Equity value = Share price × Diluted shares outstanding</div>
<p><mark>Enterprise value (EV)</mark> is the value of the company's <strong>core operations to all capital providers</strong>: equity holders, lenders, preferred holders and minority (noncontrolling) shareholders.</p>
<div class="formula">EV = Equity value + Debt + Preferred stock + Noncontrolling interest – Cash – Non-operating assets</div>

<h3>The house analogy</h3>
<p>You buy a $500,000 house with a $100,000 down payment and a $400,000 mortgage. The house itself (the operating asset) is worth $500,000: that's enterprise value. Your equity in it is $100,000. If you also keep $20,000 in a drawer that comes with the house, a buyer would pay $520,000 in total but the <em>house</em> is still worth $500,000, which is why cash is subtracted to get EV.</p>

<div class="callout key"><strong>Why EV matters:</strong> it's <em>capital-structure neutral</em>. Two identical businesses, one financed with debt and one with equity, have different equity values but the same enterprise value. That lets you compare companies on operating performance alone.</div>

<h3>Which one does an acquirer "pay"?</h3>
<p>In an acquisition, the buyer pays the equity value to shareholders but effectively takes on the debt and gets the cash. EV approximates the true cost of acquiring the business. In practice, the buyer usually also refinances the debt, because most debt has change-of-control provisions.</p>

<div class="say"><div class="say-label">Say it in the interview: "What's the difference between equity value and enterprise value?"</div>
<p>"Equity value is the value of the company to common shareholders: share price times diluted shares. Enterprise value is the value of the core business to all investors, debt and equity alike. You get from equity value to enterprise value by adding debt, preferred stock and noncontrolling interest, and subtracting cash and non-operating assets. Enterprise value is useful because it doesn't depend on how the company is financed."</p></div>

<details class="practice"><summary>Can enterprise value be negative? Can equity value?</summary>
<div><p><strong>EV can be negative</strong> if a company holds more cash than its market cap plus debt. This happens with distressed companies or those the market believes will burn their cash. <strong>Equity value cannot be negative</strong> for a public company, because share prices can't go below zero. (Book equity on the balance sheet can be negative, e.g., after large buybacks or accumulated losses.)</p></div></details>
`,
        videos: [
          { t: 'Enterprise Value vs. Equity Value of a Business', u: 'https://www.youtube.com/watch?v=aHSyRdcDeBU' },
          { t: 'Equity Value vs. Enterprise Value', u: 'https://www.youtube.com/watch?v=ncxGLI1vq7A' }
        ],
        search: 'enterprise value vs equity value explained'
      },
      {
        id: 'ev-bridge',
        title: 'The bridge, line by line',
        minutes: 12,
        summary: 'Why each item is added or subtracted, and the trick questions built on them.',
        tool: 'ev',
        body: `
<p>The guiding principle: <strong>EV should include every claim whose payments are excluded from the metric you divide by</strong>, and exclude every asset whose income is excluded from that metric. With EBITDA as the denominator:</p>
<table class="fin">
<thead><tr><th>Item</th><th>Direction</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Debt (incl. finance leases)</td><td class="pos">Add</td><td>Lenders have a claim on the business. Interest is paid out of EBITDA.</td></tr>
<tr><td>Preferred stock</td><td class="pos">Add</td><td>Behaves like debt: fixed dividends, priority over common.</td></tr>
<tr><td>Noncontrolling interest</td><td class="pos">Add</td><td>When a parent owns 51–99% of a subsidiary, it consolidates 100% of the sub's EBITDA. Adding NCI makes the numerator also reflect 100%.</td></tr>
<tr><td>Cash &amp; equivalents</td><td class="neg">Subtract</td><td>Non-operating; generates interest income that's excluded from EBITDA. A buyer effectively gets it back.</td></tr>
<tr><td>Equity investments (associates)</td><td class="neg">Subtract</td><td>Stakes of 20–50% are not consolidated, so their income is not in EBITDA. Remove their value to match.</td></tr>
<tr><td>Unfunded pension, operating leases (if EBITDA excludes rent)</td><td class="pos">Add</td><td>Debt-like obligations. Include only if consistent with the EBITDA definition.</td></tr>
</tbody></table>

<h3>Trick questions</h3>
<p>For each event, ask: does it change the value of the <em>core operations</em>?</p>
<ul>
<li><strong>Company issues $100 of debt and holds the cash.</strong> Debt +100, cash +100. EV <strong>unchanged</strong>; equity value unchanged.</li>
<li><strong>Company issues $100 of new shares for cash.</strong> Equity value +100, cash +100. EV <strong>unchanged</strong>.</li>
<li><strong>Company pays a $100 dividend.</strong> Cash –100, equity value –100 (in theory, the share price drops). EV <strong>unchanged</strong>.</li>
<li><strong>Company uses $100 of cash to repay debt.</strong> Cash –100, debt –100. EV unchanged, equity value unchanged.</li>
<li><strong>Company uses $100 of debt to buy a business.</strong> Debt +100, plus $100 of new operating assets. EV <strong>+100</strong>.</li>
</ul>
<div class="callout trap"><strong>Theory vs. practice.</strong> These answers assume markets price things perfectly. In reality, a share price may react to a dividend or buyback signal. Give the textbook answer first, then mention the caveat if you have time.</div>

<details class="practice"><summary>Company A and B have identical operations. A has $500 of debt; B has none. Which has the higher EV? Higher equity value?</summary>
<div><p>In theory, the <strong>same EV</strong> (identical operations), so B has <strong>higher equity value</strong>, by about the amount of A's debt. A nuance for strong candidates: the debt's tax shield can make A's EV slightly higher up to a point, and distress costs can make it lower at high leverage.</p></div></details>
`,
        videos: [
          { t: 'The Bridge Between Enterprise Value and Equity Value', u: 'https://www.youtube.com/watch?v=xpwoYO-csW0' },
          { t: 'Why You Subtract Equity Investments (Associate Companies) in Enterprise Value', u: 'https://www.youtube.com/watch?v=Jm7W4ZHe8L0' },
          { t: 'How Equity Value & Enterprise Value Change in M&A Deals', u: 'https://www.youtube.com/watch?v=54igiuifbts' }
        ],
        search: 'enterprise value bridge noncontrolling interest why add'
      },
      {
        id: 'ev-dilution',
        title: 'Diluted shares & the treasury stock method',
        minutes: 10,
        summary: 'How options, RSUs and convertibles change the share count.',
        tool: 'ev',
        body: `
<p>Equity value should use <mark>diluted shares</mark>: basic shares plus anything that could become shares, if it's "in the money".</p>
<h3>Treasury stock method (options and warrants)</h3>
<ol class="steps">
<li>Include only options whose strike price is <strong>below</strong> the current share price.</li>
<li>Assume they're all exercised: new shares = number of options.</li>
<li>The company receives cash = options × strike price, and uses it to <strong>buy back</strong> shares at the current price.</li>
<li>Net new shares = options – (options × strike ÷ share price).</li>
</ol>
<h3>Example</h3>
<p>Share price $50, 100 basic shares, 10 options with a $30 strike.</p>
<ul>
<li>Exercise proceeds = 10 × $30 = $300.</li>
<li>Shares repurchased = $300 / $50 = 6.</li>
<li>Net new shares = 10 – 6 = <strong>4</strong>. Diluted shares = 104. Equity value = 104 × $50 = <strong>$5,200</strong>.</li>
</ul>

<h3>Other dilutive securities</h3>
<ul>
<li><strong>RSUs:</strong> no strike price, so add them in full (unless the company net-settles for taxes).</li>
<li><strong>Convertible bonds:</strong> if the share price is above the conversion price, treat as converted: add the shares and remove the bond from debt. If out of the money, count it as debt.</li>
<li><strong>Option tranches:</strong> apply TSM to each tranche separately. Use all outstanding options for public-company valuation; use only exercisable ones if asked.</li>
</ul>

<div class="callout trap"><strong>Circularity in M&amp;A:</strong> in an acquisition, use the <em>offer price</em> per share, not the current price, to calculate dilution. Since more options are in the money at a higher price, the diluted count rises.</div>
`,
        videos: [
          { t: 'Diluted EPS using the Treasury Stock Method (Shortcut Approach)', u: 'https://www.youtube.com/watch?v=fb5TNz6BxIc' },
          { t: 'How to Calculate Diluted EPS using the Treasury Stock Method', u: 'https://www.youtube.com/watch?v=RyoE1bKHdco' }
        ],
        search: 'treasury stock method diluted shares explained'
      },
      {
        id: 'ev-multiples',
        title: 'Valuation multiples: matching numerator and denominator',
        minutes: 10,
        summary: 'Why EV/EBITDA and P/E are valid but EV/Net income is not.',
        body: `
<p>A multiple compares a value to an operating metric. The rule: <strong>the metric must belong to the same investors as the value</strong>.</p>
<table class="fin">
<thead><tr><th>Enterprise value multiples</th><th>Equity value multiples</th></tr></thead>
<tbody><tr><td>
<ul class="tight"><li>EV / Revenue</li><li>EV / EBITDA</li><li>EV / EBIT</li><li>EV / Unlevered FCF</li></ul>
<p class="small">These metrics are before interest, so they belong to all capital providers.</p></td>
<td><ul class="tight"><li>P / E (Equity value / Net income)</li><li>P / Book value</li><li>Equity value / Levered FCF</li><li>Dividend yield</li></ul>
<p class="small">These metrics are after interest, so they belong to shareholders only.</p></td></tr></tbody></table>
<div class="callout trap"><strong>EV / Net income is wrong</strong>: net income is after interest paid to lenders, but EV includes the lenders' claim. Likewise, P/EBITDA mismatches.</div>

<h3>Choosing a multiple</h3>
<ul>
<li><strong>EV/EBITDA</strong>: the default. Ignores capital structure, taxes and D&amp;A policy differences.</li>
<li><strong>EV/EBIT</strong>: better for capital-intensive businesses where D&amp;A reflects real reinvestment needs.</li>
<li><strong>EV/Revenue</strong>: for unprofitable or early-stage companies (e.g., high-growth software).</li>
<li><strong>P/E</strong>: widely quoted, but distorted by leverage, tax rates and one-off items.</li>
<li><strong>P/B, P/TBV</strong>: banks and insurers, whose balance sheets are marked closer to market.</li>
<li><strong>Industry-specific</strong>: EV/EBITDAR (airlines, retail, which have heavy rent), P/FFO (REITs), EV/Reserves (oil &amp; gas), EV/Subscribers (telecom).</li>
</ul>

<details class="practice"><summary>Two companies have the same P/E. One has much more debt. Which likely has the higher EV/EBITDA?</summary>
<div><p>Generally the <strong>more levered</strong> company. Its net income is depressed by interest, so to have the same P/E its equity value is lower relative to operations; but EV adds back that debt. Multiples behave differently across capital structures, which is exactly why EV-based multiples are preferred for comparisons.</p></div></details>

<details class="practice"><summary>What drives a higher EV/EBITDA multiple?</summary>
<div><p>Higher expected <strong>growth</strong>, higher <strong>returns on capital</strong> (less reinvestment needed per dollar of growth), and lower <strong>risk</strong> (lower WACC). From the Gordon Growth formula: EV/FCF ≈ 1 / (WACC – g).</p></div></details>
`,
        videos: [
          { t: 'Why You Never Project Enterprise Value', u: 'https://www.youtube.com/watch?v=5D1Ebl01itk' }
        ],
        search: 'valuation multiples EV/EBITDA vs P/E explained'
      }
    ],
    quiz: [
      { q: 'Share price $40, 200 basic shares, 20 options at a $20 strike. Diluted shares (TSM) are:', o: ['220', '210', '200', '215'], a: 1, e: 'Proceeds 20 × 20 = 400; buyback 400 / 40 = 10 shares; net new = 20 – 10 = 10. Diluted = 210.' },
      { q: 'Equity value 1,000; debt 300; cash 100; NCI 50; preferred 0. Enterprise value is:', o: ['1,150', '1,250', '1,350', '1,200'], a: 1, e: '1,000 + 300 + 50 – 100 = 1,250.' },
      { q: 'A company issues $200 of debt and keeps the cash on the balance sheet. EV:', o: ['Rises by $200', 'Falls by $200', 'Is unchanged', 'Rises by $200 × (1 – t)'], a: 2, e: 'Debt +200 and cash +200 offset. The core business hasn’t changed.' },
      { q: 'Why is noncontrolling interest added in the EV bridge?', o: ['It is a form of debt', 'The parent consolidates 100% of the subsidiary’s EBITDA, so EV must include the minority holders’ share', 'It is non-operating', 'Accounting rules require it'], a: 1, e: 'It’s a consistency adjustment: the numerator must cover the same 100% of operations as consolidated EBITDA.' },
      { q: 'Which multiple is mismatched?', o: ['EV / EBITDA', 'Equity value / Net income', 'EV / Net income', 'EV / Revenue'], a: 2, e: 'Net income is after interest (equity-only); EV is all investors. Mismatched.' },
      { q: 'A convertible bond’s conversion price is $25 and the stock trades at $30. In the EV bridge you should:', o: ['Count it as debt', 'Count it as converted shares and remove it from debt', 'Ignore it', 'Count it as both'], a: 1, e: 'In the money → treat as converted (if-converted method): add shares, remove from debt. Never count both.' },
      { q: 'For valuing a bank, the most appropriate multiple is usually:', o: ['EV/EBITDA', 'P/B or P/TBV', 'EV/Revenue', 'EV/EBITDAR'], a: 1, e: 'For banks, debt and interest are operating items, so EV and EBITDA lose meaning. Use equity-value metrics like P/B, P/TBV and P/E.' },
      { q: 'A company pays a $50 dividend. In theory, which changes?', o: ['EV falls $50', 'Equity value falls $50; EV unchanged', 'Both unchanged', 'Equity value rises $50'], a: 1, e: 'Cash leaves the company, so equity value falls. EV = equity value – cash, and both fell by $50, so EV is unchanged.' }
    ],
    cards: [
      { q: 'What is the difference between equity value and enterprise value?', a: 'Equity value = value to common shareholders (price × diluted shares). EV = value of core operations to all capital providers = equity value + debt + preferred + NCI – cash – non-operating assets.', d: 1 },
      { q: 'Why do you subtract cash when calculating EV?', a: 'Cash is a non-operating asset; its income (interest) is excluded from EBITDA. A buyer effectively gets it back, so it reduces the net cost of acquiring the operations.', d: 1 },
      { q: 'Walk me through the treasury stock method.', a: 'For in-the-money options: assume exercise (add option shares), company receives options × strike in cash, uses it to repurchase shares at the current price. Net new shares = options – proceeds ÷ price.', d: 1 },
      { q: 'Why add noncontrolling interest to EV?', a: 'When a parent owns >50% of a sub it consolidates 100% of the sub’s revenue/EBITDA. Adding NCI makes EV reflect 100% too, keeping the multiple consistent.', d: 2 },
      { q: 'Why subtract equity investments (associates) from EV?', a: 'Stakes of 20–50% aren’t consolidated; their income sits below EBITDA. Their value must be removed from EV to match the denominator.', d: 2 },
      { q: 'Company raises $100 of equity. What happens to equity value and EV?', a: 'Equity value +100 (new shares), cash +100. EV unchanged.', d: 1 },
      { q: 'Can EV be negative?', a: 'Yes: if cash exceeds equity value plus debt. Typically distressed or cash-rich companies the market expects to burn cash. Equity value can’t be negative for a public company.', d: 2 },
      { q: 'Why is EV/EBITDA used more often than P/E?', a: 'It’s capital-structure neutral and ignores differences in D&A policies and tax rates, so it compares operating performance across companies more cleanly.', d: 2 },
      { q: 'Name three multiples that use equity value and three that use EV.', a: 'Equity: P/E, P/B, Equity value/Levered FCF. EV: EV/Revenue, EV/EBITDA, EV/EBIT.', d: 1 },
      { q: 'How do you treat convertible bonds in the share count?', a: 'If in the money (price > conversion price), add the shares as converted and remove the bond from debt. If out of the money, keep as debt.', d: 2 },
      { q: 'Should operating lease liabilities be included in EV?', a: 'Only if the EBITDA used excludes rent (e.g., IFRS 16 EBITDA or EBITDAR). Numerator and denominator must be consistent.', d: 3 },
      { q: 'What drives a higher EV/EBITDA multiple?', a: 'Higher growth, higher returns on capital (less reinvestment per dollar of growth), lower risk (lower WACC). Approx: EV/FCF = 1/(WACC – g).', d: 2 }
    ]
  });

  /* ------------------------------------------------------------------ */
  C.modules.push({
    id: 'valuation',
    num: '04',
    title: 'Valuation Methods',
    tagline: 'Comparable companies, precedent transactions and the football field.',
    lessons: [
      {
        id: 'val-overview',
        title: 'The three core methodologies',
        minutes: 10,
        summary: 'Relative vs. intrinsic valuation and how bankers present a range.',
        body: `
<p>Bankers value a company with several methods and present the results as a range. The three core methods:</p>
<table class="fin">
<thead><tr><th>Method</th><th>Type</th><th>Logic</th><th>Main weakness</th></tr></thead>
<tbody>
<tr><td><strong>Trading comps</strong></td><td>Relative</td><td>What similar public companies trade at today</td><td>No company is truly comparable; markets can be mispriced</td></tr>
<tr><td><strong>Precedent transactions</strong></td><td>Relative</td><td>What buyers paid for similar companies in M&amp;A</td><td>Data is old and sparse; deal-specific factors</td></tr>
<tr><td><strong>DCF</strong></td><td>Intrinsic</td><td>Present value of future cash flows</td><td>Highly sensitive to assumptions, especially terminal value</td></tr>
</tbody></table>
<p>Others you should know: <strong>LBO analysis</strong> (what a financial sponsor could pay and still earn its target return, often a floor), <strong>sum-of-the-parts</strong> (value each division separately), <strong>dividend discount model</strong> (banks, utilities), <strong>liquidation value</strong> (distressed), and <strong>52-week trading range / analyst price targets</strong> (reference points, not valuations).</p>

<h3>The football field</h3>
<p>Results are shown as horizontal bars, one per method, in a chart called a <mark>football field</mark>. It frames negotiations and fairness opinions.</p>
<div class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-label="Example football field chart, implied share price $20 to $50">
  <g class="ff-axis">
    <line x1="170" y1="200" x2="620" y2="200" stroke="var(--line-strong)"/>
    <text x="170" y="218" text-anchor="middle" class="d-t">$20</text>
    <text x="282.5" y="218" text-anchor="middle" class="d-t">$27.50</text>
    <text x="395" y="218" text-anchor="middle" class="d-t">$35</text>
    <text x="507.5" y="218" text-anchor="middle" class="d-t">$42.50</text>
    <text x="620" y="218" text-anchor="middle" class="d-t">$50</text>
    <line x1="282.5" y1="15" x2="282.5" y2="200" stroke="var(--line)" stroke-dasharray="2 4"/>
    <line x1="395" y1="15" x2="395" y2="200" stroke="var(--line)" stroke-dasharray="2 4"/>
    <line x1="507.5" y1="15" x2="507.5" y2="200" stroke="var(--line)" stroke-dasharray="2 4"/>
  </g>
  <text x="160" y="40" text-anchor="end" class="d-t">52-week range</text>
  <rect x="200" y="28" width="150" height="18" rx="3" fill="var(--viz-3)"/>
  <text x="160" y="80" text-anchor="end" class="d-t">Trading comps</text>
  <rect x="260" y="68" width="165" height="18" rx="3" fill="var(--viz-1)"/>
  <text x="160" y="120" text-anchor="end" class="d-t">Precedent deals</text>
  <rect x="335" y="108" width="180" height="18" rx="3" fill="var(--viz-1)"/>
  <text x="160" y="160" text-anchor="end" class="d-t">DCF</text>
  <rect x="245" y="148" width="270" height="18" rx="3" fill="var(--viz-2)"/>
  <text x="160" y="190" text-anchor="end" class="d-t">LBO (sponsor floor)</text>
  <rect x="230" y="178" width="120" height="14" rx="3" fill="var(--viz-3)"/>
  <line x1="320" y1="15" x2="320" y2="200" stroke="var(--neg)" stroke-width="1.5"/>
  <text x="324" y="22" class="d-t" fill="var(--neg)">Current $30</text>
</svg>
<div class="diagram-cap">Illustrative football field. Each bar is the implied share-price range from one method; the red line is today's price.</div>
</div>

<h3>Which method gives the highest value?</h3>
<p>Usually <strong>precedent transactions</strong>, because acquirers pay a <mark>control premium</mark> (typically 20–40% over the unaffected price) and price in synergies. The DCF is the most variable: it can be highest or lowest depending on assumptions. Trading comps sit in between, and the LBO is often the lowest because a sponsor has no synergies and needs a high return. Always add "but it depends on market conditions and assumptions."</p>

<div class="say"><div class="say-label">Say it in the interview: "How would you value a company?"</div>
<p>"I'd use both relative and intrinsic methods. For relative valuation, trading comps show what the market pays for similar public companies, and precedent transactions show what acquirers have paid for similar businesses, including a control premium. For intrinsic value, a DCF values the company's projected free cash flows. Depending on the context I might add an LBO analysis to see what a financial sponsor could pay. I'd present the results as ranges on a football field and triangulate."</p></div>
`,
        videos: [
          { t: '[Modeling 201] Trading Comps vs Transaction Comps vs DCF', u: 'https://www.youtube.com/watch?v=8CRkSYEjzUg' },
          { t: 'Valuation in Four Lessons (Aswath Damodaran)', u: 'https://www.youtube.com/watch?v=Z5chrxMuBoo' }
        ],
        search: 'three valuation methods investment banking football field'
      },
      {
        id: 'val-comps',
        title: 'Trading comparables',
        minutes: 14,
        summary: 'Selecting peers, spreading multiples, calendarization and LTM.',
        body: `
<h3>Process</h3>
<ol class="steps">
<li><strong>Select the peer set.</strong> Start with industry and business model, then filter on size, geography, growth and margins. Aim for 5–15 names.</li>
<li><strong>Gather financials.</strong> Share price, diluted shares, the EV bridge items, and LTM plus forward (NTM, FY+1, FY+2) revenue, EBITDA and EPS from filings and consensus estimates.</li>
<li><strong>Normalize.</strong> Remove one-time items (restructuring, litigation, impairments) so you compare recurring earnings.</li>
<li><strong>Calendarize.</strong> Align different fiscal years to calendar years.</li>
<li><strong>Compute multiples</strong> and look at the 25th percentile, median, mean and 75th percentile.</li>
<li><strong>Apply</strong> a selected range to the target's metric, then bridge from implied EV to implied share price.</li>
</ol>

<h3>LTM (last twelve months)</h3>
<div class="formula">LTM = Most recent fiscal year + Current YTD – Prior-year YTD</div>
<p>Example: FY2025 revenue 1,000; 9M 2026 revenue 800; 9M 2025 revenue 720. LTM = 1,000 + 800 – 720 = <strong>1,080</strong>.</p>

<h3>Calendarization</h3>
<p>A company with a March fiscal year-end: CY2026 ≈ 3/12 × FY ending Mar-2026 + 9/12 × FY ending Mar-2027.</p>

<h3>Applying the multiple</h3>
<p>Peer median EV/EBITDA is 9.0x–11.0x; the target's EBITDA is $200m; net debt $400m; 50m diluted shares.</p>
<ul>
<li>Implied EV: $1,800m–$2,200m.</li>
<li>Implied equity value: $1,400m–$1,800m.</li>
<li>Implied share price: <strong>$28–$36</strong>.</li>
</ul>

<div class="callout trap"><strong>Why use the median rather than the mean?</strong> Outliers (a company with near-zero EBITDA trading at 80x) distort the mean. Bankers also exclude negative and "NM" (not meaningful) multiples.</div>

<details class="practice"><summary>Your comps have P/Es of 12x, 14x, 15x, 16x and 45x. What range do you use, and why?</summary>
<div><p>Exclude or investigate the 45x outlier: it likely has temporarily depressed earnings or is a different business. Center on the median (15x) and use something like the 25th–75th percentile (14x–16x). Explain qualitatively why the target deserves a premium or discount (growth, margins, risk).</p></div></details>
`,
        videos: [
          { t: 'Watch Me Explain Comps Like an Investment Banking Analyst', u: 'https://www.youtube.com/watch?v=Mp-A3BnVUig' },
          { t: 'Trading Comps Valuation Tutorial From Former JP Morgan Investment Banker', u: 'https://www.youtube.com/watch?v=dpKvb7D9ek4' },
          { t: 'Comparable Company Analysis (Comps): Valuation Multiples', u: 'https://www.youtube.com/watch?v=nDa-hjtXC3M' }
        ],
        search: 'comparable company analysis walkthrough interview'
      },
      {
        id: 'val-precedents',
        title: 'Precedent transactions',
        minutes: 8,
        summary: 'What acquirers paid, and why it usually prices higher.',
        body: `
<p>Precedent transactions ("deal comps") value a company based on multiples paid in past acquisitions of similar companies.</p>
<h3>Process</h3>
<ol class="steps">
<li>Screen for deals in the same industry, of similar size, ideally within the last 3–5 years.</li>
<li>For each deal, calculate the transaction EV (offer price × target diluted shares + net debt assumed) and divide by the target's LTM revenue and EBITDA <em>at announcement</em>.</li>
<li>Note the premium paid over the unaffected share price (1-day, 30-day).</li>
<li>Apply the median multiple range to your target.</li>
</ol>
<h3>Why it differs from trading comps</h3>
<ul>
<li>Includes a <strong>control premium</strong>: the buyer gains control of cash flows and strategy.</li>
<li>Includes expected <strong>synergies</strong> for strategic buyers.</li>
<li>Reflects market conditions <strong>at the time</strong> of each deal (credit availability, valuations in 2021 vs. 2023 were very different).</li>
<li>Usually uses <strong>LTM</strong> multiples, because forward projections at deal time are often unavailable.</li>
</ul>
<div class="callout key"><strong>Strategic vs. financial buyers:</strong> strategic acquirers (corporations) can usually pay more because of synergies. Financial sponsors (PE) are limited by the leverage they can raise and their target IRR.</div>
`,
        videos: [
          { t: 'Valuation: Precedent Transactions (M&A Transaction Comps)', u: 'https://www.youtube.com/watch?v=0nQkDs1yCNU' },
          { t: 'Valuation: Comparable Companies and Precedent Transactions', u: 'https://www.youtube.com/watch?v=TMsqTrdmBz8' }
        ],
        search: 'precedent transactions analysis explained control premium'
      },
      {
        id: 'val-special',
        title: 'Special situations & industry valuation',
        minutes: 10,
        summary: 'Banks, REITs, startups, negative earnings and sum-of-the-parts.',
        body: `
<table class="fin">
<thead><tr><th>Situation</th><th>Approach</th></tr></thead>
<tbody>
<tr><td><strong>Banks &amp; insurers</strong></td><td>Debt is raw material, not financing, so EV is meaningless. Use P/E, P/B, P/TBV and a dividend discount model. Return on equity drives P/B: P/B ≈ (ROE – g) / (Ke – g).</td></tr>
<tr><td><strong>REITs</strong></td><td>Depreciation overstates economic decline of real estate. Use P/FFO and P/AFFO (funds from operations = net income + real-estate D&amp;A – gains on sales), cap rates and NAV.</td></tr>
<tr><td><strong>Oil &amp; gas / mining</strong></td><td>NAV models of reserves, EV/Reserves, EV/Production, EV/EBITDAX.</td></tr>
<tr><td><strong>Early-stage / unprofitable</strong></td><td>EV/Revenue or EV/Gross profit; a long-horizon DCF that reaches steady-state margins; user- or unit-economics-based metrics.</td></tr>
<tr><td><strong>Conglomerates</strong></td><td>Sum-of-the-parts: value each segment with its own peer multiples, add them, subtract net debt and possibly a conglomerate discount.</td></tr>
<tr><td><strong>Cyclicals</strong></td><td>Use mid-cycle or normalized EBITDA. Low P/E at peak earnings can be a trap.</td></tr>
<tr><td><strong>Distressed</strong></td><td>Liquidation value, recovery analysis, and valuation of the post-reorganization company.</td></tr>
<tr><td><strong>Private company</strong></td><td>Same methods, but with a liquidity discount; build the beta from public peers; normalize owner compensation.</td></tr>
</tbody></table>

<details class="practice"><summary>How would you value a company with negative EBITDA?</summary>
<div><p>Multiples of EBITDA and earnings don't work. Use EV/Revenue (or EV/Gross profit) from comps and precedents, and a DCF with a long enough projection period that the company reaches positive, steady-state cash flows before the terminal value. Cross-check against industry-specific operating metrics.</p></div></details>
`,
        videos: [
          { t: 'Valuing a Private Company: DCF, Trading Comparables, Precedent Transactions', u: 'https://www.youtube.com/watch?v=QExQxR1xjSE' }
        ],
        search: 'how to value a bank P/TBV dividend discount model'
      }
    ],
    quiz: [
      { q: 'Which method usually produces the highest valuation?', o: ['Trading comps', 'Precedent transactions', 'LBO analysis', '52-week range'], a: 1, e: 'Precedents include a control premium and often synergies. The DCF can be higher, but it depends heavily on assumptions.' },
      { q: 'FY2025 revenue 500; 6M 2026 revenue 280; 6M 2025 revenue 240. LTM revenue is:', o: ['520', '540', '780', '500'], a: 1, e: '500 + 280 – 240 = 540.' },
      { q: 'Why do bankers prefer the median multiple to the mean?', o: ['It is always higher', 'It is less sensitive to outliers', 'It is required by regulators', 'The mean ignores negative values'], a: 1, e: 'Outliers like 80x EBITDA skew the mean; the median is robust.' },
      { q: 'Which is the best primary multiple for a REIT?', o: ['EV/EBITDA', 'P/FFO', 'P/E', 'EV/Revenue'], a: 1, e: 'Real-estate depreciation distorts net income. FFO adds it back.' },
      { q: 'An LBO analysis in a football field typically represents:', o: ['The maximum a strategic buyer could pay', 'A floor based on what a financial sponsor could pay for its target IRR', 'The current trading price', 'Liquidation value'], a: 1, e: 'It shows what a sponsor could afford; strategic buyers with synergies can often pay more.' },
      { q: 'Peers trade at 8x–10x EBITDA. Target EBITDA $50m, net debt $100m, 10m shares. Implied share price range:', o: ['$30–$40', '$40–$50', '$20–$30', '$50–$60'], a: 0, e: 'EV 400–500; equity 300–400; per share $30–$40.' },
      { q: 'Which is NOT a typical reason precedent multiples differ from trading multiples?', o: ['Control premium', 'Synergies', 'Different market conditions at deal date', 'Precedents always use forward EBITDA'], a: 3, e: 'Precedents usually use LTM metrics, since forward estimates for targets often aren’t public.' }
    ],
    cards: [
      { q: 'What are the three main valuation methodologies?', a: 'Trading comparables, precedent transactions (both relative) and the DCF (intrinsic). Also LBO analysis, sum-of-the-parts, DDM and liquidation value in specific cases.', d: 1 },
      { q: 'Walk me through a trading comps analysis.', a: 'Pick peers by industry, size, growth and geography; gather share prices, diluted shares, EV bridge items and LTM/forward financials; normalize and calendarize; compute multiples; take median/quartiles; apply to the target’s metrics; bridge to implied share price.', d: 1 },
      { q: 'Why do precedent transactions usually yield higher values than trading comps?', a: 'Buyers pay a control premium (typically 20–40%) and price in synergies.', d: 1 },
      { q: 'When would a DCF give the highest valuation?', a: 'When projections are optimistic (high growth/margins), terminal assumptions aggressive, or the market is depressed so comps trade low.', d: 2 },
      { q: 'How do you calculate LTM figures?', a: 'Most recent fiscal year + current year-to-date – prior year-to-date.', d: 1 },
      { q: 'What is a football field?', a: 'A horizontal bar chart showing the valuation range implied by each method, used to frame negotiations and fairness opinions.', d: 1 },
      { q: 'How would you value a bank?', a: 'Equity-based methods: P/E, P/B, P/TBV and a dividend discount model. Debt/interest are operating items, so EV/EBITDA and an unlevered DCF don’t apply.', d: 2 },
      { q: 'How would you value a company with negative earnings?', a: 'EV/Revenue or EV/Gross profit multiples, plus a DCF with a long enough horizon to reach steady-state profitability.', d: 2 },
      { q: 'What is sum-of-the-parts valuation and when is it used?', a: 'Valuing each business segment separately with its own multiples/peers, then adding them and subtracting net debt. Used for conglomerates with distinct divisions.', d: 2 },
      { q: 'What factors make a company trade at a premium to its peers?', a: 'Faster growth, higher margins and returns on capital, lower risk/volatility, stronger market position, better management or capital allocation.', d: 2 },
      { q: 'How do you calendarize a company with a June fiscal year-end to CY2026?', a: 'CY2026 ≈ 6/12 × FY ending Jun-2026 + 6/12 × FY ending Jun-2027.', d: 3 },
      { q: 'What is FFO and why is it used for REITs?', a: 'Funds from operations = net income + real-estate depreciation & amortization – gains on property sales. Real-estate depreciation doesn’t reflect economic value decline, so FFO better captures recurring cash earnings.', d: 3 }
    ]
  });

  /* ------------------------------------------------------------------ */
  C.modules.push({
    id: 'dcf',
    num: '05',
    title: 'Discounted Cash Flow (DCF)',
    tagline: 'The most important technical question in finance interviews, piece by piece.',
    lessons: [
      {
        id: 'dcf-walk',
        title: '"Walk me through a DCF"',
        minutes: 10,
        summary: 'The 90-second answer, then each step in detail.',
        tool: 'dcf',
        body: `
<p>A DCF values a company as the present value of the cash it will generate for all its investors. This is the most frequently asked technical question, so you should be able to deliver this answer cold:</p>

<div class="say"><div class="say-label">Say it in the interview: "Walk me through a DCF."</div>
<p>"First, I project the company's unlevered free cash flow for five to ten years, which is EBIT times one minus the tax rate, plus D&amp;A, minus capex, minus the change in working capital. Then I calculate a terminal value for the cash flows beyond the projection period, either with the Gordon Growth method using a long-term growth rate or by applying an exit multiple to final-year EBITDA. I discount the cash flows and the terminal value back to today at the weighted average cost of capital. The sum is the enterprise value. To get to equity value, I subtract net debt and other claims, and I divide by diluted shares to get an implied share price."</p></div>

<ol class="steps">
<li><strong>Project unlevered FCF</strong> (UFCF), usually 5–10 years, until growth and margins stabilize.</li>
<li><strong>Calculate the discount rate</strong>: WACC, because UFCF belongs to both debt and equity holders.</li>
<li><strong>Calculate terminal value</strong> (TV) at the end of the projection period.</li>
<li><strong>Discount</strong> the UFCFs and TV to present value and sum: enterprise value.</li>
<li><strong>Bridge</strong> from EV to equity value, then to share price.</li>
<li><strong>Sensitize</strong>: tables of share price against WACC and terminal growth (or exit multiple).</li>
</ol>

<div class="callout key"><strong>Try it:</strong> the <a href="#tool-dcf">DCF Builder</a> runs every step with live numbers. Change WACC by 1% and watch how much the value moves; that sensitivity is the whole lesson of the DCF.</div>

<details class="practice"><summary>Why do you use 5 or 10 years for the projection period?</summary>
<div><p>You project until the company reaches a <strong>steady state</strong> (stable growth, margins and reinvestment) so that a perpetuity formula is reasonable for everything after. Mature companies need about 5 years; high-growth companies may need 10 or more. Beyond that, explicit forecasts become guesswork.</p></div></details>
`,
        videos: [
          { t: 'Walk Me Through a DCF: Investment Banking Interview Question', u: 'https://www.youtube.com/watch?v=wSjk7j9rN_M' },
          { t: '"Walk Me Through a DCF" (Investment Banking Interview Masterclass)', u: 'https://www.youtube.com/watch?v=3T_P0ym1DFs' },
          { t: 'IB Technical Interviews: Walk me through a DCF (Part 1)', u: 'https://www.youtube.com/watch?v=P8Ms4wa6Jyg' },
          { t: 'IB Technical Interviews: Walk me through a DCF (Part 2)', u: 'https://www.youtube.com/watch?v=algGfeCmFiE' }
        ],
        search: 'walk me through a DCF interview answer'
      },
      {
        id: 'dcf-ufcf',
        title: 'Unlevered free cash flow',
        minutes: 12,
        summary: 'Building UFCF, and how it differs from levered FCF.',
        tool: 'dcf',
        body: `
<div class="formula">UFCF = EBIT × (1 – t) + D&amp;A – Capex – Δ Net working capital</div>
<p>EBIT × (1 – t) is also called <mark>NOPAT</mark> (net operating profit after tax). Taxes are calculated on EBIT, not on pre-tax income, because UFCF assumes the company has no debt. That's what "unlevered" means.</p>

<h3>Worked example (year 1)</h3>
<div class="statement">
<div class="row"><span>Revenue</span><span>1,000</span></div>
<div class="row"><span>EBIT (20% margin)</span><span>200</span></div>
<div class="row sub"><span>– Taxes on EBIT @ 25%</span><span>(50)</span></div>
<div class="row total"><span>NOPAT</span><span>150</span></div>
<div class="row sub"><span>+ D&amp;A</span><span>40</span></div>
<div class="row sub"><span>– Capex</span><span>(60)</span></div>
<div class="row sub"><span>– Increase in NWC</span><span>(10)</span></div>
<div class="row total grand"><span>Unlevered FCF</span><span>120</span></div>
</div>

<h3>Unlevered vs. levered FCF</h3>
<table class="fin">
<thead><tr><th></th><th>Unlevered FCF</th><th>Levered FCF</th></tr></thead>
<tbody>
<tr><td>Starting point</td><td>EBIT × (1 – t)</td><td>Net income (after interest)</td></tr>
<tr><td>Debt flows</td><td>Excluded</td><td>Subtract mandatory principal repayment (add new borrowing)</td></tr>
<tr><td>Belongs to</td><td>Debt + equity holders</td><td>Equity holders only</td></tr>
<tr><td>Discount rate</td><td>WACC</td><td>Cost of equity</td></tr>
<tr><td>Result</td><td>Enterprise value</td><td>Equity value</td></tr>
</tbody></table>
<p>Bankers mostly use unlevered DCFs because they're independent of capital structure, which can change after a deal.</p>

<h3>Common UFCF questions</h3>
<ul>
<li><strong>Why add back D&amp;A but subtract capex?</strong> D&amp;A is a non-cash expense that reduced EBIT; capex is the real cash spent on long-term assets.</li>
<li><strong>Do you count stock-based compensation?</strong> Technically it's non-cash, but it's a real cost to shareholders. A careful analyst either treats it as a cash expense or includes the future dilution in the share count. Never add it back <em>and</em> ignore the dilution.</li>
<li><strong>What if D&amp;A rises by $10?</strong> NOPAT falls $10 × (1 – t), D&amp;A add-back +$10, so UFCF <strong>rises by $10 × t</strong> (the tax shield), assuming capex is unchanged.</li>
</ul>
`,
        videos: [
          { t: 'Unlevered vs Levered Free Cash Flow Explained: How to Nail This IB Interview Question', u: 'https://www.youtube.com/watch?v=8m0yyVNaFhw' },
          { t: 'FCF, UFCF, LFCF (worked from the statements)', u: 'https://www.youtube.com/watch?v=DtXb6yrtDOY' },
          { t: 'Levered vs. Unlevered Free Cash Flow', u: 'https://www.youtube.com/watch?v=Ih-yuqn4xVA' }
        ],
        search: 'unlevered free cash flow formula explained'
      },
      {
        id: 'dcf-wacc',
        title: 'WACC, CAPM & beta',
        minutes: 16,
        summary: 'Calculating the discount rate, including levering and unlevering beta.',
        tool: 'wacc',
        body: `
<div class="formula">WACC = E/(D+E) × K<sub>e</sub> + D/(D+E) × K<sub>d</sub> × (1 – t)</div>
<p>WACC is the blended required return of all capital providers, weighted by <strong>market values</strong> (not book values), ideally at the company's <strong>target</strong> long-run capital structure. Add preferred stock as a third term if material.</p>

<h3>Cost of equity: CAPM</h3>
<div class="formula">K<sub>e</sub> = R<sub>f</sub> + β × (Equity risk premium) [+ size / country premium]</div>
<ul>
<li><strong>Risk-free rate:</strong> yield on the 10-year (or 20-year) government bond in the company's currency.</li>
<li><strong>Equity risk premium:</strong> the extra return investors demand to hold stocks instead of risk-free bonds, typically 4–6% for the U.S.</li>
<li><strong>Beta (β):</strong> sensitivity of the stock's returns to the market's. β = 1 moves with the market; β = 1.5 is 50% more volatile; utilities often sit near 0.5–0.7.</li>
</ul>

<h3>Unlevering and relevering beta</h3>
<p>A company's observed (levered) beta includes financial risk from its debt. To use peers' betas for your target:</p>
<ol class="steps">
<li><strong>Unlever</strong> each peer's beta to strip out its capital structure: β<sub>U</sub> = β<sub>L</sub> / [1 + (1 – t) × D/E]</li>
<li>Take the <strong>median</strong> unlevered beta (pure business risk).</li>
<li><strong>Relever</strong> it at your target's capital structure: β<sub>L</sub> = β<sub>U</sub> × [1 + (1 – t) × D/E]</li>
</ol>
<p>This uses the Hamada formula, which assumes debt has a beta of zero.</p>

<h3>Cost of debt</h3>
<p>The yield to maturity on the company's existing bonds, or the rate it would pay on new debt (from its credit rating and comparable spreads). It's multiplied by (1 – t) because <strong>interest is tax-deductible</strong>.</p>

<h3>Worked example</h3>
<p>R<sub>f</sub> = 4.0%, ERP = 5.5%, peer unlevered β = 0.90, target D/E = 0.5, tax = 25%, pre-tax K<sub>d</sub> = 6.0%.</p>
<ul>
<li>Relevered β = 0.90 × (1 + 0.75 × 0.5) = 1.2375</li>
<li>K<sub>e</sub> = 4.0% + 1.2375 × 5.5% = 10.81%</li>
<li>After-tax K<sub>d</sub> = 6.0% × 0.75 = 4.50%</li>
<li>Weights: D/E = 0.5 → E = 66.7%, D = 33.3%</li>
<li>WACC = 0.667 × 10.81% + 0.333 × 4.50% = <strong>8.70%</strong></li>
</ul>

<div class="callout key"><strong>Why doesn't more debt always lower WACC?</strong> Debt is cheaper than equity (lower risk, tax-deductible), so adding some lowers WACC. But more debt raises the risk to equity holders (higher levered beta) and eventually raises the cost of debt itself as default risk climbs. WACC is roughly U-shaped; the bottom is the optimal capital structure. See the chart in the <a href="#tool-wacc">WACC calculator</a>.</div>

<div class="say"><div class="say-label">Say it in the interview: "How do you calculate WACC?"</div>
<p>"WACC is the cost of equity times the percentage of equity in the capital structure, plus the after-tax cost of debt times the percentage of debt, using market values and ideally a target capital structure. Cost of equity comes from CAPM: the risk-free rate plus beta times the equity risk premium. I'd get beta by unlevering peer betas, taking the median, and relevering it at the target's capital structure. Cost of debt is the yield on the company's debt, multiplied by one minus the tax rate since interest is deductible."</p></div>

<details class="practice"><summary>Why is the cost of equity higher than the cost of debt?</summary>
<div><p>Equity holders are paid last (residual claim) and have no guaranteed payments, so they bear more risk and demand higher returns. Also, interest on debt is tax-deductible, which lowers its effective cost further.</p></div></details>
`,
        videos: [
          { t: 'WACC Explained for Beginners', u: 'https://www.youtube.com/watch?v=crMSEf3_8X0' },
          { t: 'How to Leverage Beta and Calculate Market Risk Premium', u: 'https://www.youtube.com/watch?v=5JCPkfwNGTw' },
          { t: 'Think like an Expert: Masterclass on Cost of Capital', u: 'https://www.youtube.com/watch?v=nDhEv9Z9F14' }
        ],
        search: 'WACC CAPM unlever relever beta explained'
      },
      {
        id: 'dcf-tv',
        title: 'Terminal value',
        minutes: 12,
        summary: 'Gordon Growth vs. exit multiple, and how to sanity-check each.',
        tool: 'dcf',
        body: `
<p>Terminal value captures all cash flows after the projection period. It typically makes up <strong>60–80% of total DCF value</strong>, so it deserves the most scrutiny.</p>

<h3>1. Perpetuity growth (Gordon Growth) method</h3>
<div class="formula">TV<sub>N</sub> = UFCF<sub>N</sub> × (1 + g) / (WACC – g)</div>
<p>g is the long-term growth rate, usually 2–3%, at or below long-run nominal GDP growth. A company can't grow faster than the economy forever.</p>

<h3>2. Exit multiple method</h3>
<div class="formula">TV<sub>N</sub> = EBITDA<sub>N</sub> × Exit EV/EBITDA multiple</div>
<p>The multiple usually comes from current trading comps. Bankers like it because it's market-based; academics criticize it because it imports relative valuation into an intrinsic method.</p>

<h3>Cross-check each method against the other</h3>
<div class="formula">Implied exit multiple = TV<sub>Gordon</sub> / EBITDA<sub>N</sub></div>
<div class="formula">Implied growth rate = (TV × WACC – UFCF<sub>N</sub>) / (TV + UFCF<sub>N</sub>)</div>
<p>If a 2.5% growth rate implies a 25x EBITDA exit multiple when peers trade at 10x, something is wrong.</p>

<h3>Discounting the terminal value</h3>
<p>TV is a value as of the end of year N, so discount it by N full years: TV / (1 + WACC)<sup>N</sup>.</p>
<p>With the <mark>mid-year convention</mark> (cash flows assumed to arrive mid-year, so each year's UFCF is discounted at t – 0.5), a Gordon Growth TV is discounted at N – 0.5 for consistency, while an exit-multiple TV is still discounted at N, because a multiple reflects a point-in-time sale value.</p>

<div class="callout trap"><strong>Common mistakes:</strong> forgetting the (1 + g) adjustment, using a growth rate above WACC or above GDP, discounting TV with the wrong exponent, or using an LTM exit multiple on a forward metric.</div>

<details class="practice"><summary>Which method gives a higher terminal value?</summary>
<div><p>There's no general answer; it depends on the inputs. Exit multiples are often higher in strong markets because current multiples embed short-term optimism. The correct answer is to calculate both and check that each implies a reasonable value for the other.</p></div></details>
`,
        videos: [
          { t: 'Terminal Value: Gordon Growth vs. Exit Multiple Method (Step-by-Step)', u: 'https://www.youtube.com/watch?v=SP9ceeNyfsI' },
          { t: 'What Terminal Value Method Gives A Higher Valuation?', u: 'https://www.youtube.com/watch?v=X6kvOVN-_MI' },
          { t: 'DCF Terminal Value: Gordon Growth Method Intuition', u: 'https://www.youtube.com/watch?v=hCGn1ejYs1I' }
        ],
        search: 'DCF terminal value gordon growth vs exit multiple'
      },
      {
        id: 'dcf-questions',
        title: 'DCF follow-ups & sensitivities',
        minutes: 12,
        summary: 'The 12 follow-up questions interviewers ask after "walk me through a DCF".',
        tool: 'dcf',
        body: `
<h3>Directional questions: what increases DCF value?</h3>
<table class="fin">
<thead><tr><th>Change</th><th>Effect on value</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Higher revenue growth or margins</td><td class="pos">Up</td><td>More cash flow</td></tr>
<tr><td>Lower WACC</td><td class="pos">Up</td><td>Future cash discounted less</td></tr>
<tr><td>Higher terminal growth or exit multiple</td><td class="pos">Up</td><td>Larger TV</td></tr>
<tr><td>Higher capex or working-capital needs</td><td class="neg">Down</td><td>Less FCF</td></tr>
<tr><td>Higher tax rate</td><td class="neg">Down</td><td>Less NOPAT</td></tr>
<tr><td>Switching to mid-year convention</td><td class="pos">Up</td><td>Cash arrives earlier on average</td></tr>
</tbody></table>

<h3>Rapid-fire follow-ups</h3>
<dl class="qa">
<dt>Would you rather have a 1% change in WACC or a 1% change in terminal growth?</dt>
<dd>Both matter a lot because they appear in the TV denominator (WACC – g). WACC also discounts every projected year, so it typically moves value somewhat more, but the answer depends on the inputs. Show it with a sensitivity table.</dd>
<dt>What's the impact of a $100 increase in debt on a DCF?</dt>
<dd>Enterprise value from an unlevered DCF doesn't change (UFCF ignores debt), unless the higher leverage changes the WACC. Equity value falls by $100 if the cash is spent; is unchanged if the cash is held.</dd>
<dt>How do you get from EV to share price?</dt>
<dd>Subtract debt, preferred and NCI; add cash and non-operating assets; divide by diluted shares (which may be circular with the share price, through the TSM).</dd>
<dt>Why not use a DCF for a bank?</dt>
<dd>Interest and debt are part of operations, and regulatory capital limits distributions. Use a dividend discount model or a levered DCF on distributable cash, plus P/B and P/TBV.</dd>
<dt>What are the biggest weaknesses of a DCF?</dt>
<dd>Sensitivity to assumptions, TV dominance, and garbage-in-garbage-out projections. It's best used to understand what you need to believe for a given price.</dd>
<dt>How do you treat a company with a big NOL in a DCF?</dt>
<dd>Reduce cash taxes in the projection period by the NOL usage (subject to limits), or value the NOL separately and add it to EV.</dd>
<dt>What is a stub period?</dt>
<dd>A partial first period when the valuation date falls mid-year; only the remaining portion of that year's cash flow is included and discounted by a fractional period.</dd>
</dl>

<h3>Reading a sensitivity table</h3>
<p>The <a href="#tool-dcf">DCF Builder</a> produces a share-price grid across WACC and terminal growth. Notice that the grid is <em>not</em> symmetric: value rises faster as g approaches WACC. That convexity is a sign of how fragile Gordon-Growth TVs are at low spreads.</p>
`,
        videos: [
          { t: 'Aswath Damodaran: lectures on valuation (channel)', u: 'https://www.youtube.com/@AswathDamodaranonValuation' },
          { t: 'Free DCF valuation template with instructions', u: 'https://www.youtube.com/watch?v=v7XVmGnmiCY' }
        ],
        search: 'DCF interview questions follow up sensitivity analysis'
      }
    ],
    quiz: [
      { q: 'EBIT 400, tax 25%, D&A 50, capex 80, increase in NWC 20. UFCF is:', o: ['250', '300', '270', '350'], a: 0, e: 'NOPAT = 300; + 50 – 80 – 20 = 250.' },
      { q: 'Final-year UFCF is $100, WACC 9%, g 3%. Gordon Growth TV is:', o: ['$1,667', '$1,717', '$1,111', '$1,600'], a: 1, e: '100 × 1.03 / (0.09 – 0.03) = 103 / 0.06 = $1,716.7.' },
      { q: 'Levered beta 1.4, D/E 0.75, tax 20%. Unlevered beta is:', o: ['0.80', '0.875', '1.00', '1.12'], a: 1, e: 'βU = 1.4 / [1 + (1 – 0.20) × 0.75] = 1.4 / 1.6 = 0.875.' },
      { q: 'Levered FCF should be discounted at:', o: ['WACC', 'Cost of debt', 'Cost of equity', 'Risk-free rate'], a: 2, e: 'LFCF belongs only to equity holders, so use the cost of equity; the result is equity value.' },
      { q: 'Rf 4%, beta 1.2, ERP 5%. Cost of equity:', o: ['9.0%', '10.0%', '10.8%', '6.0%'], a: 1, e: '4% + 1.2 × 5% = 10%.' },
      { q: 'Which change lowers the DCF value?', o: ['Lower WACC', 'Switching to mid-year convention', 'Higher working-capital investment', 'Higher terminal growth rate'], a: 2, e: 'More NWC investment reduces free cash flow.' },
      { q: 'D&A increases by $10 with capex unchanged, tax 25%. UFCF changes by:', o: ['–$7.50', '+$2.50', '+$10', '$0'], a: 1, e: 'NOPAT –7.50, add-back +10 → +2.50 (the tax shield).' },
      { q: 'Under the mid-year convention, a Gordon Growth TV for a 5-year model is typically discounted using an exponent of:', o: ['5', '4.5', '5.5', '0.5'], a: 1, e: 'For consistency with mid-year cash flows, the perpetuity-based TV uses N – 0.5 = 4.5. An exit-multiple TV stays at N = 5.' },
      { q: 'Which rate typically serves as the risk-free rate in CAPM for a U.S. company?', o: ['Fed funds rate', '3-month T-bill', '10-year U.S. Treasury yield', 'Prime rate'], a: 2, e: 'A long-dated government bond yield matches the long-duration nature of equity cash flows.' }
    ],
    cards: [
      { q: 'Walk me through a DCF.', a: 'Project UFCF 5–10 years; calculate TV via Gordon Growth or exit multiple; discount UFCF and TV at WACC to get EV; subtract net debt and other claims to get equity value; divide by diluted shares for implied share price.', d: 1 },
      { q: 'How do you calculate unlevered free cash flow?', a: 'EBIT × (1 – t) + D&A – capex – increase in net working capital.', d: 1 },
      { q: 'How do you calculate WACC?', a: 'E/(D+E) × Ke + D/(D+E) × Kd × (1 – t), using market values and target capital structure. Ke via CAPM; Kd from bond yields or comparable debt.', d: 1 },
      { q: 'What is CAPM?', a: 'Ke = Rf + β × ERP. Risk-free rate plus beta times the equity risk premium.', d: 1 },
      { q: 'How do you unlever and relever beta?', a: 'βU = βL / [1 + (1–t)D/E] for each peer; take the median; relever: βL = βU × [1 + (1–t)D/E] using the target’s capital structure.', d: 2 },
      { q: 'What are the two methods to calculate terminal value?', a: 'Gordon Growth: UFCF_N × (1+g)/(WACC – g). Exit multiple: EBITDA_N × EV/EBITDA multiple. Cross-check by computing the implied multiple and implied growth rate.', d: 1 },
      { q: 'Why is the cost of debt multiplied by (1 – t)?', a: 'Interest is tax-deductible, so the effective after-tax cost to the company is lower.', d: 1 },
      { q: 'Why is the cost of equity higher than the cost of debt?', a: 'Equity is the residual claim with no guaranteed payments, so it’s riskier; and debt interest is tax-deductible.', d: 1 },
      { q: 'Unlevered vs. levered DCF: what are the differences?', a: 'Unlevered: UFCF (pre-interest), discount at WACC, gives EV. Levered: LFCF (after interest and debt repayments), discount at cost of equity, gives equity value directly.', d: 2 },
      { q: 'Why might adding debt not lower WACC indefinitely?', a: 'More debt raises equity risk (levered beta) and eventually the cost of debt via default risk. WACC is U-shaped, minimized at the optimal capital structure.', d: 2 },
      { q: 'What growth rate is reasonable for terminal value and why?', a: 'Typically 2–3%, at or below long-run nominal GDP growth/inflation, since no company can outgrow the economy forever.', d: 1 },
      { q: 'What percentage of DCF value usually comes from TV, and what does that imply?', a: 'Often 60–80%. The valuation is highly sensitive to long-term assumptions, so TV inputs need cross-checks and sensitivity tables.', d: 2 },
      { q: 'What is the mid-year convention and how does it affect value?', a: 'Assumes cash flows arrive mid-year, discounting each at t – 0.5. It raises value slightly. Gordon TV discounted at N – 0.5; exit-multiple TV at N.', d: 3 },
      { q: 'If D&A increases by $10, what happens to UFCF?', a: 'UFCF rises by $10 × tax rate (the tax shield), assuming capex is unchanged.', d: 2 },
      { q: 'How do you calculate implied perpetuity growth from an exit-multiple TV?', a: 'g = (TV × WACC – UFCF_N) / (TV + UFCF_N).', d: 3 },
      { q: 'Should stock-based compensation be added back in UFCF?', a: 'It’s non-cash, but a real cost. Either treat it as a cash expense or include the resulting dilution; adding it back and ignoring dilution overstates value.', d: 3 }
    ]
  });
})(window.COURSE);
