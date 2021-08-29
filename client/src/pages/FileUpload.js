import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import Axios from "axios";
function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const onDrop = (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    //console.log(e.target.files[0]);
    //save the Image we chose inside the Node Server
    Axios.post("/api/product/uploadImage", formData).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setImages([...Images, response.data.image]);
        //props.refreshFunction([...Images, response.data.image]);
        alert("success");
      } else {
        console.log("err", response.data.err);
      }
    });
  };

  const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <input
        encType="multipart/form-data"
        id="Image"
        type="file"
        accept="image/*"
        name="file"
        onChange={onDrop}
      />
      <img src={`http://localhost:5000/${Image}`} alt=""></img>
      <Dropzone
        //onDrop={onDrop}
        multiple={false}
        maxSize={800000000}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            {...getRootProps()}
          >
            {console.log("getRootProps", { ...getRootProps() })}
            {console.log("getInputProps", { ...getInputProps() })}
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll"
        }}
      >
        {Images.map((image, index) => (
          <div onClick={() => onDelete(image)}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
              alt={`productImg-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
