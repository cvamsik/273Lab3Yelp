 DROP DATABASE yelp;
CREATE DATABASE yelp;
USE YELP;
CREATE TABLE login_credentials
(
    email_id varchar(255) NOT NULL PRIMARY KEY,
    user_password varchar(255) NOT NULL,
    user_type varchar(10) NOT NULL DEFAULT 1
);
-- SELECT * from login_credentials c1 INNER JOIN customer_primary_data c2 on c1.email_id=c2.email_id INNER JOIN customer_secondary_data c3 on c2.customer_id=c3.customer_id;

#CREATE UNIQUE INDEX email_index ON login_credentials(email_id);

-- INSERT INTO customer_primary_data (customer_name, customer_age, birthday, contact_number) VALUES ('Test User', 37, '2017-09-09',123435456);

CREATE TABLE customer_primary_data
(
    customer_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_name varchar(255)NOT NULL,
    birthday DATE NOT NULL,
    contact_number BIGINT NOT NULL,
    email_id varchar(255) NOT NULL,
    about varchar(550),
    FOREIGN KEY (email_id) REFERENCES login_credentials(email_id)
);
# SELECT * from customer_primary_data;
#CREATE UNIQUE INDEX customer_index ON customer_primary_data(customer_id);

CREATE TABLE customer_secondary_data
(
    customer_id int NOT NULL,
    review_count int NOT NULL DEFAULT 0,
    yelping_since int DEFAULT 0 ,
    things_loved varchar(550),
    find_me varchar(255),
    blog_ref varchar(255),
    singup_date DATE NOT NULL,
	profile_image_link varchar(255),
    FOREIGN KEY (customer_id) REFERENCES customer_primary_data(customer_id)
);

CREATE TABLE restaurant_data
(
    restaurant_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    restaurant_name varchar(255) NOT NULL,
    restaurant_location varchar(255) NOT NULL,
    restaurant_description varchar(550),
    restaurant_address varchar(255) NOT NULL,
    address_city varchar(255) NOT NULL,
    address_state varchar(255) NOT NULL,
    address_postal_code varchar(255) NOT NULL,
    address_latitude FLOAT NOT NULL,
    address_longitude FLOAT NOT NULL,
    primary_phone BIGINT NOT NULL,
    secondary_phone BIGINT,
    email varchar(255) NOT NULL,
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    stars_avg int NOT NULL DEFAULT 0,
    review_count int NOT NULL DEFAULT 0,
    is_open int NOT NULL DEFAULT 0,
    profile_image_link varchar(255),
    FOREIGN KEY(email) references login_credentials(email_id)
);

#CREATE UNIQUE INDEX restaurant_index on restaurant_data(restaurant_id);

CREATE TABLE reviews
(
    review_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    customer_id int NOT NULL,
    restaurant_id int NOT NULL,
    stars int NOT NULL DEFAULT 0,
    review_date date NOT NULL,
    review_text varchar(1000),
    FOREIGN KEY(customer_id) REFERENCES customer_primary_data(customer_id),
    FOREIGN KEY(restaurant_id) REFERENCES restaurant_data(restaurant_id)

);

CREATE TABLE menus
(
    menu_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    restaurant_id int NOT NULL,
    FOREIGN KEY(restaurant_id) REFERENCES  restaurant_data(restaurant_id)
);
CREATE TABLE categories
(
    category_id int NOT NULL PRIMARY KEY,
    category_name varchar(255)
);

CREATE TABLE dishes
(
    menu_id int NOT NULL,
    dish_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dish_name varchar(255) NOT NULL,
    ingredients varchar(550),
    image_url varchar(550),
    price float NOT NULL DEFAULT 0,
    description varchar(550),
    category_id int NOT NULL,
    FOREIGN KEY(category_id) REFERENCES categories(category_id)
);


CREATE TABLE order_types
(
    order_type_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    order_type varchar(100) NOT NULL
);
-- CREATE TABLE delivery_statuses
-- (
-- 	order_type_id int NOT NULL,
--     delivery_status_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     delivery_status varchar(100) NOT NULL,
-- 	FOREIGN KEY(order_type_id) REFERENCES order_types(order_type_id)

-- );

-- CREATE TABLE pickup_statuses
-- (
-- 	order_type_id int NOT NULL ,
--     pickup_status_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     pickup_status varchar(100) NOT NULL,
--     FOREIGN KEY(order_type_id) REFERENCES order_types(order_type_id)
-- );

CREATE TABLE order_status
(
	order_type_id int NOT NULL,
    order_status_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    order_status varchar(100) NOT NULL,
	FOREIGN KEY(order_type_id) REFERENCES order_types(order_type_id)

);

CREATE TABLE delivery_address
(
	delivery_address_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	delivery_address varchar(255) NOT NULL,
    address_city varchar(255) NOT NULL,
    address_state varchar(255) NOT NULL,
    address_postal_code varchar(255) NOT NULL,
    address_latitude FLOAT NOT NULL,
    address_longitude FLOAT NOT NULL,
    primary_phone BIGINT NOT NULL
);



CREATE TABLE orders
(
    order_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    customer_email varchar(255) NOT NULL,
    restaurant_id int NOT NULL,
    order_type int NOT NULL,
    order_status int NOT NULL,
    order_date date NOT NULL,
    order_time time NOT NULL ,
    order_total_price int NOT NULL,
    delivery_address_id int,
    payment_card_digits int, -- NOT NULL,
    #check the default value for order time
    FOREIGN KEY(customer_email) REFERENCES customer_primary_data(email_id),
    FOREIGN KEY(restaurant_id) REFERENCES restaurant_data(restaurant_id),
	FOREIGN KEY(order_type) REFERENCES order_types(order_type_id),
    FOREIGN KEY(delivery_address_id) REFERENCES delivery_address(delivery_address_id),
    FOREIGN KEY(order_status) REFERENCES order_status(order_status_id)
    
);
CREATE TABLE order_items
(
	order_id int NOT NULL,
    dish_id int NOT NULL,
    count int NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(order_id)
);

CREATE TABLE events
(
    event_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    event_name varchar(255) NOT NULL,
    event_description varchar(550) NOT NULL,
    event_date date NOT NULL,
    event_time time NOT NULL,
    event_creator_id int NOT NULL,
    event_latitude float NOT NULL,
    event_longitude float NOT NULL,
    event_hashtags varchar(255),
	FOREIGN KEY(event_creator_id) REFERENCES restaurant_data(restaurant_id)

);

CREATE TABLE event_images
(
    image_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    event_id int NOT NULL,
    image_url varchar(400) NOT NULL,
    FOREIGN KEY(event_id) REFERENCES events(event_id)
);

CREATE TABLE registrations
(
    -- registration_id int NOT NULL ,
    event_id int NOT NULL,
    customer_id int NOT NULL,
    registration_date date NOT NULL ,
    registration_time time NOT NULL,
    FOREIGN KEY(event_id) REFERENCES events(event_id),
    FOREIGN KEY(customer_id) REFERENCES customer_primary_data(customer_id),
    PRIMARY KEY(event_id,customer_id)

);



