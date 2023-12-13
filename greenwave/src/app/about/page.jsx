import data from "./team.json";
import Image from "next/image";
import "./about.css";

const About = () => {
  return (
    <div className="text-center bg-cream-brown">
      <div className="mb-4 blocked">
        <Image
          src="/images/about.png"
          alt="mision-visionImage"
          width={1000}
          height={0}
          style={{ height: "89vh" }}
          className="w-full"
        />
      </div>
      <h2
        className="font-bold text-center text-2xl py-5 mb-10 mt-5 shadow-2xl"
        style={{ width: "82%", marginInline: "auto" }}
      >
        About Team
      </h2>
    
      <div className="flex flex-wrap justify-center mb-8">
        {data.map((member) => (
          <div key={member.id} className="m-4 max-w-xs bg-white p-4 rounded-md">
            <Image
              src={member.image ? member.image : "/images/logo.png"}
              alt={member.lastName}
              width={300}
              height={300}
              className=" object-cover rounded-full h-56 w-56 overflow-hidden"
            />
            <h4 className="mt-4 text-lg font-semibold">
              {member.name} {member.lastName}
            </h4>
            <h4 className="text-gray-500">{member.profession}</h4>
            <div className="mt-2 flex justify-center space-x-2">
              <a href={member.socialMedia.linkedin} target="_blank">
                <Image
                  src="/images/linkedin.png"
                  alt="linkedinImage"
                  width={40}
                  height={40}
                />
              </a>
              <a href={member.socialMedia.github} target="_blank">
                <Image
                  src="/images/github.png"
                  alt="githubImage"
                  width={40}
                  height={40}
                />
              </a>
              <a href={member.socialMedia.instagram} target="_blank">
                <Image
                  src="/images/instagram.png"
                  alt="instagramImage"
                  width={40}
                  height={40}
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
