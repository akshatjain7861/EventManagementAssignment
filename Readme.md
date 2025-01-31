# Event Management System - README

## Steps to Run the Client and Server Locally

### Prerequisites
- Node.js (v16+)
- PostgreSQL and PGAdmin (latest stable version)
- npm or yarn

## Backend (Server)

1. Clone the repository.
2. Navigate to the server directory:
   ```sh
   cd backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up a PostgreSQL database and update the `.env` file with database credentials:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/databasename  # Replace with your username, password, and database
   PORT=5000  # Your port number
   ```
5. Start the server:
   ```sh
   npm run dev
   ```

## Frontend (Client)

1. Navigate to the client directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the application in your browser at [http://localhost:5173/](http://localhost:5173/).

## Focus Areas & Problem-Solving Approach

### Event and Category Management
- Implemented a relational database structure with a many-to-many relationship.

### API Design
- Built RESTful endpoints with robust validation and error handling.

### Filtering
- Implemented category-based filtering.

### Frontend Usability
- Developed a user-friendly UI with responsive design and intuitive interactions.

## Trade-offs and Decision Making

- **ORM vs. Raw SQL**: Used Sequelize for easier database management, though raw SQL could be optimized for performance.
- **Client-Side State Management**: Chose React's built-in state instead of Redux for simplicity in this project.
- **Validation Approach**: Used UUID for unique ID generation.

## Weakest Part of the Solution & Potential Improvements

- **Error Handling**: While validation is in place, error messaging could be improved for better debugging.
- **Frontend State Management**: With more time, integrating Redux or Zustand could make state handling more scalable.
- **Testing**: Unit and integration tests should be expanded for better reliability.

## Time Spent on the Project

- **Database Schema & API Development**: ~2 hours
- **Frontend Implementation**: ~2 hours
- **Testing & Debugging**: ~1 hour
- **Documentation & Refinement**: ~1 hour

## Libraries & Tools Used

### Backend
- Express.js
- Sequelize
- PostgreSQL
- dotenv
- Node.js

### Frontend
- React.js
- Ant Design (for UI components)
- Axios (for API calls)
- Vite

### Other
- nodemon (for auto-restarting server during development)
- CORS (for cross-origin requests)

## Attribution
- No external code was copied; all dependencies are open-source.

## Scalability Considerations

- Used a relational database (PostgreSQL) for structured data storage.
- Optimized database queries for performance.

## UI/UX Design Considerations

- Implemented a responsive layout for mobile and desktop users.
- Used Ant Design for consistent and professional styling.
- Ensured accessibility by adding proper form labels and ARIA attributes.

