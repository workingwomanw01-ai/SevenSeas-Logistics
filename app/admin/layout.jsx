import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminRootLayout({ children }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}
