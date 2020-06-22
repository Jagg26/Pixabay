import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';

function App() {

  //State
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    const consultAPI = async () => {
      if (search === '') return;

      const images_per_page = 30;
      const key = '16694652-668109cf546fec28a85fd7df9';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${images_per_page}&page=${actualPage}`;

      const response = await fetch(url);
      const result = await response.json();

      setImages(result.hits);

      //Total Page

      const calculateTotalPages = Math.ceil(result.totalHits / images_per_page);
      setTotalPages(calculateTotalPages);

      //Move to the top
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' })

    }
    consultAPI();
  }, [search, actualPage]);

  const pageBefore = () => {
    const newPage = actualPage - 1;

    if (newPage === 0) return;

    setActualPage(newPage);
  }

  const nextPage = () => {
    const newPage = actualPage + 1;

    if (newPage > totalPages) return;

    setActualPage(newPage);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Image Searcher</p>

        <Form
          setSearch={setSearch}
        />
      </div>

      <div className="row justify-content-center">
        <List
          images={images}
        />

        {(actualPage === 1) ? null : (
          <button
            type='button'
            className="btn btn-info mr-1"
            onClick={pageBefore}
          >&laquo; Before</button>
        )}

        {(actualPage === totalPages) ? null : (
          <button
            type='button'
            className="btn btn-info"
            onClick={nextPage}
          >Next &raquo;</button>
        )}
      </div>
    </div>
  );
}

export default App;
