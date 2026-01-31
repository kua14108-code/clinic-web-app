# Backend – Clinic Web Application

## Database: clinic_db

### users
- _id
- email
- password
- role (admin, student, doctor)
- createdAt

### patients
- _id
- firstName
- lastName
- dateOfBirth
- gender
- createdAt

### visits
- _id
- patientId (reference to patients)
- visitDate
- diagnosis
- notes
- createdBy (reference to users)

### reports
- _id
- visitId (reference to visits)
- summary
- createdAt
