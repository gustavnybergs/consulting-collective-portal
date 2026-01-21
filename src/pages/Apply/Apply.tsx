import { useState } from 'react';
import { Check, Upload, Plus, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout/DashboardLayout';
import styles from './Apply.module.css';

const STEPS = [
  { number: 1, label: 'Personuppgifter' },
  { number: 2, label: 'Roll & Erfarenhet' },
  { number: 3, label: 'Skills' },
  { number: 4, label: 'Referenser' },
  { number: 5, label: 'Övrigt' },
];

const ROLE_CATEGORIES = {
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

const SKILL_CATEGORIES = {
  'Frontend': ['React', 'TypeScript', 'JavaScript', 'Vue', 'Angular', 'HTML/CSS', 'Next.js', 'Tailwind', 'Redux', 'Svelte'],
  'Backend': ['Java', 'C#/.NET', 'Python', 'Node.js', 'Go', 'Kotlin', 'PHP', 'Ruby', 'Spring Boot', 'Express'],
  'Databas': ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Oracle', 'SQL Server', 'Firebase'],
  'DevOps & Cloud': ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins', 'GitHub Actions'],
  'Mobil': ['React Native', 'Flutter', 'Swift', 'Kotlin (Android)', 'iOS', 'Android'],
  'Metodik & Verktyg': ['Agile/Scrum', 'Git', 'REST API', 'GraphQL', 'Microservices', 'TDD', 'Jira', 'Figma'],
};

const RELATION_OPTIONS = ['Tidigare chef', 'Kollega', 'Kund', 'Annan'];

interface Reference {
  id: string;
  name: string;
  company: string;
  phone: string;
  relation: string;
}

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Personal info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  // Step 2: Roles with years
  const [selectedRoles, setSelectedRoles] = useState<Record<string, number>>({});
  const [customRole, setCustomRole] = useState('');

  // Step 3: Skills
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const [customSkill, setCustomSkill] = useState('');

  // Step 4: References
  const [references, setReferences] = useState<Reference[]>([
    { id: '1', name: '', company: '', phone: '', relation: '' },
  ]);

  // Step 5: Other
  const [availableFrom, setAvailableFrom] = useState('');
  const [desiredScope, setDesiredScope] = useState<Set<string>>(new Set());
  const [distancePreference, setDistancePreference] = useState('');
  const [securityClearance, setSecurityClearance] = useState('');
  const [securityLevel, setSecurityLevel] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Just log for now
    console.log('Form submitted!', {
      firstName, lastName, email, phone, city,
      selectedRoles, selectedSkills: Array.from(selectedSkills),
      references, availableFrom, desiredScope: Array.from(desiredScope),
      distancePreference, securityClearance, securityLevel,
      hourlyRate, linkedIn, cvFile, description,
    });
    alert('Ansökan skickad!');
  };

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) => {
      const next = { ...prev };
      if (next[role] !== undefined) {
        delete next[role];
      } else {
        next[role] = 0;
      }
      return next;
    });
  };

  const updateRoleYears = (role: string, years: number) => {
    setSelectedRoles((prev) => ({ ...prev, [role]: years }));
  };

  const addCustomRole = () => {
    if (customRole.trim() && !selectedRoles[customRole.trim()]) {
      setSelectedRoles((prev) => ({ ...prev, [customRole.trim()]: 0 }));
      setCustomRole('');
    }
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(skill)) {
        next.delete(skill);
      } else {
        next.add(skill);
      }
      return next;
    });
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.has(customSkill.trim())) {
      setSelectedSkills((prev) => new Set(prev).add(customSkill.trim()));
      setCustomSkill('');
    }
  };

  const addReference = () => {
    setReferences((prev) => [
      ...prev,
      { id: Date.now().toString(), name: '', company: '', phone: '', relation: '' },
    ]);
  };

  const removeReference = (id: string) => {
    setReferences((prev) => prev.filter((ref) => ref.id !== id));
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    setReferences((prev) =>
      prev.map((ref) => (ref.id === id ? { ...ref, [field]: value } : ref))
    );
  };

  const toggleScope = (scope: string) => {
    setDesiredScope((prev) => {
      const next = new Set(prev);
      if (next.has(scope)) {
        next.delete(scope);
      } else {
        next.add(scope);
      }
      return next;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const renderProgressIndicator = () => (
    <div className={styles.progressContainer}>
      {STEPS.map((step, index) => (
        <div key={step.number} className={styles.progressStep}>
          <div
            className={`${styles.stepCircle} ${
              currentStep === step.number
                ? styles.stepCircleActive
                : currentStep > step.number
                ? styles.stepCircleCompleted
                : styles.stepCircleInactive
            }`}
          >
            {currentStep > step.number ? <Check size={16} /> : step.number}
          </div>
          <span
            className={`${styles.stepLabel} ${
              currentStep === step.number ? styles.stepLabelActive : ''
            }`}
          >
            {step.label}
          </span>
          {index < STEPS.length - 1 && (
            <div
              className={`${styles.stepConnector} ${
                currentStep > step.number ? styles.stepConnectorActive : ''
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <>
      <h2 className={styles.stepTitle}>Personuppgifter</h2>
      <div className={`${styles.formGrid} ${styles.formGridTwo}`}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Förnamn</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Ditt förnamn"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Efternamn</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Ditt efternamn"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>E-post</label>
          <input
            type="email"
            className={styles.formInput}
            placeholder="din@email.se"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Telefon</label>
          <input
            type="tel"
            className={styles.formInput}
            placeholder="070 123 45 67"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Ort</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Stockholm"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h2 className={styles.stepTitle}>Roll & Erfarenhet</h2>
      {Object.entries(ROLE_CATEGORIES).map(([category, roles]) => (
        <div key={category} className={styles.sectionGroup}>
          <div className={styles.sectionLabel}>{category}</div>
          <div className={styles.formGrid}>
            {roles.map((role) => {
              const isSelected = selectedRoles[role] !== undefined;
              return (
                <div
                  key={role}
                  className={`${styles.roleItem} ${isSelected ? styles.roleItemSelected : ''}`}
                >
                  <div className={styles.roleHeader} onClick={() => toggleRole(role)}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={isSelected}
                      onChange={() => toggleRole(role)}
                    />
                    <span className={styles.checkboxLabel}>{role}</span>
                  </div>
                  {isSelected && (
                    <div className={styles.yearsInput}>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        className={styles.yearsInputField}
                        placeholder="0"
                        value={selectedRoles[role] || ''}
                        onChange={(e) => updateRoleYears(role, parseInt(e.target.value) || 0)}
                      />
                      <span className={styles.yearsLabel}>års erfarenhet</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className={styles.customInputRow}>
        <div className={`${styles.formGroup} ${styles.customInput}`}>
          <label className={styles.formLabel}>Hittar du inte din roll? Lägg till här</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="T.ex. AI Engineer"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
          />
        </div>
        <button className={styles.addButton} onClick={addCustomRole}>
          Lägg till
        </button>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <h2 className={styles.stepTitle}>Skills</h2>
      <div className={styles.skillsCounter}>
        Valda: {selectedSkills.size}
      </div>
      {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
        <div key={category} className={styles.sectionGroup}>
          <div className={styles.sectionLabel}>{category}</div>
          <div className={styles.checkboxGrid}>
            {skills.map((skill) => {
              const isSelected = selectedSkills.has(skill);
              return (
                <div
                  key={skill}
                  className={`${styles.checkboxItem} ${isSelected ? styles.checkboxItemSelected : ''}`}
                  onClick={() => toggleSkill(skill)}
                >
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={isSelected}
                    onChange={() => toggleSkill(skill)}
                  />
                  <span className={styles.checkboxLabel}>{skill}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className={styles.customInputRow}>
        <div className={`${styles.formGroup} ${styles.customInput}`}>
          <label className={styles.formLabel}>Saknas något? Lägg till här</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="T.ex. Rust"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
          />
        </div>
        <button className={styles.addButton} onClick={addCustomSkill}>
          Lägg till
        </button>
      </div>
    </>
  );

  const renderStep4 = () => (
    <>
      <h2 className={styles.stepTitle}>Referenser</h2>
      {references.map((ref, index) => (
        <div key={ref.id} className={styles.referenceCard}>
          <div className={styles.referenceHeader}>
            <span className={styles.referenceTitle}>Referens {index + 1}</span>
            {references.length > 1 && (
              <button className={styles.removeButton} onClick={() => removeReference(ref.id)}>
                <Trash2 size={14} /> Ta bort
              </button>
            )}
          </div>
          <div className={`${styles.formGrid} ${styles.formGridTwo}`}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Namn</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Referensens namn"
                value={ref.name}
                onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Företag</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Företagsnamn"
                value={ref.company}
                onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Telefon</label>
              <input
                type="tel"
                className={styles.formInput}
                placeholder="070 123 45 67"
                value={ref.phone}
                onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Relation</label>
              <select
                className={styles.formSelect}
                value={ref.relation}
                onChange={(e) => updateReference(ref.id, 'relation', e.target.value)}
              >
                <option value="">Välj relation</option>
                {RELATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
      <button className={styles.addReferenceButton} onClick={addReference}>
        <Plus size={18} /> Lägg till referens
      </button>
    </>
  );

  const renderStep5 = () => (
    <>
      <h2 className={styles.stepTitle}>Övrigt</h2>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tillgänglig från</label>
          <input
            type="date"
            className={styles.formInput}
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
          />
        </div>

        <div className={styles.sectionGroup}>
          <div className={styles.sectionLabel}>Önskad omfattning</div>
          <div className={styles.radioGroup}>
            {['25-50%', '50-75%', '75-100%', '100%'].map((scope) => {
              const isSelected = desiredScope.has(scope);
              return (
                <div
                  key={scope}
                  className={`${styles.checkboxItem} ${isSelected ? styles.checkboxItemSelected : ''}`}
                  onClick={() => toggleScope(scope)}
                >
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={isSelected}
                    onChange={() => toggleScope(scope)}
                  />
                  <span className={styles.checkboxLabel}>{scope}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.sectionGroup}>
          <div className={styles.sectionLabel}>Distans</div>
          <div className={styles.radioGroup}>
            {['På plats', 'Hybrid', 'Remote'].map((option) => (
              <div
                key={option}
                className={`${styles.radioItem} ${distancePreference === option ? styles.radioItemSelected : ''}`}
                onClick={() => setDistancePreference(option)}
              >
                <input
                  type="radio"
                  name="distance"
                  className={styles.radio}
                  checked={distancePreference === option}
                  onChange={() => setDistancePreference(option)}
                />
                <span className={styles.radioLabel}>{option}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sectionGroup}>
          <div className={styles.sectionLabel}>Säkerhetsprövning</div>
          <div className={styles.radioGroup}>
            {['Nej', 'Ja'].map((option) => (
              <div
                key={option}
                className={`${styles.radioItem} ${securityClearance === option ? styles.radioItemSelected : ''}`}
                onClick={() => {
                  setSecurityClearance(option);
                  if (option === 'Nej') setSecurityLevel('');
                }}
              >
                <input
                  type="radio"
                  name="security"
                  className={styles.radio}
                  checked={securityClearance === option}
                  onChange={() => {
                    setSecurityClearance(option);
                    if (option === 'Nej') setSecurityLevel('');
                  }}
                />
                <span className={styles.radioLabel}>{option}</span>
              </div>
            ))}
          </div>
          {securityClearance === 'Ja' && (
            <div className={styles.nestedRadioGroup}>
              <div className={styles.nestedLabel}>Vilken nivå?</div>
              <div className={styles.radioGroup}>
                {['Nivå 1', 'Nivå 2', 'Nivå 3'].map((level) => (
                  <div
                    key={level}
                    className={`${styles.radioItem} ${securityLevel === level ? styles.radioItemSelected : ''}`}
                    onClick={() => setSecurityLevel(level)}
                  >
                    <input
                      type="radio"
                      name="securityLevel"
                      className={styles.radio}
                      checked={securityLevel === level}
                      onChange={() => setSecurityLevel(level)}
                    />
                    <span className={styles.radioLabel}>{level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Önskat timpris (SEK)</label>
          <input
            type="number"
            className={styles.formInput}
            placeholder="T.ex. 950"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
          />
          <span className={styles.formNote}>Visas ej för kunder</span>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>LinkedIn</label>
          <input
            type="url"
            className={styles.formInput}
            placeholder="https://linkedin.com/in/ditt-namn"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>CV</label>
          <div className={styles.fileUpload}>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className={styles.fileInput}
              onChange={handleFileChange}
            />
            <Upload className={styles.fileUploadIcon} />
            <span className={styles.fileUploadText}>
              Dra och släpp eller klicka för att ladda upp
            </span>
            <span className={styles.fileUploadHint}>PDF, DOC eller DOCX</span>
            {cvFile && <span className={styles.fileName}>{cvFile.name}</span>}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Kort beskrivning</label>
          <textarea
            className={`${styles.formInput} ${styles.formTextarea}`}
            placeholder="Beskriv kort din erfarenhet och vad du söker..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Ansök som konsult</h1>
          <p className={styles.subtitle}>Fyll i formuläret för att gå med i vårt nätverk</p>
        </div>

        {renderProgressIndicator()}

        <div className={styles.formCard}>
          {renderCurrentStep()}

          <div className={styles.formNavigation}>
            {currentStep > 1 ? (
              <button className={`${styles.navButton} ${styles.navButtonBack}`} onClick={handleBack}>
                Tillbaka
              </button>
            ) : (
              <div className={styles.spacer} />
            )}

            {currentStep < 5 ? (
              <button className={`${styles.navButton} ${styles.navButtonNext}`} onClick={handleNext}>
                Nästa
              </button>
            ) : (
              <button className={`${styles.navButton} ${styles.navButtonSubmit}`} onClick={handleSubmit}>
                Skicka ansökan
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
