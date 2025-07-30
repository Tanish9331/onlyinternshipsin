# Online Internship Test Platform

A modern, full-stack web application for conducting online internship assessments with secure proctoring and instant results.

## 🚀 Features

- **Custom Cursor System**: Beautiful Yuga Yatra branded cursor with smooth animations
- **Secure Testing**: Proctored online assessments with real-time monitoring
- **Instant Results**: Automated scoring and merit-based rankings
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Admin Dashboard**: Comprehensive admin panel for test management
- **Student Portal**: User-friendly interface for test takers

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Icons** - Beautiful icon library

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Custom Features
- **Custom Cursor**: Yuga Yatra branded cursor with hover effects
- **Loading States**: Smooth loading animations
- **Responsive Design**: Mobile-first approach

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ruchithamula/online-internship-platform.git
   cd online-internship-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend
   npm install
   cd ..
   ```

3. **Environment setup**
   ```bash
   # Create .env file in root directory
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the application**
   ```bash
   # Start frontend (port 3000)
   npm start
   
   # Start backend (port 5000)
   cd backend
   npm start
   ```

## 🎯 Custom Cursor Features

The application includes a sophisticated custom cursor system:

- **Default State**: Gold Yuga Yatra logo (32x32px)
- **Hover State**: White-glow version (28x28px)
- **Loading State**: Spinning gold animation
- **Smooth Transitions**: Cubic-bezier easing
- **Cross-browser Support**: Works on all modern browsers

### Test the Cursor
- **Simple Test**: `http://localhost:3000/simple-test`
- **Full Demo**: `http://localhost:3000/cursor-demo`
- **Main App**: `http://localhost:3000/`

## 📁 Project Structure

```
online-internship-platform/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── CustomCursor.js
│   │   │   ├── YugaYatraLogo.js
│   │   │   └── CursorDemo.js
│   │   ├── admin/
│   │   ├── student/
│   │   └── payment/
│   ├── styles/
│   │   └── cursor.css
│   ├── hooks/
│   │   └── useLoadingCursor.js
│   └── utils/
│       └── cursorUtils.js
├── backend/
│   ├── models/
│   ├── routes/
│   └── server.js
├── public/
└── package.json
```

## 🔧 Configuration

### Environment Variables
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Custom Cursor Configuration
The cursor can be customized in `src/styles/cursor.css`:
- Colors and branding
- Animation timing
- Hover effects
- Loading states

## 🚀 Deployment

### Frontend (React)
```bash
npm run build
# Deploy build/ folder to your hosting service
```

### Backend (Node.js)
```bash
cd backend
npm start
# Deploy to your server or cloud platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ruchitha Mula**
- GitHub: [@Ruchithamula](https://github.com/Ruchithamula)

## 🙏 Acknowledgments

- Yuga Yatra Retail for branding and design inspiration
- React and Node.js communities for excellent documentation
- Tailwind CSS for the amazing utility-first framework

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: [Your Email]

---

**Made with ❤️ by Ruchitha Mula** 