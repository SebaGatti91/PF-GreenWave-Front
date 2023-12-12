import { useContext, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { GlobalUser } from "../users/globalUsers";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const ChildComponent = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userData = session?.user;
  const { user, setUser } = useContext(GlobalUser);
  const pathname = usePathname();
  const delay = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms)
  });
  const fetchData = async () => {
    try {
      await delay(2000);
      const response = await axios.get(`/users/email/${userData?.email}`);
      const { data } = response;
      setUser(data);
    } catch (error) {
      console.error("Error al obtener los datos del usuario", error.message);
    }
  };

  useEffect(() => {
    if (user.status === false) {
      router.replace("/banned");
    }
    if (session?.user && session.user.email) {
      fetchData();
    }
  }, [session?.user, pathname]);

  return <>{children}</>;
};

export default ChildComponent;
