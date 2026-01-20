import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';
import { PipelineConsultant } from '@/data/pipelineConsultants';
import styles from './ConsultantCard.module.css';

interface ConsultantCardProps {
  consultant: PipelineConsultant;
  onClick?: (consultant: PipelineConsultant) => void;
}

export function ConsultantCard({ consultant, onClick }: ConsultantCardProps) {
  return (
    <div className={styles.card} onClick={() => onClick?.(consultant)}>
      <div className={styles.imageContainer}>
        <img
          src={consultant.profileImage}
          alt={`${consultant.firstName} ${consultant.lastName}`}
          className={styles.profileImage}
        />
        <span className={styles.locationBadge}>
          <MapPin size={12} />
          {consultant.location}
        </span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>
          {consultant.firstName} {consultant.lastName}
        </h3>
        <p className={styles.role}>{consultant.role}</p>
        <div className={styles.contactInfo}>
          <a
            href={`mailto:${consultant.email}`}
            className={styles.contactItem}
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className={styles.contactIcon} />
            <span>{consultant.email}</span>
          </a>
          <a
            href={`tel:${consultant.phone}`}
            className={styles.contactItem}
            onClick={(e) => e.stopPropagation()}
          >
            <Phone className={styles.contactIcon} />
            <span>{consultant.phone}</span>
          </a>
          <a
            href={consultant.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contactItem} ${styles.linkedInLink}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className={styles.contactIcon} />
            <span>LinkedIn Profil</span>
          </a>
        </div>
      </div>
    </div>
  );
}
