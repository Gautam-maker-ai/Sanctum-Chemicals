import { ArrowRight, ShieldCheck, Truck, Headphones, Award } from 'lucide-react';
import { featuredProducts } from '../data/featuredProducts';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Quality Assured',
      description: 'All products are verified and certified',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping nationwide',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Expert pharmaceutical assistance anytime',
    },
    {
      icon: Award,
      title: 'Licensed & Certified',
      description: 'Fully accredited pharmaceutical supplier',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="w-screen bg-gradient-to-r from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Health, Our Priority
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Trusted pharmaceutical solutions delivered with care. Browse our
              extensive catalog of quality medicines and healthcare products.
            </p>
            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              <span>Shop Products</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS (MANUAL) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600">
              Explore our most popular and trusted pharmaceutical products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>

                    {product.prescription_required && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                        Rx Required
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      ${product.price}
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate('products')}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Finding the Right Medication?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Our pharmaceutical experts are here to assist you
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}