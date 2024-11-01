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
    description VARCHAR(655) NOT NULL,
    PRIMARY KEY PK_codeGerencia(codeGerencia)
); 


CREATE TABLE IF NOT EXISTS Inventario (
    codeInventario INT NOT NULL AUTO_INCREMENT,
    date DATE NOT NULL,
    boleta4h TIME NOT NULL,
    boleta2h TIME NOT NULL,
    boleta1h TIME NOT NULL,
    boleta30min TIME NOT NULL,
    stock_boleta4h INT NOT NULL DEFAULT 0,
    stock_boleta2h INT NOT NULL DEFAULT 0,
    stock_boleta1h INT NOT NULL DEFAULT 0,
    stock_boleta30min INT NOT NULL DEFAULT 0,

    precio_boleta4h FLOAT NOT NULL DEFAULT 36.00, 
    precio_boleta2h FLOAT NOT NULL DEFAULT 18.0,
    precio_boleta1h FLOAT NOT NULL DEFAULT 9.0,
    precio_boleta30min FLOAT NOT NULL DEFAULT 4.5,
    
    PRIMARY KEY PK_codeInventario(codeInventario)
);

-- Tabla para control de boletas (Registro de uso)
CREATE TABLE IF NOT EXISTS ControlBoletas (
    codeBoleta INT NOT NULL AUTO_INCREMENT,
    hrs_init TIME NOT NULL, 
    hrs_end TIME NOT NULL,
    role ENUM('COLABORADOR', 'PROYECTO', 'CLIENTE', 'PROVEEDOR'),
    description VARCHAR(255) NOT NULL,
    nameClient VARCHAR(50) NOT NULL,
    codeGerencia INT NOT NULL,
    codeUser INT NOT NULL,
    boletosUsados4h INT NOT NULL,
    boletosUsados2h INT NOT NULL,
    boletosUsados1h INT NOT NULL,
    boletosUsados30min INT NOT NULL,
    date DATE NOT NULL, 
    PRIMARY KEY PK_codeBoleta(codeBoleta),
    CONSTRAINT FK_ControlBoletas_Gerencias FOREIGN KEY (codeGerencia) 
        REFERENCES Gerencias(codeGerencia),
    CONSTRAINT FK_ControlBoletas_Users FOREIGN KEY (codeUser)
        REFERENCES Users(codeUser)
);
 
-- Tabla para historial de inventario (es el resto de lo que quedo en el inventario)
CREATE TABLE IF NOT EXISTS HistorialInventario(
    codeHistorial INT NOT NULL AUTO_INCREMENT,
    codeInventario INT NOT NULL,
    cambio_boleta4h INT NOT NULL,
    cambio_boleta2h INT NOT NULL,
    cambio_boleta1h INT NOT NULL,
    cambio_boleta30min INT NOT NULL,
    PRIMARY KEY PK_codeHistorial(codeHistorial),
    CONSTRAINT FK_HistorialInventario_Inventario FOREIGN KEY (codeInventario)
        REFERENCES Inventario(codeInventario)
);

