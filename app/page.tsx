import Banner from '@/src/components/layout/Banner';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Banner />
      <div className="container mx-auto px-4 py-16">
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome to Vaulted
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of security, modern design, and beautiful user interface. 
            Built with the latest technologies and best practices.
          </p>
        </section>
      </div>
    </main>
  );
}
