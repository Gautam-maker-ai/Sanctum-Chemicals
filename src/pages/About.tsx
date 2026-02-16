import { Target, Users, Award, Heart } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide accessible, high-quality pharmaceutical products and healthcare solutions to communities worldwide.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our certified pharmacists and healthcare professionals are dedicated to your wellbeing.'
    },
    {
      icon: Award,
      title: 'Quality Standards',
      description: 'We maintain the highest standards of quality control and regulatory compliance.'
    },
    {
      icon: Heart,
      title: 'Patient Care',
      description: 'Your health and satisfaction are at the heart of everything we do.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="w-screen bg-gradient-to-r from-blue-50 to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Sanctum Chemicals
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading pharmaceutical supplier committed to delivering quality healthcare solutions
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Trusted Healthcare Partner Since 2010
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Sanctum Chemicals has been at the forefront of pharmaceutical distribution for over a decade. We specialize in providing high-quality medications, medical supplies, and healthcare products to individuals and healthcare facilities.
                </p>
                <p>
                  Our commitment to excellence is reflected in our rigorous quality control processes, comprehensive product selection, and dedicated customer service. We work directly with leading pharmaceutical manufacturers to ensure authenticity and reliability.
                </p>
                <p>
                  With a team of licensed pharmacists and healthcare professionals, we provide expert guidance to help you make informed decisions about your health and medication needs.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-8">
              <img
                src="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg"
                alt="Pharmacy"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide our commitment to excellence in pharmaceutical care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <value.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Sanctum Chemicals?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-blue-100">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Quality Products</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Certifications & Compliance
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              Sanctum Chemicals is fully licensed and certified by all relevant pharmaceutical regulatory bodies. We adhere to strict quality standards including Good Distribution Practices (GDP) and maintain comprehensive documentation for all our products.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-white px-6 py-3 rounded-lg shadow text-gray-700 font-semibold">FDA Approved</span>
              <span className="bg-white px-6 py-3 rounded-lg shadow text-gray-700 font-semibold">ISO Certified</span>
              <span className="bg-white px-6 py-3 rounded-lg shadow text-gray-700 font-semibold">GDP Compliant</span>
              <span className="bg-white px-6 py-3 rounded-lg shadow text-gray-700 font-semibold">Licensed Pharmacists</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
