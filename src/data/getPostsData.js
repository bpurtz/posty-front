import axios from 'axios'
// TODO: account for an error
const getPostsData = async () => {
  const url = process.env.REACT_APP_BACKEND_URL
  const res = await axios.get(`${url}/api/posts`)
  return res
}

export default getPostsData
