import { Button } from "@material-ui/core";
import { useState } from "react";
import React from "react";
import { storage, db } from "../firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (event) => {
    if (event.target.files[0]) {
      /* To select the first file we selected*/
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage
      .ref(`images/${image.name}`)
      .put(image); /* Putting the image into that point*/
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // This piece of code will give you thesnapshot of the process of uploading
        // Progress function....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function....
        console.log(error);
        alert(error.message);
      },
      () => {
        // Complete function....
        storage
          .ref("images") // Go to the ref images
          .child(image.name) // Go to the image name child
          .getDownloadURL() // And get me the download URL
          .then((url) => {
            //  post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageURL: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <progress className='imageUpload__progress' value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
