CREATE DATABASE IF NOT EXISTS ugcc;
USE ugcc;

-- Members (login + profile combined)
CREATE TABLE IF NOT EXISTS members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- hashed password
  telephone VARCHAR(20),
  program VARCHAR(100),
  year_of_study VARCHAR(50),
  gaming_interest TEXT,
  computing_interest TEXT,
  role VARCHAR(100),  -- optional: club role (President, etc.)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities (for each year)
CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year VARCHAR(20),
  description TEXT
);

-- Resources (links, docs, etc.)
CREATE TABLE IF NOT EXISTS resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  link TEXT
);

