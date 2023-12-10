import "../homepage/home.css"
const Tips = () => {
  return (
    <div className="items-center mx-auto">
      <h1
        className="text-center mt-10 text-4xl font-bold text-shadow-lg shadow-2xl py-1"
        style={{
          fontFamily: "font-serif",
          textShadow: "2px 1px #535E4A",
          width: "82%",
          marginInline: "auto",
        }}
      >
        TIP'S FOR HOME
      </h1>

      <section className="flex justify-center mt-12 pb-10 responsive">
        <article
          className="text-black flex shadow-2xl rounded-2xl"
          style={{ width: "82%", height: "60vh", backgroundColor: "#D1D7BF" }}
        >
          <section>
            <h1 className="font-bold text-center px-2 pt-20 text-2xl">
              Transforming Used Tires into Functional Works of Art
            </h1>

            <p className="py-6 px-16 text-lg">
              From tables and chairs to planters and garden swings, recycled
              tires become canvases for artistic expression and practical
              functionality. This sustainable approach not only reduces the
              amount of waste in landfills, but also adds a distinctive,
              eco-friendly touch to any space. By giving new life to tires, we
              are redefining the way we see and use everyday objects, fusing
              aesthetics with environmental ethics.
            </p>
          </section>
          <img
            className="hover:transform hover:scale-110 transition-transform duration-300 rounded-2xl"
            style={{ width: "40%" }}
            src="/images/sillon.jpg"
            alt=""
          />
        </article>
      </section>

      <section className="flex justify-center mt-12 pb-10 responsive">
        <article
          className="text-black  flex shadow-2xl rounded-2xl"
          style={{ width: "82%", height: "60vh", backgroundColor: "#D1D7BF" }}
        >
          <img
            className="hover:transform hover:scale-110 transition-transform duration-300 rounded-2xl"
            style={{ width: "65%" }}
            src="/images/palets.jpg"
            alt=""
          />
          <section>
            <h1 className="font-bold text-center px-2 pt-20 text-2xl">
              Pallets as furniture and garden decoration
            </h1>

            <p className="py-6 px-16 text-lg">
              A few years ago pallets were not used for anything, but lately
              they are being given a lot of use in homes and even sold in
              decoration stores.
            </p>

            <p className="py-6 px-16 text-lg">
              There are countless things that can be done with them, from a
              table, benches for the garden, hang one on the wall and use it as
              a shelf or as a vertical planter...
            </p>
          </section>
        </article>
      </section>

      <section className="flex justify-center mt-12 pb-10 responsive">
        <article
          className="text-black flex shadow-2xl rounded-lg"
          style={{ width: "82%", height: "60vh", backgroundColor: "#D1D7BF" }}
        >
          <section>
            <h1 className="font-bold text-center px-2 pt-20 text-2xl">
              Glass Bottles Transformed into Eco-Friendly Lamps
            </h1>

            <p className="py-6 px-16 text-lg">
              In an effort to merge elegance with sustainability, empty glass
              bottles are transformed into stunning eco-friendly lamps. Once
              thought of as simple containers, these bottles now illuminate our
              spaces in a unique and environmentally conscious way.
            </p>
          </section>
          <img
            className="hover:transform hover:scale-110 transition-transform duration-300 rounded-lg"
            style={{ width: "40%" }}
            src="/images/vidrio.webp"
            alt=""
          />
        </article>
      </section>

      <section className="flex justify-center mt-12 pb-10 responsive">
        <article
          className="text-black  flex shadow-2xl rounded-2xl mb-10"
          style={{ width: "82%", height: "60vh", backgroundColor: "#D1D7BF" }}
        >
          <img
            className="hover:transform hover:scale-110 transition-transform duration-300 rounded-2xl"
            style={{ width: "65%" }}
            src="/images/vases.jpg"
            alt=""
          />
          <section>
            <h1 className="font-bold text-center px-2 pt-20 text-2xl">
              Transforming Jam Jars into Elegant Floral Decoration Pieces
            </h1>

            <p className="py-6 px-16 text-lg">
              In an ingenious act of repurposing, modest glass jam jars become
              charming vases, adding a touch of creativity and sustainability to
              any space. Once meant to hold sweet flavors, these jars now
              overflow with floral beauty, becoming unique and eco-friendly
              decor pieces.
            </p>

            <p className="py-6 px-16 text-lg">
              There are countless things that can be done with them, from a
              table, benches for the garden, hang one on the wall and use it as
              a shelf or as a vertical planter...
            </p>
          </section>
        </article>
      </section>
    </div>
  );
};

export default Tips;
