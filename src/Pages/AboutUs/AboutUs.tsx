import { Helmet } from "react-helmet-async";
import img1 from "../../assets/aboutUs/img1.png";
import img2 from "../../assets/aboutUs/img2.png";


type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
};


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
 
];

const milestones: Milestone[] = [
  { year: "2015", event: "Founded the company" },
  { year: "2016", event: "Launched our first product" },
  { year: "2018", event: "Reached 1 million users" },
  { year: "2020", event: "Expanded internationally" },
];

const AboutUs = () => {
  return (
    <div className="py-12 font-[Roboto]">
      <Helmet>
        <title>Ride & Roll || About</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <section className="mb-12">
          <h2 className="text-3xl  mb-4 lg:text-4xl font-[Oswald]">
            Our Mission
          </h2>
          <p className="text-lg">
            Our mission is to provide the best bikes and biking experiences to
            our customers, promoting healthy lifestyles and environmental
            sustainability.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl  mb-8 lg:text-4xl font-[Oswald]">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className=" p-6 rounded-lg shadow-lg text-center border"
              >
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {member.name}
                </h3>
                <p className="text-sm">{member.role}</p>
                <p className="">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* History & Milestones */}
        <section className="mb-12">
          <h2 className="text-3xl   mb-8 lg:text-4xl font-[Oswald]">
            Our Journey
          </h2>
          <ul className="list-disc pl-5">
            {milestones.map((milestone, index) => (
              <li key={index} className="mb-2">
                <strong>{milestone.year}:</strong> {milestone.event}
              </li>
            ))}
          </ul>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-3xl  mb-4 lg:text-4xl font-[Oswald]">
            Contact Information
          </h2>
          <p className="text-lg">
            We'd love to hear from you! Here's how you can reach us:
          </p>
          <ul className="list-none mt-4">
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
