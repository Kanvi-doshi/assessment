
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2),
    stock INT DEFAULT 0
);
    CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    qty INT NOT NULL,

    FOREIGN KEY (room_id)
        REFERENCES rooms(id)
);
SELECT
    r.name,
    SUM(o.qty) AS total_qty
FROM rooms r
JOIN orders o
    ON r.id = o.room_id
GROUP BY r.id, r.name
HAVING SUM(o.qty) > 5;


CREATE INDEX idx_category
ON rooms(category);

