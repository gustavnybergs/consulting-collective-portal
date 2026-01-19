import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { assignments } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Assignments() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Uppdrag</h1>
        
        <div className="dashboard-card">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Projektnr</th>
                  <th>Kund</th>
                  <th>Start</th>
                  <th>Slut</th>
                  <th>Budget</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="cursor-pointer">
                    <td className="font-medium">{assignment.projectNumber}</td>
                    <td>{assignment.client}</td>
                    <td>{formatDate(assignment.startDate)}</td>
                    <td>{formatDate(assignment.endDate)}</td>
                    <td>{formatCurrency(assignment.budget)}</td>
                    <td>
                      <span className={cn(
                        'status-badge',
                        assignment.status === 'active' && 'status-badge-active',
                        assignment.status === 'completed' && 'bg-gray-100 text-gray-800',
                        assignment.status === 'planned' && 'status-badge-pending'
                      )}>
                        {assignment.status === 'active' && 'Aktiv'}
                        {assignment.status === 'completed' && 'Avslutad'}
                        {assignment.status === 'planned' && 'Planerad'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
