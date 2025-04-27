const fs = require('fs');
const path = require ('path');
//const { readJson, saveJson } = require('../utils/fs');
const { toThousand } = require('../utils/index');
const { validationResult } = require('express-validator');
const { Product, Cart, Condition, Stuff, Category, Image, Section, Status, Size } = require('../database/models');


let productController = {

    list: async (req,res) => {

        try {
            const productosCloset = await Product.findAll();
            console.log(productosCloset);
            
            res.render('products/productsList', {
                productosCloset,
                toThousand,
            });
        }  catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).render('Error fetching products');
        }

        /*
        const productosCloset = readJson('../db/products.json');
        return res.render('products/productsList', {
            productosCloset,
            toThousand,
        });
        */
    },    

    /*  const categoria = req.params.categoria;
        const producto = producto.filter((producto) => producto.categoria == categoria);
        producto.length > 0 
        ? res.render('products/productList', { productosCloset: db.lista })
        : res.render ('products/productList' , {
            productosCloset: db.lista, 
            msg: "No hay productos para la categoría seleccionada"
        }) 
    }, */

    detail: async (req,res) => {

        try {
            const productosCloset = await Product.findByPk(req.params.id, { //busqueda por PK
                include: [
                    { model: Image, as: 'images' },
                ]
            }); 

            if (productosCloset) {    
                res.render('products/productDetail');
            } else {
                res.status(404).send ('Producto no disponible');
            }
        }  catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).render('Error fetching products');
        }

        /*
        const productosCloset = readJson('../db/products.json');
        const product = productosCloset.find(product => product.id === +req.params.id);

        if (product) {    
            res.render('products/productDetail', { product });
        } else {
            res.send('Hubo un error al seleccionar el producto');
        }
        */
    },

    cart: async (req,res) => {  // muestra carrito  de compras

        try {
            const productID = req.params.id;
            const productosCloset = await Product.findByPk(productID, {
                include: [
                    { model: Image, as: 'images' }
                ]
            });

            if (productosCloset) {
                return res.render('products/productCartl', {
                    productosCloset 
                });
            } else {
                return res.status(404).send('Producto no disponible');
            }
        }  catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).render('Error fetching products');
        }

        //res.render('products/productCartl', { title: 'Carrito - El Closet de Brujua' });
    },

    add: async (req,res) => { // muestra formulario para agregar producto
        
        try {
            const [conditions, stuff, categories, sizes] = await Promise.all([
                Condition.findAll(),
                Stuff.findAll(),
                Category.findAll(),
                Size.findAll()
            ]);

            return res.render('products/productAdd', {
                title: "Agregar Producto",
                conditions,
                stuff,
                categories,
                sizes,
                errors:errors.isEmpty() ? null : errors.array(),
            });
        }  catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).render('Error fetching products');
        }

        /*
        const productosCloset = readJson('../db/products.json');
        const categories = readJson('../db/categories.json');
        res.render('products/productAdd', {
            title: "Creación de Productos",
            productosCloset,
            categories
        });
        */
    },

    create: async (req,res) => { // crea producto (donde se envía y se guarda)

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const [conditions, stuff, categories, sizes] = await Promise.all([
                    Condition.findAll(),
                    Stuff.findAll(),
                    Category.findAll(),
                    Size.findAll()
                ]);

                return res.status(422).render('products/productAdd', {
                    title: "Creación del Producto",
                    conditions,
                    stuff,
                    categories,
                    sizes,
                    errors: errors.mapped(),
                });
            } else {
                const { nameProduct, description, detailedDescription, condition, stuff, category, size, price, section } = req.body;
            
                const newProduct = await Product.create({
                    nameProduct: nameProduct.trim(),
                    description: description.trim(),
                    detailedDescription: detailedDescription.trim(),
                    condition: condition.trim(),
                    stuff: stuff.trim(),
                    sectionId: section.trim(),
                    categoryId: category,
                    size: size.trim(),
                    price: +price,
                });
    
                req.file && await Image.create({ //se ejecuta si existe la imagen
                    productId: newProduct.id,
                    name: req.file.filename
                });
    
                return res.redirect('/admin/products');
            }
        }  catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).render('Error in server');
        }

        /*
        const productosCloset = readJson('../db/products.json');

        const {nameProduct, description, category, size, price} = req.body;
        const newProduct = {
            id: productosCloset[productosCloset.length -1].id + 1,
            image: 'default-product-img.jpg',
            nameProduct: nameProduct.trim(),
            description: description.trim(),
            detailedDescription: detailedDescription.trim(),
            condition: condition.trim(),
            stuff: stuff.trim(),
            category,
            size: size.trim(),
            price: +price,
        }

        productosCloset.push(newProduct);
        saveJson('../db/products.json', productosCloset);
        return res.redirect('/products/detail' + newProduct.id);
        */
    },

    edit: (req,res) => {  // editar producto

        const {id} = req.params;
        const productosCloset = readJson('../db/products.json');
        const categories = readJson('../db/categories.json');

        const product = productosCloset.find(product => product.id === +id)

        return res.render('products/productEdit',{
            title: "Editando producto: " + product.nameProduct,
            productosCloset,
            categories,
            ...product
        })
    },

    update: (req,res,next) => { // guardar edición producto y genero el nuevo producto

        const productosCloset = readJson('../db/products.json');

        const {nameProduct, description, category, size, price} = req.body;

        const modifiedProduct = productosCloset.map(product => {

            if (product.id === +req.params.id) {
                product.nameProduct = nameProduct.trim(),
                product.description = description.trim(),
                product.category,
                product.size,
                product.price = +price
            }
            return product;
        });

        saveJson('../db/products.json', modifiedProduct);

        return res.redirect('/admin');
    },

    remove: (req,res,next) => { // eliminar producto
        const id = req.params.id;
        const productosCloset = parseFile(readFile(path));
        const productoFiltrado = productosCloset.filter(producto => producto.id != id);
        writeFile(path, stringifyFile(productoFiltrado));
        res.send(productoFiltrado);
        res.send('producto eliminado');
    }


    
}

module.exports = productController;