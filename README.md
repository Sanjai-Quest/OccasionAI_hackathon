# 🎨 OccasionAI - Artisan Empowerment Platform

> **AI-Powered Digital Platform for Local Artisans**

A modern web application that empowers traditional artisans to showcase their craft, generate compelling stories, and create social media content using Google's Generative AI Studio.

## 🌟 Features

- **🔐 Secure Authentication** - JWT-based user registration and login
- **📸 Photo Upload & Gallery** - Upload and showcase up to 5 craft images
- **🤖 AI-Powered Storytelling** - Generate engaging narratives about artisan heritage and craft process
- **📱 Smart Social Media Content** - Create a week's worth of Instagram/Facebook posts with hashtags
- **✨ Modern UI/UX** - Beautiful gradient backgrounds with floating animations

## 🛠 Tech Stack

### Backend
- **Spring Boot 3.2.0** (Java 17)
- **Spring Security** with JWT Authentication
- **Spring WebFlux** for reactive programming
- **Google Generative AI Studio API** integration

### Frontend
- **React** with modern hooks
- **Tailwind CSS** for responsive design
- **Custom animations** and gradient backgrounds
- **RESTful API** integration

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 16+
- Google AI Studio API Key

### Backend Setup
1. Clone the repository:
git clone https://github.com/Sanjai-Quest/OccasionAI_hackathon.git
cd OccasionAI_hackathon

2. Configure API key in `src/main/resources/application.properties`:
google.ai.studio.api.key=YOUR_GOOGLE_AI_STUDIO_API_KEY

3. Run Spring Boot application:
./mvnw spring-boot:run

Backend will start at `http://localhost:8080`

### Frontend Setup
1. Navigate to frontend directory:
cd frontend


2. Install dependencies:
npm install

3. Configure environment variables in `.env`:
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_GOOGLE_AI_API_KEY=YOUR_GOOGLE_AI_STUDIO_API_KEY


4. Start React development server:
Frontend will start at `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | User registration |
| `POST` | `/api/auth/login` | User authentication |
| `POST` | `/api/media/upload` | Upload craft images |
| `POST` | `/api/ai/story` | Generate craft story |
| `POST` | `/api/ai/social` | Generate social media posts |

## 🎯 Usage Example

1. **Register/Login** as an artisan
2. **Upload photos** of your handcrafted items
3. **Generate story** - AI creates engaging narrative about your craft
4. **Create posts** - AI generates 7 social media captions with hashtags
5. **Copy & share** your content across platforms

## 🎨 Design Highlights

- **Gradient Background**: Deep indigo to purple gradient with animated floating shapes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: High contrast and readable typography
- **Modern Animations**: Smooth transitions and floating elements

## 🏗 Project Structure

OccasionAI_hackathon/
├── src/main/java/com/alttab/occasionai/
│ ├── controller/ # REST API controllers
│ ├── service/ # Business logic services
│ ├── model/ # Data models
│ ├── security/ # Authentication & security
│ └── config/ # App configuration
├── frontend/
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── pages/ # Page components
│ │ ├── services/ # API services
│ │ └── context/ # React context
│ └── tailwind.config.js # Tailwind configuration
└── pom.xml # Maven dependencies


## 🔧 Configuration

### Google AI Studio Setup
1. Get API key from [Google AI Studio](https://makersuite.google.com/)
2. Add to both backend and frontend configuration
3. Ensure API quotas are sufficient for testing

### File Upload
- Images stored in `uploads/` directory
- Supported formats: JPG, PNG, GIF
- Maximum file size: 5MB per image

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team Alt_Tab Coders

Built with ❤️ for the GenAI Hackathon 2025

---

**⭐ Star this repo if you find it helpful!**

