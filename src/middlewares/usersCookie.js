const userCookie = (req, res, next) => {
    if (req.cookies && req.cookies.userLogin && !req.session.userLogin) {
       req.session.userLogin = req.cookies.userLogin; //Transfiere la información de la cookie a la sesión.
    }
    next();
}

module.exports = userCookie;


/* 
Éste middleware verifica si hay una cookie de usuario y si es así, la transfiere a la sesión del usuario.
Se ejecuta el bloque de código siguiente si la cookie userLogin existe, y la sesión userLogin no está iniciada.
Es útil para mantener la sesión del usuario activa incluso después de que se haya cerrado el navegador o se haya reiniciado el servidor.
*/