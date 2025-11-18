# Budget Calculator

Applicazione React per la gestione del budget mensile personale.

## 🚀 Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm start
```

L'app si aprirà automaticamente su `http://localhost:3000`

## 📦 Build per Produzione

```bash
npm run build
```

Questo creerà una cartella `build/` con i file ottimizzati pronti per il deploy.

## 🛠️ Tecnologie Utilizzate

- **React 18** - Framework UI
- **Tailwind CSS** - Styling
- **lucide-react** - Icone
- **Create React App** - Setup del progetto

## 📋 Funzionalità

- ✅ Inserimento stipendio netto mensile
- ✅ Gestione spese fisse mensili (aggiungi/rimuovi)
- ✅ Calcolo automatico del denaro disponibile
- ✅ Visualizzazione percentuale spese
- ✅ Suggerimenti per il risparmio
- ✅ Alert per spese eccessive

## 🔧 Troubleshooting

**Errore Tailwind non funziona:**
- Verifica che `tailwind.config.js` contenga il corretto path in `content`
- Assicurati che `src/index.css` contenga le direttive `@tailwind`

**Errore lucide-react:**
```bash
npm install lucide-react --force
```

**Porta 3000 occupata:**
```bash
PORT=3001 npm start
```

## 📄 Licenza

Questo progetto è privato e non è disponibile per uso pubblico.
