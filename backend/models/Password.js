const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();


//ajout de propriétés que le mot de passe doit respecter
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters // Doit avoir des lettres majuscules
.has().lowercase()                              // Must have lowercase letters // Doit avoir des lettres minuscules
.has().digits()                                 // Must have at least x digits // Doit avoir au moins x chiffres
//.has().not().spaces()                         // Should not have spaces // Ne devrait pas avoir d'espaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values // Liste noire de ces valeurs

module.exports = passwordSchema;