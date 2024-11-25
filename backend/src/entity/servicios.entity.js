import { EntitySchema } from "typeorm";

const ServicioSchema = new EntitySchema({
  name: "Servicio",
  tableName: "servicios",
  columns: {
    idServicio: {
      type: "int",
      primary: true,
      generated: true,
    },
    nombre: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    descripcion: {
      type: "text",
      nullable: true,
    },
  },
});

export default ServicioSchema;
