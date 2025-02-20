
const { cmd } = require('../command'); 

cmd({
    pattern: "listadmins",
    desc: "Name all the admins of the group.",
    category: "group",
    react: "🤓", // Emoji de réaction pour l'admin
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, isGroup, groupMetadata, groupAdmins, reply }) => {
    try {
        // Vérifie si le message a été envoyé dans un groupe
        if (!isGroup) {
            return reply("This command can only be used in a group.");
        }

        // Vérifie si l'utilisateur est admin ou le créateur du groupe
        if (!groupAdmins.includes(m.sender)) {
return reply("Sorry, you must be an administrator to use this command.");
        }

        // Récupère la liste des administrateurs
        const adminsList = groupAdmins.map((admin) => admin);

        // Crée un message avec les noms des administrateurs
        let message = "List of group administrators🎐:\n";
        adminsList.forEach((admin, index) => {
            message += `index + 1. @{admin.split('@')[0]}\n`; // Ajoute @ + le numéro de téléphone de l'administrateur
        });

        // Envoie la liste des administrateurs avec la mention des utilisateurs
        await conn.sendMessage(from, { text: message, mentions: adminsList }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Erreur: ${e}`);
    }
});
