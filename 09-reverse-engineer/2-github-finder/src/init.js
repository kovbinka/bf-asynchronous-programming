// api-link
const originUrl = 'https://api.github.com/users';

// dom data
const dom = {
  input : document.getElementById('searchUser'),
  btn : document.getElementById('searchBtn'),
  result : document.getElementById('profile')
}

// api-request

const apiRequest = async (user) => {
  try {
    const response = await fetch(`${originUrl}/${user}`);
    if (!response.ok) {
      throw new Error('There is some problems :( Try again later...');
    } else {
      return response.json();
    }
  }
  catch (err){
    const error = document.createElement('p');
    error.innerHTML = err.message;
    dom.result.append(error);
    dom.result.innerHTML = '';
    alert(err.message)}
}

// listeners and handlers
dom.btn.addEventListener('click', () => {
  const searchTerm = dom.input.value;
  if (searchTerm) {
    dom.result.innerHTML = '';
    apiRequest(searchTerm).then(data => {
      if (data) {

        const profile = document.createElement('div');
        profile.className = 'profile';

        const avatar = document.createElement('img');
        avatar.src = data.avatar_url;
        avatar.alt = `${data.login}'s avatar`;

        const name = document.createElement('h2');
        name.textContent = data.name || data.login;

        const repos = document.createElement('p');
        repos.textContent = data.public_repos;

        const gists = document.createElement('p');
        gists.textContent = `Gists: ${data.public_gists}`;

        const followers = document.createElement('p');
        followers.textContent = `Followers: ${data.followers}`;

        const following = document.createElement('p');
        following.textContent = `Following: ${data.following}`;

        const location = document.createElement('p');
        location.textContent = `Location: ${data.location}`;

        const created = document.createElement('p');
        created.textContent = data.created_at;

        const link = document.createElement('a');
        link.href = data.html_url;
        link.textContent = 'View Profile on GitHub';
        link.target = '_blank';

        const bio = document.createElement('p');
        bio.textContent = data.bio || 'No bio available';

        profile.appendChild(avatar);
        profile.appendChild(name);
        profile.appendChild(link);
        profile.appendChild(repos);
        profile.appendChild(gists);
        profile.appendChild(followers);
        profile.appendChild(following);
        profile.appendChild(location);
        profile.appendChild(created);
        profile.appendChild(bio);
        
        dom.result.appendChild(profile);
      }
    });
  }
});