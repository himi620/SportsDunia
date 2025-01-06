# NestJS College API

This repository contains a backend application built with **NestJS** and **PostgreSQL** (using Supabase) to manage and query college-related data. The project demonstrates the design of database relationships, handling complex queries, and deploying in a production-like environment. The application is designed to handle millions of rows efficiently.

## Features

### Authentication
- **Signup**
  - Endpoint: `POST /auth/signup`
  - Request Body:
    ```json
    {
      "email": "test@gmail.com",
      "password": "test123"
    }
    ```
- **Login**
  - Endpoint: `POST /auth/login`
  - Request Body:
    ```json
    {
      "email": "test@gmail.com",
      "password": "test123"
    }
    ```
- JWT-based authentication ensures secure access to the API.

### College Management APIs
1. **Filter Colleges by City and State**
   - Endpoint: `GET /colleges`
   - Query Parameters:
     - `city`: Mumbai
     - `state`: Maharashtra
   - Headers:
     - Authorization: `Bearer <token>`

2. **Get College Details by ID**
   - Endpoint: `GET /college_data/{college_id}`
   - Headers:
     - Authorization: `Bearer <token>`
   - Response includes:
     - **Average Placement Data**: Grouped by year, averages placement fields (e.g., highest_placement, median_placement).
     - **Placement Data**: Includes trends based on placement rates.

3. **Get Courses for a College**
   - Endpoint: `GET /college_courses/{college_id}`
   - Response: Sorted courses in descending order by fee.

### Database Design
- **Colleges Table**:
  - Fields: `id`, `name`, `score`, `city_id`, `state_id`
  - **Score** is in the range of 1-1000 and all APIs sort results by this attribute.
- **College_Placement Table**:
  - Fields: `id`, `college_id`, `year`, `highest_placement`, `average_placement`, `median_placement`, `placement_rate`
  - Includes `placement_trend` calculated field.
- **College_Wise_Course Table**:
  - Fields: `id`, `college_id`, `course_name`, `course_duration`, `course_fee`
- **Cities Table**:
  - Fields: `id`, `name`
- **States Table**:
  - Fields: `id`, `name`

### Deployment
- Hosted on Render (free tier).
- PostgreSQL database integration using Supabase.
- Postman collection provided for API testing.

### Project Highlights
1. **Authentication**:
   - JWT-secured endpoints.
   - Signup and login functionality.
2. **CRUD Operations**:
   - Implemented for managing colleges, placements, and courses.
   - Input validation and error handling included.
3. **Database Integration**:
   - PostgreSQL using Supabase.
   - Efficient handling of large datasets.
4. **Deployment**:
   - Hosted APIs on Render.
   - Postman collection for seamless integration.

### Optional Enhancements
- Added pagination and search functionality to the `/colleges` endpoint.
- Implemented role-based access control.

## How to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/nestjs-college-api.git
   cd nestjs-college-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Create a `.env` file with the following:
   ```env
   DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Application**:
   ```bash
   npm run start:dev
   ```

5. **Access API Documentation**:
   - Use the Postman collection provided for testing.

## Deliverables

1. **GitHub Repository**
   - Source code with README and SQL scripts for table creation.

2. **Postman Collection**
   - Included for API testing.

3. **Deployed URLs**
   - API Base URL: [https://your-api.render.com](https://your-api.render.com)

