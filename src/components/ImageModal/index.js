import './style.css'

import { formatDistanceToNow } from 'date-fns'


import Image from '../Helper/Image'

export default function ImageModal({photo}){
    const {
        url: src,
        thumbnail,
        title,
        author,
        ups: upvotes,
        downs: downvotes,
        created,
        num_comments,
        score,
        total_awards_received
    } = photo;

    const {
        height,
        width
    } = photo?.preview?.images[0]?.source;

    return (
        <div className="modal">
            <div className="modal--container">
                <Image src={src} thumbnail={thumbnail} title={title} width={width} height={height}/>
                <h1 style={{textAlign: 'center'}}>{title}</h1>
                <h4 style={{width: '100%',textAlign: 'right'}}>- Posted by u/<a href={`https://www.reddit.com/user/${author}/`} target="_blank" rel="noopener noreferrer">{author}</a> {formatDistanceToNow(created * 1000)} ago</h4>
                <div className="modal--info-container">
                    <p>Upvotes: {upvotes ?? 0}</p>
                    <p>Downvotes: {downvotes ?? 0}</p>
                    <p>Awards: {total_awards_received ?? 0}</p>
                    <p>Comments: {num_comments ?? 0}</p>
                    <p>Score: {score ?? 0}</p>
                </div>
            </div>
        </div>
    )
}