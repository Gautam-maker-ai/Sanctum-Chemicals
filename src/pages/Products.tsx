import { useEffect, useState } from 'react';
import { supabase, type Medicine, type Category } from '../lib/supabase';
import { Search } from 'lucide-react';
import { productImagesByName, fallbackImage } from '../data/productImages';

interface ProductsProps {
  onNavigate: (page: string, params?: any) => void;
}

export default function Products({ onNavigate }: ProductsProps) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [prescriptionFilter, setPrescriptionFilter] = useState('all');

  useEffect(() => {
    fetchCategories();
    fetchMedicines();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (data) setCategories(data);
  };

  const fetchMedicines = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('medicines')
      .select('*')
      .eq('active', true);

    if (data) setMedicines(data);
    setLoading(false);
  };

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || medicine.category_id === selectedCategory;

    const matchesPrescription =
      prescriptionFilter === 'all' ||
      (prescriptionFilter === 'rx' && medicine.prescription_required) ||
      (prescriptionFilter === 'otc' && !medicine.prescription_required);

    return matchesSearch && matchesCategory && matchesPrescription;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="w-screen bg-gradient-to-r from-blue-600 to-green-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Our Products</h1>
          <p className="text-blue-100">
            Browse quality pharmaceutical products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-8 grid md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <label className="block text-sm mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines..."
                className="w-full pl-10 py-2 border rounded-lg"
              />
            </div>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={prescriptionFilter}
            onChange={(e) => setPrescriptionFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All Types</option>
            <option value="otc">OTC</option>
            <option value="rx">Prescription</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setPrescriptionFilter('all');
            }}
            className="bg-gray-200 rounded-lg"
          >
            Clear
          </button>
        </div>

        {/* Products */}
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((medicine) => (
              <div
                key={medicine.id}
                onClick={() =>
                  onNavigate('product-detail', { medicine })
                }
                className="bg-white rounded-lg shadow hover:shadow-lg cursor-pointer"
              >
                <img
                  src={productImagesByName[medicine.name] || fallbackImage}
                  alt={medicine.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />

                <div className="p-5">
                  <h3 className="font-semibold text-lg">{medicine.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {medicine.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-blue-600 font-bold text-xl">
                      ${medicine.price}
                    </span>

                    {medicine.prescription_required && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                        Rx
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('product-detail', { medicine });
                    }}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
 }
