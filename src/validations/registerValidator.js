const { body } = require('express-validator');
const { User } = require('../database/models');


module.exports = [

      //Campo nombre
      body('firstName')
         .notEmpty().withMessage('El campo no debe quedar vacío').bail()
         .isAlpha().withMessage('El nombre solo puede contener letras').bail()
         .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres').bail(),

      //Campo apellido
      body('lastName')
         .notEmpty().withMessage('El campo no debe quedar vacío').bail()
         .isAlpha().withMessage('El apellido solo puede contener letras').bail()
         .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres').bail(),
      
      //Campo email
      body('email')
      .notEmpty().withMessage('El campo email no debe quedar vacío').bail()
      .isEmail().withMessage('El email debe ser de formato válido').bail()
      .custom(async (email) => {
         const user = await User.findOne({ where: { email } });
         if (user) {
            throw new Error('El email ya se encuentra registrado');
         }
         return true;
      }),

      //Campo contraseña
      body('password')
         .notEmpty().withMessage('La contraseña es obligatoria').bail()
         .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
         .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/).bail()
         .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial').bail(),

      //Campo imagen
     /*  body('avatar')
         .custom((value, { req }) => {
            const file = req.file;
            if (!file) {
               throw new Error('Debes subir una imagen');
            }
            const acceptedExtensions = ['.jpg', '.jpeg,', '.png', '.gif'];
            if (!acceptedExtensions.includes(req.file.mimetype)) {
               throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
            return true;
         }), */



]