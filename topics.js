/* =========================================================
   Project Two – knihovna témat pro carousely
   Každé téma je hotový carousel: hook → 3 body → promo.
   - Body řaď od nejsilnějšího: u 3slajdového carouselu se použije
     jen první bod, u 4slajdového první dva.
   - Hook ani podnadpis nesmí zmiňovat počet bodů (mění se podle počtu slajdů).
   - *slovo* = oranžová akcentová kurzíva. V promo CTA tak označ slovo do komentáře.
   - ctaType: comment | save | share | question
   - Fakta v promo jen ta, která platí (projectwo.com): ceny od 10/20/50 tis.,
     online do tří týdnů, péče po spuštění, první návrh zdarma.
   ========================================================= */
window.PW_TOPICS = {
  categories: {
    konverze: 'Poptávky a prodej',
    technika: 'Rychlost a technika',
    duvera: 'Design a důvěra',
    ceny: 'Ceny a spolupráce',
    obory: 'Tipy pro obory',
    myty: 'Mýty o webech',
  },

  topics: [
    // ---------------------------------------------------------------- konverze
    {
      id: 'nikdo-nepise',
      cat: 'konverze',
      name: 'Proč z webu nechodí poptávky',
      hook: {
        title: 'Máš web. Tak proč ti *nikdo* nepíše?',
        subtitle: 'Většinou nejde o design. Jde o drobnosti, které zákazníka zastaví těsně před kontaktem.',
      },
      points: [
        {
          title: 'Kontakt je schovaný',
          body: 'Telefon v patičce a formulář na třetí podstránce. Kdo tě chce oslovit, hledat nebude. Dej kontakt do hlavičky a na konec každé stránky.',
          ctaType: 'question',
          cta: 'Na kolik kliknutí se dá z tvého webu zavolat?',
        },
        {
          title: 'Formulář jako z úřadu',
          body: 'Deset povinných polí a captcha navrch. Jméno, kontakt a zpráva stačí. Zbytek doladíš po telefonu.',
          ctaType: 'save',
          cta: 'Ulož si to a zkontroluj svůj formulář.',
        },
        {
          title: 'Nikde není ani orientační cena',
          body: 'Lidi nechtějí volat jen proto, aby zjistili, jestli na tebe mají. Stačí „od“. Kdo zná rozpětí, píše s jasnou představou.',
          ctaType: 'comment',
          cta: 'Máš ceny na webu? Napiš ANO, nebo NE.',
        },
      ],
      promo: {
        title: 'Web má *prodávat*, ne jen existovat.',
        body: 'Navrhneme ho tak, aby se z návštěvníka stala poptávka. Online do tří týdnů.',
        cta: 'Napiš *WEB* do komentáře a řekneme ti, co bychom na tom tvém změnili.',
      },
    },
    {
      id: 'prvni-obrazovka',
      cat: 'konverze',
      name: 'Co musí být vidět bez scrollování',
      hook: {
        title: 'Co musí být vidět *bez scrollování*.',
        subtitle: 'První obrazovka rozhoduje, jestli návštěvník zůstane, nebo zmáčkne zpět.',
      },
      points: [
        {
          title: 'Jasné „co a pro koho“',
          body: 'Žádné „Vítejte na našich stránkách“. Jedna věta, co děláš a pro koho. Třeba: Účetnictví pro živnostníky v Brně.',
          ctaType: 'comment',
          cta: 'Jaký nadpis máš teď na úvodní stránce? Napiš ho do komentářů.',
        },
        {
          title: 'Jedno hlavní tlačítko',
          body: 'Objednat, rezervovat, nebo zavolat? Vyber jednu akci, na které ti záleží nejvíc, a dej jí nejvýraznější tlačítko na stránce.',
          ctaType: 'save',
          cta: 'Ulož si to a mrkni na svou úvodní stránku.',
        },
        {
          title: 'Důkaz hned nahoře',
          body: 'Hodnocení z Googlu, počet spokojených klientů nebo logo známého zákazníka. Důvěra musí přijít dřív než pochybnosti.',
          ctaType: 'question',
          cta: 'Kde máš na webu recenze? Nahoře, dole, nebo nikde?',
        },
      ],
      promo: {
        title: 'Úvodní stránka je tvůj *nejlepší* obchodník.',
        body: 'Postavíme ji tak, aby návštěvník hned věděl, proč zrovna ty.',
        cta: 'Napiš *WEB* do komentáře a podíváme se na tu tvou.',
      },
    },
    {
      id: 'texty',
      cat: 'konverze',
      name: 'Texty, které zákazník opravdu čte',
      hook: {
        title: 'Píšeš o *sobě*. Zákazníka zajímá on.',
        subtitle: 'Jak psát texty na web, které přečte i ten, kdo jen rychle projíždí.',
      },
      points: [
        {
          title: 'Méně „my“, víc „ty“',
          body: '„Jsme firma s dlouholetou tradicí“ vs. „Hotovou kuchyň máš do šesti týdnů“. Zákazník hledá, co z toho bude mít on.',
          ctaType: 'question',
          cta: 'Kolikrát je na tvé úvodní stránce slovo „my“?',
        },
        {
          title: 'Konkrétně, ne obecně',
          body: '„Rychlé dodání“ neříká nic. „Doručíme do 48 hodin“ říká všechno. Konkrétní slib prodává líp než sebevětší přídavné jméno.',
          ctaType: 'comment',
          cta: 'Jaký slib dáváš zákazníkům? Napiš ho co nejkonkrétněji.',
        },
        {
          title: 'Krátké odstavce',
          body: 'Na webu se nečte, ale skenuje. Tři řádky na odstavec, mezititulky a odrážky. Zeď textu nepřečte nikdo.',
          ctaType: 'save',
          cta: 'Ulož si to, až budeš psát texty na web.',
        },
      ],
      promo: {
        title: 'Dobrý web začíná u *textů*.',
        body: 'Navrhneme web tak, aby tvoje texty vynikly. A když si nebudeš vědět rady, poradíme.',
        cta: 'Napiš *TEXTY* do komentáře a mrkneme na tvou úvodní stránku.',
      },
    },
    {
      id: 'kosik',
      cat: 'konverze',
      name: 'Proč lidi nechávají plný košík',
      hook: {
        title: 'Proč lidi nechávají plný *košík*?',
        subtitle: 'Zákazník už chtěl zaplatit. Tohle ho zastavilo.',
      },
      points: [
        {
          title: 'Překvapení v ceně',
          body: 'Doprava a poplatky až v posledním kroku. Ukaž cenu dopravy dřív, než zákazník začne vyplňovat adresu.',
          ctaType: 'question',
          cta: 'V kterém kroku se u tebe zákazník dozví cenu dopravy?',
        },
        {
          title: 'Povinná registrace',
          body: 'Zákazník chce nakoupit, ne si zakládat účet. Nabídni nákup bez registrace a účet až po zaplacení.',
          ctaType: 'save',
          cta: 'Ulož si to a projdi si svůj nákupní proces.',
        },
        {
          title: 'Málo způsobů platby',
          body: 'Kartou, převodem, Apple Pay. Kdo nenajde svůj oblíbený způsob, nákup odloží. A pak na něj zapomene.',
          ctaType: 'comment',
          cta: 'Jak nejradši platíš online ty? Napiš do komentářů.',
        },
      ],
      promo: {
        title: 'E-shop, kde se *dobře* nakupuje.',
        body: 'Jednoduchý nákup, online platby a napojení na nástroje, které už používáš.',
        cta: 'Napiš *ESHOP* do komentáře a ozveme se ti.',
      },
    },

    // ---------------------------------------------------------------- technika
    {
      id: 'pomaly-web',
      cat: 'technika',
      name: 'Pomalý web',
      hook: {
        title: 'Každá sekunda načítání tě *stojí* zákazníky.',
        subtitle: 'Nejčastější brzdy rychlosti – a jak je povolit.',
      },
      points: [
        {
          title: 'Obří fotky',
          body: 'Fotka z mobilu má klidně 5 MB. Na webu jí stačí pár set kB. Zmenšit, převést do WebP a hotovo.',
          ctaType: 'question',
          cta: 'Víš, kolik váží úvodní fotka na tvém webu?',
        },
        {
          title: 'Plugin na všechno',
          body: 'Každý plugin přidává kód, který se načítá při každé návštěvě. Co nepoužíváš, smaž. Co používáš, prověř.',
          ctaType: 'comment',
          cta: 'Kolik pluginů máš na webu? Přiznej se v komentářích.',
        },
        {
          title: 'Nejlevnější hosting',
          body: 'Hosting za pár korun měsíčně se dělí o server se stovkami dalších webů. Ušetříš stovky, ztratíš zákazníky.',
          ctaType: 'save',
          cta: 'Ulož si to, až budeš vybírat hosting.',
        },
      ],
      promo: {
        title: 'Rychlý web není *luxus*.',
        body: 'Stavíme weby, které se načtou dřív, než zákazník ztratí trpělivost. Hosting a údržbu řešíme za tebe.',
        cta: 'Napiš *RYCHLOST* do komentáře a změříme ten tvůj.',
      },
    },
    {
      id: 'mobil',
      cat: 'technika',
      name: 'Web na mobilu',
      hook: {
        title: 'Zkus si teď otevřít svůj web na *mobilu*.',
        subtitle: 'Většina tvých zákazníků ho vidí právě takhle.',
      },
      points: [
        {
          title: 'Telefon, na který nejde kliknout',
          body: 'Číslo napsané jako obrázek nebo obyčejný text je na mobilu k ničemu. Udělej z něj odkaz a zákazník ti zavolá jedním dotykem.',
          ctaType: 'share',
          cta: 'Pošli to někomu, komu se na webu nedá prokliknout číslo.',
        },
        {
          title: 'Text pro lupu',
          body: 'Písmo menší než 16 px se na telefonu čte jen s přiblížením. A to nikdo dělat nebude.',
          ctaType: 'question',
          cta: 'Musíš na svém webu zoomovat?',
        },
        {
          title: 'Tlačítka pro jehlu',
          body: 'Prst není kurzor myši. Tlačítka a odkazy potřebují místo kolem sebe, jinak se člověk netrefí a odejde.',
          ctaType: 'save',
          cta: 'Ulož si to a vyzkoušej svůj web palcem.',
        },
      ],
      promo: {
        title: 'Web, který funguje *v kapse*.',
        body: 'Každý náš web ladíme pro mobil, tablet i počítač. Ne až na konci, ale od prvního návrhu.',
        cta: 'Napiš *MOBIL* do komentáře a mrkneme, jak na tom je ten tvůj.',
      },
    },
    {
      id: 'google',
      cat: 'technika',
      name: 'Proč tě Google nenajde',
      hook: {
        title: 'Proč tě *Google* nenajde.',
        subtitle: 'Základy, které zvládneš i bez SEO agentury.',
      },
      points: [
        {
          title: 'Profil firmy na Googlu',
          body: 'Pro místní byznys často důležitější než samotný web. Vyplň otevírací dobu, přidej fotky a odpovídej na recenze.',
          ctaType: 'save',
          cta: 'Ulož si to a vyplň svůj profil ještě dnes.',
        },
        {
          title: 'Piš, jak lidi hledají',
          body: 'Nikdo nehledá „komplexní řešení interiérů“. Lidi hledají „kuchyň na míru Brno“. Používej jejich slova.',
          ctaType: 'comment',
          cta: 'Jak by tvou práci vyhledal zákazník? Napiš to do komentářů.',
        },
        {
          title: 'Každá stránka má svůj titulek',
          body: 'Titulek se zobrazuje ve výsledcích vyhledávání. „Úvod“ nebo „Home“ nikomu neřekne, proč by měl kliknout zrovna na tebe.',
          ctaType: 'question',
          cta: 'Co se ukáže, když si v Googlu vyhledáš svou firmu?',
        },
      ],
      promo: {
        title: 'Web, který lidi *najdou*.',
        body: 'Každý náš web má nastavené základy SEO a měření návštěvnosti. Hned od spuštění.',
        cta: 'Napiš *GOOGLE* do komentáře a řekneme ti, co bychom zlepšili jako první.',
      },
    },
    {
      id: 'redesign',
      cat: 'technika',
      name: 'Signály, že je čas na nový web',
      hook: {
        title: 'Je čas na nový web? Tyhle *signály* to prozradí.',
        subtitle: 'Když na tvůj web sedí aspoň jeden, stojí za to zpozornět.',
      },
      points: [
        {
          title: 'Stydíš se ho poslat',
          body: 'Když klientovi radši pošleš PDF nebo Instagram než odkaz na web, je to jasné znamení.',
          ctaType: 'question',
          cta: 'Posíláš klientům odkaz na svůj web bez obav?',
        },
        {
          title: 'Úprava = týden čekání',
          body: 'Změna ceny nebo otevírací doby by neměla trvat týden. Moderní web si upravíš sám, nebo to za tebe někdo udělá do druhého dne.',
          ctaType: 'save',
          cta: 'Ulož si to a porovnej se svým webem.',
        },
        {
          title: 'Na mobilu se rozpadá',
          body: 'Rozsypané menu, nečitelné texty, formulář, který nejde odeslat. Když web nefunguje na telefonu, nefunguje pro většinu lidí.',
          ctaType: 'comment',
          cta: 'Kolik signálů sedí na tvůj web? Napiš číslo.',
        },
      ],
      promo: {
        title: 'Nový web *do tří týdnů*.',
        body: 'Od návrhu po spuštění. A potom se o něj staráme dál.',
        cta: 'Napiš *REDESIGN* do komentáře a pošleme ti první návrh zdarma.',
      },
    },

    // ---------------------------------------------------------------- duvera
    {
      id: 'prvni-dojem',
      cat: 'duvera',
      name: 'První dojem z webu',
      hook: {
        title: 'Na první dojem máš *pár vteřin*.',
        subtitle: 'Tohle si návštěvník všimne dřív, než začne číst.',
      },
      points: [
        {
          title: 'Fotky z fotobanky',
          body: 'Usměvavý tým v oblecích pozná každý. Vlastní fotky, klidně z mobilu, působí důvěryhodněji než sebelepší stock.',
          ctaType: 'save',
          cta: 'Ulož si to, až budeš fotit na web.',
        },
        {
          title: 'Důkaz, že to umíš',
          body: 'Reference, ukázky práce, loga klientů. Bez nich jsi jen další jméno ve výsledcích vyhledávání.',
          ctaType: 'share',
          cta: 'Pošli to někomu, kdo na webu nemá jedinou referenci.',
        },
        {
          title: 'Vzhled z minulé dekády',
          body: 'Zastaralý design nevadí kvůli módě. Vadí proto, že zákazník podvědomě usoudí, že stejně zastaralé jsou i tvoje služby.',
          ctaType: 'question',
          cta: 'Kolik let je tvému webu?',
        },
      ],
      promo: {
        title: 'Dobrý web vzbudí *důvěru* na první pohled.',
        body: 'Navrhneme ho podle tvé značky a lidí, kterým prodáváš. Bez šablon.',
        cta: 'Napiš *WEB* do komentáře a ozveme se ti s prvním návrhem zdarma.',
      },
    },
    {
      id: 'detaily',
      cat: 'duvera',
      name: 'Detaily, podle kterých tě soudí',
      hook: {
        title: 'Malé detaily, *velký* rozdíl.',
        subtitle: 'Podle nich zákazník pozná, jestli to myslíš vážně.',
      },
      points: [
        {
          title: 'E-mail na vlastní doméně',
          body: 'info@tvojefirma.cz působí úplně jinak než tvojefirma123@seznam.cz. A stojí to pár korun měsíčně.',
          ctaType: 'question',
          cta: 'Píšeš klientům z adresy na vlastní doméně?',
        },
        {
          title: 'Odkazy, které nikam nevedou',
          body: 'Ikonka Facebooku, která vede na prázdnou stránku. Tlačítko, které nic nedělá. Proklikej si svůj web aspoň jednou za čtvrt roku.',
          ctaType: 'share',
          cta: 'Pošli to někomu, kdo by si měl proklikat web.',
        },
        {
          title: 'Ikonka v záložce',
          body: 'Bez favicony web vypadá nedodělaně. S ní ho zákazník najde i mezi dvaceti otevřenými záložkami.',
          ctaType: 'save',
          cta: 'Ulož si to jako checklist detailů.',
        },
      ],
      promo: {
        title: 'Postaráme se i o *detaily*.',
        body: 'Doména, e-maily i drobné úpravy po spuštění. Všechno od jednoho týmu.',
        cta: 'Napiš *DETAILY* do komentáře a projdeme ten tvůj.',
      },
    },
    {
      id: 'recenze',
      cat: 'duvera',
      name: 'Recenze a reference',
      hook: {
        title: 'Lidi věří *lidem*, ne reklamě.',
        subtitle: 'Jak dostat recenze na web a proč na nich tolik záleží.',
      },
      points: [
        {
          title: 'Řekni si o ně',
          body: 'Spokojení zákazníci recenzi rádi napíšou, jen je to nenapadne. Pošli jim odkaz hned po dokončení zakázky, kdy je radost největší.',
          ctaType: 'question',
          cta: 'Kolik recenzí máš teď na Googlu?',
        },
        {
          title: 'Jméno, ne „spokojený zákazník“',
          body: '„Spokojený zákazník, Praha“ zní jako vymyšlené. Celé jméno, fotka nebo název firmy dodají recenzi váhu.',
          ctaType: 'save',
          cta: 'Ulož si to, až budeš přidávat reference.',
        },
        {
          title: 'Odpovídej i na ty špatné',
          body: 'Klidná a věcná odpověď na kritiku ukáže víc profesionality než deset pětihvězdičkových hodnocení.',
          ctaType: 'comment',
          cta: 'Odpovídáš na negativní recenze? ANO, nebo NE?',
        },
      ],
      promo: {
        title: 'Ukaž, co o tobě *říkají* ostatní.',
        body: 'Reference a hodnocení zapracujeme do webu tak, aby je návštěvník viděl hned.',
        cta: 'Napiš *RECENZE* do komentáře a poradíme ti, kam je na webu dát.',
      },
    },

    // ---------------------------------------------------------------- ceny
    {
      id: 'kolik-stoji-web',
      cat: 'ceny',
      name: 'Kolik stojí web',
      hook: {
        title: 'Kolik *doopravdy* stojí web?',
        subtitle: 'Otázka, kterou řeší každý, kdo s webem začíná. Tady jsou čísla.',
      },
      points: [
        {
          title: 'Jednostránkový web',
          body: 'Jedna stránka, která řekne, co děláš, a nechá na tebe kontakt. Ideální pro začínající živnostníky a nové značky. U nás od 10 000 Kč.',
          ctaType: 'question',
          cta: 'Stačila by ti jedna stránka?',
        },
        {
          title: 'Web s více stránkami',
          body: 'Služby, reference, ceník, blog. Když máš co ukazovat a chceš být lépe vidět na Googlu. U nás od 20 000 Kč.',
          ctaType: 'save',
          cta: 'Ulož si to, ať máš srovnání po ruce.',
        },
        {
          title: 'Rezervace, e-shop, platby',
          body: 'Když má web sám pracovat: přijímat objednávky, rezervace nebo platby. U nás od 50 000 Kč.',
          ctaType: 'comment',
          cta: 'Který z nich by sedl tvému byznysu? 1, 2, nebo 3?',
        },
      ],
      promo: {
        title: 'Žádné *skryté* poplatky.',
        body: 'Než začneme, dostaneš podrobnou nabídku. Víš přesně, za co platíš.',
        cta: 'Napiš *CENA* do komentáře a pošleme ti orientační nabídku.',
      },
    },
    {
      id: 'pred-zadanim',
      cat: 'ceny',
      name: 'Co si připravit, než zadáš web',
      hook: {
        title: 'Než zadáš web, *připrav* si tohle.',
        subtitle: 'Ušetříš týdny čekání i peníze za zbytečné úpravy.',
      },
      points: [
        {
          title: 'Texty a fotky',
          body: 'Web se nejčastěji nezdrží kvůli programování, ale kvůli chybějícím textům. Začni je psát hned, klidně v bodech.',
          ctaType: 'save',
          cta: 'Ulož si to jako checklist před novým webem.',
        },
        {
          title: 'Jeden hlavní cíl',
          body: 'Přivést poptávky? Prodávat? Ukázat portfolio? Jeden hlavní cíl rozhodne o všem ostatním – od struktury po barvu tlačítka.',
          ctaType: 'question',
          cta: 'Jaký je hlavní cíl tvého webu?',
        },
        {
          title: 'Weby, které se ti líbí',
          body: 'Pošli dva tři odkazy a napiš, co se ti na nich líbí. Designér pak trefí tvůj vkus mnohem rychleji.',
          ctaType: 'share',
          cta: 'Pošli to někomu, kdo právě plánuje nový web.',
        },
      ],
      promo: {
        title: 'S námi je web online *do tří týdnů*.',
        body: 'Provedeme tě tím krok za krokem. Bez technických řečí, s jedním týmem od návrhu po spuštění.',
        cta: 'Napiš *START* do komentáře a pošleme ti nezávazný návrh zdarma.',
      },
    },
    {
      id: 'po-spusteni',
      cat: 'ceny',
      name: 'Web po spuštění',
      hook: {
        title: '„Web mám hotový.“ *Opravdu?*',
        subtitle: 'Proč web potřebuje péči i po spuštění.',
      },
      points: [
        {
          title: 'Zálohy',
          body: 'Když se něco pokazí, záloha rozhoduje, jestli jde o pět minut, nebo o nový web. Máš ji? A víš, kde je?',
          ctaType: 'save',
          cta: 'Ulož si to a zkontroluj zálohy ještě dnes.',
        },
        {
          title: 'Aktualizace',
          body: 'Systémy a pluginy pravidelně dostávají bezpečnostní opravy. Neaktualizovaný web je pootevřené okno.',
          ctaType: 'question',
          cta: 'Kdy naposledy proběhla aktualizace tvého webu?',
        },
        {
          title: 'Zastaralé informace',
          body: 'Loňský ceník, neplatná otevírací doba, kolega, který už u vás nepracuje. Zákazník si toho všimne a důvěra jde dolů.',
          ctaType: 'comment',
          cta: 'Co máš na webu zastaralého? Přiznej se v komentářích.',
        },
      ],
      promo: {
        title: 'Hosting, zálohy, aktualizace. *Řešíme* za tebe.',
        body: 'Po spuštění se o web staráme dál. Ty jen napíšeš, co je potřeba změnit.',
        cta: 'Napiš *PECE* do komentáře a řekneme ti, co všechno pohlídáme.',
      },
    },

    // ---------------------------------------------------------------- obory
    {
      id: 'salon',
      cat: 'obory',
      name: 'Web pro salon a kosmetiku',
      hook: {
        title: 'Web pro salon, který *plní* diář.',
        subtitle: 'Bez tohohle ti dnes klientky nenapíšou.',
      },
      points: [
        {
          title: 'Online rezervace',
          body: 'Klientka se rozhoduje večer na gauči, ne v otevírací době. Když si termín zarezervuje sama, nemusíš zvedat telefon uprostřed práce.',
          ctaType: 'question',
          cta: 'Kolik rezervací ti denně přijde po telefonu?',
        },
        {
          title: 'Ceník bez hledání',
          body: 'Střih, barva, ošetření – a kolik to stojí. Přehledný ceník ušetří desítky stejných dotazů ve zprávách.',
          ctaType: 'save',
          cta: 'Ulož si to pro svůj salon.',
        },
        {
          title: 'Fotky tvé práce',
          body: 'Před a po, detail účesu, atmosféra salonu. Klientky si vybírají očima, tak jim ukaž, co umíš.',
          ctaType: 'share',
          cta: 'Pošli to kamarádce, která má salon jen na Instagramu.',
        },
      ],
      promo: {
        title: 'Ať ti *diář* plní web.',
        body: 'Rezervace, ceník i galerie na jednom místě. Napojíme to na nástroje, které už používáš.',
        cta: 'Napiš *SALON* do komentáře a pošleme ti návrh, jak by to mohlo vypadat.',
      },
    },
    {
      id: 'remeslnici',
      cat: 'obory',
      name: 'Web pro řemeslníky',
      hook: {
        title: 'Řemeslo umíš. Teď ho ukaž i *online*.',
        subtitle: 'Co má mít web, aby ti zvonil telefon.',
      },
      points: [
        {
          title: 'Kde působíš',
          body: 'Napiš města a oblasti, kam jezdíš. Lidi hledají „instalatér Kolín“, ne jen „instalatér“. A Google taky.',
          ctaType: 'question',
          cta: 'Ve kterém městě nejčastěji pracuješ?',
        },
        {
          title: 'Hotové zakázky',
          body: 'Pár fotek před a po řekne víc než odstavec o letité praxi. Stačí mobil a dobré světlo.',
          ctaType: 'save',
          cta: 'Ulož si to a příště vyfoť i hotovou práci.',
        },
        {
          title: 'Rychlá poptávka s fotkou',
          body: 'Krátký formulář, kam zákazník přiloží fotku problému. Ušetříš si cestu na obhlídku, kde by to šlo vyřešit po telefonu.',
          ctaType: 'comment',
          cta: 'Chodí ti víc poptávek telefonem, nebo e-mailem?',
        },
      ],
      promo: {
        title: 'Web, který ti *shání* zakázky.',
        body: 'Navrhneme ho, postavíme a postaráme se o něj. Ty se můžeš věnovat řemeslu.',
        cta: 'Napiš *ZAKAZKY* do komentáře a ozveme se ti.',
      },
    },
    {
      id: 'portfolio',
      cat: 'obory',
      name: 'Portfolio pro kreativce',
      hook: {
        title: 'Portfolio, které *prodává*, ne jen ukazuje.',
        subtitle: 'Pro grafiky, fotografy, střihače a další kreativce.',
      },
      points: [
        {
          title: 'Méně je víc',
          body: 'Deset nejlepších projektů porazí sto průměrných. Klient si tvou nejslabší práci zapamatuje stejně jako tu nejlepší.',
          ctaType: 'question',
          cta: 'Kolik projektů máš teď v portfoliu?',
        },
        {
          title: 'Příběh za projektem',
          body: 'Nejen výsledek, ale i zadání a co se povedlo vyřešit. Klient nekupuje obrázky, kupuje tvoje přemýšlení.',
          ctaType: 'save',
          cta: 'Ulož si to, až budeš přepisovat portfolio.',
        },
        {
          title: 'Jasný další krok',
          body: 'Projekt nekonči jen poslední fotkou. Přidej „Chceš něco podobného? Napiš mi.“ Klient je nadšený právě teď.',
          ctaType: 'share',
          cta: 'Pošli to kreativci, který má portfolio jen na Behance.',
        },
      ],
      promo: {
        title: 'Tvoje práce si zaslouží *vlastní* web.',
        body: 'Postavíme portfolio podle tvé značky. Rychlé, čisté a připravené na poptávky.',
        cta: 'Napiš *PORTFOLIO* do komentáře a pošleme ti první návrh zdarma.',
      },
    },
    {
      id: 'kavarna',
      cat: 'obory',
      name: 'Web pro kavárnu a restauraci',
      hook: {
        title: 'Hosté tě hledají *dřív*, než přijdou.',
        subtitle: 'Co musí najít na webu kavárny nebo restaurace, aby přišli k tobě.',
      },
      points: [
        {
          title: 'Menu jako text, ne PDF',
          body: 'PDF z roku 2019 se na mobilu špatně čte a Google ho skoro nevidí. Menu jako text se načte hned a najde ho i vyhledávač.',
          ctaType: 'question',
          cta: 'Máš menu na webu jako PDF, nebo jako text?',
        },
        {
          title: 'Všude stejná otevírací doba',
          body: 'Web, Google i Facebook musí říkat totéž. Zavřené dveře v čase, kdy má být podle webu otevřeno, ti host neodpustí.',
          ctaType: 'save',
          cta: 'Ulož si to a sjednoť otevírací dobu.',
        },
        {
          title: 'Rezervace stolu',
          body: 'Kdo chce stůl na pátek večer, často nevolá. Jednoduchá online rezervace ti přivede hosty, kteří by jinak šli jinam.',
          ctaType: 'share',
          cta: 'Pošli to majiteli tvé oblíbené kavárny.',
        },
      ],
      promo: {
        title: 'Ať tě hosté najdou *jako první*.',
        body: 'Menu, rezervace a mapa v jednom rychlém webu. Úpravy menu klidně vyřešíme za tebe.',
        cta: 'Napiš *KAVARNA* do komentáře a ozveme se ti.',
      },
    },
    {
      id: 'sluzby',
      cat: 'obory',
      name: 'Web pro účetní a poradce',
      hook: {
        title: 'Účetní, poradce, právník? Web ti může *šetřit* čas.',
        subtitle: 'Jak odfiltrovat dotazy, které nikam nevedou, a přitáhnout ty správné klienty.',
      },
      points: [
        {
          title: 'Pro koho jsi',
          body: 'Živnostníci, s.r.o., e-shopy? Napiš jasně, s kým pracuješ. Ozvou se ti ti správní a ostatní ušetří čas sobě i tobě.',
          ctaType: 'question',
          cta: 'S jakými klienty pracuješ nejradši?',
        },
        {
          title: 'Odpovědi na časté otázky',
          body: 'Co si připravit, kolik to stojí, jak dlouho to trvá. Sekce s častými dotazy ti ušetří desítky stejných e-mailů.',
          ctaType: 'save',
          cta: 'Ulož si to a sepiš svých pět nejčastějších otázek.',
        },
        {
          title: 'Termín schůzky online',
          body: 'Místo pěti e-mailů tam a zpět si klient vybere volný termín sám. Napojení na kalendář je otázka nastavení.',
          ctaType: 'share',
          cta: 'Pošli to někomu, kdo tráví hodiny domlouváním schůzek.',
        },
      ],
      promo: {
        title: 'Web, který za tebe *vyřídí* první kontakt.',
        body: 'Časté dotazy, rezervace schůzek a jasné informace. Ty se věnuješ klientům.',
        cta: 'Napiš *KLIENTI* do komentáře a ozveme se ti.',
      },
    },

    // ---------------------------------------------------------------- myty
    {
      id: 'sablona',
      cat: 'myty',
      name: 'Web ze stavebnice zadarmo',
      hook: {
        title: 'Web ze stavebnice zadarmo? Má to *háček*.',
        subtitle: 'Kdy stavebnice stačí a kdy tě začne brzdit.',
      },
      points: [
        {
          title: 'Vypadá jako tisíc dalších',
          body: 'Stejnou šablonu si vybral i tvůj konkurent. Když web vypadá jako všechny ostatní, zákazník nemá důvod si tě zapamatovat.',
          ctaType: 'question',
          cta: 'Poznáš svůj web mezi konkurencí, když zakryješ logo?',
        },
        {
          title: 'Čas jsou taky peníze',
          body: 'Stavebnice je zadarmo, večery strávené laděním ne. Spočítej si, kolik hodin dáváš do webu místo do práce, která tě živí.',
          ctaType: 'comment',
          cta: 'Kolik večerů ti už spolkl web? Napiš do komentářů.',
        },
        {
          title: 'Na začátek stačí',
          body: 'Když teprve zkoušíš, jestli o tvou službu bude zájem, stavebnice dává smysl. Web na míru se vyplatí, až začne nosit zakázky.',
          ctaType: 'save',
          cta: 'Ulož si to, až se budeš rozhodovat.',
        },
      ],
      promo: {
        title: 'Web na míru, *bez starostí*.',
        body: 'Design, vývoj i údržba od jednoho týmu. Ty řešíš byznys, my web.',
        cta: 'Napiš *WEB* do komentáře a pošleme ti první návrh zdarma.',
      },
    },
    {
      id: 'instagram',
      cat: 'myty',
      name: '„Stačí mi Instagram“',
      hook: {
        title: '„Stačí mi Instagram.“ Do *chvíle*, než ne.',
        subtitle: 'Proč sociální sítě web nenahradí – a proč se skvěle doplňují.',
      },
      points: [
        {
          title: 'Síť ti nepatří',
          body: 'Změna algoritmu, zablokovaný účet nebo propad dosahu. Web je jediné místo na internetu, které máš opravdu pod kontrolou.',
          ctaType: 'question',
          cta: 'Kolik tvých sledujících vidí tvoje posty?',
        },
        {
          title: 'Na Googlu se ztratíš',
          body: 'Kdo hledá službu ve vyhledávači, najde nejdřív weby. Profil na sociální síti se mezi výsledky snadno ztratí.',
          ctaType: 'save',
          cta: 'Ulož si to pro chvíli, kdy budeš váhat.',
        },
        {
          title: 'Sítě přivedou, web prodá',
          body: 'Sítě přinesou pozornost, web ji promění v poptávku. Odkaz v biu by měl vést tam, kde se dá rovnou objednat.',
          ctaType: 'comment',
          cta: 'Kam ti vede odkaz v biu? Napiš do komentářů.',
        },
      ],
      promo: {
        title: 'Sítě přivedou lidi. Web je *promění* v zákazníky.',
        body: 'Postavíme ti web, na který můžeš s klidem posílat lidi z Instagramu.',
        cta: 'Napiš *BIO* do komentáře a poradíme ti, kam by měl vést tvůj odkaz.',
      },
    },
  ],
};
