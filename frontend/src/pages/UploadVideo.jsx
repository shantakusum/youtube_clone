import React, { useState, useEffect } from "react";
import axios from "axios";
import * as tus from "tus-js-client";
import { toast } from "react-toastify";
import SelectOption from '../component/SelectOption';

const UploadVideo = () => {
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [videoProgress, setVideoProgress] = useState(0);
    const [thumbnailProgress, setThumbnailProgress] = useState(0);
    const [formData, setFormData] = useState({
        Title: "",
        Description: "",
        Thumbnail_url: null,
        Video_url: null,
        VideoCategory: []
    });
    const [categoryData, setCategoryData] = useState([]);
    useEffect(() =>{
        const getCategory = async() =>{
            try{
                const response= await axios.get('http://localhost:5000/v1/categories')
                setCategoryData(response.data);
            }
            catch(error){
                console.error(error)
            };
        }
        getCategory();
    },[])  

const uploadThumbnail = (file) => {
  return new Promise((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint: "http://localhost:5000/upload_thumbnail",
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        filename: file.name,
        filetype: file.type,
      },

      onError(error) {
        reject(error);
      },

      onProgress(bytesUploaded, bytesTotal) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log("Thumbnail:", percentage + "%");
        setThumbnailProgress(percentage);
      },

      onSuccess() {
        console.log("Thumbnail Uploaded");
        setThumbnailProgress(100);
        resolve(upload.url);
      },
    });
    upload.findPreviousUploads().then((previousUploads) => {

      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      upload.start();
    });

  });
};
const uploadVideo = (file) => {
  return new Promise((resolve, reject) => {
    const upload = new tus.Upload(file, {
        endpoint: "http://localhost:5000/upload_video",
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
            filename: file.name,
            filetype: file.type,
        },
        onError(error) {
            reject(error);
        },
        onProgress(bytesUploaded, bytesTotal) {
            const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log("Video:", percentage + "%");
            setVideoProgress(percentage);
        },
        onSuccess() {
            console.log("Video Uploaded");
            setVideoProgress(100);
            resolve(upload.url);
        },
    });
    upload.findPreviousUploads().then((previousUploads) => {

      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

    upload.start(); 
    });
  });
};
  // Text, textarea, select, radio
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
// // prev = {
//     Title: "My Video",
//     Description: "Hello",
//     Thumbnail_url: "abc.jpg",
//     Video_url: "video.mp4",
//     VideoCategory: []
// }

// //   ...prev = {
//     Title: "My Video",
//     Description: "Hello",
//     Thumbnail_url: "abc.jpg",
//     Video_url: "video.mp4",
//     VideoCategory: [1, 2, 3]
// }
  const handleSelectChange = (selectedOptions) => {
    if (selectedOptions) {
        const values = selectedOptions.map(option => option.value);  // selectedOptions = [{label: , value:}{label: , value:}{label: , value:}] ye value selectOption.jsx se aa rahi
        
        // console.log("Selected Values:", values); 
        setFormData((prev) => ({
            ...prev,
            VideoCategory: values
        }));
    } else {
        setFormData((prev) => ({
            ...prev,
            VideoCategory: []
        }));
    }
  };

  // File Input
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Thumbnail_url || !formData.Video_url) {
        toast.error("Please select Thumbnail and Video");
        return;
    }
    try {
        const thumbnailURL = await uploadThumbnail(formData.Thumbnail_url);
        const videoURL = await uploadVideo(formData.Video_url);

        const videoUploadId = videoURL.split("/").pop();
        const thumbnailUploadId = thumbnailURL.split("/").pop();
        setIsProcessing(true);
        console.log("BEFORE PROCESS API");
        await axios.post("http://localhost:5000/v1/videos/process", {
                videoUploadId,
                thumbnailUploadId,
                Title: formData.Title,
                Description: formData.Description,
                VideoCategory: formData.VideoCategory 
            })
        toast.success("Video Uploaded Successfully");
        setFormData({
            Title: "",
            Description: "",
            Category_id: "Education",
            Thumbnail_url: null,
            Video_url: null,
        });
        setThumbnailProgress(0);
        setVideoProgress(0);
    } catch (error) {
        console.log(error);
        console.log("Status:", error.response?.status);
        console.log("Backend Message:", error.response?.data);
        toast.error("Upload Failed");
    }finally {
        setIsProcessing(false);
    }
};
// upload video using multer  
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!formData.Thumbnail_url || !formData.Video_url) {
//     alert("Please select Thumbnail and Video");
//     return;
// }

//   try {
//     // Upload thumbnail
//     const thumbnailURL = await uploadThumbnail(formData.Thumbnail_url);

//     // Upload video
//     const videoURL = await uploadVideo(formData.Video_url);

//     // Save metadata
//     await axios.post("http://localhost:5000/v1/videos", {
//       Title: formData.Title,
//       Description: formData.Description,
//       Category_id: formData.Category_id,
//       Thumbnail_url: thumbnailURL,
//       Video_url: videoURL,
//     });
    
//     toast.success("video uploaded successfully", {
//          style: {
//             babackground: "#111827",
//             color: "#fff",
//             border: "2px solid #22c55e",
//             borderRadius: "12px"
//         },
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//     });
//     setFormData({
//         Title: "",
//         Description: "",
//         Category_id: "Education",
//         Thumbnail_url: null,
//         Video_url: null,
//     });
//     setThumbnailProgress(0);
//     setVideoProgress(0);
//   } catch (err) {
//     console.log(err);
//   }
// };
//   const [formData, setFormData] = useState({
//     Title: "",
//     Description: "",
//     Category_Id: "Education",
//     Thumbnail_url: null,
//     Video_url: null,
//   });

//   // Text, textarea, select, radio
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // File Input
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: files[0],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();

//     data.append("Title", formData.Title);
//     data.append("Description", formData.Description);
//     data.append("Category", formData.Category_Id);
//     data.append("Thumbnail_url", formData.Thumbnail_url);
//     data.append("Video_url", formData.Video_url);

//     // API Call
//     console.log("FormData Ready");

//     for (let pair of data.entries()) {
//       console.log(pair[0], pair[1]);
//     }

    
//     await axios.post(
//       "http://localhost:5000/v1/videos",
//       data,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       }
//     );
    

//     alert("Video Upload");
//   };

  return (
    <div  className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4" >
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Upload Video
        </h1>
        {thumbnailProgress > 0 && (
            <div className="mt-2">
                <div className="w-full bg-gray-300 rounded-full h-3">
                <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${thumbnailProgress}%` }}
                ></div>
                </div>

                <p className="text-sm mt-1">
                Thumbnail Uploading {thumbnailProgress}%
                </p>
            </div>
        )}
        {videoProgress > 0 && (
            <div className="mt-2">
                <div className="w-full bg-gray-300 rounded-full h-3">
                <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{ width: `${videoProgress}%` }}
                ></div>
                </div>

                <p className="text-sm mt-1">
                    Video Uploading {videoProgress}%
                </p>
            </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Thumbnail */}

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Thumbnail
            </label>

            <input
              type="file"
              name="Thumbnail_url"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded-lg p-2"
            />

            {formData.Thumbnail_url && (
              <p className="mt-2 text-sm text-gray-500">
                {formData.Thumbnail_url.name}
              </p>
            )}
          </div>

          {/* Video */}

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Video
            </label>

            <input
              type="file"
              name="Video_url"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full border rounded-lg p-2"
            />

            {formData.Video_url && (
              <p className="mt-2 text-sm text-gray-500">
                {formData.Video_url.name}
              </p>
            )}
          </div>

          {/* Title */}

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Title
            </label>

            <input
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              placeholder="Enter Video Title"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Description */}

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Description
            </label>

            <textarea
              rows={5}
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              placeholder="Enter Video Description"
              className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Category */}

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Category
            </label>

            <SelectOption 
            onChange={handleSelectChange}
            colorOptions={categoryData.length > 0 && 
            categoryData.map(({CategoryId, Category_Name})=>
            ({label:Category_Name,value:CategoryId}))} />

            {/* <select
              name="VideoCategory"
              value={formData.VideoCategory}
              onChange ={handleChange}
              className="w-full border rounded-lg p-3"
            >
            {categoryData.map((option) => {
              return <option key={option.CategoryId} value={option.CategoryId}>{option.Category_Name}</option>
            })}
            </select> */}
          </div>

          {/* Visibility */}
{/* 
          <div className="mb-8">

            <label className="block font-semibold mb-3">
              Visibility
            </label>

            <div className="flex gap-8">

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  value="Public"
                  checked={formData.visibility === "Public"}
                  onChange={handleChange}
                />
                Public
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  value="Private"
                  checked={formData.visibility === "Private"}
                  onChange={handleChange}
                />
                Private
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  value="Unlisted"
                  checked={formData.visibility === "Unlisted"}
                  onChange={handleChange}
                />
                Unlisted
              </label>

            </div>

          </div> */}

          {/* Buttons */}

          <div className="flex justify-end gap-4">

            <button
              type="reset"
              className="px-6 py-2 border rounded-lg hover:bg-gray-100"
              disabled={isProcessing}
            >
              {isProcessing ? "Cancel" : "Cancel"}
            </button>

            <button
              type="submit"
              className="px-8 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Upload Video"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default UploadVideo;