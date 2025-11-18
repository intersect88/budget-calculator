import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'it';

interface Translations {
  // Header
  appTitle: string;
  welcome: string;
  logout: string;
  exitGuestMode: string;
  
  // Guest Banner
  guestMode: string;
  guestModeDesc: string;
  createAccount: string;
  
  // Salary
  netSalary: string;
  salaryPlaceholder: string;
  
  // Expenses
  fixedExpenses: string;
  addExpense: string;
  categoryPlaceholder: string;
  expenseCategoryPlaceholder: string;
  
  // Income
  additionalIncome: string;
  addIncome: string;
  incomeCategoryPlaceholder: string;
  
  // Summary
  totalIncome: string;
  salary: string;
  additionalIncomeLabel: string;
  totalExpenses: string;
  percentageLabel: string;
  availableMoney: string;
  suggestions: string;
  suggestSaving: string;
  suggestEmergency: string;
  suggestRemaining: string;
  warning: string;
  warningMessage: string;
  
  // Guide
  guideTitle: string;
  guideGood: string;
  guideWarning: string;
  guideBad: string;
  
  // Default categories
  defaultExpenses: Array<{ category: string }>;
  defaultIncomes: Array<{ category: string }>;
  
  // Login
  signIn: string;
  signUp: string;
  manageYourBudget: string;
  email: string;
  password: string;
  loading: string;
  or: string;
  continueWithGoogle: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  continueWithoutAccount: string;
  dataSavedLocally: string;
  
  // Errors
  emailInUse: string;
  invalidEmail: string;
  userNotFound: string;
  wrongPassword: string;
  weakPassword: string;
  loginCancelled: string;
  authError: string;
}

const translations: Record<Language, Translations> = {
  en: {
    appTitle: 'Monthly Budget Manager',
    welcome: 'Welcome',
    logout: 'Logout',
    exitGuestMode: 'Exit guest mode',
    
    guestMode: "You're using guest mode",
    guestModeDesc: 'Your data is only saved on this browser. Create an account to sync across all your devices.',
    createAccount: 'Create Account',
    
    netSalary: 'Monthly Net Salary (€)',
    salaryPlaceholder: 'e.g., 1500',
    
    fixedExpenses: 'Fixed Monthly Expenses',
    addExpense: 'Add Expense',
    categoryPlaceholder: 'Category',
    expenseCategoryPlaceholder: 'Category (e.g., Netflix)',
    
    additionalIncome: 'Additional Income',
    addIncome: 'Add Income',
    incomeCategoryPlaceholder: 'Category (e.g., Freelance)',
    
    totalIncome: 'Total Income:',
    salary: 'Salary',
    additionalIncomeLabel: 'Additional income',
    totalExpenses: 'Total Fixed Expenses:',
    percentageLabel: 'Percentage of total income',
    availableMoney: 'Available Money (unallocated):',
    suggestions: '💡 Suggestions:',
    suggestSaving: 'Consider saving 20%',
    suggestEmergency: "Create an emergency fund if you don't have one",
    suggestRemaining: 'remaining for discretionary spending',
    warning: 'Warning: your expenses exceed your income!',
    warningMessage: 'You need to reduce expenses by',
    
    guideTitle: '📊 Percentage Guide:',
    guideGood: 'Up to 50% - Excellent expense management',
    guideWarning: '50-70% - Good management, but be careful',
    guideBad: 'Over 70% - Expenses too high, try to reduce them',
    
    defaultExpenses: [
      { category: 'Rent/Mortgage' },
      { category: 'Utilities' },
      { category: 'Transportation' },
      { category: 'Groceries' }
    ],
    defaultIncomes: [
      { category: 'Freelance' },
      { category: 'Rental Income' }
    ],
    
    signIn: 'Sign In',
    signUp: 'Sign Up',
    manageYourBudget: 'Manage your personal budget',
    email: 'Email',
    password: 'Password',
    loading: 'Loading...',
    or: 'or',
    continueWithGoogle: 'Continue with Google',
    alreadyHaveAccount: 'Already have an account? Sign In',
    dontHaveAccount: "Don't have an account? Sign Up",
    continueWithoutAccount: 'Continue without account',
    dataSavedLocally: 'Data will be saved only on this browser',
    
    emailInUse: 'Email already in use',
    invalidEmail: 'Invalid email',
    userNotFound: 'User not found',
    wrongPassword: 'Wrong password',
    weakPassword: 'Password too weak (minimum 6 characters)',
    loginCancelled: 'Login cancelled',
    authError: 'Authentication error',
  },
  it: {
    appTitle: 'Gestione Budget Mensile',
    welcome: 'Benvenuto',
    logout: 'Esci',
    exitGuestMode: 'Esci dalla modalità ospite',
    
    guestMode: 'Stai usando la modalità ospite',
    guestModeDesc: 'I tuoi dati sono salvati solo su questo browser. Crea un account per sincronizzarli su tutti i tuoi dispositivi.',
    createAccount: 'Crea Account',
    
    netSalary: 'Stipendio Netto Mensile (€)',
    salaryPlaceholder: 'Es: 1500',
    
    fixedExpenses: 'Spese Fisse Mensili',
    addExpense: 'Aggiungi Spesa',
    categoryPlaceholder: 'Categoria',
    expenseCategoryPlaceholder: 'Categoria (es: Netflix)',
    
    additionalIncome: 'Entrate Aggiuntive',
    addIncome: 'Aggiungi Entrata',
    incomeCategoryPlaceholder: 'Categoria (es: Freelance)',
    
    totalIncome: 'Totale Entrate:',
    salary: 'Stipendio',
    additionalIncomeLabel: 'Entrate aggiuntive',
    totalExpenses: 'Totale Spese Fisse:',
    percentageLabel: 'Percentuale sulle entrate totali',
    availableMoney: 'Denaro Disponibile (non vincolato):',
    suggestions: '💡 Suggerimenti:',
    suggestSaving: 'Considera di risparmiare il 20%',
    suggestEmergency: 'Crea un fondo emergenze se non ce l\'hai già',
    suggestRemaining: 'per spese discrezionali',
    warning: 'Attenzione: le tue spese superano le entrate!',
    warningMessage: 'Devi ridurre le spese di',
    
    guideTitle: '📊 Guida alle percentuali:',
    guideGood: 'Fino al 50% - Ottima gestione delle spese',
    guideWarning: '50-70% - Buona gestione, ma attenzione',
    guideBad: 'Oltre 70% - Spese troppo alte, cerca di ridurle',
    
    defaultExpenses: [
      { category: 'Affitto/Mutuo' },
      { category: 'Bollette' },
      { category: 'Trasporti' },
      { category: 'Spesa alimentare' }
    ],
    defaultIncomes: [
      { category: 'Freelance' },
      { category: 'Affitti' }
    ],
    
    signIn: 'Accedi',
    signUp: 'Registrati',
    manageYourBudget: 'Gestisci il tuo budget personale',
    email: 'Email',
    password: 'Password',
    loading: 'Caricamento...',
    or: 'oppure',
    continueWithGoogle: 'Continua con Google',
    alreadyHaveAccount: 'Hai già un account? Accedi',
    dontHaveAccount: 'Non hai un account? Registrati',
    continueWithoutAccount: 'Continua senza account',
    dataSavedLocally: 'I dati saranno salvati solo su questo browser',
    
    emailInUse: 'Email già in uso',
    invalidEmail: 'Email non valida',
    userNotFound: 'Utente non trovato',
    wrongPassword: 'Password errata',
    weakPassword: 'Password troppo debole (minimo 6 caratteri)',
    loginCancelled: 'Login annullato',
    authError: 'Errore durante l\'autenticazione',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'it' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
