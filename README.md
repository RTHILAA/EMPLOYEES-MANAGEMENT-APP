# Employee Management System

A modern, responsive web application for managing employee records with real-time statistics, search and filtering capabilities, and Excel export functionality.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/react-18.0+-61dafb.svg)

## 🎯 Live Demo : 

🔗 [Employee Management System](https://rth-employee-management.netlify.app/)

We would appreciate it if you decide to use this project. Please include credit when using it. Thank you! 🙏

## 🌟 Features

### 📊 Dashboard Overview
- **Real-time statistics** with animated cards
  - Total employees count
  - Active employees tracking
  - On-leave employees monitoring
  - Terminated employees overview

### 👤 Employee Management
- ✅ Add new employees with detailed information
- ✏️ Edit existing employee records
- 🗑️ Delete employees with confirmation dialog
- 🔍 Search functionality across all employee fields
- 🎯 Advanced filtering by department and status

### 📁 Data Management
- 💾 **Local storage persistence** - data saved in browser
- 📥 **Excel export** - export filtered data to XLSX format
- ✔️ **Form validation** - required fields with visual indicators
- 📱 **Responsive design** - works on all device sizes

### 🎨 User Experience
- ✨ **Animations** - smooth transitions and visual feedback
- 🔔 **Notifications** - toast notifications for all actions
- ⚠️ **Confirmation dialogs** - prevent accidental deletions
- ⚡ **Real-time updates** - immediate reflection of changes

## 🚀 Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (version 14.0 or higher)
- **npm** or **yarn**

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employees-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
employees-management-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Styles and animations
│   └── index.js        # Application entry point
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React** | Frontend library for building user interfaces |
| **React Hooks** | useState, useEffect, useMemo for state management |
| **CSS3** | Custom animations and responsive design |
| **Lucide React** | Beautiful icon library |
| **XLSX** | Excel file generation and export |
| **Local Storage** | Client-side data persistence |

---

## 💡 Key Components

### StatsCard Component
Displays statistics with color-coded themes and icons.

### Notification Component
Toast notifications for user feedback with auto-dismiss.

### ConfirmationDialog Component
Modal dialog for confirming destructive actions.

### Employee Form
4-column responsive form layout with:
- Input validation
- Department-specific position grouping
- Real-time feedback

---

## 📱 Responsive Design

The application is fully responsive across all screen sizes:

| Screen Size | Layout |
|-------------|--------|
| **Desktop** (1200px+) | 4-column form layout |
| **Tablet** (950px-1199px) | 3-column form layout |
| **Tablet** (481px-949px) | 2-column form layout |
| **Mobile** (≤480px) | 1-column form layout |

---

## 🔧 Core Functionality

### Employee Operations
- **Add Employee**: Fill the form and click "Add Employee"
- **Edit Employee**: Click the edit icon (pencil) on any employee row
- **Delete Employee**: Click the delete icon (minus) and confirm

### Search & Filters
- **Global Search**: Search across all employee fields
- **Department Filter**: Filter by specific department
- **Status Filter**: Filter by employment status
- **Clear All**: Reset all filters with one click

### Data Export
1. Apply filters (optional)
2. Click "Export Excel" button
3. Download the generated XLSX file

## 🎯 Key Features in Detail

### Form Validation
- Required fields marked with red asterisks
- Email format validation
- Date picker for hire date
- Numeric validation for salary

### Notifications System
- ✅ Success notifications for add/update operations
- ⚠️ Warning notifications for cancellations
- ❌ Danger notifications for deletions
- ℹ️ Info notifications for system messages
- Auto-dismiss after 3 seconds

### Animations
- 🎭 Fade-in effects for page load
- 🎢 Slide animations for form elements
- 💓 Pulse animations for new entries
- 🌀 Shake animations for deletions
- 🔦 Highlight animations for search results

### Data Persistence
- Automatically saves to local storage
- Survives browser refresh
- Maintains search and filter preferences
- No backend required

---

## 📄 Excel Export Features

The export functionality includes:
- ✅ All visible columns from the table
- 📅 Formatted dates and salaries
- 🏢 Department and status information
- ⏰ Timestamped filenames
- 💰 Proper currency formatting (MAD)

---

## 🎨 Design System

### Colors
| Color | Hex Code | Usage |
|-------|----------|-------|
| **Primary** | `#2563eb` | Blue - Primary actions |
| **Success** | `#10b981` | Green - Success states |
| **Warning** | `#f59e0b` | Yellow - Warning states |
| **Danger** | `#ef4444` | Red - Danger actions |
| **Secondary** | `#94a3b8` | Gray - Secondary elements |

### Typography
- **Font**: Poppins (Google Fonts)
- **Weights**: 100-900 with italics
- Consistent sizing across components

### Shadows & Effects
- Subtle shadows for depth
- Hover effects for interactivity
- Smooth transitions (0.3s)
- Gradient accents

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Excel export by [SheetJS](https://sheetjs.com/)
- Design inspiration from modern dashboard UIs

---

## 📞 Contact :

Have questions or suggestions? Feel free to reach out:

- **Developer**: ANASS EL HARAZI
- **Email**:  [anaswins35@gmail.com](mailto:anaswins35@gmail.com)
- **LinkedIn**: [ANASS EL HARAZI](https://www.linkedin.com/in/anasselharazi/)
