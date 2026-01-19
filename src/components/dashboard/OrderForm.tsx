import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Order } from '@/data/mockData';

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">
            {order ? 'Ändra beställning' : 'Ny beställning'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Typ av konsult */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Typ av konsult <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="input-field"
              placeholder="T.ex. Projektledare, Utvecklare..."
              required
            />
          </div>

          {/* Beskrivning */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Beskrivning / Skall- och börkrav
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field min-h-[100px] resize-y"
              placeholder="Beskriv behov och krav..."
            />
          </div>

          {/* Omfattning & Distans */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Omfattning <span className="text-destructive">*</span>
              </label>
              <select
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                className="input-field"
                required
              >
                <option value="">Välj...</option>
                {scopeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Distans <span className="text-destructive">*</span>
              </label>
              <select
                value={formData.distance}
                onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                className="input-field"
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
            <label className="block text-sm font-medium mb-1">
              Timpris (SEK) <span className="text-destructive">*</span>
            </label>
            <input
              type="number"
              value={formData.hourlyRate}
              onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
              className="input-field"
              placeholder="T.ex. 1200"
              required
            />
          </div>

          {/* Datum */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start <span className="text-destructive">*</span>
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Slut <span className="text-destructive">*</span>
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Bifoga fil */}
          <div>
            <label className="block text-sm font-medium mb-1">Bifoga fil</label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Klicka för att ladda upp eller dra och släpp
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Alla filtyper
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Avbryt
            </button>
            <button type="submit" className="btn-primary flex-1">
              Skicka
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
