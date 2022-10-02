import React from 'react'

function Articles(props) {
  return (
    <div className='d-flex justify-content-center flex-column'>
      {
        props.articles.map(article =>
          <div class="card w-75 mx-auto my-3" key={article.id}>
            <h5 class="card-header">{article.name}</h5>
            <div class="card-body">
              <p class="card-text">{article.text}</p>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Articles
