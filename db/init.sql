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

CREATE TABLE Journeys(
    id INT NOT NULL AUTO_INCREMENT,
    mower_id INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (mower_id) REFERENCES Mowers(id)
);

CREATE TABLE Coordinates(
    id INT NOT NULL AUTO_INCREMENT,
    journey_id INT NOT NULL,
    x INT NOT NULL,
    y INT NOT NULL,
    time TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (journey_id) REFERENCES Journeys(id)
);

CREATE TABLE Events(
    id INT NOT NULL AUTO_INCREMENT,
    mower_id INT NOT NULL,
    coordinate_id INT NOT NULL,
    event_type VARCHAR(32),
    image_id VARCHAR(32),
    object_desc VARCHAR(32),
    time TIMESTAMP NOT NULL,
    is_event BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (mower_id) REFERENCES Mowers(id),
    FOREIGN KEY (coordinate_id) REFERENCES Coordinates(id)
);


/******************** INSERT INITIAL DATA *******************/

INSERT IGNORE INTO Users (email, password, first_name, last_name)
VALUES ('testUser@cln-wgn.com', 'secretPassword', 'Mike', 'Michaels');

INSERT IGNORE INTO Mowers (mower_serial, user_id, is_online)
VALUES ('CLN-WGN-1', 1, 0);

INSERT IGNORE INTO Journeys (mower_id, start_time, end_time)
VALUES (1, NOW(), null);

INSERT IGNORE INTO Coordinates (journey_id, x, y, is_event, time)
VALUES (1, 1337, 69, 0, NOW());

INSERT IGNORE INTO Events (mower_id, coordinate_id, event_type, image_id, object_desc, time)
VALUES (1, 1, 'obstruction', null, 'somethingBig', NOW());