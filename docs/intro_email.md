# Predoc Assignment Email

From: The Hon. Dr. Sir Jensen Ahokovi, PhD, MA, BA. <jensen@stax.example>
To: STAX Predoc Team <predocs@stax.example>
Subject: Possible new project on school lunch modernization grants
Date: Monday, March 4, 2024 at 8:17 AM
Attachment: school_lunch_modernization_raw_data.zip

Hi team,

I have a possible new project that I would like to explore. The state has been giving small modernization grants to schools for cafeteria equipment, kitchen upgrades, and healthier meal infrastructure, but I do not yet have a clean sense of which schools received what.

The broad question is whether we can turn these grant records into an auditable school-year panel. My intuition is that better kitchens, cooler storage, salad bars, and serving-line upgrades may show up in meal participation or healthier menu measures, but I do not know what the raw files will support.

I attached the raw materials I have so far. They are not cleaned or documented beyond what is in the files, so please treat this as exploratory. I expect school and district names, grant records, equipment descriptions, cafeteria partner role labels, and school-name crosswalks to need some judgment before we can say anything confidently. The ZIP contains:

- `school_directory.csv`: school directory with districts, aliases, grade spans, enrollment, and yearly meal outcomes.
- `established_school_crosswalk.csv`: clean crosswalk from observed school names and aliases to canonical school IDs.
- `school_lunch_modernization_grant_awards.csv`: grant award records with raw school names, project descriptions, and award amounts.
- `cafeteria_partner_role_records.csv`: cafeteria partner role records with organization names, raw role labels, and notes.

Could you take a first pass and see whether it is possible to turn this into a school-year file for 2019-2024? I would like something that shows, for each school and year:

- whether the school received a modernization grant
- roughly how much it received
- what its lunch participation and healthy-meal measures look like
- whether it appears to have led a meal-program modernization effort

Please do not worry about making this perfect on the first pass. I care more about a transparent, auditable workflow: what files are there, how names were matched, which role labels were counted as school meal-program leads, what looked ambiguous, and what should be checked before I rely on the results.

If an organization's role sounds like a district office, equipment vendor, food supplier, consultant, nutrition education group, or just a vague strategic partner, please flag it instead of automatically treating it as a school lead. A conservative first pass with clear caveats would be more useful than a polished file that hides the hard calls.

Thanks,

The Hon. Dr. Sir Jensen Ahokovi, PhD, MA, BA.
