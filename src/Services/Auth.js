// authService.ts
import Cookies from "js-cookie";

const authService = {
  logout: () => {
    // Remove token from cookies or localStorage
    Cookies.remove("token");
    localStorage.removeItem("token");

    window.location.href = "/login";
  },



  isAuthenticated: () => {
    let authenticated = null;
    const cookiesToken = Cookies.get("accessToken");
    const lsToken = localStorage.getItem("accessToken");

    
    if (!cookiesToken && !lsToken) {
        authenticated = false;
        return authenticated
    }
    authenticated = true;
    console.log(authenticated)
    return authenticated;
  },
};

export default authService;
