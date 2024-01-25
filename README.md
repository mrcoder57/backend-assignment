# Task Management API

This project implements a Task Management API with the following features:

1. **Create Task:**
   - Input: Title, Description, Due Date
   - Authorization: JWT token required

2. **Create Subtask:**
   - Input: Task ID

3. **Get All User Tasks:**
   - Authorization: JWT token required
   - Filters: Priority, Due Date, Pagination

4. **Get All User Subtasks:**
   - Authorization: JWT token required
   - Filters: Task ID (optional)

5. **Update Task:**
   - Authorization: JWT token required
   - Updateable Fields: Due Date, Status (TODO or DONE)

6. **Update Subtask:**
   - Authorization: JWT token required
   - Updateable Field: Status (0 or 1)

7. **Delete Task:**
   - Authorization: JWT token required
   - Soft deletes the specified task.

8. **Delete Subtask:**
   - Authorization: JWT token required
   - Soft deletes the specified subtask.
9. **created cron jobs Logic:**
   - Priority based cron job logic
   - voice call cron job using twillo.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/mrcoder57/backend-assignment.git
cd backend-assignment
npm install
npm start

## Api docs usingswagger
visit https://backend-assigment1.onrender.com/api-docs/
