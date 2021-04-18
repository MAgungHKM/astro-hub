import axios from 'axios';

const API_SNAPI = 'https://spaceflightnewsapi.net/api/v2';
const API_SSO = 'https://api.le-systeme-solaire.net/rest.php';

const randomNum = (min, max) =>
  Math.floor(Math.random() * (min - max + 1)) + 10;

export const fetchArticle = () => axios.get(`${API_SNAPI}/articles?_limit=50`);
export const fetchBlog = () => axios.get(`${API_SNAPI}/blogs?_limit=50`);
export const fetchReport = () => axios.get(`${API_SNAPI}/reports?_limit=50`);

export const fetchPlanetOrMoon = () =>
  axios.get(
    `${API_SSO}/bodies?data=name,englishName,isPlanet&order=id,asc&page=${randomNum(
      0,
      286,
    )},1`,
  );
