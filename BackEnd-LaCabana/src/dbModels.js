import { PGConnection } from "./classes/dbConnection.js";
import pkgSequelize from "sequelize";
import dotenv from "dotenv";

const { DataTypes } = pkgSequelize;
dotenv.config();

const userConnection = new PGConnection(
  process.env.PGHOST,
  process.env.PGPORT,
  process.env.PGDATABASE,
  process.env.U_USER,
  process.env.U_PASSWORD
);

const productConnection = new PGConnection(
  process.env.PGHOST,
  process.env.PGPORT,
  process.env.PGDATABASE,
  process.env.P_USER,
  process.env.P_PASSWORD
);

const Aplicante = userConnection.sequelize.define(
  "aplicantes",
  {
    aplicante_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    correo_electronico: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cedula: {
      type: DataTypes.NUMERIC(20),
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

const Contacto = userConnection.sequelize.define(
  "contactos",
  {
    contacto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_contacto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    motivo_contacto: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [["reclamo", "sugerencia", "informacion", "postulacion"]],
      },
    },
  },
  { timestamps: false, freezeTableName: true }
);

Contacto.belongsTo(Aplicante, { foreignKey: "fk_aplicante" });

const Producto = productConnection.sequelize.define(
  "productos",
  {
    producto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_producto: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion_producto: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    imagen_principal_producto: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

const Presentacion = productConnection.sequelize.define(
  "presentaciones",
  {
    presentacion_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo_unidad_venta: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [["tambor", "tina", "barra", "galon", "sobre"]],
      },
    },
    precio_unidad_venta: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    unidad_venta: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    imagen_presentacion: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

Producto.hasMany(Presentacion, { foreignKey: "fk_producto" });
Presentacion.belongsTo(Producto, { foreignKey: "fk_producto" });

export { Aplicante, Contacto, Producto, Presentacion };
