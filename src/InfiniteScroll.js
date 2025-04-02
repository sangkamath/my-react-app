import logo from './logo.svg';
import './App.css';
import { useState, useContext, useEffect, useRef, useMemo, useReducer, useCallback } from "react";

const url = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=";

const App = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loaderRef = useRef(null);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if(entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1}
    );
    if(loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const loadMore = async () => {
    try {
      setLoading(true);
      let newUrl = url + itemCount;
      setItemCount(itemCount + 50);
      const response = await fetch(newUrl);
      const newItems = await response.json();
      setItems(prev => [...prev, ...newItems.results]);
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>{error ? <div></div> : <div>
      {items.map(item => (
        <div key={item.name}>{item.url}</div>
      ))}
      <div ref={loaderRef}>
        {loading ? "Loading..." : "Scroll for more"}
      </div>
    </div>}</>
  )
}

export default App;
