const userController = {
    register: function (req, res, next) {
        res.render("users/register", { title: "Registrate - El Closet de Bruja" });
    },

    login: (req,res,next) => {
        res.render("users/login", { title: "Iniciá Sesión - El Closet de Bruja" });
    },
    profile: (req,res,next) => {
        res.render("users/profile", { title: "Tu Perfil - El Closet de Bruja" });
    }

}
module.exports = userController;