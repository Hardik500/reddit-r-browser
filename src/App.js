import './App.css';

import {useState, useEffect, useCallback} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import Gallery from "react-photo-gallery";

import { photosReducer } from './utils/helper';
import ImageHandler from './components/Helper/ImageHandler';

function App() {
  const [hovered, setHovered] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [filterTitleText, setFilterTtitleText] = useState("");
  const [nextPostId, setNextPostId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = useCallback(async() => {
    const result = await fetch(`https://www.reddit.com/r/pics/.json?limit=50&after=${nextPostId}`)
    const { data } = await result.json()
    const apiResult =  data.children.map(({data}) => data)
    const imagesData = photosReducer(apiResult);

    const id = apiResult[apiResult.length - 1]?.name
    
    setNextPostId(id);
    setApiData([...apiData, ...imagesData])
  }, [apiData, nextPostId])

  const handleHover = (index) => {
    setHovered(index);
  };

  const handleInputChange = (e) => {
    const filterText = e.target.value;
    setFilterTtitleText(filterText);
    // const tempData = apiData.filter(({title}) => title.toLowerCase().includes(filterText.toLowerCase()))
    // console.log(tempData);
    // setApiData(tempData);
  }

  if(apiData.length === 0){
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <form>
        <label>
          Title:
          <input type="text" name="title" onChange={handleInputChange}/>
        </label>
      </form>

      <InfiniteScroll
        dataLength={apiData.length}
        next={fetchData}
        loader={<h4>Loading...</h4>}
        hasMore={filterTitleText.length ? false : true}
      >
        <Gallery 
          renderImage={(props) =>
            ImageHandler({ ...props, hovered, handleHover, filterTitleText})
          }
          margin={0}
          photos={apiData} />
      </InfiniteScroll>
    </div>
  );
}

export default App;
