import './App.css';

import {useState, useEffect, useCallback, Suspense } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import Gallery from "react-photo-gallery";
import Modal from 'react-modal';

import SearchForm from './components/SearchForm';
import ImageModal from './components/ImageModal';
import ImageHandler from './components/Helper/ImageHandler';
import { ContentLoader, PageLoader } from "./components/Helper/Loader";
import { shouldIncludeUrl, photosReducer } from './utils/helper';

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
  
  const clickHandler = (data) => {
    selectTheImage(data);
    modalToggle();
  }

  const handleInputChange = (e) => {
    const filterText = e.target.value;
    setFilterTtitleText(filterText);

    if(e.target.value < filterTitleText){
      const tempData = photosReducer(apiData)
      setFilteredImageData(tempData);
    }
    else{
      const tempData = filteredImageData.filter(({title}) => title.toLowerCase().includes(filterText.toLowerCase()))
      setFilteredImageData(tempData);
    }
  }

  const modalToggle = () => {
    setModalVisibility(!modalVisible)
  }

  return (
    <div className="body">
      <h1 className="body--heading1">Reddit r/Pics Browser </h1>

      <SearchForm handleInputChange={handleInputChange}/>

      {
        apiData.length !== 0 && filteredImageData.length === 0 && <div>No Results Found </div>
      }
      
      <Suspense fallback={<PageLoader />}>
        <InfiniteScroll
          dataLength={filteredImageData.length}
          next={fetchData}
          loader={<ContentLoader />}
          hasMore={filterTitleText.length ? false : true}
        >
          <Gallery 
            renderImage={(props) =>
              ImageHandler({ ...props, hovered, handleHover, clickHandler, filterTitleText})
            }
            margin={0}
            photos={filteredImageData} />
        </InfiniteScroll>
      </Suspense>

      <Modal isOpen={modalVisible} onRequestClose={modalToggle} style={customStyles}>
        <ImageModal photo={selectedImage}/>
      </Modal>
    </div>
  );
}

export default App;
