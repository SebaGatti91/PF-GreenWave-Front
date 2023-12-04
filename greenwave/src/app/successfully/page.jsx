import Link from "next/link";

export default function Sucess() {
  return (
    <div
      className="m-3 flex flex-col justify-center items-center"
      style={{ height: "69.5vh" }}
    >
      <h1 className="text-3xl font-bold text-center">
        Your purchase has been a success!
      </h1>
      <span className="m-3 block max-w-lg">
        Thank you from the bottom of our hearts for choosing us! Your purchase
        has been a resounding success, and we are thrilled to have you as part
        of our valued customer community.
      </span>
      <Link href="/homepage">
        <button className="m-3 bg-transparent border border-black text-black hover:bg-green-600 hover:text-white px-4 py-2 rounded">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
