"use client";
import React, { useEffect } from "react";
import "../../public/estilos/splash.css";
import Head from "next/head";
import Link from "next/link";
export default function Splash() {
  useEffect(() => {
    const arrow = document.querySelector(".flecha");
    const video = document.querySelector("#video");
    const section = document.querySelector("#section");

    arrow.addEventListener("click", (e) => {
      e.preventDefault();
      section.scrollIntoView({ behavior: "smooth" });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.style.opacity = "0.5";
          video.style.backgroundColor = "black";
        } else {
          video.style.opacity = "1";
          video.style.backgroundColor = "transparent";
        }
      });
    });

    observer.observe(section);
  }, []);

  return (
    <>
      <div className="box">
        <video
          id="video"
          src="/videos/splash.page.mp4"
          alt="Una imagen bonita"
          autoPlay="autoplay"
          loop={true}
          muted={true}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />

        <Head>
          <title>GreenWave</title>
        </Head>
        <div className="container">
          <main className="flex flex-row md:w-1/2">
            <div className="content">
              <img
                className="logo"
                src="https://cdn.discordapp.com/attachments/1172286566689939527/1174431523320107088/Green_Wave_sin_fondo.png?ex=6570cc17&is=655e5717&hm=b82a3ecfa4899ee08ae2282e06f3db7f031aabe4b1870a7690e0a92d1d18748b&"
              ></img>
              <h1 className="title md:text-4x1">Green Wave</h1>
              <Link href="/homepage">
                <button
                  className='button items-center justify-center text-xl border border-teal-800 bg-gradient-to-b from-teal-500 to-teal-800 hover:from-teal-800 hover:to-teal-800 text-white font-bold py-2 px-4 rounded" '
                  href="/homepage"
                >
                  Start
                </button>
              </Link>

              <div
                className="flex justify-center"
              >
                <a href="#section" className="flecha">
                  ↓
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="seccion" id="section">
        <h2
          className="font-bold text-center text-2xl py-5 mb-10 mt-10 shadow-2xl"
          style={{ width: "90%", marginInline: "auto" }}
        >
          Information
        </h2>
        <section className="flex justify-center mt-12 pb-10 ">
          <article
            className="text-black flex shadow-2xl articulo overflow-hidden text-justify"
            style={{ width: "90%", height: "60vh", backgroundColor: "#C0C8A7" }}
          >
            <section className="scroll">
              <h1 className="font-bold text-center px-2 pt-20 text-xl">
                Awareness Through Recycling
              </h1>

              <p className="py-3 px-16">
                In recent years, recycling has emerged as a simple yet powerful
                way for every individual to impact the health of our planet. By
                reusing materials, we reduce the demand for new resources and
                decrease the amount of waste that ends up in our landfills and
                oceans.
              </p>

              <p className="py-3 px-16">
                But recycling is more than just a practice it's a mindset.
                It's about recognizing the value in our resources and making a
                conscious effort to extend their lifecycle. It's a small step
                that, when taken by many, can lead to significant change.
              </p>
            </section>
            <img
              className="hover:transform hover:scale-110 transition-transform duration-300 demostracion"
              style={{ width: "40%" }}
              src="https://i.pinimg.com/564x/9d/95/ca/9d95ca131195dab6a2f317c6e3600a90.jpg"
              alt="recycle"
            />
          </article>
        </section>
        <section className="flex justify-center mt-12 pb-10">
          <article
            className="text-black flex shadow-2xl articulo overflow-hidden text-justify "
            style={{ width: "90%", height: "60vh", backgroundColor: "#C0C8A7" }}
          >
            <img
              className="hover:transform hover:scale-110 transition-transform duration-300 demostracion"
              style={{ width: "40%" }}
              src="https://i.pinimg.com/564x/48/8e/f1/488ef1d1fcc91a8afd1ed585644f1a25.jpg"
              alt="ong"
            />
            <section>
              <h1 className="font-bold text-center px-2 pt-20 text-xl">
                Supporting Non-Profit Organizations
              </h1>

              <p className="py-3 px-16">
                There are countless non-profit organizations dedicated to
                protecting the environment and combating climate change. These
                organizations conduct research, advocate for policy changes, and
                work on the ground to protect our ecosystems.
              </p>

              <p className="py-3 px-16">
                By supporting these organizations, we can contribute to their
                efforts and help amplify their impact. Whether it's through
                donations, volunteering, or simply spreading the word about
                their work, every bit of support counts.
              </p>
            </section>
          </article>
        </section>

        <section className="flex justify-center mt-12 pb-10 ">
          <article
            className="text-black flex shadow-2xl articulo overflow-hidden text-justify"
            style={{ width: "90%", height: "60vh", backgroundColor: "#C0C8A7" }}
          >
            <section>
              <h1 className="font-bold text-center px-2 pt-20 text-xl">
                The Importance of Protecting Our Environment
              </h1>

              <p className="py-3 px-16 ">
                Imagine a plastic bag floating in the ocean. It may seem
                insignificant in the grand scheme of things, but it represents a
                much larger issue. That plastic bag could end up in the stomach
                of a sea creature, or it could break down into microplastics
                that contaminate our water and food.
              </p>

              <p className="py-3 px-16">
                This is just one example of why it's crucial to protect our
                environment. Our actions have far-reaching consequences, and
                it's our responsibility to minimize our impact. By making
                conscious choices, we can help preserve our planet for future
                generations.
              </p>
            </section>
            <img
              className="hover:transform hover:scale-110 transition-transform duration-300 demostracion "
              style={{ width: "40%" }}
              src="https://i.pinimg.com/564x/1d/74/18/1d7418c65e30dcc84014a93c76c4f2d7.jpg"
              alt="plastic iceberg"
            />
          </article>
        </section>
      </div>
    </>
  );
}
