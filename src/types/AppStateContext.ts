// AppStateContext

import React from 'react';
import { InputBloodTestType } from './InterfaceTypes';

export enum AppStateAction {
  ChangeUserInput,
  LoadingUpdate
}

export interface AppStateValueType {
  value: InputBloodTestType | string | boolean ;  
}
export type AppContextType = {
  inputBloodTest : InputBloodTestType;
  isLoading: boolean; 
  changeAppState: (newState: AppStateAction, newValue:AppStateValueType) => void;
  updateLoading: (newValue: boolean) =>void;
}
const initialContext: AppContextType = {
  inputBloodTest: {TestName:'', TestResult:null },
  isLoading: false,
  changeAppState: (): void => { },
  updateLoading: (): void => { },
};

export const AppStateContext = React.createContext<AppContextType>(initialContext);
