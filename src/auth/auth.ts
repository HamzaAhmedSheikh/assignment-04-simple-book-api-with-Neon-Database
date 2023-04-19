/********** 
 * The verifyAuth function sends a POST request to a specified URL with an access token as the request body,
 *  retrieves and parses the response as JSON to retrieve the decoded user data, and returns it as the result of the function
  *************** */

export default async function verifyAuth(token: string, host: string) {
    try {
      const response = await fetch(`http://${host}/api/users`, {
        method: "POST",
        body: JSON.stringify({ token }),
      });
  
      const decodedUser = await response.json();
  
      return decodedUser;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
  