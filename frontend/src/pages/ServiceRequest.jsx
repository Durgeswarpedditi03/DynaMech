import { useState } from 'react';
import { MapPin, UploadCloud } from 'lucide-react';

const initialForm = {
  vehicle: 'Royal Enfield Classic 350',
  category: 'Engine',
  issue: 'Bike won\'t start and makes a clicking sound.',
  location: 'HSR Layout, Bengaluru',
  urgency: 'Urgent'
};

const vehicleProblemCategories = {
  cycle: ['Brakes', 'Tyres', 'Chain', 'Gears', 'Pedals', 'Frame', 'Other'],
  bike: ['Engine', 'Brakes', 'Battery', 'Tyres', 'Chain', 'Clutch', 'Electrical', 'Suspension', 'Other'],
  car: ['Engine', 'Brakes', 'Battery', 'Tyres', 'Electrical', 'Transmission', 'Suspension', 'Cooling', 'AC', 'Other'],
  truck: ['Engine', 'Brakes', 'Battery', 'Tyres', 'Electrical', 'Transmission', 'Suspension', 'Cooling', 'Other'],
  default: ['Engine', 'Brakes', 'Battery', 'Tyres', 'Electrical', 'Other']
};

function getVehicleType(vehicleName) {
  const name = vehicleName.toLowerCase();
  if (/(cycle|bicycle)/.test(name)) return 'cycle';
  if (/(bike|motorcycle|scooter|scooty|moped|royal enfield|ktm|yamaha|bajaj|hero|honda cb)/.test(name)) return 'bike';
  if (/(car|sedan|hatchback|suv|van|jeep)/.test(name)) return 'car';
  if (/(truck|lorry|pickup)/.test(name)) return 'truck';
  return 'default';
}

export default function ServiceRequest() {
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState('');
  const vehicleType = getVehicleType(form.vehicle);
  const categories = vehicleProblemCategories[vehicleType];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => {
      if (name !== 'vehicle') return { ...current, [name]: value };

      const nextCategories = vehicleProblemCategories[getVehicleType(value)];
      return {
        ...current,
        vehicle: value,
        category: nextCategories.includes(current.category) ? current.category : nextCategories[0]
      };
    });
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
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            <small className="field-hint">Showing common problems for {vehicleType === 'default' ? 'this vehicle' : `${vehicleType}s`}.</small>
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
