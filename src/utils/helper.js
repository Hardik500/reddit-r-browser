export const shouldIncludeUrl = (url) => {
    const excludedDomains = ["imgur.com"]

    for(let i = 0; i < excludedDomains.length; i++){
        const excludedDomain = excludedDomains[i];
        if(url.includes(excludedDomain)){
            return false;
        }
    }

    return true;
}

export const photosReducer = (photos) => {
    let photosArray = [];

    for(let i = 0; i < photos.length; i++) {
        const photo = photos[i];

        const {
            url: src,
            thumbnail,
            title
        } = photo;

        if(photo?.preview?.images[0]?.source){
            const {
                height,
                width
            } = photo?.preview?.images[0]?.source;
            
            photosArray.push({data: photo, height, width, src, thumbnail, title})
        }

    }

    return photosArray;
}