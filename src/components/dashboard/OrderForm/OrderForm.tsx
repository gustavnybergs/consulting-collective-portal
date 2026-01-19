import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Order } from '@/data/mockData';
import styles from './OrderForm.module.css';

interface OrderFormProps {
  order?: Order | null;
  onClose: () => void;
  onSubmit: (data: Partial<Order>) => void;
}

const scopeOptions = ['25%', '50%', '75%', '80%', '100%'];
const distanceOptions = ['0%', '25%', '50%', '75%', '100%'];

export function OrderForm({ order, onClose, onSubmit }: OrderFormProps) {
  const [formData, setFormData] = useState({
    role: order?.role || '',
    description: order?.description || '',
    scope: order?.scope || '',
    distance: order?.distance || '',
    hourlyRate: order?.hourlyRate?.toString() || '',
    startDate: order?.startDate || '',
    endDate: order?.endDate || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      hourlyRate: parseFloat(formData.hourlyRate),
      currency: 'SEK',
      status: 'pending',
    });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {order ? 'Ändra beställning' : 'Ny beställning'}
          </h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Typ av konsult */}
          <div>
            <label className={styles.label}>
              Typ av konsult <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className={styles.input}
              placeholder="T.ex. Projektledare, Utvecklare..."
              required
            />
          </div>

          {/* Beskrivning */}
          <div>
            <label className={styles.label}>
              Beskrivning / Skall- och börkrav
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={styles.textarea}
              placeholder="Beskriv behov och krav..."
            />
          </div>

          {/* Omfattning & Distans */}
          <div className={styles.row}>
            <div>
              <label className={styles.label}>
                Omfattning <span className={styles.required}>*</span>
              </label>
              <select
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                className={styles.select}
                required
              >
                <option value="">Välj...</option>
                {scopeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={styles.label}>
                Distans <span className={styles.required}>*</span>
              </label>
              <select
                value={formData.distance}
                onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                className={styles.select}
                required
              >
                <option value="">Välj...</option>
                {distanceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Timpris */}
          <div>
            <label className={styles.label}>
              Timpris (SEK) <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              value={formData.hourlyRate}
              onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
              className={styles.input}
              placeholder="T.ex. 1200"
              required
            />
          </div>

          {/* Datum */}
          <div className={styles.row}>
            <div>
              <label className={styles.label}>
                Start <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className={styles.input}
                required
              />
            </div>
            <div>
              <label className={styles.label}>
                Slut <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className={styles.input}
                required
              />
            </div>
          </div>

          {/* Bifoga fil */}
          <div>
            <label className={styles.label}>Bifoga fil</label>
            <div className={styles.uploadZone}>
              <Upload className={styles.uploadIcon} />
              <p className={styles.uploadText}>
                Klicka för att ladda upp eller dra och släpp
              </p>
              <p className={styles.uploadHint}>
                Alla filtyper
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className={styles.buttonRow}>
            <button type="button" onClick={onClose} className={styles.buttonSecondary}>
              Avbryt
            </button>
            <button type="submit" className={styles.buttonPrimary}>
              Skicka
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
