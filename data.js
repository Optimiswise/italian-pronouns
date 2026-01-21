
// Tiers based on strictness of semantic requirements
const TIERS = {
    UNIVERSAL: 1, // Works with almost any object (dare, mandare)
    SEMI: 2,      // Works with most physical objects (comprare, trovare)
    SPECIFIC: 3   // Requires specific semantic matches (mangiare, leggere)
};

const TAGS = {
    FOOD: 'food',
    DRINK: 'drink',
    READABLE: 'readable'
};

const VERB_DATA = [
    // TIER 1: UNIVERSAL (The workhorses)
    // Supports Indirect Objects freely.
    { inf: 'dare', tier: TIERS.UNIVERSAL, roots: ['do', 'dai', 'dà', 'diamo', 'date', 'danno'] },
    { inf: 'mandare', tier: TIERS.UNIVERSAL, roots: ['mando', 'mandi', 'manda', 'mandiamo', 'mandate', 'mandano'] },
    { inf: 'portare', tier: TIERS.UNIVERSAL, roots: ['porto', 'porti', 'porta', 'portiamo', 'portate', 'portano'] },
    { inf: 'passare', tier: TIERS.UNIVERSAL, roots: ['passo', 'passi', 'passa', 'passiamo', 'passate', 'passano'] },
    { inf: 'mostrare', tier: TIERS.UNIVERSAL, roots: ['mostro', 'mostri', 'mostra', 'mostriamo', 'mostrate', 'mostrano'] },
    { inf: 'offrire', tier: TIERS.UNIVERSAL, roots: ['offro', 'offri', 'offre', 'offriamo', 'offrite', 'offrono'] },
    { inf: 'rubare', tier: TIERS.UNIVERSAL, roots: ['rubo', 'rubi', 'ruba', 'rubiamo', 'rubate', 'rubano'] },
    { inf: 'restituire', tier: TIERS.UNIVERSAL, roots: ['restituisco', 'restituisci', 'restituisce', 'restituiamo', 'restituite', 'restituiscono'] },

    // TIER 2: SEMI-UNIVERSAL
    // Works with most nouns, maybe slightly odd with abstract concepts but grammatically fine.
    { inf: 'comprare', tier: TIERS.SEMI, roots: ['compro', 'compri', 'compra', 'compriamo', 'comprate', 'comprano'] },
    { inf: 'trovare', tier: TIERS.SEMI, roots: ['trovo', 'trovi', 'trova', 'troviamo', 'trovate', 'trovano'] },
    { inf: 'cercare', tier: TIERS.SEMI, roots: ['cerco', 'cerchi', 'cerca', 'cerchiamo', 'cercate', 'cercano'] },
    { inf: 'preparare', tier: TIERS.SEMI, roots: ['preparo', 'prepari', 'prepara', 'prepariamo', 'preparate', 'preparano'] },
    { inf: 'usare', tier: TIERS.SEMI, roots: ['uso', 'usi', 'usa', 'usiamo', 'usate', 'usano'] },
    { inf: 'rompere', tier: TIERS.SEMI, roots: ['rompo', 'rompi', 'rompe', 'rompiamo', 'rompete', 'rompono'] },

    // TIER 3: SPECIFIC (Semantic constraints)
    // These should only trigger if we pick a compatible noun.
    { inf: 'mangiare', tier: TIERS.SPECIFIC, reqTag: TAGS.FOOD, roots: ['mangio', 'mangi', 'mangia', 'mangiamo', 'mangiate', 'mangiano'] },
    { inf: 'bere', tier: TIERS.SPECIFIC, reqTag: TAGS.DRINK, roots: ['bevo', 'bevi', 'beve', 'beviamo', 'bevete', 'bevono'] },
    { inf: 'leggere', tier: TIERS.SPECIFIC, reqTag: TAGS.READABLE, roots: ['leggo', 'leggi', 'legge', 'leggiamo', 'leggete', 'leggono'] },
    { inf: 'scrivere', tier: TIERS.SPECIFIC, reqTag: TAGS.READABLE, roots: ['scrivo', 'scrivi', 'scrive', 'scriviamo', 'scrivete', 'scrivono'] },
    { inf: 'studiare', tier: TIERS.SPECIFIC, reqTag: TAGS.READABLE, roots: ['studio', 'studi', 'studia', 'studiamo', 'studiate', 'studiano'] },
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

    // READABLE
    { word: 'il libro', gender: 'm', plural: false, tag: TAGS.READABLE },
    { word: 'la lettera', gender: 'f', plural: false, tag: TAGS.READABLE },
    { word: 'il giornale', gender: 'm', plural: false, tag: TAGS.READABLE },
    { word: 'l\'email', gender: 'f', plural: false, tag: TAGS.READABLE },
    { word: 'i messaggi', gender: 'm', plural: true, tag: TAGS.READABLE },

    // GENERAL OBJECTS (No strict tag needed, work with Tier 1/2)
    { word: 'la chiave', gender: 'f', plural: false },
    { word: 'le chiavi', gender: 'f', plural: true },
    { word: 'il telefono', gender: 'm', plural: false },
    { word: 'la macchina', gender: 'f', plural: false },
    { word: 'i soldi', gender: 'm', plural: true },
    { word: 'il regalo', gender: 'm', plural: false },
    { word: 'la penna', gender: 'f', plural: false },
    { word: 'il computer', gender: 'm', plural: false },
    { word: 'la maglietta', gender: 'f', plural: false },
    { word: 'il cappello', gender: 'm', plural: false }
];
