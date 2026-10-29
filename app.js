/* =========================================================
   ProjectWO – Carousel Generator
   Vanilla JS + Canvas, bez buildu a závislostí.
   ========================================================= */
(() => {
  'use strict';

  // ---------- Konstanty ----------
  const W = 1080;
  const H = 1350;
  const M = 96; // okraj
  const MIN_SLIDES = 3;
  const MAX_SLIDES = 5;
  const STORAGE_KEY = 'projectwo-carousel-v1';

  const FALLBACK = '"Helvetica Neue", "Segoe UI", Roboto, Arial, sans-serif';
  const FONT_BOLD = `"BrandFont-Bold", ${FALLBACK}`;
  const FONT_REGULAR = `"BrandFont-Regular", ${FALLBACK}`;
  const FONT_ACCENT = '"BrandFont-Accent", Georgia, "Times New Roman", serif';
  const ACCENT_SCALE = 1.12; // Instrument Serif má menší x-výšku než Inter

  const C = {
    text: '#F5F5F7',
    white: '#FFFFFF',
    body: '#C7C7CC',
    muted: '#8E8E93',
    line: '#262626',
    lineStrong: '#3A3A3A',
    card: '#1A1A1A',
    ember: '#FF672A', // akcentová barva z projectwo.com
    dot: '#3A3A3A',
  };

  const CTA_TYPES = {
    comment: { label: 'Komentář', tag: 'Napiš do komentářů' },
    save: { label: 'Uložení', tag: 'Ulož si to' },
    share: { label: 'Sdílení', tag: 'Pošli to dál' },
    question: { label: 'Otázka', tag: 'Otázka pro tebe' },
  };

  const PROMO_TEMPLATES = {
    follow: {
      label: 'Sledování',
      title: 'Dobrý web nemusí být *drahý* ani složitý.',
      body: 'Navrhneme ho, postavíme a postaráme se o něj. Online do tří týdnů.',
      cta: 'Sleduj nás pro další tipy, jak z webu udělat obchodníka, který maká 24/7.',
    },
    comment: {
      label: 'Slovo do komentáře',
      title: 'Chceš vědět, co *brzdí* tvůj web?',
      body: 'Pošleme ti zdarma krátkou analýzu s konkrétními doporučeními.',
      cta: 'Napiš *WEB* do komentáře a ozveme se ti.',
    },
    save: {
      label: 'Uložení',
      title: 'Ulož si to *na později.*',
      body: 'Až budeš řešit nový web nebo redesign, tenhle checklist se ti bude hodit.',
      cta: 'Ulož si post a pošli ho někomu, kdo právě řeší web.',
    },
  };

  const DEFAULT_STATE = {
    count: 5,
    bg: '#0D0D0D',
    brand: {
      name: 'Project Two',
      website: 'projectwo.com',
      instagram: '@projectwo',
    },
    hook: {
      title: 'Tvůj web *ztrácí* zákazníky. Tady je proč.',
      subtitle: 'Chyby, které u malých firem vidíme nejčastěji – a jak je opravit.',
      swipe: 'Swipe',
    },
    content: [
      {
        title: 'Načítá se déle než 3 sekundy',
        body: 'Víc než polovina lidí odejde, když se stránka načítá moc dlouho. Zmenši obrázky, zbav se zbytečných pluginů a vyber rychlý hosting.',
        ctaType: 'question',
        cta: 'Za kolik sekund se načte ten tvůj? Napiš to do komentářů.',
      },
      {
        title: 'Na mobilu se nedá používat',
        body: 'Většina návštěv dnes přichází z telefonu. Malé písmo, rozbité menu a tlačítka, na která nejde trefit prstem, posílají zákazníky ke konkurenci.',
        ctaType: 'save',
        cta: 'Ulož si tento slajd a projdi svůj web na mobilu.',
      },
      {
        title: 'Chybí jasná *výzva k akci*',
        body: 'Návštěvník musí do pár vteřin vědět, co má udělat: zavolat, objednat, napsat. Jedno výrazné tlačítko udělá víc než deset odstavců textu.',
        ctaType: 'comment',
        cta: 'Který bod je tvůj favorite? 1, 2, nebo 3?',
      },
    ],
    promo: {
      template: 'comment',
      ...pickTemplate('comment'),
      follow: 'Nezapomeň nás sledovat pro více obsahu',
    },
  };

  function pickTemplate(key) {
    const { title, body, cta } = PROMO_TEMPLATES[key];
    return { title, body, cta };
  }

  // ---------- Stav ----------
  let state = loadState();
  let logoImage = null;

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function loadState() {
    const base = clone(DEFAULT_STATE);
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved) return base;
      return {
        ...base,
        ...saved,
        brand: migrateBrand({ ...base.brand, ...saved.brand }),
        hook: { ...base.hook, ...saved.hook },
        content: base.content.map((c, i) => ({ ...c, ...(saved.content || [])[i] })),
        promo: migratePromo({ ...base.promo, ...saved.promo }),
        count: clampCount(saved.count),
      };
    } catch (e) {
      return base;
    }
  }

  /** Starý výchozí název „ProjectWO“ → název z loga. */
  function migrateBrand(brand) {
    if (brand.name === 'ProjectWO') brand.name = 'Project Two';
    return brand;
  }

  /** Dřív bylo slovo do komentáře zvlášť (oranžová pilulka) → teď *akcent* přímo ve výzvě. */
  function migratePromo(promo) {
    const kw = (promo.keyword || '').trim();
    delete promo.keyword;
    if (!kw || (promo.cta || '').includes(`*${kw}*`)) return promo;
    const cta = promo.cta || '';
    promo.cta = cta.includes('to slovo')
      ? cta.replace('to slovo', `*${kw}*`)
      : `Napiš *${kw}* do komentáře. ${cta}`.trim();
    return promo;
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* privátní okno / plné úložiště – nevadí */ }
  }

  function clampCount(n) {
    const v = parseInt(n, 10);
    if (Number.isNaN(v)) return MAX_SLIDES;
    return Math.min(MAX_SLIDES, Math.max(MIN_SLIDES, v));
  }

  function getPath(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  }

  function setPath(obj, path, value) {
    const keys = path.split('.');
    const last = keys.pop();
    const target = keys.reduce((o, k) => o[k], obj);
    target[last] = value;
  }

  /** Sestaví pole slajdů podle aktuálního počtu: hook → obsah → promo. */
  function buildSlides() {
    const contentCount = state.count - 2;
    const slides = [{ type: 'hook', data: state.hook }];
    for (let i = 0; i < contentCount; i++) {
      slides.push({ type: 'content', data: state.content[i], contentIndex: i, contentCount });
    }
    slides.push({ type: 'promo', data: state.promo });
    return slides;
  }

  // =========================================================
  //  TEXT – zalamování a typografie
  // =========================================================

  /** Pevná mezera po jednopísmenných předložkách/spojkách (česká typografie). */
  function czechNbsp(text) {
    const re = /(^|[\s(„"])([ksvzouaiKSVZOUAI]) +/g;
    // Dvakrát kvůli sousedním předložkám („a v lese“).
    return String(text || '')
      .replace(re, '$1$2\u00A0')
      .replace(re, '$1$2\u00A0')
      .replace(/(\d) +(?=\p{L})/gu, '$1\u00A0'); // „3 sekundy“ na jednom řádku
  }

  function font(family, size) {
    const px = `${Math.round(size)}px`;
    if (family === 'accent') return `italic 400 ${px} ${FONT_ACCENT}`;
    return family === 'bold' ? `700 ${px} ${FONT_BOLD}` : `400 ${px} ${FONT_REGULAR}`;
  }

  function setTracking(ctx, px) {
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${px}px`;
  }

  /** Fonty pro jeden textový blok: základní řez + akcentová kurzíva. */
  function makeFonts(family, size) {
    return { base: font(family, size), accent: font('accent', size * ACCENT_SCALE) };
  }

  /** Rozdělí odstavec na úseky; text v *hvězdičkách* je akcent (Instrument Serif Italic). */
  function parseRuns(para) {
    const runs = [];
    let last = 0;
    para.replace(/\*([^*]+)\*/g, (match, inner, idx) => {
      if (idx > last) runs.push({ text: para.slice(last, idx), accent: false });
      runs.push({ text: inner, accent: true });
      last = idx + match.length;
      return match;
    });
    if (last < para.length) runs.push({ text: para.slice(last), accent: false });
    return runs;
  }

  /** Úseky → slova. Slovo je pole částí, láme se jen na běžné mezeře. */
  function toWords(runs) {
    const words = [];
    let current = [];
    runs.forEach(({ text, accent }) => {
      text.split(/( +)/).forEach((piece) => {
        if (!piece) return;
        if (piece.trim() === '' && piece.includes(' ')) {
          if (current.length) words.push(current);
          current = [];
        } else {
          current.push({ text: piece, accent });
        }
      });
    });
    if (current.length) words.push(current);
    return words;
  }

  function partWidth(ctx, fonts, part) {
    ctx.font = part.accent ? fonts.accent : fonts.base;
    return ctx.measureText(part.text).width;
  }

  function wordWidth(ctx, fonts, word) {
    return word.reduce((w, part) => w + partWidth(ctx, fonts, part), 0);
  }

  /** Slovo delší než řádek rozdělí po znacích na kusy, které se vejdou. */
  function splitLongWord(ctx, fonts, word, maxWidth) {
    const chunks = [];
    let chunk = [];
    let w = 0;
    for (const part of word) {
      for (const ch of part.text) {
        const cw = partWidth(ctx, fonts, { text: ch, accent: part.accent });
        if (w + cw > maxWidth && chunk.length) {
          chunks.push(chunk);
          chunk = [];
          w = 0;
        }
        const prev = chunk[chunk.length - 1];
        if (prev && prev.accent === part.accent) prev.text += ch;
        else chunk.push({ text: ch, accent: part.accent });
        w += cw;
      }
    }
    if (chunk.length) chunks.push(chunk);
    return chunks;
  }

  /**
   * Zalomí text do řádků podle maxWidth.
   * Respektuje ručně zadané nové řádky, *akcentová* slova a dlouhá slova láme po znacích.
   * Vrací { lines: [{ words, width }], space }.
   */
  function wrapText(ctx, text, maxWidth, fonts) {
    const lines = [];
    ctx.font = fonts.base;
    const space = ctx.measureText(' ').width;

    for (const para of czechNbsp(text).split(/\r?\n/)) {
      const words = toWords(parseRuns(para));
      if (!words.length) {
        lines.push({ words: [], width: 0 });
        continue;
      }
      let line = { words: [], width: 0 };
      const pushWord = (word, w) => {
        line.width += (line.words.length ? space : 0) + w;
        line.words.push(word);
      };

      for (const word of words) {
        const w = wordWidth(ctx, fonts, word);
        const needed = line.words.length ? line.width + space + w : w;
        if (needed <= maxWidth) {
          pushWord(word, w);
          continue;
        }
        if (line.words.length) lines.push(line);
        line = { words: [], width: 0 };
        if (w > maxWidth) {
          const chunks = splitLongWord(ctx, fonts, word, maxWidth);
          const tail = chunks.pop();
          chunks.forEach((c) => lines.push({ words: [c], width: wordWidth(ctx, fonts, c) }));
          pushWord(tail, wordWidth(ctx, fonts, tail));
        } else {
          pushWord(word, w);
        }
      }
      if (line.words.length) lines.push(line);
    }
    return { lines, space };
  }

  function drawLine(ctx, fonts, line, space, x, y, align, color) {
    let cx = x;
    if (align === 'center') cx = x - line.width / 2;
    else if (align === 'right') cx = x - line.width;
    ctx.textAlign = 'left';
    line.words.forEach((word, i) => {
      if (i) cx += space;
      word.forEach((part) => {
        ctx.font = part.accent ? fonts.accent : fonts.base;
        ctx.fillStyle = part.accent ? C.ember : color;
        ctx.fillText(part.text, cx, y);
        cx += ctx.measureText(part.text).width;
      });
    });
  }

  // =========================================================
  //  LAYOUT – bloky s automatickým zmenšením, aby se vše vešlo
  // =========================================================

  /** Textový blok: změří a vrátí výšku + funkci pro vykreslení. */
  function textBlock(ctx, opts) {
    const {
      text, family = 'regular', size, color = C.text, maxWidth = W - 2 * M,
      lineHeight = 1.3, align = 'left', x = M, tracking = 0, uppercase = false,
    } = opts;
    const content = uppercase ? String(text || '').toUpperCase() : text;
    const fonts = makeFonts(family, size);
    setTracking(ctx, tracking);
    const { lines, space } = wrapText(ctx, content, maxWidth, fonts);
    // Účaří tak, aby verzálky ležely opticky uprostřed řádku (i při mixu fontů).
    ctx.font = fonts.base;
    const capHalf = (ctx.measureText('H').actualBoundingBoxAscent || size * 0.72) / 2;
    setTracking(ctx, 0);
    const lh = size * lineHeight;
    return {
      h: lines.length * lh,
      draw(y) {
        setTracking(ctx, tracking);
        ctx.fillStyle = color;
        ctx.textBaseline = 'alphabetic';
        lines.forEach((ln, i) => drawLine(ctx, fonts, ln, space, x, y + lh * i + lh / 2 + capHalf, align, color));
        setTracking(ctx, 0);
      },
    };
  }

  function spacer(h) {
    return { h, draw() {} };
  }

  /**
   * Zkouší zmenšovat měřítko, dokud se bloky nevejdou mezi top a bottom.
   * build(scale) vrací pole bloků. anchor: 0 = nahoru, 0.5 = na střed, 1 = dolů.
   */
  function layoutFit(build, top, bottom, anchor = 0) {
    const avail = bottom - top;
    let blocks = [];
    let total = 0;
    for (let s = 1; s >= 0.5; s -= 0.03) {
      blocks = build(s);
      total = blocks.reduce((sum, b) => sum + b.h, 0);
      if (total <= avail) break;
    }
    let y = top + Math.max(0, (avail - total) * anchor);
    for (const b of blocks) {
      b.draw(y);
      y += b.h;
    }
  }

  // =========================================================
  //  KRESLÍCÍ PRIMITIVA
  // =========================================================

  function roundRectPath(ctx, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.lineTo(x + w - rr, y);
    ctx.arcTo(x + w, y, x + w, y + rr, rr);
    ctx.lineTo(x + w, y + h - rr);
    ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr);
    ctx.lineTo(x + rr, y + h);
    ctx.arcTo(x, y + h, x, y + h - rr, rr);
    ctx.lineTo(x, y + rr);
    ctx.arcTo(x, y, x + rr, y, rr);
    ctx.closePath();
  }

  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  /** Jednoduché liniové ikony kreslené přímo na Canvas (nezávislé na emoji/fontech). */
  function drawIcon(ctx, type, cx, cy, size, color) {
    const s = size / 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(2, size * 0.085);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    switch (type) {
      case 'comment': {
        roundRectPath(ctx, -s * 0.9, -s * 0.78, s * 1.8, s * 1.3, s * 0.42);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-s * 0.42, s * 0.52);
        ctx.lineTo(-s * 0.6, s * 0.92);
        ctx.lineTo(-s * 0.02, s * 0.52);
        ctx.stroke();
        break;
      }
      case 'save': {
        ctx.beginPath();
        ctx.moveTo(-s * 0.6, -s * 0.85);
        ctx.lineTo(s * 0.6, -s * 0.85);
        ctx.lineTo(s * 0.6, s * 0.9);
        ctx.lineTo(0, s * 0.42);
        ctx.lineTo(-s * 0.6, s * 0.9);
        ctx.closePath();
        ctx.stroke();
        break;
      }
      case 'share': {
        ctx.beginPath();
        ctx.moveTo(-s * 0.9, -s * 0.15);
        ctx.lineTo(s * 0.9, -s * 0.85);
        ctx.lineTo(s * 0.25, s * 0.9);
        ctx.lineTo(-s * 0.05, s * 0.1);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-s * 0.05, s * 0.1);
        ctx.lineTo(s * 0.9, -s * 0.85);
        ctx.stroke();
        break;
      }
      case 'question': {
        ctx.beginPath();
        ctx.arc(0, -s * 0.35, s * 0.42, Math.PI * 1.05, Math.PI * 2.25);
        ctx.quadraticCurveTo(0, s * 0.05, 0, s * 0.35);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, s * 0.78, ctx.lineWidth * 0.75, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'arrow': {
        ctx.beginPath();
        ctx.moveTo(-s * 0.8, 0);
        ctx.lineTo(s * 0.8, 0);
        ctx.moveTo(s * 0.25, -s * 0.55);
        ctx.lineTo(s * 0.8, 0);
        ctx.lineTo(s * 0.25, s * 0.55);
        ctx.stroke();
        break;
      }
      default:
        break;
    }
    ctx.restore();
  }

  // ---------- Společné prvky všech slajdů ----------

  function drawBackground(ctx) {
    ctx.fillStyle = state.bg;
    ctx.fillRect(0, 0, W, H);

    const glow = ctx.createRadialGradient(W * 0.9, H * 0.02, 0, W * 0.9, H * 0.02, W * 0.85);
    glow.addColorStop(0, 'rgba(255,103,42,0.20)');
    glow.addColorStop(0.45, 'rgba(255,103,42,0.07)');
    glow.addColorStop(1, 'rgba(255,103,42,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    const low = ctx.createRadialGradient(0, H, 0, 0, H, W * 0.9);
    low.addColorStop(0, 'rgba(255,255,255,0.035)');
    low.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = low;
    ctx.fillRect(0, 0, W, H);
  }

  // Značka Project Two – stejná SVG cesta jako v hlavičce projectwo.com (viewBox 20 60 758 768).
  const LOGO_MARK = { path: 'M222 60H630L778 205V378L20 828V605L625 258H22Z M400 632H778V828H82Z', x: 20, y: 60, w: 758, h: 768, color: '#FF590E' };
  let logoMarkPath = null;

  /**
   * Logo: oranžová značka + název písmem Inter Tight (jako na webu).
   * Když je nahrané vlastní logo, použije se místo toho obrázek.
   * Vrací { w, h, draw(x, cy) } – x je levý okraj, cy svislý střed.
   */
  function brandLogo(ctx, size) {
    if (logoImage) {
      const h = size * 1.6;
      const w = (logoImage.width / logoImage.height) * h;
      return { w, h, draw: (x, cy) => ctx.drawImage(logoImage, x, cy - h / 2, w, h) };
    }
    if (!logoMarkPath) logoMarkPath = new Path2D(LOGO_MARK.path);
    const markH = size * 1.15;
    const markW = markH * (LOGO_MARK.w / LOGO_MARK.h);
    const gap = size * 0.5;
    const name = state.brand.name || '';
    const tracking = -size * 0.02;
    ctx.font = font('bold', size);
    setTracking(ctx, tracking);
    const tw = name ? ctx.measureText(name).width : 0;
    const capH = ctx.measureText('H').actualBoundingBoxAscent || size * 0.72;
    setTracking(ctx, 0);
    return {
      w: markW + (name ? gap + tw : 0),
      h: markH,
      draw(x, cy) {
        ctx.save();
        ctx.translate(x, cy - markH / 2);
        ctx.scale(markH / LOGO_MARK.h, markH / LOGO_MARK.h);
        ctx.translate(-LOGO_MARK.x, -LOGO_MARK.y);
        ctx.fillStyle = LOGO_MARK.color;
        ctx.fill(logoMarkPath);
        ctx.restore();
        if (!name) return;
        ctx.font = font('bold', size);
        setTracking(ctx, tracking);
        ctx.fillStyle = C.white;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(name, x + markW + gap, cy + capH / 2);
        setTracking(ctx, 0);
      },
    };
  }

  // Tečky jsou na všech slajdech na stejném místě – při swipu „neskáčou“.
  const DOTS_Y = H - 98;

  /** Tečkový indikátor: jedna tečka na slajd, aktuální je oranžová (ember) a větší. */
  function drawDots(ctx, idx, n) {
    const gap = 30;
    const startX = W / 2 - (gap * (n - 1)) / 2;
    for (let i = 0; i < n; i++) {
      const active = i === idx;
      ctx.fillStyle = active ? C.ember : C.dot;
      ctx.beginPath();
      ctx.arc(startX + i * gap, DOTS_Y, active ? 8 : 5.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /** Logo vlevo nahoře. */
  function drawHeader(ctx) {
    brandLogo(ctx, 34).draw(M, 112);
  }

  function drawDivider(ctx, y) {
    ctx.fillStyle = C.line;
    ctx.fillRect(M, y, W - 2 * M, 2);
  }

  /** Spodní lišta: handle vlevo, tečky uprostřed, indikátor posunu vpravo. */
  function drawFooter(ctx, rightKind, idx, n) {
    const y = DOTS_Y;
    drawDivider(ctx, H - 160);
    drawDots(ctx, idx, n);

    ctx.font = font('regular', 26);
    ctx.fillStyle = C.muted;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(state.brand.instagram || state.brand.website, M, y);

    if (rightKind === 'hook') {
      // Titulní slajd: výraznější "Swipe →" (bílý text, oranžová šipka), bez rámečku
      ctx.font = font('bold', 28);
      ctx.fillStyle = C.white;
      ctx.textAlign = 'right';
      ctx.fillText(state.hook.swipe || 'Swipe', W - M - 56, y);
      drawIcon(ctx, 'arrow', W - M - 17, y, 34, C.ember);
    } else if (rightKind === 'subtle') {
      // Jemná připomínka, že pokračuje další slajd
      ctx.font = font('regular', 26);
      ctx.fillStyle = C.muted;
      ctx.textAlign = 'right';
      ctx.fillText(state.hook.swipe || 'Swipe', W - M - 52, y);
      drawIcon(ctx, 'arrow', W - M - 16, y, 30, C.muted);
    } else if (rightKind === 'site' && state.brand.website) {
      // Poslední slajd: odkaz na web
      ctx.font = font('regular', 26);
      ctx.fillStyle = C.muted;
      ctx.textAlign = 'right';
      ctx.fillText(state.brand.website, W - M, y);
    }
  }

  // =========================================================
  //  SLAJDY
  // =========================================================

  function drawHookSlide(ctx, slide, idx, n) {
    const d = slide.data;

    // Dekorativní soustředné kruhy (jemný prémiový detail)
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 2;
    [260, 380, 500].forEach((r) => {
      ctx.beginPath();
      ctx.arc(W - 40, 300, r, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.restore();

    drawHeader(ctx);

    layoutFit((s) => {
      const blocks = [];
      blocks.push(textBlock(ctx, {
        text: d.title, family: 'bold', size: 116 * s, color: C.white, lineHeight: 1.04, tracking: -1,
      }));
      if (d.subtitle) {
        blocks.push(spacer(40 * s));
        blocks.push(textBlock(ctx, {
          text: d.subtitle, size: 40 * s, color: '#A1A1A6', lineHeight: 1.38, maxWidth: 840,
        }));
      }
      return blocks;
    }, 230, H - 220, 0.62);

    drawFooter(ctx, 'hook', idx, n);
  }

  /** Karta s mikro-výzvou k interakci; vrací svou výšku. */
  function interactionCard(ctx, type, text, bottomY) {
    const meta = CTA_TYPES[type] || CTA_TYPES.comment;
    const padX = 44;
    const padY = 40;
    const iconBox = 84;
    const textX = M + padX + iconBox + 32;
    const textW = W - M - padX - textX;

    const tag = textBlock(ctx, {
      text: meta.tag, size: 22, color: C.muted, tracking: 3, uppercase: true, x: textX, maxWidth: textW,
    });
    const body = textBlock(ctx, {
      text, family: 'bold', size: 36, color: C.white, lineHeight: 1.28, x: textX, maxWidth: textW,
    });
    const innerH = Math.max(iconBox, tag.h + 10 + body.h);
    const cardH = innerH + padY * 2;
    const top = bottomY - cardH;

    ctx.fillStyle = C.card;
    roundRectPath(ctx, M, top, W - 2 * M, cardH, 32);
    ctx.fill();
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 2;
    ctx.stroke();

    const iconCy = top + padY + iconBox / 2;
    ctx.fillStyle = C.ember;
    ctx.beginPath();
    ctx.arc(M + padX + iconBox / 2, iconCy, iconBox / 2, 0, Math.PI * 2);
    ctx.fill();
    drawIcon(ctx, type, M + padX + iconBox / 2, iconCy, 38, '#0D0D0D');

    const textTop = top + padY + (innerH - (tag.h + 10 + body.h)) / 2;
    tag.draw(textTop);
    body.draw(textTop + tag.h + 10);

    return cardH;
  }

  function drawContentSlide(ctx, slide, idx, n) {
    const d = slide.data;

    // Velké číslo slajdu jako vodoznak
    ctx.save();
    ctx.font = font('bold', 420);
    ctx.fillStyle = 'rgba(255,255,255,0.035)';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(pad2(slide.contentIndex + 1), W - M + 30, 560);
    ctx.restore();

    drawHeader(ctx);

    const bottom = H - 210;
    const cardH = d.cta && d.cta.trim() ? interactionCard(ctx, d.ctaType, d.cta, bottom) : 0;
    const contentBottom = cardH ? bottom - cardH - 56 : bottom;

    layoutFit((s) => {
      const blocks = [
        textBlock(ctx, {
          text: d.title, family: 'bold', size: 84 * s, color: C.white, lineHeight: 1.08, tracking: -0.5,
        }),
      ];
      if (d.body) {
        blocks.push(spacer(36 * s));
        blocks.push(textBlock(ctx, {
          text: d.body, size: 40 * s, color: C.body, lineHeight: 1.42,
        }));
      }
      return blocks;
    }, 250, contentBottom, 0);

    drawFooter(ctx, 'subtle', idx, n);
  }

  /**
   * Promo slajd – stejný rukopis jako ostatní slajdy: logo nahoře,
   * velká pointa, jedna jasná výzva a výzva ke sledování. Žádné rámečky navíc.
   */
  function drawPromoSlide(ctx, slide, idx, n) {
    const d = slide.data;

    drawHeader(ctx);

    layoutFit((s) => {
      const blocks = [];
      if (d.title) {
        blocks.push(textBlock(ctx, {
          text: d.title, family: 'bold', size: 100 * s, color: C.white, lineHeight: 1.05, tracking: -1,
        }));
      }
      if (d.body) {
        blocks.push(spacer(36 * s));
        blocks.push(textBlock(ctx, {
          text: d.body, size: 40 * s, color: '#A1A1A6', lineHeight: 1.38, maxWidth: 840,
        }));
      }
      if (d.cta) {
        blocks.push(spacer(64 * s));
        blocks.push(textBlock(ctx, {
          text: d.cta, family: 'bold', size: 42 * s, color: C.white, lineHeight: 1.22, tracking: -0.5,
        }));
      }
      if (d.follow) {
        blocks.push(spacer(40 * s));
        blocks.push(textBlock(ctx, {
          text: d.follow, size: 30 * s, color: C.muted, lineHeight: 1.3,
        }));
      }
      return blocks;
    }, 230, H - 220, 0.62);

    drawFooter(ctx, 'site', idx, n);
  }

  function renderSlide(canvas, slide, idx, n) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);
    drawBackground(ctx);
    if (slide.type === 'hook') drawHookSlide(ctx, slide, idx, n);
    else if (slide.type === 'content') drawContentSlide(ctx, slide, idx, n);
    else drawPromoSlide(ctx, slide, idx, n);
  }

  // =========================================================
  //  UI – formuláře
  // =========================================================

  const $ = (sel) => document.querySelector(sel);
  const editorsEl = $('#slideEditors');
  const previewEl = $('#previewStrip');
  const previewTpl = $('#previewItemTpl');

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else node.setAttribute(k, v);
    });
    children.forEach((c) => c && node.appendChild(c));
    return node;
  }

  function fieldInput({ path, label, type = 'text', rows = 2, hint, options, maxlength }) {
    const id = `f-${path.replace(/\./g, '-')}`;
    let input;
    if (type === 'textarea') {
      input = el('textarea', { id, rows: String(rows), 'data-path': path });
    } else if (type === 'select') {
      input = el('select', { id, 'data-path': path });
      Object.entries(options).forEach(([value, text]) => input.appendChild(el('option', { value, text })));
    } else {
      input = el('input', { id, type: 'text', 'data-path': path });
    }
    if (maxlength) input.setAttribute('maxlength', String(maxlength));
    input.value = getPath(state, path) ?? '';

    return el('div', { class: 'field' }, [
      el('label', { class: 'label', for: id, text: label }),
      input,
      hint ? el('p', { class: 'hint', text: hint }) : null,
    ]);
  }

  function editorCard(num, typeLabel, fields, extraClass = '') {
    const card = el('article', { class: `slide-editor ${extraClass}` }, [
      el('header', { class: 'slide-editor__head' }, [
        el('h3', {}, [
          el('span', { class: 'slide-editor__num', text: `Slajd ${num}` }),
        ]),
        el('span', { class: 'slide-editor__type', text: typeLabel }),
      ]),
    ]);
    fields.forEach((f) => card.appendChild(fieldInput(f)));
    return card;
  }

  function buildEditors() {
    editorsEl.innerHTML = '';
    const slides = buildSlides();
    const ctaOptions = Object.fromEntries(Object.entries(CTA_TYPES).map(([k, v]) => [k, v.label]));
    const templateOptions = {
      ...Object.fromEntries(Object.entries(PROMO_TEMPLATES).map(([k, v]) => [k, v.label])),
      custom: 'Vlastní',
    };

    slides.forEach((slide, i) => {
      const num = i + 1;
      if (slide.type === 'hook') {
        editorsEl.appendChild(editorCard(num, 'Hook / titulní', [
          { path: 'hook.title', label: 'Nadpis (hook)', type: 'textarea', rows: 3, hint: 'Krátce a zvědavě – ideálně do 8 slov. *Slovo v hvězdičkách* = akcentová kurzíva.' },
          { path: 'hook.subtitle', label: 'Podnadpis', type: 'textarea', rows: 2 },
          { path: 'hook.swipe', label: 'Indikátor posunu', maxlength: 20 },
        ]));
      } else if (slide.type === 'content') {
        const c = slide.contentIndex;
        editorsEl.appendChild(editorCard(num, `Obsah ${c + 1}`, [
          { path: `content.${c}.title`, label: 'Nadpis', type: 'textarea', rows: 2, hint: 'Tip: *slovo* v hvězdičkách se vykreslí kurzívou Instrument Serif.' },
          { path: `content.${c}.body`, label: 'Hlavní text', type: 'textarea', rows: 4 },
          { path: `content.${c}.ctaType`, label: 'Typ mikro-výzvy', type: 'select', options: ctaOptions },
          { path: `content.${c}.cta`, label: 'Výzva k interakci (volitelná)', type: 'textarea', rows: 2, hint: 'Otázka nebo výzva zvyšuje komentáře a uložení.' },
        ]));
      } else {
        editorsEl.appendChild(editorCard(num, 'Promo & CTA (povinný)', [
          { path: 'promo.template', label: 'Šablona', type: 'select', options: templateOptions },
          { path: 'promo.title', label: 'Pointa / shrnutí', type: 'textarea', rows: 2, hint: '*Slovo* v hvězdičkách = akcentová kurzíva.' },
          { path: 'promo.body', label: 'Doplňující text', type: 'textarea', rows: 2 },
          { path: 'promo.cta', label: 'Výzva k akci', type: 'textarea', rows: 2, hint: 'Slovo do komentáře dej do hvězdiček: Napiš *WEB* do komentáře.' },
          { path: 'promo.follow', label: 'Výzva ke sledování', maxlength: 60 },
        ], 'slide-editor--promo'));
      }
    });
  }

  // =========================================================
  //  UI – náhled a export
  // =========================================================

  let canvases = [];

  function buildPreview() {
    previewEl.innerHTML = '';
    const slides = buildSlides();
    canvases = slides.map((slide, i) => {
      const node = previewTpl.content.firstElementChild.cloneNode(true);
      const canvas = node.querySelector('canvas');
      const labels = { hook: 'Hook', content: 'Obsah', promo: 'Promo' };
      node.querySelector('.preview-item__label').textContent = `${i + 1}. ${labels[slide.type]}`;
      canvas.setAttribute('aria-label', `Slajd ${i + 1}`);
      node.querySelector('[data-download]').addEventListener('click', () => downloadCanvas(canvas, i + 1));
      previewEl.appendChild(node);
      return canvas;
    });
    renderAll();
  }

  function renderAll() {
    const slides = buildSlides();
    slides.forEach((slide, i) => {
      if (canvases[i]) renderSlide(canvases[i], slide, i, slides.length);
    });
  }

  let rafId = 0;
  function scheduleRender() {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(renderAll);
  }

  function canvasToBlob(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Export selhal'))), 'image/png');
    });
  }

  async function downloadCanvas(canvas, num) {
    const blob = await canvasToBlob(canvas);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `slide-${num}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function downloadAll() {
    const btn = $('#downloadAll');
    const original = btn.textContent;
    btn.disabled = true;
    try {
      renderAll();
      for (let i = 0; i < canvases.length; i++) {
        btn.textContent = `Stahuji ${i + 1} / ${canvases.length}…`;
        await downloadCanvas(canvases[i], i + 1);
        // Krátká pauza – prohlížeče jinak hromadné stahování blokují.
        await wait(400);
      }
    } finally {
      btn.textContent = original;
      btn.disabled = false;
    }
  }

  // =========================================================
  //  Události
  // =========================================================

  function syncStaticInputs() {
    document.querySelectorAll('input[name="slideCount"]').forEach((r) => { r.checked = Number(r.value) === state.count; });
    document.querySelectorAll('input[name="bgTone"]').forEach((r) => { r.checked = r.value === state.bg; });
    $('#brandName').value = state.brand.name;
    $('#brandWebsite').value = state.brand.website;
    $('#brandInstagram').value = state.brand.instagram;
  }

  function bindEvents() {
    document.querySelectorAll('input[name="slideCount"]').forEach((r) => {
      r.addEventListener('change', () => {
        state.count = clampCount(r.value);
        saveState();
        buildEditors();
        buildPreview();
      });
    });

    document.querySelectorAll('input[name="bgTone"]').forEach((r) => {
      r.addEventListener('change', () => {
        state.bg = r.value;
        saveState();
        scheduleRender();
      });
    });

    const brandMap = {
      brandName: 'name', brandWebsite: 'website', brandInstagram: 'instagram',
    };
    Object.entries(brandMap).forEach(([id, key]) => {
      $(`#${id}`).addEventListener('input', (e) => {
        state.brand[key] = e.target.value;
        saveState();
        scheduleRender();
      });
    });

    // Delegované události pro dynamické editory slajdů
    editorsEl.addEventListener('input', onEditorChange);
    editorsEl.addEventListener('change', onEditorChange);

    $('#downloadAll').addEventListener('click', downloadAll);

    $('#resetBtn').addEventListener('click', () => {
      if (!confirm('Obnovit výchozí texty všech slajdů? Branding zůstane zachován.')) return;
      const fresh = clone(DEFAULT_STATE);
      state = { ...fresh, brand: state.brand, count: state.count, bg: state.bg };
      saveState();
      buildEditors();
      renderAll();
    });

    $('#logoInput').addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        logoImage = img;
        $('#logoClear').hidden = false;
        renderAll();
      };
      img.onerror = () => alert('Logo se nepodařilo načíst. Zkus PNG nebo SVG.');
      img.src = url;
    });

    $('#logoClear').addEventListener('click', () => {
      logoImage = null;
      $('#logoInput').value = '';
      $('#logoClear').hidden = true;
      renderAll();
    });
  }

  function onEditorChange(e) {
    const path = e.target.dataset && e.target.dataset.path;
    if (!path) return;
    if (e.type === 'change' && e.target.tagName !== 'SELECT') return; // text už řeší "input"

    setPath(state, path, e.target.value);

    if (path === 'promo.template') {
      if (e.type !== 'change') return;
      const key = e.target.value;
      if (PROMO_TEMPLATES[key]) {
        Object.assign(state.promo, pickTemplate(key));
        buildEditors();
      }
    } else if (path.startsWith('promo.') && path !== 'promo.follow' && state.promo.template !== 'custom') {
      // Ruční úprava promo textu → šablona se přepne na "Vlastní"
      state.promo.template = 'custom';
      const sel = $('#f-promo-template');
      if (sel) sel.value = 'custom';
    }

    saveState();
    scheduleRender();
  }

  // =========================================================
  //  Fonty
  // =========================================================

  // Ukázkový text s diakritikou → načte se i podmnožina latin-ext (č, ř, ž…).
  const FONT_SAMPLE = 'AaBbHh0123 ČčŘřŽžŠšĚěŮůÁáÍíÉéÝý';

  /** Rodina je načtená, když jsou načtené všechny její soubory (latin + latin-ext). */
  function brandFaceLoaded(family) {
    const faces = [];
    document.fonts.forEach((f) => {
      if (f.family.replace(/["']/g, '') === family) faces.push(f);
    });
    return faces.length > 0 && faces.every((f) => f.status === 'loaded');
  }

  async function loadFonts() {
    const status = $('#fontStatus');
    if (!document.fonts) {
      status.textContent = 'Záložní font';
      status.className = 'pill pill--warn';
      return;
    }
    try {
      await Promise.all([
        document.fonts.load('700 64px "BrandFont-Bold"', FONT_SAMPLE),
        document.fonts.load('400 64px "BrandFont-Regular"', FONT_SAMPLE),
        document.fonts.load('italic 400 64px "BrandFont-Accent"', FONT_SAMPLE),
      ]);
    } catch (e) { /* soubor chybí → fallback */ }

    const bold = brandFaceLoaded('BrandFont-Bold');
    const regular = brandFaceLoaded('BrandFont-Regular');
    const accent = brandFaceLoaded('BrandFont-Accent');
    if (bold && regular && accent) {
      status.textContent = 'Firemní fonty načteny';
      status.className = 'pill pill--ok';
      status.title = 'Inter Tight · Inter · Instrument Serif';
    } else {
      const missing = [!bold && 'Bold', !regular && 'Regular', !accent && 'Accent'].filter(Boolean).join(' + ');
      status.textContent = `Záložní font (chybí ${missing})`;
      status.className = 'pill pill--warn';
      status.title = 'Nahraj soubory do složky /fonts – viz fonts/README.md';
    }
  }

  // =========================================================
  //  Start
  // =========================================================

  async function init() {
    syncStaticInputs();
    buildEditors();
    bindEvents();
    buildPreview(); // první vykreslení hned (s fallbackem)
    await loadFonts();
    renderAll(); // znovu, jakmile jsou fonty k dispozici
    // Pojistka: dočtené soubory (např. latin-ext) → překreslit.
    if (document.fonts) document.fonts.addEventListener('loadingdone', scheduleRender);
  }

  init();
})();
