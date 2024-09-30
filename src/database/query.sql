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

CREATE TABLE IF NOT EXISTS Inventario (
    codeInventario INT NOT NULL AUTO_INCREMENT,
    date DATE NOT NULL,
    boleta4h TIME NOT NULL,
    boleta2h TIME NOT NULL,
    boleta1h TIME NOT NULL,
    boleta30min TIME NOT NULL,
    gasto FLOAT NOT NULL,
    PRIMARY KEY PK_codeInventario(codeInventario)
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
    boletosUsados4h INT,
    boletosUsados2h INT,
    boletosUsados1h INT,
    boletosUsados30min INT,
    PRIMARY KEY PK_codeBoleta(codeBoleta),
    CONSTRAINT FK_ControlBoletas_Gerencias FOREIGN KEY (codeGerencia) 
        REFERENCES Gerencias(codeGerencia),
    CONSTRAINT FK_ControlBoletas_Users FOREIGN KEY (codeUser)
        REFERENCES Users(codeUser)
);

CREATE TABLE IF NOT EXISTS GastosBoletas (
    codeGastosBoletas INT NOT NULL AUTO_INCREMENT, 
    boleta4 INT,
    boleta2 INT,
    boleta1 INT,
    boleta030 INT, 
    codeBoleta INT NOT NULL,
    PRIMARY KEY PK_codeGastosBoletas(codeGastosBoletas),
    CONSTRAINT FK_GastosBoletas_ControlBoletas FOREIGN KEY (codeBoleta)
        REFERENCES ControlBoletas(codeBoleta)
);