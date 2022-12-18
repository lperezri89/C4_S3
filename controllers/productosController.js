const Productos = require("../models/Productos");




exports.obtenerProductosHome = async ( req, res) => {
    try{
        const productos = await Productos.find();

 

        res.json({ productos });
    }catch(error){
        console.log(error);
    }

 

};

 

exports.obtenerProducto = async ( req, res) => {
    const { id } = req.params
    const producto = await Productos.find().where("categoriaId").equals(id);
    res.json(producto);

 

};
exports.crearProducto = async ( req, res) => {
    try{
        const producto = new Productos(req.body);

 

        producto.save();
        res.json(producto);
    }catch(error){
        console.log(error);
    }
};
exports.actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Productos.findById(id);

    if (!producto) {
        return res.status(400).json({ msg: "Producto no encontrado" });
    }
    if (producto.creador.toString() !== req.usuario.id.toString()) {
        return res.status(400).json({ msg: "acción no válida para este ususario" });
    }

    producto.nombre = req.body.nombre || producto.nombre;

    producto.save();

    res.json({ producto });
};

exports.borrarProducto = async (req, res) => {
    try {
        await Productos.deleteOne({ _id: req.params.id });
        res.json({ msg: "Producto eliminado" });
    } catch (error) {
        console.log(error);
    }
};