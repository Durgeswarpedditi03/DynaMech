import { useState } from 'react';
import { MapPin, UploadCloud } from 'lucide-react';

const initialForm = {
  vehicle: 'Royal Enfield Classic 350',
  category: 'Engine',
  issue: 'Bike won\'t start and makes a clicking sound.',
  location: 'HSR Layout, Bengaluru',
  urgency: 'Urgent'
};

export default function ServiceRequest() {
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState('');

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <section className="section-shell">
      <div className="section-heading">
        <div className="eyebrow">Service request</div>
        <h2>Request assistance</h2>
      </div>

      <div className="request-layout">
        <form className="request-form auth-form">
          <label>
            <span>Select vehicle</span>
            <input name="vehicle" value={form.vehicle} onChange={handleChange} />
          </label>
          <label>
            <span>Problem category</span>
            <select name="category" value={form.category} onChange={handleChange}>
              <option>Engine</option>
              <option>Brakes</option>
              <option>Battery</option>
              <option>Electrical</option>
              <option>Tyres</option>
              <option>Chain</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            <span>Problem description</span>
            <textarea rows="4" name="issue" value={form.issue} onChange={handleChange} />
          </label>
          <label className="upload-box">
            <span>Upload image</span>
            <input type="file" accept="image/*" onChange={handleImage} />
            <div className="upload-row"><UploadCloud size={18} /> Attach a photo</div>
          </label>
          {preview && <img src={preview} alt="Problem preview" className="image-preview" />}
          <label>
            <span>Current location</span>
            <input name="location" value={form.location} onChange={handleChange} />
          </label>
          <label>
            <span>Urgency</span>
            <select name="urgency" value={form.urgency} onChange={handleChange}>
              <option>Routine</option>
              <option>Urgent</option>
              <option>Critical</option>
            </select>
          </label>
          <button type="submit" className="btn btn-primary">Find a Mechanic</button>
        </form>

        <div className="map-panel">
          <div className="map-header"><MapPin size={18} /> Live location check</div>
          <div className="map-visual">
            <div className="map-dot" />
            <div className="map-pin" />
          </div>
          <p>We use your selected location to match you with nearby mechanics with the right expertise.</p>
        </div>
      </div>
    </section>
  );
}
