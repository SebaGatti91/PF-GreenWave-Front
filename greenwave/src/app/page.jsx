export default function Home() {
  return (
    <div>
      <section
        className="relative flex flex-col items-center text-cyan-50 w-full h-screen justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/img/hero.png')",
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
        <button className="relative z-10 bg-lime-800 rounded-lg p-1">
          About us
        </button>
      </section>

      <section className="p-4">
        <h2 className="font-bold text-center text-2xl">¿Why recycling?</h2>
        <div className="flex p-3">
          <div className="p-2">
            <img
              className="rounded-lg"
              src="/img/recicle.jpg"
              alt="recycling logo"
            ></img>
          </div>
          <div className="p-2">
            <img
              className="rounded-lg"
              src="/img/recicle.jpg"
              alt="recycling logo"
            ></img>
          </div>
          <div className="p-2">
            <img
              className="rounded-lg"
              src="/img/recicle.jpg"
              alt="recycling logo"
            ></img>
          </div>
        </div>
      </section>
    </div>
  );
}
