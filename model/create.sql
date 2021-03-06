 DROP TABLE if exists `users`;

 CREATE TABLE `users` (
`id` INT NOT NULL AUTO_INCREMENT, 
`nickname` VARCHAR(255) NOT NULL,
`email` VARCHAR(255) NOT NULL,
`firstname` VARCHAR(255) NOT NULL, 
`lastname` VARCHAR(255) NOT NULL,
`password` VARCHAR(255) NOT NULL,
PRIMARY KEY(`id`)
     );

DROP TABLE if exists `prompts`; 

CREATE TABLE `prompts`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `text` VARCHAR( 255 ) NOT NULL,
    `requirements` VARCHAR( 255 ) NOT NULL, 
    `user_id` INT NOT NULL,
    `category_id` INT NOT NULL, 
    `favorite` TINYINT(1) NOT NULL,
    `public` TINYINT(1) NOT NULL,
    PRIMARY KEY(`id`),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    
    DROP TABLE if exists `categories`;

    CREATE TABLE `categories` (
        `id` INT NOT NULL AUTO_INCREMENT, 
        `name` VARCHAR(255) NOT NULL, 
        `description` VARCHAR(255)  NOT NULL, 
        `user_id` INT  NOT NULL,
        PRIMARY KEY(`id`)
        );
    
    ALTER TABLE `prompts` ADD CONSTRAINT `prompts_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);
    
    ALTER TABLE `prompts` ADD CONSTRAINT `prompts_fk1` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`);
    
    ALTER TABLE `categories` ADD CONSTRAINT `categories_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

    INSERT INTO `users` (nickname, email, firstname, lastname, password) VALUES (("public"), ("public"), ("public"), ("public"), ("root"));

    INSERT INTO `categories` (name, description, user_id) VALUES (("Favorites"), ("Your favorites prompts"), ("1"));
    
    INSERT INTO `categories` (name, description, user_id) VALUES (("General"), ("Space for random topics"), ("1"));