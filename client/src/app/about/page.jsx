export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12 text-blue-400">About HealthConnectDoctor</h1>
        
        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-gray-950 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              At HealthConnectDoctor, we believe that everyone deserves access to quality healthcare and expert medical opinions. 
              Our mission is to bridge the gap between patients and top medical professionals worldwide, making healthcare more 
              accessible, transparent, and patient-centric.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center text-blue-400">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-950 p-6 rounded-lg">
              <div className="text-blue-400 text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-300">
                We maintain the highest standards in medical care and service delivery, ensuring that every interaction 
                meets our commitment to excellence.
              </p>
            </div>
            <div className="bg-gray-950 p-6 rounded-lg">
              <div className="text-blue-400 text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Trust</h3>
              <p className="text-gray-300">
                We build trust through transparency, security, and reliability in every aspect of our platform and services.
              </p>
            </div>
            <div className="bg-gray-950 p-6 rounded-lg">
              <div className="text-blue-400 text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-300">
                We continuously innovate to improve healthcare accessibility and quality through technology and service excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center text-blue-400">Our Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-950 p-6 rounded-lg text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-blue-900 flex items-center justify-center">
                {/* <span className="text-4xl">👨‍⚕️</span> */}
                <span><img src="https://randomuser.me/api/portraits/women/45.jpg" alt="" className="w-32 h-32 rounded-full"/></span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Sarah Johnson</h3>
              <p className="text-gray-400 mb-2">Chief Medical Officer</p>
              <p className="text-gray-300">
                With over 20 years of experience in healthcare, Dr. Johnson leads our medical team and ensures the highest 
                standards of care.
              </p>
            </div>
            <div className="bg-gray-950 p-6 rounded-lg text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-blue-900 flex items-center justify-center">
                {/* <span className="text-4xl">👨‍💼</span> */}
                <span><img src="https://randomuser.me/api/portraits/men/45.jpg" alt="" className="w-32 h-32 rounded-full"/></span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Michael Chen</h3>
              <p className="text-gray-400 mb-2">Chief Technology Officer</p>
              <p className="text-gray-300">
                Michael brings 15 years of experience in healthcare technology, driving innovation and digital transformation.
              </p>
            </div>
            <div className="bg-gray-950 p-6 rounded-lg text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-blue-900 flex items-center justify-center">
                {/* <span className="text-4xl">👩‍💼</span> */}
                <span><img src="https://randomuser.me/api/portraits/women/25.jpg" alt="" className="w-32 h-32 rounded-full"/></span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Emily Rodriguez</h3>
              <p className="text-gray-400 mb-2">Chief Operations Officer</p>
              <p className="text-gray-300">
                Emily oversees our global operations, ensuring seamless service delivery and exceptional patient experience.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-950 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-8 text-center text-blue-400">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
              <p className="text-gray-300">Patients Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <p className="text-gray-300">Expert Doctors</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
              <p className="text-gray-300">Countries</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
              <p className="text-gray-300">Patient Satisfaction</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 