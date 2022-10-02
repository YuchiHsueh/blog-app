import './App.css';
import axios from "axios";
import Articles from "./components/articles";
import { useState, useEffect } from 'react';

const API_URL = "https://hsueh-blog-api.herokuapp.com/api/v1/articles"

function getData() {
  return axios.get(API_URL)
    .then((response) => response.data)
}

function App() {
  const [articles, setArticles] = useState([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(API_URL, { name: name, text: text })
    } catch (error) {
      console.log(error.response);
    }
    setName('');
    setText('');
    getData()
      .then((items) => {
          setArticles(items)
      });
  }

  useEffect(() => {
    let mounted = true;
    getData()
      .then((items) => {
        if (mounted) {
          setArticles(items)
        }
      });
    return () => (mounted = false);
  }, []);

  return (
    <div className="App">
      <h1>Blog Posts</h1>
      <Articles articles={articles} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter article name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <label htmlFor="text">Enter article text</label>
        <input
          type="text"
          id="text"
          value={text}
          onChange={(e)=>setText(e.target.value)}
        />
        <button type='submit' className='btn btn-block'>
          Save Article
        </button>
      </form>
    </div>
  );
}

export default App;
