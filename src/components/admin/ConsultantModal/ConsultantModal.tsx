import { X, MapPin, Mail, Phone, Linkedin, ExternalLink, Calendar, CheckCircle, XCircle, Shield, FileText, Briefcase, GraduationCap } from 'lucide-react';
import { PipelineConsultant } from '@/data/pipelineConsultants';
import styles from './ConsultantModal.module.css';

interface ConsultantModalProps {
  consultant: PipelineConsultant;
  onClose: () => void;
}

export function ConsultantModal({ consultant, onClose }: ConsultantModalProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={18} />
        </button>

        {/* Hero */}
        <div className={styles.hero}>
          <img
            src={consultant.profileImage}
            alt={`${consultant.firstName} ${consultant.lastName}`}
            className={styles.heroImage}
          />
          <div className={styles.heroInfo}>
            <h2 className={styles.heroName}>
              {consultant.firstName} {consultant.lastName}
            </h2>
            <p className={styles.heroRole}>{consultant.role}</p>
            <div className={styles.heroBadges}>
              <span className={`${styles.badge} ${styles.badgeLocation}`}>
                <MapPin size={10} />
                {consultant.location}
              </span>
              <span className={`${styles.badge} ${styles.badgeAvailability}`}>
                <Calendar size={10} />
                {formatDate(consultant.availableFrom)}
              </span>
              {consultant.isFullyAvailable && (
                <span className={`${styles.badge} ${styles.badgeAvailability}`}>
                  100% tillgänglig
                </span>
              )}
              {consultant.canWorkOnsite && (
                <span className={`${styles.badge} ${styles.badgeOnsite}`}>
                  Kan jobba på plats
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.body}>
          {/* Bio */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Om</h4>
            <p className={styles.bio}>{consultant.bio}</p>
          </div>

          {/* Roles & Experience */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Roll & Erfarenhet</h4>
            <div className={styles.rolesList}>
              {Object.entries(consultant.roles).map(([role, years]) => (
                <div key={role} className={styles.roleItem}>
                  <span className={styles.roleName}>{role}</span>
                  <span className={styles.roleYears}>{years} år</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Skills</h4>
            <div className={styles.skillsGrid}>
              {consultant.skills.map((skill) => (
                <span key={skill} className={styles.skillTag}>{skill}</span>
              ))}
            </div>
          </div>

          <hr className={styles.divider} />

          {/* Info Grid */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Detaljer</h4>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Anställningsform</span>
                <span className={styles.infoValue}>
                  <Briefcase size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {consultant.employmentType === 'freelancer' ? 'Frilansare' : 'Anställd'}
                </span>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Företag</span>
                <span className={styles.infoValue}>{consultant.companyName}</span>
              </div>
              {consultant.orgNumber && (
                <div className={styles.infoCard}>
                  <span className={styles.infoLabel}>Org.nummer</span>
                  <span className={styles.infoValue}>{consultant.orgNumber}</span>
                </div>
              )}
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Timpris</span>
                <span className={styles.infoValue}>{consultant.hourlyRate}</span>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Tillgänglig 100%</span>
                <span className={styles.infoValue}>
                  {consultant.isFullyAvailable ? <><CheckCircle size={12} style={{ color: '#2e7d32', display: 'inline', marginRight: 4 }} />Ja</> : <><XCircle size={12} style={{ color: '#c62828', display: 'inline', marginRight: 4 }} />Nej</>}
                </span>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>På plats hos kund</span>
                <span className={styles.infoValue}>
                  {consultant.canWorkOnsite ? <><CheckCircle size={12} style={{ color: '#2e7d32', display: 'inline', marginRight: 4 }} />Ja</> : <><XCircle size={12} style={{ color: '#c62828', display: 'inline', marginRight: 4 }} />Nej</>}
                </span>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Säkerhetsprövning</span>
                <span className={styles.infoValue}>
                  <Shield size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {consultant.securityClearance === 'Ja' ? consultant.securityLevel : 'Nej'}
                </span>
              </div>
            </div>
          </div>

          {/* Education */}
          {consultant.hasEducation && consultant.educations.length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>
                <GraduationCap size={12} style={{ display: 'inline', marginRight: 4 }} />
                Utbildning
              </h4>
              <div className={styles.educationList}>
                {consultant.educations.map((edu) => (
                  <div key={edu.type} className={styles.educationItem}>
                    <p className={styles.educationType}>{edu.label}</p>
                    <p className={styles.educationDetail}>{edu.field} — {edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {consultant.references.length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Referenser</h4>
              <div className={styles.referencesList}>
                {consultant.references.map((ref, i) => (
                  <div key={i} className={styles.referenceCard}>
                    <p className={styles.referenceName}>{ref.name}</p>
                    <p className={styles.referenceCompany}>{ref.company}</p>
                    <p className={styles.referenceRelation}>{ref.relation} · {ref.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Files */}
          {consultant.uploadedFiles.length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Uppladdade filer</h4>
              <div className={styles.filesList}>
                {consultant.uploadedFiles.map((file) => (
                  <div key={file.name} className={styles.fileTag}>
                    <FileText size={14} />
                    <span>{file.name}</span>
                    <span className={styles.fileType}>
                      {file.type === 'cv' ? 'CV' : file.type === 'certificate' ? 'Certifikat' : 'Intyg'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <hr className={styles.divider} />

          {/* Contact & Links */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Kontakt & Länkar</h4>
            <div className={styles.contactRow}>
              <a href={`mailto:${consultant.email}`} className={styles.contactItem}>
                <Mail size={14} />
                <span>{consultant.email}</span>
              </a>
              <a href={`tel:${consultant.phone}`} className={styles.contactItem}>
                <Phone size={14} />
                <span>{consultant.phone}</span>
              </a>
            </div>
            <div className={styles.linksRow} style={{ marginTop: 8 }}>
              <a href={consultant.linkedIn} target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                <Linkedin size={14} />
                LinkedIn
              </a>
              <a href={consultant.portfolio} target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                <ExternalLink size={14} />
                Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.bookButton}>
            <Calendar size={16} />
            Boka ett möte
          </button>
        </div>
      </div>
    </div>
  );
}
