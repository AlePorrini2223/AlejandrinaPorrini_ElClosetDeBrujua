//const { v4: uuidv4, validate } = require('uuid');
const bcrypt = require('bcrypt'); //encriptar la contraseña
//const { readJson, saveJson } = require('../utils/fs');
const { validationResult } = require('express-validator'); // resultado de todas las validaciones
const db = require('../database/models');

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
                //const avatar = req.file ? req.file.filename : null;

                const newUser = await db.User.create({
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    password: bcrypt.hashSync(password, 10),
                    validated: false,
                    token: null,
                    lock: false,
                    rolId: 2,
                });
                console.log('Nuevo usuario registrado:', newUser);
                //console.log('Se subió la imagen:', avatar);
                
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
        }  catch (error) {
            return res.status(500).render('error', {
                message: error.message,
        })
        }
    },

    login: (req,res,next) => {
        res.render("users/login");
    },

    processLogin: async (req, res) => {

        //const users = readJson('../db/user.json');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('users/login', {
                errors: errors.mapped(),
                old:req.body,
            });
        } else {
            try {
                const {email, rememberMe} = req.body;
                const user = await db.User.findOne({ where: { email }
                });
        
                req.session.userLogin = {     //establece la sesión del usuario
                    id : user.id,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    rol : user.rolId
                };
                
    
                if(rememberMe){ //si el usuario seleccionó recordar la sesión, guardó la cookie en el navegador
                    res.cookie('userLogin', req.session.userLogin, {maxAge: 30 * 24 * 60 * 60 * 1000}); //La cookie durará 30 días
                }

                return res.redirect('/') //redirecciona a la página de inicio
                /*
            }
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
            }  catch (error) {
            return res.status(500).render('error', {
                message: error.message,
            })}
        }
    },

    profile: async (req,res) => {
        try { 
            
            const isAdmin = user.role.name === 'admin' ? true : false; // verifica si el usuario es administrador

            if (isAdmin) {
                console.log('Usuario Administrador');
                return res.render('/admin', { 
                    title: 'Administrador', 
                    user: user,
                    isAdmin: true
                });
            }

            const user = await db.User.findByPk(req.session.userLogin.id, {  // busca al usuario en la base de datos por su id
                include: [ { association: 'role' } ] 
            });

            return res.render('/users/profile', { 
                title: 'Perfil del usuario', 
                user: user
            });

        }  catch (error) {
            return res.status(500).render('error', {
                message: error.message,
            })}
    },

    update: async (req,res) =>  {
        try {
            const {firstName, lastName, email, password, roleId } = req.body;

            const user = await db.User.findByPk(req.params.id, { 
                include: [ { association: 'roles' } ] 
            }); 

            const emailExists = email && email !== user.email ? await User.findOne({ 
                where: { email, id: { [Sequelize.Op.ne]: id } } // evita comparar al mismo usuario, distinto al mismo id
            }) : null;
            if (emailExists) {
                console.log('El email ya se encuentra registrado.');
                return res.status(400).send('El email ya se encuentra registrado.');
            }

            const userUpdated = await db.User.update({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                password: password ? bcrypt.hashSync(password, 10) : user.password,
                avatar: req.file ? req.file.filename : user.avatar,
                roleId: roleId || user.roleId,
                updatedAt: new Date()
            });

            await userUpdated.save(); //actualiza el usuario en la base de datos

            console.log(`El usuario se actualizó correctamente.`);

            return res.redirect('/users/profile/');

        }  catch (error) {
            return res.status(500).render('error', {
                message: error.message,
        })}
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

            const user = await db.User.findByPk(req.params.id, {
                include: [ { association: 'roles' } ] 
            });

            if (!user) {
                console.error(`No se encontró el usuario.`);
                return res.status(404).send('No se encontró el usuario a eliminar.');
            }

            const userToDelete = await user.destroy(); //elimina el usuario de la base de datos
            console.log(`El usuario ${userToDelete} se eliminó correctamente.`);
            return res.redirect('/admin/users'); 

        }  catch (error) {
            return res.status(500).render('error', {
                message: error.message,
        })}
    }
}
module.exports = userController;