import { useState } from "react";
import { storage } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import axios from "axios";

function getRandomFileName(fileName) {
  // Extract the file extension
  const fileExtension = fileName.split(".").pop();

  // Generate a random string for the new file name (excluding extension)
  const randomString = Math.random().toString(36).substring(2, 8);

  // Concatenate the random string and the original extension to form the new file name
  const newFileName = randomString + "." + fileExtension;

  return newFileName;
}
function ImageUpload() {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    const fileName = `files/${getRandomFileName(file.name)}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },

      async () => {
        await axios.post(
          "http://localhost:8080/api/image/upload",
          {
            title: "dikshant",
            image_path: fileName,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      }
    );
    alert("image uploaded successfully,please refresh page to see changes");
  };

  return (
    <div className="border-2  text-center mx-auto pt-2 p-2  mt-20 align-middle  bg-[#3bb19b] ">
      <div className="text-lg font-bold ">
        <form onSubmit={handleSubmit}>
          <input type="file" className="w-[300px]" />
          <button
            type="submit"
            className="border-2  p-2 w-[100px] rounded-lg mt-4 font-bold"
          >
            Upload
          </button>
        </form>
      </div>
      {!imgUrl && (
        <div className="flex justify-center text-3xl font-bold ml-[-18px]">
          <div className="innerbar" style={{ width: `${progresspercent}%` }}>
            {progresspercent}%
          </div>
        </div>
      )}
    </div>
  );
}
export default ImageUpload;
