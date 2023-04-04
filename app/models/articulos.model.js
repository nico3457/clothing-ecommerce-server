module.exports = mongoose => {
    const articulos = mongoose.model(
      "articulos",
      mongoose.Schema(
        {
          nombre: String,
          descripcion: String,
          precio: Number,
          color: String,
          tallas: Array,
          imagenes: Array,
          cantidad: Number
        },
        { timestamps: true }
      ), "articulos"
    );
  
    return articulos;
  };