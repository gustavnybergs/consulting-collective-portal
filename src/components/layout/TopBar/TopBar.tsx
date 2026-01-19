import { Search, Bell, HelpCircle, User } from 'lucide-react';
import { currentUser } from '@/data/mockData';
import styles from './TopBar.module.css';

export function TopBar() {
  return (
    <header className={styles.topBar}>
      {/* Search */}
      <div className={styles.searchWrapper}>
        <Search className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Sök efter något..."
          className={styles.searchInput}
        />
      </div>

      {/* Right side */}
      <div className={styles.rightSection}>
        <button className={styles.iconButton}>
          <Bell className={styles.buttonIcon} />
          <span className={styles.notificationDot} />
        </button>
        
        <a 
          href="mailto:vip@consultingcollective.se" 
          className={styles.helpLink}
        >
          <HelpCircle className={styles.buttonIcon} />
          <span className={styles.helpText}>Hjälp</span>
        </a>

        <button className={styles.profileButton}>
          <div className={styles.avatar}>
            <User className={styles.avatarIcon} />
          </div>
          <span className={styles.userName}>{currentUser.name}</span>
        </button>
      </div>
    </header>
  );
}
