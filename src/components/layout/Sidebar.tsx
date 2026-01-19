import { LayoutDashboard, Users, Briefcase } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Konsulter', path: '/consultants' },
  { icon: Briefcase, label: 'Uppdrag', path: '/assignments' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-14 bg-sidebar flex flex-col items-center py-4 min-h-screen fixed left-0 top-0 z-50">
      {/* Logo */}
      <Link to="/dashboard" className="mb-8">
        <div className="w-8 h-8 bg-sidebar-foreground rounded-lg flex items-center justify-center">
          <span className="text-sidebar font-bold text-sm">CC</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group relative',
                isActive 
                  ? 'bg-sidebar-accent' 
                  : 'hover:bg-sidebar-accent/50'
              )}
              title={item.label}
            >
              <item.icon 
                className={cn(
                  'w-5 h-5 transition-colors',
                  isActive 
                    ? 'text-sidebar-foreground' 
                    : 'text-sidebar-foreground/60 group-hover:text-sidebar-foreground'
                )} 
              />
              {/* Tooltip */}
              <span className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
