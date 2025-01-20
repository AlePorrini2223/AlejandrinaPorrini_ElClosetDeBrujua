const adminController = {

    admin: (req,res) => {
        res.render("admin", { title: "Gestion de productos - El Closet de Bruja" });
    },
    productAdd: (req,res) => {
        res.send('Vista del admin donde se puede agregar los productos');
    },
    productEdit: (req,res) => {
        res.send('Vista del admin donde se puede editar los productos');
    },
}
module.exports = adminController;