import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Phone, Linkedin, ExternalLink, Edit, LogOut, Trash2, ArrowLeft } from 'lucide-react';
import styles from './ConsultantProfile.module.css';

// Mock consultant data - would come from auth/database in real app
const mockConsultant = {
  id: '1',
  firstName: 'Anna',
  lastName: 'Lindgren',
  email: 'anna.lindgren@email.se',
  phone: '+46 70 123 45 67',
  linkedIn: 'https://linkedin.com/in/annalindgren',
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  role: 'Fullstack Utvecklare',
  location: 'Stockholm',
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Next.js'],
  portfolio: 'https://annalindgren.dev',
  bio: 'Erfaren fullstack-utvecklare med över 8 års erfarenhet av moderna webbteknologier. Specialiserad på React-ekosystemet och molnbaserade lösningar. Brinner för clean code, testdriven utveckling och att bygga skalbara applikationer. Trivs i agila team och har erfarenhet av att leda tekniska projekt.',
};

const ConsultantProfile = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/consultant/profile/edit');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleDelete = () => {
    // Would show confirmation dialog in real app
    console.log('Delete account');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/dashboard" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Building2 size={20} />
          </div>
          <span className={styles.logoText}>Consulting Collective</span>
        </Link>
        <Link to="/dashboard" className={styles.backLink}>
          <ArrowLeft size={16} />
          Tillbaka till dashboard
        </Link>
      </header>

      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.profileImageWrapper}>
            <img 
              src={mockConsultant.profileImage} 
              alt={`${mockConsultant.firstName} ${mockConsultant.lastName}`}
              className={styles.profileImage}
            />
          </div>
          <div className={styles.profileHeaderInfo}>
            <h1 className={styles.profileName}>
              {mockConsultant.firstName} {mockConsultant.lastName}
            </h1>
            <p className={styles.profileRole}>{mockConsultant.role}</p>
            <div className={styles.contactRow}>
              <span className={styles.contactItem}>
                <Mail size={16} />
                <a href={`mailto:${mockConsultant.email}`}>{mockConsultant.email}</a>
              </span>
              <span className={styles.contactItem}>
                <Phone size={16} />
                <a href={`tel:${mockConsultant.phone}`}>{mockConsultant.phone}</a>
              </span>
              <span className={styles.contactItem}>
                <Linkedin size={16} />
                <a href={mockConsultant.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.profileBody}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Skills</h3>
            <div className={styles.skillsGrid}>
              {mockConsultant.skills.map((skill) => (
                <span key={skill} className={styles.skillTag}>{skill}</span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Portfolio</h3>
            <a 
              href={mockConsultant.portfolio} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.portfolioLink}
            >
              <ExternalLink size={16} />
              {mockConsultant.portfolio}
            </a>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Om mig</h3>
            <p className={styles.bioText}>{mockConsultant.bio}</p>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.editButton} onClick={handleEdit}>
            <Edit size={16} />
            Redigera profil
          </button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <LogOut size={16} />
            Logga ut
          </button>
          <button className={styles.deleteButton} onClick={handleDelete}>
            <Trash2 size={16} />
            Ta bort konto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfile;
