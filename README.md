# SnakeKeeper 🐍

Mobile-first tracker za brigu o zmijama. React + Vite + Tailwind + Recharts. Bez backenda — sve se sprema u `localStorage`.

## Značajke

- **Dashboard** s pregledom svih zmija — odmah vidiš kad je svaka zadnji put jela, status sheda i zadnju težinu.
- **Profil zmije** — ime, vrsta, datum nabave, slika (upload + auto resize).
- **Hranjenje** — datum, veličina plijena (S/M/L/XL), tip (smrznuto/živo), pojela/odbila. Upozorenje ako prođe više od 10 dana.
- **Shedding** — početak blue phase i datum sheda. Označavanje nekompletnog sheda.
- **Težina** — unos u gramima + line chart povijesti.
- **Floating action button** za brzi unos.
- **Dark reptilski theme** (tamnozelena + narančasti accent).

## Pokretanje lokalno

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy na Vercel

1. Push repo na GitHub.
2. Importaj projekt na [vercel.com](https://vercel.com).
3. Framework preset: **Vite**. Vercel automatski pokupi `npm run build` i `dist/` folder.
4. `vercel.json` sadrži SPA rewrite za client-side rute.

## Stack

- React 18 + Vite 5
- Tailwind CSS 3
- Recharts 2
- localStorage (key: `snakekeeper.v1`)
