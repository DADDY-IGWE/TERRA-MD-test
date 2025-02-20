
const { cmd } = require('../command');
const { sendMessage } = require('./my_data/money.json');

// Tableau de questions et réponses
const questions = [
    { question: "Quelle est la capitale de la France?", options: ["Berlin", "Paris", "Madrid", "Rome"], answer: "Paris", reward: 500 },
    { question: "Combien de continents existe-t-il?", options: ["5", "6", "7", "8"], answer: "7", reward: 1000 },
    { question: "Qui a écrit 'Harry Potter'?", options: ["J.K. Rowling", "George R.R. Martin", "J.R.R. Tolkien", "Stephen King"], answer: "J.K. Rowling", reward: 1500 },
    { question: "Quel est l'élément chimique de l'eau?", options: ["Oxygène", "Hydrogène", "Carbone", "Azote"], answer: "Hydrogène", reward: 1000 }
];

cmd({
    pattern: "millionaire",
desc: "Jouer au jeu du Millionnaire. Répondez correctement et gagnez de l'argent.",
    category: "fun",
    react: "💰",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, reply, sender }) => {
    try {
        // Variables pour le jeu
        let playerMoney = 0; // Argent du joueur
        let currentQuestionIndex = 0; // Question actuelle
        let gameActive = true; // Si le jeu est en cours

        // Fonction pour poser une question
        const askQuestion = () => {
            const q = questions[currentQuestionIndex];
            let options = "";
            q.options.forEach((option, index) => {
                options += `\nindex + 1.{option}`;
            });

            return `Question: q.question:{options}`;
        };

        // Demande la première question
        await reply(askQuestion());

        // Réponse de l'utilisateur
        const checkAnswer = async (answer) => {
            const currentQuestion = questions[currentQuestionIndex];

            // Vérification de la réponse
            if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
                playerMoney += currentQuestion.reward; // Ajouter de l'argent pour une bonne réponse
await reply(`Bonne réponse ! Vous gagnez currentQuestion.reward TERRACOINS. Votre solde actuel:{playerMoney} TERRACOINS`);
            } else {
                await reply(`Mauvaise réponse ! La bonne réponse était: currentQuestion.answer`);
            

            currentQuestionIndex++; // Passer à la question suivante

            // Si toutes les questions ont été répondues, terminer le jeu
            if (currentQuestionIndex < questions.length) 
                await reply(askQuestion());
             else 
                await reply(`Le jeu est terminé ! Vous avez gagné{playerMoney} TERRACOINS.`);
                gameActive = false;
            }
        };

        // Attendre une réponse de l'utilisateur pour chaque question
        conn.on('message', async (msg) => {
            if (gameActive && msg.from === from && !msg.quoted) {
                const userAnswer = msg.body;
                await checkAnswer(userAnswer);
            }
        });

    } catch (e) {
        console.log(e);
        reply(`Erreur: ${e}`);
    }
});
