# Frontend for Full-Stack Test Project

This repository contains the frontend for a **full-stack test project**. The application was bootstrapped using the `react-ts` plugin of **Vite** and is styled with **Tailwind CSS**. Input validation is handled with **Zod**, ensuring strong runtime validation alongside TypeScript typings.

> **Note**: This project is **dependent on a backend microservice** to function properly. Please configure and run the backend service before using this frontend. Detailed information about the backend can be found [here](https://github.com/Gustavo-Ennes/medicCont-test-backend) (replace with the actual backend URL).

## 🚀 Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

- Node.js (version 18.x or higher recommended)
- npm (comes with Node.js) or Yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Gustavo-Ennes/medicCont-test-frontend.git
   cd frontend-project
   ```

2. **Install dependencies with npm:**

  ```bash
    npm install
  ```

3. **Configure environment variables**

  Create a .env file in the project root based on the .env.example file. Ensure the VITE_API_URL variable is set to the correct backend URL.

  Example .env file:

    ```bash
      VITE_API_APP_ENDPOINT=http://localhost:8080/graphq 
    ```

### Development
To start the development server, use:
  ```bash
    npm run dev
  ``` 
This will start the development server at http://localhost:5173.


### Technologies used
 - React: Frontend framework for building user interfaces.
 - Vite: Next-generation frontend tooling for blazing-fast development.
 - TypeScript: For static typing and better developer experience.
 - Tailwind CSS: Utility-first CSS framework for rapid UI development.
 - Zod: For schema validation and TypeScript inference.
 - Graphql: For data fetch.



### Backend dependency
This frontend project is tightly coupled with a backend microservice. The backend is responsible for handling business logic, API endpoints, and data persistence.

You can find the backend service and setup instructions here:
[Backend Repository](https://github.com/Gustavo-Ennes/medicCont-test-backend).

Make sure the backend service is running and configured before interacting with the frontend.

### About this project
This project is part of a technical test for a full-stack developer position. It showcases:

  - Integration of a modern frontend stack.
  - Use of Tailwind CSS for responsive and clean UI design.
  - Validation of user input with Zod.
  - Connection to a backend microservice for data processing.
  - User registration and two-factor authenticatio, by email.