import { ArrowLeft, Package } from 'lucide-react';
import { type Medicine } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { productImagesByName, fallbackImage } from '../data/productImages';

interface ProductDetailProps {
  medicine: Medicine;
  onNavigate: (page: string, params?: any) => void;
}

export default function ProductDetail({ medicine, onNavigate }: ProductDetailProps) {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);

  if (!medicine) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Product Not Found</h2>
      </div>
    );
  }

  const total = medicine.price * quantity;

  const handleAddToCart = () => {
    if (!user) {
      alert('Please login first');
      return;
    }

    alert(`${medicine.name} (${quantity}) added to cart`);
  };

  const handleBuyNow = () => {
    if (!user) {
      alert('Please login first');
      return;
    }

    alert(`Proceeding to buy ${quantity} item(s)`);
  };

  return (
    <div className="w-screen bg-gray-100 min-h-screen p-6">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('products')}
        className="flex items-center gap-2 mb-6 text-gray-700 hover:text-black"
      >
        <ArrowLeft size={18} />
        Back to Products
      </button>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8 grid md:grid-cols-2 gap-8">

        {/* ✅ SAME IMAGE AS PRODUCTS PAGE */}
        <img
          src={productImagesByName[medicine.name] || fallbackImage}
          alt={medicine.name}
          className="w-full rounded-lg object-cover"
        />

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-3">
            {medicine.name}
          </h1>

          <p className="text-gray-600 mb-4">
            {medicine.description}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <Package size={18} />
            <span className="font-medium">
              {medicine.stock > 0
                ? `${medicine.stock} in stock`
                : 'Out of stock'}
            </span>
          </div>

          <div className="text-3xl font-bold text-blue-600 mb-6">
            ${medicine.price}
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Quantity</label>
            <input
              type="number"
              min="1"
              max={medicine.stock}
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.max(1, Math.min(medicine.stock, Number(e.target.value)))
                )
              }
              className="w-24 border px-3 py-2 rounded"
            />
          </div>

          {/* Total */}
          <div className="text-xl font-semibold mb-6">
            Total: ${total}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={medicine.stock === 0}
              className="flex-1 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 disabled:bg-gray-400"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={medicine.stock === 0}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}