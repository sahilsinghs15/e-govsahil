export default function Department() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Page Header */}
      <header className="w-full bg-orange-600 p-6 text-center">
        <h1 className="text-4xl font-extrabold capitalize tracking-tighter md:text-5xl">
          Department
        </h1>
        <p className="mt-2 text-lg md:text-xl">
          Discover our specialized departments and their unique offerings
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl px-6 py-10">
        {/* Department Overview Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-orange-600 pb-2">
            Overview
          </h2>
          <p className="text-gray-400">
            Our college hosts various departments that excel in delivering quality education and research. Each department focuses on providing specialized knowledge and hands-on experience to empower students.
          </p>
        </section>

        {/* Departments List Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-orange-600 pb-2">
            Departments List
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Information Technology</h3>
              <p className="mt-2 text-sm text-gray-400">
                <ul>
                  <li>Focuses on the practical applications of computers and software to solve business problems.</li>
                  <li>Deals with the infrastructure, management, and security of computer systems and networks.</li>
                  <li>Covers areas like networking, cybersecurity, database administration, and systems administration.</li>
                </ul>
              </p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Computer Science</h3>
              <p className="mt-2 text-sm text-gray-400">
                <ul>
                  <li>Explores the theoretical foundations of computing and the design of efficient algorithms and data structures.</li>
                  <li>Deals with the mathematical and logical principles that underlie computer systems and software.</li>
                  <li>Covers areas like programming languages, artificial intelligence, computer graphics, and software engineering.</li>
                </ul>
              </p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Data Science</h3>
              <p className="mt-2 text-sm text-gray-400">
                <ul>
                  <li>Uses scientific methods, algorithms, and systems to extract knowledge and insights from structured and unstructured data.</li>
                  <li>involves collecting, cleaning, analyzing, and visualizing data to make informed decisions.</li>
                  <li>Covers areas like machine learning, statistics, data mining, and big data analytics.</li>
                </ul>
              </p>
            </div>
          </div>
        </section>

        {/* Faculty Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-orange-600 pb-2">
            Faculty
          </h2>
          <p className="text-gray-400">
            Our faculty members are experienced professionals and researchers who guide students toward achieving their academic and professional goals.
          </p>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-orange-600 pb-2">
            Contact the Department
          </h2>
          <p className="text-gray-400 mb-6">
            If you have any queries about a specific department, feel free to reach out via email or phone. We are here to assist you.
          </p>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Email</h3>
              <p className="mt-2 text-sm text-gray-400">department@college.edu</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md mt-4 md:mt-0">
              <h3 className="text-xl font-bold">Phone</h3>
              <p className="mt-2 text-sm text-gray-400">+1-234-567-890</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-orange-600 p-4 text-center mt-auto">
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} [College Name]. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
