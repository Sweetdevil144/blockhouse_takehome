# Blockhouse Take-Home Assignment: Next.js Application with Django API Integration

This is a web application built using Next.js for the frontend and Django for the backend. The dashboard displays various charts (Bar, Line, Pie, and Candlestick) using data fetched from the Django API.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Setting Up the Application](#setting-up-the-application)
   - [Backend Setup (Django)](#backend-setup-django)
   - [Frontend Setup (Next.js)](#frontend-setup-nextjs)
4. [Libraries and Tools Used](#libraries-and-tools-used)
5. [Approach and Thought Process](#approach-and-thought-process)

## Project Structure

The project is structured in two main parts:
- `server/`: The Django backend that provides the API endpoints.
- `client/`: The Next.js frontend that renders the charts and fetches data from the Django backend.

## Prerequisites
- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- [Python 3](https://www.python.org/) (version 3.6 or higher)
- [Django](https://www.djangoproject.com/)
- [Docker](https://www.docker.com/) (optional, for containerization)

## Setting Up the Application

### Backend Setup (Django)

1. **Navigate to the backend directory:**
   ```bash
   cd server/
   ```

2. **Install Python dependencies:**
   First, create a virtual environment (optional but recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

   Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Django development server:**
   ```bash
   python3 manage.py runserver 8080
   ```

   The server will start at `http://localhost:8080/`.

### Frontend Setup (Next.js)

1. **Navigate to the frontend directory:**
   ```bash
   cd client/
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Run the Next.js development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000/`.

4. **To test the full integration, make sure the Django backend is running as the Next.js app fetches data from `http://localhost:8000/api/` endpoints.**

## Libraries and Tools Used

### Backend (Django):
- **Django**: Web framework for building the API.
- **Django REST Framework**: For handling the API endpoints.
- **JSON**: Hardcoded chart data is stored in JSON format.

### Frontend (Next.js):
- **Next.js**: React framework for server-side rendering and static site generation.
- **Chart.js**: Popular JavaScript library for creating charts.
- **React Chart.js 2**: React wrapper for Chart.js.
- **Axios**: Promise-based HTTP client for fetching API data.
- **TailwindCSS**: Utility-first CSS framework for styling the dashboard.

## Approach and Thought Process

### Frontend (Next.js):
1. **Component-based Approach**: The dashboard is structured as a single page where each chart is rendered using `react-chartjs-2`. Each chart is fetched from a separate API endpoint in the Django backend.
   
2. **Data Fetching**: Data is fetched using `Axios` from the Django backend. The fetched data is then used to populate the charts dynamically.
   
3. **TypeScript for Type Safety**: The Next.js app is written in TypeScript to ensure type safety and reduce potential bugs. Each API response is typed to match the expected data structure.

4. **TailwindCSS for Styling**: TailwindCSS is used to apply utility-based styles across the application to ensure responsive and clean design with minimal custom CSS.

### Backend (Django):
1. **API Design**: The Django REST Framework is used to define four API endpoints for each chart type (`/api/bar-chart-data`, `/api/line-chart-data`, `/api/pie-chart-data`, `/api/candlestick-data`).
   
2. **Data Structure**: The data is hardcoded in JSON files for each chart type. Each API reads its respective JSON file and returns the data in the format expected by the charting library.

3. **Modularity**: The backend is structured to allow easy addition of new charts or data types. Each API endpoint is defined separately and serves the appropriate data.

### Deployment:
If Docker is used, both the backend and frontend can be containerized to simplify the setup process for different environments.
