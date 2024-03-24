CREATE TABLE aplicantes (
  aplicante_id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  correo_electronico VARCHAR(50) NOT NULL,
  cedula NUMERIC(20) NOT NULL
);

CREATE TABLE contactos (
  contacto_id SERIAL PRIMARY KEY,
  mensaje TEXT NOT NULL,
  fecha_contacto DATE NOT NULL,
  motivo_contacto VARCHAR(50) NOT NULL CHECK (motivo_contacto IN ('reclamo', 'sugerencia', 'informacion', 'postulacion')),
  fk_aplicante INTEGER,
  FOREIGN KEY (fk_aplicante) REFERENCES aplicantes(aplicante_id)
);

CREATE TABLE productos (
  producto_id SERIAL PRIMARY KEY,
  nombre_producto VARCHAR(100) NOT NULL,
  descripcion_producto TEXT NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  imagen_principal_producto BYTEA 
);

CREATE TABLE presentaciones (
  presentacion_id SERIAL PRIMARY KEY,
  tipo_unidad_venta VARCHAR(50) NOT NULL CHECK (tipo_unidad_venta IN ('Tambor de 190 Kg. Promedio','Tina de 200 g.','Barra de 3 Kg. Promedio','Barra de 1 Kg. Promedio','Galón de 4 Kg. Promedio','Galón de 1 Kg. Promedio','Bolsa de 1 Kg. Promedio','Bolsa de 10 Kg. Promedio','Paquete de 400 g.')),
  precio_unidad_venta NUMERIC NOT NULL,
  unidad_venta NUMERIC NOT NULL, 
  imagen_presentacion BYTEA ,
  fk_producto INTEGER,
  FOREIGN KEY (fk_producto) REFERENCES productos(producto_id)
);

