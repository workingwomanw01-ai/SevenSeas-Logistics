export default function LoadingSpinner({ inline = false, message = "Loading..." }) {
  if (inline) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <p className="mt-3 text-gray-600 text-sm">{message}</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        <p className="mt-4 text-gray-700">{message}</p>
      </div>
    </div>
  );
}
