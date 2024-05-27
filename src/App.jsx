import { useState, createContext } from "react";
import {Menu} from './components/Menu.jsx';
import {Play} from './components/Play.jsx';
import { Rules } from "./components/Rules.jsx";
import { Routes, Route } from "react-router-dom";

export const GeneralData = createContext();

export const App = () => {
  const [vs, setVs] = useState(false);
  
  return (
    <GeneralData.Provider value={{ vs, setVs }}>
      <Routes>
        <Route path='/' element={<Menu />}/>
        <Route path='/play' element={<Play cpu={vs}/>}/>
        <Route path='/rules' element={<Rules />}/>
      </Routes>
    </GeneralData.Provider>
  );
};
