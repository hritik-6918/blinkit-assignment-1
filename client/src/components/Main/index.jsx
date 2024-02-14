import styles from "./styles.module.css";
import ImageUpload from "../ImageUpload";
import { useEffect, useState } from "react";
import axios from "axios";
const Main = () => {
  const [data, setData] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  useEffect(() => {
    async function getImages() {
      const response = await axios.get("http://localhost:8080/api/image/list", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setData(response.data);
    }
    getImages();
  }, []);

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <div className="ml-2 text-3xl font-bold text-white">Blinkit App</div>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <ImageUpload />
      <div className="text-3xl font-bold mt-4 text-center">
        Images Uploaded...
      </div>
      <div className="flex flex-col items-center  w-full flex-wrap p-4 gap-4 md:flex-row md:justify-betwee mt-10">
        {data.images &&
          data.images.map((image, idx) => (
            <div className="m-4" key={idx}>
              <img
                style={{ height: "150px", width: "150px" }}
                src={image.image_url}
                alt={image.title}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Main;
