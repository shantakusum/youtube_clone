
import React, {useState, useEffect} from 'react'
import axios from 'axios';

export const CommentInput = ({VideoID, parentCommentID, getComment}) => {
    // console.log(VideoID);
    const[comment, setComment] = useState("");
    const handleSubmit = async() =>{
        try{
            const body = {
                VideoId: VideoID,
                UserId: "2be1daea-0608-4ded-9e1d-3b2cbdc1ab85",
                UserName: "@swag",
                ParentCommentId: parentCommentID,
                Comment: comment
            }
            console.log(body);
            const response = await axios.post("http://localhost:5000/v1/comments", body)
            console.log(response.data);
            alert("Comment add successfully");
            // text area clear
            setComment("");

            //latest comment reload
            getComment();
        }
        catch(error){
            console.log(error);
             if (error.response) {
                console.log(error.response.data);
            }   
        }
    }
    // const handleCancel = () => {
    //     setComment("");
    // }
  return (
    <>
        <div className="flex gap-4 mb-8">           
           <span className=" text-5xl">👩‍💼</span>
            <div className="group flex-1">
                <textarea  value={comment}  onChange={(e) => {setComment(e.target.value) }}  placeholder="Enter Comment"  className="w-full border-b-2 border-gray-300 focus:outline-none p-2"  rows={2} />
                <div className="hidden group-focus-within:flex justify-end gap-3 mt-3">
                    {/* <button   onClick={handleCancel}  className="px-4 py-2 rounded-full hover:bg-gray-200">   Cancel   </button> */}
                    <button  onClick={handleSubmit}  className="px-5 py-2 bg-amber-700 text-white rounded-full hover:bg-amber-400">  Send  </button>
                </div>
            </div>
        </div>
    </>
  )
}
