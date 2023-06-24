import "./App.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import ReactJson from "react-json-view";

function App() {
  const [userObject, setUserObject] = useState(null);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID Token: " + response.credential);
    setUserObject(jwt_decode(response.credential));
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "39848886389-eoi1f3u4eth91n7fpiosasbbn6p0spa2.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), { theme: "outline", size: "large" });
  }, []);

  const styles= {
    App : {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }
  }

  return (
    <div className="App" style={styles.App}>
      <div id="signInDiv"></div>

      <ReactJson src={userObject || ''} />
    </div>
  );
}

export default App;
