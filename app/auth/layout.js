export const metadata = {
  title: 'Medlitik - Autentikasi',
  description: 'Masuk atau daftar ke platform kesehatan digital terdepan',
}

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      {children}
    </div>
  )
}
