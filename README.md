# DITE-M1: Clinical Macro & Micro Planner 🩺

DITE-M1 is an open-source, client-side nutrition calculator that estimates daily energy, macronutrient and key micronutrient targets for Indian adults, based on the ICMR-NIN (2020) Recommended Dietary Allowances.

It is built for busy OPDs, Community Health Centres and nutritionists who need a quick, printable diet target for a patient.

🌐 **Live application:** https://moulvigufran.github.io/DITE-M1

> **Status:** educational tool, not yet clinically validated. See "Limitations" before using it with patients.

## Features

- **Energy needs:** BMR and total daily energy for three activity levels (sedentary, moderate, heavy).
- **Pregnancy and lactation:** additional energy and protein by trimester and by lactation period.
- **Micronutrients:** fibre, sodium, potassium, iron, vitamin C, folate, calcium and magnesium targets.
- **Clinical toggles:** hypertension mode (lower sodium) and CKD mode (protein restriction).
- **Printable report:** one-click report with the institution name, in English, Hindi or Telugu (labels only for now).
- **Private:** all calculation happens in the browser. No patient data is sent to any server. Only the hospital name and theme are saved, in the browser's local storage.
- **Installable (PWA):** works offline after the first online visit.

## How it is calculated

| Step | Method |
|------|--------|
| BMR | FAO/WHO/UNU weight-based equations by age band (18-30, 30-60, 60+), reduced by 10% for men and 9% for women, as ICMR-NIN 2020 does for Indians |
| Total energy | BMR × PAL (1.4 sedentary, 1.8 moderate, 2.3 heavy) |
| Goal | Maintain, ±250 kcal or ±500 kcal. Never below BMR. Weight-loss goals are blocked in pregnancy, lactation and underweight BMI |
| Pregnancy / lactation energy | +350 kcal (2nd and 3rd trimester), +600 kcal (lactation 0-6 months), +520 kcal (7-12 months) |
| Protein | 15% of energy, never below the ICMR RDA of 0.83 g/kg plus the pregnancy or lactation increment |
| Fat / carbohydrate | Fat 25% of energy, carbohydrate the remainder |
| BMI | Asian cut-offs: under 18.5 underweight, 18.5-22.9 normal, 23-24.9 overweight, 25 and above obese |
| Micronutrients | ICMR-NIN 2020 RDA / AI values for adults, with separate values for pregnancy, lactation and age 60+ |

Reference check: a 65 kg sedentary man gives 2106 kcal (ICMR table: 2110) and a 55 kg sedentary woman gives 1658 kcal (ICMR table: 1660).

## Limitations

- **Adults only (18+).** Children and adolescents have different requirements and are rejected.
- **Not clinically validated.** Outputs have not yet been compared against manual calculation in a formal study.
- **CKD mode is a simplification.** It applies 0.8 g/kg protein for non-dialysis patients only. It does not account for CKD stage or dialysis, and potassium must be individualised.
- **Values pending confirmation** against the printed ICMR-NIN 2020 tables: 2nd-trimester protein increment, the PAL factors, and vitamin C in lactation.
- **Translations are partial.** Hindi and Telugu reports translate the labels, not every value.
- **Weight-based BMR** can overestimate energy needs in obesity.

## Tech stack

- HTML, CSS and vanilla JavaScript in a single `index.html`
- Tailwind CSS (CDN) and the Inter font (Google Fonts), cached by the service worker for offline use
- Service worker (`sw.js`) and web manifest for PWA install
- Hosted on GitHub Pages

## How to use

1. Open the [live application](https://moulvigufran.github.io/DITE-M1).
2. Enter age, gender, height, weight and activity level. For women, select pregnancy or lactation status if relevant.
3. Tick hypertension or CKD mode if needed, and choose the goal.
4. Click **Calculate Plan** and review the targets.
5. Click **Print Report**, enter the patient and institution name, choose the language, and print or save as PDF.

## Development

There is no build step. Edit `index.html`, open it in a browser, and push to `main` to deploy.

When you change `index.html`, increase the version in `CACHE_NAME` inside `sw.js` (for example `ditem1-cache-v3`) so installed copies pick up the update.

## Sources

- ICMR-NIN Expert Group. *Nutrient Requirements for Indians: Recommended Dietary Allowances and Estimated Average Requirements*, 2020.
- [A Brief Note on Nutrient Requirements for Indians (NIN)](https://www.nin.res.in/rdabook/brief_note.pdf)

## Author

Developed by **Moulvi Gufran**, MBBS student, Government Medical College, Vizianagaram.

## Disclaimer and license

This tool is for education and for use by healthcare professionals. It does not replace independent clinical judgment, and it is not a certified medical device.

Licensed under the MIT License. See the `LICENSE` file for details.
