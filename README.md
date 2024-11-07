## Getting Started

To get the project up and running, follow the setup instructions below for both the `services` (backend) and `ui` (frontend) folders.

### 1. Backend Services Setup (`services`)

This folder contains a NestJS project with MongoDB and Prisma for data management.

#### Prerequisites

-   MongoDB connection string (for example, from MongoDB Atlas or local instance)

#### Steps

1.  **Install dependencies:**
    
    `cd services
    npm install` 
    
2.  **Environment Configuration:**
    
    -   Create a `.env` file in the `services` folder.
    -   Add the MongoDB connection string in the following format:
        
        `DATABASE_URL="your-mongo-connection-string"` 
        
3.  **Run Database Migrations:**
    
    -   Use Prisma to set up the MongoDB schema by running:
        
        `npx prisma generate` 
        
4.  **Run the Service:**
    
    `npm run start` 
    
  **API Documentation:**
  -   Once the server is running, API endpoints are accessible via Swagger documentation at:
            
        `http://localhost:<PORT>/api`
        
### 2. Frontend UI Setup (`ui`)

This folder contains a Vite + React project.

#### Steps

1.  **Install dependencies:**
    
    `cd ui npm install` 
    
2.  **Environment Configuration:**
    
    -   Create a `.env` file in the `ui` folder.
    -   Add the backend API URL to this file:
        
        `VITE_API_URL="http://localhost:<PORT>"` 
        
3.  **Run the React Application:**
    
    `npm run dev`