# Medlitik - Platform Kesehatan Digital

Medlitik adalah platform kesehatan digital terpadu yang menghubungkan pasien dengan dokter spesialis terbaik. Platform ini menyediakan layanan konsultasi online, perjanjian dokter, dan berbagai informasi kesehatan untuk meningkatkan akses masyarakat terhadap layanan kesehatan berkualitas di Indonesia.

![Medlitik Logo](https://placeholder.pics/svg/300x100/3570ff/FFFFFF/Medlitik)

## Fitur Utama

- **Konsultasi Online**: Konsultasi dengan dokter spesialis secara virtual kapan saja dan di mana saja
- **Direktori Dokter**: Temukan dokter spesialis terbaik sesuai kebutuhan Anda
- **Manajemen Profil**: Kelola profil kesehatan dan riwayat medis Anda
- **Artikel Kesehatan**: Akses informasi kesehatan terpercaya dan terkini
- **Manajemen Admin**: Dashboard admin untuk pengelolaan layanan platform

## Teknologi yang Digunakan

- **Frontend**: Next.js, React, Framer Motion
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## Struktur Aplikasi

- **Landing Page**: Halaman utama, menu dokter, tentang, dan kontak
- **User Dashboard**: Dasbor pengguna untuk mengelola konsultasi dan profil kesehatan
- **Doctor Dashboard**: Dasbor dokter untuk mengelola jadwal dan konsultasi
- **Admin Panel**: Panel admin untuk pengelolaan pengguna, dokter, dan konsultasi

## Memulai Pengembangan

### Prasyarat

- Node.js (versi 16.x atau lebih baru)
- npm atau yarn
- PostgreSQL

### Instalasi

1. Clone repositori:

```bash
git clone https://github.com/afinmh/Medlitik-frontier.git
cd Medlitik-frontier
```

2. Instal dependensi:

```bash
npm install
# atau
yarn install
```

3. Setup database:

```bash
npm run setup-db
# atau
yarn setup-db
```

4. Jalankan server pengembangan:

```bash
npm run dev
# atau
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

## Struktur Database

Database PostgreSQL digunakan dengan tabel-tabel berikut:
- Users
- Doctors
- Specializations
- Consultations
- Messages

Detail lebih lanjut dapat dilihat di [DATABASE_SETUP_GUIDE.md](./DATABASE_SETUP_GUIDE.md).

## Kontributor

- [Nama Kontributor 1] - Role
- [Nama Kontributor 2] - Role
- [Nama Kontributor 3] - Role

## Deployment

Medlitik dapat di-deploy ke berbagai platform hosting. Kami merekomendasikan menggunakan Vercel untuk kemudahan dan integrasi yang baik dengan Next.js.

```bash
npm run build
# atau
yarn build
```

Untuk informasi lebih detail tentang deployment, lihat [dokumentasi deployment Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

## Lisensi

[MIT](LICENSE)
