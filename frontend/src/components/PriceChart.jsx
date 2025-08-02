// frontend/src/components/PriceChart.jsx
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const PriceChart = ({ priceHistory }) => {
  const [chartType, setChartType] = useState('line');

  // Veriyi grafik için hazırla
  const chartData = priceHistory.map(item => ({
    date: format(new Date(item.date), 'dd MMM', { locale: tr }),
    fullDate: format(new Date(item.date), 'dd MMMM yyyy', { locale: tr }),
    price: item.price,
    store: item.store
  }));

  // Özel tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{payload[0].payload.fullDate}</p>
          <p className="text-primary-600">₺{payload[0].value}</p>
          <p className="text-sm text-gray-500">{payload[0].payload.store}</p>
        </div>
      );
    }
    return null;
  };

  // Min ve max fiyatları bul
  const prices = priceHistory.map(h => h.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Fiyat Geçmişi</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded ${
              chartType === 'line' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Çizgi
          </button>
          <button
            onClick={() => setChartType('area')}
            className={`px-3 py-1 rounded ${
              chartType === 'area' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Alan
          </button>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600">En Düşük</p>
          <p className="text-xl font-bold text-green-700">₺{minPrice}</p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">Ortalama</p>
          <p className="text-xl font-bold text-blue-700">₺{avgPrice.toFixed(2)}</p>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <p className="text-sm text-red-600">En Yüksek</p>
          <p className="text-xl font-bold text-red-700">₺{maxPrice}</p>
        </div>
      </div>

      {/* Grafik */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#dc2626"
                strokeWidth={2}
                dot={{ fill: '#dc2626', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          ) : (
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#dc2626"
                fill="#dc2626"
                fillOpacity={0.3}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Trend Analizi */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Fiyat Trendi</h4>
        <p className="text-sm text-gray-600">
          Son 30 günde fiyat {((maxPrice - minPrice) / minPrice * 100).toFixed(1)}% değişim gösterdi.
          {prices[prices.length - 1] > prices[0] ? (
            <span className="text-red-600 ml-1">Fiyat yükseliş trendinde.</span>
          ) : (
            <span className="text-green-600 ml-1">Fiyat düşüş trendinde.</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default PriceChart;