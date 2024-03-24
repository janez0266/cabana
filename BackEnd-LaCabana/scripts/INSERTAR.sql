-- Insert data into productos table
INSERT INTO productos (nombre_producto, descripcion_producto, categoria, imagen_principal_producto)
VALUES ('Queso Cheddar', 'Es un queso de consistencia firme o semiduro, graso, por su capacidad de fundirse es ideal para disfrutar con hamburguesas, pastas, sandwiches, papas fritas y todo tipo de snack. El queso cheddar dependiendo de la edad, puede tener diferente  color y sabor puede ir desde un blanco pálido hasta un naranja intenso, dependiendo del nivel de maduración.', 'Uso Industrial', pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/industrial.jpg')),
       ('Queso Cheddar', 'Es un queso de consistencia firme o semiduro, graso, por su capacidad de fundirse es ideal para disfrutar con hamburguesas, pastas, sandwiches, papas fritas y todo tipo de snack. El queso cheddar dependiendo de la edad, puede tener diferente  color y sabor puede ir desde un blanco pálido hasta un naranja intenso, dependiendo del nivel de maduración.', 'Consumo directo', pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/cheddar3kg.jpg')),
       ('Queso Gouda', 'Es un queso madurado semiduro que se elabora a partir de leche pasteurizada de vaca.  Presenta  una textura interior firme,  de color amarillento.  Además, durante el proceso de elaboración se impregna en salmuera, lo que enriquece el sabor de la corteza y lo dota de un mejor aroma. Es un queso rebanable. Delicioso en sandwiches, como aperitivo,etc.', 'Consumo directo', pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/gouda.jpeg')),
       ('Queso Munster', 'Es un queso tierno, de textura suave y cremosa, con una corteza de consistensia firme y  color naranja  y un interior blanco, con un sabor suave  ligeramente ácido. A medida que el queso madura, el sabor se vuelve más fuerte y picante. Suele servirse como aperitivo. Gracias a que funde bien, se usa a menudo en platos como los sándwiches de queso, las quesadillas, macarrones con queso y las hamburguesas con queso. ', 'Consumo directo', pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/munster3kg.jpg')),
       ('Queso Fundido para Untar', 'Es un queso procesado que se obtiene mezclando queso cheddar con otros ingredientes para obtener una consistencia cremosa y untable. Es un delicioso queso fundido para untar, ideal para disfrutar con hamburguesas, pastas, sandwiches, papas fritas y todo tipo de snack.', 'Food service /Servicio de Comida', pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/fundidofoodservice.jpg')),
       ('Queso Fundido para Untar', 'Es un queso procesado que se obtiene mezclando queso cheddar con otros ingredientes para obtener una consistencia cremosa y untable. Es un delicioso queso fundido para untar, ideal para disfrutar con hamburguesas, pastas, sandwiches, papas fritas y todo tipo de snack.', 'Consumo directo', pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/fundidoconsumo.jpg')),
       ('Ricotta con ó sin Sal', 'Es un queso de textura granulosa obtenido a partir de  el suero de leche, se consume fresco, sin prensar, con adición o no de sal. De color blanco, su textura es blanda y granulosa. Su sabor es suave, convirtiéndose en el queso perfecto para la elaboración de postres, para rellenar pasta (ravioli, tortellini, canelones, lasaña). Mezclada con fruta o frutos secos, es un tradicional dulce casero.', 'Consumo directo /Postres,cremas', pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/ricotta1kg.jpg')),
       ('Chicha Instantanea', 'Es  una mezcla instantanea  para preparar chicha a base de harina de arroz, contiene solidos de leche y vainilla. No requiere agregar leche para su preparación. Es rendidora y muy fácil de preparar. Puedes  Adicionar canela o hielo si lo deseas ó cualquier otro cereal, confite o chocolate.', 'Consumo directo', pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/chicha.jpg')),
       ('Mezcla en polvo para preparar Bebida Achocolatada', 'Es una mezcla achocolatada. Sólo agregas 3 cucharadas de esta mezcla en un vaso de leche fría o caliente y mezclas bien hasta que se disuelva. Es una bebida que puedes disfrutar a cualquier hora con familiares y amigos.', 'Consumo directo', pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/chocolate.jpg')),
       ('Queso Monterrey Rallado', 'Es un queso semimadurado que se ralla para hacer que su aplicación sea más conveniente para el consumidor. Uno de los quesos más ricos en una presentación lista para añadir en tus platillos favoritos.', 'Consumo directo', pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/monterrey.jpg'));

-- Insert data into presentaciones table
INSERT INTO presentaciones (tipo_unidad_venta, precio_unidad_venta, unidad_venta, imagen_presentacion, fk_producto)
VALUES ('Tambor de 190 Kg. Promedio', 1805, 1, pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/tambor.jpg'), 1),
       ('Barra de 3 Kg. Promedio', 33.6, 1, pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/cheddar3kg.jpg'), 2),
       ('Barra de 3 Kg. Promedio', 32.43, 1, pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/gouda3kg.jpeg'), 3),
       ('Barra de 1 Kg. Promedio', 10.81, 1, pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/gouda1kg.jpeg'), 3),
       ('Barra de 3 Kg. Promedio', 33.15, 1, pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/munster3kg.jpg'), 4),
       ('Bolsa de 1 Kg. Promedio', 0.8, 1, pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/ricotta1kg.jpg'), 7),
       ('Bolsa de 10 Kg. Promedio', 8, 1, pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/ricotta10kg.jpg'), 7),
       ('Galón de 4 Kg. Promedio', 32.8, 1, pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/fundido4kg.jpg'), 5),
       ('Galón de 1 Kg. Promedio', 8.2, 1, pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/fundido1kg.jpg'), 5),
       ('Tina de 200 g.', 30.6, 18, pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/fundidotina.jpg'), 6),
       ('Paquete de 400 g.', 48, 30, pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/chicha.jpg'), 8),
       ('Paquete de 400 g.', 63, 30, pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/chocolate.jpg'), 9),
       ('Bolsa de 1 Kg. Promedio', 10.9, 1, pg_read_binary_file('/var/lib/postgresql/FOTOPRODUCTOS/monterrey.jpg'), 10);
