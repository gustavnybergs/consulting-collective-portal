import { DashboardLayout } from '@/components/layout/DashboardLayout/DashboardLayout';
import { consultants } from '@/data/mockData';
import { User } from 'lucide-react';
import styles from './Consultants.module.css';

export default function Consultants() {
  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Konsulter i leverans</h1>
        
        <div className={styles.card}>
          <div className={styles.grid}>
            {consultants.map((consultant) => (
              <div key={consultant.id} className={styles.consultantCard}>
                <div className={styles.consultantHeader}>
                  <div className={styles.avatar}>
                    <User className={styles.avatarIcon} />
                  </div>
                  <div>
                    <h3 className={styles.consultantName}>{consultant.name}</h3>
                    <p className={styles.consultantRole}>{consultant.role}</p>
                  </div>
                </div>
                <div className={styles.utilization}>
                  <span className={styles.utilizationLabel}>Beläggning</span>
                  <span className={`${styles.utilizationValue} ${consultant.utilization >= 100 ? styles.full : ''}`}>
                    {consultant.utilization}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
