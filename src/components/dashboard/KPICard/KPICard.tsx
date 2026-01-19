import { ReactNode } from 'react';
import styles from './KPICard.module.css';

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  highlight?: boolean;
}

export function KPICard({ title, value, icon, children, className, highlight }: KPICardProps) {
  return (
    <div className={`${styles.card} ${highlight ? styles.cardHighlight : ''} ${className || ''}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      <div className={styles.value}>{value}</div>
      {children && (
        <div className={styles.children}>
          {children}
        </div>
      )}
    </div>
  );
}
