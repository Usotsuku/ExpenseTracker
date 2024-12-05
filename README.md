Expense Tracker with Budget Alerts
**Project Overview
This Expense Tracker with Budget Alerts is a web application designed to help users manage their expenses and budgets effectively.
The app allows users to add, view, categorize, and delete expenses while tracking their monthly spending against a predefined budget.
Users receive notifications when their expenses exceed the budget.

**Features
-Add, View, and Delete Expenses: Users can manage their expenses easily.
-Expense Categories: Classify expenses into categories like Food, Transport, and Entertainment.
-Monthly Budget: Users can set a monthly budget and track progress through a visual progress bar.
-Budget Alerts: Notify users when their expenses exceed their monthly budget.
-Dynamic Chart (Bonus Feature): A pie chart displays expenses by category for better visualization.

**Technology Stack
Frontend: Angular 18
Backend: .NET 8
Database: SQLite

***Setup Instructions
**Prerequisites
Install Node.js for Angular.
Install the .NET 8 SDK for the backend.
Install SQLite
-Frontend
Navigate to ExpenseTrackF:
cd ExpenseTrackerF
Install dependencies
npm install
Start the development server:
ng serve
Open the application in your browser at http://localhost:4200.

-Backend
Navigate to ExpenseTracker:
cd ExpenseTrackerB
Restore dependencies:
dotnet restore
Build and run the backend:
dotnet run
The backend will be available at https://localhost:7256.

**Usage
-Open the app in your browser.
-Add your expenses with details like category and amount.
-Set a monthly budget in the settings.
-View a progress bar showing your remaining budget.
-Get notified if your total expenses exceed the budget.

**Limitations
User Authentication: Not yet implemented. All expense data is currently treated as global and not tied to specific users.

**Bonus Features
Chart Visualization: Displays expenses by category using a dynamic pie chart.
Customizable Categories: Allows users to manage their expense categories.

**Video Demo
Watch a demo of the application here.
