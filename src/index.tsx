import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login';
import { AuthProvider, useAuth } from './AuthContext';
import { LanguageProvider } from './LanguageContext';

const AppWrapper: React.FC = () => {
  const { user, isGuest, continueAsGuest } = useAuth();
  
  if (user || isGuest) {
    return <App />;
  }
  
  return <Login onSkip={continueAsGuest} />;
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);
