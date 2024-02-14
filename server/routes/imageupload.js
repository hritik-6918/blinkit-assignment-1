const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { authenticationMiddleware } = require("../middlewares");
const { getStorage, ref, getDownloadURL } = require("firebase/storage");

router.use(authenticationMiddleware);

// Route for image upload
router.post("/upload", async (req, res) => {  
  try {
    const { title, image_path } = req.body;
    if (!title || !image_path) {
      return res
        .status(400)
        .json({ error: "Title and Image-path are required" });
    }

    // Update user document with the uploaded image
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          images: { title, image_path },
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Image uploaded successfully", user });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ success: false, error: "Error uploading image" });
  }
});

// Route to fetch user images
router.get("/list", async (req, res) => {
  try {
    // Find the logged-in user by ID and return their images
    const user = await User.findById(req.user._id);
    const storage = getStorage();
    var images = []
    for (let image of user.images) {
      const url = await getDownloadURL(ref(storage, image.image_path))
      if(url) {
        images.push({title: image.title, image_url: url})
      }
    }

    res.status(200).json({ success: true, images: images });
  } catch (error) {
    console.error("Error fetching user images:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching user images" });
  }
});

module.exports = router;
