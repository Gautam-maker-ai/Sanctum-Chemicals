import { useEffect, useState } from 'react';
import { supabase,type Medicine,type Profile,type Order,type Category } from '../lib/supabase';
import { Pill, Users, ShoppingBag, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import ProtectedRoute from '../components/ProtectedRoute';

type TabType = 'medicines' | 'users' | 'orders';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<TabType>('medicines');
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [medicineForm, setMedicineForm] = useState({
    name: '',
    slug: '',
    description: '',
    category_id: '',
    price: 0,
    stock: 0,
    image_url: '',
    manufacturer: '',
    dosage: '',
    prescription_required: false,
    active: true
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === 'medicines') {
      await Promise.all([fetchMedicines(), fetchCategories()]);
    } else if (activeTab === 'users') {
      await fetchUsers();
    } else if (activeTab === 'orders') {
      await fetchOrders();
    }
    setLoading(false);
  };

  const fetchMedicines = async () => {
    const { data } = await supabase
      .from('medicines')
      .select('*, categories(*)')
      .order('created_at', { ascending: false });
    if (data) setMedicines(data);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('name');
    if (data) setCategories(data);
  };

  const fetchUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setUsers(data);
  };

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setOrders(data);
  };

  const handleSaveMedicine = async () => {
    const medicineData = {
      ...medicineForm,
      slug: medicineForm.name.toLowerCase().replace(/\s+/g, '-'),
      price: parseFloat(medicineForm.price.toString()),
      stock: parseInt(medicineForm.stock.toString())
    };

    if (editingMedicine) {
      const { error } = await supabase
        .from('medicines')
        .update(medicineData)
        .eq('id', editingMedicine.id);

      if (!error) {
        await fetchMedicines();
        resetMedicineForm();
      } else {
        alert('Failed to update medicine');
      }
    } else {
      const { error } = await supabase
        .from('medicines')
        .insert([medicineData]);

      if (!error) {
        await fetchMedicines();
        resetMedicineForm();
      } else {
        alert('Failed to add medicine');
      }
    }
  };

  const handleDeleteMedicine = async (id: string) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      const { error } = await supabase
        .from('medicines')
        .delete()
        .eq('id', id);

      if (!error) {
        await fetchMedicines();
      } else {
        alert('Failed to delete medicine');
      }
    }
  };

  const handleEditMedicine = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setMedicineForm({
      name: medicine.name,
      slug: medicine.slug,
      description: medicine.description || '',
      category_id: medicine.category_id || '',
      price: medicine.price,
      stock: medicine.stock,
      image_url: medicine.image_url || '',
      manufacturer: medicine.manufacturer || '',
      dosage: medicine.dosage || '',
      prescription_required: medicine.prescription_required,
      active: medicine.active
    });
    setShowMedicineForm(true);
  };

  const resetMedicineForm = () => {
    setShowMedicineForm(false);
    setEditingMedicine(null);
    setMedicineForm({
      name: '',
      slug: '',
      description: '',
      category_id: '',
      price: 0,
      stock: 0,
      image_url: '',
      manufacturer: '',
      dosage: '',
      prescription_required: false,
      active: true
    });
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (!error) {
      await fetchOrders();
    } else {
      alert('Failed to update order status');
    }
  };

  const tabs = [
    { id: 'medicines' as TabType, name: 'Medicines', icon: Pill },
    { id: 'users' as TabType, name: 'Users', icon: Users },
    { id: 'orders' as TabType, name: 'Orders', icon: ShoppingBag }
  ];

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Admin Panel
            </h1>
            <p className="text-blue-100">
              Manage medicines, users, and orders
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="border-b border-gray-200">
              <div className="flex space-x-1 p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'medicines' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Medicine Management
                    </h2>
                    <button
                      onClick={() => setShowMedicineForm(true)}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add Medicine</span>
                    </button>
                  </div>

                  {showMedicineForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-gray-900">
                            {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
                          </h3>
                          <button onClick={resetMedicineForm} className="text-gray-400 hover:text-gray-600">
                            <X className="w-6 h-6" />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name *
                              </label>
                              <input
                                type="text"
                                value={medicineForm.name}
                                onChange={(e) => setMedicineForm({ ...medicineForm, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category *
                              </label>
                              <select
                                value={medicineForm.category_id}
                                onChange={(e) => setMedicineForm({ ...medicineForm, category_id: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              rows={3}
                              value={medicineForm.description}
                              onChange={(e) => setMedicineForm({ ...medicineForm, description: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price *
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                value={medicineForm.price}
                                onChange={(e) => setMedicineForm({ ...medicineForm, price: parseFloat(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Stock *
                              </label>
                              <input
                                type="number"
                                value={medicineForm.stock}
                                onChange={(e) => setMedicineForm({ ...medicineForm, stock: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Manufacturer
                              </label>
                              <input
                                type="text"
                                value={medicineForm.manufacturer}
                                onChange={(e) => setMedicineForm({ ...medicineForm, manufacturer: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Dosage
                              </label>
                              <input
                                type="text"
                                value={medicineForm.dosage}
                                onChange={(e) => setMedicineForm({ ...medicineForm, dosage: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Image URL
                            </label>
                            <input
                              type="text"
                              value={medicineForm.image_url}
                              onChange={(e) => setMedicineForm({ ...medicineForm, image_url: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div className="flex items-center space-x-6">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={medicineForm.prescription_required}
                                onChange={(e) => setMedicineForm({ ...medicineForm, prescription_required: e.target.checked })}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="text-sm text-gray-700">Prescription Required</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={medicineForm.active}
                                onChange={(e) => setMedicineForm({ ...medicineForm, active: e.target.checked })}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="text-sm text-gray-700">Active</span>
                            </label>
                          </div>

                          <div className="flex space-x-3 pt-4">
                            <button
                              onClick={handleSaveMedicine}
                              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                            >
                              <Save className="w-5 h-5" />
                              <span>{editingMedicine ? 'Update' : 'Save'}</span>
                            </button>
                            <button
                              onClick={resetMedicineForm}
                              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {medicines.map((medicine) => (
                            <tr key={medicine.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm text-gray-900">{medicine.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{medicine.categories?.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">${medicine.price}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{medicine.stock}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 text-xs rounded-full ${medicine.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {medicine.active ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleEditMedicine(medicine)}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMedicine(medicine.id)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'users' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    User Management
                  </h2>
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm text-gray-900">{user.full_name || 'N/A'}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{user.email}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{user.phone || 'N/A'}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {new Date(user.created_at).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Order Management
                  </h2>
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm text-gray-900 font-mono">
                                {order.id.slice(0, 8)}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 font-semibold">
                                ${order.total_amount.toFixed(2)}
                              </td>
                              <td className="px-4 py-3">
                                <select
                                  value={order.status}
                                  onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                  className="text-sm border border-gray-300 rounded px-2 py-1"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="processing">Processing</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {new Date(order.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <button className="text-blue-600 hover:text-blue-800">
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
