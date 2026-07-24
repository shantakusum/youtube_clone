import React, { useState } from "react";
import { CommentInput } from "./CommentInput";

export const CommentItem = ({comment, videoId,  getComment}) => {

    const [showReply, setShowReply] = useState(false);

    return (
        <div className="flex gap-3 mt-5">
            {/* Avatar */}
            <span className="text-3xl">👩‍💼</span>

            <div className="flex-1">

                {/* Username */}
                <h2 className="font-semibold">
                    {comment.UserName}
                </h2>

                {/* Comment */}
                <p className="mt-2">
                    <span className="font-bold text-blue-600">{comment?.reply_to_user_id ? comment.UserName : ''}</span> { comment.Comment}
                </p>

                {/* Buttons */}
                <div className="flex gap-5 mt-3">
                    <button>  👍 Like   </button>
                    <button>  👎 Dislike    </button>
                    <button onClick={() => setShowReply(!showReply)} >   Reply  </button>
                </div>

                {/* Reply Input */}
                {
                    showReply && (
                        <div className="mt-4">
                            <CommentInput  VideoID={videoId}   parentCommentID={comment.CommentId} getComment={getComment} />
                        </div>
                    )
                }
                    {/* Replies */}
                    {
                        comment.Replies &&
                        comment.Replies.length > 0 && (
                            <div className="ml-10 mt-5 border-l pl-5">
                                {
                                    comment.Replies.map((reply) => (
                                        <CommentItem key={reply.CommentId}  comment={reply}  videoId={videoId}  getComment={getComment} />
                                    ))
                                }
                            </div>
                        )
                    }
            </div>
        </div>
    );

};