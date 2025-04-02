import logo from './logo.svg';
import './App.css';
import { useState, createContext, useContext, useEffect, useRef, useMemo, useReducer, useCallback } from "react";

const initialState = {
  current: {value: ""},
  past: [],
  future: []
}

function historyReducer(state, action) {
  switch(action.type) {
    case "UPDATE":
      return {
        past: [...state.past, state.current],
        current: action.payload,
        future: []
      };
    case "UNDO":
      if(state.past.length === 0) return state;
      return {
        past: state.past.slice(0, -1),
        current: state.past[state.past.length - 1],
        future: [state.current, ...state.future]
      }
    case "REDO":
      if(state.future.length === 0) return state;
      return {
        past: [...state.past, state.current],
        current: state.future[0],
        future: state.future.slice(1)
      }
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(historyReducer, initialState)

  return (
    <div>
      <input 
        value={state.current.value}
        onChange={e => dispatch({
          type: "UPDATE",
          payload: {value: e.target.value}
        })}
      />
      <button
        onClick={() => dispatch({type: "UNDO"})}
        disabled={state.past.length === 0}
      >
        Undo
      </button>
      <button
        onClick={() => dispatch({type: "REDO"})}
        disabled={state.future.length  === 0}
      >
        Redo
      </button>
    </div>
  )
}

export default App;
