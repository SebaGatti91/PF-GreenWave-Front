const Banned = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1 style={{ fontSize: "4em", fontWeight: "bold" }}>BANNED</h1>
      <p style={{ fontSize: "2em", textAlign: "center" }}>
        We regret to inform you that your account has been banned due to a
        violation of our community guidelines. This action is effective
        immediately. If you have any questions or concerns, please contact our
        support team at
        <a
          className="flex flex-row justify-center items-center email"
          href="mailto:greenwave.page@gmail.com"
        >
          <p className="text-lg mr-3 parrafo" style={{ color: "green" }}>
            greenwave.page@gmail.com
          </p>
        </a>
      </p>
    </div>
  );
};

export default Banned;
