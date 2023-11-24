import "./home.css";

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
          <p className="text-sm text-center p-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
            atque molestias, voluptatibus corrupti perspiciatis esse
            necessitatibus, facere laudantium maiores magnam velit labore eos
            nam, sed soluta ipsam quo commodi iure?Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>
        </div>
        <button className="relative z-10 bg-lime-800 hover:hover:bg-hover hover:text-slate-950 rounded-lg p-1">
          About us
        </button>
      </section>

      <section className="p-4">
        <h2 className="font-bold text-center text-2xl">¿Why recycling?</h2>
        <div className="flex p-3 justify-center">
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
              <h1 className="card-title text-center">
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

      <section className="flex justify-center mt-0 pb-10">
        <article
          className="bg-cream text-black flex row-auto"
          style={{ width: "90%", height: "60vh", borderRadius: "2em 0 0 2em" }}
        >
          <section
            className="flex flex-col items-center justify-center rounded-l-lg"
            style={{ backgroundColor: "#D1D7BF" }}
          >
            <h1 className="font-bold text-center px-2 pt-20 text-xl">
              {" "}
              EcoLume Lamp
            </h1>

            <p className="py-6 px-10">
              The EcoLume Recycled Glass lamp combines style and sustainability
              in one piece. Created from recycled glass canisters, each lamp is
              unique, bringing a distinctive elegance to any space. Enjoy warm,
              conscious lighting with this eco-friendly lamp that beautifies
              your home while helping to preserve the environment.
            </p>
            <p className="">$$$</p>

            <button className="bg-lime-100 rounded-lg p-1 m-5 hover:bg-lime-900 hover:text-lime-50">
              Add to Card
            </button>
          </section>

          <img
            className="rounded-r-lg"
            style={{ width: "40%" }}
            src="/images/lamp.jpg"
            alt=""
          />
        </article>
      </section>

      <section className="flex justify-center mt-0 pb-10">
        <article
          className="bg-cream text-black flex"
          style={{ width: "90%", height: "60vh", borderRadius: "2em 0 0 2em" }}
        >
          <img
            className=" rounded-l-lg"
            style={{ width: "50%" }}
            src="/images/vases.jpg"
            alt=""
          />
          <section
            className="flex flex-col items-center justify-center rounded-r-lg"
            style={{ backgroundColor: "#D1D7BF" }}
          >
            <h1 className="font-bold text-center px-2 pt-20 text-xl">
              Vases made with jars
            </h1>

            <p className="py-6 px-10">
              Canning and jam jars can be reused in so many different ways: to
              store your homemade preserves or as vases! Let your kids decorate
              them with paint and use them as gifts or to decorate your home.
            </p>

            <button className="bg-lime-100  hover:bg-lime-900 hover:text-lime-50  rounded-lg p-1 m-5 ">
              See more
            </button>
          </section>
        </article>
      </section>
    </div>
  );
}
