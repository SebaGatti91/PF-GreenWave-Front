import data from "./team.json";
import Image from "next/image";

const About = () => {
  return (
    <div className="text-center bg-cream-brown">
      <div className="mb-4">
        <Image
          src="/images/about.png"
          alt="mision-visionImage"
          width={1000}
          height={1000}
          className="w-full"
        />
      </div>
      <h1 className="text-3xl font-bold mb-6">About team</h1>
      <div className="flex flex-wrap justify-center">
        {data.map((member) => (
          <div key={member.id} className="m-4 max-w-xs bg-white p-4 rounded-md">
            <Image
              src={member.image ? member.image : "/images/logo.png"}
              alt={member.lastName}
              width={300}
              height={300}
              className="rounded-full"
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
