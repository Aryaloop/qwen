import { useState, useEffect } from 'react';
import api from '../../utils/api';
import Chart from '../UI/Chart';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_buku: 0,
    total_kategori: 0,
    total_stok: 0,
    buku_per_kategori: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Buku</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.total_buku}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Kategori</h3>
          <p className="text-3xl font-bold text-green-600">{stats.total_kategori}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Stok</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.total_stok}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Buku per Kategori</h3>
        <Chart data={stats.buku_per_kategori} />
      </div>
    </div>
  );
};

export default Dashboard;