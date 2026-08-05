// import Giving from "./Pages/Giving";
import Home from "./Pages/Home";
import SEO from "./Component/SEO";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <SEO />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/giving" element={<Giving />} /> */}
      </Routes>
    </>
  );
}

export default App;
