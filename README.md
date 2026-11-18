# Superday Prep

An interactive finance interview course: everything you need for investment banking, private equity, corporate development and equity research technical and fit interviews.

It's a static website with no build step and no backend. Open `index.html` in a browser, or host it on GitHub Pages.

## What's inside

**11 modules, 43 lessons** (about 8 hours of reading)

| # | Module | Covers |
|---|--------|--------|
| 00 | Start Here | Interview format, grading, a 4-week study plan |
| 01 | Accounting & the Three Statements | Statement links, "$10 change" walk-throughs, working capital, deferred taxes, goodwill, leases |
| 02 | Time Value of Money | PV/FV, perpetuities, NPV vs. IRR |
| 03 | Equity Value & Enterprise Value | The EV bridge, treasury stock method, multiples |
| 04 | Valuation Methods | Trading comps, precedent transactions, football field, special industries |
| 05 | DCF | UFCF, WACC/CAPM/beta, terminal value, follow-up questions |
| 06 | Mergers & Acquisitions | Deal rationale, sell-side process, accretion/dilution, purchase price allocation |
| 07 | LBOs & Private Equity | LBO mechanics, IRR/MOIC mental math, a full paper LBO, debt structure |
| 08 | Debt, Credit & Fixed Income | Bond pricing, duration and convexity, credit analysis, capital markets |
| 09 | Markets & Macro | Rates and the Fed, the yield curve, economic indicators, stock pitches |
| 10 | Behavioral & Fit | Your story, "why finance", STAR answers, interview-day tactics |

Each lesson has a scripted "Say it in the interview" answer, practice questions, common traps and links to YouTube videos (plus a YouTube search link that keeps working if a video is removed).

**Practice**
- 74 multiple-choice quiz questions with explanations, plus a 25-question final exam
- 117 flashcards with spaced repetition (Leitner boxes), tagged Core / Standard / Advanced
- Timed mock interviews with self-grading; misses go back into the flashcard queue

**11 interactive tools.** Inputs are blue, as in a banker's Excel model.
- Statement Simulator (20 events, generates a spoken answer, checks the balance sheet balances)
- DCF Builder (both terminal value methods, mid-year convention, sensitivity grid)
- LBO Model (sources & uses, debt schedule, IRR/MOIC, return attribution, sensitivity grid)
- Merger Model (accretion/dilution, cost-of-acquisition shortcut, breakeven synergies)
- WACC Calculator, EV Bridge & Dilution, NPV/IRR, Bond Calculator
- Mental Math Trainer, Market Notes, Story Builder

**Reference:** formula sheet, a glossary of 70 terms, books, channels and data sources.

Progress, notes and stories are saved in your browser's local storage. Nothing is sent anywhere.

## Run it

```bash
# any static server works, or just open index.html directly
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Publish on GitHub Pages
Settings → Pages → "Deploy from a branch" → pick this branch and `/ (root)`.

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `/` or `Ctrl/⌘ + K` | Search the course |
| `Space` | Flip a flashcard |
| `1` / `2` / `3` | Rate a flashcard: again / shaky / got it |

## Project structure

```
index.html              App shell
assets/css/style.css    All styles (light and dark themes)
assets/js/content-1.js  Start Here, Accounting, Time Value of Money
assets/js/content-2.js  EV, Valuation Methods, DCF
assets/js/content-3.js  M&A, LBO, Credit
assets/js/content-4.js  Markets, Behavioral, glossary, resources
assets/js/tools.js      Interactive models and charts
assets/js/app.js        Routing, progress, quizzes, flashcards, mock interviews, search
```

To add a lesson, append an object to a module's `lessons` array in the matching content file. Quizzes (`quiz`) and flashcards (`cards`) follow the same pattern.

## A note on accuracy

The content follows standard interview conventions (US GAAP unless stated, simplified tax treatment for walk-throughs). Market levels are deliberately not quoted because they change daily. Use the Market Notes tool to record current figures before each interview.
