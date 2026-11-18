/* Course content, part 3: M&A, LBO & Private Equity, Debt & Credit */
(function (C) {
  /* ------------------------------------------------------------------ */
  C.modules.push({
    id: 'ma',
    num: '06',
    title: 'Mergers & Acquisitions',
    tagline: 'Why deals happen, how they run, and the accretion/dilution math.',
    lessons: [
      {
        id: 'ma-why',
        title: 'Why companies buy companies',
        minutes: 8,
        summary: 'Strategic rationale, synergies, and why most deals disappoint.',
        body: `
<h3>Common rationales</h3>
<ul>
<li><strong>Growth</strong>: buying revenue is faster than building it, especially in mature markets.</li>
<li><strong>Synergies</strong>: the combined company is worth more than the two separately.
  <ul><li><strong>Cost synergies</strong>: eliminating duplicate HQ, sales or IT functions; procurement scale. More reliable and easier to estimate.</li>
  <li><strong>Revenue synergies</strong>: cross-selling, new geographies, pricing power. Harder to achieve, so investors usually discount them heavily.</li></ul></li>
<li><strong>Capabilities</strong>: technology, IP, talent ("acqui-hire"), or a product the buyer can't build fast enough.</li>
<li><strong>Market position</strong>: consolidation, removing a competitor, vertical integration of suppliers or distributors.</li>
<li><strong>Financial</strong>: a target that looks undervalued, tax attributes (NOLs), or using a richly valued stock as currency.</li>
</ul>

<h3>Why many deals destroy value</h3>
<p>Research consistently finds that a large share of acquisitions fail to create value for the <em>buyer's</em> shareholders. Typical causes: overpaying (the "winner's curse" in competitive auctions), overestimating synergies, integration and culture problems, and management empire-building. Target shareholders usually do well, because they capture the premium.</p>

<div class="callout key"><strong>Value creation test:</strong> a deal creates value for the buyer only if the value of the target plus the synergies exceeds the price paid (including fees). Equivalently, the return on the invested capital should exceed the buyer's cost of capital.</div>

<div class="say"><div class="say-label">Say it in the interview: "Walk me through a recent deal you've followed."</div>
<p>Use this structure: <strong>(1)</strong> who bought whom, for how much, and how it was paid for (cash, stock, debt); <strong>(2)</strong> the valuation, e.g., EV/EBITDA and premium paid; <strong>(3)</strong> the strategic rationale; <strong>(4)</strong> risks (regulatory, integration, price); <strong>(5)</strong> your view: was it a good deal and why? Prepare two deals in the industry of the group you are interviewing with, and keep them current.</p></div>
`,
        videos: [],
        search: 'why do companies make acquisitions synergies explained'
      },
      {
        id: 'ma-process',
        title: 'The M&A process',
        minutes: 10,
        summary: 'How a sell-side auction runs from kickoff to closing.',
        body: `
<p>Most sell-side processes are run as <mark>auctions</mark> to maximize price and terms. A broad auction contacts many buyers; a targeted auction a handful; a negotiated sale just one.</p>
<ol class="steps">
<li><strong>Preparation (4–6 weeks).</strong> The bank builds the financial model, valuation, buyer list, a short anonymous <strong>teaser</strong>, and the confidential information memorandum (<strong>CIM</strong>).</li>
<li><strong>First round (4–6 weeks).</strong> Interested buyers sign an <strong>NDA</strong>, receive the CIM, and submit non-binding indications of interest (<strong>IOIs</strong>) with a valuation range.</li>
<li><strong>Second round (6–8 weeks).</strong> A shortlist gets management presentations, site visits and access to the virtual <strong>data room</strong> for due diligence. Buyers submit binding letters of intent (<strong>LOIs</strong>) with a marked-up purchase agreement.</li>
<li><strong>Negotiation and signing.</strong> The seller picks a winner, negotiates the definitive agreement, and the bank may deliver a <strong>fairness opinion</strong> to the board.</li>
<li><strong>Closing.</strong> Regulatory approval (antitrust, e.g., HSR in the U.S.), shareholder votes if needed, financing, then funds transfer.</li>
</ol>
<p>Total: roughly 4–7 months from kickoff to signing, plus time to close.</p>

<h3>Buy-side work</h3>
<p>On the buy-side, the bank helps identify targets, values them, structures the offer, arranges financing, and runs the merger model to show the impact on the acquirer.</p>

<h3>Key terms</h3>
<ul>
<li><strong>Break-up fee</strong>: paid by the target if it walks away for a better offer (typically 2–4% of equity value). A <strong>reverse break-up fee</strong> is paid by the buyer if it can't close (e.g., financing or antitrust failure).</li>
<li><strong>Go-shop / no-shop</strong>: whether the target may solicit other bids after signing.</li>
<li><strong>Tender offer</strong>: buying shares directly from shareholders, often faster than a merger vote.</li>
<li><strong>Earn-out</strong>: part of the price paid later if the target hits performance targets, which bridges valuation gaps.</li>
</ul>
`,
        videos: [],
        search: 'sell side M&A process explained investment banking'
      },
      {
        id: 'ma-accretion',
        title: 'Accretion / dilution analysis',
        minutes: 18,
        summary: 'Pro forma EPS, and the cost-of-acquisition shortcut that answers questions in seconds.',
        tool: 'merger',
        body: `
<p>A deal is <mark>accretive</mark> if the buyer's pro forma EPS is higher than its standalone EPS, and <mark>dilutive</mark> if lower. Boards and investors watch it closely, even though EPS isn't the same as value.</p>
<div class="formula">Pro forma EPS = (Buyer NI + Target NI ± after-tax adjustments) / (Buyer shares + New shares issued)</div>
<p>After-tax adjustments: – foregone interest on cash used, – interest on new debt, + synergies, – new D&amp;A from asset write-ups, – amortization of financing fees.</p>

<h3>The shortcut: compare costs to the target's yield</h3>
<p>Each funding source has an after-tax "cost":</p>
<ul>
<li><strong>Cash:</strong> foregone interest rate × (1 – t)</li>
<li><strong>Debt:</strong> interest rate × (1 – t)</li>
<li><strong>Stock:</strong> the buyer's earnings yield = 1 / buyer's P/E (= buyer NI / buyer equity value)</li>
</ul>
<p>Compute the weighted cost of the mix, then compare it with the target's yield at the purchase price = target NI / purchase equity value = 1 / purchase P/E.</p>
<div class="callout key"><strong>Rule:</strong> if the weighted cost of acquisition is <strong>below</strong> the target's yield, the deal is accretive (before synergies and write-up D&amp;A). For an all-stock deal this reduces to: buying a company with a <strong>lower P/E</strong> than your own is accretive.</div>

<h3>Worked example</h3>
<p>Buyer: share price $50, 100 shares, net income $400 (EPS $4.00, P/E 12.5x, earnings yield 8%). Target: net income $100, purchase equity price $1,000 (purchase P/E 10x, yield 10%). Tax 25%.</p>
<table class="fin num">
<thead><tr><th></th><th>All stock</th><th>All debt @ 6%</th></tr></thead>
<tbody>
<tr><td>New shares</td><td>1,000 / 50 = 20</td><td>0</td></tr>
<tr><td>After-tax interest</td><td>0</td><td>1,000 × 6% × 0.75 = 45</td></tr>
<tr><td>Pro forma NI</td><td>500</td><td>455</td></tr>
<tr><td>Pro forma shares</td><td>120</td><td>100</td></tr>
<tr><td>Pro forma EPS</td><td>$4.17</td><td>$4.55</td></tr>
<tr><td>Accretion</td><td class="pos">+4.2%</td><td class="pos">+13.8%</td></tr>
</tbody></table>
<p>Shortcut check: cost of stock 8% and cost of debt 4.5% are both below the 10% target yield, so both are accretive, and debt more so.</p>

<h3>Breakeven synergies</h3>
<p>If a deal is dilutive, the pre-tax synergies needed to break even = (EPS shortfall × pro forma shares) / (1 – t). The <a href="#tool-merger">Merger Model</a> calculates this automatically.</p>

<div class="callout trap"><strong>Accretion ≠ value creation.</strong> A high-P/E buyer can "buy" EPS growth by acquiring any lower-P/E company with stock, even a bad one. Sophisticated investors look at whether the return on the deal beats the cost of capital, and whether the price paid exceeds standalone value plus synergies.</div>

<div class="say"><div class="say-label">Say it in the interview: "Is this all-stock deal accretive?"</div>
<p>"In an all-stock deal, compare P/E multiples. If the buyer's P/E is higher than the P/E it's paying for the target, the deal is accretive because the buyer is effectively issuing expensive currency to buy cheaper earnings. If the buyer's P/E is lower, it's dilutive. Synergies and new D&amp;A from asset write-ups can change that."</p></div>

<details class="practice"><summary>Buyer P/E 15x, target purchase P/E 20x, 50% cash (foregone interest 4%) and 50% stock, tax 25%. Accretive or dilutive?</summary>
<div><p>Cost of cash: 4% × 0.75 = 3.0%. Cost of stock: 1/15 = 6.67%. Weighted cost: 0.5 × 3.0% + 0.5 × 6.67% = 4.83%. Target yield: 1/20 = 5.0%. Since 4.83% &lt; 5.0%, it's <strong>slightly accretive</strong>.</p></div></details>
`,
        videos: [
          { t: 'M&A Accretion Dilution Analysis (Merger Model)', u: 'https://www.youtube.com/watch?v=S5LtkqxC8dE' },
          { t: 'WST: Merger Modeling Basics: Accretion Dilution', u: 'https://www.youtube.com/watch?v=Mtpyuz1OJ-g' },
          { t: 'Accretion / Dilution Analysis: Mini-Merger Modeling', u: 'https://www.youtube.com/watch?v=KAgyHPAivZw' }
        ],
        search: 'accretion dilution analysis shortcut cost of acquisition'
      },
      {
        id: 'ma-ppa',
        title: 'Purchase price allocation, goodwill & deal structure',
        minutes: 14,
        summary: 'Combining balance sheets, creating goodwill, and stock vs. asset deals.',
        body: `
<h3>Purchase price allocation (PPA)</h3>
<p>When an acquisition closes, the buyer revalues the target's assets and liabilities to fair value. Any purchase price left over becomes goodwill.</p>
<div class="formula">Goodwill = Equity purchase price – (Target book equity – existing goodwill + asset write-ups – new DTL)</div>

<h3>Worked example (stock deal, 25% tax)</h3>
<ul>
<li>Equity purchase price: $1,000</li>
<li>Target book equity: $400 (no existing goodwill)</li>
<li>Write-up of intangibles and PP&amp;E: +$200</li>
<li>New deferred tax liability: $200 × 25% = $50 (the write-up isn't tax-deductible in a stock deal, so book and tax bases differ)</li>
<li>Adjusted identifiable net assets: 400 + 200 – 50 = $550</li>
<li><strong>Goodwill: 1,000 – 550 = $450</strong></li>
</ul>

<h3>Combining the balance sheets</h3>
<p>Pro forma BS = buyer BS + target BS (at fair value) + new goodwill + new debt or shares issued – cash used – target's old equity (eliminated) – fees. The target's shareholders' equity always disappears; the buyer's equity rises only by any new stock issued (and falls by expensed fees).</p>

<h3>Stock deal vs. asset deal vs. 338(h)(10)</h3>
<table class="fin">
<thead><tr><th></th><th>Stock purchase</th><th>Asset purchase</th><th>338(h)(10) election</th></tr></thead>
<tbody>
<tr><td>What's bought</td><td>Shares; all liabilities come along</td><td>Selected assets and liabilities</td><td>Shares, treated as assets for tax</td></tr>
<tr><td>Tax step-up for buyer</td><td>No (creates DTL)</td><td>Yes: write-ups and goodwill are tax-deductible</td><td>Yes</td></tr>
<tr><td>Seller preference</td><td>Usually preferred (single level of tax)</td><td>Can trigger double taxation for a C-corp</td><td>Requires the target to be an S-corp or a subsidiary</td></tr>
<tr><td>Typical use</td><td>Most public-company deals</td><td>Carve-outs, distressed sales, small private deals</td><td>Buying subsidiaries or S-corps</td></tr>
</tbody></table>

<h3>Cash vs. stock vs. debt: how buyers choose</h3>
<ul>
<li><strong>Cash</strong> is usually cheapest (low foregone interest), but limited by the cash on hand.</li>
<li><strong>Debt</strong> is next cheapest, limited by leverage capacity and credit rating.</li>
<li><strong>Stock</strong> is attractive when the buyer's shares are richly valued; it shares risk and upside with the target's shareholders, but dilutes ownership and signals the buyer may think its stock is overvalued.</li>
</ul>
`,
        videos: [
          { t: 'Purchase Price Allocation: Goodwill', u: 'https://www.youtube.com/watch?v=nC6SuApvHyo' },
          { t: 'What is Purchase Price Allocation?', u: 'https://www.youtube.com/watch?v=a18G3fcue4Q' }
        ],
        search: 'purchase price allocation goodwill deferred tax liability M&A'
      }
    ],
    quiz: [
      { q: 'Buyer P/E 20x, target purchased at 15x P/E, all-stock deal, no synergies. The deal is:', o: ['Accretive', 'Dilutive', 'Neutral', 'Cannot tell'], a: 0, e: 'Buyer’s cost of stock = 1/20 = 5% < target yield 1/15 = 6.7%. Accretive.' },
      { q: 'Debt costs 8% pre-tax, tax rate 25%. The after-tax cost of debt used in the shortcut is:', o: ['8%', '6%', '2%', '10%'], a: 1, e: '8% × (1 – 0.25) = 6%.' },
      { q: 'Equity purchase price $800, target book equity $300, asset write-ups $100, tax 25%, stock deal. Goodwill is:', o: ['$400', '$425', '$500', '$375'], a: 1, e: 'DTL = 25. Adjusted net assets = 300 + 100 – 25 = 375. Goodwill = 800 – 375 = 425.' },
      { q: 'Which is generally the cheapest form of acquisition financing?', o: ['Cash on hand', 'New stock', 'Preferred stock', 'Mezzanine debt'], a: 0, e: 'Cash only costs the after-tax interest it would have earned, typically the lowest rate.' },
      { q: 'In a stock purchase, why is a deferred tax liability created on asset write-ups?', o: ['Because the buyer pays more tax immediately', 'Because book basis is stepped up but tax basis is not, so future book D&A exceeds tax D&A', 'Because goodwill is amortized', 'It isn’t'], a: 1, e: 'Book and tax bases diverge: the difference times the tax rate is a DTL.' },
      { q: 'Which statement about a break-up fee is correct?', o: ['Paid by the buyer if regulators block the deal', 'Paid by the target if it accepts a superior offer', 'Paid to the bankers', 'A type of earn-out'], a: 1, e: 'That’s a target break-up fee. The buyer-paid version is a reverse break-up fee.' },
      { q: 'A deal is 3% dilutive. Which of these would NOT help make it accretive?', o: ['More cost synergies', 'Using more debt instead of stock (if cost of debt < buyer earnings yield)', 'Paying a higher premium', 'Lower write-up D&A'], a: 2, e: 'A higher price lowers the target’s yield and requires more financing, making it more dilutive.' }
    ],
    cards: [
      { q: 'Why would a company acquire another company?', a: 'Growth, cost and revenue synergies, new capabilities/technology/talent, market share or vertical integration, undervaluation, tax attributes, or using a richly valued stock as currency.', d: 1 },
      { q: 'Walk me through a merger model / accretion-dilution analysis.', a: 'Project buyer and target financials; assume purchase price and funding mix; calculate combined net income adjusting for foregone interest on cash, new interest, synergies and new D&A (all after-tax); add new shares to buyer shares; compare pro forma EPS to buyer standalone EPS.', d: 1 },
      { q: 'What is the quick way to tell if an all-stock deal is accretive?', a: 'Compare P/E multiples: if buyer P/E > purchase P/E of target, accretive; if lower, dilutive (before synergies and write-ups).', d: 1 },
      { q: 'How do you calculate the cost of each financing source in accretion/dilution?', a: 'Cash: foregone interest × (1–t). Debt: interest rate × (1–t). Stock: buyer’s earnings yield = 1/P/E. Compare the weighted cost to target’s yield = target NI / purchase price.', d: 2 },
      { q: 'Is an accretive deal always a good deal?', a: 'No. EPS accretion is short-term accounting. Value is created only if the price paid is less than the target’s standalone value plus synergies, i.e., returns exceed the cost of capital.', d: 2 },
      { q: 'How is goodwill calculated in an acquisition?', a: 'Equity purchase price minus the fair value of identifiable net assets (book equity – old goodwill + write-ups – new DTL).', d: 2 },
      { q: 'What are cost vs. revenue synergies, and which are more credible?', a: 'Cost: removing duplicate expenses, procurement scale. Revenue: cross-selling, pricing, new markets. Cost synergies are more credible and easier to execute.', d: 1 },
      { q: 'Describe a sell-side M&A process.', a: 'Prep (model, teaser, CIM, buyer list) → first round (NDAs, CIM, IOIs) → second round (management presentations, data room diligence, LOIs/markup) → negotiate and sign definitive agreement, fairness opinion → regulatory approvals → close.', d: 2 },
      { q: 'Stock purchase vs. asset purchase: key differences?', a: 'Stock: buyer gets all shares and liabilities, no tax step-up (DTL created), usually preferred by seller. Asset: buyer picks assets, gets tax-deductible step-up, may cause double taxation for a C-corp seller.', d: 3 },
      { q: 'What are breakeven synergies?', a: 'The pre-tax synergies needed for pro forma EPS to equal standalone EPS: (EPS shortfall × pro forma shares) / (1 – t).', d: 2 },
      { q: 'Why might a buyer use stock instead of cash?', a: 'Limited cash or debt capacity, a richly valued share price, wanting target holders to share risk/upside, or a merger-of-equals structure.', d: 2 },
      { q: 'What happens to the target’s shareholders’ equity when balance sheets are combined?', a: 'It’s eliminated. Buyer equity changes only by new shares issued (and expensed fees).', d: 2 }
    ]
  });

  /* ------------------------------------------------------------------ */
  C.modules.push({
    id: 'lbo',
    num: '07',
    title: 'LBOs & Private Equity',
    tagline: 'How sponsors use debt to amplify returns, and how to do a paper LBO in your head.',
    lessons: [
      {
        id: 'lbo-concept',
        title: 'What an LBO is, and why debt works',
        minutes: 10,
        summary: 'Leverage, the ideal candidate, and the three return drivers.',
        tool: 'lbo',
        body: `
<p>In a <mark>leveraged buyout</mark>, a private equity firm (the "sponsor") buys a company using a large amount of debt, typically 50–70% of the purchase price, and a smaller equity check. The company's own cash flows repay the debt over a 3–7 year hold, then the sponsor sells (exits) the business.</p>
<div class="callout key"><strong>The house analogy again:</strong> buy a $500k house with $100k down and a $400k mortgage. Rent pays down the mortgage. Sell in 5 years for the same $500k with $300k of mortgage left: your $100k became $200k, a 2x return, without the house appreciating at all.</div>

<h3>Why use debt?</h3>
<ul>
<li><strong>Smaller equity check:</strong> the same dollar gain on a smaller investment gives a higher percentage return.</li>
<li><strong>Cheaper capital:</strong> debt costs less than equity, and interest is tax-deductible.</li>
<li><strong>Discipline:</strong> mandatory payments force management to focus on cash generation.</li>
</ul>
<p>The trade-off is risk: more debt means a higher chance of default if the business underperforms.</p>

<h3>Three drivers of returns</h3>
<ol class="steps">
<li><strong>EBITDA growth</strong> (revenue growth and margin improvement).</li>
<li><strong>Debt paydown</strong> (deleveraging): cash flow converts debt into equity value.</li>
<li><strong>Multiple expansion</strong>: selling at a higher EV/EBITDA than you paid. Sponsors usually assume none in their base case.</li>
</ol>

<h3>The ideal LBO candidate</h3>
<ul>
<li>Stable, predictable, recurring cash flows</li>
<li>Low capital expenditure and working capital needs</li>
<li>Strong market position and defensible margins</li>
<li>Opportunities for cost cuts or operational improvement</li>
<li>Low existing debt and assets that can serve as collateral</li>
<li>A strong management team and a clear exit path (strategic sale, secondary buyout, IPO)</li>
<li>A reasonable purchase price</li>
</ul>

<div class="say"><div class="say-label">Say it in the interview: "Walk me through an LBO."</div>
<p>"A private equity firm buys a company using a combination of debt and equity. First, I'd set the purchase price, typically as a multiple of EBITDA, and the sources and uses: how much debt and sponsor equity fund the price plus fees. Then I'd project the company's cash flows over a 5-year hold and use the free cash flow to pay down debt. At exit, I'd assume a sale at an EBITDA multiple, subtract the remaining net debt to get exit equity value, and compare that to the initial equity to calculate the IRR and money multiple. The returns come from EBITDA growth, debt paydown and any multiple expansion."</p></div>
`,
        videos: [
          { t: 'How Do Leveraged Buyout Funds Make Money?', u: 'https://www.youtube.com/watch?v=KMhiRXC_-EM' },
          { t: 'What Is a Leveraged Buyout (LBO)? How PE Firms Use Debt', u: 'https://www.youtube.com/watch?v=_PI5PmnIgvE' },
          { t: 'How to Explain an LBO in a Private Equity and Investment Banking Job Interview', u: 'https://www.youtube.com/watch?v=GNUvSfW4HbQ' },
          { t: 'Private Equity Explained: from VC to Growth Equity to Buyouts', u: 'https://www.youtube.com/watch?v=TMzDjUboPTU' }
        ],
        search: 'leveraged buyout explained private equity returns'
      },
      {
        id: 'lbo-math',
        title: 'Returns math: IRR & MOIC in your head',
        minutes: 10,
        summary: 'The memorized table that makes paper LBOs fast.',
        tool: 'math',
        body: `
<div class="formula">MOIC = Exit equity / Initial equity &nbsp;&nbsp;&nbsp; IRR = MOIC<sup>(1 / years)</sup> – 1 &nbsp;(single entry and exit cash flow)</div>
<p>Memorize this grid. Interviewers expect you to estimate IRR within a couple of points without a calculator.</p>
<table class="fin num grid-irr">
<thead><tr><th>MOIC</th><th>3 years</th><th>4 years</th><th>5 years</th><th>7 years</th></tr></thead>
<tbody>
<tr><td>1.5x</td><td>14%</td><td>11%</td><td>8%</td><td>6%</td></tr>
<tr><td>2.0x</td><td>26%</td><td>19%</td><td>15%</td><td>10%</td></tr>
<tr><td>2.5x</td><td>36%</td><td>26%</td><td>20%</td><td>14%</td></tr>
<tr><td>3.0x</td><td>44%</td><td>32%</td><td>25%</td><td>17%</td></tr>
<tr><td>4.0x</td><td>59%</td><td>41%</td><td>32%</td><td>22%</td></tr>
</tbody></table>
<p class="small">Values rounded. Anchors to memorize: 2x in 5 years ≈ 15%, 3x in 5 years ≈ 25%, 2x in 3 years ≈ 26%.</p>

<h3>Estimation tricks</h3>
<ul>
<li><strong>Rule of 72:</strong> doubling in N years ≈ 72/N %. 2x in 4 years ≈ 18% (exact 19%).</li>
<li><strong>Interpolate</strong> between known anchors: 2.5x in 5 years sits between 15% and 25%, so about 20%.</li>
<li><strong>Work backward</strong>: "What MOIC do I need for a 20% IRR over 5 years?" 1.2<sup>5</sup> ≈ 2.5x.</li>
</ul>
<p>Useful powers: 1.1<sup>5</sup> ≈ 1.61, 1.15<sup>5</sup> ≈ 2.01, 1.2<sup>5</sup> ≈ 2.49, 1.25<sup>5</sup> ≈ 3.05, 1.3<sup>5</sup> ≈ 3.71.</p>

<div class="callout trap"><strong>IRR vs. MOIC trade-off.</strong> A dividend recap or early exit raises IRR but can lower MOIC. Sponsors care about both: IRR for time-weighted performance, MOIC because limited partners ultimately want cash multiples.</div>
<p>Drill these in the <a href="#tool-math">Mental Math Trainer</a> until they're instant.</p>
`,
        videos: [
          { t: 'How to Solve a Paper LBO in 4 Easy Steps (with quick tricks)', u: 'https://www.youtube.com/watch?v=xCFiNgf5AkI' }
        ],
        search: 'IRR MOIC mental math private equity interview'
      },
      {
        id: 'lbo-paper',
        title: 'Paper LBO: a full worked example',
        minutes: 15,
        summary: 'Solve a 5-year LBO with pen and paper in under 10 minutes.',
        tool: 'lbo',
        body: `
<p>Paper LBOs are common in PE interviews and increasingly in banking superdays. You get a short prompt and 5–15 minutes. The approach never changes:</p>
<ol class="steps">
<li>Calculate the purchase price and sources &amp; uses.</li>
<li>Project EBITDA to exit.</li>
<li>Calculate cumulative free cash flow and debt paydown.</li>
<li>Calculate exit equity value.</li>
<li>Calculate MOIC and approximate IRR.</li>
</ol>

<h3>The prompt</h3>
<div class="prompt-box">A sponsor buys a company with $100m of LTM EBITDA at 10.0x. Debt is 5.0x EBITDA at a 10% interest rate (assume interest on the initial balance). EBITDA grows by $10m per year. D&amp;A and capex are both $10m per year. Tax rate 25%. Ignore fees and working capital. All free cash flow repays debt. Exit after 5 years at 10.0x. What are the MOIC and IRR?</div>

<h3>Step 1: Sources &amp; uses</h3>
<p>Purchase EV = 10.0 × 100 = <strong>$1,000m</strong>. Debt = 5.0 × 100 = $500m. Sponsor equity = <strong>$500m</strong>.</p>

<h3>Step 2: EBITDA</h3>
<p>Years 1–5: 110, 120, 130, 140, 150.</p>

<h3>Step 3: Free cash flow</h3>
<p>Interest = 10% × 500 = $50m per year. Since D&amp;A = capex, FCF = net income.</p>
<table class="fin num">
<thead><tr><th>Year</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead>
<tbody>
<tr><td>EBITDA</td><td>110</td><td>120</td><td>130</td><td>140</td><td>150</td></tr>
<tr><td>– D&amp;A</td><td>(10)</td><td>(10)</td><td>(10)</td><td>(10)</td><td>(10)</td></tr>
<tr><td>– Interest</td><td>(50)</td><td>(50)</td><td>(50)</td><td>(50)</td><td>(50)</td></tr>
<tr><td>Pre-tax income</td><td>50</td><td>60</td><td>70</td><td>80</td><td>90</td></tr>
<tr><td>Net income (×0.75) = FCF</td><td>37.5</td><td>45</td><td>52.5</td><td>60</td><td>67.5</td></tr>
</tbody></table>
<p>Shortcut: the series rises by 7.5 each year, so the total = 5 × middle year = 5 × 52.5 = <strong>$262.5m</strong> of debt paid down.</p>

<h3>Step 4: Exit</h3>
<p>Exit EV = 10.0 × 150 = $1,500m. Remaining debt = 500 – 262.5 = $237.5m. Exit equity = <strong>$1,262.5m</strong>.</p>

<h3>Step 5: Returns</h3>
<p>MOIC = 1,262.5 / 500 ≈ <strong>2.5x</strong>. From the grid, 2.5x over 5 years ≈ <strong>20% IRR</strong> (exact: 20.4%).</p>

<h3>Return attribution</h3>
<ul>
<li>EBITDA growth: $50m × 10.0x = $500m</li>
<li>Multiple expansion: $0 (entry = exit multiple)</li>
<li>Debt paydown: $262.5m</li>
<li>Total value created: $762.5m = 1,262.5 – 500 ✓</li>
</ul>

<div class="callout key"><strong>Common follow-up:</strong> "What exit multiple do you need for a 25% IRR?" 25% over 5 years ≈ 3.0x, so exit equity = $1,500m. Add remaining debt of $237.5m: exit EV = $1,737.5m. Divide by $150m EBITDA ≈ <strong>11.6x</strong>.</div>
<p>Rebuild this example in the <a href="#tool-lbo">LBO Model</a> and try different leverage levels.</p>
`,
        videos: [
          { t: 'Paper LBO Explained: The Question That Ended Superday Interviews', u: 'https://www.youtube.com/watch?v=gvW7p9dF1vs' },
          { t: 'How to do a Paper LBO (MUST Know for Private Equity)', u: 'https://www.youtube.com/watch?v=mIH-3bgocTQ' },
          { t: 'Investment Banking Interviews: Basic Paper LBO #1', u: 'https://www.youtube.com/watch?v=uBcwaebT0lU' },
          { t: 'PE Recruiting Fundamentals: Paper LBO and Model Test Walk Through', u: 'https://www.youtube.com/watch?v=UovXX5Fhbc0' }
        ],
        search: 'paper LBO example walkthrough'
      },
      {
        id: 'lbo-debt',
        title: 'LBO debt structure & advanced questions',
        minutes: 12,
        summary: 'Debt tranches, covenants, dividend recaps and tricky follow-ups.',
        body: `
<h3>The capital stack (most senior first)</h3>
<table class="fin">
<thead><tr><th>Tranche</th><th>Typical features</th></tr></thead>
<tbody>
<tr><td><strong>Revolver</strong></td><td>Bank line of credit for liquidity; floating rate; usually undrawn at close; secured.</td></tr>
<tr><td><strong>Term Loan A</strong></td><td>Bank-held; amortizes significantly; floating rate; maintenance covenants.</td></tr>
<tr><td><strong>Term Loan B</strong></td><td>Institutional investors (CLOs); ~1% annual amortization, bullet at maturity; floating rate (SOFR + spread); often covenant-lite.</td></tr>
<tr><td><strong>Senior notes / high-yield bonds</strong></td><td>Fixed rate; 7–10 year maturity; bullet; call protection; incurrence covenants only.</td></tr>
<tr><td><strong>Subordinated / mezzanine</strong></td><td>Higher rate, often partly PIK (paid in kind, accruing to principal); may include warrants.</td></tr>
<tr><td><strong>Sponsor equity</strong></td><td>The residual: highest risk, highest required return (often 20%+ target IRR).</td></tr>
</tbody></table>

<h3>Covenants</h3>
<ul>
<li><strong>Maintenance covenants</strong> must be met every quarter (e.g., Debt/EBITDA &lt; 5.0x). Typical of bank loans.</li>
<li><strong>Incurrence covenants</strong> are tested only when the company takes an action, such as raising more debt or paying a dividend. Typical of bonds.</li>
</ul>

<h3>Advanced questions</h3>
<dl class="qa">
<dt>What is a dividend recap?</dt>
<dd>The company raises new debt and pays the proceeds to the sponsor as a dividend. It returns cash early, boosting IRR, and de-risks the investment, at the cost of higher leverage.</dd>
<dt>Would you rather have a lower purchase price or a higher exit multiple?</dt>
<dd>All else equal, a lower purchase price: it reduces the equity check today, while the exit multiple is uncertain and far away. Run both in the LBO tool to compare magnitudes for a given deal.</dd>
<dt>How does more leverage affect IRR?</dt>
<dd>As long as the business earns more on its assets than the after-tax cost of debt, more leverage raises IRR because the equity check shrinks. But it raises default risk, interest burden and covenant risk, and lenders cap it.</dd>
<dt>Why is an LBO valuation often lower than a DCF?</dt>
<dd>The LBO solves for the price that hits a high target IRR (20%+), which is higher than a typical WACC. A higher required return means a lower price.</dd>
<dt>What happens if the company can't pay its debt?</dt>
<dd>Covenant breach, then negotiations with lenders (amendments, waivers, equity cures), and possibly restructuring or bankruptcy, in which lenders may take control and equity can be wiped out.</dd>
</dl>
`,
        videos: [
          { t: 'Watch me nail Morgan Stanley’s interview question on LBO', u: 'https://www.youtube.com/watch?v=K0EWW1j36f0' },
          { t: 'Leveraged Buyout LBO Modeling', u: 'https://www.youtube.com/watch?v=SOpG8ARxZA0' }
        ],
        search: 'LBO debt structure term loan B high yield explained'
      }
    ],
    quiz: [
      { q: 'A sponsor triples its money in 5 years. IRR is approximately:', o: ['15%', '20%', '25%', '35%'], a: 2, e: '3x in 5 years ≈ 25% (1.25^5 = 3.05).' },
      { q: 'Which is NOT one of the three main drivers of LBO returns?', o: ['EBITDA growth', 'Debt paydown', 'Multiple expansion', 'Lower tax rate on capital gains for the fund'], a: 3, e: 'The three operational/financial drivers are EBITDA growth, debt paydown and multiple expansion.' },
      { q: 'Purchase at 8x of $50m EBITDA with 60% debt. Sponsor equity is:', o: ['$400m', '$240m', '$160m', '$200m'], a: 2, e: 'EV = 400. Debt = 240. Equity = 160.' },
      { q: 'A dividend recap typically:', o: ['Lowers IRR', 'Raises IRR by returning cash earlier', 'Reduces leverage', 'Raises the exit multiple'], a: 1, e: 'Cash returned earlier increases time-weighted returns, though leverage rises.' },
      { q: 'Which business is the WORST LBO candidate?', o: ['Subscription software with 90% retention', 'Waste management company with long-term contracts', 'Early-stage biotech with no revenue', 'Branded consumer staples company'], a: 2, e: 'No cash flow to service debt, and highly uncertain outcomes.' },
      { q: 'Term Loan B is typically held by:', o: ['Commercial banks', 'Institutional investors such as CLOs', 'Retail investors', 'The sponsor'], a: 1, e: 'TLA is bank-held; TLB is institutional.' },
      { q: 'A 2.0x return over 3 years is roughly:', o: ['15%', '20%', '26%', '33%'], a: 2, e: '2^(1/3) ≈ 1.26 → 26%.' },
      { q: 'Which covenant type is tested every quarter?', o: ['Incurrence', 'Maintenance', 'Negative pledge', 'Change of control'], a: 1, e: 'Maintenance covenants are tested regularly; incurrence only on specific actions.' }
    ],
    cards: [
      { q: 'Walk me through a basic LBO.', a: 'Set purchase price (EBITDA × multiple) and sources & uses (debt + sponsor equity funding price + fees). Project cash flows over the hold, using FCF to repay debt. At exit, apply a multiple to EBITDA, subtract net debt for exit equity. Compare to initial equity for MOIC and IRR.', d: 1 },
      { q: 'Why does using leverage increase returns?', a: 'Less equity is required for the same asset, so gains are spread over a smaller equity base; debt is cheaper than equity and its interest is tax-deductible.', d: 1 },
      { q: 'What makes a good LBO candidate?', a: 'Stable, recurring cash flows; low capex and WC needs; strong market position; cost-cutting opportunities; low existing debt and collateral; good management; clear exit; reasonable price.', d: 1 },
      { q: 'What are the three drivers of LBO returns?', a: 'EBITDA growth, debt paydown (deleveraging), and multiple expansion.', d: 1 },
      { q: 'Approximate IRR for 2x in 5 years? 3x in 5 years?', a: '~15% and ~25%.', d: 1 },
      { q: 'What is a dividend recap and why do it?', a: 'Raising new debt to pay a dividend to the sponsor; returns capital early, boosts IRR and de-risks the investment, but increases leverage.', d: 2 },
      { q: 'What is the difference between a revolver, TLA, TLB and high-yield bonds?', a: 'Revolver: liquidity line, floating. TLA: bank-held, amortizing. TLB: institutional, ~1% amortization, floating, often cov-lite. HY bonds: fixed rate, bullet, call protection, incurrence covenants.', d: 2 },
      { q: 'Why would an LBO valuation be lower than a DCF?', a: 'The sponsor’s target IRR (often 20%+) exceeds a typical WACC, so the price that satisfies it is lower.', d: 2 },
      { q: 'Maintenance vs. incurrence covenants?', a: 'Maintenance: tested every period (e.g., max leverage). Incurrence: tested only when the company takes a specific action, like issuing debt.', d: 2 },
      { q: 'How would you increase returns in an LBO?', a: 'Lower purchase price, more leverage (if affordable), faster EBITDA growth or margin expansion, better cash conversion (lower capex/WC), higher exit multiple, earlier exit or dividend recap.', d: 2 },
      { q: 'What is PIK interest?', a: 'Payment-in-kind: interest accrues to the principal instead of being paid in cash. Preserves cash but debt grows; common in mezzanine debt.', d: 3 },
      { q: 'What are typical exit options for a sponsor?', a: 'Sale to a strategic buyer, secondary buyout to another sponsor, IPO, or a dividend recap as a partial liquidity event.', d: 2 }
    ]
  });

  /* ------------------------------------------------------------------ */
  C.modules.push({
    id: 'credit',
    num: '08',
    title: 'Debt, Credit & Fixed Income',
    tagline: 'Bond math, duration, and how lenders judge a company.',
    lessons: [
      {
        id: 'credit-bonds',
        title: 'Bond pricing & yields',
        minutes: 12,
        summary: 'Why prices and yields move in opposite directions.',
        tool: 'bond',
        body: `
<p>A bond pays periodic <strong>coupons</strong> and returns its <strong>face value</strong> (par) at maturity. Its price is the present value of those cash flows, discounted at the market's required yield.</p>
<div class="formula">Price = Σ Coupon / (1 + y)<sup>t</sup> + Face / (1 + y)<sup>N</sup></div>
<h3>Example</h3>
<p>5-year bond, $1,000 face, 5% annual coupon ($50), market yield 6%: price = <strong>$957.88</strong>. Because the market demands 6% but the bond pays 5%, it must trade at a <strong>discount</strong> to compensate.</p>
<ul>
<li>Coupon rate &gt; yield → premium (price above par)</li>
<li>Coupon rate = yield → par</li>
<li>Coupon rate &lt; yield → discount</li>
</ul>
<div class="callout key"><strong>Inverse relationship:</strong> when market interest rates rise, existing bonds with lower fixed coupons become less attractive, so their prices fall until their yield matches the market.</div>

<h3>Measures of yield</h3>
<ul>
<li><strong>Current yield</strong> = annual coupon / price. Ignores the gain or loss at maturity.</li>
<li><strong>Yield to maturity (YTM)</strong>: the IRR of the bond if held to maturity, assuming coupons are reinvested at the YTM.</li>
<li><strong>Yield to call / yield to worst</strong>: for callable bonds, the lowest yield across possible call dates and maturity.</li>
<li><strong>Credit spread</strong> = corporate bond yield – government bond yield of the same maturity. It compensates for default and liquidity risk.</li>
</ul>
`,
        videos: [
          { t: 'Why do bond prices fall when interest rates rise?', u: 'https://www.youtube.com/watch?v=xrPWB2CjL-0' },
          { t: 'Bonds: yields, pricing, and interest rates explained', u: 'https://www.youtube.com/watch?v=ihq07imNhlg' }
        ],
        search: 'bond pricing yield to maturity explained'
      },
      {
        id: 'credit-duration',
        title: 'Duration & convexity',
        minutes: 10,
        summary: 'Measuring how sensitive a bond is to rate changes.',
        tool: 'bond',
        body: `
<p><mark>Macaulay duration</mark> is the weighted-average time to receive a bond's cash flows, weighted by present value. <mark>Modified duration</mark> converts it into price sensitivity:</p>
<div class="formula">Modified duration = Macaulay duration / (1 + y/m)</div>
<div class="formula">% Δ Price ≈ – Modified duration × Δ Yield</div>
<p>A bond with modified duration of 7 loses about 7% of its value if yields rise 1 percentage point.</p>

<h3>What raises duration</h3>
<ul>
<li><strong>Longer maturity</strong>: cash is further away.</li>
<li><strong>Lower coupon</strong>: more of the value sits in the final principal payment. A zero-coupon bond's Macaulay duration equals its maturity.</li>
<li><strong>Lower yield</strong>: distant cash flows are discounted less, so they weigh more.</li>
</ul>

<h3>Convexity</h3>
<p>The price-yield curve isn't a straight line; it bows toward the origin. Duration is a straight-line approximation, so it <strong>underestimates</strong> price gains when yields fall and <strong>overestimates</strong> losses when they rise. Positive convexity is valuable to investors. Callable bonds and mortgage-backed securities can have negative convexity, since their prices are capped when rates fall.</p>
<p>See the curve in the <a href="#tool-bond">Bond Calculator</a>.</p>

<details class="practice"><summary>Rates rise 50bp. A bond portfolio has modified duration 6 and is worth $10m. Estimated change?</summary>
<div><p>–6 × 0.5% = –3% → about <strong>–$300,000</strong> (slightly less, thanks to convexity).</p></div></details>
`,
        videos: [
          { t: 'Back to basics: Understanding yield and the effects of rising rates', u: 'https://www.youtube.com/watch?v=RaFfz3NDteg' }
        ],
        search: 'bond duration and convexity explained'
      },
      {
        id: 'credit-analysis',
        title: 'Credit analysis & the capital structure',
        minutes: 12,
        summary: 'Leverage and coverage ratios, ratings, and recovery.',
        body: `
<p>Equity investors ask "how much upside is there?" Lenders ask "will I get paid back, and what happens if things go wrong?" Credit analysis focuses on the downside.</p>
<h3>Key ratios</h3>
<table class="fin">
<thead><tr><th>Ratio</th><th>Formula</th><th>Interpretation</th></tr></thead>
<tbody>
<tr><td>Total leverage</td><td>Total debt / EBITDA</td><td>Years of EBITDA to repay debt. Investment-grade companies are often below ~3x; LBOs 5–7x.</td></tr>
<tr><td>Net leverage</td><td>(Debt – cash) / EBITDA</td><td>Accounts for cash on hand.</td></tr>
<tr><td>Interest coverage</td><td>EBITDA / Interest (or EBIT / Interest)</td><td>Higher is safer; below ~2x is a warning sign.</td></tr>
<tr><td>Fixed charge coverage</td><td>(EBITDA – capex) / (Interest + required principal)</td><td>Ability to meet all mandatory payments.</td></tr>
<tr><td>FCF / Debt</td><td>Free cash flow / Total debt</td><td>How quickly cash could pay down debt.</td></tr>
<tr><td>Debt / Total capitalization</td><td>Debt / (Debt + Equity)</td><td>Share of the balance sheet funded by debt.</td></tr>
</tbody></table>

<h3>Credit ratings</h3>
<p><strong>Investment grade</strong>: BBB– (S&amp;P/Fitch) or Baa3 (Moody's) and above. <strong>High yield</strong> ("junk"): BB+ / Ba1 and below. The jump across that line matters because many institutions can hold only investment-grade debt.</p>

<h3>Priority of claims in bankruptcy</h3>
<ol class="steps">
<li>Secured debt (revolver, term loans, secured notes), up to the value of the collateral</li>
<li>Senior unsecured debt</li>
<li>Subordinated debt</li>
<li>Preferred stock</li>
<li>Common equity (usually wiped out)</li>
</ol>
<p>This is the <mark>absolute priority rule</mark>. Recovery rates fall as you move down the stack, which is why junior debt carries higher yields.</p>

<h3>The five Cs of credit</h3>
<p>Character (management, track record), Capacity (cash flow to service debt), Capital (equity cushion), Collateral (assets securing the loan), Conditions (industry, economy, loan terms).</p>
`,
        videos: [],
        search: 'credit analysis leverage ratio interest coverage explained'
      },
      {
        id: 'credit-capmarkets',
        title: 'Capital markets: how companies raise money',
        minutes: 10,
        summary: 'IPOs, follow-ons, converts, and investment-grade vs. high-yield issuance.',
        body: `
<h3>Equity capital markets (ECM)</h3>
<ul>
<li><strong>IPO</strong>: selecting underwriters, due diligence, filing the registration statement (S-1 in the U.S.), SEC review, roadshow, bookbuilding, pricing, and allocation. IPOs are typically priced at a discount (often 10–15%) to encourage a first-day "pop" and reward investors for taking the risk.</li>
<li><strong>Follow-on offering</strong>: a public company sells more shares (primary, raising money for the company) or existing holders sell (secondary, no new money).</li>
<li><strong>Convertible bonds</strong>: debt that can convert to equity. A lower coupon in exchange for upside; attractive for growth companies.</li>
<li><strong>Alternatives</strong>: direct listings (no new money raised, no underwriting), SPAC mergers.</li>
</ul>

<h3>Debt capital markets (DCM) and leveraged finance</h3>
<ul>
<li><strong>Investment-grade bonds</strong>: large, fixed-rate issues priced as a spread over Treasuries; light covenants.</li>
<li><strong>High-yield bonds and leveraged loans</strong>: for riskier issuers and LBOs, with higher spreads, more covenants, often secured.</li>
<li><strong>Private credit</strong>: direct lending funds that lend to companies without a syndicated market. It has grown into a major source of LBO financing.</li>
</ul>

<h3>Choosing debt vs. equity</h3>
<p>Debt is cheaper and keeps ownership, but adds fixed obligations and risk. Equity is permanent capital and adds flexibility, but is expensive and dilutive. A company tends to issue equity when its shares look richly valued, when it is already heavily levered, or when its cash flows are too uncertain to support fixed payments.</p>
`,
        videos: [],
        search: 'IPO process explained investment banking roadshow bookbuilding'
      }
    ],
    quiz: [
      { q: 'A bond’s coupon is 4% and market yield is 5%. The bond trades:', o: ['At a premium', 'At par', 'At a discount', 'Cannot tell'], a: 2, e: 'Coupon below yield → price below par.' },
      { q: 'A bond has modified duration 8. Yields fall 25bp. Approximate price change:', o: ['–2%', '+2%', '+8%', '+0.25%'], a: 1, e: '–8 × (–0.25%) = +2%.' },
      { q: 'Which bond has the highest duration?', o: ['2-year, 6% coupon', '10-year, 6% coupon', '10-year zero-coupon', '5-year, 2% coupon'], a: 2, e: 'Longer maturity and no coupons → duration equals maturity, 10 years.' },
      { q: 'Debt $600m, cash $100m, EBITDA $125m. Net leverage is:', o: ['4.8x', '4.0x', '5.6x', '3.2x'], a: 1, e: '(600 – 100) / 125 = 4.0x.' },
      { q: 'The lowest investment-grade rating on the S&P scale is:', o: ['A–', 'BBB–', 'BB+', 'BBB+'], a: 1, e: 'BBB– is the last investment-grade notch; BB+ is high yield.' },
      { q: 'In bankruptcy, which is paid first?', o: ['Senior unsecured notes', 'Preferred stock', 'Secured term loan (to collateral value)', 'Subordinated notes'], a: 2, e: 'Secured creditors come first up to the value of their collateral.' },
      { q: 'Duration tends to underestimate price gains when yields fall because of:', o: ['Credit spread', 'Positive convexity', 'Reinvestment risk', 'Call protection'], a: 1, e: 'The price-yield curve is convex, so the linear duration estimate understates gains.' }
    ],
    cards: [
      { q: 'Why do bond prices fall when interest rates rise?', a: 'Existing fixed coupons become less attractive versus new bonds, so the price must fall until the bond’s yield matches the market rate.', d: 1 },
      { q: 'What is yield to maturity?', a: 'The IRR of a bond held to maturity: the discount rate equating price to the PV of all coupons and principal.', d: 1 },
      { q: 'What is duration?', a: 'Macaulay: PV-weighted average time to cash flows. Modified: approximate % price change for a 1% change in yield (%ΔP ≈ –ModDur × Δy).', d: 2 },
      { q: 'What increases a bond’s duration?', a: 'Longer maturity, lower coupon, lower yield.', d: 2 },
      { q: 'What is convexity and why is it valuable?', a: 'Curvature of the price-yield relationship. Positive convexity means prices rise more when yields fall than they drop when yields rise.', d: 3 },
      { q: 'What credit metrics would you look at to evaluate a borrower?', a: 'Leverage (Debt/EBITDA, net leverage), coverage (EBITDA/interest, fixed charge coverage), FCF/debt, liquidity, collateral, and business stability.', d: 1 },
      { q: 'What is the difference between investment grade and high yield?', a: 'IG: BBB–/Baa3 or better, lower default risk, lower spreads. HY: BB+/Ba1 or below, higher spreads and covenants.', d: 1 },
      { q: 'What is a credit spread?', a: 'The yield difference between a risky bond and a government bond of the same maturity; compensation for default and liquidity risk.', d: 1 },
      { q: 'What is the order of claims in bankruptcy?', a: 'Secured debt → senior unsecured → subordinated → preferred → common equity (absolute priority rule).', d: 1 },
      { q: 'Why do IPOs tend to be underpriced?', a: 'To ensure full subscription, compensate investors for information asymmetry and risk, and create positive aftermarket momentum.', d: 2 },
      { q: 'When would a company issue equity rather than debt?', a: 'When it’s already highly levered, has volatile or negative cash flows, its stock is richly valued, or it needs permanent capital for growth.', d: 2 }
    ]
  });
})(window.COURSE);
