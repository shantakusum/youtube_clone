import React from 'react'
import { CommentItem } from './CommentItem'

export const CommentList = ({VideoID, getComment, comments}) => {
  return (
    <>
        <div className="mt-5 mb-7">
            {
                comments.length > 0 ? (
                    comments.map((comment) => (
                        <CommentItem  key={comment.CommentId}  comment={comment}  videoId={VideoID}  getComment={getComment}  />
                    ))
                ) : (
                    <h2 className="text-gray-500">
                        No Comments Yet
                    </h2>
                )
            }
        </div>
    
    </>
  )
}
