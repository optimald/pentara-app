import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import AdminLayout from '@/components/Admin/AdminLayout';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface Coach {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'COACH';
  createdAt: string;
  lastActive: string;
  profilesCreated: number;
  isActive: boolean;
}

const CoachesPage: NextPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCoachEmail, setNewCoachEmail] = useState('');
  const [newCoachName, setNewCoachName] = useState('');

  // Mock data - in real app, fetch from API
  const [coaches, setCoaches] = useState<Coach[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@pentara.app',
      role: 'COACH',
      createdAt: '2024-01-15',
      lastActive: '2024-01-20',
      profilesCreated: 23,
      isActive: true,
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@pentara.app',
      role: 'COACH',
      createdAt: '2024-01-10',
      lastActive: '2024-01-19',
      profilesCreated: 18,
      isActive: true,
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@pentara.app',
      role: 'ADMIN',
      createdAt: '2024-01-01',
      lastActive: '2024-01-20',
      profilesCreated: 0,
      isActive: true,
    },
  ]);

  const handleAddCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In real app, make API call to create coach
    const newCoach: Coach = {
      id: Date.now().toString(),
      name: newCoachName,
      email: newCoachEmail,
      role: 'COACH',
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: 'Never',
      profilesCreated: 0,
      isActive: true,
    };

    setCoaches([...coaches, newCoach]);
    setNewCoachEmail('');
    setNewCoachName('');
    setShowAddModal(false);
  };

  const handleToggleActive = (coachId: string) => {
    setCoaches(coaches.map(coach => 
      coach.id === coachId 
        ? { ...coach, isActive: !coach.isActive }
        : coach
    ));
  };

  const handleDeleteCoach = (coachId: string) => {
    if (confirm('Are you sure you want to delete this coach? This action cannot be undone.')) {
      setCoaches(coaches.filter(coach => coach.id !== coachId));
    }
  };

  return (
    <>
      <Head>
        <title>Manage Coaches - Pentara Admin</title>
        <meta name="description" content="Manage coach accounts and permissions" />
      </Head>

      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif font-bold text-dark-800">
                Manage Coaches
              </h1>
              <p className="text-dark-600 mt-2">
                Add, edit, and manage coach accounts and permissions
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary inline-flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Coach
            </button>
          </div>

          {/* Coaches Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-dark-200">
                <thead className="bg-dark-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                      Coach
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                      Profiles Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-dark-200">
                  {coaches.map((coach) => (
                    <tr key={coach.id} className="hover:bg-dark-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gold-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {coach.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-dark-800">
                              {coach.name}
                            </div>
                            <div className="text-sm text-dark-500">
                              {coach.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          coach.role === 'ADMIN' 
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {coach.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-800">
                        {coach.profilesCreated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">
                        {coach.lastActive}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {coach.isActive ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                          )}
                          <span className={`text-sm ${
                            coach.isActive ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {coach.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleToggleActive(coach.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              coach.isActive
                                ? 'text-red-600 hover:bg-red-50'
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                            title={coach.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {coach.isActive ? (
                              <XCircleIcon className="h-5 w-5" />
                            ) : (
                              <CheckCircleIcon className="h-5 w-5" />
                            )}
                          </button>
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit coach"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            className="p-2 text-dark-600 hover:bg-dark-50 rounded-lg transition-colors"
                            title="Send email"
                          >
                            <EnvelopeIcon className="h-5 w-5" />
                          </button>
                          {coach.role !== 'ADMIN' && (
                            <button
                              onClick={() => handleDeleteCoach(coach.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete coach"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Coach Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-serif font-semibold text-dark-800 mb-4">
                Add New Coach
              </h2>
              <form onSubmit={handleAddCoach} className="space-y-4">
                <div>
                  <label className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newCoachName}
                    onChange={(e) => setNewCoachName(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newCoachEmail}
                    onChange={(e) => setNewCoachEmail(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Add Coach
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default CoachesPage;
