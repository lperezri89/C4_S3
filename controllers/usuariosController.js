const Usuario = require("../models/Usuarios");
const bcrypt = require("bcrypt");

exports.crearUsuario = async (req, res) => {
    //console.log(req.body);
    const {password , email } = req.body;

    try {
        //Revisar que sea unico usuario email registrado
        
        let usuario = await Usuario.findOne({ email});

        if (usuario) {
            return res.status(404).json({ msg : "El usuario ya existe"});
        }


        //crear el nuevo usuario
     usuario = new Usuario(req.body);
        //hash
        usuario.password = await bcrypt.hash(password, 10);

        // guardar en la base de datos
        const usuarioAlmacenado = await usuario.save();

        res.json(usuarioAlmacenado)

    } catch (error) {
        console.log(error)
    }
};


