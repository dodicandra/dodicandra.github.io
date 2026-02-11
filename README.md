# 🚀 Portfolio Website - GitHub Pages Deployment Guide

Portfolio website untuk Dodi Candra - Senior Mobile Developer

## 📋 Langkah-langkah Deploy ke GitHub Pages

### Step 1: Persiapan File

Pastikan Anda memiliki struktur folder seperti ini:
```
portfolio/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── profile.jpg (foto profil Anda)
└── README.md
```

### Step 2: Buat Repository di GitHub

1. Buka [GitHub](https://github.com)
2. Klik tombol **"New"** atau **"+"** di kanan atas → **"New repository"**
3. Isi detail repository:
   - Repository name: `portfolio` atau `username.github.io` (untuk custom domain)
   - Description: "My Personal Portfolio Website"
   - Pilih **Public**
   - ✅ Centang **"Add a README file"** (opsional)
4. Klik **"Create repository"**

### Step 3: Upload Files ke GitHub

**Opsi A: Via GitHub Web Interface (Mudah)**

1. Di halaman repository Anda, klik **"Add file"** → **"Upload files"**
2. Drag & drop semua file (index.html, style.css, script.js)
3. Buat folder `assets/`:
   - Klik **"Add file"** → **"Create new file"**
   - Ketik `assets/.gitkeep` (untuk membuat folder)
   - Klik **"Commit new file"**
   - Upload foto profil Anda ke folder `assets/`
4. Scroll ke bawah, tulis commit message: "Initial commit - Portfolio website"
5. Klik **"Commit changes"**

**Opsi B: Via Git Command Line (Recommended)**

```bash
# 1. Buka terminal/command prompt di folder portfolio Anda

# 2. Inisialisasi git (jika belum)
git init

# 3. Tambahkan semua file
git add .

# 4. Commit file
git commit -m "Initial commit - Portfolio website"

# 5. Tambahkan remote repository (ganti USERNAME dan REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# 6. Push ke GitHub
git branch -M main
git push -u origin main
```

### Step 4: Aktifkan GitHub Pages

1. Di repository GitHub Anda, klik tab **"Settings"**
2. Scroll ke bawah, klik **"Pages"** di menu sebelah kiri
3. Di bagian **"Source"**:
   - Branch: Pilih **`main`** (atau `master`)
   - Folder: Pilih **`/ (root)`**
4. Klik **"Save"**
5. Tunggu beberapa menit, website Anda akan tersedia di:
   - Format: `https://USERNAME.github.io/REPO_NAME/`
   - Contoh: `https://dodicaandra.github.io/portfolio/`

### Step 5: Verifikasi Website

1. Tunggu 2-5 menit untuk deployment selesai
2. Buka URL yang diberikan GitHub Pages
3. Website Anda sudah live! 🎉

---

## 🎨 Customisasi Website

### Mengganti Foto Profil

1. Siapkan foto Anda (format JPG/PNG, ukuran ideal: 400x400px)
2. Rename foto menjadi `profile.jpg`
3. Upload ke folder `assets/`

### Mengedit Konten

**Edit Projects:**
```html
<!-- Di index.html, cari section #projects -->
<div class="project-card">
    <div class="project-image">📱</div>
    <div class="project-content">
        <h3>Nama Project Anda</h3>
        <p>Deskripsi project...</p>
        <div class="project-tags">
            <span class="tag">React Native</span>
            <!-- Tambah tags lainnya -->
        </div>
        <div class="project-links">
            <a href="LINK_DEMO" target="_blank">View Demo →</a>
            <a href="LINK_GITHUB" target="_blank">GitHub →</a>
        </div>
    </div>
</div>
```

**Edit Contact Info:**
```html
<!-- Di index.html, cari section #contact -->
<div class="contact-item">
    <span>📧</span>
    <a href="mailto:EMAIL_ANDA">EMAIL_ANDA</a>
</div>
```

### Update Website

Setelah edit file, upload kembali:

**Via Web:**
1. Buka file di GitHub
2. Klik icon pensil (Edit)
3. Edit konten
4. Scroll ke bawah, klik **"Commit changes"**

**Via Git:**
```bash
git add .
git commit -m "Update: deskripsi perubahan"
git push origin main
```

---

## 🔧 Troubleshooting

### Website tidak muncul?
- Tunggu 5-10 menit setelah push
- Pastikan file bernama `index.html` (bukan `portfolio.html`)
- Cek di Settings → Pages apakah sudah aktif

### CSS/JS tidak load?
- Pastikan path file benar: `style.css` dan `script.js` (tanpa `/` di depan)
- Clear cache browser (Ctrl + Shift + R)

### Gambar tidak muncul?
- Pastikan folder `assets/` sudah dibuat
- Cek nama file foto: harus `profile.jpg`
- Jika tidak ada foto, akan otomatis gunakan placeholder

---

## 📱 Custom Domain (Opsional)

Jika ingin pakai domain sendiri (misal: dodicandra.com):

1. Beli domain di provider (Namecheap, GoDaddy, dll)
2. Di GitHub repository → Settings → Pages
3. Di bagian **"Custom domain"**, masukkan domain Anda
4. Klik **"Save"**
5. Di DNS provider, tambahkan CNAME record:
   ```
   Type: CNAME
   Name: www
   Value: USERNAME.github.io
   ```

---

## 📝 Checklist Deployment

- [ ] File index.html sudah di root folder
- [ ] File style.css dan script.js ada di folder yang sama
- [ ] Folder assets/ sudah dibuat
- [ ] Foto profile.jpg sudah diupload
- [ ] Semua file sudah di-commit dan push ke GitHub
- [ ] GitHub Pages sudah diaktifkan di Settings
- [ ] Website sudah ditest dan berjalan dengan baik

---

## 🎯 Next Steps

1. **Update Projects:** Ganti dummy projects dengan project asli Anda
2. **Add Analytics:** Tambahkan Google Analytics untuk tracking visitor
3. **SEO Optimization:** Update meta tags di `<head>`
4. **Add Blog:** Buat section blog untuk artikel (opsional)
5. **Portfolio Items:** Tambahkan screenshot atau video demo project

---

## 💡 Tips

- Commit perubahan secara berkala dengan pesan yang jelas
- Test website di berbagai device (mobile, tablet, desktop)
- Gunakan tools seperti Google PageSpeed Insights untuk optimasi
- Share link portfolio di LinkedIn dan CV Anda

---

## 📞 Support

Jika ada kendala, bisa hubungi:
- Email: dodicandra20@gmail.com
- GitHub Issues: [Create Issue](https://github.com/USERNAME/REPO_NAME/issues)
