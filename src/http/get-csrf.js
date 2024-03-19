export const getCSRFTokenFromCookie = () => {
    // Split cookies by semicolon and trim each cookie
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    
    // Find the cookie you're interested in
    const myCookie = cookies.find(cookie => cookie.startsWith('XSRF-TOKEN='));

    // If the cookie is found, extract its value
    if (myCookie) {
      // Extract value from the cookie
      return decodeURIComponent(myCookie.split('=')[1]);
    }
}