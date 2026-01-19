import { DashboardLayout } from '@/components/layout/DashboardLayout/DashboardLayout';
import { assignments } from '@/data/mockData';
import styles from './Assignments.module.css';

export default function Assignments() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return styles.statusActive;
      case 'completed':
        return styles.statusCompleted;
      case 'planned':
        return styles.statusPending;
      default:
        return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktiv';
      case 'completed':
        return 'Avslutad';
      case 'planned':
        return 'Planerad';
      default:
        return status;
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Uppdrag</h1>
        
        <div className={styles.card}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Projektnr</th>
                  <th>Kund</th>
                  <th>Start</th>
                  <th>Slut</th>
                  <th>Budget</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td className={styles.fontMedium}>{assignment.projectNumber}</td>
                    <td>{assignment.client}</td>
                    <td>{formatDate(assignment.startDate)}</td>
                    <td>{formatDate(assignment.endDate)}</td>
                    <td>{formatCurrency(assignment.budget)}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusClass(assignment.status)}`}>
                        {getStatusText(assignment.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
