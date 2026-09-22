import { useState } from 'react';
import { MapPin, UploadCloud } from 'lucide-react';

const initialForm = {
  vehicleType: 'bike',
  vehicleModel: 'Royal Enfield Classic 350',
  customModel: '',
  vehicle: 'Royal Enfield Classic 350',
  category: 'Engine',
  issue: 'Bike won\'t start and makes a clicking sound.',
  location: 'HSR Layout, Bengaluru',
  urgency: 'Urgent'
};

const vehicleModels = {
  bike: [
    'Hero Splendor', 'Hero Passion', 'Hero Xtreme', 'Honda Activa', 'Honda Shine', 'Honda Unicorn',
    'TVS Apache', 'TVS Jupiter', 'TVS Raider', 'Bajaj Pulsar', 'Bajaj Platina', 'Bajaj Avenger',
    'Royal Enfield Classic 350', 'Royal Enfield Hunter 350', 'Royal Enfield Bullet', 'Royal Enfield Himalayan',
    'Yamaha FZ', 'Yamaha R15', 'Yamaha MT-15', 'KTM Duke', 'KTM RC', 'Suzuki Access', 'Suzuki Gixxer',
    'Jawa', 'Yezdi', 'Triumph', 'Harley-Davidson', 'BMW Motorrad', 'Ducati', 'Aprilia', 'Vespa',
    'Ola Electric', 'Ather', 'Revolt', 'Husqvarna', 'Ultraviolette', 'Other / Enter manually'
  ],
  car: [
    'Maruti Suzuki Swift', 'Maruti Suzuki Baleno', 'Maruti Suzuki Brezza', 'Hyundai i20', 'Hyundai Creta',
    'Hyundai Venue', 'Tata Nexon', 'Tata Punch', 'Tata Harrier', 'Mahindra Scorpio', 'Mahindra Thar',
    'Mahindra XUV700', 'Honda City', 'Honda Amaze', 'Toyota Innova', 'Toyota Fortuner', 'Kia Seltos',
    'Kia Sonet', 'Volkswagen Virtus', 'Volkswagen Taigun', 'Skoda Slavia', 'Skoda Kushaq', 'Renault Kwid',
    'Renault Duster', 'Nissan Magnite', 'MG Astor', 'MG Hector', 'Jeep Compass', 'Ford EcoSport',
    'BMW', 'Mercedes-Benz', 'Audi', 'Volvo', 'Other / Enter manually'
  ]
};

const vehicleProblemCategories = {
  cycle: ['Brakes', 'Tyres', 'Chain', 'Gears', 'Pedals', 'Frame', 'Other'],
  bike: ['Engine', 'Brakes', 'Battery', 'Tyres', 'Chain', 'Clutch', 'Electrical', 'Suspension', 'Other'],
  car: ['Engine', 'Brakes', 'Battery', 'Tyres', 'Electrical', 'Transmission', 'Suspension', 'Cooling', 'AC', 'Other'],
  truck: ['Engine', 'Brakes', 'Battery', 'Tyres', 'Electrical', 'Transmission', 'Suspension', 'Cooling', 'Other'],
  default: ['Engine', 'Brakes', 'Battery', 'Tyres', 'Electrical', 'Other']
};

const vehicleTypes = ['Cycle', 'Bike', 'Car'];

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
  const vehicleType = getVehicleType(form.vehicleType);
  const categories = vehicleProblemCategories[vehicleType];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => {
      if (name === 'vehicleType') {
        const nextType = getVehicleType(value);
        const nextModel = vehicleModels[nextType]?.[0] || '';
        return { ...current, vehicleType: value, vehicleModel: nextModel, customModel: '', vehicle: nextType === 'cycle' ? value : nextModel, category: vehicleProblemCategories[nextType][0] };
      }

      if (name === 'vehicleModel') {
        const nextVehicle = value;
        const nextCategories = vehicleProblemCategories[getVehicleType(current.vehicleType)];
        return { ...current, vehicleModel: value, vehicle: nextVehicle, category: nextCategories.includes(current.category) ? current.category : nextCategories[0] };
      }

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
            <span>Vehicle type</span>
            <input name="vehicleType" list="vehicle-types" value={form.vehicleType} onChange={handleChange} placeholder="Type or select cycle, bike, or car" />
            <datalist id="vehicle-types">
              {vehicleTypes.map((type) => <option key={type} value={type} />)}
            </datalist>
          </label>
          {(vehicleType === 'bike' || vehicleType === 'car') && (
            <label>
              <span>Company or model</span>
              <input name="vehicleModel" list={`${vehicleType}-models`} value={form.vehicleModel} onChange={handleChange} placeholder={`Type your ${vehicleType} company or model`} />
              <datalist id={`${vehicleType}-models`}>
                {vehicleModels[vehicleType].map((model) => <option key={model} value={model} />)}
              </datalist>
              <small className="field-hint">Start typing for suggestions, or enter any company and model.</small>
            </label>
          )}
          <label>
            <span>Problem category</span>
            <input name="category" list="problem-categories" value={form.category} onChange={handleChange} placeholder="Type or select a problem" />
            <datalist id="problem-categories">
              {categories.map((category) => <option key={category} value={category} />)}
            </datalist>
            <small className="field-hint">Suggestions are based on your {vehicleType === 'default' ? 'vehicle' : vehicleType}.</small>
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
