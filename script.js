/**
 * Italian Practice Logic
 */

// SUBJECTS
const SUBJECTS = [
    { label: 'Io', index: 0 },
    { label: 'Tu', index: 1 },
    { label: 'Lui/Lei', index: 2 }, // Using standard 3rd person singular grouping
    { label: 'Noi', index: 3 },
    { label: 'Voi', index: 4 },
    { label: 'Loro', index: 5 }
];

const INDIRECT_PRONOUNS = [
    { person: '1s', value: 'mi', label: 'a me' },
    { person: '2s', value: 'ti', label: 'a te' },
    { person: '3s', value: 'gli', label: 'a lui' },
    { person: '3s_fem', value: 'le', label: 'a lei' },
    { person: '1p', value: 'ci', label: 'a noi' },
    { person: '2p', value: 'vi', label: 'a voi' },
    // Excluding 'loro' (3p post-verbal) for the pronominal particle game as requested previously
];

// --- GRAMMAR ENGINE ---

function getDirectPronoun(noun) {
    if (noun.plural) {
        return noun.gender === 'm' 
            ? { person: '3p', value: 'li' }
            : { person: '3p_fem', value: 'le' };
    } else {
        return noun.gender === 'm'
            ? { person: '3s', value: 'lo' }
            : { person: '3s_fem', value: 'la' };
    }
}

function combinePronouns(indirect, direct) {
    const indVal = indirect.value;
    const dirVal = direct.value;

    const transformMap = {
        'mi': 'me',
        'ti': 'te',
        'ci': 'ce',
        'vi': 've'
    };

    // Rule for 3rd person singulars (gli/le) -> glie
    if (indirect.person === '3s' || indirect.person === '3s_fem') {
        return `glie${dirVal}`;
    }

    if (transformMap[indVal]) {
        return `${transformMap[indVal]} ${dirVal}`;
    }

    return `${indVal} ${dirVal}`;
}

// Probabilistic Selection
function pickVerbTier() {
    const r = Math.random();
    if (r < 0.80) return TIERS.UNIVERSAL;
    if (r < 0.95) return TIERS.SEMI;
    return TIERS.SPECIFIC;
}

function generateExercise() {
    let verb, noun, subject;
    
    // 1. Decide Tier
    const tier = pickVerbTier();
    const candidateVerbs = VERB_DATA.filter(v => v.tier === tier);
    
    // 2. Pick Verb
    verb = candidateVerbs[Math.floor(Math.random() * candidateVerbs.length)];
    
    // 3. Pick Noun compatible with Verb
    let candidateNouns;
    if (tier === TIERS.SPECIFIC) {
        // Must match tag
        candidateNouns = NOUN_DATA.filter(n => n.tag === verb.reqTag);
    } else {
        // Universal/Semi: Accept ANY noun (as per requirements)
        candidateNouns = NOUN_DATA;
    }
    
    // Fallback if no specific nouns found (shouldn't happen with current data but good practice)
    if (candidateNouns.length === 0) candidateNouns = NOUN_DATA;

    noun = candidateNouns[Math.floor(Math.random() * candidateNouns.length)];

    const indirect = INDIRECT_PRONOUNS[Math.floor(Math.random() * INDIRECT_PRONOUNS.length)];
    subject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    
    const directPronoun = getDirectPronoun(noun);
    const combined = combinePronouns(indirect, directPronoun);
    
    // Get conjugated verb based on subject index (0-5)
    // verb.roots is an array of [p1s, p2s, p3s, p1p, p2p, p3p]
    const conjugatedVerb = verb.roots[subject.index];
    
    const expectedAnswer = `${combined} ${conjugatedVerb}`;
    
    return {
        subject: subject.label,
        verb: verb,
        indirect: indirect,
        noun: noun,
        expectedAnswer: expectedAnswer
    };
}

// --- UI CONTROLLER ---

class GameController {
    constructor() {
        this.currentExercise = null;
        this.score = 0;
        
        // Elements
        this.elPuzzle = document.getElementById('puzzle-area');
        this.elInput = document.getElementById('answer-input');
        this.elFeedback = document.getElementById('feedback');
        this.elFeedbackText = document.getElementById('feedback-text');
        this.elFeedbackIcon = document.getElementById('feedback-icon');
        this.btnCheck = document.getElementById('check-btn');
        this.btnNext = document.getElementById('next-btn');
        this.elScore = document.getElementById('score');

        // Bindings
        this.btnCheck.addEventListener('click', () => this.checkAnswer());
        this.btnNext.addEventListener('click', () => this.nextExercise());
        this.elInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkAnswer();
        });

        // Init
        this.nextExercise();
    }

    renderCard(text, type) {
        return `<div class="card ${type}">${text}</div>`;
    }

    nextExercise() {
        this.currentExercise = generateExercise();
        const ex = this.currentExercise;

        // Reset UI
        this.elInput.value = '';
        this.elInput.disabled = false;
        this.elInput.classList.remove('correct', 'incorrect');
        this.elFeedback.classList.add('hidden');
        this.elFeedback.classList.remove('success', 'error');
        this.btnCheck.classList.remove('hidden');
        this.btnNext.classList.add('hidden');
        this.elInput.focus();

        // Render Cards
        this.elPuzzle.innerHTML = `
            ${this.renderCard(ex.subject, 'subject')}
            ${this.renderCard(`(${ex.verb.inf})`, 'verb')}
            <div class="icon-arrow">➜</div>
            ${this.renderCard(ex.indirect.label, 'indirect')}
            ${this.renderCard(ex.noun.word, 'direct')}
        `;
    }

    checkAnswer() {
        if (this.elInput.disabled) return;

        const userVal = this.elInput.value.trim().toLowerCase().replace(/\s+/g, ' ');
        const correctVal = this.currentExercise.expectedAnswer.toLowerCase();
        
        // Handle Subject prefix variations if user types "Io ve la offro" vs "ve la offro"
        // Also handle "Lui/Lei" special case in label
        let subjectStr = this.currentExercise.subject.toLowerCase();
        if (subjectStr === 'lui/lei') subjectStr = 'lui'; // simplification
        
        // Construct array of valid prefix variants
        const validPrefixes = [
            subjectStr,
            this.currentExercise.subject.toLowerCase() // covers "noi", "voi" etc
        ];
        
        // If subject is Lui/Lei, allow "lui", "lei", or "egli/ella"
        if (this.currentExercise.subject === 'Lui/Lei') {
            validPrefixes.push('lei');
            validPrefixes.push('egli');
        }

        const altCorrectList = validPrefixes.map(p => `${p} ${correctVal}`);
        
        // Exact match or match with any subject prefix
        const isCorrect = (userVal === correctVal) || altCorrectList.includes(userVal);

        this.elInput.disabled = true;
        this.btnCheck.classList.add('hidden');
        this.btnNext.classList.remove('hidden');
        this.elFeedback.classList.remove('hidden');

        if (isCorrect) {
            this.handleSuccess();
        } else {
            this.handleFailure(correctVal);
        }
        
        // Auto-focus next button
        this.btnNext.focus();
    }

    handleSuccess() {
        this.score++;
        this.elScore.innerText = this.score;
        this.elInput.classList.add('correct');
        this.elFeedback.classList.add('success');
        this.elFeedbackIcon.innerText = '✓';
        this.elFeedbackText.innerText = 'Correct!';
    }

    handleFailure(correctAnswer) {
        this.elInput.classList.add('incorrect');
        this.elFeedback.classList.add('error');
        this.elFeedbackIcon.innerText = '✗';
        this.elFeedbackText.innerText = `Expected: "${correctAnswer}"`;
    }
}

// Start Game
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Ready. Starting Italian App...');
    const game = new GameController();
});
