/* Course content, part 4: Markets & Macro, Behavioral & Fit, Glossary, Resources */
(function (C) {
  /* ------------------------------------------------------------------ */
  C.modules.push({
    id: 'markets',
    num: '09',
    title: 'Markets & Macro',
    tagline: 'Rates, the yield curve, economic data and how to pitch a stock.',
    lessons: [
      {
        id: 'mkt-rates',
        title: 'Interest rates & central banks',
        minutes: 12,
        summary: 'How the Fed sets policy and why rates move every asset price.',
        body: `
<p>The Federal Reserve has a <strong>dual mandate</strong>: maximum employment and stable prices (an inflation target of 2%, measured by PCE). Its main tools:</p>
<ul>
<li><strong>Policy rate</strong>: the target range for the federal funds rate, the overnight rate at which banks lend reserves to each other. It anchors short-term rates throughout the economy.</li>
<li><strong>Balance sheet</strong>: quantitative easing (buying bonds to push long-term rates down) and quantitative tightening (letting them roll off).</li>
<li><strong>Forward guidance</strong>: signaling the future path of policy to shape expectations.</li>
</ul>

<h3>How rates ripple through markets and deals</h3>
<table class="fin">
<thead><tr><th>Rates rise →</th><th>Effect</th></tr></thead>
<tbody>
<tr><td>Valuations</td><td>Higher risk-free rate raises WACC and lowers DCF values. Long-duration assets (high-growth tech, long bonds) are hit hardest because more of their value is far in the future.</td></tr>
<tr><td>M&amp;A and LBOs</td><td>Debt costs more, so sponsors can't lever as much and must pay lower multiples to hit target IRRs. Deal volume typically falls.</td></tr>
<tr><td>Bonds</td><td>Prices of existing bonds fall.</td></tr>
<tr><td>Banks</td><td>Net interest margin often widens at first, but unrealized losses on bond holdings grow and loan demand can weaken.</td></tr>
<tr><td>Currency</td><td>Higher relative rates tend to strengthen the currency, attracting foreign capital.</td></tr>
<tr><td>Economy</td><td>Borrowing becomes more expensive for consumers and businesses, slowing spending and, eventually, inflation.</td></tr>
</tbody></table>

<div class="say"><div class="say-label">Say it in the interview: "How would a 1% increase in interest rates affect a company's valuation?"</div>
<p>"Directly, it raises the risk-free rate, and with it the cost of equity and cost of debt, so WACC rises and DCF value falls. The effect is larger for companies whose value depends on distant cash flows, like high-growth companies. Indirectly, it may slow the economy and reduce projected cash flows, and it makes acquisition financing more expensive, which tends to lower the multiples buyers can pay."</p></div>
`,
        videos: [
          { t: 'Bond Yields Explained for Beginners: How Treasury Bonds and Interest Rates Work', u: 'https://www.youtube.com/watch?v=1dfzrDAlV-Y' }
        ],
        search: 'how federal reserve interest rates affect stock market valuations explained'
      },
      {
        id: 'mkt-curve',
        title: 'The yield curve',
        minutes: 8,
        summary: 'Normal, flat and inverted curves, and what they signal.',
        body: `
<p>The <mark>yield curve</mark> plots government bond yields against maturity, from 1 month to 30 years.</p>
<div class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-label="Normal, flat and inverted yield curves">
  <line x1="60" y1="190" x2="620" y2="190" stroke="var(--line-strong)"/>
  <line x1="60" y1="20" x2="60" y2="190" stroke="var(--line-strong)"/>
  <text x="340" y="220" text-anchor="middle" class="d-t">Maturity (3m → 30y)</text>
  <text x="20" y="105" text-anchor="middle" class="d-t" transform="rotate(-90 20 105)">Yield</text>
  <path d="M70 160 C 160 110, 300 75, 610 55" fill="none" stroke="var(--viz-1)" stroke-width="2.5"/>
  <path d="M70 115 C 200 112, 400 112, 610 110" fill="none" stroke="var(--viz-3)" stroke-width="2.5"/>
  <path d="M70 60 C 160 90, 300 120, 610 135" fill="none" stroke="var(--viz-2)" stroke-width="2.5"/>
  <text x="600" y="48" text-anchor="end" class="d-t">Normal (upward)</text>
  <text x="600" y="103" text-anchor="end" class="d-t">Flat</text>
  <text x="600" y="152" text-anchor="end" class="d-t">Inverted</text>
</svg>
<div class="diagram-cap">Illustrative shapes, not actual data.</div>
</div>

<ul>
<li><strong>Normal (upward-sloping):</strong> investors demand more for locking money up longer (term premium) and expect growth and inflation.</li>
<li><strong>Flat:</strong> transition; markets are uncertain about growth.</li>
<li><strong>Inverted (short rates above long rates):</strong> usually happens when the central bank holds short rates high to fight inflation while markets expect future cuts because growth will slow. Inversion of the 2-year/10-year or 3-month/10-year spread has preceded most U.S. recessions since the 1960s, but with long and variable lags, and the 2022–24 inversion was not followed by a recession in the usual window, so treat it as a signal, not a law.</li>
</ul>
<p>The short end tracks central-bank policy; the long end reflects expected future short rates, inflation expectations and the term premium (including government debt supply).</p>

<div class="callout key"><strong>Steepening vs. flattening:</strong> a "bear steepener" (long yields rising faster) often reflects inflation or fiscal worries; a "bull steepener" (short yields falling faster) often reflects expected rate cuts.</div>
`,
        videos: [
          { t: 'Treasury Yield Curve Explained', u: 'https://www.youtube.com/watch?v=TxPaRBMCuMo' },
          { t: 'How Does the Treasury Yield Curve Predict Recessions So Accurately?', u: 'https://www.youtube.com/watch?v=VPDIgduznFI' }
        ],
        search: 'yield curve inversion explained recession'
      },
      {
        id: 'mkt-indicators',
        title: 'Economic indicators & staying current',
        minutes: 10,
        summary: 'The data that moves markets, and a daily routine to answer "what’s going on in markets?"',
        tool: 'notes',
        body: `
<table class="fin">
<thead><tr><th>Indicator</th><th>What it measures</th><th>Why it matters</th></tr></thead>
<tbody>
<tr><td><strong>CPI / Core CPI</strong></td><td>Consumer price inflation (core excludes food and energy)</td><td>The headline inflation number; drives rate expectations.</td></tr>
<tr><td><strong>PCE / Core PCE</strong></td><td>Inflation based on personal consumption expenditures</td><td>The Fed's preferred inflation gauge.</td></tr>
<tr><td><strong>Nonfarm payrolls &amp; unemployment</strong></td><td>Monthly jobs created and the unemployment rate</td><td>The employment half of the Fed's mandate.</td></tr>
<tr><td><strong>GDP</strong></td><td>Output: consumption + investment + government spending + net exports</td><td>Two consecutive negative quarters is a common shorthand for recession (the official U.S. call is made by the NBER).</td></tr>
<tr><td><strong>PMIs / ISM</strong></td><td>Surveys of purchasing managers (above 50 = expansion)</td><td>Timely, forward-looking read on activity.</td></tr>
<tr><td><strong>Retail sales, consumer confidence</strong></td><td>Consumer spending and sentiment</td><td>Consumption is roughly two-thirds of U.S. GDP.</td></tr>
<tr><td><strong>VIX</strong></td><td>Implied volatility of S&amp;P 500 options</td><td>The market's "fear gauge".</td></tr>
</tbody></table>

<h3>A 15-minute daily routine</h3>
<ol class="steps">
<li>Check the levels: S&amp;P 500, Nasdaq, 10-year Treasury yield, fed funds range, oil, the dollar, and the VIX. Know them roughly, and know the direction over the past month.</li>
<li>Read the top stories in the WSJ, FT, Bloomberg or Reuters, plus a newsletter such as Matt Levine's <em>Money Stuff</em>.</li>
<li>Track two or three live deals in the sector you're interviewing for: price, multiple, rationale, financing.</li>
<li>Write a one-paragraph "what's happening in markets" summary. Practice saying it in 60 seconds.</li>
</ol>

<div class="callout trap"><strong>This course can't give you today's numbers.</strong> Market levels change daily, so the content here deliberately avoids quoting them. Use the <a href="#tool-notes">Market Notes</a> page to record current levels and deals before each interview; it saves in your browser.</div>

<div class="say"><div class="say-label">Say it in the interview: "What's going on in the markets?"</div>
<p>Use a three-part structure: <strong>(1) Macro:</strong> where rates and inflation are and what the Fed is expected to do; <strong>(2) Markets:</strong> how equities and credit have reacted, and which sectors are leading or lagging; <strong>(3) Deals:</strong> what that means for M&amp;A, IPO and financing activity, with one specific example. End with your own view and one reason for it.</p></div>
`,
        videos: [],
        search: 'how to stay up to date on financial markets for interviews'
      },
      {
        id: 'mkt-pitch',
        title: 'Pitch me a stock',
        minutes: 12,
        summary: 'A repeatable structure for stock pitches in IB, ER, AM and hedge fund interviews.',
        body: `
<p>A stock pitch is an argument that the market is <strong>mispricing</strong> a company, with evidence and a way to be proven right. "It's a great company" is not a pitch: great companies can be fully priced.</p>
<h3>Structure (2–3 minutes)</h3>
<ol class="steps">
<li><strong>Recommendation:</strong> "I'd buy [company], currently around $X, with a 12-month price target of $Y, about Z% upside."</li>
<li><strong>Company in one sentence:</strong> what it does and how it makes money.</li>
<li><strong>Thesis (2–3 points):</strong> each a specific reason the market is wrong. This is your <mark>variant perception</mark>: what you believe that consensus doesn't.</li>
<li><strong>Valuation:</strong> how you got your target, e.g., "15x my 2027 EPS estimate of $8, versus peers at 18x," or a DCF cross-check.</li>
<li><strong>Catalysts:</strong> events that will make the market recognize the value (earnings, product launch, spin-off, margin inflection).</li>
<li><strong>Risks and mitigants:</strong> what would make you wrong, and why you're still comfortable.</li>
</ol>

<h3>Template</h3>
<div class="prompt-box">"I'd recommend <u>buying</u> <u>[Company]</u>, at about <u>$__</u>, with a target of <u>$__</u>. It <u>[does what]</u>. The market is worried about <u>[consensus concern]</u>, but I think that's overdone because <u>[thesis 1]</u> and <u>[thesis 2]</u>. At <u>__x</u> forward earnings versus peers at <u>__x</u>, the stock prices in <u>[pessimistic assumption]</u>. The catalyst is <u>[event, timing]</u>. The main risk is <u>[risk]</u>, which I'd monitor through <u>[metric]</u>."</div>

<div class="callout key"><strong>How to pick your stock:</strong> choose a company you can talk about for 20 minutes, in an industry you understand, that is not one of the five most famous stocks in the world, and that has a debatable angle. Know its key numbers cold: market cap, EV, revenue, margins, growth, multiples vs. peers.</div>

<details class="practice"><summary>What are the most common follow-up questions?</summary>
<div><p>"What's the bear case?" · "Why hasn't the market figured this out?" · "What would make you sell?" · "Who are its competitors and how does it compare?" · "What multiple does it trade at and why?" · "How would you hedge this position?" (e.g., short a peer or the sector ETF to isolate the company-specific view).</p></div></details>
`,
        videos: [
          { t: 'How to Pitch a Stock', u: 'https://www.youtube.com/watch?v=TkdvAXzEFuc' },
          { t: 'How to pitch a stock: the formula every investment analyst uses', u: 'https://www.youtube.com/watch?v=rvL2tQUFZtE' },
          { t: 'How to Pitch a Stock in Interviews: Key Points You Should Mention', u: 'https://www.youtube.com/watch?v=p3zADu4viqg' },
          { t: 'Master The Trade Pitch For Hedge Fund Interviews', u: 'https://www.youtube.com/watch?v=KIzncHLibhA' }
        ],
        search: 'how to pitch a stock interview'
      }
    ],
    quiz: [
      { q: 'The Fed’s preferred inflation measure is:', o: ['CPI', 'Core PCE', 'PPI', 'GDP deflator'], a: 1, e: 'The Fed targets 2% PCE inflation and watches core PCE closely.' },
      { q: 'Which company’s valuation is most sensitive to a rise in interest rates?', o: ['A utility paying high dividends today', 'A high-growth software firm with profits expected in 8 years', 'A grocery chain', 'A short-duration T-bill fund'], a: 1, e: 'Most of its value lies in distant cash flows, so a higher discount rate hurts it most (high equity duration).' },
      { q: 'An inverted yield curve means:', o: ['Long rates exceed short rates', 'Short rates exceed long rates', 'All yields are negative', 'The Fed is buying bonds'], a: 1, e: 'Short-term yields above long-term yields.' },
      { q: 'A PMI reading of 47 suggests:', o: ['Expansion', 'Contraction', 'High inflation', 'Full employment'], a: 1, e: 'Below 50 indicates contraction.' },
      { q: 'The most important element of a stock pitch is:', o: ['The company’s brand', 'A variant perception: why the market is wrong', 'Recent price momentum', 'The CEO’s background'], a: 1, e: 'A pitch must explain the mispricing and how it will be corrected.' },
      { q: 'Rising rates typically affect LBO activity by:', o: ['Increasing it', 'Making debt costlier, lowering affordable multiples and deal volume', 'Having no effect', 'Lowering target IRRs'], a: 1, e: 'Higher financing costs constrain leverage and prices.' }
    ],
    cards: [
      { q: 'How do higher interest rates affect valuations?', a: 'Higher risk-free rate → higher WACC → lower DCF values, especially for long-duration growth companies. Also slows the economy and raises deal financing costs.', d: 1 },
      { q: 'What is the Fed’s dual mandate?', a: 'Maximum employment and stable prices (2% inflation, measured by PCE).', d: 1 },
      { q: 'What does an inverted yield curve signal?', a: 'Short rates above long rates; markets expect slower growth and future rate cuts. Historically a recession warning, but with long, variable lags and not infallible.', d: 1 },
      { q: 'Walk me through how you’d pitch a stock.', a: 'Recommendation and price target → what the company does → 2–3 thesis points (variant perception) → valuation support → catalysts → risks and mitigants.', d: 1 },
      { q: 'What economic indicators do you follow?', a: 'CPI/core PCE (inflation), payrolls and unemployment (jobs), GDP, PMIs, retail sales, and market prices like the 10-year yield and VIX.', d: 2 },
      { q: 'What is quantitative easing?', a: 'Central bank purchases of longer-term bonds to lower long-term rates and add liquidity when policy rates are near zero. QT is the reverse.', d: 2 },
      { q: 'How do interest rates affect currency?', a: 'Higher relative rates tend to attract foreign capital, strengthening the currency (all else equal).', d: 2 },
      { q: 'What is the VIX?', a: 'A measure of expected 30-day S&P 500 volatility implied by options prices; often called the fear gauge.', d: 2 },
      { q: 'How would you hedge a long position in a stock?', a: 'Short a close competitor or sector ETF (pairs trade) to isolate company-specific risk, or buy put options.', d: 3 }
    ]
  });

  /* ------------------------------------------------------------------ */
  C.modules.push({
    id: 'behavioral',
    num: '10',
    title: 'Behavioral & Fit',
    tagline: 'Your story, "why finance", STAR answers, and how to handle interview day.',
    lessons: [
      {
        id: 'beh-story',
        title: 'Tell me about yourself',
        minutes: 10,
        summary: 'The 90-second story that opens every interview.',
        tool: 'story',
        body: `
<p>"Walk me through your resume" or "tell me about yourself" is the first question in almost every interview, and it sets the tone. It's not a recitation of your resume. It's a <strong>narrative</strong> that explains how you arrived at this role and why it is the logical next step.</p>
<h3>Structure: beginning, middle, end</h3>
<ol class="steps">
<li><strong>Beginning (15s):</strong> where you're from or what you study, and the spark that got you interested in business or finance.</li>
<li><strong>Middle (45s):</strong> two or three experiences that built that interest and your skills. For each: what you did and what you learned.</li>
<li><strong>End (20s):</strong> why this role, now. Tie it back to what you've learned and what you want to do next.</li>
</ol>
<p>Aim for 60–90 seconds, about 150–220 spoken words. The <a href="#tool-story">Story Builder</a> times your draft.</p>

<div class="callout key"><strong>Good stories have a thread.</strong> Each step should seem to cause the next: "That internship showed me I liked the analytical side, so I joined the investment club, where I…" Interviewers remember a coherent arc, not a list.</div>

<div class="callout trap"><strong>Avoid:</strong> starting from high school (unless relevant), listing every job, talking about money or prestige, going over 2 minutes, or sounding memorized. Know your story well enough to tell it slightly differently every time.</div>
`,
        videos: [
          { t: 'IB Interview Questions: Tell me about yourself, Why banking, & Why this firm (With Examples)', u: 'https://www.youtube.com/watch?v=rkdkHb_Ekjs' },
          { t: 'Mastering "Walk Me Through Your Resume"', u: 'https://www.youtube.com/watch?v=QhG1mf0SEjQ' }
        ],
        search: 'walk me through your resume investment banking answer'
      },
      {
        id: 'beh-why',
        title: 'Why finance, why this firm, why you',
        minutes: 10,
        summary: 'Credible motivations and firm-specific answers.',
        body: `
<h3>"Why investment banking?" (or PE, ER, corporate finance)</h3>
<p>Give two or three specific, credible reasons connected to your experience:</p>
<ul>
<li><strong>Learning curve:</strong> exposure to many companies, industries and transactions in a short time.</li>
<li><strong>Skills:</strong> financial modeling, valuation and deal execution, which are foundational for a long career in finance.</li>
<li><strong>Nature of the work:</strong> high-stakes transactions with tangible outcomes, client interaction, teamwork.</li>
<li><strong>Evidence:</strong> "I discovered this when…" Point to a club project, internship, deal you followed, or conversation with a banker.</li>
</ul>
<p>Don't lead with money, prestige or exit opportunities. Interviewers know those exist; saying them signals you'll leave.</p>

<h3>"Why our firm?"</h3>
<p>Generic answers ("great culture, strong deal flow") fail. Mention:</p>
<ul>
<li>Specific people you spoke with and what they told you</li>
<li>Specific deals or the group's strength in a sector</li>
<li>Structural differences: generalist program vs. industry groups, team size, more responsibility at a boutique, global reach at a bulge bracket</li>
</ul>

<h3>"Why should we hire you?" / strengths and weaknesses</h3>
<p>Choose strengths that matter in the job (attention to detail, work ethic, quick learning, teamwork) and back each with a short example. For weaknesses, pick something real but not disqualifying, show what you're doing about it, and give evidence of improvement. "I'm a perfectionist" is a cliché and signals you're dodging.</p>
`,
        videos: [
          { t: 'Mock Interview Question: Why Investment Banking?', u: 'https://www.youtube.com/watch?v=kaBdA2nVtjw' },
          { t: 'Behavioral Answer Audit: Why Investment Banking', u: 'https://www.youtube.com/watch?v=sHNJkz_eVz4' }
        ],
        search: 'why investment banking interview answer'
      },
      {
        id: 'beh-star',
        title: 'Behavioral questions & the STAR method',
        minutes: 10,
        summary: 'Building a story bank that covers every behavioral question.',
        tool: 'story',
        body: `
<p>Behavioral questions ("tell me about a time when…") are answered with <mark>STAR</mark>:</p>
<ul>
<li><strong>Situation</strong>: brief context (1–2 sentences)</li>
<li><strong>Task</strong>: your specific responsibility or challenge</li>
<li><strong>Action</strong>: what <em>you</em> did (most of the answer; say "I", not "we")</li>
<li><strong>Result</strong>: the outcome, quantified if possible, and what you learned</li>
</ul>

<h3>Build a story bank</h3>
<p>Prepare five or six stories that can each answer several questions:</p>
<table class="fin">
<thead><tr><th>Question theme</th><th>Common phrasing</th></tr></thead>
<tbody>
<tr><td>Leadership</td><td>Tell me about a time you led a team.</td></tr>
<tr><td>Teamwork / conflict</td><td>Describe a disagreement with a teammate and how you resolved it.</td></tr>
<tr><td>Failure</td><td>Tell me about a time you failed. What did you learn?</td></tr>
<tr><td>Pressure / work ethic</td><td>Describe a time you worked under a tight deadline.</td></tr>
<tr><td>Attention to detail</td><td>Tell me about a mistake you caught (or made).</td></tr>
<tr><td>Initiative</td><td>Describe something you started or improved on your own.</td></tr>
<tr><td>Ethics</td><td>Tell me about a time you faced an ethical dilemma.</td></tr>
</tbody></table>
<p>The <a href="#tool-story">Story Builder</a> includes a STAR story bank saved in your browser.</p>

<div class="callout trap"><strong>The failure question</strong> tests self-awareness. Pick a real failure with real consequences, own it without blaming others, and spend most of the answer on what you changed afterward.</div>
`,
        videos: [],
        search: 'STAR method behavioral interview finance examples'
      },
      {
        id: 'beh-day',
        title: 'Interview day, brain teasers & questions to ask',
        minutes: 12,
        summary: 'What to do when you don’t know an answer, and how to finish strong.',
        tool: 'math',
        body: `
<h3>When you don't know a technical answer</h3>
<ol class="steps">
<li><strong>Don't bluff.</strong> Interviewers can tell, and confident wrong answers are worse than honest uncertainty.</li>
<li><strong>Reason out loud</strong> from first principles: "I haven't seen that exact question, but if depreciation is non-cash and tax-deductible, I'd expect…"</li>
<li><strong>Bound the answer</strong> if it's numerical, and state your assumptions.</li>
<li>If you're truly stuck: "I'm not sure, but I'd like to look into it after this." Then do, and mention it in your follow-up.</li>
</ol>

<h3>Mental math</h3>
<p>You'll be asked to multiply, divide and calculate percentages without a calculator. Practice: 17 × 6, 15% of 340, 1,250 / 25, growth rates and IRR approximations. The <a href="#tool-math">Mental Math Trainer</a> drills exactly these.</p>

<h3>Brain teasers and estimation</h3>
<p>Less common now in banking, still used at some trading and consulting-style interviews. They test structured thinking, not trivia.</p>
<details class="practice"><summary>What is the angle between the hour and minute hands at 3:15?</summary>
<div><p>The minute hand is at 90°. The hour hand moves 0.5° per minute, so it's at 90° + 15 × 0.5° = 97.5°. Angle = <strong>7.5°</strong>.</p></div></details>
<details class="practice"><summary>You have a 3-gallon and a 5-gallon jug. How do you measure exactly 4 gallons?</summary>
<div><p>Fill the 5, pour into the 3 (2 left in the 5). Empty the 3, pour the 2 in. Fill the 5 again, top up the 3 (needs 1). <strong>4 gallons</strong> remain in the 5.</p></div></details>
<details class="practice"><summary>Estimate the annual revenue of a coffee shop near your campus.</summary>
<div><p>Structure: customers per day × average ticket × days open. E.g., 400 customers × $6 × 360 days ≈ <strong>$860k</strong>. Then sanity-check: peak vs. off-peak hours, seasonality, seats. Interviewers grade the structure and your assumptions more than the final number.</p></div></details>

<h3>Questions to ask the interviewer</h3>
<ul>
<li>"What's the most interesting deal you've worked on recently, and what made it interesting?"</li>
<li>"What separates the analysts who do best in their first year?"</li>
<li>"How has the group's deal flow changed with the current rate environment?"</li>
<li>"What do you wish you had known before starting?"</li>
</ul>
<p>Avoid questions about pay or hours, and anything you could find on the firm's website.</p>

<h3>After the interview</h3>
<p>Send a short, specific thank-you email within 24 hours that references something you discussed. Keep notes on every person you meet; they matter for later rounds.</p>
`,
        videos: [
          { t: 'Investment Banking Mock Interview', u: 'https://www.youtube.com/watch?v=vBfH61DsU7Q' }
        ],
        search: 'investment banking superday tips'
      }
    ],
    quiz: [
      { q: 'The ideal length for "tell me about yourself" is roughly:', o: ['15 seconds', '60–90 seconds', '3–4 minutes', '5 minutes'], a: 1, e: 'Long enough to tell a coherent story, short enough to keep attention.' },
      { q: 'In a STAR answer, which part should take up the most time?', o: ['Situation', 'Task', 'Action', 'Result'], a: 2, e: 'Interviewers are evaluating what you did.' },
      { q: 'Which is the weakest reason to give for "why investment banking"?', o: ['Steep learning curve across many deals', 'Building modeling and valuation skills', 'The compensation and prestige', 'Client-facing work on high-stakes transactions'], a: 2, e: 'It may be true, but it signals the wrong motivation.' },
      { q: 'If you don’t know a technical answer, the best approach is to:', o: ['Guess confidently', 'Change the subject', 'Reason from first principles aloud and state assumptions', 'Say nothing'], a: 2, e: 'Structured reasoning shows how you think, which is what they want to see.' },
      { q: 'What is the angle between the clock hands at 3:00?', o: ['0°', '45°', '90°', '180°'], a: 2, e: 'The hour hand is at 90°, the minute hand at 0°.' }
    ],
    cards: [
      { q: 'Walk me through your resume (structure).', a: 'Beginning: background and spark of interest. Middle: 2–3 experiences that built your interest and skills, with what you learned. End: why this role now. 60–90 seconds, with a clear thread.', d: 1 },
      { q: 'Why investment banking?', a: 'Specific, credible reasons tied to your experience: steep learning curve, foundational modeling/valuation/deal skills, high-stakes client work. Back it with evidence (internship, club, deal). Avoid money and prestige.', d: 1 },
      { q: 'What is the STAR method?', a: 'Situation, Task, Action, Result. Spend most time on your actions, quantify results, and state what you learned.', d: 1 },
      { q: 'What is your greatest weakness? (approach)', a: 'A real, non-disqualifying weakness; concrete steps you’re taking; evidence of improvement. Avoid clichés like perfectionism.', d: 1 },
      { q: 'Tell me about a time you failed. (approach)', a: 'Real failure with consequences, take ownership, spend most of the answer on lessons and what you changed, ideally with a later success.', d: 2 },
      { q: 'What do you do if you don’t know a technical answer?', a: 'Don’t bluff; reason from first principles aloud; state assumptions; offer to follow up.', d: 1 },
      { q: 'Why our firm?', a: 'Specific people you’ve met, specific deals or sector strengths, structural features (group model, size, responsibility), and how they fit your goals.', d: 1 },
      { q: 'What questions should you ask at the end?', a: 'Questions about the interviewer’s experience, deals, what makes analysts successful, or how markets affect the group. Never pay/hours or easily searchable facts.', d: 2 }
    ]
  });

  /* ------------------------------------------------------------------ */
  C.glossary = [
    ['Absolute priority rule', 'In bankruptcy, senior claims are paid in full before junior claims receive anything.'],
    ['Accretion / dilution', 'Whether an acquisition increases (accretive) or decreases (dilutive) the buyer’s pro forma EPS.'],
    ['Accrual accounting', 'Recording revenue when earned and expenses when incurred, regardless of cash timing.'],
    ['Asset purchase', 'An acquisition of selected assets and liabilities, giving the buyer a tax step-up.'],
    ['Beta (β)', 'Sensitivity of a stock’s returns to market returns. Levered beta includes financial risk; unlevered beta reflects business risk only.'],
    ['Break-up fee', 'A payment by the target to the buyer if the target terminates a signed deal, typically for a superior offer.'],
    ['CAPM', 'Capital asset pricing model: Ke = Rf + β × equity risk premium.'],
    ['Capex', 'Capital expenditures: cash spent on long-lived assets such as PP&E.'],
    ['Cash conversion cycle', 'DSO + DIO – DPO: days of cash tied up in operations.'],
    ['CIM', 'Confidential information memorandum: the detailed sell-side marketing document sent to buyers under NDA.'],
    ['Comparable companies (comps)', 'Relative valuation using trading multiples of similar public companies.'],
    ['Control premium', 'The amount an acquirer pays above a target’s unaffected share price for control.'],
    ['Convexity', 'Curvature of the bond price-yield relationship.'],
    ['Cost of equity (Ke)', 'The return equity investors require, usually estimated with CAPM.'],
    ['Covenant', 'A condition in a debt agreement; maintenance covenants are tested periodically, incurrence covenants on specific actions.'],
    ['Credit spread', 'Yield on a risky bond minus the yield on a government bond of the same maturity.'],
    ['DCF', 'Discounted cash flow: values a business as the present value of its future free cash flows.'],
    ['Deferred revenue', 'Cash received before revenue is earned; a liability.'],
    ['Deferred tax liability (DTL)', 'Taxes owed in future periods because book tax expense exceeds cash taxes today.'],
    ['Diluted shares', 'Basic shares plus in-the-money options, warrants, RSUs and convertibles.'],
    ['Dividend recap', 'Raising debt to fund a dividend to owners, often a PE sponsor.'],
    ['Duration', 'A bond’s sensitivity to interest-rate changes; modified duration ≈ % price change per 1% yield change.'],
    ['EBIT', 'Earnings before interest and taxes; operating income.'],
    ['EBITDA', 'Earnings before interest, taxes, depreciation and amortization; a proxy for operating cash flow.'],
    ['Enterprise value (EV)', 'Value of core operations to all capital providers: equity value + debt + preferred + NCI – cash – non-operating assets.'],
    ['Equity risk premium (ERP)', 'Extra expected return of equities over the risk-free rate.'],
    ['Equity value', 'Value to common shareholders: share price × diluted shares.'],
    ['Exit multiple method', 'Terminal value = final-year EBITDA × an EV/EBITDA multiple.'],
    ['Fairness opinion', 'A bank’s opinion to a board that a transaction price is fair from a financial point of view.'],
    ['Football field', 'A chart comparing valuation ranges implied by different methods.'],
    ['Free cash flow (FCF)', 'Cash generated after capex and working-capital investment; unlevered (pre-interest) or levered (post-interest and debt payments).'],
    ['Goodwill', 'Excess of purchase price over the fair value of identifiable net assets acquired.'],
    ['Gordon Growth Model', 'Value of a growing perpetuity: C₁ / (r – g).'],
    ['High yield', 'Debt rated below investment grade (BB+/Ba1 or lower).'],
    ['IOI', 'Indication of interest: a non-binding first-round bid in an auction.'],
    ['IRR', 'Internal rate of return: the discount rate at which NPV = 0.'],
    ['LBO', 'Leveraged buyout: an acquisition funded largely with debt, typically by a private equity sponsor.'],
    ['Leverage ratio', 'Debt / EBITDA, a measure of indebtedness.'],
    ['LOI', 'Letter of intent: a more definitive second-round bid.'],
    ['LTM', 'Last twelve months: most recent fiscal year + current YTD – prior YTD.'],
    ['Mid-year convention', 'Discounting each year’s cash flow as if received mid-year (t – 0.5).'],
    ['MOIC', 'Multiple on invested capital: total cash returned / cash invested.'],
    ['NOL', 'Net operating loss: past losses that can offset future taxable income.'],
    ['Noncontrolling interest (NCI)', 'The portion of a consolidated subsidiary not owned by the parent.'],
    ['NOPAT', 'Net operating profit after tax: EBIT × (1 – t).'],
    ['NPV', 'Net present value: sum of discounted cash flows including the initial investment.'],
    ['Net working capital', 'Operating current assets minus operating current liabilities.'],
    ['P/E ratio', 'Share price / EPS, or equity value / net income.'],
    ['PIK', 'Payment-in-kind: interest that accrues to principal instead of being paid in cash.'],
    ['Precedent transactions', 'Relative valuation based on multiples paid in past acquisitions.'],
    ['Purchase price allocation (PPA)', 'Assigning an acquisition price to the fair value of assets and liabilities, with the residual to goodwill.'],
    ['Retained earnings', 'Cumulative net income kept in the business after dividends.'],
    ['Revolver', 'A revolving credit facility a company can draw and repay as needed.'],
    ['Risk-free rate', 'Return on a default-free asset, typically a long-dated government bond yield.'],
    ['RSU', 'Restricted stock unit: a grant of shares that vests over time.'],
    ['Sources & uses', 'Table showing how a transaction is funded and where the money goes.'],
    ['Stock-based compensation (SBC)', 'Employee pay in equity; non-cash but dilutive.'],
    ['Stub period', 'A partial first projection period when the valuation date falls mid-year.'],
    ['Sum-of-the-parts', 'Valuing each business segment separately and adding them.'],
    ['Synergies', 'Cost savings or revenue gains from combining two companies.'],
    ['Terminal value', 'Value of all cash flows beyond the projection period.'],
    ['Term Loan B', 'Institutional term loan with minimal amortization and floating rate, common in LBOs.'],
    ['Treasury stock method', 'Diluted-share method assuming option proceeds repurchase shares at the current price.'],
    ['UFCF', 'Unlevered free cash flow: EBIT × (1 – t) + D&A – capex – Δ NWC.'],
    ['WACC', 'Weighted average cost of capital: blended after-tax required return of debt and equity.'],
    ['Working capital', 'Short-term operating assets minus liabilities that fund day-to-day operations.'],
    ['Yield curve', 'Plot of government bond yields by maturity.'],
    ['Yield to maturity (YTM)', 'The IRR of a bond held to maturity.']
  ];

  /* ------------------------------------------------------------------ */
  C.resources = {
    books: [
      ['Investment Banking: Valuation, LBOs, M&A and IPOs', 'Joshua Rosenbaum & Joshua Pearl', 'The standard reference for banking technicals and modeling.'],
      ['The Little Book of Valuation', 'Aswath Damodaran', 'Short, readable intro to intrinsic and relative valuation.'],
      ['Valuation: Measuring and Managing the Value of Companies', 'McKinsey & Company', 'The deep reference on DCF and value creation.'],
      ['Financial Statement Analysis', 'Martin Fridson & Fernando Alvarez', 'How to read statements critically.'],
      ['Liar’s Poker / Barbarians at the Gate', 'Michael Lewis / Bryan Burrough & John Helyar', 'Culture and history: useful for "why finance" conversations.']
    ],
    channels: [
      ['Aswath Damodaran', 'https://www.youtube.com/@AswathDamodaranonValuation', 'Full NYU Stern valuation and corporate-finance courses.'],
      ['Breaking Into Wall Street', C.yt('Breaking Into Wall Street'), 'Interview technicals, modeling and case studies.'],
      ['Wall Street Prep', C.yt('Wall Street Prep'), 'Modeling tutorials and interview prep.'],
      ['Corporate Finance Institute', C.yt('Corporate Finance Institute CFI'), 'Accounting and Excel modeling basics.'],
      ['Kenji Explains', C.yt('Kenji Explains finance'), 'Clear explanations from a former banker.'],
      ['Peak Frameworks', C.yt('Peak Frameworks paper LBO'), 'PE interview prep, paper LBOs, case studies.'],
      ['The Plain Bagel', C.yt('The Plain Bagel'), 'Accessible investing and markets explainers.'],
      ['Khan Academy: Finance & capital markets', C.yt('Khan Academy finance and capital markets'), 'Foundational time value of money and accounting.']
    ],
    sites: [
      ['Matt Levine, Money Stuff (Bloomberg)', 'Daily newsletter on deals, markets and finance law; great for interview talking points.'],
      ['Wall Street Journal / Financial Times / Reuters', 'Daily markets and deals coverage.'],
      ['SEC EDGAR', 'Primary source for 10-Ks, 10-Qs, 8-Ks, S-1s and merger proxies.'],
      ['Damodaran Online', 'Free datasets: betas, ERPs, multiples and cost of capital by industry.'],
      ['FRED (St. Louis Fed)', 'Free macro data: rates, inflation, GDP, yield curve.']
    ]
  };
})(window.COURSE);
