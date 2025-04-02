const { v4: uuidv4, validate } = require('uuid');
const bcrypt = require('bcrypt');
const { readJson, saveJson } = require('../utils/fs');


const userController = {
    register: function (req, res) {
        res.render("users/register", {
            title: "Registrate - El Closet de Bruja" 
        });
    },

    processRegister: function (req, res) {

        const users = readJson('../db/user.json');
        const {firstName, lastName, email, password } = req.body;
        const newUser = {
            id : uuidv4(),
            firstName : firstName.trim(),
            lastName: lastName.trim(),
            email : email.trim(),
            password : bcrypt.hashSync(password, 10),
            validate : true,
            token : null,
            lock : false,
            rol : 'user'
        };

        users.push(newUser)
        saveJson('../db/user.json', users);

        return res.redirect('/users/login');
        
    },

    login: (req,res,next) => {
        res.render("users/login");
    },

    processLogin: (req,res) => {

        const users = readJson('../db/user.json');
        const {email, password} = req.body;

        const user = users.find(user => user.email === email && bcrypt.compareSync(password, user.password))

        if(!user){
            return res.render('users/login',{
                error : "Credenciales inválidas"
            })
        }

        req.session.userLogin = {       //levanta sesión del usuario
            id : user.id,
            firstName : user.firstName,
            rol : user.rol
        }

        return res.redirect('/')
    





    },

    profile: (req,res) => {
        res.render("users/profile", { title: "Tu Perfil - El Closet de Bruja" });
    },

    userAdmin: (req,res) => {
        res.render("users/usersAdmin", {
            title: "Administración de Usuarios" 
        });
    }

    /*
    logout: (req,res,next) => {
    res.send("usuario deslogueado");
    },
    */
}
module.exports = userController;