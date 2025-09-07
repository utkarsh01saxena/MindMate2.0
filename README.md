# MindMate 🧠💙

> Your AI-powered mental wellness companion for a healthier, more balanced life.

![MindMate](https://img.shields.io/badge/Built%20with-React-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue) ![Supabase](https://img.shields.io/badge/Backend-Supabase-green) ![Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind-blue)

## 🌟 Overview

MindMate is a comprehensive mental wellness platform that combines AI-powered conversations, mood tracking, guided breathing exercises, and digital journaling to support your mental health journey. Built with modern web technologies, it provides a secure, user-friendly environment for personal growth and emotional well-being.

## ✨ Features

### 🤖 AI Mental Health Companion
- **Intelligent Conversations**: Chat with an AI companion trained to provide supportive, empathetic responses
- **24/7 Availability**: Get support whenever you need it, day or night
- **Personalized Responses**: Tailored guidance based on your specific concerns and needs

### 📊 Mood Tracking
- **Daily Check-ins**: Monitor your emotional state with intuitive mood logging
- **Visual Analytics**: Track patterns and trends in your mental health over time
- **Insights & Recommendations**: Receive personalized insights based on your mood data

### 🫁 Breathing Exercises
- **Guided Sessions**: Structured breathing exercises for stress relief and relaxation
- **Customizable Duration**: Choose sessions that fit your schedule
- **Progress Tracking**: Monitor your mindfulness practice journey

### 📝 Digital Journal
- **Secure Writing Space**: Private journaling with end-to-end security
- **Reflection Prompts**: Guided questions to help process thoughts and emotions
- **Search & Organization**: Find and categorize your entries easily

### 🔐 Secure Authentication
- **User Accounts**: Secure registration and login system
- **Data Privacy**: Your personal information is protected and encrypted
- **Multi-device Sync**: Access your data across all your devices

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks and functional components
- **TypeScript** - Type-safe development for better code quality
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **shadcn/ui** - Beautiful, accessible component library
- **Vite** - Fast build tool and development server

### Backend
- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **Edge Functions** - Serverless functions for AI integration
- **Row Level Security** - Database-level security for user data

### AI Integration
- **Google Gemini API** - Advanced language model for conversational AI
- **Custom System Prompts** - Specialized instructions for mental health support

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm))
- Supabase account
- Google AI API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mindmate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Add your Supabase and Google AI API credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Production Deployment

Deploy instantly with Lovable's one-click deployment or host on your preferred platform:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the build folder
- **Custom Domain**: Configure through project settings

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ChatInterface.tsx
│   ├── MoodTracker.tsx
│   ├── BreathingExercises.tsx
│   └── Journal.tsx
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── integrations/       # External service integrations

supabase/
├── functions/          # Edge functions
└── migrations/         # Database schema
```

## 🔒 Security & Privacy

- **End-to-End Encryption**: All user data is encrypted at rest and in transit
- **Row Level Security**: Database-level access controls ensure data isolation
- **No Data Tracking**: We don't track or sell your personal information
- **GDPR Compliant**: Built with privacy regulations in mind

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Add tests for new features
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you need help or have questions:
- Open an issue on GitHub
- Check our [documentation](docs/)
- Join our community discussions



---

<div align="center">

**Made with ❤️ for mental wellness**

[Demo](https://your-demo-url.com) • [Documentation](docs/) • [Report Bug](issues/) • [Request Feature](issues/)

</div>
