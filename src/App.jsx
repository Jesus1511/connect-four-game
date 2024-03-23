import { useState, createContext } from "react";
import {Menu} from './Menu.jsx';
import {Play} from './Play.jsx';

const GeneralData = createContext();

export default GeneralData;

export const App = () => {
  const [vsPlayer, setVsPlayer] = useState(false);
  const [vsCpu, setVsCpu] = useState(false);
  const [rules, setRules] = useState(false);

  return (
    <GeneralData.Provider value={{ vsPlayer, vsCpu, rules, setVsPlayer, setVsCpu, setRules }}>
      {!vsPlayer && !vsCpu && !rules && <Menu />}
      {vsCpu && (<Play cpu={true}/>)}
      {vsPlayer && (<Play cpu={false}/>)}
      {rules && (
        <div>
          <p>no hay presupuesto, esperamos que sepas jugar</p>
          <p>reinicia la web para volver al menu</p>
        </div>
      )}
    </GeneralData.Provider>
  );
};
