import { Linkedin, MapPin, Mail, Phone } from 'lucide-react';
import { PipelineConsultant } from '@/data/pipelineConsultants';
import styles from './ConsultantCard.module.css';

interface ConsultantCardProps {
  consultant: PipelineConsultant;
  onClick?: (consultant: PipelineConsultant) => void;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export function ConsultantCard({ consultant, onClick, selected, onSelect }: ConsultantCardProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onSelect?.(consultant.id);
  };

  const displayedSkills = consultant.skills.slice(0, 3);
  const remainingSkills = consultant.skills.length - 3;

  return (
    <div className={`${styles.card} ${selected ? styles.selected : ''}`} onClick={() => onClick?.(consultant)}>
      <div className={styles.imageContainer}>
        {onSelect && (
          <label className={styles.checkboxLabel} onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={selected || false}
              onChange={handleCheckboxChange}
            />
          </label>
        )}
        <img
          src={consultant.profileImage}
          alt={`${consultant.firstName} ${consultant.lastName}`}
          className={styles.profileImage}
        />
        <span className={styles.locationBadge}>
          <MapPin size={10} />
          {consultant.location}
        </span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>
          {consultant.firstName} {consultant.lastName}
        </h3>
        <p className={styles.role}>{consultant.role}</p>
        
        <div className={styles.skillsContainer}>
          {displayedSkills.map((skill) => (
            <span key={skill} className={styles.skillTag}>{skill}</span>
          ))}
          {remainingSkills > 0 && (
            <span className={styles.skillMore}>+{remainingSkills}</span>
          )}
        </div>

        <div className={styles.contactRow}>
          <a
            href={`mailto:${consultant.email}`}
            className={styles.contactLink}
            onClick={(e) => e.stopPropagation()}
            title={consultant.email}
          >
            <Mail size={14} />
          </a>
          <a
            href={`tel:${consultant.phone}`}
            className={styles.contactLink}
            onClick={(e) => e.stopPropagation()}
            title={consultant.phone}
          >
            <Phone size={14} />
          </a>
          <a
            href={consultant.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contactLink} ${styles.linkedInLink}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
