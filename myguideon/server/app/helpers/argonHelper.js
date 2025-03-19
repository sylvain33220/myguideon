
/**
 * @file argonHelper.js
 * @description Helper pour le hashage des mots de passe avec Argon2 et la vérification des mots de passe hachés
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */const argon2 = require('argon2');

/**
 * Argon2 hashing options
 * @type {Object}
 * @property {number} type - The Argon2 type
 * @property {number} memoryCost - The memory cost
 * @property {number} timeCost - The time cost
 * @property {number} parallelism - The parallelism
 * @property {number} hashLength - The hash length
 * @property {number} saltLength - The salt length
 * @property {number} version - The Argon2 version
 * @property {number} raw - The raw flag
 * @property {number} encoding - The encoding
 * @property {number} timeCost - The time cost
 */
const hashingOption = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 4,
    parallelism: 2,
    hashLength: 32, 
    saltLength: 16,
    version: 0x13,
    raw: false,
    encoding: 'utf8' 
}

/**
 * Hash a password using Argon2
 * @param {string} password -    The plain text password
 * @returns {Promise<string>} -  The hashed password
 */
async function hashPassword(password) {
    try {
        if (password.startsWith("$argon2id$")) {
            console.error("❌ ERREUR : Le mot de passe semble déjà être haché !");
            throw new Error("Le mot de passe est déjà haché !");
        }
        return await argon2.hash(password, hashingOption);
    } catch (err) {
        console.error( "Erreur lors du hashage du mot de passe",err);
        throw err
    }
    
}

/**
 * Verify a password against a hash
 * @param {string} hash - The hashed password
 * @param {string} password - The plain text password
 * @returns {Promise<boolean>} - True if match, false otherwise
 */
async function verifyPassword(hash, password) {
    try {
        const isValid = await argon2.verify(hash, password);
        return isValid;
    } catch (err) {
        console.error("❌ Erreur lors de la vérification du mot de passe", err);
        return false;
    }
}




module.exports = { hashPassword, verifyPassword, hashingOption };
