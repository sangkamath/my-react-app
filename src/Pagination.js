import logo from './logo.svg';
import './App.css';
import { useState, createContext, useContext, useEffect, useRef, useMemo, useReducer, useCallback } from "react";

function usePaginatedData(endpoint) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cache = useRef({});

  useEffect(() => {
    async function fetchPage() {
      if(cache.current[currentPage]) {
        setData(cache.current[currentPage])
        return;
      }
      setLoading(true);
      try {
        const offset = (currentPage-1)*10;
        const response = await fetch(
          `${endpoint}${offset}`
        );
        const newData = await response.json();
        cache.current[currentPage] = newData.results;
        setData(newData.results);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }

    }
    fetchPage();
  }, [endpoint, currentPage]);

  const nextPage = useCallback(() => {
    setCurrentPage(p => p+1);
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage(p => Math.max(1, p - 1));
  }, []);

  return {
    data, loading, error, currentPage, nextPage, prevPage
  }
}

const App = () => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset="
  const {data, loading, error, currentPage, nextPage, prevPage} = usePaginatedData(url);
  console.log(data);

  return (
    <>{error ? <div></div> : <div>
      {data.map(item => (
        <div key={item.name}>{item.url}</div>
      ))}
      <button disabled={currentPage === 1 ? true : false} onClick={prevPage}>
        PREVIOUS
      </button>
      <button disabled={currentPage === 10 ? true : false} onClick={nextPage}>
        NEXT
      </button>
    </div>}</>
  )
}

export default App;
