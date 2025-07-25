// App.tsx
import React from "react";
import { IKContext } from "imagekitio-react";
import Admin from "../Pages/Admin"; // or wherever your Admin component lives

function App() {
  return (


<IKContext
  publicKey="public_fO8gX+ROJuQ/1YSkIBVs4wA6FSE="
  urlEndpoint="https://ik.imagekit.io/zq9tdggx6"
  transformationPosition="path"
  >

  <Admin />

 
</IKContext>
  );
}

export default App;
