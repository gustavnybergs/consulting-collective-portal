import { cn } from '@/lib/utils';
import { currentUser } from '@/data/mockData';

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
    <div className="tabs-bar mx-4 mt-4">
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'tab-button',
              activeTab === tab.id ? 'tab-button-active' : 'tab-button-inactive'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground">
        Hej {currentUser.name.split(' ')[0]}! Har du frågor? Kontakta{' '}
        <a 
          href="mailto:vip@consultingcollective.se" 
          className="text-primary hover:underline"
        >
          vip@consultingcollective.se
        </a>
      </p>
    </div>
  );
}
