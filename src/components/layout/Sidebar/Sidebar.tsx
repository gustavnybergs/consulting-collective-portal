import { LayoutDashboard, Users, Briefcase, Settings, UserPlus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Konsulter', path: '/consultants' },
  { icon: Briefcase, label: 'Uppdrag', path: '/assignments' },
  { icon: Settings, label: 'Admin', path: '/admin' },
  { icon: UserPlus, label: 'Ansök', path: '/apply' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <Link to="/dashboard" className={styles.logoLink}>
        <div className={styles.logoBox}>
          <span className={styles.logoText}>CC</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              title={item.label}
            >
              <item.icon className={styles.navIcon} />
              <span className={styles.tooltip}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
