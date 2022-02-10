import { Route, Routes } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

function App() {
      return (
        <Routes>
            <Route exact path="/" element=<h1>Palette List goes here </h1> />
            <Route exact path="/palette/" element=<Palette palette={generatePalette(seedColors[4])} /> />
        </Routes>
  //       <div>
  //           <Palette palette={generatePalette(seedColors[4])} />
  //       </div>
  );
}

export default App;
