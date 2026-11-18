/* Course content, part 1: Start Here, Accounting, Time Value of Money */
window.COURSE = window.COURSE || { modules: [] };
(function (C) {
  const yt = (q) => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
  C.yt = yt;

  /* ------------------------------------------------------------------ */
  C.modules.push({
    id: 'start',
    num: '00',
    title: 'Start Here',
    tagline: 'How finance interviews actually work, and how to use this course to prepare for them.',
    lessons: [
      {
        id: 'start-interviews',
        title: 'What gets tested, and why',
        minutes: 8,
        summary: 'The three layers of every finance interview and how they are scored.',
        body: `
<p>Investment banking, private equity, corporate development, equity research and most corporate-finance roles use the same interview format. Expect three layers, often in the same 30–45 minute conversation:</p>
<table class="fin">
<thead><tr><th>Layer</th><th>What they ask</th><th>What they are really scoring</th></tr></thead>
<tbody>
<tr><td><strong>Fit / behavioral</strong></td><td>Walk me through your resume. Why this role? Tell me about a time you failed.</td><td>Would I want to sit next to you at 1 a.m.? Is your story coherent and committed?</td></tr>
<tr><td><strong>Technical</strong></td><td>Walk me through a DCF. What happens when depreciation goes up by $10? How do you calculate WACC?</td><td>Do you understand the mechanics well enough to be trained quickly, or will you need hand-holding?</td></tr>
<tr><td><strong>Commercial / markets</strong></td><td>Pitch me a stock. What deal have you followed? Where are rates heading?</td><td>Do you actually care about markets, and can you form and defend an opinion?</td></tr>
</tbody></table>

<h3>How technical questions are graded</h3>
<p>Interviewers are rarely checking whether you memorized a definition. They want three things, in this order:</p>
<ol>
<li><strong>Structure.</strong> Lead with the answer, then explain. "Net income falls by $6, cash rises by $4, and the balance sheet balances. Here's why…" beats a 90-second ramble that eventually lands on the same numbers.</li>
<li><strong>Intuition.</strong> Can you explain <em>why</em> a higher discount rate lowers value, not just that it does?</li>
<li><strong>Accuracy under pressure.</strong> Clean mental math, correct signs, no contradictions.</li>
</ol>

<div class="callout key"><strong>The 80/20 of technicals.</strong> Roughly 80% of technical questions at the analyst and associate level come from six areas: the three statements and how they link, equity value vs. enterprise value, the three valuation methods, the DCF and WACC, merger (accretion/dilution) math, and LBO basics. This course spends most of its time there.</div>

<h3>Difficulty tiers</h3>
<p>Every flashcard in this course carries a difficulty tag:</p>
<ul>
<li><span class="tag t1">Core</span> You must answer these instantly. Missing one is often disqualifying.</li>
<li><span class="tag t2">Standard</span> Expected for most banking and PE interviews.</li>
<li><span class="tag t3">Advanced</span> Asked at elite boutiques, PE, or as follow-ups when you are doing well.</li>
</ul>

<div class="callout trap"><strong>The biggest mistake candidates make</strong> is studying technicals passively: reading guides without ever saying the answers out loud. Interviews test spoken explanations. Use the <a href="#mock">Mock Interview</a> mode and answer aloud before revealing the model answer.</div>
`,
        videos: [
          { t: 'Investment Banking Mock Interview', u: 'https://www.youtube.com/watch?v=vBfH61DsU7Q' }
        ],
        search: 'investment banking mock interview technical questions'
      },
      {
        id: 'start-plan',
        title: 'A 4-week study plan',
        minutes: 6,
        summary: 'A realistic schedule from zero to interview-ready.',
        body: `
<p>The plan below assumes about 1–1.5 hours a day. Compress it if your interview is sooner; the order matters more than the pace, because every topic builds on accounting.</p>
<table class="fin">
<thead><tr><th>Week</th><th>Focus</th><th>Done when you can…</th></tr></thead>
<tbody>
<tr><td>1</td><td><a href="#module-accounting">Accounting</a> and <a href="#module-tvm">Time Value of Money</a></td><td>Walk through any "$10 change" across all three statements in under 60 seconds, using the <a href="#tool-statements">Statement Simulator</a> to check yourself.</td></tr>
<tr><td>2</td><td><a href="#module-ev">Equity &amp; Enterprise Value</a> and <a href="#module-valuation">Valuation Methods</a></td><td>Build an EV bridge from memory and explain when each valuation method gives the highest value.</td></tr>
<tr><td>3</td><td><a href="#module-dcf">DCF</a> and <a href="#module-ma">M&amp;A</a></td><td>Walk through a DCF in 90 seconds; tell whether a deal is accretive using the cost-of-acquisition shortcut.</td></tr>
<tr><td>4</td><td><a href="#module-lbo">LBO</a>, <a href="#module-credit">Credit</a>, <a href="#module-markets">Markets</a>, <a href="#module-behavioral">Behavioral</a></td><td>Solve a paper LBO in 10 minutes; deliver your story and a stock pitch without notes.</td></tr>
</tbody></table>

<h3>Daily loop</h3>
<ol>
<li><strong>Learn</strong> one or two lessons. Read the "Say it in the interview" box aloud.</li>
<li><strong>Do</strong>: open the linked tool and change the inputs until the intuition clicks.</li>
<li><strong>Test</strong>: take the module quiz. Retake it two days later.</li>
<li><strong>Review</strong>: 10 minutes of <a href="#flashcards">flashcards</a>. The deck uses spaced repetition, so cards you miss come back sooner.</li>
<li><strong>Simulate</strong>: from week 2 on, run a 10-question <a href="#mock">mock interview</a> every other day.</li>
</ol>
<div class="callout key">Your progress (lessons completed, quiz scores, flashcard boxes) is saved in this browser automatically. Nothing is sent anywhere.</div>
`,
        videos: [],
        search: 'how to prepare for investment banking technical interview'
      }
    ],
    quiz: [],
    cards: []
  });

  /* ------------------------------------------------------------------ */
  C.modules.push({
    id: 'accounting',
    num: '01',
    title: 'Accounting & the Three Statements',
    tagline: 'The language every other topic is written in. Master the links and the "$10 change" questions.',
    lessons: [
      {
        id: 'acc-statements',
        title: 'The three financial statements',
        minutes: 12,
        summary: 'What the income statement, balance sheet and cash flow statement each tell you.',
        body: `
<p>Every public company reports three core statements. Each answers a different question:</p>
<table class="fin">
<thead><tr><th>Statement</th><th>Question it answers</th><th>Time frame</th></tr></thead>
<tbody>
<tr><td><strong>Income statement (IS)</strong></td><td>Was the company profitable?</td><td>Over a period (quarter, year)</td></tr>
<tr><td><strong>Balance sheet (BS)</strong></td><td>What does it own and owe?</td><td>A single point in time</td></tr>
<tr><td><strong>Cash flow statement (CFS)</strong></td><td>Where did cash actually come from and go?</td><td>Over a period</td></tr>
</tbody></table>

<h3>Income statement</h3>
<p>Uses <mark>accrual accounting</mark>: revenue is recorded when it is earned and expenses when they are incurred, regardless of when cash moves. A simplified layout:</p>
<div class="statement">
<div class="row"><span>Revenue</span><span>1,000</span></div>
<div class="row sub"><span>– Cost of goods sold (COGS)</span><span>(400)</span></div>
<div class="row total"><span>Gross profit</span><span>600</span></div>
<div class="row sub"><span>– Operating expenses (SG&amp;A, R&amp;D)</span><span>(300)</span></div>
<div class="row sub"><span>– Depreciation &amp; amortization</span><span>(50)</span></div>
<div class="row total"><span>Operating income (EBIT)</span><span>250</span></div>
<div class="row sub"><span>– Interest expense</span><span>(50)</span></div>
<div class="row total"><span>Pre-tax income (EBT)</span><span>200</span></div>
<div class="row sub"><span>– Taxes @ 25%</span><span>(50)</span></div>
<div class="row total grand"><span>Net income</span><span>150</span></div>
</div>
<p><strong>EBITDA</strong> = EBIT + D&amp;A = 300 here. It's a rough proxy for operating cash flow that ignores capital structure (interest), taxes and non-cash charges, which is why it is the workhorse of valuation multiples.</p>

<h3>Balance sheet</h3>
<div class="formula">Assets = Liabilities + Shareholders' Equity</div>
<p>Assets are resources that will provide future benefit (cash, accounts receivable, inventory, PP&amp;E, goodwill). Liabilities are obligations that will require future payment (accounts payable, accrued expenses, deferred revenue, debt). Equity is the residual: what shareholders put in (common stock, additional paid-in capital) plus profits kept in the business (<mark>retained earnings</mark>).</p>

<h3>Cash flow statement</h3>
<p>Starts with net income and reconciles it to the actual change in cash, in three sections:</p>
<ul>
<li><strong>Cash flow from operations (CFO)</strong>: net income + non-cash charges (D&amp;A, stock-based comp, deferred taxes) ± changes in working capital.</li>
<li><strong>Cash flow from investing (CFI)</strong>: capital expenditures, acquisitions, purchases/sales of investments.</li>
<li><strong>Cash flow from financing (CFF)</strong>: issuing or repaying debt, issuing or buying back stock, paying dividends.</li>
</ul>
<p>CFO + CFI + CFF = net change in cash, which flows to the cash line on the balance sheet.</p>

<div class="say"><div class="say-label">Say it in the interview: "Walk me through the three statements."</div>
<p>"The income statement shows revenue, expenses and profitability over a period, ending in net income. The balance sheet is a snapshot of assets, liabilities and equity at a point in time, and assets must equal liabilities plus equity. The cash flow statement starts with net income, adjusts for non-cash items and working capital to get cash from operations, then adds cash from investing and financing to reach the net change in cash. That change flows into the cash balance on the balance sheet, and net income also flows into retained earnings."</p></div>

<details class="practice"><summary>Which single statement would you choose to evaluate a company, if you could only see one?</summary>
<div><p>The <strong>cash flow statement</strong>. It shows real cash generation, which is harder to manipulate than net income, and it reveals capex and financing behavior. A common follow-up: "If you could have two?" Answer: the income statement and balance sheet, because you can construct the cash flow statement from them (given the beginning and ending balance sheets).</p></div></details>
`,
        videos: [
          { t: 'The 3 Financial Statements EXPLAINED (Investment Banking Level)', u: 'https://www.youtube.com/watch?v=I6c0kaJDZ24' },
          { t: 'The 3 Financial Statements Explained: How They Connect', u: 'https://www.youtube.com/watch?v=CE9HnV3b_jY' }
        ],
        search: 'three financial statements explained investment banking'
      },
      {
        id: 'acc-linking',
        title: 'How the statements link',
        minutes: 10,
        summary: 'The six connections you must be able to draw from memory.',
        body: `
<p>"How are the three statements linked?" is the single most common accounting question. The answer is a handful of specific connections:</p>
<ol class="steps">
<li><strong>Net income</strong> from the bottom of the IS is the first line of the CFS, and it also increases <strong>retained earnings</strong> on the BS (less any dividends).</li>
<li><strong>Non-cash expenses</strong> on the IS (D&amp;A, stock-based comp) are added back on the CFS. Depreciation reduces <strong>PP&amp;E</strong> on the BS.</li>
<li>Changes in <strong>working capital</strong> accounts on the BS (receivables, inventory, payables, deferred revenue) show up in CFO.</li>
<li><strong>Capex</strong> in CFI increases PP&amp;E on the BS.</li>
<li><strong>Debt and equity issuances or repayments</strong>, and dividends, in CFF change debt, common stock and retained earnings on the BS.</li>
<li>The <strong>net change in cash</strong> at the bottom of the CFS updates the cash balance at the top of the BS.</li>
</ol>

<div class="diagram" aria-label="Statement linkage diagram">
<svg viewBox="0 0 640 250" role="img">
  <defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>
  <rect x="10" y="20" width="180" height="200" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>
  <text x="100" y="45" text-anchor="middle" class="d-h">Income Statement</text>
  <text x="25" y="80" class="d-t">Revenue … EBIT</text>
  <text x="25" y="110" class="d-t">D&amp;A, SBC (non-cash)</text>
  <text x="25" y="190" class="d-t d-b">Net income</text>
  <rect x="230" y="20" width="180" height="200" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>
  <text x="320" y="45" text-anchor="middle" class="d-h">Cash Flow Statement</text>
  <text x="245" y="80" class="d-t d-b">Net income</text>
  <text x="245" y="105" class="d-t">+ D&amp;A, SBC</text>
  <text x="245" y="130" class="d-t">± Working capital</text>
  <text x="245" y="155" class="d-t">– Capex (CFI)</text>
  <text x="245" y="180" class="d-t">± Debt, equity, divs (CFF)</text>
  <text x="245" y="205" class="d-t d-b">= Net change in cash</text>
  <rect x="450" y="20" width="180" height="200" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>
  <text x="540" y="45" text-anchor="middle" class="d-h">Balance Sheet</text>
  <text x="465" y="80" class="d-t d-b">Cash</text>
  <text x="465" y="105" class="d-t">AR, inventory, AP</text>
  <text x="465" y="130" class="d-t">PP&amp;E</text>
  <text x="465" y="155" class="d-t">Debt</text>
  <text x="465" y="180" class="d-t">Common stock / APIC</text>
  <text x="465" y="205" class="d-t d-b">Retained earnings</text>
  <path d="M150 186 C 200 186, 200 76, 240 76" fill="none" stroke="var(--accent)" stroke-width="1.6" marker-end="url(#arr)"/>
  <path d="M190 200 C 320 240, 400 240, 462 202" fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-dasharray="4 3" marker-end="url(#arr)"/>
  <path d="M400 201 C 430 201, 430 76, 462 76" fill="none" stroke="var(--accent)" stroke-width="1.6" marker-end="url(#arr)"/>
</svg>
<div class="diagram-cap">Solid arrows: net income starts the CFS; the net change in cash updates BS cash. Dashed arrow: net income (less dividends) flows into retained earnings.</div>
</div>

<div class="say"><div class="say-label">Say it in the interview: "How are the three statements linked?"</div>
<p>"Net income from the income statement is the top line of the cash flow statement. You add back non-cash expenses like depreciation, adjust for changes in balance sheet working capital, then account for investing and financing activities to get the net change in cash, which flows to the cash line on the balance sheet. Net income also flows into retained earnings, PP&amp;E is affected by capex and depreciation, and debt and equity change with financing activities. After all of that, the balance sheet balances."</p></div>

<div class="callout trap"><strong>Don't forget the tax.</strong> The most common error when walking through a change is forgetting that an income statement change affects taxes. A $10 pre-tax expense reduces net income by $10 × (1 – tax rate), not $10.</div>
`,
        videos: [
          { t: 'Mock Interview Question: How are the 3 Primary Financial Statements Linked?', u: 'https://www.youtube.com/watch?v=j6XefvrINGY' },
          { t: 'How to Link the 3 Financial Statements in Excel', u: 'https://www.youtube.com/watch?v=mt5Ve01n_X0' }
        ],
        search: 'how are the three financial statements linked interview'
      },
      {
        id: 'acc-walks',
        title: 'The "$10 change" walk-throughs',
        minutes: 18,
        summary: 'A framework that answers every "what happens when X changes" question.',
        tool: 'statements',
        body: `
<p>Interviewers love questions like "Depreciation goes up by $10. Walk me through the three statements." They are testing whether you can trace one change through all three statements with correct signs and taxes. Use the same three-step framework every time:</p>
<ol class="steps">
<li><strong>Income statement.</strong> Does the event hit the IS? If yes, find the pre-tax change, apply taxes, and state the change in net income.</li>
<li><strong>Cash flow statement.</strong> Start with the change in net income. Reverse non-cash items. Then add any working-capital, investing or financing cash effects. State the net change in cash.</li>
<li><strong>Balance sheet.</strong> Cash (from the CFS) plus any other asset changes on one side; liabilities and equity (retained earnings moves with net income) on the other. Confirm both sides move by the same amount.</li>
</ol>
<p>All examples below assume a 25% tax rate. Change the numbers yourself in the <a href="#tool-statements">Statement Simulator</a>.</p>

<h3>1. Depreciation increases by $10</h3>
<ul>
<li><strong>IS:</strong> Operating income falls $10. Taxes fall $2.50. Net income falls <strong>$7.50</strong>.</li>
<li><strong>CFS:</strong> Net income –$7.50, add back depreciation +$10. Cash up <strong>$2.50</strong>.</li>
<li><strong>BS:</strong> Cash +$2.50, PP&amp;E –$10, so assets are down $7.50. Retained earnings –$7.50, so equity is down $7.50. <strong>Balances.</strong></li>
</ul>
<div class="callout key"><strong>Intuition:</strong> depreciation is non-cash, but it is tax-deductible. The only real cash effect is the <mark>tax shield</mark>: $10 × 25% = $2.50 of taxes not paid.</div>

<h3>2. The company buys $10 of inventory with cash</h3>
<ul>
<li><strong>IS:</strong> No change. Nothing has been sold yet, so there's no COGS.</li>
<li><strong>CFS:</strong> Increase in inventory is a use of cash: CFO –$10. Cash down <strong>$10</strong>.</li>
<li><strong>BS:</strong> Cash –$10, inventory +$10. Total assets unchanged. Balances.</li>
</ul>

<h3>3. Inventory is written down by $10</h3>
<ul>
<li><strong>IS:</strong> $10 write-down expense (often in COGS). Net income –$7.50.</li>
<li><strong>CFS:</strong> Net income –$7.50, add back the non-cash write-down +$10. Cash +$2.50.</li>
<li><strong>BS:</strong> Cash +$2.50, inventory –$10 (assets –$7.50). Retained earnings –$7.50. Balances.</li>
</ul>
<p>The pattern is identical to depreciation, and that's the point: any non-cash, tax-deductible expense works the same way.</p>

<h3>4. $10 of stock-based compensation is recorded</h3>
<ul>
<li><strong>IS:</strong> Expense +$10, net income –$7.50.</li>
<li><strong>CFS:</strong> Add back SBC as non-cash: +$10. Cash +$2.50.</li>
<li><strong>BS:</strong> Cash +$2.50. On the other side, retained earnings –$7.50 but common stock/APIC +$10, so equity <strong>+$2.50</strong>. Balances.</li>
</ul>

<h3>5. Accounts receivable increases by $10 (sale on credit)</h3>
<ul>
<li><strong>IS:</strong> Revenue +$10, taxes +$2.50, net income +$7.50.</li>
<li><strong>CFS:</strong> Net income +$7.50, increase in AR –$10. Cash <strong>–$2.50</strong> (you paid tax on revenue you haven't collected).</li>
<li><strong>BS:</strong> Cash –$2.50, AR +$10, assets +$7.50. Retained earnings +$7.50. Balances.</li>
</ul>

<h3>6. The company borrows $100 and buys $100 of PP&amp;E</h3>
<ul>
<li><strong>IS:</strong> No change at the moment of purchase.</li>
<li><strong>CFS:</strong> CFI –$100 (capex), CFF +$100 (debt). Net cash change $0.</li>
<li><strong>BS:</strong> PP&amp;E +$100, debt +$100. Balances.</li>
</ul>
<p><strong>Common follow-up:</strong> "Now a year passes. Depreciation is $20 and interest is 10%." IS: depreciation $20 + interest $10 = $30 pre-tax, net income –$22.50. CFS: –$22.50 + $20 depreciation = cash –$2.50. BS: cash –$2.50, PP&amp;E –$20 (assets –$22.50); retained earnings –$22.50. Balances. (Debt is unchanged unless principal is repaid.)</p>

<h3>7. Dividends of $10 are paid</h3>
<ul>
<li><strong>IS:</strong> No change. Dividends are not an expense.</li>
<li><strong>CFS:</strong> CFF –$10.</li>
<li><strong>BS:</strong> Cash –$10, retained earnings –$10. Balances.</li>
</ul>

<div class="say"><div class="say-label">Say it in the interview: "Depreciation goes up by $10."</div>
<p>"Assuming a 25% tax rate: on the income statement, operating income falls by $10 and net income falls by $7.50. On the cash flow statement, net income is down $7.50 but I add back the $10 of depreciation since it's non-cash, so cash is up $2.50. On the balance sheet, cash is up $2.50 and PP&amp;E is down $10, so assets are down $7.50; retained earnings is down $7.50, so liabilities and equity are also down $7.50, and it balances."</p></div>

<div class="callout trap"><strong>Lead with the answer.</strong> State each statement's net effect first ("net income falls $7.50"), then the reason. If you get lost mid-answer, return to the framework: IS, then CFS, then BS, then check that it balances.</div>
`,
        videos: [
          { t: '3 Statement Impact Framework + $10 Depreciation (IB Interview Qs)', u: 'https://www.youtube.com/watch?v=9DHi3Ef9S2k' },
          { t: 'How Are The Three Financial Statements Linked? (IB Interview Questions)', u: 'https://www.youtube.com/watch?v=l0tN6zZPSLI' }
        ],
        search: 'depreciation increases by 10 walk through three statements'
      },
      {
        id: 'acc-wc',
        title: 'Working capital & accrual accounting',
        minutes: 10,
        summary: 'Why a growing company can run out of cash, and how to read working-capital changes.',
        body: `
<p><mark>Working capital</mark> is the cash tied up in running the day-to-day business. The textbook definition is current assets minus current liabilities. In valuation, use <strong>operating</strong> working capital, which excludes cash and debt:</p>
<div class="formula">Operating WC = (AR + Inventory + Prepaid expenses) – (AP + Accrued expenses + Deferred revenue)</div>

<h3>The sign rule</h3>
<p>On the cash flow statement:</p>
<ul>
<li>An <strong>increase in an operating asset</strong> (AR, inventory) is a <strong>use</strong> of cash. You've spent or not yet collected cash.</li>
<li>An <strong>increase in an operating liability</strong> (AP, accrued expenses, deferred revenue) is a <strong>source</strong> of cash. You've received or held on to cash you'll pay out later.</li>
</ul>
<div class="formula">Cash impact = –(Change in operating WC)</div>
<p>If operating working capital rises from $200 to $300, the CFS shows –$100.</p>

<h3>Business models drive working capital</h3>
<table class="fin">
<thead><tr><th>Business</th><th>WC dynamic</th><th>Effect of growth on cash</th></tr></thead>
<tbody>
<tr><td>Retailer / manufacturer</td><td>Buys inventory before selling; customers may pay on credit</td><td>Growth <strong>consumes</strong> cash</td></tr>
<tr><td>Subscription software</td><td>Collects annual fees upfront (deferred revenue)</td><td>Growth <strong>generates</strong> cash</td></tr>
<tr><td>Grocery / fast food</td><td>Customers pay cash immediately; suppliers paid in 30–60 days</td><td>Often <strong>negative WC</strong>, a cash source</td></tr>
</tbody></table>

<h3>Key working-capital metrics</h3>
<div class="formula">DSO = AR / Revenue × 365 &nbsp;·&nbsp; DIO = Inventory / COGS × 365 &nbsp;·&nbsp; DPO = AP / COGS × 365</div>
<div class="formula">Cash conversion cycle = DSO + DIO – DPO</div>
<p>A shorter cash conversion cycle means less cash tied up per dollar of sales.</p>

<details class="practice"><summary>Can a profitable company go bankrupt?</summary>
<div><p><strong>Yes.</strong> Net income is an accrual measure; bankruptcy happens when you can't pay bills in cash. A fast-growing company that sells on long credit terms and builds inventory can show strong profits while cash drains, then default on a debt payment. Classic interview answer: "Profit is an opinion, cash is a fact."</p></div></details>

<details class="practice"><summary>Is negative working capital good or bad?</summary>
<div><p>It depends on why. For businesses like subscription software, airlines or restaurants that collect cash before paying suppliers or delivering service, it's a <strong>sign of bargaining power</strong> and a source of funding. For other businesses it can signal trouble: stretched payables because the company can't pay suppliers on time.</p></div></details>
`,
        videos: [
          { t: 'Working Capital and the Change in Working Capital', u: 'https://www.youtube.com/watch?v=tMgty8jwmHI' },
          { t: 'How to Explain Changes in Operating Working Capital', u: 'https://www.youtube.com/watch?v=slK2dONrwiM' }
        ],
        search: 'change in working capital cash flow statement explained'
      },
      {
        id: 'acc-advanced',
        title: 'Advanced accounting: deferred taxes, goodwill, leases, NOLs',
        minutes: 14,
        summary: 'Topics that separate strong candidates from average ones.',
        body: `
<h3>Deferred taxes</h3>
<p>Companies keep two sets of books: <strong>book</strong> (GAAP/IFRS, for investors) and <strong>tax</strong> (for the tax authority). Timing differences between them create deferred tax items.</p>
<ul>
<li><strong>Deferred tax liability (DTL):</strong> the company pays <em>less</em> cash tax now than its book tax expense, and will pay more later. Most common cause: accelerated depreciation for tax purposes vs. straight-line for book. The CFS adds back the increase in DTL as a non-cash item.</li>
<li><strong>Deferred tax asset (DTA):</strong> the company pays <em>more</em> cash tax now than its book expense, or has tax benefits to use later. Most common cause: net operating losses (NOLs).</li>
</ul>
<div class="callout key"><strong>Rule of thumb:</strong> a rising DTL means cash taxes are below book taxes, so it's a source of cash on the CFS. A rising DTA is a use of cash.</div>

<h3>Net operating losses (NOLs)</h3>
<p>A company with past losses can use them to offset future taxable income. In the U.S., post-2017 NOLs carry forward indefinitely but can offset only 80% of taxable income in a given year. In M&amp;A, a target's NOLs are valuable to a buyer, though Section 382 limits how fast they can be used after an ownership change.</p>

<h3>Goodwill and impairment</h3>
<p>When a company acquires another for more than the fair value of its identifiable net assets, the excess is recorded as <mark>goodwill</mark>. Goodwill is <strong>not amortized</strong> under US GAAP or IFRS for public companies. It is tested for impairment at least annually; if the acquired business is worth less than its carrying value, goodwill is written down. An impairment is a non-cash charge that reduces net income and is added back on the CFS. Goodwill impairments are generally not tax-deductible.</p>

<h3>Other intangibles</h3>
<p>Identifiable intangibles from an acquisition (customer relationships, technology, trademarks) are recorded at fair value and, if they have finite lives, <strong>amortized</strong>. That amortization is why many companies report "adjusted EBITDA" or "adjusted EPS" excluding acquisition-related amortization.</p>

<h3>Leases (ASC 842 / IFRS 16)</h3>
<p>Since 2019 most leases appear on the balance sheet as a <strong>right-of-use asset</strong> and a <strong>lease liability</strong>.</p>
<ul>
<li><strong>IFRS 16:</strong> almost all leases are treated like financing. The IS shows depreciation and interest, so EBITDA is <em>higher</em> than under the old rules.</li>
<li><strong>US GAAP operating leases:</strong> the IS still shows a single straight-line rent expense within operating costs. Finance leases look like IFRS.</li>
</ul>
<div class="callout trap"><strong>Consistency trap:</strong> if your EBITDA excludes rent (IFRS-style), you must include lease liabilities in enterprise value. If EBITDA is after rent, exclude them. Mixing the two inflates or deflates the multiple.</div>

<h3>Stock-based compensation (SBC)</h3>
<p>SBC is non-cash, so it's added back on the CFS, but it's a <strong>real economic cost</strong>: it dilutes shareholders. Many analysts treat SBC as a cash expense in a DCF, or count the resulting dilution in the share count. Saying this in an interview signals maturity.</p>

<h3>LIFO vs. FIFO</h3>
<p>When prices are rising, <strong>LIFO</strong> (last in, first out; allowed under US GAAP, banned under IFRS) records the newer, more expensive inventory as COGS, which means higher COGS, lower taxable income and lower taxes, and leaves older, cheaper inventory on the balance sheet. <strong>FIFO</strong> does the opposite.</p>

<details class="practice"><summary>A company records a $100 goodwill impairment. Walk through the statements (25% tax, assume not tax-deductible).</summary>
<div><p><strong>IS:</strong> $100 impairment charge; because it isn't tax-deductible, tax expense doesn't change, and net income falls <strong>$100</strong>. <strong>CFS:</strong> net income –$100, add back the $100 non-cash charge; cash unchanged. <strong>BS:</strong> goodwill –$100, retained earnings –$100. Balances.</p>
<p>Many interviewers accept a simplified answer that treats it as deductible (net income –$75, cash +$25 with a deferred tax adjustment). State your assumption out loud before answering.</p></div></details>
`,
        videos: [
          { t: 'PIK Interest and the Three Financial Statements', u: 'https://www.youtube.com/watch?v=vGDiC1AQFqE' }
        ],
        search: 'deferred tax liability explained investment banking interview'
      }
    ],
    quiz: [
      { q: 'Depreciation increases by $20 with a 40% tax rate. What happens to cash?', o: ['Cash falls by $12', 'Cash rises by $8', 'Cash rises by $12', 'No change'], a: 1, e: 'Net income falls $20 × (1 – 40%) = $12. Add back $20 of non-cash depreciation: –12 + 20 = +$8. Cash rises by the tax shield, $20 × 40%.' },
      { q: 'A company buys $50 of inventory on credit (accounts payable). What is the immediate effect on cash?', o: ['–$50', '+$50', 'No change', '–$37.50'], a: 2, e: 'Inventory +$50 is a use of cash (–50) and AP +$50 is a source of cash (+50). They offset. Assets and liabilities each rise $50.' },
      { q: 'Which item is NOT added back to net income in cash flow from operations?', o: ['Depreciation', 'Stock-based compensation', 'Dividends paid', 'Increase in deferred tax liability'], a: 2, e: 'Dividends are a financing cash outflow (CFF) and never touch the income statement. The others are non-cash items reconciled in CFO.' },
      { q: 'Accounts receivable increases by $10 because of a sale on credit. Tax rate 25%. Cash changes by:', o: ['+$7.50', '–$2.50', '–$10', '$0'], a: 1, e: 'Revenue +10 → net income +7.50. AR increase is a use of cash (–10). Net: –$2.50. You paid tax on revenue you haven’t collected.' },
      { q: 'A subscription company collects $120 upfront for a 12-month contract. Before any service is delivered, what is recorded on the balance sheet?', o: ['Revenue of $120', 'AR of $120', 'Cash +$120 and deferred revenue +$120', 'Cash +$120 and retained earnings +$120'], a: 2, e: 'Cash is received but not yet earned, so it sits in deferred revenue (a liability). Revenue is recognized $10/month as service is delivered.' },
      { q: 'Which statement best describes goodwill under US GAAP for a public company?', o: ['Amortized over 15 years', 'Tested for impairment at least annually; not amortized', 'Expensed immediately at acquisition', 'Depreciated straight-line'], a: 1, e: 'Goodwill is not amortized for public companies; it is tested for impairment. (Private companies may elect to amortize it.)' },
      { q: '$10 of stock-based compensation is recorded (25% tax). Total shareholders’ equity changes by:', o: ['–$7.50', '+$2.50', '+$10', '$0'], a: 1, e: 'Retained earnings –7.50 (lower net income) and common stock/APIC +10 (shares issued). Net equity +2.50, matching the +2.50 of cash.' },
      { q: 'Under IFRS 16, compared with the old operating lease treatment, EBITDA is typically:', o: ['Lower', 'Higher', 'Unchanged', 'Negative'], a: 1, e: 'Rent is replaced by depreciation and interest, both below EBITDA, so EBITDA rises. You must then include lease liabilities in enterprise value for consistency.' },
      { q: 'A company’s DSO is 45 days, DIO 60 days, DPO 30 days. Its cash conversion cycle is:', o: ['135 days', '75 days', '15 days', '105 days'], a: 1, e: 'CCC = DSO + DIO – DPO = 45 + 60 – 30 = 75 days.' },
      { q: 'If prices are rising, switching from FIFO to LIFO will typically:', o: ['Raise net income and taxes', 'Lower net income and lower taxes', 'Not affect taxes', 'Raise inventory on the balance sheet'], a: 1, e: 'LIFO expenses the most recent, more expensive inventory, raising COGS, lowering taxable income and taxes, and leaving cheaper inventory on the balance sheet.' }
    ],
    cards: [
      { q: 'Walk me through the three financial statements.', a: 'IS: revenue less expenses over a period, ending in net income. BS: assets = liabilities + equity at a point in time. CFS: starts with net income, adjusts for non-cash items and working capital (CFO), then investing (CFI) and financing (CFF) to get the net change in cash.', d: 1 },
      { q: 'How are the three statements linked?', a: 'Net income starts the CFS and flows into retained earnings. Non-cash charges are added back on the CFS and reduce assets (e.g., D&A reduces PP&E). Working-capital changes come from the BS. Capex raises PP&E; debt/equity flows change BS financing lines. Net change in cash updates BS cash.', d: 1 },
      { q: 'Depreciation goes up by $10 (25% tax). Walk me through the statements.', a: 'IS: EBIT –10, NI –7.50. CFS: NI –7.50 + D&A 10 = cash +2.50. BS: cash +2.50, PP&E –10 → assets –7.50; RE –7.50 → L+E –7.50. Balances.', d: 1 },
      { q: 'If you could only use one statement to evaluate a company, which and why?', a: 'Cash flow statement: it shows actual cash generation, capex and financing, and is harder to manipulate than accrual earnings.', d: 1 },
      { q: 'Inventory is written down by $10 (25% tax). Walk through the statements.', a: 'IS: expense +10, NI –7.50. CFS: NI –7.50, add back non-cash write-down +10 → cash +2.50. BS: cash +2.50, inventory –10 → assets –7.50; RE –7.50. Balances.', d: 1 },
      { q: 'Why is an increase in accounts receivable a reduction in cash flow?', a: 'Revenue was recognized (raising NI) but the cash hasn’t been collected, so the CFS subtracts the AR increase to reverse the non-cash revenue.', d: 1 },
      { q: 'What is working capital and why does it matter in valuation?', a: 'Operating current assets minus operating current liabilities (excluding cash and debt). Changes in it are real cash flows: growth that requires more WC consumes cash, which reduces free cash flow.', d: 2 },
      { q: 'Can a company have positive net income and still go bankrupt?', a: 'Yes. Net income is accrual-based; if cash is tied up in receivables/inventory or debt payments come due, the company can run out of cash despite profits.', d: 2 },
      { q: 'What is a deferred tax liability and how does it typically arise?', a: 'Taxes owed in the future because book tax expense exceeds cash taxes today, typically from accelerated tax depreciation vs. straight-line book depreciation. An increase is added back on the CFS.', d: 2 },
      { q: 'How is stock-based compensation treated on the three statements?', a: 'IS: operating expense (tax-deductible in the simple case). CFS: added back as non-cash. BS: cash up by the tax savings; RE down by after-tax amount, common stock/APIC up by the full amount.', d: 2 },
      { q: 'What is goodwill and how is it tested?', a: 'The excess of purchase price over the fair value of a target’s identifiable net assets. Not amortized (public cos.); tested for impairment at least annually and written down if carrying value exceeds fair value.', d: 2 },
      { q: 'Company buys $100 of PP&E with $100 of debt. Effects today and after one year (10% depreciation, 10% interest, 25% tax)?', a: 'Today: PP&E +100, debt +100, no IS/cash change. After a year: IS D&A 10 + interest 10 → NI –15. CFS: –15 + 10 = cash –5. BS: cash –5, PP&E –10 (assets –15); RE –15. Balances.', d: 2 },
      { q: 'What is the cash conversion cycle?', a: 'DSO + DIO – DPO: the number of days cash is tied up between paying suppliers and collecting from customers. Lower is better.', d: 2 },
      { q: 'How do operating leases differ under IFRS 16 vs. US GAAP?', a: 'Both put a right-of-use asset and lease liability on the BS. IFRS 16 splits the IS cost into depreciation and interest (raising EBITDA). US GAAP operating leases keep a single straight-line rent expense in operating costs.', d: 3 },
      { q: 'A $100 goodwill impairment is not tax-deductible. Walk through the statements.', a: 'IS: NI –100 (no tax effect). CFS: NI –100 + 100 add-back = no cash change. BS: goodwill –100, RE –100. Balances.', d: 3 },
      { q: 'How do NOLs work and why do acquirers care?', a: 'Past losses offset future taxable income (US: indefinite carryforward, limited to 80% of taxable income). Acquirers value them as future tax savings, but Section 382 caps annual use after an ownership change.', d: 3 }
    ]
  });

  /* ------------------------------------------------------------------ */
  C.modules.push({
    id: 'tvm',
    num: '02',
    title: 'Time Value of Money',
    tagline: 'Discounting, NPV and IRR: the math underneath every valuation.',
    lessons: [
      {
        id: 'tvm-basics',
        title: 'Present value, future value & discount rates',
        minutes: 10,
        summary: 'Why a dollar today is worth more than a dollar tomorrow, and how to quantify it.',
        tool: 'tvm',
        body: `
<p>A dollar today beats a dollar next year for three reasons: you could invest it and earn a return (<strong>opportunity cost</strong>), inflation erodes purchasing power, and future payments carry <strong>risk</strong>. The <mark>discount rate</mark> captures all three: it is the return an investor requires for bearing the risk of a given cash flow.</p>
<div class="formula">FV = PV × (1 + r)<sup>n</sup> &nbsp;&nbsp;&nbsp; PV = FV / (1 + r)<sup>n</sup></div>
<p>$100 invested at 10% grows to $110 after one year and $121 after two (interest on interest is <strong>compounding</strong>). Working backward, $121 received in two years is worth $100 today at a 10% discount rate.</p>

<h3>Compounding frequency</h3>
<div class="formula">Effective annual rate = (1 + r/m)<sup>m</sup> – 1</div>
<p>12% compounded monthly gives an effective annual rate of 12.68%. Continuous compounding uses e<sup>rt</sup>.</p>

<h3>Mental-math shortcuts</h3>
<ul>
<li><strong>Rule of 72:</strong> years to double ≈ 72 / interest rate (%). At 8%, money doubles in about 9 years. At 12%, about 6.</li>
<li><strong>Rule of 114 / 144:</strong> years to triple ≈ 114 / rate; to quadruple ≈ 144 / rate.</li>
</ul>

<div class="callout key"><strong>The core intuition</strong> for every valuation question: value = cash flows ÷ (1 + risk-adjusted return)<sup>time</sup>. More cash, sooner and with less risk, means more value. Higher discount rates and cash flows further in the future mean less.</div>

<details class="practice"><summary>Would you rather have $1,000 today or $1,100 in one year?</summary>
<div><p>It depends on your discount rate. At 10% they're equal ($1,100 / 1.10 = $1,000). If your opportunity cost is below 10%, take the $1,100; above 10%, take the $1,000 today. A strong answer names the breakeven rate instead of picking one blindly.</p></div></details>
`,
        videos: [
          { t: 'How to Calculate Net Present Value, Annuity & Perpetuity', u: 'https://www.youtube.com/watch?v=iXh5tX-wuoI' }
        ],
        search: 'time value of money present value future value explained'
      },
      {
        id: 'tvm-perpetuity',
        title: 'Annuities & perpetuities',
        minutes: 8,
        summary: 'The closed-form formulas behind terminal value and bond pricing.',
        body: `
<p>An <mark>annuity</mark> is a fixed payment for a set number of periods (a mortgage, a bond's coupons). A <mark>perpetuity</mark> pays forever.</p>
<div class="formula">PV of annuity = C × [1 – (1 + r)<sup>–n</sup>] / r</div>
<div class="formula">PV of perpetuity = C / r</div>
<div class="formula">PV of growing perpetuity = C<sub>1</sub> / (r – g) &nbsp; (requires r &gt; g)</div>

<p>The growing perpetuity formula is the <strong>Gordon Growth Model</strong>. It's how a DCF calculates terminal value and how the dividend discount model values a stock. Note that C<sub>1</sub> is the <em>next</em> period's cash flow, which is why terminal value uses Final-year FCF × (1 + g).</p>

<h3>Worked example</h3>
<p>A stock will pay a $4 dividend next year, growing 3% forever. Required return is 8%.</p>
<div class="formula">Value = 4 / (0.08 – 0.03) = $80</div>
<p>If the growth rate rises to 4%, value jumps to $100, a 25% increase from a 1-point change. That sensitivity is why terminal growth assumptions are scrutinized so heavily.</p>

<div class="callout trap"><strong>Why must r exceed g?</strong> If growth equals or exceeds the discount rate, the formula produces infinite or negative value. Economically, no company can grow faster than the overall economy forever, so long-run g should sit at or below long-run nominal GDP growth (roughly 2–4%).</div>

<details class="practice"><summary>A perpetuity pays $50 per year starting one year from now. At 5%, what is it worth? What if the first payment is today?</summary>
<div><p>Starting next year: 50 / 0.05 = <strong>$1,000</strong>. Starting today: you get $50 now plus the same perpetuity: <strong>$1,050</strong>.</p></div></details>
`,
        videos: [
          { t: 'Dividend Discount Model with Gordon Growth as Terminal Value', u: 'https://www.youtube.com/watch?v=sJ1DGTtRFvo' }
        ],
        search: 'growing perpetuity formula explained gordon growth'
      },
      {
        id: 'tvm-npv-irr',
        title: 'NPV, IRR & capital budgeting',
        minutes: 12,
        summary: 'How companies decide which projects to fund, and the traps in IRR.',
        tool: 'tvm',
        body: `
<p><mark>Net present value (NPV)</mark> is the sum of all discounted cash flows, including the initial investment:</p>
<div class="formula">NPV = Σ CF<sub>t</sub> / (1 + r)<sup>t</sup> &nbsp;&nbsp; (CF<sub>0</sub> is usually negative)</div>
<p><strong>Decision rule:</strong> accept projects with NPV &gt; 0. A positive NPV means the project returns more than the cost of capital and creates value.</p>

<p>The <mark>internal rate of return (IRR)</mark> is the discount rate that makes NPV exactly zero. <strong>Decision rule:</strong> accept if IRR &gt; cost of capital (the "hurdle rate").</p>

<h3>Worked example</h3>
<table class="fin num">
<thead><tr><th>Year</th><th>0</th><th>1</th><th>2</th><th>3</th></tr></thead>
<tbody><tr><td>Cash flow</td><td>(1,000)</td><td>400</td><td>400</td><td>400</td></tr></tbody></table>
<p>At 10%: NPV = –1,000 + 400/1.1 + 400/1.21 + 400/1.331 = –1,000 + 363.6 + 330.6 + 300.5 = <strong>–5.3</strong>. Slightly negative, so reject. The IRR is about 9.7%, just below the 10% hurdle. Check it in the <a href="#tool-tvm">NPV/IRR calculator</a>.</p>

<h3>Why NPV beats IRR when they disagree</h3>
<ul>
<li><strong>Scale:</strong> IRR ignores size. A 50% IRR on $10 creates less value than a 20% IRR on $10 million.</li>
<li><strong>Reinvestment assumption:</strong> IRR implicitly assumes interim cash flows are reinvested at the IRR itself, which is unrealistic for very high IRRs. NPV assumes reinvestment at the cost of capital.</li>
<li><strong>Multiple IRRs:</strong> cash flows that change sign more than once (e.g., –, +, –) can have two or more IRRs.</li>
<li><strong>Timing:</strong> IRR rewards getting money back fast. That is why PE firms care about it, and why dividend recaps boost IRR.</li>
</ul>

<h3>Other metrics you should recognize</h3>
<ul>
<li><strong>MOIC</strong> (multiple on invested capital) = total cash returned / cash invested. Ignores time.</li>
<li><strong>Payback period:</strong> years until cumulative cash flow turns positive. Simple, but ignores time value and everything after payback.</li>
<li><strong>Profitability index</strong> = PV of future cash flows / initial investment. Useful when capital is rationed.</li>
</ul>

<div class="say"><div class="say-label">Say it in the interview: "NPV or IRR?"</div>
<p>"NPV is the better decision rule because it measures value created in dollars and assumes reinvestment at the cost of capital. IRR is useful as a return percentage that's easy to compare to a hurdle rate, and it's how private equity communicates returns, but it ignores scale, can have multiple solutions, and assumes reinvestment at the IRR. When they conflict on mutually exclusive projects, I'd go with NPV."</p></div>
`,
        videos: [
          { t: 'NPV and IRR explained', u: 'https://www.youtube.com/watch?v=Fw5-wccViOM' },
          { t: 'NPV And IRR Explained', u: 'https://www.youtube.com/watch?v=BYnIkijqWI0' },
          { t: 'How to calculate NPV and IRR in Excel', u: 'https://www.youtube.com/watch?v=RvV-zBp7f48' }
        ],
        search: 'NPV vs IRR explained capital budgeting'
      }
    ],
    quiz: [
      { q: 'Using the Rule of 72, roughly how long does it take money to double at 9%?', o: ['6 years', '8 years', '9 years', '12 years'], a: 1, e: '72 / 9 = 8 years.' },
      { q: 'A perpetuity pays $20 next year, growing 2% annually, discounted at 7%. Its value is:', o: ['$285.71', '$400', '$408', '$1,000'], a: 1, e: '20 / (0.07 – 0.02) = 20 / 0.05 = $400. C₁ is already next year’s payment, so no extra growth adjustment.' },
      { q: 'A project has NPV of +$50 at a 10% discount rate. Its IRR is:', o: ['Below 10%', 'Exactly 10%', 'Above 10%', 'Cannot tell'], a: 2, e: 'For a conventional project (outflow then inflows), NPV falls as the rate rises. NPV > 0 at 10% means you need a higher rate to bring it to zero, so IRR > 10%.' },
      { q: 'Why can IRR mislead when comparing mutually exclusive projects?', o: ['It ignores time value', 'It ignores project scale and assumes reinvestment at the IRR', 'It always overstates returns', 'It uses accounting profits'], a: 1, e: 'IRR is a percentage: it ignores dollar value created, and implicitly assumes interim cash flows earn the IRR.' },
      { q: '$100 grows to $150 in 3 years. The annual compounded return is closest to:', o: ['10.0%', '14.5%', '16.7%', '50%'], a: 1, e: '(150/100)^(1/3) – 1 = 1.5^(0.333) – 1 ≈ 14.5%.' },
      { q: '12% annual rate compounded monthly gives an effective annual rate of about:', o: ['12.00%', '12.36%', '12.68%', '13.00%'], a: 2, e: '(1 + 0.01)^12 – 1 = 12.68%.' },
      { q: 'Which statement about MOIC is true?', o: ['It accounts for time', 'It equals IRR for a one-year deal', 'It ignores the timing of returns', 'It uses the discount rate'], a: 2, e: 'MOIC = cash out / cash in, regardless of how long it took. A 2.0x in 3 years is very different from 2.0x in 10 years.' }
    ],
    cards: [
      { q: 'Why is a dollar today worth more than a dollar tomorrow?', a: 'Opportunity cost (it can be invested), inflation, and risk/uncertainty of future payment. The discount rate captures all three.', d: 1 },
      { q: 'What is NPV and what is the decision rule?', a: 'Sum of discounted cash flows including the initial investment. Accept if NPV > 0 because the project earns more than its cost of capital.', d: 1 },
      { q: 'What is IRR?', a: 'The discount rate at which NPV = 0. Accept if IRR exceeds the hurdle rate (cost of capital).', d: 1 },
      { q: 'Formula for a growing perpetuity?', a: 'PV = C₁ / (r – g), where C₁ is next period’s cash flow and r > g.', d: 1 },
      { q: 'What is the Rule of 72?', a: 'Years to double ≈ 72 / annual rate in %. E.g., 6% → 12 years.', d: 1 },
      { q: 'When do NPV and IRR give different answers, and which do you trust?', a: 'With mutually exclusive projects of different scale or timing, or non-conventional cash flows. Trust NPV: it measures value in dollars and assumes reinvestment at the cost of capital.', d: 2 },
      { q: 'What is the reinvestment assumption in IRR?', a: 'IRR implicitly assumes interim cash flows are reinvested at the IRR itself, which overstates returns for high-IRR projects. MIRR fixes this by using a specified reinvestment rate.', d: 3 },
      { q: 'How would you approximate the IRR of a 2.5x return over 5 years?', a: '2x in 5 years ≈ 15%, 3x in 5 years ≈ 25%, so 2.5x is about 20% (exact: 2.5^(1/5) – 1 ≈ 20.1%).', d: 2 },
      { q: 'What is the difference between MOIC and IRR?', a: 'MOIC = total cash returned / invested, ignoring time. IRR is the annualized, time-weighted return. A fast exit raises IRR even with the same MOIC.', d: 2 }
    ]
  });
})(window.COURSE);
