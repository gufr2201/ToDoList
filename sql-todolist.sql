CREATE SCHEMA `todo_list` ;

CREATE TABLE user_info(
    user_id int PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR (100) NOT NULL,
    password VARCHAR (100) NOT NULL   
);

CREATE TABLE todo(
    id int PRIMARY KEY AUTO_INCREMENT,
    todo_task VARCHAR (100) NOT NULL,
    username VARCHAR (45) NOT NULL,

    FOREIGN KEY (username) REFERENCES user_info(username) ON DELETE CASCADE
);