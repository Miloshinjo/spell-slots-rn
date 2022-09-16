import { useReducer } from 'react';

type SpellSlotsState = Array<Array<boolean>>;

type SpellSlotsAction = {
  type: string;
  payload: any;
};

const initialState: SpellSlotsState = [];

function reducer(state: SpellSlotsState, action: SpellSlotsAction) {
  return state;
}

export default function useSpellSlotsState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
  };
}
