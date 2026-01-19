import { contracts } from '@/data/mockData';
import styles from './ContractsTable.module.css';

export function ContractsTable() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE');
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return styles.statusActive;
      case 'expiring':
        return styles.statusWarning;
      case 'completed':
        return styles.statusCompleted;
      default:
        return '';
    }
  };

  const getStatusText = (contract: typeof contracts[0]) => {
    switch (contract.status) {
      case 'active':
        return 'Aktiv';
      case 'expiring':
        return `Löper ut om ${contract.daysUntilExpiry} dagar`;
      case 'completed':
        return 'Avslutad';
      default:
        return contract.status;
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Aktiva kontrakt</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Projektnr</th>
              <th>Roll</th>
              <th>Start</th>
              <th>Slut</th>
              <th>Arbetad tid</th>
              <th>Budget</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id}>
                <td className={styles.fontMedium}>{contract.projectNumber}</td>
                <td>{contract.role}</td>
                <td>{formatDate(contract.startDate)}</td>
                <td>{formatDate(contract.endDate)}</td>
                <td>{contract.workedHours} tim</td>
                <td>{formatCurrency(contract.budget)}</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusClass(contract.status)}`}>
                    {getStatusText(contract)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
