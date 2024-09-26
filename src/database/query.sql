CREATE DATABASE IF NOT EXISTS gestorDeBoletas;

USE gestorDeBoletas;

CREATE TABLE IF NOT EXISTS Users (
    codeUser INT NOT NULL AUTO_INCREMENT,
    nameUser VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(9) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    phone VARCHAR(9) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'GERENTE', 'CLIENTE') NOT NULL DEFAULT 'CLIENTE',
    state ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    PRIMARY KEY PK_codeUser(codeUser)
);

CREATE TABLE IF NOT EXISTS Gerencias (
    codeGerencia INT NOT NULL AUTO_INCREMENT,
    nameGerencia VARCHAR(50) NOT NULL,
    nameEncargado VARCHAR(50) NOT NULL,
    telefonoEncargado VARCHAR(9) NOT NULL,
    emailEncargado VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY PK_codeGerencia(codeGerencia)
);

CREATE TABLE IF NOT EXISTS ControlBoletas (
    codeBoleta INT NOT NULL AUTO_INCREMENT,
    hrs_init TIME NOT NULL, 
    hrs_end TIME NOT NULL,
    role ENUM('TRABAJADOR', 'VISITA'),
    description VARCHAR(255) NOT NULL,
    nameClient VARCHAR(50) NOT NULL,
    codeGerencia INT NOT NULL,
    codeUser INT NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY PK_codeBoleta(codeBoleta),
    CONSTRAINT FK_ControlBoletas_Gerencias FOREIGN KEY (codeGerencia) 
        REFERENCES Gerencias(codeGerencia),
    CONSTRAINT FK_ControlBoletas_Users FOREIGN KEY (codeUser)
        REFERENCES Users(codeUser)
);

CREATE TABLE IF NOT EXISTS Inventario (
    codeInventario INT NOT NULL AUTO_INCREMENT,
    date DATE NOT NULL,
    boleta_4h INT NOT NULL,
    boleta_2h INT NOT NULL,
    boleta_1h INT NOT NULL,
    boleta_30min INT NOT NULL,
    gasto FLOAT NOT NULL,
    PRIMARY KEY PK_codeInventario(codeInventario)
);