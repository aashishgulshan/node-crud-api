# Node CRUD API

This Node.js project implements a CRUD (Create, Read, Update, Delete) API with JSON responses. It provides endpoints for managing user data, including authentication and password reset functionalities.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **List All Users (HTML):**
  - Endpoint: `GET /users`
  - Displays a list of all users in HTML format.

- **List All Users (JSON):**
  - Endpoint: `GET /api/users`
  - Returns a JSON array containing all users.

- **Get User by ID:**
  - Endpoint: `GET /api/user/:id`
  - Returns user details for the specified user ID.

- **Authentication (Protected Endpoint):**
  - Endpoint: `GET /api/protected`
  - Requires authentication to access.

- **Create New User:**
  - Endpoint: `POST /api/user`
  - Creates a new user.

- **Reset Password:**
  - Endpoint: `POST /api/reset-password`
  - Resets the user's password.

- **Edit User by ID:**
  - Endpoint: `PATCH /api/user/:id`
  - Edits the user details for the specified user ID.

- **Delete User by ID:**
  - Endpoint: `DELETE /user/:id`
  - Deletes the user with the specified ID.

- **Error Page/Not Found:**
  - Endpoint: `GET /api/*` or `/*`
  - Serves an error page for invalid routes or page not found.

## Getting Started

### Prerequisites

- Node.js installed
- Git installed

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aashishgulshan/node-crud-api.git
