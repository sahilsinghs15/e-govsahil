export default function Academics() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Page Header */}
      <header className="w-full bg-blue-800 p-6 text-center">
        <h1 className="text-4xl font-extrabold capitalize tracking-tighter md:text-5xl">
          Academics
        </h1>
        <p className="mt-2 text-lg md:text-xl">
          Explore our departments, programs, and academic resources
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl px-6 py-10">
        {/* Departments Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">
            Departments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Information Technology</h3>
              <p className="mt-2 text-sm text-gray-400">
                How to use computers and technology effectively.
              </p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Computer Science</h3>
              <p className="mt-2 text-sm text-gray-400">
                The underlying science of how computers work.
              </p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Data Science</h3>
              <p className="mt-2 text-sm text-gray-400">
                How to extract meaning from data.
              </p>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">
            Programs Offered
          </h2>
          <ul className="list-disc list-inside text-gray-400">
            <li>Bachelor of Science (B.Sc)</li>
            <li>Master of Technology (M.Tech)</li>
            <li>Doctoral Programs (Ph.D.)</li>
          </ul>
        </section>

        {/* Resources Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">
            Academic Resources
          </h2>
          <p className="text-gray-400 mb-6">
            Access our library, research labs, and online learning platforms to excel in your academics.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Library</h3>
              <p className="mt-2 text-sm text-gray-400">
                Explore a vast collection of books, journals, and e-resources.
              </p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Research Labs</h3>
              <p className="mt-2 text-sm text-gray-400">
                State-of-the-art facilities for innovative research and development.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-blue-800 p-4 text-center mt-auto">
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} [College Name]. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
