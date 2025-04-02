const fs = require('fs');
const path = require ('path');

const { toThousand } = require('../utils/index');
const { readJson, saveJson } = require('../utils/fs');



const productController = {

    list: (req,res) => {
        const productosCloset = readJson('../db/products.json');
        return res.render('products/productsList', {
            productosCloset,
            toThousand,
        });
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

    detail: (req,res) => {

        const productosCloset = readJson('../db/products.json');
        const product = productosCloset.find(product => product.id === +req.params.id);

        if (product) {    
            res.render('products/productDetail', { product });
        } else {
            res.send('Hubo un error al seleccionar el producto');
        }
    },

    cartl: (req,res,next) => {  // compra producto 
        res.render('products/productCartl', { title: 'Carrito - El Closet de Brujua' });
    },

    add: (req,res) => { // formulario agregar producto

        const productosCloset = readJson('../db/products.json');
        const categories = readJson('../db/categories.json');

        res.render('products/productAdd', {
            title: "Creación de Productos",
            productosCloset,
            categories
        });
    },

    create: (req,res) => { // guarda y crea producto

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