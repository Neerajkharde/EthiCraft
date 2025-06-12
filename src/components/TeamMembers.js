import React from 'react';

const teamMembers = [
  {
    name: "Mr. Kaushik Chandak",
    role: "Club Head",
    email: "kaushikchandak24@gmail.com",
    image: "/Kaushik.jpeg"
  },
  {
    name: "Mr. Shailesh More",
    role: "Student Club Coordinator",
    email: "shaileshmore2004@gmail.com",
    image: "/shaileshprj.jpeg"
  },
  {
    name: "Mr. Neeraj Kharde",
    role: "Technical Head",
    email: "neerajkharde7@gmail.com",
    image: "/neerajprj.jpeg"
  },
  {
    name: "Mr. Pranav Joshi",
    role: "Technical Team",
    email: "pranavjoshi2005@gmail.com",
    image: "/pranavprj.jpeg"
  },
  {
    name: "Mr. Subodh Patil",
    role: "Technical Team",
    email: "subodhgp123@gmail",
    image: "/subodh.jpeg"
  },
  {
    name: "Mr. Atharva Nimangare",
    role: "Student Head",
    email: "atharvnim1@gmail.com",
    image: "/atharvprj.jpeg"
  }
];

const TeamSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">Our Team</h2>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl text-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-yellow-400 shadow-md"
              />
              <h3 className="text-lg font-semibold text-blue-900">{member.name}</h3>
              <p className="text-sm text-yellow-600 mb-1">{member.role}</p>
              <p className="text-sm text-gray-700">{member.email}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
