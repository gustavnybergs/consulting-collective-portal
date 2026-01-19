import { contracts } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function ContractsTable() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE');
  };

  return (
    <div className="dashboard-card animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Aktiva kontrakt</h3>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Projektnr</th>
              <th>Roll</th>
              <th>Start</th>
              <th>Slut</th>
              <th>Arbetad tid</th>
              <th>Budget</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id} className="cursor-pointer">
                <td className="font-medium">{contract.projectNumber}</td>
                <td>{contract.role}</td>
                <td>{formatDate(contract.startDate)}</td>
                <td>{formatDate(contract.endDate)}</td>
                <td>{contract.workedHours} tim</td>
                <td>{formatCurrency(contract.budget)}</td>
                <td>
                  <span className={cn(
                    'status-badge',
                    contract.status === 'active' && 'status-badge-active',
                    contract.status === 'expiring' && 'status-badge-warning',
                    contract.status === 'completed' && 'bg-gray-100 text-gray-800'
                  )}>
                    {contract.status === 'active' && 'Aktiv'}
                    {contract.status === 'expiring' && `Löper ut om ${contract.daysUntilExpiry} dagar`}
                    {contract.status === 'completed' && 'Avslutad'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
