// api-url
const originUrl = 'https://en.wikipedia.org/w/api.php';

// dom elements
const dom = {
  search : document.getElementById('input-bar'),
  btn : document.getElementById('submit-btn'),
  results : document.getElementById('output')
};

// api-request handler
const getApi = async (searchTerm) => {
  try {
    const params = new URLSearchParams({
      action: 'query',
      list: 'search',
      srsearch: searchTerm,
      format: 'json',
      origin: '*'
    });

    const url = `${originUrl}?${params.toString()}`;

      const response = await fetch(url);
      if(!response.ok){
        throw new Error('There is some problems, try again later...');
      } else {
        return response.json();
      }
  }
  catch (err){
      alert(err.message);
  }
};

//listeners
dom.btn.addEventListener('click', () => {
  const searchTerm = dom.search.value;
  if (searchTerm) {
    getApi(searchTerm).then(data => {
      if (data && data.query && data.query.search) {
        dom.results.innerHTML = '';

        data.query.search.forEach(result => {
          const resultItem = document.createElement('div');
          resultItem.className = 'result-item';

          const title = document.createElement('h3');
          const link = document.createElement('a');
          link.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`;
          link.textContent = result.title;
          link.target = '_blank';
          title.appendChild(link);

          const snippet = document.createElement('p');
          snippet.innerHTML = result.snippet;

          resultItem.appendChild(title);
          resultItem.appendChild(snippet);
          
          dom.results.appendChild(resultItem);
        });
      } else {
        dom.results.innerHTML = '<p>No results found.</p>';
      }
    });
  }
});