import { Route, Routes } from "react-router-dom";
import AddClasses from "./Pages/AddClasses";

import Classes from "./Pages/Classes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/classes" element={<Classes />} />
        <Route path="/add-classes" element={<AddClasses />} />
      </Routes>
    </>
  );
}

export default App;
