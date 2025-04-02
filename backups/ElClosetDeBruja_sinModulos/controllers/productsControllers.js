const db = require('../db/index');
const productController = {

    productList: (req,res) => {
        return res.render('products/productList', { productosCloset: db.lista }, );
    },

    productCartl: (req,res,next) => {
        res.render('products/productCartl', { title: 'Carrito - El Closet de Brujua' });
    },

    productDetail: (req,res) => {
        
        const producto = db.lista.find(producto => producto.id == req.params.id);
        
        if (producto) {    
            res.render('products/productDetail', { producto });
        } else {
            res.send('El producto seleccionado no existe');
        }
    }
}

module.exports = productController;