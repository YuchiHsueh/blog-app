import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';



function Articles(props) {
  
  return (
    <div>
      <ul>
        {
          props.articles.map(article =>
            <li key={article.id}>{article.name} {article.text}</li>
          )
        }
      </ul>
    </div>
  );
}

export default Articles
