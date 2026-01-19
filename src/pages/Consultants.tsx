import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { consultants } from '@/data/mockData';
import { User } from 'lucide-react';

export default function Consultants() {
  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Konsulter i leverans</h1>
        
        <div className="dashboard-card">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {consultants.map((consultant) => (
              <div
                key={consultant.id}
                className="p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{consultant.name}</h3>
                    <p className="text-sm text-muted-foreground">{consultant.role}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Beläggning</span>
                  <span className={`font-semibold ${
                    consultant.utilization >= 100 ? 'text-green-600' : 'text-foreground'
                  }`}>
                    {consultant.utilization}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
