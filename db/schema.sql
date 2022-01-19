DROP DATABASE IF EXISTS todos_db;
CREATE DATABASE todos_db;

USE todos_db;

CREATE TABLE todos (
    id INT NOT NULL AUTO_INCREMENT,
    task VARCHAR(30) NOT NULL,
    completed BOOLEAN DEFAULT false,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- will be the unique identifier
    PRIMARY KEY (id)
);