import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout/DashboardLayout';
import { TabsBar } from '@/components/layout/TabsBar/TabsBar';
import { StatusView } from '@/components/dashboard/StatusView/StatusView';
import { OrderView } from '@/components/dashboard/OrderView/OrderView';
import { ExportView } from '@/components/dashboard/ExportView/ExportView';

type TabType = 'status' | 'order' | 'export';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('status');

  const renderContent = () => {
    switch (activeTab) {
      case 'status':
        return <StatusView />;
      case 'order':
        return <OrderView />;
      case 'export':
        return <ExportView />;
      default:
        return <StatusView />;
    }
  };

  return (
    <DashboardLayout>
      <TabsBar activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </DashboardLayout>
  );
}
