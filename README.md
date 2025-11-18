# Budget Calculator

React application for personal monthly budget management.

## 🚀 Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will automatically open at `http://localhost:3000`

## 📦 Production Build

```bash
npm run build
```

This will create a `build/` folder with optimized files ready for deployment.

## 🛠️ Technologies Used

- **React 18** - UI Framework
- **Tailwind CSS** - Styling
- **lucide-react** - Icons
- **Create React App** - Project Setup

## 📋 Features

- ✅ Monthly net salary input
- ✅ Fixed monthly expenses management (add/remove)
- ✅ Automatic calculation of available money
- ✅ Expense percentage visualization
- ✅ Savings suggestions
- ✅ Alerts for excessive expenses

## 🔧 Troubleshooting

**Tailwind not working error:**
- Verify that `tailwind.config.js` contains the correct path in `content`
- Make sure `src/index.css` contains the `@tailwind` directives

**lucide-react error:**
```bash
npm install lucide-react --force
```

**Port 3000 occupied:**
```bash
PORT=3001 npm start
```

## 📄 License

This project is private and not available for public use.
