//const { v4: uuidv4, validate } = require('uuid');
const bcrypt = require('bcrypt'); //encriptar la contraseña
//const { readJson, saveJson } = require('../utils/fs');
const { validationResult } = require('express-validator'); // resultado de todas las validaciones
const { User, Role } = require('../database/models');

const userController = {
    register: (req, res) => {
        res.render("users/register", {
            title: "Registrate - El Closet de Brujua",
            errors: []
        });
    },

    processRegister: async (req, res) => {

        try {
            //const users = readJson('../db/user.json');

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                
                return res.render('users/register', {
                    errors: errors.mapped(),
                    old : req.body
                });
            }

                const {firstName, lastName, email, password } = req.body;
                const avatar = req.file ? req.file.filename : null;
                const newUser = await User.create({
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    password: bcrypt.hashSync(password, 10),
                    image: avatar,
                    validated: false,
                    token: null,
                    lock: false,
                    rolId: 2,
                });
                console.log('Nuevo usuario registrado:', newUser);
                console.log('Se subió la imagen:', avatar);
                
                return res.redirect('/users/login');
            
            /*
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
            */
        } catch (error) {
            console.error("Error al realizarse el registro:", error);
            return res.render('/users/register', {
                error: 'Hubo un error al registrarse, por favor intente nuevamente'
            });
        }
    },

    login: (req,res,next) => {
        res.render("users/login");
    },

    processLogin: async (req, res) => {

        try {
            //const users = readJson('../db/user.json');
            const {email, rememberMe} = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('users/login', {
                    errors: errors.mapped()
                });
            }

            const user = await User.findOne({ where: { email } });
            
            req.session.userLogin = {     //establece la sesión del usuario
                id : user.id,
                firstName : user.firstName,
                lastName : user.lastName,
                rol : user.rolId,
                avatar: user.image
            };
            

            if(rememberMe){ //si el usuario seleccionó recordar la sesión, guardó la cookie en el navegador
                res.cookie('userLogin', req.session.userLogin, {maxAge: 30 * 24 * 60 * 60 * 1000}); //La cookie durará 30 días
            }
            return res.redirect('/') //redirecciona a la página de inicio
            /*
            const user = users.find(user => user.email === email && bcrypt.compareSync(password, user.password))
            if(!user){
                return res.render('users/login',{
                    error : "Credenciales inválidas"
                });
            }
            
            req.session.userLogin = {     //levanta la sesión del usuario
                id : user.id,
                firstName : user.firstName,
                lastName : user.lastName,
                rol : user.rol,
                avatar: user.avatar
            };
            if(rememberMe){ //si el usuario seleccionó recordar la sesión, guardó la cookie en el navegador
                res.cookie('userLogin', req.session.userLogin, {maxAge: 30 * 24 * 60 * 60 * 1000}); //La cookie durará 30 días
            }
            return res.redirect('/') //redirecciona a la página de inicio
            */
        } catch (error) {            
            console.error("Error al intentar loguearse:", error);
            return res.render('users/login', {
                error: 'Hubo un error al loguearse, por favor intente nuevamente'
            });
        }

    




},

    profile: async (req,res) => {
        try { 
            const user = await User.findByPk(req.session.userLogin.id, {  // busca al usuario en la base de datos por su id
                include: { model: Role, as: 'role' }
            });

            const isAdmin = user.role.name === 'admin' ? true : false; // verifica si el usuario es administrador
            if (isAdmin) {
                console.log('Usuario Administrador');
                return res.render('users/profile', { 
                    title: 'Perfil del usuario', 
                    user: user,
                    isAdmin: isAdmin
                });
            }else {
                return res.render('users/profile', { 
                    title: 'Perfil del usuario', 
                    user: user,
                    isAdmin: false
                });
            }
        } catch (error) {
            console.error('Error al cargar el perfil:', error);
            return res.status(500).render('Ocurrió un error al cargar el perfil. Disculpe las molestias.');
        }
    },

    update: async (req,res) =>  {
        try {
            const {firstName, lastName, email, password, roleId } = req.body;
            const userId = req.params.id; //obtiene el id del usuario a editar

            const user = await User.findByPk(userId, { //busca al usuario por su id
                include: { model: Role, as: 'roles' } 
            }); 
            if (!user) {
                console.error('Usuario no registrado. Debe registrarse para ingresar...');
                return res.status(404).redirect('/register');
            }

            const emailExists = email && email !== user.email ? await User.findOne({ 
                where: { email, id: { [Sequelize.Op.ne]: id } } // evita comparar al mismo usuario, distinto al mismo id
            }) : null;
            if (emailExists) {
                console.log('El email ya se encuentra registrado.');
                return res.status(400).send('El email ya se encuentra registrado.');
            }

            user.set({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                password: password ? bcrypt.hashSync(password, 10) : user.password,
                avatar: req.file ? req.file.filename : user.avatar,
                roleId: roleId || user.roleId,
                updatedAt: new Date()
            });

            await user.save(); //actualiza el usuario en la base de datos

            console.log(`El usuario ${userId} se actualizó correctamente.`);

            return res.redirect('users/profile/' + userId);
        } catch (error) {
            console.error('Error al editar el usuario:', error);
            return res.status(500).render('Ocurrió un error al editar el usuario. Disculpe las molestias.');
        }
    },

    logout: (req,res) => {
    console.log("Usuario deslogueado");
    req.session.destroy(); //destruye la sesión del usuario
    res.clearCookie('userLogin'); //elimina la cookie del navegador
    return res.redirect('/'); //redirecciona a la página de inicio
    },

    removeUser: async (req,res) => {
        try {

            if(req.session.userLogin.role !== 'admin') { // si el usuario no es administrador, no otorga permisos para eliminar usuarios
                console.log('No tiene permisos para eliminar usuarios.');
                return res.status(403).send('No tiene permisos para eliminar usuarios.');
            }

            const userId = req.params.id; //obtiene el id del usuario a eliminar
            const user = await User.findByPk(userId, {
                include: { model: Role, as: 'role' } 
            });
            if (!user) {
                console.error(`No se encontró el usuario ${userId}.`);
                return res.status(404).send('No se encontró el usuario a eliminar.');
            }

            await user.destroy(); //elimina el usuario de la base de datos
            console.log(`El usuario se eliminó correctamente.`);
            return res.redirect('/admin/users'); 
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            return res.status(500).render('Ocurrió un error al eliminar el usuario. Disculpe las molestias.');
            
        }
    }
}
module.exports = userController;