"use client";
import Button from "../button/Button";
import { usePathname } from "next/navigation";
const LeftMenu = () => {
  const pathname = usePathname();
  return (
    <div className="flex h-full justify-left">
      <ul className="flex flex-col p-4 pb-7 bg-hover w-200">
        {pathname !== "/profile" && (
          <li
            className="mb-10 pb-6 bg-hover"
            style={{
              borderBottom: "1px solid gray",
              width: "100%",
            }}
          >
            <Button
              link={"/profile"}
              text={"Profile"}
              className={"hover:bg-clear p-2 rounded-md ml-5"}
            />
          </li>
        )}

        {pathname !== "/post-product" && (
          <li
            className="mb-10 pb-6 bg-hover"
            style={{
              borderBottom: "1px solid gray",
              width: "100%",
            }}
          >
            <Button
              link={"/post-product"}
              text={"Sell a product"}
              className={"hover:bg-clear p-2 rounded-md"}
            />
          </li>
        )}

        {pathname !== "/favorites" && (
          <li
            className="mb-10 text-center pb-6 bg-hover"
            style={{
              borderBottom: "1px solid gray",
              width: "100%",
            }}
          >
            <Button
              link={"/favorites"}
              text={"My favorites"}
              className={"hover:bg-clear p-2 rounded-md"}
            />
          </li>
        )}

        {pathname !== "/myShopping" && (
          <li
            className="mb-10 text-center pb-6 bg-hover"
            style={{
              borderBottom: "1px solid gray",
              width: "100%",
            }}
          >
            <Button
              link={"/myShopping"}
              text={"My shopping"}
              className={"hover:bg-clear p-2 rounded-md"}
            />
          </li>
        )}

        {pathname !== "/myProducts" && (
          <li
            className="mb-10 text-center pb-6 bg-hover"
            style={{
              borderBottom: "1px solid gray",
              width: "100%",
            }}
          >
            <Button
              link={"/myProducts"}
              text={"My products"}
              className={"hover:bg-clear p-2 rounded-md"}
            />
          </li>
        )}

        {pathname !== "/" && (
          <li
            className="mb-10 text-center pb-6 bg-hover"
            style={{
              borderBottom: "1px solid gray",
              width: "100%",
            }}
          >
            <Button
              link={"/"}
              text={"Revenues"}
              className={"hover:bg-clear p-2 rounded-md"}
            />
          </li>
        )}

        {pathname !== "/donation" && (
          <li
            className="mb-10 text-center pb-6 bg-hover"
            style={{
              borderBottom: "1px solid gray",
              width: "100%",
            }}
          >
            <Button
              link={"/donation"}
              text={"Donate"}
              className={"hover:bg-clear p-2 rounded-md"}
            />
          </li>
        )}
      </ul>
    </div>
  );
};
export default LeftMenu;
