export const metadata = {
  title: 'Medlitik Admin - Dashboard',
  description: 'Admin dashboard untuk mengelola platform kesehatan digital Medlitik',
}

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  )
}
