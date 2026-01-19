import { useState } from 'react';
import { Download, Search, FileSpreadsheet } from 'lucide-react';
import { assignments } from '@/data/mockData';
import styles from './ExportView.module.css';

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

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return styles.statusActive;
      case 'completed':
        return styles.statusCompleted;
      case 'planned':
        return styles.statusPending;
      default:
        return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktiv';
      case 'completed':
        return 'Avslutad';
      case 'planned':
        return 'Planerad';
      default:
        return status;
    }
  };

  return (
    <div className={styles.container}>
      {/* Färdiga rapporter placeholder */}
      <div className={styles.card}>
        <div className={styles.sectionHeader}>
          <FileSpreadsheet className={styles.sectionIcon} />
          <h3 className={styles.sectionTitle}>Färdiga rapporter</h3>
        </div>
        <p className={styles.placeholderText}>
          Inga rapporter tillgängliga just nu. Välj uppdrag nedan för att skapa en ny rapport.
        </p>
      </div>

      {/* Export section */}
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <h3 className={styles.sectionTitle}>Välj uppdrag</h3>
          <button
            onClick={handleExport}
            disabled={selectedIds.length === 0}
            className={styles.exportButton}
          >
            <Download className={styles.exportIcon} />
            Exportera till Excel ({selectedIds.length})
          </button>
        </div>

        {/* Search */}
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Sök uppdrag..."
            className={styles.searchInput}
          />
        </div>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredAssignments.length && filteredAssignments.length > 0}
                    onChange={toggleAll}
                    className={styles.checkbox}
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
                  onClick={() => toggleSelection(assignment.id)}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(assignment.id)}
                      onChange={() => toggleSelection(assignment.id)}
                      onClick={(e) => e.stopPropagation()}
                      className={styles.checkbox}
                    />
                  </td>
                  <td className={styles.fontMedium}>{assignment.projectNumber}</td>
                  <td>{assignment.client}</td>
                  <td>{formatDate(assignment.startDate)}</td>
                  <td>{formatDate(assignment.endDate)}</td>
                  <td>{formatCurrency(assignment.budget)}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusClass(assignment.status)}`}>
                      {getStatusText(assignment.status)}
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
