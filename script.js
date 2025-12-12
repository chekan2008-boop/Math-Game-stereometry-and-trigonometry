// ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==========
let game = {
    score: 0,
    level: 1,
    currentQuestion: 1,
    correctAnswers: 0,
    hintsLeft: 3,
    difficulty: 'easy',
    gameMode: 10, // 10 или 20 вопросов
    currentCategory: '',
    correctStreak: 0,
    totalQuestions: 0,
    questionPool: [], // Пул вопросов для текущей игры
    usedQuestions: new Set(), // Использованные вопросы
    selectedCategory: 'both',
};

// ========== ЭЛЕМЕНТЫ DOM ==========
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const menuBtn = document.getElementById('menu-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const hintBtn = document.getElementById('hint-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const mainMenuBtn = document.getElementById('main-menu-btn');
const diffButtons = document.querySelectorAll('.diff-btn');
const modeButtons = document.querySelectorAll('.mode-btn');
const catButtons = document.querySelectorAll('.cat-btn');
const hintModal = document.getElementById('hint-modal');
const closeModal = document.querySelector('.close-modal');
const hintContent = document.getElementById('hint-content');

// ========== ЭЛЕМЕНТЫ ДЛЯ ОТОБРАЖЕНИЯ ==========
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const questionNumElement = document.getElementById('question-num');
const correctElement = document.getElementById('correct');
const hintsCountElement = document.getElementById('hints-count');
const categoryTag = document.getElementById('category-tag');
const categoryName = document.getElementById('category-name');
const questionText = document.getElementById('question-text');
const formulaBox = document.getElementById('formula-box');
const diagramBox = document.getElementById('diagram-box');
const answersContainer = document.getElementById('answers-container');
const feedback = document.getElementById('feedback');
const hintTextElement = document.getElementById('hint-text');
const finalScoreElement = document.getElementById('final-score');
const finalLevelElement = document.getElementById('final-level');
const finalCorrectElement = document.getElementById('final-correct');
const finalTotalElement = document.getElementById('final-total');
const resultMessage = document.getElementById('result-message');

// ========== БАЗА ВОПРОСОВ (БЕЗ ПРОИЗВОЛЬНЫХ УГЛОВ) ==========
const questions = {
    trigonometry: {
        easy: [
            // Основные значения углов (0°, 30°, 45°, 60°, 90°)
            {
                question: "Чему равен sin(0°)?",
                answers: ["0", "1", "0.5", "√2/2"],
                correct: "0",
                formula: "sin(0°) = 0",
                hint: "При угле 0° синус равен 0",
                explanation: "Синус нулевого угла равен 0, так как противолежащий катет отсутствует."
            },
            {
                question: "Чему равен sin(30°)?",
                answers: ["0.5", "√3/2", "1", "0"],
                correct: "0.5",
                formula: "sin(30°) = 1/2 = 0.5",
                hint: "Запомните: sin(30°) = 1/2",
                explanation: "В прямоугольном треугольнике с углом 30° противолежащий катет равен половине гипотенузы."
            },
            {
                question: "Чему равен sin(45°)?",
                answers: ["√2/2", "0.5", "1", "√3/2"],
                correct: "√2/2",
                formula: "sin(45°) = √2/2 ≈ 0.707",
                hint: "sin(45°) = cos(45°) = √2/2",
                explanation: "В равнобедренном прямоугольном треугольнике катеты равны, поэтому sin(45°) = cos(45°) = √2/2."
            },
            {
                question: "Чему равен sin(60°)?",
                answers: ["√3/2", "0.5", "1", "√2/2"],
                correct: "√3/2",
                formula: "sin(60°) = √3/2 ≈ 0.866",
                hint: "sin(60°) = cos(30°) = √3/2",
                explanation: "В равностороннем треугольнике, разделенном на два прямоугольных, sin(60°) = √3/2."
            },
            {
                question: "Чему равен sin(90°)?",
                answers: ["1", "0", "0.5", "√2/2"],
                correct: "1",
                formula: "sin(90°) = 1",
                hint: "sin(90°) - максимальное значение",
                explanation: "При угле 90° противолежащий катет равен гипотенузе, поэтому sin(90°) = 1."
            },
            {
                question: "Чему равен cos(0°)?",
                answers: ["1", "0", "0.5", "√2/2"],
                correct: "1",
                formula: "cos(0°) = 1",
                hint: "cos(0°) = 1",
                explanation: "При угле 0° прилежащий катет равен гипотенузе, поэтому cos(0°) = 1."
            },
            {
                question: "Чему равен cos(30°)?",
                answers: ["√3/2", "0.5", "1", "√2/2"],
                correct: "√3/2",
                formula: "cos(30°) = √3/2 ≈ 0.866",
                hint: "cos(30°) = sin(60°) = √3/2",
                explanation: "В треугольнике с углами 30°-60°-90° cos(30°) = √3/2."
            },
            {
                question: "Чему равен cos(45°)?",
                answers: ["√2/2", "0.5", "1", "√3/2"],
                correct: "√2/2",
                formula: "cos(45°) = √2/2 ≈ 0.707",
                hint: "cos(45°) = sin(45°) = √2/2",
                explanation: "В равнобедренном прямоугольном треугольнике cos(45°) = sin(45°) = √2/2."
            },
            {
                question: "Чему равен cos(60°)?",
                answers: ["0.5", "√3/2", "1", "√2/2"],
                correct: "0.5",
                formula: "cos(60°) = 1/2 = 0.5",
                hint: "cos(60°) = sin(30°) = 0.5",
                explanation: "cos(60°) равен половине, так как при угле 60° прилежащий катет в 2 раза меньше гипотенузы."
            },
            {
                question: "Чему равен cos(90°)?",
                answers: ["0", "1", "0.5", "√2/2"],
                correct: "0",
                formula: "cos(90°) = 0",
                hint: "cos(90°) = 0",
                explanation: "При угле 90° прилежащий катет равен 0, поэтому cos(90°) = 0."
            },

            // Тангенсы основных углов
            {
                question: "Чему равен tg(0°)?",
                answers: ["0", "1", "не существует", "∞"],
                correct: "0",
                formula: "tg(0°) = sin(0°)/cos(0°) = 0/1 = 0",
                hint: "tg(0°) = 0",
                explanation: "tg(0°) = sin(0°)/cos(0°) = 0/1 = 0."
            },
            {
                question: "Чему равен tg(30°)?",
                answers: ["√3/3", "√3", "1", "0.5"],
                correct: "√3/3",
                formula: "tg(30°) = sin(30°)/cos(30°) = (1/2)/(√3/2) = 1/√3 = √3/3",
                hint: "tg(30°) = √3/3 ≈ 0.577",
                explanation: "tg(30°) = sin(30°)/cos(30°) = (1/2)/(√3/2) = 1/√3 = √3/3."
            },
            {
                question: "Чему равен tg(45°)?",
                answers: ["1", "√3", "0", "∞"],
                correct: "1",
                formula: "tg(45°) = sin(45°)/cos(45°) = (√2/2)/(√2/2) = 1",
                hint: "tg(45°) = 1",
                explanation: "Так как sin(45°) = cos(45°), их отношение равно 1."
            },
            {
                question: "Чему равен tg(60°)?",
                answers: ["√3", "√3/3", "1", "0"],
                correct: "√3",
                formula: "tg(60°) = sin(60°)/cos(60°) = (√3/2)/(1/2) = √3",
                hint: "tg(60°) = √3 ≈ 1.732",
                explanation: "tg(60°) = sin(60°)/cos(60°) = (√3/2)/(1/2) = √3."
            },
            {
                question: "Чему равен tg(90°)?",
                answers: ["не существует", "0", "1", "∞"],
                correct: "не существует",
                formula: "tg(90°) = sin(90°)/cos(90°) = 1/0 → не существует",
                hint: "tg(90°) не существует",
                explanation: "tg(90°) = 1/0, деление на ноль невозможно."
            },

            // Основные тождества и свойства
            {
                question: "Чему равно sin²α + cos²α?",
                answers: ["1", "0", "sin(2α)", "2sinαcosα"],
                correct: "1",
                formula: "Основное тригонометрическое тождество: sin²α + cos²α = 1",
                hint: "Это основное тригонометрическое тождество",
                explanation: "Тождество следует из теоремы Пифагора для единичной окружности."
            },
            {
                question: "Чему равно 1 + tg²α?",
                answers: ["1/cos²α", "1/sin²α", "cos²α", "sin²α"],
                correct: "1/cos²α",
                formula: "1 + tg²α = 1/cos²α",
                hint: "1 + tg²α = 1/cos²α",
                explanation: "Это тождество следует из основного тождества, разделенного на cos²α."
            },
            {
                question: "Чему равно 1 + ctg²α?",
                answers: ["1/sin²α", "1/cos²α", "tg²α", "cos²α"],
                correct: "1/sin²α",
                formula: "1 + ctg²α = 1/sin²α",
                hint: "1 + ctg²α = 1/sin²α",
                explanation: "Это тождество следует из основного тождества, разделенного на sin²α."
            },

            // Формулы приведения (180°-α)
            {
                question: "Чему равен sin(180°-α)?",
                answers: ["sinα", "-sinα", "cosα", "-cosα"],
                correct: "sinα",
                formula: "sin(180°-α) = sinα",
                hint: "Формула приведения: sin(180°-α) = sinα",
                explanation: "Во второй четверти синус положительный и равен синусу дополнительного угла."
            },
            {
                question: "Чему равен cos(180°-α)?",
                answers: ["-cosα", "cosα", "sinα", "-sinα"],
                correct: "-cosα",
                formula: "cos(180°-α) = -cosα",
                hint: "Формула приведения: cos(180°-α) = -cosα",
                explanation: "Во второй четверти косинус отрицательный и равен минус косинусу дополнительного угла."
            },

            // Простые уравнения
            {
                question: "Решите: sin x = 0",
                answers: ["0° и 180°", "90°", "45°", "60°"],
                correct: "0° и 180°",
                formula: "sin x = 0 ⇒ x = 0° + 180°k",
                hint: "sin x = 0 при x = 0° и x = 180°",
                explanation: "Синус равен нулю на границах четвертей."
            },
            {
                question: "Решите: cos x = 0",
                answers: ["90° и 270°", "0°", "45°", "180°"],
                correct: "90° и 270°",
                formula: "cos x = 0 ⇒ x = 90° + 180°k",
                hint: "cos x = 0 при x = 90° и x = 270°",
                explanation: "Косинус равен нулю в серединах четвертей."
            },
            {
                question: "Решите: sin x = 1",
                answers: ["90°", "0°", "45°", "180°"],
                correct: "90°",
                formula: "sin x = 1 ⇒ x = 90° + 360°k",
                hint: "sin x = 1 только при x = 90°",
                explanation: "Максимальное значение синуса равно 1 только при 90°."
            },
            {
                question: "Решите: cos x = 1",
                answers: ["0°", "90°", "180°", "360°"],
                correct: "0°",
                formula: "cos x = 1 ⇒ x = 0° + 360°k",
                hint: "cos x = 1 только при x = 0°",
                explanation: "Максимальное значение косинуса равно 1 только при 0°."
            },
            {
                question: "Решите: tg x = 1",
                answers: ["45° и 225°", "30°", "60°", "90°"],
                correct: "45° и 225°",
                formula: "tg x = 1 ⇒ x = 45° + 180°k",
                hint: "tg x = 1 при x = 45° и 225°",
                explanation: "Тангенс равен 1 когда sin x = cos x, то есть при 45° и через полпериода."
            },

            // Значения углов с формулами приведения
            {
                question: "Чему равен sin(120°)?",
                answers: ["√3/2", "0.5", "-0.5", "-√3/2"],
                correct: "√3/2",
                formula: "sin(120°) = sin(180°-60°) = sin60° = √3/2",
                hint: "sin(120°) = sin(60°) = √3/2",
                explanation: "120° находится во второй четверти, где синус положительный."
            },
            {
                question: "Чему равен cos(120°)?",
                answers: ["-0.5", "0.5", "-√3/2", "√3/2"],
                correct: "-0.5",
                formula: "cos(120°) = cos(180°-60°) = -cos60° = -0.5",
                hint: "cos(120°) = -cos(60°) = -0.5",
                explanation: "120° находится во второй четверти, где косинус отрицательный."
            },
            {
                question: "Чему равен sin(135°)?",
                answers: ["√2/2", "-√2/2", "0.5", "-0.5"],
                correct: "√2/2",
                formula: "sin(135°) = sin(180°-45°) = sin45° = √2/2",
                hint: "sin(135°) = sin(45°) = √2/2",
                explanation: "135° находится во второй четверти, синус положительный."
            },
            {
                question: "Чему равен cos(135°)?",
                answers: ["-√2/2", "√2/2", "-0.5", "0.5"],
                correct: "-√2/2",
                formula: "cos(135°) = cos(180°-45°) = -cos45° = -√2/2",
                hint: "cos(135°) = -cos(45°) = -√2/2",
                explanation: "135° находится во второй четверти, косинус отрицательный."
            },
            {
                question: "Чему равен sin(150°)?",
                answers: ["0.5", "-0.5", "√3/2", "-√3/2"],
                correct: "0.5",
                formula: "sin(150°) = sin(180°-30°) = sin30° = 0.5",
                hint: "sin(150°) = sin(30°) = 0.5",
                explanation: "150° находится во второй четверти, синус положительный."
            },
            {
                question: "Чему равен cos(150°)?",
                answers: ["-√3/2", "√3/2", "-0.5", "0.5"],
                correct: "-√3/2",
                formula: "cos(150°) = cos(180°-30°) = -cos30° = -√3/2",
                hint: "cos(150°) = -cos(30°) = -√3/2",
                explanation: "150° находится во второй четверти, косинус отрицательный."
            },
            {
                question: "Чему равен tg(120°)?",
                answers: ["-√3", "√3", "-√3/3", "√3/3"],
                correct: "-√3",
                formula: "tg(120°) = tg(180°-60°) = -tg60° = -√3",
                hint: "tg(120°) = -tg(60°)",
                explanation: "Тангенс во второй четверти отрицательный. tg(120°) = tg(180°-60°) = -tg(60°) = -√3."
            },
            {
                question: "Чему равен tg(135°)?",
                answers: ["-1", "1", "0", "не существует"],
                correct: "-1",
                formula: "tg(135°) = tg(180°-45°) = -tg45° = -1",
                hint: "tg(135°) = -tg(45°)",
                explanation: "Тангенс во второй четверти отрицательный. tg(135°) = tg(180°-45°) = -tg(45°) = -1."
            },
            {
                question: "Чему равен tg(150°)?",
                answers: ["-√3/3", "√3/3", "-√3", "√3"],
                correct: "-√3/3",
                formula: "tg(150°) = tg(180°-30°) = -tg30° = -√3/3",
                hint: "tg(150°) = -tg(30°)",
                explanation: "Тангенс во второй четверти отрицательный. tg(150°) = tg(180°-30°) = -tg(30°) = -√3/3."
            },
            {
                question: "Чему равен ctg(120°)?",
                answers: ["-√3/3", "√3/3", "-√3", "√3"],
                correct: "-√3/3",
                formula: "ctg(120°) = ctg(180°-60°) = -ctg60° = -√3/3",
                hint: "ctg(120°) = -ctg(60°)",
                explanation: "Котангенс во второй четверти отрицательный. ctg(120°) = ctg(180°-60°) = -ctg(60°) = -√3/3."
            },
            {
                question: "Чему равен ctg(135°)?",
                answers: ["-1", "1", "0", "не существует"],
                correct: "-1",
                formula: "ctg(135°) = ctg(180°-45°) = -ctg45° = -1",
                hint: "ctg(135°) = -ctg(45°)",
                explanation: "Котангенс во второй четверти отрицательный. ctg(135°) = ctg(180°-45°) = -ctg(45°) = -1."
            },
            {
                question: "Чему равен ctg(150°)?",
                answers: ["-√3", "√3", "-√3/3", "√3/3"],
                correct: "-√3",
                formula: "ctg(150°) = ctg(180°-30°) = -ctg30° = -√3",
                hint: "ctg(150°) = -ctg(30°)",
                explanation: "Котангенс во второй четверти отрицательный. ctg(150°) = ctg(180°-30°) = -ctg(30°) = -√3."
            }
        ],
        medium: [
            // Формулы двойного угла
            {
                question: "Чему равен sin(2α)?",
                answers: ["2sinα·cosα", "sin²α - cos²α", "2cosα", "sinα + sinα"],
                correct: "2sinα·cosα",
                formula: "sin(2α) = 2sinα·cosα",
                hint: "Формула синуса двойного угла",
                explanation: "Синус двойного угла равен удвоенному произведению синуса и косинуса исходного угла."
            },
            {
                question: "Чему равен cos(2α)?",
                answers: ["cos²α - sin²α", "2cosα", "cos²α + sin²α", "1 - 2sin²α"],
                correct: "cos²α - sin²α",
                formula: "cos(2α) = cos²α - sin²α = 2cos²α - 1 = 1 - 2sin²α",
                hint: "Формула косинуса двойного угла",
                explanation: "Косинус двойного угла можно выразить тремя способами."
            },
            {
                question: "Чему равен tg(2α)?",
                answers: ["2tgα/(1 - tg²α)", "tgα + tgα", "2tgα", "(1 - tg²α)/2tgα"],
                correct: "2tgα/(1 - tg²α)",
                formula: "tg(2α) = 2tgα/(1 - tg²α)",
                hint: "Формула тангенса двойного угла",
                explanation: "Тангенс двойного угла выражается через тангенс исходного угла."
            },
            {
                question: "Выразите sin²α через cos(2α)",
                answers: ["(1 - cos2α)/2", "(1 + cos2α)/2", "cos2α - 1", "1 - cos2α"],
                correct: "(1 - cos2α)/2",
                formula: "sin²α = (1 - cos2α)/2",
                hint: "Формула понижения степени для синуса",
                explanation: "Из формулы cos(2α) = 1 - 2sin²α следует это выражение."
            },
            {
                question: "Выразите cos²α через cos(2α)",
                answers: ["(1 + cos2α)/2", "(1 - cos2α)/2", "cos2α + 1", "1 - sin²α"],
                correct: "(1 + cos2α)/2",
                formula: "cos²α = (1 + cos2α)/2",
                hint: "Формула понижения степени для косинуса",
                explanation: "Из формулы cos(2α) = 2cos²α - 1 следует это выражение."
            },

            // Формулы сложения
            {
                question: "Чему равно sin(α + β)?",
                answers: ["sinα·cosβ + cosα·sinβ", "sinα·sinβ + cosα·cosβ", "sinα + sinβ", "cosα·cosβ - sinα·sinβ"],
                correct: "sinα·cosβ + cosα·sinβ",
                formula: "sin(α + β) = sinα·cosβ + cosα·sinβ",
                hint: "Формула синуса суммы",
                explanation: "Синус суммы раскладывается на сумму произведений синусов и косинусов."
            },
            {
                question: "Чему равно sin(α - β)?",
                answers: ["sinα·cosβ - cosα·sinβ", "sinα·cosβ + cosα·sinβ", "cosα·cosβ + sinα·sinβ", "cosα·cosβ - sinα·sinβ"],
                correct: "sinα·cosβ - cosα·sinβ",
                formula: "sin(α - β) = sinα·cosβ - cosα·sinβ",
                hint: "Формула синуса разности",
                explanation: "Отличается от формулы суммы знаком между слагаемыми."
            },
            {
                question: "Чему равно cos(α + β)?",
                answers: ["cosα·cosβ - sinα·sinβ", "cosα·cosβ + sinα·sinβ", "sinα·cosβ + cosα·sinβ", "sinα·cosβ - cosα·sinβ"],
                correct: "cosα·cosβ - sinα·sinβ",
                formula: "cos(α + β) = cosα·cosβ - sinα·sinβ",
                hint: "Формула косинуса суммы",
                explanation: "Косинус суммы раскладывается на разность произведений косинусов и синусов."
            },
            {
                question: "Чему равно cos(α - β)?",
                answers: ["cosα·cosβ + sinα·sinβ", "cosα·cosβ - sinα·sinβ", "sinα·cosβ + cosα·sinβ", "sinα·cosβ - cosα·sinβ"],
                correct: "cosα·cosβ + sinα·sinβ",
                formula: "cos(α - β) = cosα·cosβ + sinα·sinβ",
                hint: "Формула косинуса разности",
                explanation: "Отличается от формулы суммы знаком между слагаемыми."
            },
            {
                question: "Чему равно tg(α + β)?",
                answers: ["(tgα + tgβ)/(1 - tgα·tgβ)", "(tgα - tgβ)/(1 + tgα·tgβ)", "tgα + tgβ", "tgα·tgβ"],
                correct: "(tgα + tgβ)/(1 - tgα·tgβ)",
                formula: "tg(α + β) = (tgα + tgβ)/(1 - tgα·tgβ)",
                hint: "Формула тангенса суммы",
                explanation: "Выводится из формул синуса и косинуса суммы."
            },

            // Преобразования сумм в произведения
            {
                question: "Преобразуйте в произведение: sinα + sinβ",
                answers: ["2sin((α+β)/2)·cos((α-β)/2)", "2cos((α+β)/2)·sin((α-β)/2)", "2sin((α+β)/2)·sin((α-β)/2)", "2cos((α+β)/2)·cos((α-β)/2)"],
                correct: "2sin((α+β)/2)·cos((α-β)/2)",
                formula: "sinα + sinβ = 2sin((α+β)/2)·cos((α-β)/2)",
                hint: "Формула преобразования суммы синусов",
                explanation: "Сумма синусов преобразуется в произведение синуса полусуммы на косинус полуразности."
            },
            {
                question: "Преобразуйте в произведение: sinα - sinβ",
                answers: ["2cos((α+β)/2)·sin((α-β)/2)", "2sin((α+β)/2)·cos((α-β)/2)", "2cos((α+β)/2)·cos((α-β)/2)", "2sin((α+β)/2)·sin((α-β)/2)"],
                correct: "2cos((α+β)/2)·sin((α-β)/2)",
                formula: "sinα - sinβ = 2cos((α+β)/2)·sin((α-β)/2)",
                hint: "Формула преобразования разности синусов",
                explanation: "Разность синусов преобразуется в произведение косинуса полусуммы на синус полуразности."
            },
            {
                question: "Преобразуйте в произведение: cosα + cosβ",
                answers: ["2cos((α+β)/2)·cos((α-β)/2)", "2sin((α+β)/2)·cos((α-β)/2)", "2cos((α+β)/2)·sin((α-β)/2)", "2sin((α+β)/2)·sin((α-β)/2)"],
                correct: "2cos((α+β)/2)·cos((α-β)/2)",
                formula: "cosα + cosβ = 2cos((α+β)/2)·cos((α-β)/2)",
                hint: "Формула преобразования суммы косинусов",
                explanation: "Сумма косинусов преобразуется в произведение косинусов."
            },
            {
                question: "Преобразуйте в произведение: cosα - cosβ",
                answers: ["-2sin((α+β)/2)·sin((α-β)/2)", "2cos((α+β)/2)·cos((α-β)/2)", "-2cos((α+β)/2)·cos((α-β)/2)", "2sin((α+β)/2)·sin((α-β)/2)"],
                correct: "-2sin((α+β)/2)·sin((α-β)/2)",
                formula: "cosα - cosβ = -2sin((α+β)/2)·sin((α-β)/2)",
                hint: "Формула преобразования разности косинусов",
                explanation: "Разность косинусов преобразуется в произведение синусов с минусом."
            },

            // Уравнения средней сложности
            {
                question: "Решите: 2sin x = 1",
                answers: ["30° и 150°", "45°", "60°", "90°"],
                correct: "30° и 150°",
                formula: "2sin x = 1 ⇒ sin x = 0.5 ⇒ x = 30° и 150°",
                hint: "Сначала разделите обе части на 2",
                explanation: "sin x = 0.5 имеет решения 30° и 150° в пределах от 0° до 180°."
            },
            {
                question: "Решите: 2cos x = √3",
                answers: ["30° и 330°", "45°", "60°", "90°"],
                correct: "30° и 330°",
                formula: "2cos x = √3 ⇒ cos x = √3/2 ⇒ x = 30° и 330°",
                hint: "cos x = √3/2 при x = 30° и 330°",
                explanation: "cos x = √3/2 имеет решения 30° и 330° в пределах от 0° до 360°."
            },
            {
                question: "Решите: sin x = cos x",
                answers: ["45° и 225°", "30°", "60°", "90°"],
                correct: "45° и 225°",
                formula: "sin x = cos x ⇒ tg x = 1 ⇒ x = 45° + 180°k",
                hint: "Разделите на cos x (при cos x ≠ 0)",
                explanation: "Уравнение сводится к tg x = 1, что дает x = 45° и 225°."
            },
            {
                question: "Решите: sin² x = 1/4",
                answers: ["30°, 150°, 210°, 330°", "45°", "60°", "90°"],
                correct: "30°, 150°, 210°, 330°",
                formula: "sin² x = 1/4 ⇒ sin x = ±1/2 ⇒ x = 30°, 150°, 210°, 330°",
                hint: "Извлеките квадратный корень",
                explanation: "sin x = 0.5 дает 30° и 150°, sin x = -0.5 дает 210° и 330°."
            },
            {
                question: "Решите: cos² x = 3/4",
                answers: ["30°, 150°, 210°, 330°", "45°", "60°", "90°"],
                correct: "30°, 150°, 210°, 330°",
                formula: "cos² x = 3/4 ⇒ cos x = ±√3/2 ⇒ x = 30°, 150°, 210°, 330°",
                hint: "cos x = √3/2 или cos x = -√3/2",
                explanation: "cos x = √3/2 дает 30° и 330°, cos x = -√3/2 дает 150° и 210°."
            },
            {
                question: "Выразите sin(180°+α) через α",
                answers: ["-sinα", "sinα", "-cosα", "cosα"],
                correct: "-sinα",
                formula: "sin(180°+α) = -sinα",
                hint: "В третьей четверти синус отрицательный",
                explanation: "При увеличении угла на 180°, синус меняет знак на противоположный."
            },
            {
                question: "Выразите cos(180°+α) через α",
                answers: ["-cosα", "cosα", "-sinα", "sinα"],
                correct: "-cosα",
                formula: "cos(180°+α) = -cosα",
                hint: "В третьей четверти косинус отрицательный",
                explanation: "При увеличении угла на 180°, косинус меняет знак на противоположный."
            },
            {
                question: "Выразите tg(180°+α) через α",
                answers: ["tgα", "-tgα", "ctgα", "-ctgα"],
                correct: "tgα",
                formula: "tg(180°+α) = tgα",
                hint: "Тангенс имеет период 180°",
                explanation: "Тангенс периодичен с периодом π (180°), поэтому tg(180°+α) = tgα."
            },
            {
                question: "Выразите sin(360°-α) через α",
                answers: ["-sinα", "sinα", "-cosα", "cosα"],
                correct: "-sinα",
                formula: "sin(360°-α) = -sinα",
                hint: "В четвертой четверти синус отрицательный",
                explanation: "sin(360°-α) = sin(-α) = -sinα."
            },
            {
                question: "Выразите cos(360°-α) через α",
                answers: ["cosα", "-cosα", "sinα", "-sinα"],
                correct: "cosα",
                formula: "cos(360°-α) = cosα",
                hint: "В четвертой четверти косинус положительный",
                explanation: "cos(360°-α) = cos(-α) = cosα."
            },
            {
                question: "Решите: sin(x) = sin(120°)",
                answers: ["60° и 120°", "30° и 150°", "45° и 135°", "90° и 120°"],
                correct: "60° и 120°",
                formula: "sin(x) = √3/2 ⇒ x = 60° и 120°",
                hint: "sin(120°) = √3/2",
                explanation: "sin(120°) = √3/2. Уравнение sin(x) = √3/2 имеет решения: x = 60° и x = 120° на промежутке [0°, 180°]."
            },
            {
                question: "Решите: cos(x) = cos(135°)",
                answers: ["135° и 225°", "45° и 135°", "45° и 225°", "135° и 315°"],
                correct: "135° и 225°",
                formula: "cos(x) = -√2/2 ⇒ x = 135° и 225°",
                hint: "cos(135°) = -√2/2",
                explanation: "cos(135°) = -√2/2. Уравнение cos(x) = -√2/2 имеет решения: x = 135° и x = 225° на промежутке [0°, 360°]."
            }
        ],
        hard: [
            // Сложные тождества и преобразования
            {
                question: "Чему равно sin3α?",
                answers: ["3sinα - 4sin³α", "4sin³α - 3sinα", "sinα + sin2α", "3sinα·cosα"],
                correct: "3sinα - 4sin³α",
                formula: "sin3α = 3sinα - 4sin³α",
                hint: "Формула синуса тройного угла",
                explanation: "Выводится из формул сложения: sin3α = sin(2α + α)."
            },
            {
                question: "Чему равно cos3α?",
                answers: ["4cos³α - 3cosα", "3cosα - 4cos³α", "cosα + cos2α", "3cosα·sinα"],
                correct: "4cos³α - 3cosα",
                formula: "cos3α = 4cos³α - 3cosα",
                hint: "Формула косинуса тройного угла",
                explanation: "Выводится из формул сложения: cos3α = cos(2α + α)."
            },
            {
                question: "Выразите sinα через sin(α/2) и cos(α/2)",
                answers: ["2sin(α/2)·cos(α/2)", "sin²(α/2) - cos²(α/2)", "2sin(α/2)", "sin(α/2) + cos(α/2)"],
                correct: "2sin(α/2)·cos(α/2)",
                formula: "sinα = 2sin(α/2)·cos(α/2)",
                hint: "Формула синуса через половинный угол",
                explanation: "Следует из формулы синуса двойного угла."
            },
            {
                question: "Выразите cosα через cos(α/2)",
                answers: ["2cos²(α/2) - 1", "1 - 2sin²(α/2)", "cos²(α/2) - sin²(α/2)", "все варианты верны"],
                correct: "все варианты верны",
                formula: "cosα = cos²(α/2) - sin²(α/2) = 2cos²(α/2) - 1 = 1 - 2sin²(α/2)",
                hint: "Все три формулы эквивалентны",
                explanation: "Это разные формы записи формулы косинуса двойного угла."
            },

            // Сложные уравнения
            {
                question: "Решите: sin x + cos x = 1",
                answers: ["0° и 90°", "45°", "30° и 60°", "180°"],
                correct: "0° и 90°",
                formula: "sin x + cos x = 1 ⇒ √2·sin(x+45°) = 1 ⇒ x = 0° и 90°",
                hint: "Преобразуйте в вид A·sin(x+φ)",
                explanation: "Метод введения вспомогательного угла: √2·sin(x+45°) = 1."
            },
            {
                question: "Решите: sin x - √3 cos x = 0",
                answers: ["60° + 180°k", "30°", "45°", "90°"],
                correct: "60° + 180°k",
                formula: "sin x - √3 cos x = 0 ⇒ tg x = √3 ⇒ x = 60° + 180°k",
                hint: "Разделите на cos x",
                explanation: "Уравнение сводится к tg x = √3."
            },
            {
                question: "Решите: 3sin² x - 5sin x + 2 = 0",
                answers: ["90° и arcsin(2/3)", "30°", "45°", "60°"],
                correct: "90° и arcsin(2/3)",
                formula: "3sin² x - 5sin x + 2 = 0 ⇒ (3sin x - 2)(sin x - 1) = 0",
                hint: "Квадратное уравнение относительно sin x",
                explanation: "sin x = 1 дает 90°, sin x = 2/3 дает arcsin(2/3)."
            },
            {
                question: "Решите: 2cos² x + 3sin x = 0",
                answers: ["210°, 330° и arcsin(1/2)", "45°", "90°", "180°"],
                correct: "210°, 330° и arcsin(1/2)",
                formula: "2(1-sin² x) + 3sin x = 0 ⇒ -2sin² x + 3sin x + 2 = 0",
                hint: "Замените cos² x на 1 - sin² x",
                explanation: "Получаем квадратное уравнение относительно sin x."
            },

            // Задачи на доказательство и преобразование
            {
                question: "Докажите тождество: (sinα + cosα)² = 1 + sin2α",
                answers: ["верно", "неверно", "верно только для α=45°", "не знаю"],
                correct: "верно",
                formula: "(sinα + cosα)² = sin²α + 2sinαcosα + cos²α = 1 + sin2α",
                hint: "Раскройте скобки и используйте основное тождество",
                explanation: "sin²α + cos²α = 1 и 2sinαcosα = sin2α."
            },
            {
                question: "Упростите: (1 - cos2α)/(sin2α)",
                answers: ["tgα", "ctgα", "1", "sinα"],
                correct: "tgα",
                formula: "(1 - cos2α)/(sin2α) = (2sin²α)/(2sinαcosα) = tgα",
                hint: "Используйте формулы двойного угла",
                explanation: "1 - cos2α = 2sin²α, sin2α = 2sinαcosα."
            },
            {
                question: "Упростите: (sinα - sinβ)/(cosα - cosβ)",
                answers: ["-ctg((α+β)/2)", "tg((α+β)/2)", "ctg((α-β)/2)", "-tg((α-β)/2)"],
                correct: "-ctg((α+β)/2)",
                formula: "Используя формулы преобразования, получаем -ctg((α+β)/2)",
                hint: "Преобразуйте числитель и знаменатель в произведения",
                explanation: "Применяем формулы преобразования разности синусов и косинусов."
            },
            {
                question: "Упростите: sin(180°-α)·cos(90°+α) + cos(180°-α)·sin(90°+α)",
                answers: ["-1", "1", "0", "sin2α"],
                correct: "-1",
                formula: "sin(180°-α)·cos(90°+α) + cos(180°-α)·sin(90°+α) = sinα·(-sinα) + (-cosα)·cosα = -sin²α - cos²α = -1",
                hint: "Используйте формулы приведения для каждого слагаемого",
                explanation: "sin(180°-α) = sinα, cos(90°+α) = -sinα, cos(180°-α) = -cosα, sin(90°+α) = cosα. Тогда выражение: sinα·(-sinα) + (-cosα)·cosα = -sin²α - cos²α = -(sin²α+cos²α) = -1."
            },
            {
                question: "Докажите тождество: tg(135°+α) = (tgα-1)/(tgα+1)",
                answers: ["верно", "неверно", "верно только для α=45°", "не знаю"],
                correct: "верно",
                formula: "tg(135°+α) = tg(90°+45°+α) = -ctg(45°+α) = -(1-tgα)/(1+tgα) = (tgα-1)/(tgα+1)",
                hint: "Используйте формулу тангенса суммы",
                explanation: "tg(135°+α) = tg(90°+45°+α) = -ctg(45°+α) = -1/tg(45°+α) = -(1-tgα)/(1+tgα) = (tgα-1)/(tgα+1)."
            }
        ],
    },
    
    stereometry: {
        easy: [
            // 1-20: Объемы простых фигур
            {
                question: "Найдите объем куба с ребром 3 см",
                answers: ["27 см³", "9 см³", "18 см³", "36 см³"],
                correct: "27 см³",
                formula: "V = a³ = 3³ = 27 см³",
                hint: "Объем куба: V = a³",
                explanation: "Объем куба равен кубу длины его ребра: 3 × 3 × 3 = 27 см³."
            },
            {
                question: "Найдите объем куба с ребром 7 см",
                answers: ["343 см³", "49 см³", "294 см³", "441 см³"],
                correct: "343 см³",
                formula: "V = a³ = 7³ = 343 см³",
                hint: "7³ = 7 × 7 × 7 = 343",
                explanation: "7 × 7 = 49, 49 × 7 = 343 см³."
            },
            {
                question: "Найдите объем прямоугольного параллелепипеда с измерениями 2×3×4 см",
                answers: ["24 см³", "12 см³", "18 см³", "36 см³"],
                correct: "24 см³",
                formula: "V = abc = 2 × 3 × 4 = 24 см³",
                hint: "Перемножьте все три измерения",
                explanation: "Объем прямоугольного параллелепипеда равен произведению его измерений."
            },
            {
                question: "Найдите объем шара радиусом 2 см (π≈3)",
                answers: ["32 см³", "25 см³", "50 см³", "12 см³"],
                correct: "32 см³",
                formula: "V = 4/3πR³ = 4/3 × 3 × 8 ≈ 32 см³",
                hint: "R³ = 2³ = 8",
                explanation: "4/3 × 3 × 8 = 32 см³."
            },
            {
                question: "Найдите объем шара радиусом 5 см (π≈3)",
                answers: ["500 см³", "314 см³", "157 см³", "78.5 см³"],
                correct: "500 см³",
                formula: "V = 4/3πR³ = 4/3 × 3 × 125 ≈ 500 см³",
                hint: "R³ = 5³ = 125",
                explanation: "4/3 × 3 × 125 = 500 см³."
            },
            {
                question: "Найдите объем цилиндра радиусом 3 см и высотой 4 см (π≈3)",
                answers: ["108 см³", "75 см³", "150 см³", "37 см³"],
                correct: "108 см³",
                formula: "V = πR²h = 3 × 9 × 4 = 108 см³",
                hint: "R² = 3² = 9",
                explanation: "Площадь основания: 3 × 9 = 27 см², объем: 27 × 4 = 108 см³."
            },
            {
                question: "Найдите объем цилиндра радиусом 2.5 см и высотой 6 см (π≈3)",
                answers: ["112.5 см³", "94 см³", "235 см³", "47.5 см³"],
                correct: "112.5 см³",
                formula: "V = πR²h = 3 × 6.25 × 6 = 112.5 см³",
                hint: "R² = 2.5² = 6.25",
                explanation: "3 × 6.25 = 18.75, 18.75 × 6 = 112.5 см³."
            },
            {
                question: "Найдите объем конуса радиусом 3 см и высотой 4 см (π≈3)",
                answers: ["36 см³", "113 см³", "75 см³", "18 см³"],
                correct: "36 см³",
                formula: "V = 1/3πR²h = 1/3 × 3 × 9 × 4 = 36 см³",
                hint: "Объем конуса в 3 раза меньше объема цилиндра",
                explanation: "1/3 от объема цилиндра с такими же основанием и высотой."
            },
            {
                question: "Найдите объем конуса радиусом 6 см и высотой 5 см (π≈3)",
                answers: ["180 см³", "94 см³", "565 см³", "282 см³"],
                correct: "180 см³",
                formula: "V = 1/3πR²h = 1/3 × 3 × 36 × 5 = 180 см³",
                hint: "R² = 6² = 36",
                explanation: "1/3 × 3 × 36 × 5 = 180 см³."
            },
            {
                question: "Найдите объем пирамиды с площадью основания 24 см² и высотой 5 см",
                answers: ["40 см³", "120 см³", "60 см³", "80 см³"],
                correct: "40 см³",
                formula: "V = 1/3 S·h = 1/3 × 24 × 5 = 40 см³",
                hint: "V = 1/3 S·h для любой пирамиды",
                explanation: "Объем пирамида равен одной трети произведения площади основания на высоту."
            },

            // 21-40: Площади поверхностей
            {
                question: "Найдите площадь поверхности куба с ребром 4 см",
                answers: ["96 см²", "64 см²", "48 см²", "128 см²"],
                correct: "96 см²",
                formula: "S = 6a² = 6 × 16 = 96 см²",
                hint: "У куба 6 граней, площадь каждой a²",
                explanation: "Площадь одной грани: 4² = 16 см², всех шести: 16 × 6 = 96 см²."
            },
            {
                question: "Найдите площадь поверхности куба с ребром 2.5 см",
                answers: ["37.5 см²", "15.625 см²", "31.25 см²", "62.5 см²"],
                correct: "37.5 см²",
                formula: "S = 6a² = 6 × 6.25 = 37.5 см²",
                hint: "a² = 2.5² = 6.25",
                explanation: "2.5 × 2.5 = 6.25, 6.25 × 6 = 37.5 см²."
            },
            {
                question: "Найдите площадь поверхности сферы радиусом 3 см (π≈3)",
                answers: ["108 см²", "84 см²", "56 см²", "28 см²"],
                correct: "108 см²",
                formula: "S = 4πR² = 4 × 3 × 9 = 108 см²",
                hint: "R² = 3² = 9",
                explanation: "4 × 3 × 9 = 108 см²."
            },
            {
                question: "Найдите площадь поверхности сферы радиусом 7 см (π≈3)",
                answers: ["588 см²", "307 см²", "153 см²", "76 см²"],
                correct: "588 см²",
                formula: "S = 4πR² = 4 × 3 × 49 = 588 см²",
                hint: "R² = 7² = 49",
                explanation: "4 × 3 × 49 = 588 см²."
            },
            {
                question: "Найдите площадь боковой поверхности цилиндра радиусом 4 см и высотой 5 см (π≈3)",
                answers: ["120 см²", "62 см²", "250 см²", "50 см²"],
                correct: "120 см²",
                formula: "S_бок = 2πRh = 2 × 3 × 4 × 5 = 120 см²",
                hint: "Боковая поверхность цилиндра - прямоугольник",
                explanation: "Длина окружности: 2 × 3 × 4 = 24 см, площадь: 24 × 5 = 120 см²."
            },
            {
                question: "Найдите площадь полной поверхности цилиндра радиусом 2 см и высотой 3 см (π≈3)",
                answers: ["60 см²", "37 см²", "75 см²", "25 см²"],
                correct: "60 см²",
                formula: "S = 2πR(h+R) = 2 × 3 × 2 × (3+2) = 60 см²",
                hint: "S = 2πR(h+R) = S_бок + 2S_осн",
                explanation: "2 × 3 × 2 × 5 = 60 см²."
            },
            {
                question: "Найдите площадь боковой поверхности конуса радиусом 3 см и образующей 5 см (π≈3)",
                answers: ["45 см²", "94 см²", "23 см²", "140 см²"],
                correct: "45 см²",
                formula: "S_бок = πRl = 3 × 3 × 5 = 45 см²",
                hint: "Боковая поверхность конуса: S = πRl",
                explanation: "3 × 3 × 5 = 45 см²."
            },
            {
                question: "Найдите площадь полной поверхности конуса радиусом 4 см и образующей 6 см (π≈3)",
                answers: ["120 см²", "75 см²", "100 см²", "50 см²"],
                correct: "120 см²",
                formula: "S = πR(l+R) = 3 × 4 × (6+4) = 120 см²",
                hint: "S = πR(l+R) = S_бок + S_осн",
                explanation: "3 × 4 × 10 = 120 см²."
            },
            {
                question: "Найдите площадь поверхности правильной треугольной пирамиды, если сторона основания 6 см, а апофема 4 см",
                answers: ["72 см²", "36 см²", "108 см²", "54 см²"],
                correct: "72 см²",
                formula: "S = S_осн + S_бок = (√3/4 × a²) + (3 × 1/2 × a × l)",
                explanation: "Площадь основания: (√3/4)×36 = 9√3 см², боковой: 3×1/2×6×4 = 36 см²."
            },
            {
                question: "Найдите площадь поверхности правильной четырехугольной пирамиды со стороной основания 8 см и апофемой 5 см",
                answers: ["144 см²", "64 см²", "80 см²", "224 см²"],
                correct: "144 см²",
                formula: "S = a² + 4 × (1/2 × a × l) = 64 + 4×20 = 144 см²",
                hint: "S = S_осн + S_бок",
                explanation: "Основание: 8² = 64 см², боковая: 4×1/2×8×5 = 80 см², всего: 144 см²."
            }
        ],
        medium: [
            // 1-20: Задачи на комбинации фигур
            {
                question: "Во сколько раз объем цилиндра больше объема конуса с такими же основанием и высотой?",
                answers: ["3", "2", "π", "1.5"],
                correct: "3",
                formula: "V_цил = πR²h, V_кон = 1/3πR²h ⇒ отношение = 3",
                hint: "Объем конуса в 3 раза меньше объема цилиндра",
                explanation: "Цилиндр: πR²h, конус: 1/3πR²h. Отношение: πR²h / (1/3πR²h) = 3."
            },
            {
                question: "Во сколько раз объем шара больше объема конуса с высотой равной радиусу шара? (при равенстве радиусов)",
                answers: ["4", "2", "3", "π"],
                correct: "4",
                formula: "V_шар = 4/3πR³, V_кон = 1/3πR²h = 1/3πR³ ⇒ отношение = 4",
                hint: "Если h = R для конуса",
                explanation: "Объем шара: 4/3πR³, конуса: 1/3πR³. Отношение: (4/3)/(1/3) = 4."
            },
            {
                question: "В куб вписан шар. Найдите отношение объема куба к объему шара (π≈3)",
                answers: ["2", "3", "4", "1.50"],
                correct: "2",
                formula: "V_куб/V_шар = a³ / (4/3π(a/2)³) = 6/π ≈ 2",
                hint: "Диаметр шара равен ребру куба",
                explanation: "Если ребро куба = a, то радиус шара = a/2. V_куб/V_шар = a³ / (4/3π(a/2)³) = 6/π ≈ 2."
            },
            {
                question: "В шар вписан куб. Диагональ куба равна диаметру шара. Найдите отношение объемов шара и куба (π≈3)",
                answers: ["3√3/2", "3.14", "1.90", "3√3"],
                correct: "3√3/2",
                formula: "d_куб = a√3 = D_шар ⇒ V_шар/V_куб = (π√3)/2 ≈ 2.72",
                hint: "Диагональ куба: d = a√3",
                explanation: "a√3 = 2R ⇒ a = 2R/√3. V_шар/V_куб = (4/3πR³) / (a³) = (4/3πR³) / (8R³/3√3) = (π√3)/2 = 3√3/2."
            },
            {
                question: "Цилиндр и конус имеют одинаковые основания и высоты. Найдите отношение площади боковой поверхности цилиндра к площади боковой поверхности конуса",
                answers: ["√(1+(h/R)²)", "2", "π", "1.5"],
                correct: "√(1+(h/R)²)",
                formula: "S_цил/S_кон = (2πRh)/(πR√(R²+h²)) = 2h/√(R²+h²)",
                hint: "Нужно знать образующую конуса: l = √(R²+h²)",
                explanation: "S_бок цил = 2πRh, S_бок кон = πR√(R²+h²). Отношение = 2h/√(R²+h²)."
            },

            // 21-40: Задачи с данными
            {
                question: "Диагональ куба равна 10√3 см. Найдите объем куба",
                answers: ["1000 см³", "500 см³", "750 см³", "250 см³"],
                correct: "1000 см³",
                formula: "d = a√3 ⇒ a = d/√3 = 10 ⇒ V = 10³ = 1000 см³",
                hint: "Диагональ куба: d = a√3",
                explanation: "a√3 = 10√3 ⇒ a = 10 см ⇒ V = 10³ = 1000 см³."
            },
            {
                question: "Площадь полной поверхности куба равна 150 см². Найдите его объем",
                answers: ["125 см³", "100 см³", "216 см³", "64 см³"],
                correct: "125 см³",
                formula: "S = 6a² = 150 ⇒ a² = 25 ⇒ a = 5 ⇒ V = 125 см³",
                hint: "Сначала найдите ребро куба",
                explanation: "6a² = 150 ⇒ a² = 25 ⇒ a = 5 см ⇒ V = 5³ = 125 см³."
            },
            {
                question: "Объем шара равен 36π см³. Найдите его радиус",
                answers: ["3 см", "6 см", "9 см", "12 см"],
                correct: "3 см",
                formula: "V = 4/3πR³ = 36π ⇒ R³ = 27 ⇒ R = 3 см",
                hint: "Сократите π с обеих сторон",
                explanation: "4/3πR³ = 36π ⇒ 4/3R³ = 36 ⇒ R³ = 27 ⇒ R = 3 см."
            },
            {
                question: "Площадь поверхности шара равна 100π см². Найдите его объем",
                answers: ["(500/3)π см³", "250π см³", "125π см³", "100π см³"],
                correct: "(500/3)π см³",
                formula: "S = 4πR² = 100π ⇒ R = 5 ⇒ V = 4/3π·125 = (500/3)π см³",
                hint: "Сначала найдите радиус",
                explanation: "4πR² = 100π ⇒ R² = 25 ⇒ R = 5 см ⇒ V = 4/3π·125 = 500π/3 см³."
            },
            {
                question: "Цилиндр имеет высоту в 2 раза большую радиуса. Найдите отношение площади боковой поверхности к площади основания",
                answers: ["4", "2", "π", "2π"],
                correct: "4",
                formula: "h = 2R ⇒ S_бок/S_осн = (2πRh)/(πR²) = (2πR·2R)/(πR²) = 4",
                hint: "S_бок = 2πRh, S_осн = πR²",
                explanation: "S_бок/S_осн = (2πRh)/(πR²) = 2h/R = 2·2R/R = 4."
            },

            // 41-60: Более сложные задачи
            {
                question: "В конус вписан шар. Отношение высоты конуса к радиусу основания равно 3. Найдите отношение объема конуса к объему шара",
                answers: ["2", "3", "4", "5"],
                correct: "2",
                formula: "При h/R = 3, V_кон/V_шар = 2",
                hint: "Нужно использовать формулу радиуса вписанной сферы",
                explanation: "Радиус вписанной сферы: r = Rh/(R+√(R²+h²)). При h=3R: r = 3R²/(R+√10R) = 3R/(1+√10)."
            },
            {
                question: "Объем правильной четырехугольной пирамиды равен 48 см³, высота 4 см. Найдите площадь боковой поверхности, если апофема равна 5 см",
                answers: ["60 см²", "48 см²", "36 см²", "24 см²"],
                correct: "60 см²",
                formula: "V = 1/3 S_осн·h ⇒ S_осн = 36 ⇒ a = 6 ⇒ S_бок = 4×1/2×6×5 = 60 см²",
                hint: "Сначала найдите сторону основания",
                explanation: "1/3 × S_осн × 4 = 48 ⇒ S_осн = 36 см² ⇒ сторона = 6 см ⇒ S_бок = 4×1/2×6×5 = 60 см²."
            },
            {
                question: "Радиусы оснований усеченного конуса равны 3 см и 6 см, высота 4 см. Найдите объем (π≈3)",
                answers: ["252 см³", "131 см³", "87 см³", "175 см³"],
                correct: "252 см³",
                formula: "V = 1/3πh(R²+Rr+r²) = 1/3×3×4×(36+18+9) = 252 см³",
                hint: "Формула объема усеченного конуса",
                explanation: "1/3×3×4×(36+18+9) = 1/3×3×4×63 = 252 см³."
            }
        ],
        hard: [
            // 1-20: Сложные комбинации и отношения
            {
                question: "В правильный тетраэдр вписан шар. Найдите отношение объема тетраэдра к объему шара",
                answers: ["3√3", "2√2", "π", "3"],
                correct: "3√3",
                formula: "Для правильного тетраэдра с ребром a: V_тетр = a³√2/12, r_впис = a√6/12",
                hint: "Объем тетраэдра: a³√2/12, радиус вписанной сферы: a√6/12",
                explanation: "V_тетр/V_шар = (a³√2/12) / (4/3π(a√6/12)³) = 3√3/π (приближенно)."
            },
            {
                question: "В куб вписана сфера, в сферу вписан конус, высота которого равна радиусу сферы. Найдите отношение объема куба к объему конуса",
                answers: ["6", "3", "4.5", "2"],
                correct: "6",
                formula: "Если ребро куба = 2R, то V_куб = 8R³, V_кон = 1/3πR³, отношение ≈ 8/(π/3) = 24/π ≈ 7.64",
                hint: "Нужно учесть все соотношения",
                explanation: "Для куба: a = 2R, V_куб = 8R³. Для конуса: радиус = R, высота = R, V_кон = 1/3πR³. Отношение: 8R³ / (1/3πR³) = 24/π ≈ 7.64."
            },
            {
                question: "Цилиндр, конус и шар имеют одинаковые объемы. Найдите отношение их высот, если радиусы цилиндра и конуса равны радиусу шара",
                answers: ["h_цил : h_кон : R_шар = 2 : 6 : 3", "1 : 3 : 2", "3 : 1 : 2", "2 : 1 : 3"],
                correct: "h_цил : h_кон : R_шар = 2 : 6 : 3",
                formula: "V = πR²h_цил = 1/3πR²h_кон = 4/3πR³ ⇒ h_цил = 4/3R, h_кон = 4R",
                hint: "Приравняйте объемы",
                explanation: "πR²h_цил = 4/3πR³ ⇒ h_цил = 4/3R. 1/3πR²h_кон = 4/3πR³ ⇒ h_кон = 4R. Отношение: 4/3 : 4 : 1 = 4:12:3 = 2:6:3."
            },

            // 21-40: Задачи на сечения
            {
                question: "Через вершину конуса проведено сечение под углом 60° к основанию. Площадь сечения равна 12√3 см². Найдите объем конуса, если его высота равна 4 см",
                answers: ["16π см³", "12π см³", "24π см³", "32π см³"],
                correct: "16π см³",
                formula: "Сечение - равнобедренный треугольник с углом 60° при вершине",
                hint: "Используйте площадь сечения для нахождения образующей",
                explanation: "Сечение - равносторонний треугольник (угол 60°). Площадь равностороннего треугольника: S = (a²√3)/4 = 12√3 ⇒ a² = 48 ⇒ a = 4√3 (образующая)."
            },
            {
                question: "В цилиндр вписан шар. Площадь осевого сечения цилиндра равна 36 см². Найдите объем шара",
                answers: ["36π см³", "24π см³", "48π см³", "12π см³"],
                correct: "36π см³",
                formula: "Осевое сечение цилиндра - квадрат (т.к. вписан шар)",
                hint: "Если в цилиндр вписан шар, то высота цилиндра равна диаметру",
                explanation: "Так как шар вписан в цилиндр, h = 2R. Осевое сечение - квадрат со стороной 2R. Площадь: (2R)² = 4R² = 36 ⇒ R = 3 см. V_шар = 4/3π·27 = 36π см³."
            },

            // 41-60: Предельные и оптимизационные задачи
            {
                question: "В шар радиуса R вписан цилиндр наибольшего объема. Найдите высоту этого цилиндра",
                answers: ["2R/√3", "R√2", "R", "R√3"],
                correct: "2R/√3",
                formula: "h = 2R/√3 дает максимальный объем",
                hint: "Нужно максимизировать V = πr²h при r² + (h/2)² = R²",
                explanation: "Из r² = R² - (h/2)², V = πh(R² - h²/4). Максимум при h = 2R/√3."
            },
            {
                question: "В конус с высотой H и радиусом R вписан цилиндр наибольшего объема. Найдите высоту этого цилиндра",
                answers: ["H/3", "H/2", "2H/3", "H/4"],
                correct: "H/3",
                formula: "h_цил = H/3 дает максимальный объем",
                hint: "Объем цилиндра: V = πr²h, где r/R = (H-h)/H",
                explanation: "Из подобия: r = R(H-h)/H. V = πR²(H-h)²h/H². Максимум при h = H/3."
            }
        ]
    }
};

// ========== ФУНКЦИЯ ДЛЯ ГЕНЕРАЦИИ ДОПОЛНИТЕЛЬНЫХ ВОПРОСОВ ПО СТЕРЕОМЕТРИИ ==========
// (Сохраняем только эту функцию, так как вопросы по тригонометрии теперь только статические)

function generateAdditionalStereometryQuestions(count) {
    const additional = [];
    
    const figures = [
        { name: 'куб', param: 'ребро', unit: 'см', formula: (a) => `V = a³ = ${a}³ = ${a*a*a} см³` },
        { name: 'шар', param: 'радиус', unit: 'см', formula: (r) => `V = 4/3πR³ = 4/3 × 3.14 × ${r}³ ≈ ${(4/3*3.14*r*r*r).toFixed(2)} см³` },
        { name: 'цилиндр', param: 'радиус', unit: 'см', formula: (r, h) => `V = πR²h = 3.14 × ${r}² × ${h} = ${(3.14*r*r*h).toFixed(2)} см³` },
        { name: 'конус', param: 'радиус', unit: 'см', formula: (r, h) => `V = 1/3πR²h = 1/3 × 3.14 × ${r}² × ${h} = ${(1/3*3.14*r*r*h).toFixed(2)} см³` }
    ];
    
    for (let i = 0; i < count; i++) {
        const figure = figures[Math.floor(Math.random() * figures.length)];
        const paramValue = Math.floor(Math.random() * 10) + 1;
        
        let question, correct, formula;
        
        if (figure.name === 'куб') {
            correct = (paramValue * paramValue * paramValue).toString();
            formula = figure.formula(paramValue);
            question = `Найдите объем ${figure.name} с ${figure.param} ${paramValue} ${figure.unit}`;
        } else if (figure.name === 'шар') {
            correct = (4/3 * 3.14 * paramValue * paramValue * paramValue).toFixed(2);
            formula = figure.formula(paramValue);
            question = `Найдите объем ${figure.name} ${figure.param}ом ${paramValue} ${figure.unit} (π≈3.14)`;
        } else {
            const height = Math.floor(Math.random() * 10) + 5;
            correct = figure.name === 'цилиндр' 
                ? (3.14 * paramValue * paramValue * height).toFixed(2)
                : (1/3 * 3.14 * paramValue * paramValue * height).toFixed(2);
            formula = figure.formula(paramValue, height);
            question = `Найдите объем ${figure.name} ${figure.param}ом ${paramValue} ${figure.unit} и высотой ${height} ${figure.unit} (π≈3.14)`;
        }
        
        const answers = [correct];
        while (answers.length < 4) {
            let wrong;
            if (figure.name === 'куб') {
                wrong = (parseInt(correct) + Math.floor(Math.random() * 50) - 25).toString();
            } else {
                wrong = (parseFloat(correct) + (Math.random() - 0.5) * parseFloat(correct)).toFixed(2);
            }
            if (!answers.includes(wrong) && wrong !== correct) {
                answers.push(wrong);
            }
        }
        
        for (let j = answers.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [answers[j], answers[k]] = [answers[k], answers[j]];
        }
        
        additional.push({
            question: question,
            answers: answers,
            correct: correct,
            formula: formula,
            hint: `Формула объема ${figure.name}: ${figure.name === 'куб' ? 'V = a³' : figure.name === 'шар' ? 'V = 4/3πR³' : figure.name === 'цилиндр' ? 'V = πR²h' : 'V = 1/3πR²h'}`,
            explanation: `Для расчета объема использована стандартная формула для ${figure.name}.`
        });
    }
    
    return additional;
}

// ========== ФУНКЦИЯ ДЛЯ ОБОГАЩЕНИЯ ВОПРОСОВ (ТОЛЬКО СТЕРЕОМЕТРИЯ) ==========

function enrichQuestionsFor20Mode() {
    // Добавляем дополнительные вопросы только по стереометрии
    questions.stereometry.easy.push(...generateAdditionalStereometryQuestions(30));
    questions.stereometry.medium.push(...generateAdditionalStereometryQuestions(30));
    questions.stereometry.hard.push(...generateAdditionalStereometryQuestions(40));
}

// Вызываем функцию обогащения вопросов
enrichQuestionsFor20Mode();

// ========== ИНИЦИАЛИЗАЦИЯ И ИГРОВАЯ ЛОГИКА ==========

function initGame() {
    // Выбор сложности
    diffButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            diffButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            game.difficulty = btn.dataset.level;
        });
    });
    
    // Выбор режима игры
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            game.gameMode = parseInt(btn.dataset.mode);
            questionNumElement.textContent = `1/${game.gameMode}`;
        });
    });

     // Выбор категории
     catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            catButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            game.selectedCategory = btn.dataset.category;
        });
    });
    
    // Кнопки
    startBtn.addEventListener('click', startGame);
    menuBtn.addEventListener('click', () => showScreen(startScreen));
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartGame);
    hintBtn.addEventListener('click', showHint);
    playAgainBtn.addEventListener('click', restartGame);
    mainMenuBtn.addEventListener('click', () => showScreen(startScreen));
    closeModal.addEventListener('click', () => hintModal.classList.remove('active'));
    
    // Клик по фону модального окна
    hintModal.addEventListener('click', (e) => {
        if (e.target === hintModal) {
            hintModal.classList.remove('active');
        }
    });
    
    // Начальное состояние
    updateStats();
}

function startGame() {
    resetGame();
    prepareQuestionPool();
    showScreen(gameScreen);
    generateQuestion();
}

function resetGame() {
    game = {
        score: 0,
        level: 1,
        currentQuestion: 1,
        correctAnswers: 0,
        hintsLeft: 3,
        difficulty: game.difficulty || 'easy',
        gameMode: game.gameMode || 10,
        selectedCategory: game.selectedCategory || 'both',
        currentCategory: '',
        correctStreak: 0,
        totalQuestions: 0,
        questionPool: [],
        usedQuestions: new Set()
    };
    updateStats();
    feedback.innerHTML = '';
    hintTextElement.innerHTML = '';
    formulaBox.textContent = '';
}

function showScreen(screenElement) {
    [startScreen, gameScreen, resultScreen].forEach(screen => {
        screen.classList.remove('active');
    });
    screenElement.classList.add('active');
}

function updateStats() {
    scoreElement.textContent = game.score;
    levelElement.textContent = game.level;
    questionNumElement.textContent = `${game.currentQuestion}/${game.gameMode}`;
    correctElement.textContent = game.correctAnswers;
    hintsCountElement.textContent = game.hintsLeft;
    
    hintBtn.disabled = game.hintsLeft === 0;
    hintBtn.innerHTML = `<i class="fas fa-lightbulb"></i> Подсказка (${game.hintsLeft})`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function prepareQuestionPool() {
    game.questionPool = [];
    game.usedQuestions.clear();
    
    const allQuestions = [];
    
    // Определяем, из каких категорий брать вопросы
    const categories = [];
    if (game.selectedCategory === 'both') {
        categories.push('trigonometry', 'stereometry');
    } else if (game.selectedCategory === 'trigonometry') {
        categories.push('trigonometry');
    } else if (game.selectedCategory === 'stereometry') {
        categories.push('stereometry');
    }
    
    // Собираем вопросы только из выбранных категорий
    categories.forEach(category => {
        const categoryQuestions = questions[category][game.difficulty];
        if (categoryQuestions) {
            const labeledQuestions = categoryQuestions.map(q => ({
                ...q,
                category: category
            }));
            allQuestions.push(...labeledQuestions);
        }
    });
    
    shuffleArray(allQuestions);
    
    const questionsNeeded = game.gameMode;
    game.questionPool = allQuestions.slice(0, Math.min(questionsNeeded, allQuestions.length));
}

function generateQuestion() {
    if (game.currentQuestion > game.gameMode) {
        endGame();
        return;
    }
    
    const questionIndex = game.currentQuestion - 1;
    if (questionIndex >= game.questionPool.length) {
        endGame();
        return;
    }
    
    const questionData = game.questionPool[questionIndex];
    
    if (questionData.category === 'trigonometry') {
        categoryName.textContent = 'Тригонометрия';
        categoryTag.className = 'category-tag trigonometry';
        categoryTag.innerHTML = '<i class="fas fa-chart-line"></i> Тригонометрия';
    } else if (questionData.category === 'stereometry') {
        categoryName.textContent = 'Стереометрия';
        categoryTag.className = 'category-tag stereometry';
        categoryTag.innerHTML = '<i class="fas fa-cube"></i> Стереометрия';
    }
    
    questionText.textContent = questionData.question;
    formulaBox.textContent = '';
    
    updateDiagram(questionData.category, questionData);
    
    const shuffledAnswers = [...questionData.answers];
    shuffleArray(shuffledAnswers);
    
    createAnswerButtons(shuffledAnswers);
    
    nextBtn.disabled = true;
    feedback.innerHTML = '';
    hintTextElement.innerHTML = '';
    
    game.currentQuestionData = questionData;
}

function updateDiagram(category, questionData) {
    diagramBox.innerHTML = '';
    
    if (category === 'stereometry') {
        // Определяем иконку по вопросу
        let icon = 'fa-shapes';
        let color = '#3498db';
        let title = 'Стереометрия';
        
        if (questionData.question.includes('куб')) {
            icon = 'fa-cube';
            color = '#3498db';
            title = 'Куб';
        } else if (questionData.question.includes('шар') || questionData.question.includes('сфер')) {
            icon = 'fa-circle';
            color = '#e74c3c';
            title = 'Шар';
        } else if (questionData.question.includes('цилиндр')) {
            icon = 'fa-database';
            color = '#9b59b6';
            title = 'Цилиндр';
        } else if (questionData.question.includes('конус')) {
            icon = 'fa-ice-cream';
            color = '#2ecc71';
            title = 'Конус';
        } else if (questionData.question.includes('пирамид') || questionData.question.includes('тетраэдр')) {
            icon = 'fa-mountain';
            color = '#f39c12';
            title = 'Пирамида';
        }
        
        diagramBox.innerHTML = `
            <div style="text-align: center; padding: 30px;">
                <div style="font-size: 80px; color: ${color}; margin-bottom: 15px;">
                    <i class="fas ${icon}"></i>
                </div>
                <p style="color: #2c3e50; font-weight: bold; font-size: 20px;">${title}</p>
            </div>
        `;
    } 
    else { // ТРИГОНОМЕТРИЯ
        // Выбираем случайную иконку для тригонометрии
        const icons = [
            {icon: 'fa-superscript', color: '#e74c3c', title: 'Формулы'},
            {icon: 'fa-calculator', color: '#3498db', title: 'Вычисления'},
            {icon: 'fa-chart-line', color: '#2ecc71', title: 'Графики'},
            {icon: 'fa-angle-right', color: '#9b59b6', title: 'Углы'},
            {icon: 'fa-circle', color: '#f39c12', title: 'Окружность'}
        ];
        
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        
        diagramBox.innerHTML = `
            <div style="text-align: center; padding: 30px;">
                <div style="font-size: 80px; color: ${randomIcon.color}; margin-bottom: 15px;">
                    <i class="fas ${randomIcon.icon}"></i>
                </div>
                <p style="color: #2c3e50; font-weight: bold; font-size: 20px;">${randomIcon.title}</p>
            </div>
        `;
    }
}

function createAnswerButtons(answersArray) {
    answersContainer.innerHTML = '';
    
    answersArray.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(answer, button));
        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer, button) {
    const correctAnswer = game.currentQuestionData.correct;
    const isCorrect = selectedAnswer === correctAnswer;
    
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.add('disabled');
        btn.disabled = true;
    });
    
    if (isCorrect) {
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        document.querySelectorAll('.answer-btn').forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }
    
    game.totalQuestions++;
    
    if (isCorrect) {
        game.score += 10;
        game.correctAnswers++;
        game.correctStreak++;
        
        if (game.correctStreak >= 3) {
            game.level++;
            game.correctStreak = 0;
        }
    } else {
        game.correctStreak = 0;
    }
    
    showSolution(game.currentQuestionData, isCorrect, correctAnswer);
    
    game.currentQuestion++;
    updateStats();
    nextBtn.disabled = false;
}

function showSolution(questionData, isCorrect, correctAnswer) {
    let solutionHTML = '';
    
    if (isCorrect) {
        solutionHTML = `
            <div class="solution correct">
                <h3><i class="fas fa-check-circle"></i> Правильно!</h3>
                <p>+10 очков</p>
                ${game.correctStreak >= 2 && game.correctStreak < 3 ? `<p style="color: #856404; margin-top: 5px;">Ещё один правильный ответ - и повышение уровня!</p>` : ''}
                ${game.correctStreak >= 3 ? `<p class="level-up">🎉 Новый уровень: ${game.level}!</p>` : ''}
            </div>
        `;
    } else {
        solutionHTML = `
            <div class="solution incorrect">
                <h3><i class="fas fa-times-circle"></i> Неправильно</h3>
                <p>Правильный ответ: <strong>${correctAnswer}</strong></p>
            </div>
        `;
    }
    
    if (questionData.explanation) {
        solutionHTML += `
            <div class="explanation">
                <h4><i class="fas fa-lightbulb"></i> Объяснение:</h4>
                <p>${questionData.explanation}</p>
            </div>
        `;
    }
    
    if (questionData.formula) {
        solutionHTML += `
            <div class="solution-formula">
                <h4><i class="fas fa-calculator"></i> Решение:</h4>
                <p>${questionData.formula}</p>
            </div>
        `;
        formulaBox.textContent = questionData.formula;
    }
    
    feedback.innerHTML = solutionHTML;
    feedback.className = 'feedback';
}

function nextQuestion() {
    generateQuestion();
}

function showHint() {
    if (game.hintsLeft > 0 && game.currentQuestionData) {
        game.hintsLeft--;
        updateStats();
        
        hintContent.textContent = game.currentQuestionData.hint;
        hintModal.classList.add('active');
        
        hintTextElement.textContent = game.currentQuestionData.hint;
    }
}

function restartGame() {
    resetGame();
    startGame();
}

function endGame() {
    finalScoreElement.textContent = game.score;
    finalLevelElement.textContent = game.level;
    finalCorrectElement.textContent = game.correctAnswers;
    finalTotalElement.textContent = game.totalQuestions;
    
    let message = '';
    const percentage = game.totalQuestions > 0 ? Math.round((game.correctAnswers / game.totalQuestions) * 100) : 0;
    const maxScore = game.gameMode * 10;
    
    if (percentage >= 90) {
        message = `Отличный результат! ${game.correctAnswers}/${game.gameMode} правильных ответов! 🎓`;
    } else if (percentage >= 70) {
        message = `Хорошая работа! ${game.correctAnswers}/${game.gameMode} правильных ответов! 👍`;
    } else if (percentage >= 50) {
        message = `Неплохо! ${game.correctAnswers}/${game.gameMode} правильных ответов! 💪`;
    } else {
        message = `Есть куда расти! ${game.correctAnswers}/${game.gameMode} правильных ответов! 📚`;
    }
    
    resultMessage.innerHTML = `
        <p>Вы набрали <strong>${game.score}/${maxScore}</strong> очков</p>
        <p>${message}</p>
        <p style="margin-top: 20px; font-size: 0.9em; color: #6c757d;">
            <i class="fas fa-random"></i> Вопросы были выбраны случайным образом. При следующем запуске они будут другими!
        </p>
    `;
    
    showScreen(resultScreen);
}

// Запуск игры
document.addEventListener('DOMContentLoaded', initGame);