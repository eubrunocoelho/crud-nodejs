CREATE DATABASE book_collection;

USE book_collection;

CREATE TABLE books (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL,
    description TEXT,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;