# Mini-Book CMS

A full-stack Content Management System for managing books, chapters, and pages with comprehensive version history tracking.

---

## 🚀 Quick Start

### 1. Start Backend Server

Open a terminal and run:

```bash
cd backend
npm install
npm start
```

Backend will run on `http://localhost:3000`

### 2. Start Frontend Server

Open a **new terminal** and run:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### 3. Open Application

Navigate to `http://localhost:5173` in your browser.

---

## � How to Use

### Creating a Book

1. In the **Create Book** section:
   - Enter **Title** (required)
   - Enter **Description** (required)
   - Optionally enter **Number of Initial Pages** (auto-creates empty pages)
   - Click **Create Book**
2. Note the Book ID from the success alert

### Creating a Chapter

1. In the **Create Chapter** section:
   - Enter the **Book ID**
   - Enter **Chapter Title** (required)
   - Optionally enter **Order** (auto-increments if left blank)
   - Click **Create Chapter**
2. Note the Chapter ID from the success alert

### Creating a Page

1. In the **Create Page** section:
   - Enter the **Chapter ID**
   - Enter **Page Title** (required)
   - Enter **Content** (optional)
   - Optionally enter **Editor Name**
   - Click **Create Page**
2. Note the Page ID from the success alert

### Editing a Page

1. In the **Edit Page** section:
   - Enter the **Page ID**
   - Enter **Updated Content**
   - Optionally enter **Editor Name**
   - Click **Save (New Version)**
2. A new version is created automatically

### Editing Index Page

1. In the **Index Page Editor** section:
   - Enter the **Book ID**
   - Click **Load Index** to view current content
   - Edit the content in the textarea
   - Optionally enter **Editor Name**
   - Click **Update Index**
2. Click **Load Versions** to see all index versions

### Viewing Version History

1. In the **Version History** section:
   - Enter the **Page ID**
   - Optionally enter **Editor Name** (for restore operations)
   - Click **Load Versions**
2. You'll see all versions with:
   - Version number
   - Date and time
   - Editor name
   - Restore button

### Restoring a Previous Version

1. After loading version history:
   - Click **Restore** next to any version
   - A new version is created with the old content
   - Previous versions are never overwritten

---

## 🛠 Tech Stack & Technologies

### Frontend

- **React 19.0.0** - UI library
- **Vite 6.2.0** - Build tool and dev server
- **Axios 1.13.2** - HTTP client for API calls
- **CSS3** - Styling

### Backend

- **Node.js** - JavaScript runtime
- **Express 5.2.1** - Web framework
- **LowDB 7.0.1** - File-based JSON database for metadata
- **fs-extra 11.3.3** - Enhanced filesystem operations for version storage
- **nanoid 5.1.6** - Unique ID generation
- **CORS 2.8.5** - Cross-origin resource sharing

### Storage Architecture

- **LowDB** - Stores metadata (books, chapters, pages, version indexes)
- **Filesystem** - Stores page content versions as JSON files
- **Local Storage** - All data persists locally, no external databases

### Key Features Implemented

- ✅ Hierarchical content structure (Books → Chapters → Pages)
- ✅ Complete version history tracking
- ✅ Version restoration without overwriting
- ✅ Editor name tracking for each version
- ✅ Timestamp tracking for all versions
- ✅ Index page management with versioning
- ✅ Chapter ordering/sequencing
- ✅ Initial page creation during book setup
- ✅ RESTful API design
- ✅ Error handling and validation

---

## 👤 Author

**Sham Kumar**

---

**Last Updated**: January 2026
