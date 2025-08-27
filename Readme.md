
## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MySQL server (local or Docker)
- Docker & Docker Compose (optional)
This project is a CRM application built with Node.js v22 and MySQL 8, containerized using Docker Compose.
It provides two environments:

Development → uses nodemon with hot-reload

Production → runs node index.js optimized for deployment

Key Features:

Dockerized Node.js + MySQL setup

Environment-based configuration via .env

Database persistence with Docker volumes

Project structure with config/, controller/, middleware/, model/, router/, etc.

Quick Start:

Clone repo & create .env file

Run in dev → docker-compose -f docker-compose.dev.yml up --build

Run in prod → docker-compose -f docker-compose.prod.yml up --build -d

Default MySQL Access:

Host: localhost:3306

DB: crm_db

User: crm_user

Password: password