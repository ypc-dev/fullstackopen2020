import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const createPerson = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
  // const request = axios.delete(`${baseUrl}/${id}`);
  // return request.then(response => response.data);
}


export default { getPersons, createPerson, deletePerson }