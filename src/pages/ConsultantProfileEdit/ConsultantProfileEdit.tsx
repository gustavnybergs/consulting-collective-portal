import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, X, Save, Upload, Camera } from 'lucide-react';
import styles from './ConsultantProfileEdit.module.css';

const roleCategories = {
  'Utveckling': [
    'Fullstackutvecklare',
    'Frontendutvecklare',
    'Backendutvecklare',
    'Mobilutvecklare',
    'Systemutvecklare',
  ],
  'Ledarskap': [
    'Tech Lead',
    'Projektledare',
    'Scrum Master',
    'Agil coach',
    'Produktägare',
  ],
  'Specialister': [
    'UX-designer',
    'UI-designer',
    'DevOps-ingenjör',
    'Testare/QA',
    'Systemarkitekt',
    'Data Engineer',
    'Säkerhetsspecialist',
  ],
};

const skillCategories = {
  'Frontend': ['React', 'TypeScript', 'JavaScript', 'Vue', 'Angular', 'HTML/CSS', 'Next.js', 'Tailwind', 'Redux', 'Svelte'],
  'Backend': ['Java', 'C#/.NET', 'Python', 'Node.js', 'Go', 'Kotlin', 'PHP', 'Ruby', 'Spring Boot', 'Express'],
  'Databas': ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Oracle', 'SQL Server', 'Firebase'],
  'DevOps & Cloud': ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins', 'GitHub Actions'],
  'Mobil': ['React Native', 'Flutter', 'Swift', 'Kotlin (Android)', 'iOS', 'Android'],
  'Metodik & Verktyg': ['Agile/Scrum', 'Git', 'REST API', 'GraphQL', 'Microservices', 'TDD', 'Jira', 'Figma'],
};

const hourlyRateOptions = [
  'Under 500 kr',
  '500-650 kr',
  '651-800 kr',
  '801-950 kr',
  '951-1100 kr',
  '1101-1250 kr',
  '1251-1400 kr',
  '1400+ kr',
];

const educationTypes = [
  { id: 'yh', label: 'YH-utbildning' },
  { id: 'kandidat', label: 'Kandidatexamen' },
  { id: 'master', label: 'Masterexamen/Civilingenjör' },
  { id: 'annan', label: 'Annan' },
];

interface EducationEntry {
  type: string;
  field: string;
  institution: string;
}

interface UploadedFile {
  name: string;
  type: 'cv' | 'certificate' | 'reference';
}

const ConsultantProfileEdit = () => {
  const navigate = useNavigate();

  // Profile image
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face');

  // Personal info
  const [firstName, setFirstName] = useState('Anna');
  const [lastName, setLastName] = useState('Lindgren');
  const [email, setEmail] = useState('anna.lindgren@email.se');
  const [phone, setPhone] = useState('+46 70 123 45 67');
  const [city, setCity] = useState('Stockholm');

  // Roles with years
  const [selectedRoles, setSelectedRoles] = useState<Record<string, number>>({
    'Fullstackutvecklare': 8,
  });

  // Skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Next.js'
  ]);

  // Availability and work preferences
  const [availableFrom, setAvailableFrom] = useState('2024-02-01');
  const [isFullyAvailable, setIsFullyAvailable] = useState(true);
  const [canWorkOnsite, setCanWorkOnsite] = useState(true);
  const [hourlyRate, setHourlyRate] = useState('801-950 kr');

  // Employment type
  const [employmentType, setEmploymentType] = useState<'freelancer' | 'employed'>('freelancer');
  const [companyName, setCompanyName] = useState('Lindgren IT Consulting AB');
  const [orgNumber, setOrgNumber] = useState('559123-4567');
  const [consultingCompanyName, setConsultingCompanyName] = useState('');

  // Education
  const [hasEducation, setHasEducation] = useState(true);
  const [educations, setEducations] = useState<EducationEntry[]>([
    { type: 'kandidat', field: 'Datateknik', institution: 'KTH' }
  ]);

  // Links and uploads
  const [linkedIn, setLinkedIn] = useState('https://linkedin.com/in/annalindgren');
  const [portfolio, setPortfolio] = useState('https://annalindgren.dev');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { name: 'CV_Anna_Lindgren.pdf', type: 'cv' }
  ]);

  // Bio
  const [bio, setBio] = useState('Erfaren fullstack-utvecklare med över 8 års erfarenhet av moderna webbteknologier. Specialiserad på React-ekosystemet och molnbaserade lösningar.');

  const wordCount = bio.trim() === '' ? 0 : bio.trim().split(/\s+/).length;

  const handleRoleToggle = (role: string) => {
    setSelectedRoles(prev => {
      if (prev[role] !== undefined) {
        const { [role]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [role]: 1 };
    });
  };

  const handleRoleYearsChange = (role: string, years: number) => {
    setSelectedRoles(prev => ({ ...prev, [role]: years }));
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleEducationTypeToggle = (typeId: string) => {
    setEducations(prev => {
      const exists = prev.find(e => e.type === typeId);
      if (exists) {
        return prev.filter(e => e.type !== typeId);
      }
      return [...prev, { type: typeId, field: '', institution: '' }];
    });
  };

  const handleEducationFieldChange = (typeId: string, field: 'field' | 'institution', value: string) => {
    setEducations(prev =>
      prev.map(e => e.type === typeId ? { ...e, [field]: value } : e)
    );
  };

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== fileName));
  };

  const handleCancel = () => {
    navigate('/consultant/profile');
  };

  const handleSave = () => {
    console.log('Saving profile...');
    navigate('/consultant/profile');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/consultant/profile" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Building2 size={20} />
          </div>
          <span className={styles.logoText}>Consulting Collective</span>
        </Link>
        <Link to="/consultant/profile" className={styles.backLink}>
          <ArrowLeft size={16} />
          Tillbaka till profil
        </Link>
      </header>

      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Redigera profil</h1>
        </div>

        <div className={styles.formBody}>
          {/* Profile Image */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Profilbild</h2>
            <div className={styles.profileImageSection}>
              <div className={styles.profileImageWrapper}>
                <img src={profileImage} alt="Profilbild" className={styles.profileImage} />
                <button type="button" className={styles.changeImageButton}>
                  <Camera size={16} />
                </button>
              </div>
              <div className={styles.profileImageInfo}>
                <p className={styles.profileImageHint}>Klicka på kameraikonen för att ändra bild</p>
                <p className={styles.profileImageFormat}>Rekommenderat format: JPG eller PNG, minst 200x200px</p>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Personuppgifter</h2>
            <div className={styles.fieldGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Förnamn</label>
                <input
                  type="text"
                  className={styles.input}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Efternamn</label>
                <input
                  type="text"
                  className={styles.input}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>E-post</label>
                <input
                  type="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Telefon</label>
                <input
                  type="tel"
                  className={styles.input}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Ort</label>
                <input
                  type="text"
                  className={styles.input}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Roles */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Roll & Erfarenhet</h2>
            <div className={styles.rolesGrid}>
              {Object.entries(roleCategories).map(([category, roles]) => (
                <div key={category} className={styles.roleCategory}>
                  <h3 className={styles.roleCategoryTitle}>{category}</h3>
                  {roles.map((role) => (
                    <div key={role} className={styles.roleItem}>
                      <input
                        type="checkbox"
                        id={`role-${role}`}
                        className={styles.roleCheckbox}
                        checked={selectedRoles[role] !== undefined}
                        onChange={() => handleRoleToggle(role)}
                      />
                      <label htmlFor={`role-${role}`} className={styles.roleLabel}>
                        {role}
                      </label>
                      {selectedRoles[role] !== undefined && (
                        <input
                          type="number"
                          min="1"
                          max="50"
                          className={styles.roleYears}
                          value={selectedRoles[role]}
                          onChange={(e) => handleRoleYearsChange(role, parseInt(e.target.value) || 1)}
                          placeholder="År"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className={styles.section}>
            <div className={styles.skillsHeader}>
              <h2 className={styles.skillsTitle}>Skills</h2>
              <span className={`${styles.skillsCounter} ${selectedSkills.length >= 5 ? styles.skillsCounterValid : ''}`}>
                Valda: {selectedSkills.length} (minst 5)
              </span>
            </div>
            <div className={styles.skillsGrid}>
              {Object.entries(skillCategories).map(([category, skills]) => (
                <div key={category} className={styles.skillCategory}>
                  <h3 className={styles.skillCategoryTitle}>{category}</h3>
                  {skills.map((skill) => (
                    <div key={skill} className={styles.skillItem}>
                      <input
                        type="checkbox"
                        id={`skill-${skill}`}
                        className={styles.skillCheckbox}
                        checked={selectedSkills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                      />
                      <label htmlFor={`skill-${skill}`} className={styles.skillLabel}>
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Employment Type */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Anställningsform</h2>
            <div className={styles.radioGroup}>
              <div className={styles.radioItem}>
                <input
                  type="radio"
                  id="employment-freelancer"
                  name="employmentType"
                  className={styles.radio}
                  checked={employmentType === 'freelancer'}
                  onChange={() => setEmploymentType('freelancer')}
                />
                <label htmlFor="employment-freelancer" className={styles.radioLabel}>
                  Frilansare/Egenkonsult
                </label>
              </div>
              <div className={styles.radioItem}>
                <input
                  type="radio"
                  id="employment-employed"
                  name="employmentType"
                  className={styles.radio}
                  checked={employmentType === 'employed'}
                  onChange={() => setEmploymentType('employed')}
                />
                <label htmlFor="employment-employed" className={styles.radioLabel}>
                  Anställd på konsultbolag
                </label>
              </div>
            </div>
            
            {employmentType === 'freelancer' && (
              <div className={styles.conditionalFields}>
                <div className={styles.fieldGrid}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Företagsnamn</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ditt företagsnamn"
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Organisationsnummer</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={orgNumber}
                      onChange={(e) => setOrgNumber(e.target.value)}
                      placeholder="XXXXXX-XXXX"
                    />
                  </div>
                </div>
              </div>
            )}

            {employmentType === 'employed' && (
              <div className={styles.conditionalFields}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Konsultbolagets namn</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={consultingCompanyName}
                    onChange={(e) => setConsultingCompanyName(e.target.value)}
                    placeholder="Namnet på konsultbolaget du är anställd hos"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Education */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Utbildning</h2>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Har du eftergymnasial utbildning?</label>
              <div className={styles.radioGroup}>
                <div className={styles.radioItem}>
                  <input
                    type="radio"
                    id="education-yes"
                    name="hasEducation"
                    className={styles.radio}
                    checked={hasEducation === true}
                    onChange={() => setHasEducation(true)}
                  />
                  <label htmlFor="education-yes" className={styles.radioLabel}>Ja</label>
                </div>
                <div className={styles.radioItem}>
                  <input
                    type="radio"
                    id="education-no"
                    name="hasEducation"
                    className={styles.radio}
                    checked={hasEducation === false}
                    onChange={() => setHasEducation(false)}
                  />
                  <label htmlFor="education-no" className={styles.radioLabel}>Nej</label>
                </div>
              </div>
            </div>

            {hasEducation && (
              <div className={styles.conditionalFields}>
                <label className={styles.label}>Välj typ av utbildning</label>
                <div className={styles.educationTypes}>
                  {educationTypes.map((type) => {
                    const isSelected = educations.some(e => e.type === type.id);
                    const education = educations.find(e => e.type === type.id);
                    
                    return (
                      <div key={type.id} className={styles.educationTypeBlock}>
                        <div className={styles.checkboxItem}>
                          <input
                            type="checkbox"
                            id={`edu-${type.id}`}
                            className={styles.checkbox}
                            checked={isSelected}
                            onChange={() => handleEducationTypeToggle(type.id)}
                          />
                          <label htmlFor={`edu-${type.id}`} className={styles.checkboxLabel}>
                            {type.label}
                          </label>
                        </div>
                        {isSelected && education && (
                          <div className={styles.educationDetails}>
                            <div className={styles.fieldGroup}>
                              <label className={styles.label}>Inriktning</label>
                              <input
                                type="text"
                                className={styles.input}
                                value={education.field}
                                onChange={(e) => handleEducationFieldChange(type.id, 'field', e.target.value)}
                                placeholder="T.ex. Datateknik, Systemvetenskap"
                              />
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.label}>Lärosäte</label>
                              <input
                                type="text"
                                className={styles.input}
                                value={education.institution}
                                onChange={(e) => handleEducationFieldChange(type.id, 'institution', e.target.value)}
                                placeholder="T.ex. KTH, Stockholms universitet"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Other */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Övrigt</h2>
            <div className={styles.otherGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Tillgänglig från</label>
                <input
                  type="date"
                  className={styles.input}
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Önskat timpris <span className={styles.labelHint}>(visas ej för kunder)</span>
                </label>
                <select
                  className={styles.select}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                >
                  {hourlyRateOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Är du tillgänglig 100%?</label>
                <div className={styles.radioGroup}>
                  <div className={styles.radioItem}>
                    <input
                      type="radio"
                      id="fully-available-yes"
                      name="fullyAvailable"
                      className={styles.radio}
                      checked={isFullyAvailable === true}
                      onChange={() => setIsFullyAvailable(true)}
                    />
                    <label htmlFor="fully-available-yes" className={styles.radioLabel}>Ja</label>
                  </div>
                  <div className={styles.radioItem}>
                    <input
                      type="radio"
                      id="fully-available-no"
                      name="fullyAvailable"
                      className={styles.radio}
                      checked={isFullyAvailable === false}
                      onChange={() => setIsFullyAvailable(false)}
                    />
                    <label htmlFor="fully-available-no" className={styles.radioLabel}>Nej</label>
                  </div>
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Kan arbeta på plats hos kund?</label>
                <div className={styles.radioGroup}>
                  <div className={styles.radioItem}>
                    <input
                      type="radio"
                      id="onsite-yes"
                      name="canWorkOnsite"
                      className={styles.radio}
                      checked={canWorkOnsite === true}
                      onChange={() => setCanWorkOnsite(true)}
                    />
                    <label htmlFor="onsite-yes" className={styles.radioLabel}>Ja</label>
                  </div>
                  <div className={styles.radioItem}>
                    <input
                      type="radio"
                      id="onsite-no"
                      name="canWorkOnsite"
                      className={styles.radio}
                      checked={canWorkOnsite === false}
                      onChange={() => setCanWorkOnsite(false)}
                    />
                    <label htmlFor="onsite-no" className={styles.radioLabel}>Nej</label>
                  </div>
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>LinkedIn</label>
                <input
                  type="url"
                  className={styles.input}
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Portfolio</label>
                <input
                  type="url"
                  className={styles.input}
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
                <label className={styles.label}>Uppladdningar</label>
                <p className={styles.uploadHint}>Ladda upp CV, certifikat och intyg</p>
                <div className={styles.uploadSection}>
                  <div className={styles.uploadButtons}>
                    <button type="button" className={styles.fileButton}>
                      <Upload size={16} />
                      CV
                    </button>
                    <button type="button" className={styles.fileButton}>
                      <Upload size={16} />
                      Certifikat
                    </button>
                    <button type="button" className={styles.fileButton}>
                      <Upload size={16} />
                      Intyg
                    </button>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className={styles.uploadedFilesList}>
                      {uploadedFiles.map((file) => (
                        <div key={file.name} className={styles.uploadedFile}>
                          <span className={styles.uploadedFileName}>{file.name}</span>
                          <span className={styles.uploadedFileType}>
                            {file.type === 'cv' ? 'CV' : file.type === 'certificate' ? 'Certifikat' : 'Intyg'}
                          </span>
                          <button
                            type="button"
                            className={styles.removeFileButton}
                            onClick={() => handleRemoveFile(file.name)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
                <div className={styles.labelWithCounter}>
                  <label className={styles.label}>Övrig information</label>
                  <span className={`${styles.wordCounter} ${wordCount > 500 ? styles.wordCounterExceeded : ''}`}>
                    ({wordCount}/500 ord)
                  </span>
                </div>
                <textarea
                  className={styles.textarea}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Beskriv dig själv, din erfarenhet och vad du söker..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            <X size={16} />
            Avbryt
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            <Save size={16} />
            Spara ändringar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfileEdit;
