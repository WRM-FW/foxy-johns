# Foxy John's — Official Website
**Dingle, County Kerry, Ireland • Est. 1899**

> *"Where A Pint of Stout Meets A Box of Screws"*

An authentic, responsive, mobile-first official website for the legendary **Foxy John's** on Main Street, Dingle, County Kerry, Ireland. Built with clean semantic HTML5, modern CSS3, and lightweight vanilla JavaScript, tailored for instant deployment on **GitHub Pages**.

---

## 📍 About Foxy John's
- **Location:** Main Street, Grove, Dingle (Daingean Uí Chúis), Co. Kerry, Ireland
- **Eircode:** V92 PD6F
- **GPS Coordinates:** 52°08'31.3"N 10°16'09.3"W (`52.1420387, -10.2692451`)
- **Telephone:** [+353 66 915 1316](tel:+353669151316)
- **Google Maps:** [Foxy John's on Google Maps](https://www.google.com/maps/place/Foxy+John's/@52.1420387,-10.27182,17z/data=!3m1!4b1!4m6!3m5!1s0x484ffbc6a20a3047:0x2a60f3acef66c4a0!8m2!3d52.1420387!4d-10.2692451!16s%2Fg%2F1q62dzmf7)
- **Instagram:** [@foxy_johns](https://www.instagram.com/foxy_johns/)
- **Facebook:** [Foxy John's Facebook Page](https://www.facebook.com/Foxy-Johns-162255635562/)
- **Rating:** 4.7 / 5.0 (1,280+ verified Google reviews)

---

## 🛠️ Verified Operating Features & Policy Disclosures
1. **The Dual Identity:** Operating since 1899 as both a working hardware shop and traditional Irish pub, alongside a heritage bicycle rental depot for touring the Slea Head Drive.
2. **Dining & Ordering Policy:** Foxy John's is a **counter-service wet pub and hardware shop**. It does **NOT** offer online food ordering, table reservations, takeout delivery, or a restaurant kitchen. All drinks, merchandise, and bicycles are handled on a welcoming first-come, first-served walk-in basis.
3. **Live Status Engine:** Features an automatic, timezone-aware JavaScript checker calculating current opening status against Irish Standard Time (`Europe/Dublin`):
   - **Mon – Thu:** 10:30 AM – 11:30 PM (10:30 – 23:30)
   - **Fri – Sat:** 10:30 AM – 12:30 AM (10:30 – 00:30)
   - **Sun:** 12:00 PM – 11:30 PM (12:00 – 23:30)
4. **Dog Policy:** Dogs are warmly permitted inside the pub and in the outdoor courtyard.
5. **Accessibility:** Wheelchair accessible street entrance and accessible restroom onsite.
6. **Payment Methods:** Credit cards, debit cards, NFC mobile contactless payments, and cash accepted.

---

## 📂 Project Structure
```text
foxy-johns/
├── index.html              # Main semantic HTML5 single-page application
├── css/
│   └── styles.css          # Mobile-first responsive stylesheet with CSS custom properties
├── js/
│   └── main.js             # Live hours engine, mobile drawer, tabs, lightbox, fallbacks
├── assets/
│   ├── images/
│   │   ├── logo.svg        # Circular Foxy John's emblem with crossed spanner & pint
│   │   ├── storefront.svg  # Vector illustration of the green & white heritage facade
│   │   ├── pint-stout.svg  # Creamy Irish stout with shamrock head
│   │   ├── hardware.svg    # Workshop shelves, vintage tools, and nails by weight
│   │   ├── trad-session.svg# Traditional Irish fiddle, bodhrán, and tin whistle
│   │   ├── bicycle.svg     # Touring bicycle on Slea Head Drive coastal route
│   │   ├── snug-hearth.svg # The cozy private snug and roaring peat/turf fireplace
│   │   └── favicon.svg     # Vector favicon for browser tabs and mobile bookmarks
│   └── icons/              # Supporting iconography
├── .nojekyll               # Disables Jekyll processing on GitHub Pages
└── README.md               # Documentation and deployment instructions
```

---

## 🚀 GitHub Pages Deployment Guide

Deploying this site to GitHub Pages is fast and straightforward:

### Method 1: Deploying via GitHub Web Interface
1. Unzip `foxy-johns-website.zip`.
2. Create a new GitHub repository (e.g. `foxy-johns` or `<your-username>.github.io`).
3. Push or drag-and-drop the contents of `foxy-johns/` directly into the repository root.
4. In your GitHub repository, navigate to **Settings** &rarr; **Pages**.
5. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`.
   - **Branch:** Select `main` (or `master`), and set the folder to `/ (root)`.
   - Click **Save**.
6. Within 1–2 minutes, your website will be live at:
   `https://<your-username>.github.io/foxy-johns/` (or your custom domain).

### Method 2: Deploying via Git CLI
```bash
# Inside the extracted project folder
git init
git add .
git commit -m "Initial commit: Foxy John's official website"
git branch -M main
git remote add origin https://github.com/<your-username>/foxy-johns.git
git push -u origin main
```
Then enable GitHub Pages under **Repository Settings &rarr; Pages &rarr; main branch**.

---

## 📱 Mobile-First Quality & Browser Compatibility
- **Touch Ergonomics:** Generous touch targets (min 44×44px, standard 48px), sticky mobile quick-action bar for immediate phone calling, navigation directions, and live status.
- **Responsive Layout:** Tested seamlessly across 375px (iPhone SE), 390px (iPhone 14/15), 412px (Android), 768px (iPad), and 1200px+ (Desktop).
- **Zero Horizontal Overflow:** Strict `box-sizing: border-box` and fluid container constraints.
- **Resilient Media:** External photography is supplemented by bespoke, high-resolution SVG vector fallbacks to guarantee crisp rendering in any network environment.
