// App.tsx
import React from "react";
import { IKContext } from "imagekitio-react";
import Admin from "../Pages/Admin"; // or wherever your Admin component lives

function App() {
  return (
   //In order to use the SDK, you need to provide it with a few configuration parameters. 
//The configuration parameters can be applied directly to the IKImage component or using 
//an IKContext component.

<IKContext
  publicKey="public_fO8gX+ROJuQ/1YSkIBVs4wA6FSE="
  urlEndpoint="https://ik.imagekit.io/zq9tdggx6"
  transformationPosition="path"
  authenticationEndpoint="http://www.yourserver.com/auth">

  <Admin />

 
</IKContext>
  );
}

export default App;
