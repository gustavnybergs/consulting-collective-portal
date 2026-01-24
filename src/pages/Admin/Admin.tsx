import { useState, useMemo } from 'react';
import { Search, MapPin, Mail, Phone, Linkedin, X, Copy, ExternalLink, Calendar } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout/DashboardLayout';
import { ConsultantCard } from '@/components/admin/ConsultantCard/ConsultantCard';
import { pipelineConsultants, PipelineConsultant, roles, locations } from '@/data/pipelineConsultants';
import styles from './Admin.module.css';

export default function Admin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConsultant, setSelectedConsultant] = useState<PipelineConsultant | null>(null);
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showContactModal, setShowContactModal] = useState(false);

  const filteredConsultants = useMemo(() => {
    return pipelineConsultants.filter((consultant) => {
      const matchesSearch =
        searchQuery === '' ||
        `${consultant.firstName} ${consultant.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultant.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultant.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLocation = locationFilter === '' || consultant.location === locationFilter;
      const matchesRole = roleFilter === '' || consultant.role === roleFilter;

      return matchesSearch && matchesLocation && matchesRole;
    });
  }, [searchQuery, locationFilter, roleFilter]);

  const handleCardClick = (consultant: PipelineConsultant) => {
    setSelectedConsultant(consultant);
  };

  const closeModal = () => {
    setSelectedConsultant(null);
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredConsultants.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredConsultants.map((c) => c.id)));
    }
  };

  const selectedConsultants = useMemo(() => {
    return pipelineConsultants.filter((c) => selectedIds.has(c.id));
  }, [selectedIds]);

  const handleContactAll = () => {
    if (selectedConsultants.length > 0) {
      setShowContactModal(true);
    }
  };

  const getEmailList = () => {
    return selectedConsultants.map((c) => c.email).join(', ');
  };

  const copyEmails = () => {
    navigator.clipboard.writeText(getEmailList());
  };

  const openMailClient = () => {
    const emails = selectedConsultants.map((c) => c.email).join(',');
    window.location.href = `mailto:${emails}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' });
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
            <select
              className={styles.filterButton}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">Alla roller</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.statsBar}>
          <p className={styles.stats}>
            Visar {filteredConsultants.length} av {pipelineConsultants.length} konsulter
          </p>
          <div className={styles.selectionBar}>
            <label className={styles.selectAllLabel}>
              <input
                type="checkbox"
                className={styles.selectAllCheckbox}
                checked={selectedIds.size === filteredConsultants.length && filteredConsultants.length > 0}
                onChange={toggleSelectAll}
              />
              Välj alla
            </label>
            {selectedIds.size > 0 && (
              <span className={styles.selectedCount}>
                {selectedIds.size} valda
              </span>
            )}
            <button
              className={styles.contactAllButton}
              onClick={handleContactAll}
              disabled={selectedIds.size === 0}
            >
              <Mail size={16} />
              Kontakta valda
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {filteredConsultants.map((consultant) => (
            <ConsultantCard
              key={consultant.id}
              consultant={consultant}
              onClick={handleCardClick}
              selected={selectedIds.has(consultant.id)}
              onSelect={toggleSelection}
            />
          ))}
        </div>

        {/* Consultant Detail Modal */}
        {selectedConsultant && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <button className={styles.modalCloseButton} onClick={closeModal}>
                <X size={18} />
              </button>
              
              <div className={styles.modalTop}>
                <img
                  src={selectedConsultant.profileImage}
                  alt={`${selectedConsultant.firstName} ${selectedConsultant.lastName}`}
                  className={styles.modalImage}
                />
                <div className={styles.modalInfo}>
                  <h2 className={styles.modalName}>
                    {selectedConsultant.firstName} {selectedConsultant.lastName}
                  </h2>
                  <p className={styles.modalRole}>{selectedConsultant.role}</p>
                  <span className={styles.modalLocation}>
                    <MapPin size={12} />
                    {selectedConsultant.location}
                  </span>
                </div>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>Skills</h4>
                <div className={styles.modalSkills}>
                  {selectedConsultant.skills.map((skill) => (
                    <span key={skill} className={styles.modalSkillTag}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>Om</h4>
                <p className={styles.modalBio}>{selectedConsultant.bio}</p>
              </div>

              <div className={styles.modalMeta}>
                <div className={styles.modalMetaItem}>
                  <Calendar size={14} />
                  <span>Tillgänglig från {formatDate(selectedConsultant.availableFrom)}</span>
                </div>
              </div>

              <div className={styles.modalLinks}>
                <a
                  href={`mailto:${selectedConsultant.email}`}
                  className={styles.modalLinkItem}
                >
                  <Mail size={16} />
                  <span>{selectedConsultant.email}</span>
                </a>
                <a
                  href={`tel:${selectedConsultant.phone}`}
                  className={styles.modalLinkItem}
                >
                  <Phone size={16} />
                  <span>{selectedConsultant.phone}</span>
                </a>
                <a
                  href={selectedConsultant.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalLinkItem}
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={selectedConsultant.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalLinkItem}
                >
                  <ExternalLink size={16} />
                  <span>Portfolio</span>
                </a>
              </div>

              <button className={styles.bookButton}>
                <Calendar size={16} />
                Boka ett möte
              </button>
            </div>
          </div>
        )}

        {/* Contact Multiple Modal */}
        {showContactModal && (
          <div className={styles.modalOverlay} onClick={() => setShowContactModal(false)}>
            <div className={styles.contactModal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.contactModalHeader}>
                <h2 className={styles.contactModalTitle}>
                  Kontakta {selectedConsultants.length} konsulter
                </h2>
                <button className={styles.modalCloseButton} onClick={() => setShowContactModal(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className={styles.contactModalContent}>
                <div className={styles.recipientsList}>
                  {selectedConsultants.map((c) => (
                    <span key={c.id} className={styles.recipientTag}>
                      {c.firstName} {c.lastName}
                    </span>
                  ))}
                </div>
                <div className={styles.contactActions}>
                  <button className={styles.contactActionButton} onClick={openMailClient}>
                    <Mail className={styles.contactActionIcon} />
                    <div className={styles.contactActionText}>
                      <span className={styles.contactActionTitle}>Öppna i e-postklient</span>
                      <span className={styles.contactActionDesc}>Skapa ett nytt mail med alla mottagare</span>
                    </div>
                  </button>
                  <button className={styles.contactActionButton} onClick={copyEmails}>
                    <Copy className={styles.contactActionIcon} />
                    <div className={styles.contactActionText}>
                      <span className={styles.contactActionTitle}>Kopiera e-postadresser</span>
                      <span className={styles.contactActionDesc}>{getEmailList().substring(0, 50)}...</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
