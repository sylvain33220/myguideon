const tables = require('../../database/table');
const { hashPassword, verifyPassword } = require('../helpers/argonHelper');
const { generateToken } = require('../helpers/jwtHelper');
const path = require('node:path');
const { addUserClientValidation,
    updateUserClientValidation,
     updatePasswordValidation,
    authUserClientValidation } = require('../validator/userClientValidator');

/*********************** Récupérer tous les UserClient ***********************/

async function getAllUserClient(req, res) {
    try {
        const users = await tables.user_client.getAllUsersClient();
        const sanitizedUsers = users.map(user => {
            const { password, ...rest } = user;  // 🔓 Enlève le mot de passe
            return rest;
        });
        res.status(200).json(sanitizedUsers);
    } catch (error) {
        console.error("❌ ERREUR getAllUserClient:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Récupérer un UserClient par ID ***********************/
async function getUserClientById(req, res) {
    try {
        const userId = req.params.id || (req.user ? req.user.id : null);
        const isAdmin = req.user ? req.user.role_id === 1 : false;
        if (!userId) return res.status(400).json({ error: "ID utilisateur manquant" });
        if (Number.parseInt(req.params.id) !== userId && !isAdmin) {
            return res.status(403).json({ error: "Accès refusé" });
        }

        const user = await tables.user_client.getUserClientById(userId || req.params.id);
        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

        const { password, ...sanitizedUser } = user;  // 🔓 Enlève le mot de passe
        res.status(200).json(sanitizedUser);
    } catch (error) {
        console.error("❌ ERREUR getUserClientById:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Ajouter un UserClient ***********************/
async function addUserClient(req, res) {
    try {
        const { error, value } = addUserClientValidation(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        // Hash du mot de passe
        const hashedPassword = await hashPassword(value.password);
        console.log("🔑 Mot de passe haché avant insertion :", hashedPassword);

        const profileImage = req.file ? req.file.filename : null;
        const newUserClient = await tables.user_client.AddUserClient({
            ...value,
            password: hashedPassword,
            profile_image: profileImage
        });

        console.log("✅ Utilisateur créé :", newUserClient);

        const token = generateToken({ id: newUserClient.id, email: newUserClient.email, role_id: newUserClient.role_id });
        res.status(201).json({ user: newUserClient, token });

    } catch (error) {
        console.error("❌ ERREUR addUserClient:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}



/*********************** Mettre à jour un UserClient ***********************/
async function updateUserClient(req, res) {
    try {
        const { error } = updateUserClientValidation(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const userId = req.params.id || (req.user ? req.user.id : null);
        const isAdmin = req.user ? req.user.role_id === 1 : false;
        if (!userId) return res.status(400).json({ error: "ID utilisateur manquant" });
        
        const profileImage = req.file?.filename ? `/assets/img/${req.file.filename}` : null;
        const updatedUserClient = await tables.user_client.updateUserClient(userId, {
            ...req.body,
            profile_image: profileImage
        });

        if (updatedUserClient) {
        res.status(200).json({ message: "Utilisateur mis à jour" });
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error("❌ ERREUR updateUserClient:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Mettre à jour le mot de passe d'un UserClient ***********************/
async function updatePassword(req, res) {
    try {
        const { error } = updatePasswordValidation(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const {oldPassword , newPassword} = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ error: "Ancien et nouveau mot de passe requis" });
        }

        const user = await tables.user_client.getUserClientById(req.user.id);
        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

        const isPasswordValid = await verifyPassword(oldPassword, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: "Ancien mot de passe incorrect" });

        const hashedPassword = await hashPassword(newPassword);
        await tables.user_client.updatePassword(req.user.id, hashedPassword);

        const token = generateToken({ id: user.id, email: user.email, role_id: user.role_id });

        res.status(200).json({ message: "Mot de passe mis à jour", token });
    } catch (error) {
        console.error("❌ ERREUR updatePassword:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Supprimer un UserClient ***********************/
// async function deleteUserClient(req, res) {
//     const userId = req.params.id || (req.user ? req.user.id : null);
//     const isAdmin = req.user ? req.user.role_id === 1 : false;
//     if (!userId) return res.status(400).json({ error: "ID utilisateur manquant" });
//     if (Number.parseInt(req.params.id) !== userId && !isAdmin) {
//         return res.status(403).json({ error: "Accès refusé" });
//     }

//     try {
//         const isDeleted = await tables.user_client.deleteUserClient(userId);
//         if (isDeleted) {
//             res.status(200).json({ message: "Utilisateur supprimé avec succès." });
//         } else {
//             res.status(404).json({ error: "Utilisateur non trouvé" });
//         }
//     } catch (error) {
//         console.error("❌ ERREUR deleteUserClient:", error);
//         res.status(500).json({ error: 'Erreur serveur' });
//     }
// }
async function deleteUserClient(req, res) {
    try {
        const userId = req.user.id;
        const isDeleted = await tables.user_client.deleteUserClient(userId);

        if (isDeleted) {
            res.status(200).json({ message: "Utilisateur supprimé avec succès." });
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error("❌ ERREUR deleteUserClient:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

/*********************** Authentifier un UserClient ***********************/
async function loginUserClient(req, res) {
    const { error } = authUserClientValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    try {
        const { email, password } = req.body;
        const user = await tables.user_client.findUserClientByEmail(email);

        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });


        console.log("🔍 Récupération utilisateur :", user);
        console.log("🛠 Mot de passe en base :", user.password);

        const passwordMatch = await verifyPassword(user.password, password);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Mot de passe incorrect" });
        }

        const token = generateToken({ id: user.id, email: user.email, role_id: user.role_id });
        res.status(200).json({ token });
    } catch (error) {
        console.error("❌ ERREUR loginUserClient:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}


/*********************** Exportation des fonctions du controller ***********************/
module.exports = {
    getAllUserClient,
    getUserClientById,
    addUserClient,
    updateUserClient,
    updatePassword,
    deleteUserClient,
    loginUserClient
};