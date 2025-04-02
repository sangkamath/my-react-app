import logo from './logo.svg';
import './App.css';
import { useState, useContext, useEffect, useRef, useMemo, useReducer, useCallback } from "react";
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
  useParams
} from "react-router-dom";
import { combineReducers, legacy_createStore } from 'redux';
import { connect, Provider } from 'react-redux';

/*
const ADD_TODO = 'ADD_TODO';

const addTodo = (todo) => ({
    type: ADD_TODO,
    payload: todo,
});

const initialState = {
    todos: [],
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        default:
            return state;
    }
};

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoReducer from './reducers'; // Import your reducers

const store = createStore(todoReducer);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Your main app component

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from './actions'; // Import your actions

const TodoList = () => {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        const newTodo = prompt("Enter a new todo:");
        if (newTodo) {
            dispatch(addTodo(newTodo));
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
*/

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let boardstatus;
  if (winner) {
    boardstatus = "Winner: " + winner;
  } else {
    boardstatus = "Next player: " + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className='status'>{boardstatus}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function MyForm() {
  const [inputs, setInputs] = useState({});
  const [textarea, setTextarea] = useState("");

  const handleTextAreaChange = (event) => {
    setTextarea(event.target.value);
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`${inputs["username"]}, ${inputs["age"]}, ${textarea}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter in textarea:
        <textarea value={textarea} onChange={(e) => (handleTextAreaChange(e))} />
      </label>
      <label>Enter your name:
        <input
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
        />
      </label>
      <label>Enter your age:
        <input
          type="number"
          name="age"
          value={inputs.age || ""}
          onChange={handleChange}
        />
      </label>
      <input type="submit" />
    </form>
  )
}

function TimerApp() {
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    window.myTimer = setInterval(() => {
      setTimer((timer) => (timer + 1));
    }, 1000);
  }

  const stopTimer = () => {
    clearInterval(window.myTimer);
  }

  const resetTimer = () => {
    clearInterval(window.myTimer);
    setTimer(0);
  }

  return (
    <div>
      <h1>Timer</h1>
      <span>{Math.trunc(timer / 60)}mins</span>
      <span>{timer % 60}</span>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  )
}

function ShowHideDiv() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button onClick={() => (setShow((show) => !show))}>
        Show / Hide
      </button>
      {show ? <h1>Welcome to Challenges</h1> : null}
    </div>
  )
}

function ListCities() {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");

  const addCity = () => {
    //const arrayCities = cities;
    //arrayCities.push(city);
    setCities(arrayCities => [...arrayCities, city]);
    setCity("");
  }

  const removeCity = (index) => {
    const arrayCities = cities;
    const arrayCitiesList = arrayCities.filter((item, i) => i !== index);
    setCities(arrayCitiesList);
  }

  return (
    <div>
      <div>
        <label>
          Enter city name
          <input type="text" value={city} onChange={(event) => setCity(event.target.value)} />
        </label>
        <button onClick={addCity}>Add</button>
      </div>
      <ul>
        {
          cities.map((city, index) => <li key={index}>{city}
            <button onClick={() => removeCity(index)}>X</button></li>)
        }
      </ul>
    </div>
  )
}

function ProgressBar({ width: inputWidth }) {
  return (
    <div className='container'>
      {inputWidth >= 0 && inputWidth <= 100 ? (
        <div className="innerContainer" style={{ width: `${inputWidth}%` }}>
          {inputWidth}%
        </div>) : (
        alert("Please enter a value between 0-100")
      )}
    </div>
  )
}

function ProgressBarApp() {
  const [val, setVal] = useState(10);
  const setValuer = (e) => {
    setVal(Number(e.target.value));
  }

  return (
    <>
      <div>
        <h1>
          <ProgressBar width={val} />
          <form>
            <label for="html">Input Percentage:</label>
            <input type="number" onChange={setValuer} />
          </form>
        </h1>
      </div>
    </>
  )
}

function RefTimerApp() {
  const [count, setCount] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(10);
  const id = React.useRef(null);

  const clear = () => clearInterval(id.current);

  React.useEffect(() => {
    id.current = window.setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000)

    return clear;
  }, []);

  React.useEffect(() => {
    if (timeLeft === 0) {
      clear();
    }
  }, [timeLeft]);

  return (
    <div>
      <h1>{count}</h1>
      <h3>Time left:{timeLeft} seconds</h3>
      {
        timeLeft === 0 ? null :
          <button onClick={()=> setCount((c) => c + 1)}>
            +
          </button>
      }
    </div>
  )
}


const ThemeContext = React.createContext("dark");

function Comp1() {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <h1>Current Theme: {theme}</h1>
    </div>
  );
}

function Comp2({setTheme}) {
  const { theme} = useContext(ThemeContext);
  return (
    <div>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
    </div>
  );
}

function Root() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme }} className="App">
      <Comp1 setTheme={setTheme}/>
      <Comp2 setTheme={setTheme}/>
    </ThemeContext.Provider>
  );
}

function CalculateFactorial() {
  const [number, setNumber] = useState(0);
  const [inc, setInc] = useState(0);

  const factorial = useMemo(() => factorialOf(number), [number]);
  //const factorial = factorialOf(number);

  const onChange = (event) => {
    setNumber(Number(event.target.value));
  };
  const onClick = () => setInc((i) => i + 1);

  return (
    <div>
      Factorial of
      <input type="number" value={number} onChange={onChange} />
      is {factorial}
      <button onClick={onClick}>Re-render</button>
    </div>
  );
}

function factorialOf(n) {
  console.log("factorialOf(n) called!");
  return n <= 0 ? 1 : n * factorialOf(n - 1);
}

function Results() {
  return <div className="center">Thanks for submitting your details.</div>;
}

function Form() {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    name === "name" ? setName(value) : setAge(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/results");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Your name
        <input type="text" value={name} onChange={handleChange} name="name" />
      </label>
      <label>
        Favorite age
        <input type="text" value={age} onChange={handleChange} name="age" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

const Employee = () => {
  const { name } = useParams();

  return (
    <div className="display">
      <h3>Employee: {name}</h3>
    </div>
  );
};

const Ids = () => {
  const { id } = useParams();

  return (
    <div className="display">
      <h3>Ids : {id}</h3>
    </div>
  );
};

function LinksApp() {
  return (
    <Router>
      <h2>Customer</h2>
      <ul>
        <li>
          <Link to="/ram">Ram</Link>
        </li>
        <li>
          <Link to="/rakshman">Lakshman</Link>
        </li>
        <li>
          <Link to="/bheem">Bheem</Link>
        </li>
      </ul>
      <h2>Ids</h2>
      <ul>
        <li>
          <Link to="/Idss/1">1</Link>
        </li>
        <li>
          <Link to="/Idss/2">2</Link>
        </li>
        <li>
          <Link to="/Idss/3">3</Link>
        </li>
        <li>
          <Link to="/Idss/4">4</Link>
        </li>
      </ul>

      <hr />

      <Routes>
        <Route path="/:name" element={<Employee />} />
        <Route path="/Idss/:id" element={<Ids />} />
      </Routes>
    </Router>
  );
}

const Home = () => <h1>Home</h1>;
const Settings = () => <h1>Settings</h1>;
const CatchRoute = () => <h1>404</h1>;

function CatchRouteApp() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<CatchRoute />} />
      </Routes>
    </Router>
  );
}


const usePageBottom = () => {
  const [reachedBottom, setReachedBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offsetHeight = document.documentElement.offsetHeight;
      const innerHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;

      const hasReachedBottom = offsetHeight - (innerHeight + scrollTop) <= 20;
      setReachedBottom(hasReachedBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return reachedBottom;
};

function UsePageBottomApp() {
  const reachedBottom = usePageBottom();
  console.log("reachedBottom", reachedBottom);
  let arr = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19"
  ];
  return (
    <div className="App">
      <h1>Welcome to React Challenges</h1>
      {arr.map((index) => (
        <h2>{index}</h2>
      ))}
      <footer>&copy; 2022 React challenges.live</footer>
    </div>
  );
}

function useWindowDimensions() {
  const [width, setWidth] = React.useState(window.innerWidth)
  const [height, setHeight] = React.useState(window.innerHeight)

  React.useEffect(() => {
    const dimensionsTracker = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener("resize", dimensionsTracker)

    return () => {
      window.removeEventListener("resize", dimensionsTracker)
    }
  }, [])

  return {
    width,
    height
  }
}

function UseWindowDimensionsApp() {
  const { width, height } = useWindowDimensions()

  return (
    <div className="App">
      <h2>width: {width}</h2>
      <h2>height: {height}</h2>
      <p>Resize the window.</p>
    </div>
  )
}

/*
  Instructions:
    Implement the `useFetch` function. 
*/

function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setError(null);
        setLoading(false);
      })
      .catch((e) => {
        console.warn(e.message);
        setError("Error fetching data. Try again.");
        setLoading(false);
      });
  }, [url]);

  return { loading, data, error };
}

const postIds = [1, 2, 3, 4, 5, 6, 7, 8];

function UseFetchApp() {
  const [index, setIndex] = useState(0);

  const { loading, data: post, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postIds[index]}`
  );

  const incrementIndex = () => {
    setIndex((i) => (i === postIds.length - 1 ? i : i + 1));
  };

  if (loading === true) {
    return <p>Loading</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={incrementIndex}>Next Post</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {error && <p>{error}</p>}
      {index === postIds.length - 1 ? (
        <p>No more posts</p>
      ) : (
        <button onClick={incrementIndex}>Next Post</button>
      )}
    </div>
  );
}


function CountRenderApp() {
  const [inputValue, setInputValue] = useState("");
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {count.current}</h1>
    </>
  );
}

function FocusRefApp() {
  const inputElement = useRef();

  const focusInput = () => {
    inputElement.current.focus();
  };

  return (
    <>
      <input type="text" ref={inputElement} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}

function PreviousStateApp() {
  const [inputValue, setInputValue] = useState("");
  const previousInputValue = useRef("");

  useEffect(() => {
    previousInputValue.current = inputValue;
  }, [inputValue]);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h2>Current Value: {inputValue}</h2>
      <h2>Previous Value: {previousInputValue.current}</h2>
    </>
  );
}

const initialTodos = [
  {
    id: 1,
    title: "Todo 1",
    complete: false,
  },
  {
    id: 2,
    title: "Todo 2",
    complete: false,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};

function TodosApp() {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleComplete(todo)}
            />
            {todo.title}
          </label>
        </div>
      ))}
    </>
  );
}

const UseCallbackApp = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "New Todo"]);
  }, [todos]);

  return (
    <>
      <Todos todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

const Todos = ({ todos, addTodo }) => {
  console.log("child render");
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
};

const UseMemoApp = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </div>
  );
};

const expensiveCalculation = (num) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

function App() {
  return (
    <div className="App"><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <MyForm /><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
    <Game /><br />
    <br />
    <h1>Hello World!</h1>
      <br />
      <br />
    <TimerApp /><br />
    <br />
    <h1>Hello World!</h1>
      <br />
      <br />
    <ShowHideDiv/><br />
    <br />
    <h1>Hello World!</h1>
      <br />
      <br />
    <ListCities /><br />
    <br />
    <h1>Hello World!</h1>
      <br />
      <br />
      <ProgressBarApp /><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <RefTimerApp /><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <Root /><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <CalculateFactorial /><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <RoutesApp /><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <LinksApp /><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <CatchRouteApp/><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <FocusRefApp/><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <PreviousStateApp/><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <UsePageBottomApp/><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <UseWindowDimensionsApp/><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <UseFetchApp/><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <CountRenderApp/><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <TodosApp/><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <UseCallbackApp/><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
      <UseMemoApp/><br />
      <br />
      <h1>Hello World!</h1>
      <br />
      <br />
    </div>
  );
}

export default App;
