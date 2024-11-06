import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserPlus } from 'lucide-react';
import VolunteerCard from '../components/volunteers/VolunteerCard';
import RegistrationForm from '../components/volunteers/RegistrationForm';
import SearchBar from '../components/volunteers/SearchBar';
import { Volunteer } from '../types/volunteer';

const INITIAL_VOLUNTEERS: Volunteer[] = [
  {
    id: 1,
    name: "John Doe",
    age: 28,
    gender: "Male",
    email: "john@example.com",
    phone: "123-456-7890",
    location: "New York",
    skills: ["First Aid", "Search and Rescue"]
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    email: "jane@example.com",
    phone: "098-765-4321",
    location: "Los Angeles",
    skills: ["Medical", "Emergency Response"]
  }
];

const VolunteerDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [localVolunteers, setLocalVolunteers] = useState<Volunteer[]>(() => {
    const saved = localStorage.getItem('volunteers');
    return saved ? JSON.parse(saved) : INITIAL_VOLUNTEERS;
  });
  const queryClient = useQueryClient();

  const { isLoading } = useQuery<Volunteer[]>({
    queryKey: ['volunteers'],
    queryFn: async () => localVolunteers,
    initialData: localVolunteers
  });

  const addVolunteerMutation = useMutation({
    mutationFn: (newVolunteer: Omit<Volunteer, 'id'>) => {
      const volunteer = {
        ...newVolunteer,
        id: localVolunteers.length + 1
      };
      const updatedVolunteers = [...localVolunteers, volunteer];
      setLocalVolunteers(updatedVolunteers);
      localStorage.setItem('volunteers', JSON.stringify(updatedVolunteers));
      return Promise.resolve(volunteer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteers'] });
      setShowRegistrationForm(false);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    const newVolunteer = {
      name: formData.get('name') as string,
      age: parseInt(formData.get('age') as string),
      gender: formData.get('gender') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      skills: (formData.get('skills') as string).split(',').map(skill => skill.trim()),
    };
    
    addVolunteerMutation.mutate(newVolunteer);
    form.reset();
  };

  const filteredVolunteers = localVolunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = locationSearch === '' ||
      volunteer.location.toLowerCase().includes(locationSearch.toLowerCase());
    
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Volunteer Database</h1>
          <p className="text-gray-600">Connect with skilled volunteers ready to help in emergencies</p>
        </div>
        <button
          onClick={() => setShowRegistrationForm(!showRegistrationForm)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center shadow-md hover:shadow-lg"
        >
          <UserPlus className="mr-2" size={20} />
          {showRegistrationForm ? 'Close Form' : 'Register as Volunteer'}
        </button>
      </div>

      {showRegistrationForm && (
        <div className="mb-8">
          <RegistrationForm onSubmit={handleSubmit} />
        </div>
      )}

      <div className="mb-8">
        <SearchBar
          searchTerm={searchTerm}
          locationSearch={locationSearch}
          onSearchChange={setSearchTerm}
          onLocationChange={setLocationSearch}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVolunteers.map((volunteer) => (
              <VolunteerCard key={volunteer.id} volunteer={volunteer} />
            ))}
          </div>

          {filteredVolunteers.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-md border border-indigo-50">
              <p className="text-gray-500 text-lg">No volunteers found matching your search criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VolunteerDatabase;