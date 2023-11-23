import data from "./team.json";
import Image from "next/image";
const About = () => {
  return (
    <div>
      <Image
        src="/images/about.png"
        alt="mision-visionImage"
        width={1000}
        height={800}
      />
      <h1>About team</h1>
      {data.map((member) => (
        <div>
          <Image
            src={member.image ? member.image : "/images/logo.png"}
            alt={member.lastName}
            width={300}
            height={300}
          />
          <h4>
            {member.name} {member.lastName}
          </h4>
          <h4>{member.profession}</h4>
          <a href={member.socialMedia.linkedin} target="_blank">
            <Image
              src="/images/linkedin.png"
              alt="linkedinImage"
              width={40}
              height={40}
              style={{ backgroundColor: "#ffffff" }}
            />
          </a>
          <a href={member.socialMedia.github} target="_blank">
            <Image
              src="/images/github.png"
              alt="githubImage"
              width={40}
              height={40}
              style={{ backgroundColor: "#ffffff" }}
            />
          </a>
          <a href={member.socialMedia.instagram} target="_blank">
            <Image
              src="/images/instagram.png"
              alt="instagramImage"
              width={40}
              height={40}
              style={{ backgroundColor: "#ffffff" }}
            />
          </a>
        </div>
      ))}
    </div>
  );
};
export default About;
