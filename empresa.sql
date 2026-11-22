CREATE DATABASE IF NOT EXISTS empresa;
USE empresa;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  user_name varchar(100) NOT NULL,
  user_mail varchar(100) NOT NULL,
  user_password varchar(100) NOT NULL,
  PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS empleado;
CREATE TABLE empleado (
  emp_id int(11) NOT NULL AUTO_INCREMENT,
  emp_name varchar(100) NOT NULL,
  emp_lastname varchar(100) NOT NULL,
  emp_phone varchar(20) NOT NULL,
  emp_mail varchar(100) NOT NULL,
  emp_address varchar(200) NOT NULL,
  PRIMARY KEY (emp_id)
);

-- Los administradores se dan de alta directamente en la base de datos
INSERT INTO user (user_name, user_mail, user_password) VALUES ('Administrador', 'admin@taller.com', 'admin123');
