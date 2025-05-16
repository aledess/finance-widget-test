# Finance Widget – React + TypeScript + Vite

Questo progetto fornisce un setup completo per creare un'app React moderna con Vite, TypeScript, e la possibilità di esportare un Web Component (`<finance-widget>`). È pensato per essere usato in due modalità:

- 🧪 Ambiente di sviluppo (`develop`) → App React + Widget + pagina demo
- 🚀 Ambiente di produzione (`master`) → Solo `widget.js` da embeddare

---

## 📁 Struttura progetto

.
├── public/
│ ├── assets/ # asset pubblici sempre copiati
│ └── demo/ # file solo per sviluppo (es. demo.html)
├── src/ # codice React/Widget
├── vite.config.ts # build app React
├── vite.widget.config.ts # build widget.js
├── package.json
├── .env # default locale
├── .env.stage # usato da Vercel su develop
├── .env.prod # usato da Vercel su master

---

## 🚀 Scripts disponibili

```json
"scripts": {
  "dev": "vite",                               // sviluppo locale
  "preview": "vite preview",                   // anteprima post-build
  "build": "vite build && vite build --config vite.widget.config.ts", // app + widget
  "build:stage": "BUILD_MODE=stage vite build --config vite.widget.config.ts", // per stage app + widget
  "build:prod": "BUILD_MODE=production vite build --config vite.widget.config.ts", // solo widget.js
  "format": "prettier . --write"               // formattazione codice
}
```
