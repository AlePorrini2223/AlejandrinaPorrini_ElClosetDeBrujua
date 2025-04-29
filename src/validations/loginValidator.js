const { body } = require('express-validator');
const { User } = require('../database/models');

module.exports = [

      //Campo usuario/email
      body('email')
      .notEmpty().withMessage('El campo email no debe quedar vacío').bail()
      .isEmail().withMessage('El email debe ser de formato válido').bail()
      .custom(async (email) => {
         const user = await User.findOne({ where: { email } });
         if (!user) {
            throw new Error('El email no se encuentra registrado');
         }
         return true;
      }),

      
      //Campo contraseña
      body('password')
      .notEmpty().withMessage('Éste campo no puede quedar vacío').bail()
      .isLength({ min: 8 }).withMessage('La contraseña ingresada es incorrecta').bail()
      .custom(async (loginPass, { req }) => {
         const id = req.user.id;
         const user = await User.findOne({ where: { id } });
         if (!user) {
            throw new Error('Usuario no encontrado');
         }
         
         const isMatch = await bcrypt.compare(loginPass, user.password);
         if (!isMatch) {
            throw new Error('La contraseña no coincide con la existente');
         }
         return true;
      }),














]