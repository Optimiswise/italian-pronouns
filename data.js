
// Categories for semantic checking
const TAGS = {
    ANY: 'any',
    FOOD: 'food',
    DRINK: 'drink',
    READABLE: 'readable',
    WEARABLE: 'wearable',
    PLACE: 'place',
    PERSON: 'person',
    OBJECT: 'object' // generic small object
};

// Common regular conjugation patterns
// -ARE: o, i, a, iamo, ate, ano
// -ERE: o, i, e, iamo, ete, ono
// -IRE: o, i, e, iamo, ite, ono

const VERB_DATA = [
    // ESSENTIALS
    { inf: 'mangiare', roots: ['mangio', 'mangi', 'mangia', 'mangiamo', 'mangiate', 'mangiano'], tags: [TAGS.FOOD] },
    { inf: 'bere', roots: ['bevo', 'bevi', 'beve', 'beviamo', 'bevete', 'bevono'], tags: [TAGS.DRINK] },
    { inf: 'leggere', roots: ['leggo', 'leggi', 'legge', 'leggiamo', 'leggete', 'leggono'], tags: [TAGS.READABLE] },
    { inf: 'scrivere', roots: ['scrivo', 'scrivi', 'scrive', 'scriviamo', 'scrivete', 'scrivono'], tags: [TAGS.READABLE] },
    { inf: 'vedere', roots: ['vedo', 'vedi', 'vede', 'vediamo', 'vedete', 'vedono'], tags: [TAGS.ANY] },
    { inf: 'comprare', roots: ['compro', 'compri', 'compra', 'compriamo', 'comprate', 'comprano'], tags: [TAGS.OBJECT, TAGS.FOOD, TAGS.WEARABLE, TAGS.READABLE] },
    { inf: 'cercare', roots: ['cerco', 'cerchi', 'cerca', 'cerchiamo', 'cercate', 'cercano'], tags: [TAGS.ANY] },
    { inf: 'trovare', roots: ['trovo', 'trovi', 'trova', 'troviamo', 'trovate', 'trovano'], tags: [TAGS.ANY] },
    
    // GIVING / TRANSFERRING (Good for indirect objects)
    { inf: 'dare', roots: ['do', 'dai', 'dà', 'diamo', 'date', 'danno'], tags: [TAGS.ANY] },
    { inf: 'regalare', roots: ['regalo', 'regali', 'regala', 'regaliamo', 'regalate', 'regalano'], tags: [TAGS.OBJECT, TAGS.WEARABLE, TAGS.READABLE] },
    { inf: 'mandare', roots: ['mando', 'mandi', 'manda', 'mandiamo', 'mandate', 'mandano'], tags: [TAGS.READABLE, TAGS.OBJECT] },
    { inf: 'inviare', roots: ['invio', 'invii', 'invia', 'inviamo', 'inviate', 'inviano'], tags: [TAGS.READABLE, TAGS.OBJECT] },
    { inf: 'portare', roots: ['porto', 'porti', 'porta', 'portiamo', 'portate', 'portano'], tags: [TAGS.OBJECT, TAGS.FOOD, TAGS.DRINK] },
    { inf: 'chiedere', roots: ['chiedo', 'chiedi', 'chiede', 'chiediamo', 'chiedete', 'chiedono'], tags: [TAGS.OBJECT, TAGS.READABLE, TAGS.FOOD] },
    { inf: 'offrire', roots: ['offro', 'offri', 'offre', 'offriamo', 'offrite', 'offrono'], tags: [TAGS.FOOD, TAGS.DRINK] },
    { inf: 'mostrare', roots: ['mostro', 'mostri', 'mostra', 'mostriamo', 'mostrate', 'mostrano'], tags: [TAGS.ANY] },
    { inf: 'prestare', roots: ['presto', 'presti', 'presta', 'prestiamo', 'prestate', 'prestano'], tags: [TAGS.OBJECT, TAGS.READABLE, TAGS.WEARABLE] },
    { inf: 'rubare', roots: ['rubo', 'rubi', 'ruba', 'rubiamo', 'rubate', 'rubano'], tags: [TAGS.OBJECT, TAGS.WEARABLE] },
    
    // OTHER ACTIONS
    { inf: 'amare', roots: ['amo', 'ami', 'ama', 'amiamo', 'amate', 'amano'], tags: [TAGS.PERSON, TAGS.OBJECT] },
    { inf: 'odiare', roots: ['odio', 'odii', 'odia', 'odiamo', 'odiate', 'odiano'], tags: [TAGS.PERSON, TAGS.OBJECT] },
    { inf: 'conoscere', roots: ['conosco', 'conosci', 'conosce', 'conosciamo', 'conoscete', 'conoscono'], tags: [TAGS.PERSON, TAGS.PLACE] },
    { inf: 'aprire', roots: ['apro', 'apri', 'apre', 'apriamo', 'aprite', 'aprono'], tags: [TAGS.OBJECT, TAGS.READABLE] },
    { inf: 'chiudere', roots: ['chiudo', 'chiudi', 'chiude', 'chiudiamo', 'chiudete', 'chiudono'], tags: [TAGS.OBJECT, TAGS.READABLE] },
    { inf: 'finire', roots: ['finisco', 'finisci', 'finisce', 'finiamo', 'finite', 'finiscono'], tags: [TAGS.FOOD, TAGS.READABLE] },
    { inf: 'preparare', roots: ['preparo', 'prepari', 'prepara', 'prepariamo', 'preparate', 'preparano'], tags: [TAGS.FOOD, TAGS.DRINK] },
    { inf: 'chiamare', roots: ['chiamo', 'chiami', 'chiama', 'chiamiamo', 'chiamate', 'chiamano'], tags: [TAGS.PERSON] },
    { inf: 'incontrare', roots: ['incontro', 'incontri', 'incontra', 'incontriamo', 'incontrate', 'incontrano'], tags: [TAGS.PERSON] },
    { inf: 'ascoltare', roots: ['ascolto', 'ascolti', 'ascolta', 'ascoltiamo', 'ascoltate', 'ascoltano'], tags: [TAGS.PERSON, TAGS.READABLE] }, // Song/Music fits readable logic roughly or add AUDIO
    { inf: 'aspettare', roots: ['aspetto', 'aspetti', 'aspetta', 'aspettiamo', 'aspettate', 'aspettano'], tags: [TAGS.PERSON, TAGS.OBJECT] },
    { inf: 'baciare', roots: ['bacio', 'baci', 'bacia', 'baciamo', 'baciate', 'baciano'], tags: [TAGS.PERSON] },
    { inf: 'pulire', roots: ['pulisco', 'pulisci', 'pulisce', 'puliamo', 'pulite', 'puliscono'], tags: [TAGS.PLACE, TAGS.OBJECT] },
    { inf: 'rompere', roots: ['rompo', 'rompi', 'rompe', 'rompiamo', 'rompete', 'rompono'], tags: [TAGS.OBJECT] },
    { inf: 'tagliare', roots: ['taglio', 'tagli', 'taglia', 'tagliamo', 'tagliate', 'tagliano'], tags: [TAGS.FOOD, TAGS.OBJECT] },
    { inf: 'studiare', roots: ['studio', 'studi', 'studia', 'studiamo', 'studiate', 'studiano'], tags: [TAGS.READABLE] },
    { inf: 'imparare', roots: ['imparo', 'impari', 'impara', 'impariamo', 'imparate', 'imparano'], tags: [TAGS.READABLE] },
    { inf: 'dimenticare', roots: ['dimentico', 'dimentichi', 'dimentica', 'dimentichiamo', 'dimenticate', 'dimenticano'], tags: [TAGS.ANY] },
    { inf: 'salutare', roots: ['saluto', 'saluti', 'saluta', 'salutiamo', 'salutate', 'salutano'], tags: [TAGS.PERSON] },
    { inf: 'aiutare', roots: ['aiuto', 'aiuti', 'aiuta', 'aiutiamo', 'aiutate', 'aiutano'], tags: [TAGS.PERSON] },
    { inf: 'guardare', roots: ['guardo', 'guardi', 'guarda', 'guardiamo', 'guardate', 'guardano'], tags: [TAGS.ANY] },
    { inf: 'toccare', roots: ['tocco', 'tocchi', 'tocca', 'tocciano', 'toccate', 'toccano'], tags: [TAGS.OBJECT, TAGS.PERSON] },
    
    // FILLERS
    { inf: 'usare', roots: ['uso', 'usi', 'usa', 'usiamo', 'usate', 'usano'], tags: [TAGS.OBJECT] },
    { inf: 'volere', roots: ['voglio', 'vuoi', 'vuole', 'vogliamo', 'volete', 'vogliono'], tags: [TAGS.ANY] }
];

const NOUN_DATA = [
    // FOOD & DRINK
    { word: 'la mela', gender: 'f', plural: false, tag: TAGS.FOOD },
    { word: 'il pane', gender: 'm', plural: false, tag: TAGS.FOOD },
    { word: 'la pizza', gender: 'f', plural: false, tag: TAGS.FOOD },
    { word: 'il vino', gender: 'm', plural: false, tag: TAGS.DRINK },
    { word: 'l\'acqua', gender: 'f', plural: false, tag: TAGS.DRINK },
    { word: 'gli spaghetti', gender: 'm', plural: true, tag: TAGS.FOOD },
    { word: 'il caffè', gender: 'm', plural: false, tag: TAGS.DRINK },
    { word: 'la birra', gender: 'f', plural: false, tag: TAGS.DRINK },
    { word: 'i panini', gender: 'm', plural: true, tag: TAGS.FOOD },
    { word: 'le verdure', gender: 'f', plural: true, tag: TAGS.FOOD },

    // READABLE / MEDIA
    { word: 'il libro', gender: 'm', plural: false, tag: TAGS.READABLE },
    { word: 'la lettera', gender: 'f', plural: false, tag: TAGS.READABLE },
    { word: 'il giornale', gender: 'm', plural: false, tag: TAGS.READABLE },
    { word: 'l\'email', gender: 'f', plural: false, tag: TAGS.READABLE },
    { word: 'i messaggi', gender: 'm', plural: true, tag: TAGS.READABLE },
    { word: 'la storia', gender: 'f', plural: false, tag: TAGS.READABLE },
    
    // WEARABLE
    { word: 'la maglietta', gender: 'f', plural: false, tag: TAGS.WEARABLE },
    { word: 'il cappello', gender: 'm', plural: false, tag: TAGS.WEARABLE },
    { word: 'le scarpe', gender: 'f', plural: true, tag: TAGS.WEARABLE },
    { word: 'i pantaloni', gender: 'm', plural: true, tag: TAGS.WEARABLE },
    { word: 'il vestito', gender: 'm', plural: false, tag: TAGS.WEARABLE },
    
    // OBJECTS
    { word: 'la chiave', gender: 'f', plural: false, tag: TAGS.OBJECT },
    { word: 'le chiavi', gender: 'f', plural: true, tag: TAGS.OBJECT },
    { word: 'il telefono', gender: 'm', plural: false, tag: TAGS.OBJECT },
    { word: 'la macchina', gender: 'f', plural: false, tag: TAGS.OBJECT },
    { word: 'i soldi', gender: 'm', plural: true, tag: TAGS.OBJECT },
    { word: 'il regalo', gender: 'm', plural: false, tag: TAGS.OBJECT },
    { word: 'la penna', gender: 'f', plural: false, tag: TAGS.OBJECT },
    { word: 'il computer', gender: 'm', plural: false, tag: TAGS.OBJECT },
    { word: 'le foto', gender: 'f', plural: true, tag: TAGS.OBJECT },
    { word: 'il biglietto', gender: 'm', plural: false, tag: TAGS.OBJECT },

    // PERSONS
    { word: 'il ragazzo', gender: 'm', plural: false, tag: TAGS.PERSON },
    { word: 'la ragazza', gender: 'f', plural: false, tag: TAGS.PERSON },
    { word: 'i bambini', gender: 'm', plural: true, tag: TAGS.PERSON },
    { word: 'il dottore', gender: 'm', plural: false, tag: TAGS.PERSON },
    { word: 'gli amici', gender: 'm', plural: true, tag: TAGS.PERSON },
    
    // PLACES
    { word: 'la casa', gender: 'f', plural: false, tag: TAGS.PLACE },
    { word: 'il ristorante', gender: 'm', plural: false, tag: TAGS.PLACE },
    { word: 'la scuola', gender: 'f', plural: false, tag: TAGS.PLACE },
    { word: 'l\'ufficio', gender: 'm', plural: false, tag: TAGS.PLACE }
];
