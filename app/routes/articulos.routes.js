module.exports = app => {
    const Articulos = require("../controllers/articulos.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", Articulos.create);
  
    router.get("/", Articulos.findAll);
    router.get("/filtros", Articulos.findAllbyFilter);
  
    router.get("/:id", Articulos.findOne);
  
    router.put("/:id", Articulos.update);
  
    router.delete("/:id", Articulos.delete);
  
    router.delete("/", Articulos.deleteAll);
  
    app.use('/api', router);
  };