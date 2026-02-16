import { useEffect, useState } from 'react';
import { supabase,type Medicine,type Category } from '../lib/supabase';
import { Search } from 'lucide-react';

interface ProductsProps {
  onNavigate: (page: string, params?: any) => void;
}

export default function Products({ onNavigate }: ProductsProps) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [prescriptionFilter, setPrescriptionFilter] = useState<string>('all');

  useEffect(() => {
    fetchCategories();
    fetchMedicines();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (data) {
      setCategories(data);
    }
  };

  const fetchMedicines = async () => {
    setLoading(true);
    let query = supabase
      .from('medicines')
      .select('*, categories(*)')
      .eq('active', true);

    const { data } = await query;

    if (data) {
      setMedicines(data);
    }
    setLoading(false);
  };

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || medicine.category_id === selectedCategory;

    const matchesPrescription = prescriptionFilter === 'all' ||
      (prescriptionFilter === 'rx' && medicine.prescription_required) ||
      (prescriptionFilter === 'otc' && !medicine.prescription_required);

    return matchesSearch && matchesCategory && matchesPrescription;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-screen bg-gradient-to-r from-blue-600 to-green-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="text-blue-100 text-lg">
            Browse our comprehensive catalog of quality pharmaceutical products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, description, or manufacturer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prescription Type
              </label>
              <select
                value={prescriptionFilter}
                onChange={(e) => setPrescriptionFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="otc">Over-the-Counter</option>
                <option value="rx">Prescription Required</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setPrescriptionFilter('all');
                }}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredMedicines.length}</span> products
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : filteredMedicines.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((medicine) => (
              <div
                key={medicine.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                onClick={() => onNavigate('product-detail', { slug: medicine.slug })}
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={medicine.image_url || 'https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg'}
                    alt={medicine.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {medicine.name}
                    </h3>
                    {medicine.prescription_required && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded whitespace-nowrap ml-2">
                        Rx
                      </span>
                    )}
                  </div>
                  {medicine.manufacturer && (
                    <p className="text-sm text-gray-500 mb-2">{medicine.manufacturer}</p>
                  )}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {medicine.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      ${medicine.price}
                    </span>
                    <span className={`text-sm ${medicine.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {medicine.stock > 0 ? `${medicine.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('product-detail', { slug: medicine.slug });
                    }}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
