# Firemní fonty

Sem nahrajte soubory fontů ProjectWO s **přesně těmito názvy**:

| Styl | Název souboru |
|------|---------------|
| Bold (nadpisy) | `BrandFont-Bold.woff2` (nebo `.woff` / `.otf` / `.ttf`) |
| Regular (text) | `BrandFont-Regular.woff2` (nebo `.woff` / `.otf` / `.ttf`) |

Stačí jeden formát od každého stylu – `@font-face` ve `style.css` zkouší
woff2 → woff → otf → ttf. Když soubory chybí, aplikace použije systémový
sans-serif a v pravém horním rohu ukáže „Záložní font“.
