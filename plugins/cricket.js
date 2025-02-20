
const { cmd } = require('../command'); // Assure-toi que ce chemin est correct dans ton projet

cmd({
    pattern: "cricket",
    desc: "Jouez à un jeu de cricket avec le bot!",
    category: "fun",
    react: "🏏", // Emoji cricket
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, reply, sender }) => {
    try {
        // Initialise le match de cricket
        const teams = ["Utilisateur", "Bot"];
        let userScore = Math.floor(Math.random() * 6) + 1; // Score aléatoire pour l'utilisateur (1 à 6)
        let botScore = Math.floor(Math.random() * 6) + 1; // Score aléatoire pour le bot (1 à 6)

        // Générez un message de match
        let matchResult = `
*🏏 Match de Cricket 🏏*

🎯 *Équipe 1*: Utilisateur
🎯 *Équipe 2*: Bot

---

🏅 *Score de l'utilisateur*: userScore
🏅 *Score de Terra*:{botScore}

---

*Résultat final*: 
userScore === botScore ? "Match nul!" : (userScore > botScore ? "L'Utilisateur gagne!" : "terra gagne!")

Vous voulez jouer à nouveau? Tapez *!cricket* pour un autre match!
        `;

        // Envoie du message
        await conn.sendMessage(from,  text: matchResult ,  quoted: mek );

     catch (e) 
        console.log(e);
        reply(`Erreur:{e}`);
    }
});
