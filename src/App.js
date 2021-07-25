import './App.css';

import {useState, useEffect, useCallback} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import Gallery from "react-photo-gallery";
import Modal from 'react-modal';

import { shouldIncludeUrl, photosReducer } from './utils/helper';
import ImageModal from './components/ImageModal';
import ImageHandler from './components/Helper/ImageHandler';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px'
  },
};

Modal.setAppElement('#root');


function App() {
  const [modalVisible, setModalVisibility] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [filteredImageData, setFilteredImageData] = useState([]);
  const [filterTitleText, setFilterTtitleText] = useState("");
  const [nextPostId, setNextPostId] = useState(null);
  const [selectedImage, selectTheImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = useCallback(async() => {
    const result = await fetch(`https://www.reddit.com/r/pics/.json?limit=50&after=${nextPostId}`)
    const { data } = await result.json()
    const apiResult =  data.children.map(({data}) => data).filter(({url}) => shouldIncludeUrl(url))
    const imagesData = photosReducer(apiResult);

    const id = apiResult[apiResult.length - 1]?.name
    
    setNextPostId(id);

    setApiData([...apiData, ...apiResult])
    setFilteredImageData([...filteredImageData, ...imagesData])
  }, [apiData, filteredImageData, nextPostId])

  const handleHover = (index) => {
    setHovered(index);
  };
  
  const clickHandler = (index) => {
    selectTheImage(apiData[index]);
    modalToggle();
  }

  const handleInputChange = (e) => {
    const filterText = e.target.value;
    setFilterTtitleText(filterText);
    // const tempData = apiData.filter(({title}) => title.toLowerCase().includes(filterText.toLowerCase()))
    // console.log(tempData);
    // setApiData(tempData);
  }

  const modalToggle = () => {
    setModalVisibility(!modalVisible)
  }

  if(filteredImageData.length === 0){
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
        dataLength={filteredImageData.length}
        next={fetchData}
        loader={<h4>Loading...</h4>}
        hasMore={filterTitleText.length ? false : true}
      >
        <Gallery 
          renderImage={(props) =>
            ImageHandler({ ...props, hovered, handleHover, clickHandler, filterTitleText})
          }
          margin={0}
          photos={filteredImageData} />
      </InfiniteScroll>

      <Modal isOpen={modalVisible} onRequestClose={modalToggle} style={customStyles}>
        <ImageModal photo={selectedImage}/>
      </Modal>
    </div>
  );
}

export default App;
