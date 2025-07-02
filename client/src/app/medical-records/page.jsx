'use client';

import { useState } from 'react';

export default function MedicalRecords() {
  const [activeTab, setActiveTab] = useState('records');
  const [records, setRecords] = useState([
    {
      id: 1,
      type: 'Consultation',
      date: '2024-03-15',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      summary: 'Regular checkup, blood pressure normal',
      attachments: ['blood_pressure.pdf', 'ecg_report.pdf'],
    },
    {
      id: 2,
      type: 'Lab Test',
      date: '2024-03-10',
      doctor: 'Dr. Michael Chen',
      specialty: 'Pathology',
      summary: 'Complete blood count, all parameters normal',
      attachments: ['cbc_report.pdf'],
    },
    {
      id: 3,
      type: 'Prescription',
      date: '2024-03-01',
      doctor: 'Dr. Emily Brown',
      specialty: 'General Medicine',
      summary: 'Prescribed antibiotics for sinus infection',
      attachments: ['prescription.pdf'],
    },
  ]);

  const [newRecord, setNewRecord] = useState({
    type: '',
    date: '',
    doctor: '',
    specialty: '',
    summary: '',
    attachments: [],
  });

  const handleAddRecord = (e) => {
    e.preventDefault();
    setRecords([...records, { ...newRecord, id: records.length + 1 }]);
    setNewRecord({
      type: '',
      date: '',
      doctor: '',
      specialty: '',
      summary: '',
      attachments: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-blue-400 mb-4">Medical Records</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Access and manage your complete medical history, including consultations, lab results, and prescriptions.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('records')}
              className={`${
                activeTab === 'records'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              View Records
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`${
                activeTab === 'add'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Add New Record
            </button>
            <button
              onClick={() => setActiveTab('share')}
              className={`${
                activeTab === 'share'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Share Records
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === 'records' && (
            <div className="space-y-6">
              {records.map((record) => (
                <div key={record.id} className="bg-gray-950 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {record.type}
                      </h3>
                      <p className="text-gray-400">
                        Date: {record.date}
                      </p>
                      <p className="text-gray-400">
                        Doctor: {record.doctor} ({record.specialty})
                      </p>
                      <p className="text-gray-300 mt-2">
                        {record.summary}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-blue-400 hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {record.attachments.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Attachments:</h4>
                      <div className="flex flex-wrap gap-2">
                        {record.attachments.map((attachment, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300"
                          >
                            {attachment}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'add' && (
            <div className="bg-gray-950 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Add New Medical Record</h2>
              <form onSubmit={handleAddRecord} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Record Type
                    </label>
                    <select
                      value={newRecord.type}
                      onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Lab Test">Lab Test</option>
                      <option value="Prescription">Prescription</option>
                      <option value="Imaging">Imaging</option>
                      <option value="Vaccination">Vaccination</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newRecord.date}
                      onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Doctor
                    </label>
                    <input
                      type="text"
                      value={newRecord.doctor}
                      onChange={(e) => setNewRecord({ ...newRecord, doctor: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Specialty
                    </label>
                    <input
                      type="text"
                      value={newRecord.specialty}
                      onChange={(e) => setNewRecord({ ...newRecord, specialty: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Summary
                  </label>
                  <textarea
                    value={newRecord.summary}
                    onChange={(e) => setNewRecord({ ...newRecord, summary: e.target.value })}
                    rows="4"
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Attachments
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setNewRecord({ ...newRecord, attachments: Array.from(e.target.files) })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Upload medical reports, test results, or imaging studies (PDF, JPG, PNG)
                  </p>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add Record
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'share' && (
            <div className="bg-gray-950 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Share Medical Records</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Share with Healthcare Provider</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Provider Email
                      </label>
                      <input
                        type="email"
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="provider@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Select Records to Share
                      </label>
                      <div className="space-y-2">
                        {records.map((record) => (
                          <label key={record.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="rounded border-gray-700 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-300">
                              {record.type} - {record.date}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Access Duration
                      </label>
                      <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="24">24 hours</option>
                        <option value="72">72 hours</option>
                        <option value="168">7 days</option>
                        <option value="720">30 days</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Share Records
                    </button>
                  </form>
                </div>

                <div className="border-t border-gray-800 pt-6">
                  <h3 className="text-lg font-medium text-white mb-4">Recent Shares</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-900 p-4 rounded-lg">
                      <div>
                        <p className="text-white">Dr. Sarah Johnson</p>
                        <p className="text-gray-400 text-sm">Shared on March 15, 2024</p>
                      </div>
                      <span className="text-green-400 text-sm">Active</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-900 p-4 rounded-lg">
                      <div>
                        <p className="text-white">City Hospital</p>
                        <p className="text-gray-400 text-sm">Shared on March 10, 2024</p>
                      </div>
                      <span className="text-gray-400 text-sm">Expired</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 