# Fictional Predoc Assignment Email

From: Professor Rebecca Lester-Suarez Serrato <rlss@fictional-stax.example>
To: STAX Predoc Team <predocs@fictional-stax.example>
Subject: First pass on film tax credit buyer panel
Date: Monday, March 4, 2024 at 8:17 AM

Hi team,

For the seminar demo this week, I want us to prototype the buyer-side panel for our fictional film tax credit project. Imagine that productions receiving state film incentives can sell unused production tax credits to companies with enough tax capacity to use them. We want to understand which companies buy these credits and whether they had prior exposure to older film-finance deals.

Could you make a first-pass, auditable company-year file for 2019-2024?

The real version of this project would start by pulling public-style labor-market and industry context from IPUMS and QCEW, then merging those data to proprietary company-level financials and film-credit transaction records. For this training exercise, please use the small fictional files in `data/raw/` instead:

- `company_directory.csv`: fictional company directory with industries, aliases, and annual revenue.
- `film_tax_credit_purchases.csv`: fictional buyer-side film tax credit purchase records.
- `legacy_film_finance_deals.csv`: fictional legacy film-finance deal parties and role descriptions.

The key output should be a company-year panel with:

- company name
- year
- industry
- revenue in millions
- indicator for buying film tax credits that year
- indicator for prior or current legacy film-finance investor participation
- amount of film tax credits bought that year

Please be conservative when classifying legacy film-finance parties. If a party looks like a production company, studio/distributor, streaming customer, completion bond firm, payroll vendor, advisor, or ambiguous strategic partner, do not count it as a legacy finance investor. I care more about transparent assumptions than about forcing every row into a category.

It would be useful if the repo produces an audit note explaining which rules were used, which rows were ambiguous, and whether any names failed to match the company directory. That audit note is what I would want to read before trusting the panel.

Thanks,

Rebecca Lester-Suarez Serrato

Professor of Accounting, Tax, and Public Finance

Fictional STAX Lab
