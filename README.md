# TODO List App (NestJS, TypeScript)

**Goal:** Develop a simple to-do list application using TypeScript, React, Docker, and NestJS technologies. The application should allow users to add, delete, and mark tasks as completed. In addition, the application should include unit tests for key functionalities.

## Frontend Part (React + TypeScript)

### User Interface

- To-do list.
- Text box to enter a new task.
- A button to add a new task.
- Next to each task is a delete button and a checkbox to mark it as done.

### Functionality

- Adding a new task to the list.
- Removing a task from the list.
- Marking a task as completed (changing the appearance of the task to crossed out).

### Frontend Unit Tests

- Test of adding a new task.
- Test of removing a task.
- Test of marking a task as completed.

## Backend (PHP or NestJS + TypeScript)

### Endpoints

- POST `/tasks` - adding a new task.
- DELETE `/tasks/:id` - deleting a task.
- PATCH `/tasks/:id` - updating a task (marking as done).

### Data Model

Task:
\[
\{ \text{id: number, content: string, done: boolean} \}
\]

### Backend Unit Tests

- Task add endpoint test.
- Endpoint test of deleting a task.
- Task update endpoint test.

## Docker

- Creating a Dockerfile for both the front-end and back-end.
- Using `docker-compose` to run the entire application (frontend + backend).

## Instructions

1. Start by creating a new NestJS project for the backend and a new React project for the front-end.
2. Implement the functionalities listed above.
3. Write unit tests for the key functionalities.
4. Make sure the application and tests work correctly locally and in the Docker container.
5. Pay attention to code quality, project structure, and error handling.

## Evaluation

- Correctness of application performance.
- Code quality and structure.
- Use of TypeScript in both parts of the application.
- Correct use of Docker and `docker-compose`
- Error handling and server responses.
- Coverage of the code with unit tests and the quality of the written tests.

## Setup

### Create an app container directory

```bash
todo-app/
|-- backend/
|   |-- src/
|   |-- tests/
|   |-- Dockerfile
|-- frontend/
|   |-- src/
|   |-- tests/
|   |-- Dockerfile
|-- docker-compose.yml
```

### Initialize backend & start development server

```bash
npm i -g @nestjs/cli
nest new todo-backend -p npm -l TS --strict
code . 
cd todo-backend
npm install
npm run start:dev
```

go to `http://localhost:3000/`
