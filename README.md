Calendar Application for Communication Tracking
Overview
The Calendar Application is a React-based tool designed to track and manage communication with companies efficiently. It provides administrators and users with features to maintain professional relationships, ensuring timely follow-ups and actionable insights. The application is built with a focus on usability, clarity, and efficient data handling.
________________________________________
Features
Admin Module
•	Company Management: Add, edit, and delete companies with details such as: 
o	Name, Location, LinkedIn Profile, Emails, Phone Numbers, Comments, Communication Periodicity.
•	Communication Methods Management: Configure and order communication methods, including mandatory flags. 
o	Default methods: LinkedIn Post, LinkedIn Message, Email, Phone Call, Other.
User Module
•	Dashboard: 
o	Grid view with company details, recent communications, and upcoming scheduled tasks.
o	Color-coded highlights for overdue and due communications (Red: Overdue, Yellow: Due today).
o	Hover tooltips for completed communication notes.
•	Notifications: 
o	Overdue and due communication grids.
o	Badge count for overdue and due tasks.
•	Calendar View: 
o	Visualize past and future communications.
o	Manage and log new communication actions.
________________________________________
Tech Stack
Frontend
•	Framework: React
•	Styling: Tailwind CSS, Chakra UI, Material UI
•	Libraries: 
o	axios: API requests
o	react-calendar: Calendar view
o	react-table: Table views
o	chart.js, recharts: Reporting visuals
o	react-tooltip, react-beautiful-dnd: UI enhancements
o	date-fns: Date handling
o	framer-motion: Animations
Backend
•	Framework: Express.js
•	Database: MongoDB
•	Libraries: 
o	bcryptjs, jsonwebtoken: Authentication
o	dotenv: Environment variables
o	mongoose: Database schema and management
o	joi: Input validation
o	cors, body-parser: Middleware
________________________________________
Installation
Prerequisites
•	Node.js and npm installed
•	MongoDB setup
Frontend Setup
1.	Clone the repository: 
2.	git clone <repository-url>
3.	cd frontend
4.	Install dependencies: 
5.	npm install
6.	Start the development server: 
7.	npm start
Backend Setup
1.	Navigate to the backend directory: 
2.	cd backend
3.	Install dependencies: 
4.	npm install
5.	Create a .env file with the following variables: 
6.	PORT=5000
7.	MONGO_URI=<Your MongoDB URI>
8.	JWT_SECRET=<Your JWT Secret>
9.	Start the backend server: 
10.	npm start
________________________________________
Live Application
Access the deployed application at: https://calendar-yqke.vercel.app/

