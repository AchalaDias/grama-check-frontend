/* ----- LoaderPage.js ----- */
import React, {useState, useEffect} from "react";

// Libraries & Packages
import { useAuthContext } from "@asgardeo/auth-react";

import GetStartedPage from "../GetStartedPage/GetStartedPage";
import GramaSevakaDashboard from "../GramaSevakaDashboardPage/GramaSevakaDashboardPage";

function LoaderPage() {
  // Asgardeo Auth Context
  const { state, getBasicUserInfo } = useAuthContext();
  const [isGS, setIsGS] = useState();

  useEffect(() => {
    const getBasicUserDetails = () => {
      if (state.isAuthenticated) {
        getBasicUserInfo()
          .then((basicUserDetails) => {
            const user = {
              firstName: basicUserDetails.givenName,
              lastName: basicUserDetails.familyName,
              email: basicUserDetails.email,
              group: basicUserDetails.groups,
            };
            localStorage.setItem("user", JSON.stringify(user));
            if (user.group !== undefined) {
              if (user.group[0] === "GramaSevaka") {
                setIsGS(true);
              } 
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("requestId");
      }
    }
    getBasicUserDetails();
  }, [getBasicUserInfo, state.isAuthenticated])

  return (
    <>
      {isGS === true ? <GramaSevakaDashboard/> : <GetStartedPage/>
      }
    </>
  );
}

export default LoaderPage;


