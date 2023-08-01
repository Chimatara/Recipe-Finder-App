import React from 'react'
import { useState, useEffect } from 'react';

const FetchAPI = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      let url =
        "https://api.edamam.com/search?q=chicken&app_id=a040ebd2&app_key=1931d04d4fcf18b60cf67a9cd594010b";
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setData(data.hits);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    }, []);
  
    return { data, loading, error };
}

export default FetchAPI