# To-Do List Application

## Overview

The To-Do List application is a well-structured project that allows users to efficiently manage tasks.

## Technologies Used

- TypeScript
- React
- Docker
- NestJS

## Features

### Frontend (React + TypeScript)

- **User Interface**:
  - Task list display.
  - Text field for entering new tasks.
  - Button for adding new tasks.
  - Delete button and checkbox for each task to mark as completed.
- **Functionality**:
  - Add new tasks to the list.
  - Delete tasks from the list.
  - Visually cross out tasks marked as completed.
- **Unit Tests**:
  - Test for adding a new task.
  - Test for deleting a task.
  - Test for marking a task as completed.

### Backend (NestJS + TypeScript)

- **Endpoints**:
  - `POST /tasks` for adding a new task.
  - `DELETE /tasks/:id` for deleting a task.
  - `PATCH /tasks/:id` for updating a task (marking as completed).
- **Data Model**:
  - Task: `{ id: number, content: string, done: boolean }`
- **Unit Tests**:
  - Test for the `POST` endpoint (adding a task).
  - Test for the `DELETE` endpoint (deleting a task).
  - Test for the `PATCH` endpoint (updating a task).

### Docker

Both frontend and backend parts of the application come with Dockerfile configurations, allowing for containerization. A `docker-compose.yml` file is included for seamless orchestration of both services.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) for multi-container orchestration (usually bundled with Docker Desktop).

### Installation

1. Clone this repository:

    git clone [https://github.com/abenteuerzeit/todo-list](https://github.com/abenteuerzeit/todo-list.git)

2. Navigate to the project directory:

    cd todo-list

### Running the Application

1. Build and start the containers:

    docker-compose up --build

2. Once the containers are up and running, you can access:

- **Frontend**: `http://localhost:3001`
- **Backend API**: `http://localhost:3000`

To stop the services:

    docker-compose down

## API Details

### Endpoints

The backend service provides the following main endpoints:

- `POST /tasks`: Adds a new task.
- `DELETE /tasks/:id`: Deletes a task by ID.
- `PATCH /tasks/:id`: Updates a task by ID.

### Data Transfer Objects (DTOs)

- `CreateTaskDto`: Used when creating a new task, contains the `content` and `done` fields.
- `UpdateTaskDto`: Used when updating a task, contains the `done` field.
