const db = require("../models");
const Articulos = db.articulos;

exports.create = (req, res) => {
    if (!req.body.nombre || req.body.cantidad < 0 || req.body.precio < 0) {
        res.status(400).json({ message: "Content can not be empty!" });
        return;
    }
    const articulo = new Articulos({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        color: req.body.color,
        tallas: req.body.tallas,
        imagenes: req.body.imagenes,
        cantidad: req.body.cantidad
    })
    articulo.save(articulo).then(data => {
        res.json('{mensaje:"Articulo creado con exito",_id:"'+ data._id+'"}');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ha ocurrido un error al crear el articulo."
        });
    });
};

exports.findAllbyFilter = (req, res) => {
    const filtros = req.query;
    Object.keys(filtros).forEach(filtro => {
    if (filtro == "nombre" || filtro == "descripcion" || filtro == "color" || filtro =="categoria" || filtro =="sub_categoria") {
        var objeto = new Object();
        objeto.$regex = new RegExp(filtros[filtro]);
        objeto.$options = 'i';
        filtros[filtro] = objeto;
    } else if (filtro === "precio") {
      var objeto = new Object();
      let precio_1 =  parseFloat(filtros[filtro].split("-")[0]);
      let precio_2 = parseFloat(filtros[filtro].split("-")[1]);
      objeto.$lt = precio_2;
      objeto.$gt = precio_1;
      filtros[filtro] = objeto;
    } else if (filtro === 'tallas') {
      var objeto = new Object();
      objeto.$in = filtros[filtro].split("-");
      filtros[filtro] = objeto;
    } else if (filtro === 'cantidad') {
      var objeto = new Object();
      if (filtros[filtro].indexOf(">") != -1) {
        objeto.$gt = filtros[filtro].split(">")[0];
        filtros[filtro] = objeto;
      } else if (filtros[filtro].indexOf("<") != -1) {
        objeto.$lt = filtros[filtro].split("<")[0];
        filtros[filtro] = objeto;
      } else {
        filtros[filtro] = filtros[filtro].split("=")[0];
      }
    }
    
    });
    Articulos.find(filtros)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha ocurrido un error en la busqueda de los articulos."
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;
    Articulos.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "No se encontro el articulo con id: " + id });
        else res.json(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Ha ocurrido un error al buscar el articulo con id: " + id });
      });
  };

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "¡Los valores no pueden estar en blanco!"
      });
    }
    const id = req.params.id;
  
    Articulos.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `¡No se puede actualizar el articulo con id: ${id}. Quizas no se encontro!`
          });
        } else res.json('{ "message": "Articulo actualizado correctamente.","_id":"'+data._id+'"}');
      })
      .catch(err => {
        res.status(500).send({
          message: "Ha ocurrido un error al actualizar el articulo con id: " + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
    Articulos.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `¡No se puede borrar el articulo con id: ${id}. Quizas no se encontro!`
          });
        } else {
          res.json({
            message: "Articulo borrado correctamente."
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ha ocurrido un error al borrar el articulo con id: " + id   
        });
      });
  };

exports.deleteAll = (req, res) => {
    Articulos.deleteMany({})
      .then(data => {
        res.json({
          message: `¡${data.deletedCount} Articulos borrados satisfactoriamente!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha ocurrido un error al borrar todos los articulos."
        });
      });
  };

  exports.findAll = (req, res) => {
    Articulos.find({})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Articuloss."
        });
      });
  };

  exports.find20 = (req, res) => {
    Articulos.find({}).limit(20)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Articuloss."
        });
      });
  };