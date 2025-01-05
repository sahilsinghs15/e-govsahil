export default function Programs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Page Header */}
      <header className="w-full bg-green-800 p-6 text-center">
        <h1 className="text-4xl font-extrabold capitalize tracking-tighter md:text-5xl">
          Programs
        </h1>
        <p className="mt-2 text-lg md:text-xl">
          Explore our diverse academic programs tailored for your success
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl px-6 py-10">
        {/* Program Highlights Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-green-500 pb-2">
            Program Highlights
          </h2>
          <p className="text-gray-400">
            Our programs are designed to provide a blend of theoretical knowledge and practical skills to help students excel in their chosen fields.
          </p>
        </section>

        {/* Programs Offered Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-green-500 pb-2">
            Programs Offered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Bachelor of Science in Computer Science</h3>
              <p className="mt-2 text-sm text-gray-400">
                Dive into the world of algorithms, programming, and data analysis.
              </p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Bachelor of Science in Information Technology</h3>
              <p className="mt-2 text-sm text-gray-400">
                Focuses on the practical applications of computers and software to solve business problems.
              </p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Bachelor of Science in Data Science</h3>
              <p className="mt-2 text-sm text-gray-400">
                Uses scientific methods, algorithms, and systems to extract knowledge and insights from structured and unstructured data.
              </p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Masters Programs</h3>
              <p className="mt-2 text-sm text-gray-400">
                Master advanced concepts and techniques in your field of study.
              </p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">PhD Programs</h3>
              <p className="mt-2 text-sm text-gray-400">
                Engage in advanced research to contribute to academic and practical knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* Admission Process Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-green-500 pb-2">
            Admission Process
          </h2>
          <p className="text-gray-400 mb-6">
            Learn about the admission criteria, deadlines, and how to apply for your desired program.
          </p>
          <a
            href="/admissions"
            className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            View Admission Details
          </a>
        </section>

        {/* Testimonials Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-green-500 pb-2">
            Testimonials
          </h2>
          <p className="text-gray-400">
            Hear from our alumni about how our programs shaped their careers and lives.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-green-800 p-4 text-center mt-auto">
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} [College Name]. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
