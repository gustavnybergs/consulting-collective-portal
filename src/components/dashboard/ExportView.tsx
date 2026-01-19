import { useState } from 'react';
import { Download, Search, FileSpreadsheet } from 'lucide-react';
import { assignments } from '@/data/mockData';

export function ExportView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredAssignments = assignments.filter(
    (a) =>
      a.projectNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === filteredAssignments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAssignments.map((a) => a.id));
    }
  };

  const handleExport = () => {
    console.log('Exporting assignments:', selectedIds);
    alert(`Exporterar ${selectedIds.length} uppdrag till Excel...`);
  };

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
    <div className="p-4 space-y-6">
      {/* Färdiga rapporter placeholder */}
      <div className="dashboard-card animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <FileSpreadsheet className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Färdiga rapporter</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Inga rapporter tillgängliga just nu. Välj uppdrag nedan för att skapa en ny rapport.
        </p>
      </div>

      {/* Export section */}
      <div className="dashboard-card animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Välj uppdrag</h3>
          <button
            onClick={handleExport}
            disabled={selectedIds.length === 0}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Exportera till Excel ({selectedIds.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Sök uppdrag..."
            className="input-field pl-10"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredAssignments.length && filteredAssignments.length > 0}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                </th>
                <th>Projektnr</th>
                <th>Kund</th>
                <th>Start</th>
                <th>Slut</th>
                <th>Budget</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((assignment) => (
                <tr
                  key={assignment.id}
                  className="cursor-pointer"
                  onClick={() => toggleSelection(assignment.id)}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(assignment.id)}
                      onChange={() => toggleSelection(assignment.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="font-medium">{assignment.projectNumber}</td>
                  <td>{assignment.client}</td>
                  <td>{formatDate(assignment.startDate)}</td>
                  <td>{formatDate(assignment.endDate)}</td>
                  <td>{formatCurrency(assignment.budget)}</td>
                  <td>
                    <span className={`status-badge ${
                      assignment.status === 'active' ? 'status-badge-active' :
                      assignment.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'status-badge-pending'
                    }`}>
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
  );
}
