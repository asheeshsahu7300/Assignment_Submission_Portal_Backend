# Assignment Submission Portal

## Objective
Create an assignment submission portal that supports users and admins, where users can upload assignments and admins can manage those assignments.

## User Roles
- **User**: Can upload assignments, register, and log in.
- **Admin**: Can manage assignments, view submissions, and accept or reject them.

## Functionality
### Users
- Register and log in.
- Upload assignments.

### Admins
- Register and log in.
- View assignments tagged to them.
- Accept or reject assignments.

## API Endpoints

### User Endpoints
1. **Register User**
   - **Endpoint**: `POST /register`
   - **Request Body**:
     ```json
     {
       "username": "Soumik",
       "password": "userPassword"
     }
     ```
   - **Response**:
     - Status: `201 Created`
     - Body: `{ "message": "User registered successfully" }`

2. **User Login**
   - **Endpoint**: `POST /login`
   - **Request Body**:
     ```json
     {
       "username": "Soumik",
       "password": "userPassword"
     }
     ```
   - **Response**:
     - Status: `200 OK`
     - Body: `{ "message": "Login successful" }`

3. **Upload Assignment**
   - **Endpoint**: `POST /upload`
   - **Request Body**:
     ```json
     {
       "userId": "Soumik",
       "task": "Hello World",
       "admin": "Alok"
     }
     ```
   - **Response**:
     - Status: `201 Created`
     - Body: `{ "message": "Assignment uploaded successfully" }`

4. **Fetch All Admins**
   - **Endpoint**: `GET /admins`
   - **Response**:
     - Status: `200 OK`
     - Body: `[ { "username": "Admin1" }, { "username": "Admin2" } ]`

### Admin Endpoints
1. **Register Admin**
   - **Endpoint**: `POST /register`
   - **Request Body**:
     ```json
     {
       "username": "Alok",
       "password": "adminPassword"
     }
     ```
   - **Response**:
     - Status: `201 Created`
     - Body: `{ "message": "Admin registered successfully" }`

2. **Admin Login**
   - **Endpoint**: `POST /login`
   - **Request Body**:
     ```json
     {
       "username": "Alok",
       "password": "adminPassword"
     }
     ```
   - **Response**:
     - Status: `200 OK`
     - Body: `{ "message": "Login successful" }`

3. **View Assignments**
   - **Endpoint**: `GET /assignments`
   - **Response**:
     - Status: `200 OK`
     - Body: `[ { "userId": "Soumik", "task": "Hello World", "timestamp": "2023-10-11T12:00:00Z" } ]`

4. **Accept Assignment**
   - **Endpoint**: `POST /assignments/:id/accept`
   - **Request Body**:
     ```json
     {
       "message": "Assignment accepted"
     }
     ```
   - **Response**:
     - Status: `200 OK`
     - Body: `{ "message": "Assignment accepted" }`

5. **Reject Assignment**
   - **Endpoint**: `POST /assignments/:id/reject`
   - **Request Body**:
     ```json
     {
       "message": "Assignment rejected"
     }
     ```
   - **Response**:
     - Status: `200 OK`
     - Body: `{ "message": "Assignment rejected" }`

## Notes
- Ensure to handle authentication and authorization for both user and admin endpoints.
- Implement appropriate error handling for all endpoints.
- Consider password hashing for user and admin credentials for security.

This README serves as a guide for developing the assignment submission portal's API.
