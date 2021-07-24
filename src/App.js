import './App.css';

import {useState, useEffect, useCallback} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import Gallery from "react-photo-gallery";

import { photosReducer } from './utils/helper';
import ImageHandler from './components/Helper/ImageHandler';

function App() {
  const [hovered, setHovered] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [nextPostId, setNextPostId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = useCallback(async() => {
    const result = await fetch(`https://www.reddit.com/r/pics/.json?limit=50&after=${nextPostId}`)
    const { data } = await result.json()
    const apiResult =  data.children.map(({data}) => data)
    const imagesData = photosReducer(apiResult);

    const id = apiResult[apiResult.length - 1].name
    
    setNextPostId(id);
    setApiData([...apiData, ...imagesData])
  }, [apiData, nextPostId])

  const handleHover = (index) => {
    setHovered(index);
  };

  if(apiData.length === 0){
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={apiData.length}
        next={fetchData}
        loader={<h4>Loading...</h4>}
        hasMore={true}
      >
        <Gallery 
          renderImage={(props) =>
            ImageHandler({ ...props, hovered, handleHover})
          }
          margin={0}
          photos={apiData} />
      </InfiniteScroll>
    </div>
  );
}

export default App;
