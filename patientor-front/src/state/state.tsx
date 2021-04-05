import React, { createContext, useContext, useReducer } from 'react';
import { Diagnosis, Patient } from '../types';

import { Action } from './reducer';

export type State = {
  patients: { [id: string]: Patient };
  diagnoses: { [code: string]: Diagnosis };
  // patients and diagnoses are each a dictionary, or simply put
  // an object with string keys  and with a Patient objects as values.
  // The index can only be a string or a number as you can access the object values using those.
  //This enforces that the state conforms to the form we want, and prevents developers from misusing the state.
};

const initialState: State = {
  patients: {},
  diagnoses: {},
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children,
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
