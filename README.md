# Clinic Web Application

## Project Overview

Clinic Web Application is a web-based system developed as a final project for the **Advanced Databases (NoSQL)** course.  
The application demonstrates the use of MongoDB as a NoSQL database, RESTful API development, and integration between backend and frontend components.

The system allows managing patients, clinical visits, and users with authentication.

---

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- bcryptjs

### Frontend
- HTML
- CSS
- JavaScript (Fetch API)

---

## System Architecture

The project follows a **client-server architecture**:

- **Frontend**: HTML/CSS/JS web interface that sends HTTP requests
- **Backend**: REST API built with Express.js
- **Database**: MongoDB Atlas (cloud NoSQL database)


---

## Database Structure

### Collections

#### users
- email
- password (hashed)
- role (admin, doctor, student)
- createdAt

#### patients
- firstName
- lastName
- dateOfBirth
- gender
- createdAt

#### visits
- patientId (reference to patients)
- visitDate
- diagnosis
- notes
- createdAt

---

## REST API Endpoints

### Authentication
- `POST /api/auth/register` – register a new user
- `POST /api/auth/login` – user login

### Patients
- `GET /api/patients` – get all patients
- `POST /api/patients` – create a new patient
- `PUT /api/patients/:id` – update patient data
- `DELETE /api/patients/:id` – delete a patient
- `GET /api/patients/stats/gender` – aggregation: patients count by gender

### Visits
- `GET /api/visits` – get all visits
- `POST /api/visits` – create a new visit
- `PUT /api/visits/:id` – update visit data
- `DELETE /api/visits/:id` – delete a visit
- `GET /api/visits/stats/by-date` – aggregation: visits count by date

---

## MongoDB Features Used

- CRUD operations across multiple collections
- Referenced data models (patients ↔ visits)
- Advanced update operators (`$set`)
- Aggregation pipelines (`$group`, `$sort`)
- Indexes and ObjectId references
- Cloud database (MongoDB Atlas)

---

## Frontend Pages

The frontend consists of **4 main pages**:
1. Login page
2. Patients list page
3. Add patient page
4. Visits list page

Each page interacts with the backend via REST API calls.

---

## How to Run the Project

### Backend
1. Install dependencies:

2. Create `.env` file with:
3. Start the server:

### Frontend
- Open any HTML file from the `frontend` folder in a browser.

---

## Project Author

- Student: *[Your Name]*
- Course: Advanced Databases (NoSQL)
- Project Type: Web Application
