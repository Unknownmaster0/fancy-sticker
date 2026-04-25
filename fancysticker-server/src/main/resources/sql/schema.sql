CREATE TABLE IF NOT EXISTS products
(
    product_id  VARCHAR(36) PRIMARY KEY,
    name        VARCHAR(250)                          NOT NULL,
    description VARCHAR(500)                          NOT NULL,
    price       DECIMAL(10, 2)                        NOT NULL,
    popularity  INT                                   NOT NULL,
    image_url   VARCHAR(500),
    created_at  TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by  VARCHAR(100)                          NOT NULL,
    updated_at  TIMESTAMP   DEFAULT NULL,
    updated_by  VARCHAR(100) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS contacts
(
    contact_id    VARCHAR(36) PRIMARY KEY,
    name          VARCHAR(100)                          NOT NULL,
    email         VARCHAR(100)                          NOT NULL,
    mobile_number VARCHAR(15)                           NOT NULL,
    message       VARCHAR(500)                          NOT NULL,
    status        VARCHAR(500)                          NOT NULL,
    created_at    TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by    VARCHAR(100)                          NOT NULL,
    updated_at    TIMESTAMP   DEFAULT NULL,
    updated_by    VARCHAR(100) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS customers
(
    customer_id   VARCHAR(36) PRIMARY KEY,
    name          VARCHAR(100)                          NOT NULL,
    email         VARCHAR(100)                          NOT NULL UNIQUE,
    mobile_number VARCHAR(15)                           NOT NULL,
    password_hash VARCHAR(500)                          NOT NULL,
    created_at    TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by    VARCHAR(100)                          NOT NULL,
    updated_at    TIMESTAMP   DEFAULT NULL,
    updated_by    VARCHAR(100) DEFAULT NULL,
    UNIQUE KEY unique_email (email),
    UNIQUE KEY unique_mobile_number (mobile_number)
    );

CREATE TABLE IF NOT EXISTS address
(
    address_id    VARCHAR(36) PRIMARY KEY,
    customer_id   VARCHAR(36) NOT NULL UNIQUE,
    street        VARCHAR(150) NOT NULL,
    city          VARCHAR(100) NOT NULL,
    state         VARCHAR(100) NOT NULL,
    postal_code   VARCHAR(20)  NOT NULL,
    country       VARCHAR(100) NOT NULL,
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by    VARCHAR(100) NOT NULL,
    updated_at    TIMESTAMP    DEFAULT NULL,
    updated_by    VARCHAR(100) DEFAULT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS roles (
    role_id     VARCHAR(36) PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    created_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(100) NOT NULL,
    updated_at TIMESTAMP   DEFAULT NULL,
    updated_by VARCHAR(100) DEFAULT NULL,
    UNIQUE KEY unique_name (name)
);

CREATE TABLE IF NOT EXISTS customer_roles (
  customer_id VARCHAR(36) NOT NULL,
  role_id     VARCHAR(36) NOT NULL,
  PRIMARY KEY (customer_id, role_id),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders
(
    order_id       VARCHAR(36) PRIMARY KEY,
    customer_id    VARCHAR(36) NOT NULL,
    total_price    DECIMAL(10, 2)                        NOT NULL,
    payment_id     VARCHAR(200)                          NOT NULL,
    payment_status VARCHAR(50)                           NOT NULL,
    order_status   VARCHAR(50)                           NOT NULL,
    created_at     TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by     VARCHAR(100)                           NOT NULL,
    updated_at     TIMESTAMP   DEFAULT NULL,
    updated_by     VARCHAR(100) DEFAULT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
);

CREATE TABLE IF NOT EXISTS order_items
(
    order_item_id   VARCHAR(36) PRIMARY KEY,
    order_id        VARCHAR(36) NOT NULL,
    product_id      VARCHAR(36) NOT NULL,
    quantity        INT NOT NULL,
    price           DECIMAL(10, 2) NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by      VARCHAR(100)    NOT NULL,
    updated_at      TIMESTAMP      DEFAULT NULL,
    updated_by      VARCHAR(100)    DEFAULT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);