const User = require('../models/User');
const connectDB = require('../config/database');

const seedData = async() => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany({});

        // Create sample doctors
        const doctors = [{
                name: 'Dr. Sarah Johnson',
                email: 'sarah@gmail.com',
                password: 'sarah123',
                role: 'doctor',
                phone: '1234567890',
                dateOfBirth: '1980-05-15',
                gender: 'Female',
                address: '123 Medical Center Dr, New York, NY',
                specialty: 'General Medicine & Cardiology',
                experience: '15 years',
                rating: 4.9,
                reviews: 128,
                availability: 'Mon-Fri, 9AM-5PM',
                consultationFee: 150,
                consultationDuration: '45 minutes',
                languages: ['English', 'Spanish'],
                certifications: [
                    'Board Certified in Cardiology',
                    'Advanced Cardiac Life Support (ACLS)',
                    'Basic Life Support (BLS)'
                ],
                education: [{
                        degree: 'MBBS',
                        institution: 'Harvard Medical School',
                        year: '2008'
                    },
                    {
                        degree: 'MD - Internal Medicine',
                        institution: 'Harvard Medical School',
                        year: '2012'
                    }
                ],
                about: 'Dr. Sarah Johnson is a board-certified general physician and cardiologist with over 15 years of experience.',
                isVerified: true
            },
            {
                name: 'Dr. Michael Chen',
                email: 'michael@gmail.com',
                password: 'michael123',
                role: 'doctor',
                phone: '2345678901',
                dateOfBirth: '1975-08-22',
                gender: 'Male',
                address: '456 Health Plaza, San Francisco, CA',
                specialty: 'Cardiology',
                experience: '12 years',
                rating: 4.8,
                reviews: 95,
                availability: 'Mon-Sat, 10AM-6PM',
                consultationFee: 200,
                consultationDuration: '45 minutes',
                languages: ['English', 'Mandarin'],
                certifications: [
                    'Board Certified in Cardiology',
                    'Fellow of American College of Cardiology',
                    'Advanced Cardiac Life Support (ACLS)'
                ],
                education: [{
                        degree: 'MBBS',
                        institution: 'Stanford University',
                        year: '2010'
                    },
                    {
                        degree: 'MD - Cardiology',
                        institution: 'Stanford University',
                        year: '2014'
                    }
                ],
                about: 'Dr. Michael Chen is a renowned cardiologist with expertise in interventional cardiology and heart disease prevention.',
                isVerified: true
            },
            {
                name: 'Dr. Emily Brown',
                email: 'emily@gmail.com',
                password: 'emily123',
                role: 'doctor',
                phone: '3456789012',
                dateOfBirth: '1985-03-10',
                gender: 'Female',
                address: '789 Pediatric Way, Boston, MA',
                specialty: 'Pediatrics',
                experience: '10 years',
                rating: 4.9,
                reviews: 156,
                availability: 'Mon-Fri, 8AM-4PM',
                consultationFee: 175,
                consultationDuration: '30 minutes',
                languages: ['English', 'French'],
                certifications: [
                    'Board Certified in Pediatrics',
                    'Pediatric Advanced Life Support (PALS)',
                    'Neonatal Resuscitation Program (NRP)'
                ],
                education: [{
                        degree: 'MBBS',
                        institution: 'Yale University',
                        year: '2012'
                    },
                    {
                        degree: 'MD - Pediatrics',
                        institution: 'Yale University',
                        year: '2016'
                    }
                ],
                about: 'Dr. Emily Brown is a dedicated pediatrician with a passion for child healthcare and development.',
                isVerified: true
            }
        ];

        // Create sample patients
        const patients = [{
                name: 'Shubham',
                email: 'user@gmail.com',
                password: 'user123',
                role: 'patient',
                phone: '7778478585',
                dateOfBirth: '2002-05-02',
                gender: 'Male',
                address: 'Mumbai, India',
                emergencyContacts: [{
                    name: 'Rahul Nevare',
                    relationship: 'Brother',
                    phone: '7758875837'
                }],
                insuranceInfo: {
                    provider: 'Star Health Insurance',
                    policyNumber: 'SHI-9845632190',
                    groupNumber: 'GRP-45987',
                    expiryDate: '2026-12-31'
                },
                bloodType: 'A+',
                height: '6',
                weight: '50',
                medicalHistory: {
                    allergies: ['Dust', 'Peanuts'],
                    chronicConditions: ['Asthma'],
                    medications: ['Paracetamol', 'Inhaler']
                },
                isVerified: true
            },
            {
                name: 'Jane Doe',
                email: 'jane@example.com',
                password: 'jane456',
                role: 'patient',
                phone: '9988776655',
                dateOfBirth: '1998-11-23',
                gender: 'Female',
                address: 'Pune, India',
                emergencyContacts: [{
                    name: 'Emily Doe',
                    relationship: 'Sister',
                    phone: '8877665544'
                }],
                insuranceInfo: {
                    provider: 'HealthCare Inc.',
                    policyNumber: 'HC987654321',
                    groupNumber: 'GRP123',
                    expiryDate: '2026-08-30'
                },
                bloodType: 'B+',
                height: '5.4',
                weight: '60',
                medicalHistory: {
                    allergies: ['Pollen'],
                    chronicConditions: ['Diabetes'],
                    medications: ['Metformin']
                },
                isVerified: true
            }
        ];

        // Insert doctors
        const createdDoctors = await User.insertMany(doctors);
        console.log(`${createdDoctors.length} doctors created`);

        // Insert patients
        const createdPatients = await User.insertMany(patients);
        console.log(`${createdPatients.length} patients created`);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

// Run seeder
seedData();