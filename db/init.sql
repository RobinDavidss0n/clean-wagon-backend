/**************** SET CHARSET TO UTF-8 ****************/

SET NAMES utf8mb4;

/******************** CREATE TABLES *******************/

CREATE TABLE Users(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(32) NOT NULL,
    password VARCHAR(64) NOT NULL,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT unique_email UNIQUE (email)
);

CREATE TABLE Mowers(
    id INT NOT NULL AUTO_INCREMENT,
    mower_serial VARCHAR(32) NOT NULL,
    user_id INT NOT NULL,
    is_online BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    CONSTRAINT unique_serial UNIQUE (mower_serial)
);

