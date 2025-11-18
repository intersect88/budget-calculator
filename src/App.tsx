import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Plus, Trash2, Wallet, TrendingUp, AlertCircle, PiggyBank, LogOut, UserPlus } from 'lucide-react';
import { useAuth } from './AuthContext';

interface Expense {
  id: number;
  category: string;
  amount: string;
}

interface Income {
  id: number;
  category: string;
  amount: string;
}

// Funzioni helper per localStorage
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = <T,>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const App: React.FC = () => {
  const { user, isGuest, logout, exitGuestMode } = useAuth();
  const [netSalary, setNetSalary] = useState<string>(() => loadFromStorage<string>('netSalary', ''));
  const [expenses, setExpenses] = useState<Expense[]>(() => loadFromStorage<Expense[]>('expenses', [
    { id: 1, category: 'Affitto/Mutuo', amount: '' },
    { id: 2, category: 'Bollette', amount: '' },
    { id: 3, category: 'Trasporti', amount: '' },
    { id: 4, category: 'Spesa alimentare', amount: '' }
  ]));
  const [incomes, setIncomes] = useState<Income[]>(() => loadFromStorage<Income[]>('incomes', [
    { id: 1, category: 'Freelance', amount: '' },
    { id: 2, category: 'Affitti', amount: '' }
  ]));

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  const handleCreateAccount = (): void => {
    exitGuestMode();
  };

  // Salva automaticamente quando cambiano i dati
  useEffect(() => {
    saveToStorage('netSalary', netSalary);
  }, [netSalary]);

  useEffect(() => {
    saveToStorage('expenses', expenses);
  }, [expenses]);

  useEffect(() => {
    saveToStorage('incomes', incomes);
  }, [incomes]);

  const addExpense = useCallback(() => {
    setExpenses(prev => {
      const newId = Math.max(...prev.map(e => e.id), 0) + 1;
      return [...prev, { id: newId, category: '', amount: '' }];
    });
  }, []);

  const removeExpense = useCallback((id: number): void => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }, []);

  const updateExpense = useCallback((id: number, field: keyof Expense, value: string): void => {
    setExpenses(prev => prev.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ));
  }, []);

  const addIncome = useCallback(() => {
    setIncomes(prev => {
      const newId = Math.max(...prev.map(i => i.id), 0) + 1;
      return [...prev, { id: newId, category: '', amount: '' }];
    });
  }, []);

  const removeIncome = useCallback((id: number): void => {
    setIncomes(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateIncome = useCallback((id: number, field: keyof Income, value: string): void => {
    setIncomes(prev => prev.map(i => 
      i.id === id ? { ...i, [field]: value } : i
    ));
  }, []);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, exp) => {
      const amount = parseFloat(exp.amount) || 0;
      return sum + amount;
    }, 0);
  }, [expenses]);

  const totalIncomes = useMemo(() => {
    return incomes.reduce((sum, inc) => {
      const amount = parseFloat(inc.amount) || 0;
      return sum + amount;
    }, 0);
  }, [incomes]);

  const netSalaryValue = useMemo(() => parseFloat(netSalary) || 0, [netSalary]);

  const totalIncome = useMemo(() => {
    return netSalaryValue + totalIncomes;
  }, [netSalaryValue, totalIncomes]);

  const availableMoney = useMemo(() => {
    return totalIncome - totalExpenses;
  }, [totalIncome, totalExpenses]);

  const expensePercentage = useMemo(() => {
    return totalIncome > 0 ? (totalExpenses / totalIncome * 100) : 0;
  }, [totalIncome, totalExpenses]);

  const getExpenseColor = useCallback((percentage: number): string => {
    if (percentage > 70) return 'bg-red-500';
    if (percentage > 50) return 'bg-yellow-500';
    return 'bg-green-500';
  }, []);

  const progressBarWidth = useMemo(() => {
    return `${Math.min(expensePercentage, 100)}%`;
  }, [expensePercentage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Banner per utenti guest */}
        {isGuest && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-yellow-900">
                  Stai usando la modalità ospite
                </p>
                <p className="text-xs text-yellow-700">
                  I tuoi dati sono salvati solo su questo browser. Crea un account per sincronizzarli su tutti i tuoi dispositivi.
                </p>
              </div>
            </div>
            <button
              onClick={handleCreateAccount}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition whitespace-nowrap flex-shrink-0"
            >
              <UserPlus className="w-4 h-4" />
              Crea Account
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Wallet className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">Gestione Budget Mensile</h1>
            </div>
            <div className="flex items-center gap-4">
              {!isGuest && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Benvenuto</p>
                  <p className="text-sm font-semibold text-gray-800">{user?.email}</p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                title={isGuest ? "Esci dalla modalità ospite" : "Esci"}
              >
                <LogOut className="w-4 h-4" />
                Esci
              </button>
            </div>
          </div>

          {/* Stipendio Netto */}
          <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Stipendio Netto Mensile (€)
            </label>
            <input
              type="number"
              value={netSalary}
              onChange={(e) => setNetSalary(e.target.value)}
              placeholder="Es: 1500"
              className="w-full px-4 py-3 text-lg border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Spese Fisse */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Spese Fisse Mensili</h2>
              <button
                onClick={addExpense}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <Plus className="w-4 h-4" />
                Aggiungi Spesa
              </button>
            </div>

            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={expense.category}
                    onChange={(e) => updateExpense(expense.id, 'category', e.target.value)}
                    placeholder="Categoria (es: Netflix)"
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition"
                  />
                  <input
                    type="number"
                    value={expense.amount}
                    onChange={(e) => updateExpense(expense.id, 'amount', e.target.value)}
                    placeholder="€"
                    className="w-32 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition"
                  />
                  <button
                    onClick={() => removeExpense(expense.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Entrate Aggiuntive */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Entrate Aggiuntive</h2>
              <button
                onClick={addIncome}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <PiggyBank className="w-4 h-4" />
                Aggiungi Entrata
              </button>
            </div>

            <div className="space-y-3">
              {incomes.map((income) => (
                <div key={income.id} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={income.category}
                    onChange={(e) => updateIncome(income.id, 'category', e.target.value)}
                    placeholder="Categoria (es: Freelance)"
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-400 transition"
                  />
                  <input
                    type="number"
                    value={income.amount}
                    onChange={(e) => updateIncome(income.id, 'amount', e.target.value)}
                    placeholder="€"
                    className="w-32 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-400 transition"
                  />
                  <button
                    onClick={() => removeIncome(income.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Riepilogo */}
          <div className="mt-8 space-y-4">
            <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">Totale Entrate:</span>
                <span className="text-2xl font-bold text-green-600">
                  €{totalIncome.toFixed(2)}
                </span>
              </div>
              {totalIncomes > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Stipendio: €{netSalaryValue.toFixed(2)}</p>
                  <p>Entrate aggiuntive: €{totalIncomes.toFixed(2)}</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">Totale Spese Fisse:</span>
                <span className="text-2xl font-bold text-red-600">
                  €{totalExpenses.toFixed(2)}
                </span>
              </div>
              {totalIncome > 0 && (
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Percentuale sulle entrate totali</span>
                    <span>{expensePercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getExpenseColor(expensePercentage)}`}
                      style={{ width: progressBarWidth }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className={`p-6 rounded-xl ${
              availableMoney >= 0 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200' 
                : 'bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className={`w-6 h-6 ${availableMoney >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                <span className="text-gray-700 font-semibold text-lg">
                  Denaro Disponibile (non vincolato):
                </span>
              </div>
              <div className={`text-4xl font-bold ${availableMoney >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                €{availableMoney.toFixed(2)}
              </div>
              
              {totalIncome > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  {availableMoney >= 0 ? (
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="font-medium text-gray-700">💡 Suggerimenti:</p>
                      <p>• Considera di risparmiare il 20% (€{(availableMoney * 0.2).toFixed(2)})</p>
                      <p>• Crea un fondo emergenze se non ce l'hai già</p>
                      <p>• Rimangono €{(availableMoney * 0.8).toFixed(2)} per spese discrezionali</p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 text-sm text-red-700">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Attenzione: le tue spese superano le entrate!</p>
                        <p className="mt-1">Devi ridurre le spese di €{Math.abs(availableMoney).toFixed(2)} o aumentare le entrate.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">📊 Guida alle percentuali:</h3>
          <ul className="space-y-1">
            <li>• <span className="text-green-600 font-medium">Fino al 50%</span> - Ottima gestione delle spese</li>
            <li>• <span className="text-yellow-600 font-medium">50-70%</span> - Buona gestione, ma attenzione</li>
            <li>• <span className="text-red-600 font-medium">Oltre 70%</span> - Spese troppo alte, cerca di ridurle</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
