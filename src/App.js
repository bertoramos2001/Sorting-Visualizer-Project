import React from 'react';
import SortingVisualizer from './SortingVisualizer/sortingVisualizer'
import './App.css';

function App() {//sorting visualizer is rendered in the app once it has been imported from the .jsx file
  return (
    <div className="App">
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}

export default App;
