# Configurazione Firebase per Budget Calculator

## 📋 Passi per Configurare Firebase

### 1. Crea un Progetto Firebase
1. Vai su [Firebase Console](https://console.firebase.google.com/)
2. Clicca su "Aggiungi progetto" o "Add project"
3. Inserisci un nome per il progetto (es: "budget-calculator")
4. Segui i passaggi guidati

### 2. Aggiungi un'App Web
1. Nel dashboard del progetto, clicca sull'icona Web `</>`
2. Registra l'app con un nickname (es: "Budget Calculator Web")
3. Copia la configurazione Firebase che appare

### 3. Abilita l'Autenticazione
1. Nel menu laterale, vai su "Authentication"
2. Clicca su "Get started" o "Inizia"
3. Nella tab "Sign-in method":
   - Abilita **Email/Password**
   - Abilita **Google** (aggiungi email di supporto quando richiesto)

### 4. Configura Firestore (Opzionale per sincronizzazione cloud)
1. Nel menu laterale, vai su "Firestore Database"
2. Clicca "Crea database"
3. Scegli "Inizia in modalità test" (per sviluppo)
4. Seleziona una località per il database

### 5. Aggiorna il File di Configurazione
Copia la tua configurazione Firebase e incollala in `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",  // La tua API key
  authDomain: "budget-calculator-xxxxx.firebaseapp.com",
  projectId: "budget-calculator-xxxxx",
  storageBucket: "budget-calculator-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};
```

### 6. Configura il Dominio Autorizzato
1. In Firebase Console > Authentication > Settings
2. Nella sezione "Authorized domains"
3. Aggiungi `localhost` se non è già presente (dovrebbe esserci di default)

## 🚀 Avvio dell'Applicazione

```bash
npm start
```

## 🔐 Funzionalità di Autenticazione

- ✅ Registrazione con email/password
- ✅ Login con email/password
- ✅ Login con Google
- ✅ Logout
- ✅ Gestione errori in italiano
- ✅ Sessione persistente

## 📝 Note Importanti

- I dati sono attualmente salvati in **localStorage** (locale al browser)
- Per sincronizzare i dati tra dispositivi, sarà necessario implementare Firestore
- La configurazione Firebase NON deve essere committata in repository pubblici
- Considera di usare variabili d'ambiente (`.env`) per la configurazione in produzione

## 🛡️ Regole di Sicurezza Firestore (se implementi il database)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
