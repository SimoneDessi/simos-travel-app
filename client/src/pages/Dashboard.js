import { Link } from 'react-router-dom';
import Card from '../component/Card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from "../component/Modal";

const Dashboard = () => {

  const [posts, setPosts] = useState(null);
  const [mode, setMode] = useState(null)


const fetchData = async () => {
  const response = await axios.get('http://localhost:8000/posts')
  const dataObject = response.data.data
 const arrayData = Object.keys(dataObject).map(key => [key, dataObject[key]])
 setPosts(arrayData)
}

useEffect(() => {
  fetchData()
}, [])



  return (
    <div className="app">
       <div className="dashboard">
      <div className="dashboard-info-container">
        <div>
          <h1>
           Simo's travels
          </h1>
          <p>Embark on Unforgettable Journeys with Simo's Travels: Where Adventures Begin and Memories Never End! </p>
        </div>
        <button
        onClick={() => setMode('create')}
        >Add your adventure</button>
      </div>
      <div className="posts-container">
        {posts?.map((post) => (
        <Link to={`/posts/${post[0]}`} id="link">
        <Card key={post[0]} post={post[1]}/>
        </Link>
          
        ))}
        <div className='add-your-own'>
        <button onClick={() => setMode('create')}> Add your advenuture</button>
        </div>
        
      </div>
    </div>
    {mode && <Modal mode={mode} setMode={setMode} fetchData={fetchData} />}
    </div>
   
  )
}
export default Dashboard;