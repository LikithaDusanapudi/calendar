# Calendar Application for Communication Tracking

## Overview
The Calendar Application is a React-based tool designed to track and manage communication with companies efficiently. It provides administrators and users with features to maintain professional relationships, ensuring timely follow-ups and actionable insights. The application is built with a focus on usability, clarity, and efficient data handling.

---

## Features

### Admin Module
- **Company Management**: Add, edit, and delete companies with detailed information, including:
  - Name, Location, LinkedIn Profile, Emails, Phone Numbers, Comments, Communication Periodicity.
- **Communication Methods Management**: Configure and order communication methods with mandatory flags.
  - Default methods: LinkedIn Post, LinkedIn Message, Email, Phone Call, Other.

### User Module
- **Dashboard**:
  - Grid view with company details, recent communications, and upcoming scheduled tasks.
  - Color-coded highlights for overdue and due communications:
    - **Red**: Overdue
    - **Yellow**: Due today
  - Hover tooltips displaying notes for completed communications.
- **Notifications**:
  - Grids for overdue and due communications.
  - Badge count for overdue and due tasks on the notification icon.
- **Calendar View**:
  - Visualize past and future communications.
  - Manage and log new communication actions efficiently.

---

## Tech Stack

### Frontend
- **Framework**: React
- **Styling**: Tailwind CSS, Chakra UI, Material UI
- **Libraries**:
  - `axios`: API requests
  - `react-calendar`: Calendar view
  - `react-table`: Table views
  - `chart.js`, `recharts`: Reporting visuals
  - `react-tooltip`, `react-beautiful-dnd`: UI enhancements
  - `date-fns`: Date handling
  - `framer-motion`: Animations

### Backend
- **Framework**: Express.js
- **Database**: MongoDB
- **Libraries**:
  - `bcryptjs`, `jsonwebtoken`: Authentication
  - `dotenv`: Environment variables
  - `mongoose`: Database schema and management
  - `joi`: Input validation
  - `cors`, `body-parser`: Middleware

---

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB setup

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

---

## Live Application
Access the deployed application at: [https://calendar-yqke.vercel.app/](https://calendar-yqke.vercel.app/)
