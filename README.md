# Entrypoint Admin Panel

A modern React-based admin panel for managing and monitoring entry points, built with TypeScript and Material-UI.

## 🚀 Technologies

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **UI Framework:** Material-UI (MUI)
- **State Management:** Redux Toolkit
- **Form Handling:** React Hook Form with Yup validation
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Maps Integration:** Leaflet with React-Leaflet
- **Date Handling:** React DatePicker
- **Notifications:** React Toastify
- **Code Quality:**
  - ESLint
  - TypeScript
  - Prettier

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/faridmohammadi00/entrypoint-admin
cd entrypoint-admin
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env` file with your configuration.

## 🚀 Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To preview the production build:

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API services
├── store/         # Redux store configuration
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── App.tsx        # Main application component
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Material-UI team for the amazing UI components
- React team for the incredible framework
- All other open-source contributors
