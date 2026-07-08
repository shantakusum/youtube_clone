import React from 'react'

export const CommentInput = () => {
  return (
    <>
        <div className="flex gap-4 mb-8">
            {/* <img
                src="/avatar.png"
                alt="avatar"
                className="w-12 h-12 rounded-full"
            /> */}
            <div className="flex-1">
                <textarea  value=""  onChange=""  placeholder="Enter Comment"  className="w-full border-b-2 border-gray-300 focus:outline-none p-2"  rows={2} />
                <div className="flex justify-end gap-3 mt-3">
                    <button   onClick=""  className="px-4 py-2 rounded-full hover:bg-gray-200">   Cancel   </button>
                    <button  onClick=""  className="px-5 py-2 bg-amber-700 text-white rounded-full hover:bg-amber-400">  Send  </button>
                </div>
            </div>
        </div>
    </>
  )
}
