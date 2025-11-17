import React, { useState, useEffect } from "react";
import {
  Plus,
  Minus,
  TrendingUp,
  Calendar,
  DollarSign,
  Trash2,
  Droplet,
  MapPin,
  Edit2,
  RotateCcw,
  X,
} from "lucide-react";

const Countroleum = () => {
  const fuelStations = [
    { id: "pertamina", name: "Pertamina", color: "bg-green-500" },
    { id: "shell", name: "Shell", color: "bg-yellow-500" },
    { id: "bp", name: "BP", color: "bg-green-600" },
    { id: "exxonmobil", name: "Exxon Mobil", color: "bg-red-600" },
    { id: "vivo", name: "Vivo", color: "bg-orange-500" },
  ];

  const fuelProducts = {
    pertamina: [
      { name: "Pertalite", price: 10000 },
      { name: "Pertamax", price: 12100 },
      { name: "Pertamax Green 95", price: 13150 },
      { name: "Pertamax Turbo", price: 13550 },
      { name: "Dexlite", price: 13400 },
      { name: "Pertamina Dex", price: 13800 },
    ],
    shell: [
      { name: "Shell Super", price: 12290 },
      { name: "Shell V-Power", price: 13340 },
      { name: "Shell V-Power Diesel", price: 13900 },
      { name: "Shell V-Power Nitro+", price: 13570 },
    ],
    bp: [
      { name: "BP 92", price: 12290 },
      { name: "BP Ultimate", price: 13340 },
      { name: "BP Diesel", price: 13610 },
      { name: "BP Ultimate Diesel", price: 13900 },
    ],
    exxonmobil: [
      { name: "Mobil Super", price: 12300 },
      { name: "Mobil Synergy", price: 13400 },
      { name: "Mobil Diesel", price: 13500 },
    ],
    vivo: [
      { name: "Revvo 90", price: 12090 },
      { name: "Revvo 92", price: 12200 },
      { name: "Revvo 95", price: 13270 },
      { name: "Revvo Diesel", price: 13404 },
    ],
  };

  const [fuelEntries, setFuelEntries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [activeView, setActiveView] = useState("counter");
  const [history, setHistory] = useState([]);
  const [customAmounts, setCustomAmounts] = useState([
    10000, 15000, 20000, 25000,
  ]);
  const [showCustomAmountModal, setShowCustomAmountModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedStation, setSelectedStation] = useState("pertamina");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveData();
    }
  }, [fuelEntries, history, customAmounts, isLoaded]);

  const loadData = async () => {
    try {
      // Try window.storage first (for Claude artifact)
      if (typeof window.storage !== "undefined") {
        const entriesData = await window.storage.get("fuel-entries");
        const historyData = await window.storage.get("fuel-history");
        const customAmountsData = await window.storage.get("custom-amounts");

        if (entriesData && entriesData.value) {
          setFuelEntries(JSON.parse(entriesData.value));
        }
        if (historyData && historyData.value) {
          setHistory(JSON.parse(historyData.value));
        }
        if (customAmountsData && customAmountsData.value) {
          setCustomAmounts(JSON.parse(customAmountsData.value));
        }
      } else {
        // Fallback to localStorage (for GitHub Pages or other hosting)
        const entriesData = localStorage.getItem("fuel-entries");
        const historyData = localStorage.getItem("fuel-history");
        const customAmountsData = localStorage.getItem("custom-amounts");

        if (entriesData) {
          setFuelEntries(JSON.parse(entriesData));
        }
        if (historyData) {
          setHistory(JSON.parse(historyData));
        }
        if (customAmountsData) {
          setCustomAmounts(JSON.parse(customAmountsData));
        }
      }

      setIsLoaded(true);
    } catch (error) {
      console.log("No saved data found or error loading:", error);
      setIsLoaded(true);
    }
  };

  const saveData = async () => {
    if (!isLoaded) return;

    try {
      // Try window.storage first (for Claude artifact)
      if (typeof window.storage !== "undefined") {
        await window.storage.set("fuel-entries", JSON.stringify(fuelEntries));
        await window.storage.set("fuel-history", JSON.stringify(history));
        await window.storage.set(
          "custom-amounts",
          JSON.stringify(customAmounts)
        );
        console.log("Data saved to window.storage");
      } else {
        // Fallback to localStorage (for GitHub Pages or other hosting)
        localStorage.setItem("fuel-entries", JSON.stringify(fuelEntries));
        localStorage.setItem("fuel-history", JSON.stringify(history));
        localStorage.setItem("custom-amounts", JSON.stringify(customAmounts));
        console.log("Data saved to localStorage");
      }
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  const addFuelEntry = () => {
    if (!selectedProduct) {
      alert("Mohon pilih produk!");
      return;
    }

    const product = fuelProducts[selectedStation].find(
      (p) => p.name === selectedProduct
    );

    const newEntry = {
      id: Date.now(),
      station: selectedStation,
      product: selectedProduct,
      pricePerLiter: product.price,
      location: location || "Tidak ada lokasi",
      counter: 0,
      totalAmount: 0,
    };

    setFuelEntries((prev) => [...prev, newEntry]);
    setShowAddModal(false);
    resetForm();
  };

  const updateEntry = () => {
    if (
      !editingEntry ||
      !editingEntry.product ||
      !editingEntry.location ||
      !editingEntry.pricePerLiter
    ) {
      alert("Mohon lengkapi semua data!");
      return;
    }

    setFuelEntries((prev) =>
      prev.map((entry) => (entry.id === editingEntry.id ? editingEntry : entry))
    );
    setShowEditModal(false);
    setEditingEntry(null);
  };

  const resetForm = () => {
    setSelectedStation("pertamina");
    setSelectedProduct("");
    setLocation("");
  };

  const updateCounter = (id, amount) => {
    setFuelEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          const newCounter = entry.counter + 1;
          const newTotalAmount = entry.totalAmount + amount;
          const liters = amount / entry.pricePerLiter;

          addToHistory({
            station: entry.station,
            product: entry.product,
            location: entry.location,
            liters,
            pricePerLiter: entry.pricePerLiter,
            amount,
          });

          return { ...entry, counter: newCounter, totalAmount: newTotalAmount };
        }
        return entry;
      })
    );
  };

  const addToHistory = (data) => {
    const entry = {
      id: Date.now(),
      ...data,
      date: new Date().toISOString(),
    };
    setHistory((prev) => [...prev, entry]);
  };

  const undoLastTransaction = () => {
    if (history.length === 0) {
      alert("Tidak ada transaksi untuk di-undo!");
      return;
    }

    if (!confirm("Undo transaksi terakhir?")) return;

    const lastHistory = history[history.length - 1];

    setFuelEntries((prev) =>
      prev.map((entry) => {
        if (
          entry.station === lastHistory.station &&
          entry.product === lastHistory.product &&
          entry.location === lastHistory.location
        ) {
          return {
            ...entry,
            counter: Math.max(0, entry.counter - 1),
            totalAmount: Math.max(0, entry.totalAmount - lastHistory.amount),
          };
        }
        return entry;
      })
    );

    setHistory((prev) => prev.slice(0, -1));
  };

  const deleteEntry = (id) => {
    if (confirm("Hapus entry ini?")) {
      setFuelEntries((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const deleteHistoryItem = (historyId) => {
    if (confirm("Hapus transaksi ini dari riwayat?")) {
      const historyItem = history.find((h) => h.id === historyId);

      if (historyItem) {
        setFuelEntries((prev) =>
          prev.map((entry) => {
            if (
              entry.station === historyItem.station &&
              entry.product === historyItem.product &&
              entry.location === historyItem.location
            ) {
              return {
                ...entry,
                counter: Math.max(0, entry.counter - 1),
                totalAmount: Math.max(
                  0,
                  entry.totalAmount - historyItem.amount
                ),
              };
            }
            return entry;
          })
        );
      }

      setHistory((prev) => prev.filter((h) => h.id !== historyId));
    }
  };

  const resetAllData = () => {
    if (
      confirm("Reset semua data? Ini akan menghapus semua entry dan riwayat!")
    ) {
      setFuelEntries([]);
      setHistory([]);
    }
  };

  const addCustomAmount = () => {
    const amount = prompt("Masukkan nominal (Rp):");
    if (amount && !isNaN(amount)) {
      const newAmount = parseInt(amount);
      if (newAmount > 0) {
        setCustomAmounts((prev) => [...prev, newAmount].sort((a, b) => a - b));
        setShowCustomAmountModal(false);
      }
    }
  };

  const deleteCustomAmount = (amount) => {
    if (customAmounts.length <= 1) {
      alert("Minimal harus ada 1 nominal!");
      return;
    }
    setCustomAmounts((prev) => prev.filter((a) => a !== amount));
  };

  const formatRupiah = (amount) => {
    if (amount === undefined || amount === null || isNaN(amount)) return "Rp0";
    return `Rp${Math.round(amount).toLocaleString("id-ID")}`;
  };

  const getGrandTotal = () => {
    return fuelEntries.reduce(
      (sum, entry) => sum + (entry.totalAmount || 0),
      0
    );
  };

  const getTotalLiters = () => {
    return fuelEntries.reduce((sum, entry) => {
      const liters =
        entry.totalAmount && entry.pricePerLiter
          ? entry.totalAmount / entry.pricePerLiter
          : 0;
      return sum + liters;
    }, 0);
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

    const todayEntries = history.filter((h) => new Date(h.date) >= today);
    const weekEntries = history.filter((h) => new Date(h.date) >= weekAgo);
    const monthEntries = history.filter((h) => new Date(h.date) >= monthAgo);

    return {
      today: {
        total: todayEntries.reduce((sum, h) => sum + h.amount, 0),
        liters: todayEntries.reduce((sum, h) => sum + h.liters, 0),
      },
      week: {
        total: weekEntries.reduce((sum, h) => sum + h.amount, 0),
        liters: weekEntries.reduce((sum, h) => sum + h.liters, 0),
      },
      month: {
        total: monthEntries.reduce((sum, h) => sum + h.amount, 0),
        liters: monthEntries.reduce((sum, h) => sum + h.liters, 0),
      },
    };
  };

  const analytics = getAnalytics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-orange-600">
              ⛽ Countroleum
            </h1>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Liter</p>
              <p className="text-xl font-bold text-blue-600">
                {getTotalLiters().toFixed(1)} L
              </p>
            </div>
          </div>
          <p className="text-gray-600">Tracker pengeluaran bensin kamu</p>
        </div>

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

        {activeView === "counter" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex-1 py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg"
              >
                + Tambah Entry Baru
              </button>
              <button
                onClick={() => setShowCustomAmountModal(true)}
                className="px-4 py-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg"
                title="Atur Nominal"
              >
                <Edit2 className="w-6 h-6" />
              </button>
            </div>

            {history.length > 0 && (
              <button
                onClick={undoLastTransaction}
                className="w-full py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Undo Transaksi Terakhir
              </button>
            )}

            {fuelEntries.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <Droplet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Belum ada entry. Tambahkan yang pertama!
                </p>
              </div>
            )}

            {fuelEntries.map((entry) => {
              const station = fuelStations.find((s) => s.id === entry.station);
              const totalLiters =
                entry.totalAmount && entry.pricePerLiter
                  ? entry.totalAmount / entry.pricePerLiter
                  : 0;
              return (
                <div
                  key={entry.id}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-3 py-1 ${station.color} text-white text-sm font-bold rounded-full`}
                        >
                          {station.name}
                        </span>
                        <button
                          onClick={() => {
                            setEditingEntry(entry);
                            setShowEditModal(true);
                          }}
                          className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xl font-bold text-gray-800 text-left">
                        {entry.product}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{entry.location}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 text-left">
                        {formatRupiah(entry.pricePerLiter)}/liter
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-xl font-bold text-orange-600">
                        {formatRupiah(entry.totalAmount)}
                      </p>
                      <p className="text-sm text-blue-600 font-semibold">
                        {totalLiters.toFixed(1)} L
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {customAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => updateCounter(entry.id, amount)}
                        className="py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-semibold text-sm"
                      >
                        {amount >= 1000 ? `${amount / 1000}K` : amount}
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2">
                    {entry.counter}x isi bensin
                  </p>
                </div>
              );
            })}

            {fuelEntries.length > 0 && (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-xl p-6 text-white">
                <p className="text-lg font-semibold mb-2">Grand Total</p>
                <p className="text-4xl font-bold">
                  {formatRupiah(getGrandTotal())}
                </p>
                <p className="text-lg mt-2">
                  {getTotalLiters().toFixed(1)} Liter Total
                </p>
              </div>
            )}
          </div>
        )}

        {activeView === "analytics" && (
          <div className="space-y-4">
            {(fuelEntries.length > 0 || history.length > 0) && (
              <button
                onClick={resetAllData}
                className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Reset Semua Data
              </button>
            )}

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-bold text-gray-800">Hari Ini</h2>
              </div>
              <p className="text-3xl font-bold text-orange-600">
                {formatRupiah(analytics.today.total)}
              </p>
              <p className="text-lg text-blue-600 font-semibold mt-1">
                {analytics.today.liters.toFixed(1)} Liter
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
                {formatRupiah(analytics.week.total)}
              </p>
              <p className="text-lg text-blue-600 font-semibold mt-1">
                {analytics.week.liters.toFixed(1)} Liter
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Rata-rata: {formatRupiah(Math.round(analytics.week.total / 7))}
                /hari • {(analytics.week.liters / 7).toFixed(1)} L/hari
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
                {formatRupiah(analytics.month.total)}
              </p>
              <p className="text-lg text-blue-600 font-semibold mt-1">
                {analytics.month.liters.toFixed(1)} Liter
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Rata-rata:{" "}
                {formatRupiah(Math.round(analytics.month.total / 30))}/hari •{" "}
                {(analytics.month.liters / 30).toFixed(1)} L/hari
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Riwayat Terakhir
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {history
                  .slice(-15)
                  .reverse()
                  .map((entry) => {
                    const station = fuelStations.find(
                      (s) => s.id === entry.station
                    );
                    return (
                      <div
                        key={entry.id}
                        className="border-b border-gray-100 pb-3"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`px-2 py-0.5 ${station.color} text-white text-xs font-bold rounded`}
                              >
                                {station.name}
                              </span>
                              <span className="text-sm font-semibold text-gray-800">
                                {entry.product}
                              </span>
                              <button
                                onClick={() => deleteHistoryItem(entry.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                title="Hapus transaksi"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-xs text-gray-500">
                              {entry.location}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {new Date(entry.date).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-orange-600">
                              {formatRupiah(entry.amount)}
                            </p>
                            <p className="text-sm text-blue-600 font-semibold">
                              {entry.liters.toFixed(1)} L
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatRupiah(entry.pricePerLiter)}/L
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {history.length === 0 && (
                  <p className="text-center text-gray-400 py-4">
                    Belum ada riwayat
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Tambah Entry Baru
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SPBU
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {fuelStations.map((station) => (
                      <button
                        key={station.id}
                        onClick={() => {
                          setSelectedStation(station.id);
                          setSelectedProduct("");
                        }}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                          selectedStation === station.id
                            ? `${station.color} text-white shadow-lg`
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {station.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Produk & Harga
                  </label>
                  <div
                    className="space-y-2 max-h-64 overflow-y-auto border-2 border-gray-200 rounded-lg p-2"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#d1d5db #f3f4f6",
                    }}
                  >
                    {fuelProducts[selectedStation].map((product) => (
                      <button
                        key={product.name}
                        onClick={() => setSelectedProduct(product.name)}
                        className={`w-full p-3 rounded-lg text-left transition-all ${
                          selectedProduct === product.name
                            ? "bg-orange-500 text-white shadow-md"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{product.name}</span>
                          <span
                            className={`text-sm font-medium ${
                              selectedProduct === product.name
                                ? "text-white"
                                : "text-gray-700"
                            }`}
                          >
                            {formatRupiah(product.price)}/L
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lokasi SPBU{" "}
                    <span className="text-gray-400 text-xs">(Opsional)</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Contoh: Dago, Bandung"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none bg-white text-gray-800"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={addFuelEntry}
                    className="flex-1 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEditModal && editingEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Edit Entry
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Produk
                  </label>
                  <input
                    type="text"
                    value={editingEntry.product}
                    onChange={(e) =>
                      setEditingEntry({
                        ...editingEntry,
                        product: e.target.value,
                      })
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none bg-white text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Harga per Liter (Rp)
                  </label>
                  <input
                    type="number"
                    value={editingEntry.pricePerLiter}
                    onChange={(e) =>
                      setEditingEntry({
                        ...editingEntry,
                        pricePerLiter: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none bg-white text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lokasi SPBU
                  </label>
                  <input
                    type="text"
                    value={editingEntry.location}
                    onChange={(e) =>
                      setEditingEntry({
                        ...editingEntry,
                        location: e.target.value,
                      })
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none bg-white text-gray-800"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingEntry(null);
                    }}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={updateEntry}
                    className="flex-1 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showCustomAmountModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Atur Nominal
              </h2>

              <div className="space-y-3 mb-4">
                {customAmounts.map((amount) => (
                  <div
                    key={amount}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-semibold text-gray-800">
                      {formatRupiah(amount)}
                    </span>
                    <button
                      onClick={() => deleteCustomAmount(amount)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addCustomAmount}
                className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors mb-3"
              >
                + Tambah Nominal Baru
              </button>

              <button
                onClick={() => setShowCustomAmountModal(false)}
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Countroleum;
