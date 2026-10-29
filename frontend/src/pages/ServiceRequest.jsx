import { useEffect, useRef, useState } from 'react';
import { ChevronDown, MapPin, UploadCloud } from 'lucide-react';
import { api } from '../services/api';

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

const vehicleTypes = [
  { value: 'cycle', label: 'Cycle' },
  { value: 'bike', label: 'Bike' },
  { value: 'car', label: 'Car' }
];

function SearchSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const selectRef = useRef(null);
  const selectedOption = options.find((option) => (typeof option === 'string' ? option : option.value) === value);
  const selectedLabel = typeof selectedOption === 'string' ? selectedOption : selectedOption?.label || value;
  const filteredOptions = options.filter((option) => {
    const optionLabel = typeof option === 'string' ? option : option.label;
    return optionLabel.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!selectRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const handleSelect = (option) => {
    onChange(typeof option === 'string' ? option : option.value);
    setQuery('');
    setOpen(false);
  };

  return (
    <div className="search-select" ref={selectRef}>
      <span>{label}</span>
      <button type="button" className="search-select-trigger" onClick={() => setOpen((current) => !current)} aria-expanded={open}>
        <span>{selectedLabel}</span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="search-select-menu">
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Type ${label.toLowerCase()}`} />
          <div className="search-select-options">
            {filteredOptions.length ? filteredOptions.map((option) => {
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionLabel = typeof option === 'string' ? option : option.label;
              return <button type="button" key={optionValue} onClick={() => handleSelect(option)}>{optionLabel}</button>;
            }) : <span className="search-select-empty">No related options</span>}
          </div>
        </div>
      )}
    </div>
  );
}

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
  const [problemImage, setProblemImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const vehicleType = getVehicleType(form.vehicleType);
  const categories = vehicleProblemCategories[vehicleType];

  const updateField = (name, value) => {
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

      if (name === 'customModel') return { ...current, customModel: value, vehicle: value };

      if (name !== 'vehicle') return { ...current, [name]: value };

      const nextCategories = vehicleProblemCategories[getVehicleType(value)];
      return {
        ...current,
        vehicle: value,
        category: nextCategories.includes(current.category) ? current.category : nextCategories[0]
      };
    });
  };

  const handleChange = (event) => updateField(event.target.name, event.target.value);

  const handleImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Please choose an image smaller than 5 MB.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = String(reader.result);
      setPreview(image);
      setProblemImage(image);
      setError('');
    };
    reader.onerror = () => setError('Unable to read the selected image.');
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await api.submitServiceRequest({
        vehicle: vehicleType === 'cycle' ? 'Cycle' : form.vehicle,
        vehicleType: vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1),
        category: form.category,
        problem: form.issue,
        urgency: form.urgency,
        location: form.location,
        problemImages: problemImage ? [problemImage] : []
      });
      setSuccess('Your request was submitted. You can track it from your dashboard.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-shell">
      <div className="section-heading">
        <div className="eyebrow">Service request</div>
        <h2>Request assistance</h2>
      </div>

      <div className="request-layout">
        <form className="request-form auth-form" onSubmit={handleSubmit}>
          <label>
            <SearchSelect label="Vehicle type" value={vehicleType} options={vehicleTypes} onChange={(value) => updateField('vehicleType', value)} />
          </label>
          {(vehicleType === 'bike' || vehicleType === 'car') && (
            <label>
              <SearchSelect label="Company or model" value={form.vehicleModel} options={vehicleModels[vehicleType]} onChange={(value) => updateField('vehicleModel', value)} />
            </label>
          )}
          {form.vehicleModel === 'Other / Enter manually' && (
            <label>
              <span>Vehicle model</span>
              <input name="customModel" value={form.customModel} onChange={handleChange} required />
            </label>
          )}
          <label>
            <SearchSelect label="Problem category" value={form.category} options={categories} onChange={(value) => updateField('category', value)} />
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
          {error && <p className="form-error" role="alert">{error}</p>}
          {success && <p role="status">{success}</p>}
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Submitting request...' : 'Find a Mechanic'}</button>
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
