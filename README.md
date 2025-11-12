# ⛽ Countroleum

**Countroleum** adalah aplikasi tracker pengeluaran bensin yang membantu kamu mencatat dan menganalisis kebiasaan isi bensin dengan mudah dan praktis!

## 🌟 Fitur Utama

### 📊 Counter & Tracking
- **Multi-SPBU Support**: Pertamina, Shell, BP, Exxon Mobil, dan Vivo
- **Produk Lengkap**: Semua jenis bahan bakar dari setiap SPBU
- **Quick Add**: Tombol cepat untuk nominal 10K, 15K, 20K, 25K (bisa dikustomisasi!)
- **Auto Calculate**: Otomatis hitung total liter berdasarkan harga per liter
- **Lokasi SPBU**: Bisa dicatat lokasi isi bensin (opsional)

### 📈 Analytics
- **Hari Ini**: Total pengeluaran dan liter hari ini
- **Minggu Ini**: Total 7 hari terakhir + rata-rata per hari
- **Bulan Ini**: Total 30 hari terakhir + rata-rata per hari
- **Riwayat Detail**: 15 transaksi terakhir dengan info lengkap

### ✏️ Edit & Manage
- **Edit Entry**: Ubah nama produk, harga per liter, dan lokasi
- **Custom Nominal**: Tambah/hapus nominal sesuai kebutuhan
- **Undo Transaction**: Batalkan transaksi terakhir kalau salah input
- **Delete Specific**: Hapus transaksi tertentu dari riwayat
- **Reset All**: Reset semua data untuk mulai dari awal

## 🎯 Cara Pakai

### 1️⃣ Tambah Entry Baru
1. Klik tombol **"+ Tambah Entry Baru"**
2. Pilih SPBU (Pertamina, Shell, dll)
3. Pilih produk dan harganya (sudah terisi otomatis dengan harga terkini)
4. Isi lokasi SPBU (opsional)
5. Klik **"Simpan"**

### 2️⃣ Isi Bensin
1. Di card entry yang sudah dibuat, klik nominal yang sesuai (10K, 15K, 20K, 25K)
2. Counter dan total otomatis terupdate
3. Liter dihitung otomatis berdasarkan harga per liter

### 3️⃣ Atur Nominal
1. Klik icon **pensil biru** di samping tombol "Tambah Entry Baru"
2. Tambah nominal baru atau hapus yang gak dipake
3. Minimal harus ada 1 nominal

### 4️⃣ Edit Entry
1. Klik icon **pensil biru** di card entry yang mau diedit
2. Ubah produk, harga per liter, atau lokasi
3. Klik **"Update"**

### 5️⃣ Undo & Delete
- **Undo Transaksi Terakhir**: Klik tombol kuning "Undo" di halaman Counter
- **Hapus Transaksi**: Klik icon X di riwayat transaksi (halaman Analytics)
- **Hapus Entry**: Klik icon tempat sampah merah di card entry
- **Reset Semua**: Klik tombol merah "Reset Semua Data" di halaman Analytics

## 💾 Penyimpanan Data

Countroleum menggunakan **window.storage** (bukan localStorage biasa!):
- ✅ Data tersimpan di **cloud Claude**
- ✅ Tetap aman meskipun refresh browser
- ✅ Bisa diakses dari device/browser mana aja
- ✅ Gak hilang meskipun clear cache
- ✅ Auto-save setiap ada perubahan

## 💰 Harga Bensin Terkini

Harga sudah disesuaikan dengan harga bensin terbaru (Desember 2024 - DKI Jakarta):

**Pertamina:**
- Pertalite: Rp10.000/L
- Pertamax: Rp12.100/L
- Pertamax Green 95: Rp13.150/L
- Pertamax Turbo: Rp13.550/L
- Dexlite: Rp13.400/L
- Pertamina Dex: Rp13.800/L

**Shell:**
- Shell Super: Rp12.290/L
- Shell V-Power: Rp13.340/L
- Shell V-Power Diesel: Rp13.900/L
- Shell V-Power Nitro+: Rp13.570/L

**BP:**
- BP 92: Rp12.290/L
- BP Ultimate: Rp13.340/L
- BP Diesel: Rp13.610/L
- BP Ultimate Diesel: Rp13.900/L

**Vivo:**
- Revvo 90: Rp12.090/L
- Revvo 92: Rp12.200/L
- Revvo 95: Rp13.270/L
- Revvo Diesel: Rp13.404/L

**Exxon Mobil:**
- Mobil Super: Rp12.300/L
- Mobil Synergy: Rp13.400/L
- Mobil Diesel: Rp13.500/L

## 🎨 Tech Stack

- **React** - UI Framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **window.storage API** - Data Persistence (Claude Cloud Storage)

## 📱 Responsive Design

Aplikasi sudah dioptimasi untuk:
- 📱 Mobile phones
- 💻 Tablets
- 🖥️ Desktop

## 🚀 Tips & Tricks

1. **Konsisten Tracking**: Biasakan langsung input setelah isi bensin
2. **Manfaatkan Lokasi**: Catat lokasi SPBU untuk tau mana yang sering dikunjungi
3. **Cek Analytics**: Review mingguan/bulanan untuk kontrol pengeluaran
4. **Custom Nominal**: Sesuaikan nominal dengan kebiasaan isi bensin kamu
5. **Undo Feature**: Jangan takut salah input, tinggal undo!

## 💡 Use Cases

- 🚗 **Pemilik Kendaraan Pribadi**: Track pengeluaran bensin personal
- 🚕 **Driver Online**: Monitor biaya operasional harian
- 🚚 **Fleet Manager**: Track multiple vehicles (buat entry terpisah per kendaraan)
- 📊 **Budget Conscious**: Analisis dan kontrol pengeluaran bensin bulanan
- 📈 **Data Enthusiast**: Lihat pola konsumsi bensin dari waktu ke waktu

## 🔮 Future Ideas

- [ ] Export data ke CSV/Excel
- [ ] Grafik visualisasi pengeluaran
- [ ] Reminder isi bensin
- [ ] Komparasi harga antar SPBU
- [ ] Multi-kendaraan tracking
- [ ] Fuel efficiency calculator (km/liter)

## 🤝 Contributing

Ada ide fitur baru atau nemu bug? Feel free to suggest!

## 📄 License

Free to use! 🎉

---

**Dibuat dengan ❤️ untuk para pengendara Indonesia**

*Happy tracking! ⛽🚗💨*
