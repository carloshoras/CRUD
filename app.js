const express = require('express');
const app = express();

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
})

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };
    usuarios.push(nuevoUsuario);
})

//esto es una url dinamica, y lo que va con : es comodín
app.get('/usuarios/:nombre', (req, res) => {
    res.json(usuarios.find((usuario) => {
        return usuario.nombre===req.params.nombre
    }))
    /*
    if (!usuario) {
        necesitamos que sea json para consumirlo por el frontend.
        res.status(404).json({mensaje: "usuario no encontrado"})
    }
    */
})

app.put('/usuarios/:nombre', (req, res) => {
    const index = usuarios.findIndex((usuario) => {return usuario.nombre===req.params.nombre})
    const nuevoUsuario = {
        id: usuarios[index].id,
        nombre: req.body.nombre || usuarios[index].nombre,
        edad: req.body.edad || usuarios[index].edad,
        lugarProcedencia: req.body.lugarProcedencia || usuarios[index].lugarProcedencia
    };
    usuarios[index] = nuevoUsuario
})

app.delete('/usuarios/:nombre', (req, res) => {
    usuarios = usuarios.filter((usuario) => {return usuario.nombre!==req.params.nombre})
})

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto 3000');
});