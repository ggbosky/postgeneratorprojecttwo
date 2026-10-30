# ProjectWO – Carousel Generator

Statická webová aplikace (HTML + CSS + Vanilla JS / Canvas) pro tvorbu
carousel postů 1080 × 1350 px (4:5) pro Instagram a LinkedIn.

- 3–5 slajdů: **Hook** → **obsah s mikro-výzvou k interakci** → **povinný promo slajd**
- Živý náhled všech slajdů, automatické zalamování a zmenšování textu
- Export jednotlivých slajdů i celého carouselu (`slide-1.png`, `slide-2.png`, …)
- Texty se průběžně ukládají v prohlížeči (localStorage)
- **Vymysli texty za mě:** knihovna hotových carouselů pro Project Two v `topics.js`
  (21 témat v 6 kategoriích). Nové téma přidáš zkopírováním existujícího bloku.

## Firemní fonty

Fonty jsou ve složce [`fonts/`](fonts/README.md): Inter Tight (nadpisy), Inter
(text) a Instrument Serif Italic (akcent). Slovo v `*hvězdičkách*` se na slajdu
vykreslí akcentovou kurzívou.

## Spuštění

Lokálně stačí jakýkoli statický server (kvůli načítání fontů ne `file://`):

```bash
python3 -m http.server 8000
```

## GitHub Pages

Settings → Pages → *Deploy from a branch* → vyberte větev a složku `/ (root)`.
Žádný build není potřeba.
