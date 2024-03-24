-- Create the user
CREATE USER usuario_lacabana WITH PASSWORD 'la-cabana-2023';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON TABLE aplicantes TO usuario_lacabana;
GRANT ALL PRIVILEGES ON TABLE CONTACTOS TO usuario_lacabana;
GRANT SELECT ON TABLE PRODUCTOS TO usuario_lacabana;
GRANT SELECT ON TABLE PRESENTACIONES to usuario_lacabana;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO usuario_lacabana;

-- Create the user
CREATE USER ver_p_lacabana WITH PASSWORD 'productos-la-cabana-2023';

-- Grant privileges to the user
GRANT USAGE ON SCHEMA public TO ver_p_lacabana;
GRANT SELECT ON TABLE PRODUCTOS TO ver_p_lacabana;
GRANT SELECT ON TABLE PRESENTACIONES TO ver_p_lacabana;
