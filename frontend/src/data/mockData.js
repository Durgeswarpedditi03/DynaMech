export const quickActions = [
  { title: 'Find a Mechanic', icon: 'Wrench', description: 'Nearby specialists for bikes and cars.', accent: 'orange' },
  { title: 'Vehicle Breakdown', icon: 'CarFront', description: 'Get assistance for sudden breakdowns.', accent: 'red' },
  { title: 'Roadside Assistance', icon: 'MapPinned', description: 'On-site support wherever you are.', accent: 'gold' },
  { title: 'Battery Issue', icon: 'BatteryCharging', description: 'Jump start and charging support.', accent: 'cyan' },
  { title: 'Tyre Problem', icon: 'CircleDotDashed', description: 'Tire replacement and puncture support.', accent: 'amber' },
  { title: 'Electrical Problem', icon: 'Zap', description: 'Electrical diagnostics and repair.', accent: 'violet' }
];

export const processSteps = [
  { number: '01', title: 'Report Problem', text: 'Tell us what happened to your vehicle.', icon: 'ClipboardList' },
  { number: '02', title: 'Share Location', text: 'Let us know where your vehicle is located.', icon: 'MapPin' },
  { number: '03', title: 'Find Suitable Mechanic', text: 'We match you with available mechanics based on skills, location and reliability.', icon: 'SearchCheck' },
  { number: '04', title: 'Get Vehicle Repaired', text: 'The mechanic reaches you and resolves the problem.', icon: 'ShieldCheck' }
];

export const problemCategories = [
  { name: 'Engine', icon: 'Gauge' },
  { name: 'Brakes', icon: 'Disc3' },
  { name: 'Battery', icon: 'BatteryCharging' },
  { name: 'Tyres', icon: 'Tyre' },
  { name: 'Electrical', icon: 'Zap' },
  { name: 'Chain', icon: 'Link2' },
  { name: 'Clutch', icon: 'Cog' },
  { name: 'Transmission', icon: 'Cpu' },
  { name: 'Suspension', icon: 'ArrowUpDown' },
  { name: 'Cooling', icon: 'Thermometer' },
  { name: 'Other', icon: 'Sparkles' }
];

export const mechanics = [
  { id: 1, name: 'Arjun Kumar', verified: true, skills: ['Bike', 'Scooter', 'Motorcycle'], vehicleTypes: ['Bike', 'Scooter', 'Motorcycle'], distance: '2.4 km', rating: 4.8, jobs: 142, available: true, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Rohit Sharma', verified: true, skills: ['Car', 'SUV', 'Electrical'], vehicleTypes: ['Car', 'SUV'], distance: '4.1 km', rating: 4.9, jobs: 230, available: true, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Nikhil Verma', verified: false, skills: ['Tyres', 'Suspension', 'Brakes'], vehicleTypes: ['Bike', 'Car'], distance: '5.7 km', rating: 4.6, jobs: 98, available: false, avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80' }
];

export const spareParts = [
  { id: 1, name: 'Premium Bike Brake Pad', category: 'Brake Parts', price: 899, inStock: true, rating: 4.8, compatibility: 'Honda / Yamaha / Bajaj', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Engine Oil Pro 4T', category: 'Engine Parts', price: 650, inStock: true, rating: 4.7, compatibility: 'TVS / Royal Enfield / KTM', image: 'https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'High Flow Air Filter', category: 'Filters', price: 540, inStock: true, rating: 4.9, compatibility: 'Bajaj / Hero / Honda', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Motorcycle Battery 12V', category: 'Battery', price: 3200, inStock: false, rating: 4.6, compatibility: 'All commuter bikes', image: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Drive Chain Kit', category: 'Chain & Sprocket', price: 1499, inStock: true, rating: 4.8, compatibility: 'Royal Enfield / Bajaj / Honda', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Suspension Front Fork', category: 'Suspension', price: 4200, inStock: true, rating: 4.7, compatibility: 'Hero / Honda / Yamaha', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=85' }
];

export const vehicleTypes = ['Bike', 'Scooter', 'Car', 'SUV', 'Truck'];

export const adminStats = [
  { label: 'Total Customers', value: '18.4K' },
  { label: 'Total Mechanics', value: '1.2K' },
  { label: 'Active Requests', value: '238' },
  { label: 'Completed Services', value: '9.8K' },
  { label: 'Spare Parts Orders', value: '3.6K' },
  { label: 'Revenue', value: '₹42L' }
];

export const serviceTimeline = ['Request Created', 'Mechanic Searching', 'Mechanic Assigned', 'Mechanic On The Way', 'Repair Started', 'Completed'];

export const cartItems = [
  { id: 1, name: 'Premium Bike Brake Pad', quantity: 1, price: 899 },
  { id: 2, name: 'Engine Oil Pro 4T', quantity: 2, price: 650 }
];
