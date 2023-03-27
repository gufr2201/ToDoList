CREATE DATABASE todo_list;

CREATE TABLE user_info (
    user_id int PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR (100) NOT NULL,
    password VARCHAR (100) NOT NULL,
    INDEX username_idx (username) 
);

CREATE TABLE todo(
    id int PRIMARY KEY AUTO_INCREMENT,
    todo_task VARCHAR (100) NOT NULL,
    username VARCHAR (100) NOT NULL,

    FOREIGN KEY (username) REFERENCES user_info(username) ON DELETE CASCADE
);