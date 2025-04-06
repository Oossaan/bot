CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    whatsapp_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
