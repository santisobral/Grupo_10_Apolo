

create database if not exists `apoloss`;
use `apoloss`;


CREATE TABLE `users` (
   `ID` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `lastname` VARCHAR(255) NOT NULL,
   `birthdate` DATE,
   `email` VARCHAR(255) NOT NULL,
   `pass` VARCHAR(255) NOT NULL,
   `role_id` INT NOT NULL,
   `avatar` VARCHAR(255),
   `deleted` INT,
   PRIMARY KEY (`ID`)
);

CREATE TABLE `roles` (
   `id` INT AUTO_INCREMENT,
   `role` VARCHAR(255) NOT NULL,
   `deleted` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
   `ID` INT AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `description` TEXT,
   `price` INT,
   `brand` VARCHAR(255),
   `size_id` INT,
   `category_id` INT,
   `discount` INT,
   `image` VARCHAR(255),
   `gender` VARCHAR(255),
   `deleted` INT,
   PRIMARY KEY (`ID`)
);

CREATE TABLE `sizes` (
   `ID` INT AUTO_INCREMENT,
   `size` VARCHAR(255) NOT NULL,
   `deleted` INT,
   PRIMARY KEY (`ID`)
);

CREATE TABLE `categories` (
   `ID` INT AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `deleted` INT,
   PRIMARY KEY (`ID`)
);


ALTER TABLE `users` ADD CONSTRAINT `FK_fc206963-88f0-443b-b8bb-453b59865cc3` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`);

ALTER TABLE `products` ADD CONSTRAINT `FK_256acb5a-3713-4c04-8a83-41aa5fa89103` FOREIGN KEY (`size_id`) REFERENCES `sizes`(`ID`);

ALTER TABLE `products` ADD CONSTRAINT `FK_3aedeadb-be8c-42a1-a9dd-50160689b68a` FOREIGN KEY (`category_id`) REFERENCES `categories`(`ID`);

