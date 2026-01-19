import { useState } from 'react';
import { Plus } from 'lucide-react';
import { orders, Order } from '@/data/mockData';
import { OrderForm } from '../OrderForm/OrderForm';
import styles from './OrderView.module.css';

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

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return styles.statusActive;
      case 'pending':
        return styles.statusPending;
      case 'completed':
        return styles.statusCompleted;
      case 'cancelled':
        return styles.statusCancelled;
      default:
        return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktiv';
      case 'pending':
        return 'Väntande';
      case 'completed':
        return 'Avslutad';
      case 'cancelled':
        return 'Avbruten';
      default:
        return status;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header with button */}
      <div className={styles.header}>
        <h2 className={styles.title}>Beställningar</h2>
        <button onClick={handleNewOrder} className={styles.addButton}>
          <Plus className={styles.addIcon} />
          Lägg ny beställning
        </button>
      </div>

      {/* Orders Table */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Aktiva beställningar</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
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
                <tr key={order.id} onClick={() => handleRowClick(order)}>
                  <td className={styles.fontMedium}>{order.role}</td>
                  <td>{order.currency}</td>
                  <td>{formatDate(order.startDate)}</td>
                  <td>{formatDate(order.endDate)}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                      {getStatusText(order.status)}
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
