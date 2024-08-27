import img1 from "../../assets/aboutUs/img1.png";
import img2 from "../../assets/aboutUs/img2.png";

// Example data for team members
type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
};

// Example data for milestones
type Milestone = {
  year: string;
  event: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO",
    bio: "John has over 20 years of experience in the bike industry and is passionate about bringing the best bikes to everyone.",
    imageUrl: img1,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "CTO",
    bio: "Jane is a tech enthusiast who loves integrating technology with outdoor experiences.",
    imageUrl: img2,
  },
  // Add more team members as needed
];

const milestones: Milestone[] = [
  { year: "2015", event: "Founded the company" },
  { year: "2016", event: "Launched our first product" },
  { year: "2018", event: "Reached 1 million users" },
  { year: "2020", event: "Expanded internationally" },
  // Add more milestones as needed
];

const AboutUs = () => {
  return (
    <div className="py-12 bg-gray-50 font-[Roboto]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <section className="mb-12">
          <h2 className="text-3xl text-gray-800 mb-4 lg:text-4xl font-[Oswald]">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700">
            Our mission is to provide the best bikes and biking experiences to
            our customers, promoting healthy lifestyles and environmental
            sustainability.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl  text-gray-800 mb-8 lg:text-4xl font-[Oswald]">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-600">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* History & Milestones */}
        <section className="mb-12">
          <h2 className="text-3xl  text-gray-800 mb-8 lg:text-4xl font-[Oswald]">
            Our Journey
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            {milestones.map((milestone, index) => (
              <li key={index} className="mb-2">
                <strong>{milestone.year}:</strong> {milestone.event}
              </li>
            ))}
          </ul>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-3xl text-gray-800 mb-4 lg:text-4xl font-[Oswald]">
            Contact Information
          </h2>
          <p className="text-lg text-gray-700">
            We'd love to hear from you! Here's how you can reach us:
          </p>
          <ul className="list-none mt-4 text-gray-700">
            <li>
              <strong>Office Address:</strong> 123 Bike Lane, Cityville, ST
              12345
            </li>
            <li>
              <strong>Phone:</strong> (123) 456-7890
            </li>
            <li>
              <strong>Email:</strong> contact@bikeshop.com
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;