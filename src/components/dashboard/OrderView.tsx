import { useState } from 'react';
import { Plus } from 'lucide-react';
import { orders, Order } from '@/data/mockData';
import { OrderForm } from './OrderForm';
import { cn } from '@/lib/utils';

export function OrderView() {
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE');
  };

  const handleRowClick = (order: Order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleNewOrder = () => {
    setEditingOrder(null);
    setShowForm(true);
  };

  const handleSubmit = (data: Partial<Order>) => {
    console.log('Order submitted:', data);
    // In real app, this would save to backend
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header with button */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Beställningar</h2>
        <button onClick={handleNewOrder} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Lägg ny beställning
        </button>
      </div>

      {/* Orders Table */}
      <div className="dashboard-card animate-fade-in">
        <h3 className="text-lg font-semibold mb-4">Aktiva beställningar</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll</th>
                <th>Valuta</th>
                <th>Startdatum</th>
                <th>Slutdatum</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => handleRowClick(order)}
                  className="cursor-pointer"
                >
                  <td className="font-medium">{order.role}</td>
                  <td>{order.currency}</td>
                  <td>{formatDate(order.startDate)}</td>
                  <td>{formatDate(order.endDate)}</td>
                  <td>
                    <span className={cn(
                      'status-badge',
                      order.status === 'active' && 'status-badge-active',
                      order.status === 'pending' && 'status-badge-pending',
                      order.status === 'completed' && 'bg-gray-100 text-gray-800',
                      order.status === 'cancelled' && 'bg-red-100 text-red-800'
                    )}>
                      {order.status === 'active' && 'Aktiv'}
                      {order.status === 'pending' && 'Väntande'}
                      {order.status === 'completed' && 'Avslutad'}
                      {order.status === 'cancelled' && 'Avbruten'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Form Modal */}
      {showForm && (
        <OrderForm
          order={editingOrder}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
