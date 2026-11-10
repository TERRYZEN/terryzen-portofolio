# Terry Sen — Portfolio Website

A personal portfolio built with **HTML · CSS · JavaScript**  
Design: Blue Gradient · White · Glassmorphism · Smooth Animations

---

## 📁 Folder Structure

```
TERRY PORTOFOLIO WEB/
│
├── index.html          ← Main webpage
├── style.css           ← All styles (glassmorphism, animations, responsive)
├── script.js           ← Interactivity (navbar, filter, lightbox, animations)
│
└── assets/
    ├── images/         ← Profile photo (profile.jpg)
    ├── logos/          ← Software/tool logos
    ├── projects/       ← Project screenshots or design images
    └── certificates/   ← Certificate images
```

---

## 🖼️ How to Add Assets

### Profile Photo
1. Put your photo in `assets/images/`  
2. Name it `profile.jpg` (or change the filename in `index.html`)  
3. In `index.html`, find the `about-avatar` section and uncomment the `<img>` tag

### Software Logos
Place logos in `assets/logos/` with these filenames:

| File name         | Tool            |
|-------------------|-----------------|
| `canva.png`       | Canva           |
| `capcut.png`      | CapCut          |
| `affinity.png`    | Affinity        |
| `lightroom.png`   | Adobe Lightroom |
| `snapseed.png`    | Snapseed        |
| `picsart.png`     | PicsArt         |
| `vscode.png`      | VS Code         |

> Supported formats: `.png`, `.jpg`, `.svg`, `.webp`  
> If a logo file is missing, a fallback icon shows automatically.

### Projects
1. Add project images to `assets/projects/`
2. In `index.html`, find the `#projects` section
3. Copy any `.project-card` block and update:
   - `src="assets/projects/YOUR-IMAGE.jpg"`
   - `data-category="design"` → options: `design`, `photo`, `web`, `video`
   - `<h3>` title, `<p>` description, and `.tag` badges

### Certificates
1. Add certificate images to `assets/certificates/`
2. In `index.html`, find the `#album` section
3. Copy any `.cert-card` block and update:
   - `src="assets/certificates/YOUR-CERT.jpg"`
   - `<h4>` title and `<p>` issuer + year

---

## ✏️ Personalizing the Site

Search for `✏️` comments in `index.html` and `script.js` for quick-edit spots:

- **Name / Bio** → About section
- **Education & Work** → Timeline items in About
- **Social links** → Replace `href="#"` with your real URLs
- **Email** → Replace `your@email.com` throughout
- **Skill percentages** → `data-width="90"` on `.skill-bar-fill` elements

---

## 🚀 Opening the Site

Just double-click `index.html` — no server needed!

Or use VS Code's **Live Server** extension for auto-refresh while editing.
