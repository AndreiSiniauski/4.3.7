const queryInput = document.querySelector('#search-input');
const resultsList = document.querySelector('#dropdown-menu');
const addedRepositoriesList = document.querySelector('#repo-list');

queryInput.addEventListener('input', async (event) => {
    const query = event.target.value; 
    if (!query) {
        resultsList.style.display = 'none';
        return;
      }
    setTimeout(async () => {

  const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
  const data = await response.json();
        
  resultsList.innerHTML = '';
  resultsList.style.display = 'block';

  if(!data.items || !data.items.length) {
    return;
  }

  for (let i = 0; i < 5; i++) {
    const repository = data.items[i];
    const resultItem = document.createElement('a');
    resultItem.textContent = repository.name;
    resultItem.addEventListener('click', () => addRepository(repository));
    resultsList.appendChild(resultItem);
    }
  }, 1000)
});

function addRepository(repository) {
  resultsList.style.display = 'none';
  queryInput.value = '';

  const addedRepositoryItem = document.createElement('div');
  addedRepositoryItem.classList.add('repo-item')
  const repositoryName = document.createElement('div');
  repositoryName.classList.add('repo-name')
  repositoryName.textContent = `Repo name : ${repository.name}`;
  const repositoryOwner = document.createElement('div');
  repositoryOwner.classList.add('repo-owner');
  repositoryOwner.textContent = `Repo owner : ${repository.owner.login}`;
  const repositoryStars = document.createElement('div');
  repositoryStars.classList.add('repo-stars');
  repositoryStars.textContent = `Repo stars : ${repository.stargazers_count}`;
  repositoryName.style.cursor = 'pointer';
  repositoryName.addEventListener('click', () => {
    window.open(`${repository.html_url}`, '_blank');
  });
  addedRepositoryItem.appendChild(repositoryName);
  addedRepositoryItem.appendChild(repositoryOwner);
  addedRepositoryItem.appendChild(repositoryStars);

  const removeButton = document.createElement('button');
  removeButton.classList.add('close');
  removeButton.textContent = 'Удалить';
  removeButton.addEventListener('click', () => {
    addedRepositoryItem.remove();
  });
  addedRepositoryItem.appendChild(removeButton);

  addedRepositoriesList.appendChild(addedRepositoryItem);
}
