import YourApplicationPage from "@/components/AdmissionCard";

export default function Student() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 text-white flex items-center justify-center">
      <div className="w-full max-w-2xl p-4 bg-white shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">
            Your Application Details
          </h1>
          <p className="text-base text-gray-600">
            Review your application information and status below.
          </p>
        </div>

        <div className="border-t border-gray-300 my-3"></div>

        {/* Main Application Details Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-3 rounded-lg shadow-md">
          <YourApplicationPage />
        </div>

        {/* Additional Information Section */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Important Notes
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Ensure all your documents are submitted before the deadline.</li>
            <li>Track your application regularly for updates.</li>
            <li>Contact the admissions office for any queries or assistance.</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300">
            Download Application PDF
          </button>
        </div>
      </div>
    </div>
  );
}
