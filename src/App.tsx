import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MapDisplay } from './components/MapDisplay';
import { Map } from './modelTools/types';
import { NormalisationProvider } from './providers/NormalisationProviders';

const ourMap: Map = {
  width: 3,
  height: 3,
  nodes: [
    {
      x: 0,
      y: 1,
      data: {
        transportCost: 10,
        supply: {
          slope: 1,
          offset: 0,
        },
        demand: {
          slope: -2,
          offset: 1000,
        }

      }
    },
    {
      x: 1,
      y: 1,
      data: {
        transportCost: 50,
        supply: {
          slope: 1,
          offset: 0,
        },
        demand: {
          slope: -1,
          offset: 100,
        }

      }
    },
    {
      x: 2,
      y: 1,
      data: {
        transportCost: 10,
        supply: {
          slope: 1,
          offset: 0,
        },
        demand: {
          slope: -1,
          offset: 100,
        }
      }
    }
  ]
}


function App() {
  return (
    <div className="App">
      <NormalisationProvider>
        <MapDisplay map={ourMap} />
      </NormalisationProvider>
    </div>
  );
}

export default App;
