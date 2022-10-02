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
      <div className='container w-50 mx-auto'>
      <h1 className="mt-3">Blog Articles</h1>
      <Articles articles={articles} />

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div class="mb-3">
          <label htmlFor="name" class="form-label">Article Name:</label>
          <input
            id="name"
            type="text"
            class="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="text" class="form-label">Article content:</label>
          <textarea
            id="text"
            type="text"
            class="form-control"
            rows="3"
            value={text}
            onChange={(e)=>setText(e.target.value)}
          ></textarea>
        </div>
        <button type='submit' className='w-100 btn btn-block btn-outline-dark'>
          Save Article
        </button>
      </form>
      </div>
    </div>
  );
}

export default App;
