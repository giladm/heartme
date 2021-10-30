import React from 'react';
import { MainScreen } from './screens/MainScreen';
import { AppStateContext } from './types/AppStateContext';
import { AppStateLogic } from './types/AppStateLogic';

export default function App() {

  const appState = AppStateLogic(); // initilize the context

  return (
    <AppStateContext.Provider value={appState}>
      <MainScreen />
    </AppStateContext.Provider>);
}