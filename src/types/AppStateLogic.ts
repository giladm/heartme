// AppStateLogic - Manage the state of the user's input
import { useReducer } from 'react';
import { AppContextType, AppStateAction, AppStateValueType } from './AppStateContext';
import { InputBloodTestType } from './InterfaceTypes';

// App state 
interface IApplicationState {
  inputBloodTest: InputBloodTestType;
  isLoading: boolean;
}
// Change the app state base on user selection
export function AppStateLogic(): AppContextType {
  const [state, dispatch] = useReducer(
    (prevState: IApplicationState, action: { type: AppStateAction; value: any }): IApplicationState => {
      // console.log('dispatch. prevState:', prevState, 'action:', action);
      switch (action.type) {
        default: return prevState;
        case AppStateAction.ChangeUserInput:
          return {
            ...prevState,
            inputBloodTest: action.value.value,
          }
        case AppStateAction.LoadingUpdate:
          return {
            ...prevState,
            isLoading: action.value,
          }
      }
    },
    {
      inputBloodTest: { TestName: '', TestResult: null },
      isLoading: false,
    }
  );

  const appContext = {
    changeAppState: (newState: AppStateAction, newValue: AppStateValueType) => {
      dispatch({ type: newState, value: newValue })
    },
    updateLoading: (newValue: boolean) => {
      dispatch({ type: AppStateAction.LoadingUpdate, value: newValue })
    }

  }
  return {
    ...state,
    changeAppState: appContext.changeAppState,
    updateLoading: appContext.updateLoading,
  };
}