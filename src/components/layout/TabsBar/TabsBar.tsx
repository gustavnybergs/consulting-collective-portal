import { currentUser } from '@/data/mockData';
import styles from './TabsBar.module.css';

interface TabsBarProps {
  activeTab: 'status' | 'order' | 'export';
  onTabChange: (tab: 'status' | 'order' | 'export') => void;
}

const tabs = [
  { id: 'status' as const, label: 'Status' },
  { id: 'order' as const, label: 'Beställ' },
  { id: 'export' as const, label: 'Exportera' },
];

export function TabsBar({ activeTab, onTabChange }: TabsBarProps) {
  return (
    <div className={styles.tabsBar}>
      {/* Tabs */}
      <div className={styles.tabsList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : styles.tabButtonInactive}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className={styles.description}>
        Hej {currentUser.name.split(' ')[0]}! Har du frågor? Kontakta{' '}
        <a 
          href="mailto:vip@consultingcollective.se" 
          className={styles.emailLink}
        >
          vip@consultingcollective.se
        </a>
      </p>
    </div>
  );
}
