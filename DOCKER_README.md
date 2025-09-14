# CRUD App with Docker

## Quick Start

### 1. Prerequisites
- Docker
- Docker Compose

### 2. Run the Application
```bash
# Clone the repository
git clone https://github.com/Ponmuthu04/cloud_ex10.git
cd cloud_ex10

# Start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

### 3. Access the Application
- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080
- **MySQL**: localhost:3306

### 4. Stop the Application
```bash
docker-compose down

# Remove volumes (deletes database data)
docker-compose down -v
```

## Services

- **Frontend**: Nginx serving static files on port 80
- **Backend**: Node.js API server on port 8080
- **Database**: MySQL 8.0 on port 3306

## Environment Variables

The application uses these environment variables:
- `DB_HOST`: Database host (mysql)
- `DB_USER`: Database user (ex10_user)
- `DB_PASSWORD`: Database password (userpassword)
- `DB_NAME`: Database name (ex10_db)
- `PORT`: Backend port (8080)

## Database

The MySQL database is automatically initialized with the `users` table when the container starts.

## Deployment to Google Cloud

1. Create a VM instance
2. Install Docker and Docker Compose
3. Clone this repository
4. Run `docker-compose up -d`
5. Configure firewall to allow ports 80 and 8080
