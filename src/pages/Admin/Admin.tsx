import { useState, useMemo } from 'react';
import { Search, Filter, SortDesc, MapPin, Mail, Phone, Linkedin, X } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout/DashboardLayout';
import { ConsultantCard } from '@/components/admin/ConsultantCard/ConsultantCard';
import { pipelineConsultants, PipelineConsultant } from '@/data/pipelineConsultants';
import styles from './Admin.module.css';

export default function Admin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConsultant, setSelectedConsultant] = useState<PipelineConsultant | null>(null);
  const [locationFilter, setLocationFilter] = useState<string>('');

  const locations = useMemo(() => {
    const locs = [...new Set(pipelineConsultants.map((c) => c.location))];
    return locs.sort();
  }, []);

  const filteredConsultants = useMemo(() => {
    return pipelineConsultants.filter((consultant) => {
      const matchesSearch =
        searchQuery === '' ||
        `${consultant.firstName} ${consultant.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultant.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultant.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation = locationFilter === '' || consultant.location === locationFilter;

      return matchesSearch && matchesLocation;
    });
  }, [searchQuery, locationFilter]);

  const handleCardClick = (consultant: PipelineConsultant) => {
    setSelectedConsultant(consultant);
  };

  const closeModal = () => {
    setSelectedConsultant(null);
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Konsulter i Pipeline</h1>
          <p className={styles.subtitle}>Hantera och se alla tillgängliga konsulter</p>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Sök bland konsulter..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.filterGroup}>
            <select
              className={styles.filterButton}
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">Alla platser</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className={styles.stats}>
          Visar {filteredConsultants.length} av {pipelineConsultants.length} konsulter
        </p>

        <div className={styles.grid}>
          {filteredConsultants.map((consultant) => (
            <ConsultantCard
              key={consultant.id}
              consultant={consultant}
              onClick={handleCardClick}
            />
          ))}
        </div>

        {/* Modal */}
        {selectedConsultant && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <img
                  src={selectedConsultant.profileImage}
                  alt={`${selectedConsultant.firstName} ${selectedConsultant.lastName}`}
                  className={styles.modalImage}
                />
                <button className={styles.modalCloseButton} onClick={closeModal}>
                  <X size={18} />
                </button>
              </div>
              <div className={styles.modalContent}>
                <h2 className={styles.modalName}>
                  {selectedConsultant.firstName} {selectedConsultant.lastName}
                </h2>
                <p className={styles.modalRole}>{selectedConsultant.role}</p>
                <span className={styles.modalLocation}>
                  <MapPin size={14} />
                  {selectedConsultant.location}
                </span>
                <div className={styles.modalContactList}>
                  <a
                    href={`mailto:${selectedConsultant.email}`}
                    className={styles.modalContactItem}
                  >
                    <Mail className={styles.modalContactIcon} />
                    <span className={styles.modalContactText}>{selectedConsultant.email}</span>
                  </a>
                  <a
                    href={`tel:${selectedConsultant.phone}`}
                    className={styles.modalContactItem}
                  >
                    <Phone className={styles.modalContactIcon} />
                    <span className={styles.modalContactText}>{selectedConsultant.phone}</span>
                  </a>
                  <a
                    href={selectedConsultant.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalContactItem}
                  >
                    <Linkedin className={styles.modalContactIcon} />
                    <span className={styles.modalContactText}>Visa LinkedIn-profil</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
