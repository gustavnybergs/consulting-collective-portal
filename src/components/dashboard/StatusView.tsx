import { FileText, Users, AlertTriangle, ShoppingCart } from 'lucide-react';
import { KPICard } from './KPICard';
import { ContractsTable } from './ContractsTable';
import { kpiData, contracts, consultants } from '@/data/mockData';

export function StatusView() {
  const expiringContracts = contracts.filter(c => c.status === 'expiring');
  const activeConsultants = consultants.filter(c => c.status === 'active');

  return (
    <div className="p-4 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Antal kontrakt"
          value={kpiData.totalContracts}
          icon={<FileText className="w-5 h-5" />}
        />
        <KPICard
          title="Konsulter i leverans"
          value={activeConsultants.length}
          icon={<Users className="w-5 h-5" />}
        >
          <ul className="space-y-1">
            {activeConsultants.map((consultant) => (
              <li key={consultant.id} className="flex items-center justify-between text-xs">
                <span className="text-foreground">{consultant.name}</span>
                <span className="text-muted-foreground">{consultant.utilization}%</span>
              </li>
            ))}
          </ul>
        </KPICard>
        <KPICard
          title="Kräver hantering"
          value={expiringContracts.length}
          icon={<AlertTriangle className="w-5 h-5" />}
          highlight
        >
          <ul className="space-y-1">
            {expiringContracts.map((contract) => (
              <li key={contract.id} className="flex items-center justify-between text-xs">
                <span className="text-foreground">{contract.role}</span>
                <span className="text-accent font-medium">
                  {contract.daysUntilExpiry} dagar
                </span>
              </li>
            ))}
          </ul>
        </KPICard>
        <KPICard
          title="Antal beställningar"
          value={kpiData.totalOrders}
          icon={<ShoppingCart className="w-5 h-5" />}
        />
      </div>

      {/* Contracts Table */}
      <ContractsTable />
    </div>
  );
}
