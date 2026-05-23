# Fictional Predoc Assignment Email

From: Professor Rebecca Lester-Suarez Serrato <rlss@fictional-stax.example>
To: STAX Predoc Team <predocs@fictional-stax.example>
Subject: Starter pull for green credit buyer-side panel
Date: Monday, March 4, 2024 at 8:17 AM

Hi team,

For the seminar demo this week, I want us to prototype the buyer-side panel for our fictional green investment credit project. Imagine that clean-energy developers can sell unused tax credits to companies with enough tax capacity to use them. We want to understand which firms buy these credits and whether they had prior exposure to legacy clean-energy finance deals.

Could you make a first-pass, auditable firm-year file for 2019-2024?

The real version of this project would start by pulling public-style industry and labor-market context from IPUMS and QCEW, then merging those data to proprietary firm-level financials. For this training exercise, please use the small fictional files in `data/raw/` instead:

- `firm_directory.csv`: fictional firm directory with industries, aliases, and annual revenue.
- `green_credit_purchases.csv`: fictional buyer-side green credit purchase records.
- `legacy_energy_finance_deals.csv`: fictional legacy finance deal parties and role descriptions.

The key output should be a firm-year panel with:

- firm name
- year
- industry
- revenue in millions
- indicator for buying green credits that year
- indicator for prior or current legacy clean-energy finance investor participation
- amount of green credits bought that year

Please be conservative when classifying legacy deal parties. If a party looks like a developer, customer, advisor, or ambiguous participant, do not count it as a legacy finance investor. I care more about transparent assumptions than about forcing every row into a category.

It would be useful if the repo produces an audit note explaining which rules were used, which rows were ambiguous, and whether any names failed to match the firm directory. That audit note is what I would want to read before trusting the panel.

Thanks,

Rebecca Lester-Suarez Serrato

Professor of Accounting, Tax, and Public Finance

Fictional STAX Lab
