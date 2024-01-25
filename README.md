# Book Library 

This project involves developing a RESTful API for managing a book library with roles and error handling. The API built using Node.js, Express, and Sequelize, providing different access levels for users based on their roles, and including error handling.


Data Models:
Book: Fields include id, title, author, year, and genre.
User: Fields include id, username, password, and roleId.
Role: Fields include id and name (e.g., 'user', 'admin').

Authentication and Authorization:
Implementation of authentication using JWT (JSON Web Tokens).
Implementation of middleware for authorization, determining access based on user roles.

Admin-specific Rights:
Only users with the 'admin' role can edit book information (PATCH, DELETE on /books/:id).

CRUD Operations for Books:
All users can view books.
Adding, editing, and deleting books is restricted to admins.

User Management:
CRUD operations for users and roles, accessible only to admins.

Error Handling Middleware:
Implementation of middleware for error handling and logging.
Properly returning errors to clients (e.g., 404 for nonexistent resources, 403 for forbidden access).

Documentation:
Preparation of API documentation using Swagger.

![image](https://i.ibb.co/n32jv4s/Screenshot-from-2024-01-25-12-32-56.png)

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js 16+ installed
- npm installed
- PostgreSQL 12+ installed

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ndmen/booklibrary.git
```

2. Navigate to the project folder:
```bash
cd booklibrary
```

3. Install dependencies:
```bash
npm install
```

4. Set up your environment variables:
Update necessary environment variables for database connection in the file /confiig/config.json

5. Run migrations
```bash
npm run migrate:run
```

6. Run seeds (Roles)
```bash
npm run seed:run
```

7. Run the project:
```bash
npm start
```

The server should now be running on http://localhost:3000. Swagger documtation can see http://localhost:3000/swagger.

## Contributing

If you'd like to contribute, please fork the repository and create a pull request.

## License

This project is licensed under the MIT License.
