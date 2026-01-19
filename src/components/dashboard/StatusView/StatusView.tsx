import { FileText, Users, AlertTriangle, ShoppingCart } from 'lucide-react';
import { KPICard } from '../KPICard/KPICard';
import { ContractsTable } from '../ContractsTable/ContractsTable';
import { kpiData, contracts, consultants } from '@/data/mockData';
import styles from './StatusView.module.css';

export function StatusView() {
  const expiringContracts = contracts.filter(c => c.status === 'expiring');
  const activeConsultants = consultants.filter(c => c.status === 'active');

  return (
    <div className={styles.container}>
      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        <KPICard
          title="Antal kontrakt"
          value={kpiData.totalContracts}
          icon={<FileText style={{ width: '1.25rem', height: '1.25rem' }} />}
        />
        <KPICard
          title="Konsulter i leverans"
          value={activeConsultants.length}
          icon={<Users style={{ width: '1.25rem', height: '1.25rem' }} />}
        >
          <ul className={styles.consultantList}>
            {activeConsultants.map((consultant) => (
              <li key={consultant.id} className={styles.consultantItem}>
                <span className={styles.consultantName}>{consultant.name}</span>
                <span className={styles.consultantUtilization}>{consultant.utilization}%</span>
              </li>
            ))}
          </ul>
        </KPICard>
        <KPICard
          title="Kräver hantering"
          value={expiringContracts.length}
          icon={<AlertTriangle style={{ width: '1.25rem', height: '1.25rem' }} />}
          highlight
        >
          <ul className={styles.consultantList}>
            {expiringContracts.map((contract) => (
              <li key={contract.id} className={styles.contractItem}>
                <span className={styles.contractRole}>{contract.role}</span>
                <span className={styles.contractDays}>
                  {contract.daysUntilExpiry} dagar
                </span>
              </li>
            ))}
          </ul>
        </KPICard>
        <KPICard
          title="Antal beställningar"
          value={kpiData.totalOrders}
          icon={<ShoppingCart style={{ width: '1.25rem', height: '1.25rem' }} />}
        />
      </div>

      {/* Contracts Table */}
      <ContractsTable />
    </div>
  );
}
