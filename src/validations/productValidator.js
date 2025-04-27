const { body } = require('express-validator');

const { Product, Category, Image, Section, Status, Size } = require('../database/models');

const productValidator =[

   //Campo name
      body('nameProduct')
      .notEmpty().withMessage('Debes completar el campo nombre').bail()
      .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres').bail(),

   //Campo description
   body('description')
      .notEmpty().withMessage('Debes completar el campo descripción')
      .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
   
   // Campo detailedDescription
   body('detailedDescription')
      .notEmpty().withMessage('Debes completar una descripción detallada del producto').bail()
      .isLength({ min: 20 }).withMessage('La descripción detallada debe tener al menos 20 caracteres').bail(),

   //Campo condition
   body('condition')
      .notEmpty().withMessage('Debes seleccionar en qué condicion se encuentra el producto').bail()
      .isIn(['usado, como nuevo', 'usado, buen estado', 'nuevo', 'usado, con detalle']),

   //Campo stuff
   body('stuff')
      .notEmpty().withMessage('Debes indicar el material del producto').bail()
      .isLength({ min: 5 }),

   //Campo category
   body('category')
   .notEmpty().withMessage('La categoría es requerida').bail()
   .custom(async (value) => {
      const category = await Category.findOne({ where: { id: value } });
      if (!category) {
         throw new Error('La categoría seleccionada no es válida');
      }
      return true;
   }),

   //Campo size
   body('size')
      .notEmpty().withMessage('Debes seleccionar una talla').bail()
      .custom(async (value) => {
         const size = await Size.findOne({ where: { id: value } });
         if (!size) {
            throw new Error('La talla indicada no es válida');
         }
         return true;
      }),

   //Campo price
   body('price')
      .notEmpty().withMessage('El precio es requerido').bail()
      .isInt().withMessage('El precio debe ser un número entero').bail()
      .isNumeric().withMessage('El precio debe ser un número')
      .custom((value) => {
         if (value < 0) {
            throw new Error('El precio no puede ser negativo');
         }
         return true;
      }),

   //Campo section
   body('section')
   .notEmpty().withMessage('Debes seleccionar una sección').bail()
   .custom(async (value) => {
      const section = await Section.findOne({ where: { id: value } });
      if (!section) {
         throw new Error('La sección no es válida');
      }
      return true;
   }),

   //Campo image
   body('img')
      .custom((value, { req }) => {

         const file = req.file;
         if (!file) {
            throw new Error('Debes subir una imagen');
         }
         const allowedTypes = ['img/jpeg', 'img/png', 'img/gif'];
         if (!allowedTypes.includes(req.file.mimetype)) {
            throw new Error('Formato de imagen no permitido. Formatos permitidos: .jpeg, .png, .gif');
      }
         return true;
      })
];

module.exports = productValidator;



