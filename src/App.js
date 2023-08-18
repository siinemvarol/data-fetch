import './App.css';
import axios from "axios";
import {useState, useEffect} from "react";

function App() {

  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [posts, setPosts] = useState(null);
  const [buttonId, setButtonId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const onClick = (id) => {    
    setButtonId(id);    
  }
  useEffect(()=>{
    if(buttonId !== null){
      setIsVisible(true);
      axios.get(`https://jsonplaceholder.typicode.com/posts/${buttonId}`)
      .then((res) => {setPosts(res.data); 
        setIsVisible(false);
      })
      //.finally(() => setIsVisible(false));
    }
   
  },[buttonId]);

  return ( 
    <>
       <div>
    <h2>Data Fetching App</h2>
    {buttons.map((button, index) => <button onClick={() => onClick(index+1)} key={index+1}>Button{button}</button>) 

    }
    {
      isVisible ? (<p>Loading...</p>) : posts ? (<div>
        <h3>Post {posts.id}</h3>
        <p>{posts.title}</p>
        <p>{posts.body}</p>
      </div>
      ): null
    }
      </div>  
    </>    
  );
}

export default App;
