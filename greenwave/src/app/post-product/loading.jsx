export default function Loading() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-12 w-12"></div>
        <h1 className="ml-4">Loading...</h1>
      </div>
    );
  }
  