document.addEventListener('DOMContentLoaded', () => {
  console.log('Local search script loaded');
  console.log('CONFIG:', window.CONFIG);
  
  if (!CONFIG.path) {
    // Search DB path
    console.warn('`hexo-generator-searchdb` plugin is not installed!');
    return;
  }
  
  const localSearch = new LocalSearch({
    path             : CONFIG.path,
    top_n_per_article: CONFIG.localsearch.top_n_per_article,
    unescape         : CONFIG.localsearch.unescape
  });

  const input = document.querySelector('.search-input');
  const container = document.querySelector('.search-result-container');
  const overlay = document.querySelector('.search-pop-overlay');

  console.log('DOM elements found:');
  console.log('- input:', input);
  console.log('- container:', container);
  console.log('- overlay:', overlay);

  if (!input || !container || !overlay) {
    console.warn('Search DOM elements not found');
    return;
  }

  const inputEventFunction = () => {
    console.log('Input event triggered');
    console.log('LocalSearch fetched status:', localSearch.isfetched);
    
    if (!localSearch.isfetched) {
      console.log('Data not fetched yet');
      return;
    }
    
    const searchText = input.value.trim().toLowerCase();
    console.log('Search text:', searchText);
    
    const keywords = searchText.split(/[-\s]+/);
    console.log('Keywords:', keywords);
    
    let resultItems = [];
    if (searchText.length > 0) {
      // Perform local searching
      resultItems = localSearch.getResultItems(keywords);
      console.log('Result items:', resultItems);
    }
    
    if (keywords.length === 1 && keywords[0] === '') {
      container.innerHTML = '<div class="search-result-icon"><i class="fa fa-search fa-5x"></i></div>';
    } else if (resultItems.length === 0) {
      container.innerHTML = '<div class="search-result-icon"><i class="fa fa-frown fa-5x"></i></div>';
    } else {
      resultItems.sort((left, right) => {
        if (left.includedCount !== right.includedCount) {
          return right.includedCount - left.includedCount;
        } else if (left.hitCount !== right.hitCount) {
          return right.hitCount - left.hitCount;
        }
        return right.id - left.id;
      });
      const stats = CONFIG.i18n.hits.replace('${hits}', resultItems.length);

      container.innerHTML = `<div class="search-stats">${stats}</div>
        <hr>
        <ul class="search-result-list">${resultItems.map(result => result.item).join('')}</ul>`;
    }
  };

  localSearch.highlightSearchWords(document.querySelector('.post-body') || document.querySelector('.article-entry'));
  if (CONFIG.localsearch.preload) {
    localSearch.fetchData();
  }

  input.addEventListener('input', inputEventFunction);
  window.addEventListener('search:loaded', inputEventFunction);

  // Handle and trigger popup window
  document.querySelectorAll('.popup-trigger').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Search popup triggered');
      
      document.body.classList.add('search-active');
      overlay.classList.add('search-active');
      
      // Wait for search-popup animation to complete
      setTimeout(() => {
        input.focus();
        console.log('Input focused');
      }, 500);
      
      if (!localSearch.isfetched) {
        console.log('Fetching search data...');
        localSearch.fetchData();
      } else {
        console.log('Search data already available');
      }
    });
  });

  // Monitor main search box
  const onPopupClose = () => {
    document.body.classList.remove('search-active');
    overlay.classList.remove('search-active');
  };

  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      onPopupClose();
    }
  });
  
  const closeBtn = document.querySelector('.popup-btn-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', onPopupClose);
  }

  window.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      document.body.classList.add('search-active');
      overlay.classList.add('search-active');
      setTimeout(() => input.focus(), 500);
      if (!localSearch.isfetched) localSearch.fetchData();
    }
  });
  
  window.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      onPopupClose();
    }
  });
});
