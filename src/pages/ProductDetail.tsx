import { useEffect, useState } from 'react';
import { supabase,type  Medicine } from '../lib/supabase';
import { ArrowLeft, ShoppingCart, AlertCircle, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProductDetailProps {
  slug: string;
  onNavigate: (page: string, params?: any) => void;
}

export default function ProductDetail({ slug, onNavigate }: ProductDetailProps) {
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    fetchMedicine();
  }, [slug]);

  const fetchMedicine = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('medicines')
      .select('*, categories(*)')
      .eq('slug', slug)
      .eq('active', true)
      .maybeSingle();

    if (data) {
      setMedicine(data);
    }
    setLoading(false);
  };

  const handleOrderClick = () => {
    if (!user) {
      alert('Please sign in to place an order');
      return;
    }
    alert(`Order functionality will be implemented. Quantity: ${orderQuantity}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => onNavigate('products')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('products')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <img
                src={medicine.image_url || 'https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg'}
                alt={medicine.name}
                className="w-full rounded-lg shadow-md"
              />
            </div>

            <div>
              <div className="mb-4">
                {medicine.prescription_required && (
                  <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded text-sm font-semibold mb-2">
                    Prescription Required
                  </span>
                )}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {medicine.name}
                </h1>
                {medicine.manufacturer && (
                  <p className="text-gray-600">by {medicine.manufacturer}</p>
                )}
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">
                  ${medicine.price}
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600">{medicine.description}</p>
              </div>

              {medicine.dosage && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Dosage</h2>
                  <p className="text-gray-600">{medicine.dosage}</p>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Package className="w-5 h-5 text-gray-600" />
                  <span className={`font-semibold ${medicine.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {medicine.stock > 0 ? `${medicine.stock} units in stock` : 'Out of stock'}
                  </span>
                </div>

                {medicine.stock > 0 && (
                  <div className="flex items-center space-x-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={medicine.stock}
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(Math.max(1, Math.min(medicine.stock, parseInt(e.target.value) || 1)))}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        &nbsp;
                      </label>
                      <button
                        onClick={handleOrderClick}
                        className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Place Order</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {medicine.prescription_required && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-orange-800">
                    <p className="font-semibold mb-1">Prescription Required</p>
                    <p>
                      This medication requires a valid prescription. You will need to provide prescription details during checkout or upload a prescription document.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 p-8 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Important Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Storage Instructions</h3>
                <p>Store in a cool, dry place away from direct sunlight. Keep out of reach of children.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Side Effects</h3>
                <p>Consult your healthcare provider if you experience any adverse effects. Read the patient information leaflet carefully.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Warnings</h3>
                <p>Do not exceed the recommended dosage. Consult your doctor before use if pregnant or breastfeeding.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Returns Policy</h3>
                <p>Due to safety regulations, we cannot accept returns on pharmaceutical products once delivered.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
