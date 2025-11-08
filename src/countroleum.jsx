import React, { useState, useEffect } from "react";
import {
  Plus,
  Minus,
  TrendingUp,
  Calendar,
  DollarSign,
  Trash2,
  Settings,
} from "lucide-react";
// import "tailwindcss";

const Countroleum = () => {
  const [fuelPrices, setFuelPrices] = useState([
    { id: 1, price: 10000, counter: 0 },
    { id: 2, price: 15000, counter: 0 },
    { id: 3, price: 20000, counter: 0 },
    { id: 4, price: 25000, counter: 0 },
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeView, setActiveView] = useState("counter");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [fuelPrices, history]);

  // Ganti dengan implementasi localStorage standar di browser:

  const loadData = () => {
    try {
      const pricesData = localStorage.getItem("fuel-prices");
      const historyData = localStorage.getItem("fuel-history");

      if (pricesData) {
        setFuelPrices(JSON.parse(pricesData)); // Hapus `.value`
      }
      if (historyData) {
        setHistory(JSON.parse(historyData)); // Hapus `.value`
      }
    } catch (error) {
      console.log("No saved data found, using defaults");
    }
  };

  const saveData = () => {
    try {
      localStorage.setItem("fuel-prices", JSON.stringify(fuelPrices));
      localStorage.setItem("fuel-history", JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  const updateCounter = (id, delta) => {
    setFuelPrices((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newCounter = Math.max(0, item.counter + delta);
          if (delta > 0) {
            addToHistory(item.price);
          }
          return { ...item, counter: newCounter };
        }
        return item;
      })
    );
  };

  const addToHistory = (amount) => {
    const entry = {
      id: Date.now(),
      amount,
      date: new Date().toISOString(),
    };
    setHistory((prev) => [...prev, entry]);
  };

  const addNewPrice = () => {
    const newPrice = prompt("Masukkan harga bensin (Rp):");
    if (newPrice && !isNaN(newPrice)) {
      setFuelPrices((prev) => [
        ...prev,
        {
          id: Date.now(),
          price: parseInt(newPrice),
          counter: 0,
        },
      ]);
    }
  };

  const deletePrice = (id) => {
    if (confirm("Hapus nominal ini?")) {
      setFuelPrices((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const formatRupiah = (amount) => {
    return `Rp${amount.toLocaleString("id-ID")}`;
  };

  const getGrandTotal = () => {
    return fuelPrices.reduce((sum, item) => sum + item.price * item.counter, 0);
  };

  const getAnalytics = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );

    const todayTotal = history
      .filter((h) => new Date(h.date) >= today)
      .reduce((sum, h) => sum + h.amount, 0);

    const weekTotal = history
      .filter((h) => new Date(h.date) >= weekAgo)
      .reduce((sum, h) => sum + h.amount, 0);

    const monthTotal = history
      .filter((h) => new Date(h.date) >= monthAgo)
      .reduce((sum, h) => sum + h.amount, 0);

    return { todayTotal, weekTotal, monthTotal };
  };

  const analytics = getAnalytics();

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-50">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-orange-600">
              ⛽ Countroleum
            </h1>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <p className="text-gray-600">Tracker pengeluaran bensin kamu</p>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveView("counter")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeView === "counter"
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Counter
          </button>
          <button
            onClick={() => setActiveView("analytics")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeView === "analytics"
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Counter View */}
        {activeView === "counter" && (
          <div className="space-y-4">
            {showSettings && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-yellow-800 mb-3">
                  Mode Edit: Klik tombol hapus untuk menghapus nominal
                </p>
                <button
                  onClick={addNewPrice}
                  className="w-full py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  + Tambah Nominal Baru
                </button>
              </div>
            )}

            {fuelPrices.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-800">
                        {formatRupiah(item.price)}
                      </span>
                      {showSettings && (
                        <button
                          onClick={() => deletePrice(item.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => updateCounter(item.id, -1)}
                        className="w-10 h-10 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center font-bold"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="text-2xl font-bold text-orange-600 min-w-[60px] text-center">
                        {item.counter}
                      </span>
                      <button
                        onClick={() => updateCounter(item.id, 1)}
                        className="w-10 h-10 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center font-bold"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-bold text-orange-600">
                      {formatRupiah(item.price * item.counter)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Grand Total */}
            <div className="bg-linear-to-r from-orange-500 to-red-500 rounded-xl shadow-xl p-6 text-white">
              <p className="text-lg font-semibold mb-2">Grand Total</p>
              <p className="text-4xl font-bold">
                {formatRupiah(getGrandTotal())}
              </p>
            </div>
          </div>
        )}

        {/* Analytics View */}
        {activeView === "analytics" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-bold text-gray-800">Hari Ini</h2>
              </div>
              <p className="text-3xl font-bold text-orange-600">
                {formatRupiah(analytics.todayTotal)}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-bold text-gray-800">
                  Minggu Ini (7 hari)
                </h2>
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {formatRupiah(analytics.weekTotal)}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Rata-rata: {formatRupiah(Math.round(analytics.weekTotal / 7))}
                /hari
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-bold text-gray-800">
                  Bulan Ini (30 hari)
                </h2>
              </div>
              <p className="text-3xl font-bold text-green-600">
                {formatRupiah(analytics.monthTotal)}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Rata-rata: {formatRupiah(Math.round(analytics.monthTotal / 30))}
                /hari
              </p>
            </div>

            {/* Recent History */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Riwayat Terakhir
              </h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {history
                  .slice(-10)
                  .reverse()
                  .map((entry) => (
                    <div
                      key={entry.id}
                      className="flex justify-between items-center py-2 border-b border-gray-100"
                    >
                      <span className="text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="font-semibold text-orange-600">
                        {formatRupiah(entry.amount)}
                      </span>
                    </div>
                  ))}
                {history.length === 0 && (
                  <p className="text-center text-gray-400 py-4">
                    Belum ada riwayat
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Countroleum;
