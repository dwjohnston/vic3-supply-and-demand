import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { MapDisplay } from './components/MapDisplay';
import { Map } from './modelTools/types';
import { NormalisationProvider, useNormalisationValue } from './providers/NormalisationProviders';
import { MapDataProvider, useMapData } from './providers/MapProvider';


function AppInner() {
  const ourMap = useMapData();
  const [, registerMaxPrice, , registerMaxQuantity] = useNormalisationValue();



  useEffect(() => {

    console.log(ourMap)
    const maxPrice = Math.max(...ourMap.nodes.map((v) => v.data.demand.offset));
    const maxQuantity = Math.max(...ourMap.nodes.map((v) => Math.floor(v.data.supply.slope * maxPrice + v.data.supply.offset)))

    console.log(maxPrice, maxQuantity)
    registerMaxPrice(maxPrice);
    registerMaxQuantity(maxQuantity);
  }, [registerMaxPrice, registerMaxQuantity, ourMap])

  return <MapDisplay map={ourMap} />

}

function App() {
  return (
    <div className="App">
      <NormalisationProvider>
        <MapDataProvider>
          <AppInner />
        </MapDataProvider>
      </NormalisationProvider>
    </div>
  );
}

export default App;
