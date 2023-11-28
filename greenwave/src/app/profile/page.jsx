import Button from "../components/button/Button";

const Profile = () => {
  return (
    <div>
      <h1>Welcome back user !!!</h1>
      <ul
        className=" text-white "
        style={{
          background:
            "linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051)",
          width: "120px",
        }}
      >
        <li>
          <Button link={"/post-product"} text={"Sell a product"} />
        </li>
        <li>
          <Button link={"/favorites"} text={"My favorites"} />
        </li>
        <li>
          <Button link={"/myShopping"} text={"My shopping"} />
        </li>
        {/* <li>
          <Button link={"/"} text={"My credits"} />
        </li> */}
        <li>
          <Button link={"/donation"} text={"Donate"} />
        </li>
      </ul>
    </div>
  );
};
export default Profile;
