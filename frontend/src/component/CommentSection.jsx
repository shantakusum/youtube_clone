import React, {useState, useEffect} from 'react'
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';
import axios from 'axios';

export const CommentSection = ({videoId}) => {
    // console.log(videoId)
    const [comment, setComment] = useState([]);
    useEffect(() => {
        if (videoId) {
            getComments();
        }
    }, [videoId]);
    const getComments = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/v1/comments/${videoId}`
            );
            // console.log(response.data.Comments);
            setComment(response.data.Comments);

        } catch (error) {
            console.log(error);
        }

    };
  return (
    <>
        <div>
            <CommentInput VideoID= {videoId} parentCommentID={null} getComment={getComments} />
        </div>
        <div className="mb-7">
            <CommentList VideoID= {videoId} getComment={getComments} comments={comment} />
        </div>
    </>
  )
}
