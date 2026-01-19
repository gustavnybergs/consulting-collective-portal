import { Search, Bell, HelpCircle, User } from 'lucide-react';
import { currentUser } from '@/data/mockData';

export function TopBar() {
  return (
    <header className="h-10 bg-topbar border-b border-border flex items-center justify-between px-4">
      {/* Search */}
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Sök efter något..."
          className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="relative p-1 hover:bg-muted rounded transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full" />
        </button>
        
        <a 
          href="mailto:vip@consultingcollective.se" 
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Hjälp</span>
        </a>

        <button className="flex items-center gap-2 p-1 hover:bg-muted rounded transition-colors">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="text-xs font-medium hidden sm:inline">{currentUser.name}</span>
        </button>
      </div>
    </header>
  );
}
