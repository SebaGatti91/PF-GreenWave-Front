"use client";
import "./home.css";
import Link from "next/link";
import Button from "../components/button/Button";

export default function Home() {
 
  return (
    <div>
      <section
        className="relative flex flex-col items-center text-cyan-50 w-full justify-center overflow-hidden heroSection"
        style={{
          backgroundImage: "url('/images/hero.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.485)] to-[rgba(0,0,0,0.542)]"></div>
        <h1 className="font-bold text-4xl relative z-10">Green Wave</h1>
        <div className="max-w-screen-md w-full relative z-10">
          <p className="text-center p-3 text-lg">
            Green Wave emerges with the mission of promoting recycling and
            ecological sustainability. On our platform, you will have the
            opportunity to earn money by delivering recyclable products, while
            at the same time you will be able to explore and purchase crafts
            made from recycled materials. We We are committed to promoting an
            eco-friendly lifestyle, rewarding your efforts to contribute to the
            well-being of the planet.
          </p>
        </div>
        <Button
          link={"/store"}
          text={"Store"}
          className={
            "relative z-10 px-3 bg-lime-800 hover:bg-hover hover:text-slate-950 rounded-lg p-1"
          }
        />
      </section>

      <section className="p-4">
        <h2
          className="font-bold text-center text-2xl py-5 mb-6 shadow-2xl"
          style={{ width: "82%", marginInline: "auto" }}
        >
          ¿Why recycling?
        </h2>
        <div className="flex p-3 justify-center flex-wrap">
          <div className="card shadow-2xl">
            <img
              className="cardImg"
              src="/images/recicle.jpg"
              alt="Reciclar"
            ></img>
            <div className="cardBody">
              <h1 className="cardTitle text-center">
                Conservation of Natural Resources
              </h1>
              <p className="cardInfo text-center">
                Recycling contributes to the conservation of valuable natural
                resources, such as wood, water and minerals. By reusing
                materials instead of extracting new resources, we help preserve
                biodiversity and reduce environmental degradation.
              </p>
            </div>
          </div>
          <div className="card shadow-2xl">
            <img
              className="cardImg"
              src="/images/recicle.jpg"
              alt="Reciclar"
            ></img>
            <div className="cardBody">
              <h1 className="cardTitle text-center">Reducing Landfill Waste</h1>
              <p className="cardInfo text-center">
                Recycling helps minimize the amount of waste that ends up in
                landfills. By giving new life to materials such as paper,
                plastic and glass, we prevent the accumulation of waste and
                reduce the need for more landfill space, thus promoting a
                cleaner environment.
              </p>
            </div>
          </div>
          <div className="card shadow-2xl">
            <img
              className="cardImg"
              src="/images/recicle.jpg"
              alt="Reciclar"
            ></img>
            <div className="cardBody">
              <h1 className="cardTitle text-center">
                Climate Change Mitigation:
              </h1>
              <p className="cardInfo text-center">
                Manufacturing with recycled materials consumes less energy than
                production with raw materials, reducing greenhouse gas emissions
                and helping to combat climate change by reducing energy
                consumption in manufacturing processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <h2
        className="font-bold text-center text-2xl py-5 mb-10 shadow-2xl"
        style={{ width: "82%", marginInline: "auto" }}
      >
        Featured Product
      </h2>
      <section className="flex justify-center mt-0 pb-10">
        <article
          className=" text-black flex row-auto shadow-2xl mb-10"
          style={{ width: "82%", height: "60vh", borderRadius: "2em 0 0 2em" }}
        >
          <section
            className="flex flex-col items-center justify-center rounded-l-lg"
            style={{ backgroundColor: "#C0C8A7" }}
          >
            <h1 className="font-bold text-center px-2 text-2xl">
              EcoLume Lamp
            </h1>

            <p className="py-3 px-10 text-lg">
              The EcoLume Recycled Glass lamp combines style and sustainability
              in one piece. Created from recycled glass canisters, each lamp is
              unique, bringing a distinctive elegance to any space. Enjoy warm,
              conscious lighting with this eco-friendly lamp that beautifies
              your home while helping to preserve the environment.
            </p>
            <Link href="/store">
              <button className="bg-lime-100 rounded-lg p-1 m-5 hover:bg-lime-900 hover:text-lime-50">
                See more
              </button>
            </Link>
          </section>

          <img
            className="rounded-r-lg hover:transform hover:scale-105 transition-transform duration-300"
            style={{ width: "40%" }}
            src="/images/lamp.jpg"
            alt=""
          />
        </article>
      </section>

      <h2
        className="font-bold text-center text-2xl py-5 mb-10 shadow-2xl"
        style={{ width: "82%", marginInline: "auto" }}
      >
        Tips for house
      </h2>
      <section className="flex justify-center mt-0 pb-10">
        <article
          className="text-black flex row-auto shadow-2xl mb-10"
          style={{ width: "82%", height: "60vh", borderRadius: "2em 0 0 2em" }}
        >
          <img
            className=" rounded-l-lg hover:transform hover:scale-105 transition-transform duration-300"
            style={{ width: "60%" }}
            src="/images/vases.jpg"
            alt=""
          />
          <section
            className="flex flex-col items-center justify-center rounded-r-lg"
            style={{ backgroundColor: "#C0C8A7" }}
          >
            <h1 className="font-bold text-center px-2 text-2xl">
              Vases made with jars
            </h1>

            <p className="py-3 px-10 text-lg">
              Canning and jam jars can be reused in so many different ways: to
              store your homemade preserves or as vases! Let your kids decorate
              them with paint and use them as gifts or to decorate your home.
            </p>

            <Link href="/tips">
              <button className="bg-lime-100  hover:bg-lime-900 hover:text-lime-50  rounded-lg p-1 m-5 ">
                See more
              </button>
            </Link>
          </section>
        </article>
      </section>
    </div>
  );
}
