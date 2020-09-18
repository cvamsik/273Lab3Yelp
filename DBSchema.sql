CREATE TABLE login_credentials
(
    email_id varchar(255) NOT NULL PRIMARY KEY,
    user_password varchar(255),
    user_type varchar(10)
);

CREATE UNIQUE INDEX email_index ON login_credentials(email_id);

CREATE TABLE customer_primary_data
(
    customer_id int PRIMARY KEY NOT NULL
    AUTO_INCREMENT,
    customer_name varchar
    (255)NOT NULL,
    customer_age int NOT NULL,
    birthday DATE NOT NULL,
    contact_number int NOT NULL,
    email_id varchar
    (255) NOT NULL,
    about varchar
    (550),
    FOREIGN KEY
    (email_id) REFERENCES login_credentials
    (email_id)
);

    CREATE UNIQUE INDEX customer_index ON customer_primary_data(customer_id);

    CREATE TABLE customer_secondary_data
    (
        customer_id int NOT NULL,
        review_count int NOT NULL,
        yelping_since int,
        things_loved varchar(550),
        find_me varchar(255),
        blog_ref varchar(255),
        FOREIGN KEY (customer_id) REFERENCES customer_primary_data(customer_id)
    );

    CREATE TABLE restaurant_data
(
    restaurant_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    restaurant_name varchar
    (255) NOT NULL,
    restaurant_location varchar
    (255) NOT NULL,
    restaurant_description varchar
    (550),
    restaurant_address varchar
    (255) NOT NULL,
    address_city varchar
    (255) NOT NULL,
    address_state varchar
    (255) NOT NULL,
    address_postal_code varchar
    (255) NOT NULL,
    address_latitude FLOAT NOT NULL,
    address_longitude FLOAT NOT NULL,
    primary_phone int NOT NULL,
    secondary_phone int,
    email varchar
    (255) NOT NULL,
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    stars_avg int NOT NULL DEFAULT 0,
    review_count int NOT NULL DEFAULT 0,
    is_open int NOT NULL DEFAULT 0,

)

    CREATE UNIQUE INDEX restaurant_index on restaurant_data(restaurant_id);

    CREATE TABLE reviews
(
    review_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    customer_id int NOT NULL,
    restaurant_id int NOT NULL,
    stars int NOT NULL DEFAULT 0,
    review_date date,
    review_text varchar
    (1000),
    FOREIGN KEY
    (customer_id) REFERENCES customer_primary_data
    (customer_id),
    FOREIGN KEY
    (restaurant_id) REFERENCES restaurant_data
    (restaurant_id)

)

    CREATE TABLE menus
    (
        menu_id int NOT NULL
        AUTO_INCREMENT,
    restaurant_id int NOT NULL,


    FOREIGN KEY
        (restaurant_id) REFERENCES  restaurant_data
        (restaurant_id)
)

        CREATE TABLE dishes
        (
            menu_id int NOT NULL,
            dish_id int NOT NULL,
            ingredients varchar(550),
            image_url varchar(550),
            price float NOT NULL DEFAULT 0,
            description varchar(550),
            category_id int NOT NULL,
            FOREIGN KEY(category_id) REFERENCES categories(category_id),
            PRIMARY KEY(menu_id,dish_id)
        )

        CREATE TABLE categories
        (
            category_id int NOT NULL PRIMARY KEY,
            category_name varchar(255)
        )

        CREATE TABLE orders
(
    order_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    customer_id int NOT NULL,
    restaurant_id int NOT NULL,
    delivery_type int NOT NULL,
    delivery_status int NOT NULL,
    order_date date NOT NULL DEFAULT GETDATE
        (),
    order_time time NOT NULL ,
    --check the default value for order time
    FOREIGN KEY
        (customer_id) REFERENCES customer_primary_data
        (customer_id),
    FOREIGN KEY
        (restaurant_id) REFERENCES restaurant_data
        (restaurant_id),
    FOREIGN KEY
        (delivery_type) REFERENCES delivery_types
        (delivery_type_id),
    FOREIGN KEY
        (delivery_status) REFERENCES delivery_statuses
        (delivery_status_id),
)

        CREATE TABLE delivery_types
        (
            delivery_type_id int NOT NULL
            AUTO_INCREMENT,
    delivery_type varchar
            (100) NOT NULL
)
            CREATE TABLE delivery_statuses
            (
                delivery_status_id int NOT NULL
                AUTO_INCREMENT,
    delivery_status varchar
                (100) NOT NULL
)

                CREATE TABLE events
(
    event_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    event_name varchar
                (255) NOT NULL,
    event_description varchar
                (550) NOT NULL,
    event_date date NOT NULL,
    event_time time NOT NULL,
    event_latitude float NOT NULL,
    event_longitude float NOT NULL,
    event_hashtags varchar
                (255)
)

                CREATE TABLE registrations
                (
                    registration_id int NOT NULL PRIMARY KEY,
                    event_id int NOT NULL,
                    customer_id int NOT NULL,
                    registration_date date NOT NULL DEFAULT GETDATE(),
                    registration_time time NOT NULL,
                    FOREIGN KEY(event_id) REFERENCES events(event_id),
                    FOREIGN KEY(customer_id) REFERENCES customer_primary_data(customer_id),

                )



                AUTO_INCREMENT=1000