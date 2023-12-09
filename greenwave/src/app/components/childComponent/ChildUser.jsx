import {useContext, useEffect} from 'react'
import axios from "axios";
import { useSession } from "next-auth/react";
import { GlobalUser } from "../users/globalUsers";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';


const ChildComponent = ({children}) => {
    const router = useRouter()
    const { data: session, status } = useSession();
    const userData = session?.user;
    const { user, setUser } = useContext(GlobalUser);
    const pathname = usePathname()
    const fetchData = async () => {

      if(status === "authenticated"){
      try {
        const response = await axios.get(`/users/email/${userData?.email}`);
        const { data } = response;
        setUser(data);
      } catch (error) {
        throw Error("error fetching user data", error.message);
      }
    }else{
      console.log('no hay login creado');
    }
  }
  
    useEffect(() => {
      if (user.status === false) {
        router.replace("/banned");
      }
      if (session?.user) {
        fetchData();
      }
    }, [session?.user, pathname]);
  
    return <>{children}</>;
  }
  
export default ChildComponent