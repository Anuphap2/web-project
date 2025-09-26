export default function Herosection() {
  return (
    <section className="w-full bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Our Website
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          We provide the best services to help you succeed.
        </p>
        <a
          href="#services"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Explore Services
        </a>
      </div>
    </section>
  );
}
