import logo from './logo.svg';
import './App.css';
import { useState, createContext, useContext, useEffect, useRef, useMemo, useReducer, useCallback } from "react";
import { flushSync } from 'react-dom';

const App = () => {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [items, setItems] = useState([]);
  const filteredAndSortedItems = useMemo(() => {
    return items.filter(item => item.title.toLowerCase().includes(filter.toLowerCase())).sort((a,b) => {
      const comparison = a[sortKey] > b[sortKey] ? 1 : -1;
      return sortDir === 'asc' ? comparison : - comparison;
    })
  }, [items, filter, sortKey, sortDir]);

  const handleSort = useCallback((key) => {
    flushSync(() => {
      setSortKey(key);
      setSortDir(current => current === 'asc' ? 'desc' : 'asc');
    });
  }, []);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/photos";
    fetch(url).then(response => response.json()).then(data => setItems(data));
  }, []);

  return (
    <div>
   <input type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter items..."></input>
   <button onClick={handleSort}>{sortDir === 'asc' ? 'asc' : 'desc'}</button>
   <div style={{ height: '500px', overflow: 'auto' }}>
        {filteredAndSortedItems.map(item => (
          <div key={item.id} style={{ height: '30px' }}>
           {item.id} + {item.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
