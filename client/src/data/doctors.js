export const doctors = [{
        id: 1,
        name: 'Dr. Sarah Johnson',
        email: "sarah@gmail.com",
        password: "sarah123",
        role: "doctor",
        specialty: 'General Medicine & Cardiology',
        experience: '15 years',
        rating: 4.9,
        reviews: 128,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
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
            },
            {
                degree: 'Fellowship in General Medicine',
                institution: 'Massachusetts General Hospital',
                year: '2014'
            }
        ],
        about: 'Dr. Sarah Johnson is a board-certified general physician and cardiologist with over 15 years of experience. She specializes in preventive care, chronic disease management, heart failure, and interventional cardiology.',
        recentReviews: [{
                id: 1,
                patientName: 'John D.',
                rating: 5,
                date: '2024-02-15',
                comment: 'Dr. Johnson was very thorough and took the time to explain everything clearly. Highly recommended!'
            },
            {
                id: 2,
                patientName: 'Maria S.',
                rating: 4,
                date: '2024-02-10',
                comment: 'Great consultation. The doctor was knowledgeable and professional.'
            }
        ]
    },
    {
        id: 2,
        name: 'Dr. Michael Chen',
        email: "michael@gmail.com",
        password: "michael123",
        role: "doctor",
        specialty: 'Cardiology',
        experience: '12 years',
        rating: 4.8,
        reviews: 95,
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        availability: 'Mon-Sat, 10AM-6PM',
        consultationFee: 2000,
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
            },
            {
                degree: 'Fellowship in Interventional Cardiology',
                institution: 'Cleveland Clinic',
                year: '2016'
            }
        ],
        about: 'Dr. Michael Chen is a renowned cardiologist with expertise in interventional cardiology and heart disease prevention. He has published numerous research papers on cardiovascular health.',
        recentReviews: [{
                id: 1,
                patientName: 'Robert L.',
                rating: 5,
                date: '2024-03-10',
                comment: 'Excellent doctor with great bedside manner. Explained my condition clearly.'
            },
            {
                id: 2,
                patientName: 'Sophia K.',
                rating: 4,
                date: '2024-02-28',
                comment: 'Very professional and knowledgeable. Would recommend to anyone with heart concerns.'
            }
        ],
        doctorProfile: {
            totalPatientsCheck: 250,
            totalAppointments: 60,
            rating: 4.9,
        }


    },
    {
        id: 3,
        name: 'Dr. Emily Brown',
        email: "emily@gmail.com",
        password: "emily123",
        role: "doctor",
        specialty: 'Pediatrics',
        experience: '10 years',
        rating: 4.9,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
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
            },
            {
                degree: 'Fellowship in Pediatric Care',
                institution: 'Boston Children\'s Hospital',
                year: '2018'
            }
        ],
        about: 'Dr. Emily Brown is a dedicated pediatrician with a passion for child healthcare and development. She specializes in newborn care, childhood vaccinations, and adolescent medicine.',
        recentReviews: [{
                id: 1,
                patientName: 'Jennifer M.',
                rating: 5,
                date: '2024-03-15',
                comment: 'Dr. Brown is amazing with kids! My daughter actually looks forward to her checkups.'
            },
            {
                id: 2,
                patientName: 'David R.',
                rating: 5,
                date: '2024-02-20',
                comment: 'Very patient and explains things in a way parents can understand. Highly recommend!'
            }
        ]
    },
    {
        id: 4,
        name: 'Dr. James Wilson',
        specialty: 'Orthopedics',
        experience: '14 years',
        rating: 4.7,
        reviews: 200,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        availability: 'Mon-Fri, 8AM-4PM',
        consultationFee: 225,
        consultationDuration: '60 minutes',
        languages: ['English', 'German'],
        certifications: [
            'Board Certified in Orthopedic Surgery',
            'Fellowship in Sports Medicine',
            'Advanced Trauma Life Support (ATLS)'
        ],
        education: [{
                degree: 'MBBS',
                institution: 'Johns Hopkins University',
                year: '2008'
            },
            {
                degree: 'MD - Orthopedics',
                institution: 'Johns Hopkins University',
                year: '2012'
            },
            {
                degree: 'Fellowship in Sports Medicine',
                institution: 'Hospital for Special Surgery',
                year: '2014'
            }
        ],
        about: 'Dr. James Wilson specializes in sports medicine and orthopedic surgery, with extensive experience in treating sports-related injuries. He has worked with professional athletes and weekend warriors alike.',
        recentReviews: [{
                id: 1,
                patientName: 'Thomas B.',
                rating: 5,
                date: '2024-03-05',
                comment: 'Fixed my knee injury when others said I needed surgery. Back to running pain-free!'
            },
            {
                id: 2,
                patientName: 'Emma G.',
                rating: 4,
                date: '2024-01-18',
                comment: 'Great surgeon with excellent follow-up care. My shoulder feels brand new.'
            }
        ]
    },
    {
        id: 5,
        name: 'Dr. Lisa Patel',
        email: "lisa@gmail.com",
        password: "lisa123",
        role: "doctor",
        specialty: 'Dermatology',
        experience: '8 years',
        rating: 4.9,
        reviews: 200,
        image: 'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww',
        availability: 'Mon-Fri, 8AM-4PM',
        consultationFee: 190,
        consultationDuration: '30 minutes',
        languages: ['English', 'Hindi', 'Gujarati'],
        certifications: [
            'Board Certified in Dermatology',
            'Fellowship in Cosmetic Dermatology',
            'Mohs Surgery Certification'
        ],
        education: [{
                degree: 'MBBS',
                institution: 'University of California',
                year: '2014'
            },
            {
                degree: 'MD - Dermatology',
                institution: 'University of California',
                year: '2018'
            },
            {
                degree: 'Fellowship in Cosmetic Dermatology',
                institution: 'New York University',
                year: '2020'
            }
        ],
        about: 'Dr. Lisa Patel is a board-certified dermatologist specializing in cosmetic and medical dermatology. She has particular expertise in skin cancer prevention and treatment.',
        recentReviews: [{
                id: 1,
                patientName: 'Priya K.',
                rating: 5,
                date: '2024-02-28',
                comment: 'Dr. Patel cleared up my acne when nothing else worked. My skin has never looked better!'
            },
            {
                id: 2,
                patientName: 'Michael T.',
                rating: 5,
                date: '2024-01-15',
                comment: 'Professional and thorough skin cancer screening. Put my mind at ease.'
            }
        ]
    }
];