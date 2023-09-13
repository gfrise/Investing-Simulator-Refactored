import './App.css';
import LineChartComponent from './LineChartComponent';
import {Provider} from './AppContext'
import {Form} from './Form';
import { Simulazione } from "./Simulation"

function App() {
  return (
    <div>
      <Provider>
      <header>Market Crusher</header>
        <LineChartComponent />
        <main>
          <Form /> 
          <Simulazione />
        </main>
      </Provider>
    </div>
  ); 
}

export default App;
