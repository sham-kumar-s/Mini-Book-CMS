# Mini-Book CMS

A full-stack Content Management System for managing books, chapters, and pages with version history tracking. Built with React (Vite) frontend and Node.js/Express backend.

##  Quick Start

**Run both servers using two terminal windows:**

**Terminal 1 - Backend Server:**

```bash
cd backend
npm install
npm start
```

Server will start on `http://localhost:3000`

**Terminal 2 - Frontend Server:**

```bash
cd frontend
npm install
npm run dev
```

Frontend will start on `http://localhost:5173`

Then open your browser and navigate to `http://localhost:5173`

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)
- [Development Notes](#development-notes)

## 🎯 Overview

This Mini-Book CMS is a hierarchical content management system that allows users to create and manage books with nested chapters and pages. Each page supports version history, enabling users to track changes and revert to previous versions.

**Interview Assessment Project** - This project demonstrates full-stack development capabilities including:

- RESTful API design
- React component architecture
- State management
- File-based data persistence
- Version control implementation
- Error handling and validation

## ✨ Features

- **Book Management**: Create, read, update, and delete books
- **Chapter Management**: Organize content into chapters within books
- **Page Management**: Create and manage individual pages within chapters
- **Version History**: Track and restore previous versions of pages
- **Hierarchical Structure**: Books → Chapters → Pages
- **Real-time Updates**: Immediate UI updates after CRUD operations
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Data Persistence**: File-based storage using LowDB

## 🛠 Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend

- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **LowDB 7** - File-based JSON database
- **fs-extra** - Enhanced file system operations
- **nanoid** - Unique ID generation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
project-root/
├── backend/
│   ├── controllers/        # Business logic
│   │   ├── booksControllers.js
│   │   ├── chaptersControllers.js
│   │   └── pagesControllers.js
│   ├── routes/            # API routes
│   │   ├── bookRoutes.js
│   │   ├── chapterRoutes.js
│   │   └── pagesRoutes.js
│   ├── utils/             # Utility functions
│   │   ├── db.js
│   │   ├── fileStorage.js
│   │   └── versionManager.js
│   ├── storage/           # File storage directory
│   ├── db/               # Database files
│   ├── server.js         # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── BookForm.jsx
│   │   │   ├── ChapterForm.jsx
│   │   │   ├── PageForm.jsx
│   │   │   └── VersionHistory.jsx
│   │   ├── App.jsx       # Main application
│   │   ├── App.css       # Styles
│   │   └── main.jsx      # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 📦 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)

To verify installations:

```bash
node --version
npm --version
```

## 🚀 Installation

### 1. Clone or Download the Repository

```bash
# If using Git
git clone <repository-url>
cd project-root

# Or download and extract the ZIP file
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

This will install:

- express
- cors
- lowdb
- fs-extra
- nanoid

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

This will install:

- react
- react-dom
- axios
- vite
- @vitejs/plugin-react
- ESLint and related plugins

## 🏃 Running the Application

You need to run both the backend and frontend servers simultaneously.

### Option 1: Using Two Terminal Windows (Recommended)

**Terminal 1 - Backend Server:**

```bash
cd backend
npm start
```

Expected output:

```
Server running on port 3000
```

**Terminal 2 - Frontend Development Server:**

```bash
cd frontend
npm run dev
```

Expected output:

```
  VITE v6.2.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Option 2: Using a Single Terminal with Background Process

**macOS/Linux:**

```bash
# Start backend in background
cd backend
npm start &

# Start frontend
cd ../frontend
npm run dev
```

**Windows (PowerShell):**

```powershell
# Start backend
Start-Process -NoNewWindow npm -ArgumentList "start" -WorkingDirectory "backend"

# Start frontend
cd frontend
npm run dev
```

### 3. Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

The frontend will communicate with the backend API at `http://localhost:3000`

## 🔌 API Endpoints

### Books

- `GET /books` - Get all books
- `GET /books/:id` - Get a specific book
- `POST /books` - Create a new book
- `PUT /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

### Chapters

- `GET /chapters` - Get all chapters
- `GET /chapters/:id` - Get a specific chapter
- `GET /chapters/book/:bookId` - Get chapters by book ID
- `POST /chapters` - Create a new chapter
- `PUT /chapters/:id` - Update a chapter
- `DELETE /chapters/:id` - Delete a chapter

### Pages

- `GET /pages` - Get all pages
- `GET /pages/:id` - Get a specific page
- `GET /pages/chapter/:chapterId` - Get pages by chapter ID
- `POST /pages` - Create a new page
- `PUT /pages/:id` - Update a page
- `DELETE /pages/:id` - Delete a page
- `GET /pages/:id/versions` - Get version history for a page
- `POST /pages/:id/restore/:versionId` - Restore a specific version

## 📖 Usage Guide

### Creating Content

1. **Create a Book**

   - Enter book title and author
   - Click "Add Book"

2. **Create a Chapter**

   - Select a book from the dropdown
   - Enter chapter title
   - Click "Add Chapter"

3. **Create a Page**
   - Select a chapter from the dropdown
   - Enter page title and content
   - Click "Add Page"

### Managing Versions

1. **View Version History**

   - Enter a Page ID
   - Click "Get Version History"
   - View all previous versions with timestamps

2. **Restore a Version**
   - Click "Restore" next to any version
   - The page content will revert to that version

### Data Persistence

- All data is stored in the `backend/db/` directory as JSON files
- Page versions are stored in `backend/storage/versions/`
- Data persists across server restarts

## 🔧 Development Notes

### Port Configuration

- **Backend**: Port 3000 (configured in `backend/server.js`)
- **Frontend**: Port 5173 (default Vite port)

To change ports:

- Backend: Edit `server.js` line 20
- Frontend: Add to `vite.config.js`:
  ```javascript
  export default defineConfig({
    plugins: [react()],
    server: {
      port: 3001, // Your desired port
    },
  });
  ```

### Building for Production

**Frontend:**

```bash
cd frontend
npm run build
```

This creates an optimized build in `frontend/dist/`

**Backend:**
The backend runs directly with Node.js (no build step required)

### Stopping the Servers

- Press `Ctrl + C` in each terminal window
- Or close the terminal windows

### Troubleshooting

**Port Already in Use:**

```bash
# Find and kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Find and kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Dependencies Issues:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**CORS Errors:**

- Ensure backend is running on port 3000
- Check that CORS is enabled in `server.js`

## 📄 License

This project is created for interview assessment purposes.

## 👤 Author

Sham Kumar

---

**Last Updated**: January 2026
