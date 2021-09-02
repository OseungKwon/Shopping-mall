import Axios from "axios";
import React, { useState } from "react";
import { InputForm, Button } from "../common/commonStyle";
import { Wrapper, TextArea, Select, Form, UploadImage, UploadContent, Input } from "./UploadStyle";

const Continents = [
    { key: 1, value: "black" },
    { key: 2, value: "brown" },
    { key: 3, value: "gray" },
    { key: 4, value: "white" }
];

const Upload = ({ history }) => {
    const [form, setForm] = useState({
        Title: "",
        Description: "",
        Price: 0,
        SelectContinent: 1
    });

    const [Images, setImages] = useState([]);
    const [sampleImage, setSampleImage] = useState(null);
    const { Title, Description, Price, SelectContinent } = form;

    const onChange = (e) => {
        if (e.target.id === "SelectContinent") {
            const nextForm = {
                ...form,
                [e.target.id]: Number(e.target.value)
            };
            setForm(nextForm);
        } else {
            const nextForm = {
                ...form,
                [e.target.id]: e.target.value
            };
            setForm(nextForm);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: Title,
            description: Description,
            price: Price,
            continents: SelectContinent,
            images: Images
        };
        Axios.post("/api/product/uploadProduct", data).then((res) => {
            if (res.data.success) {
                alert("Product Successfully Uploaded");
                history.push("/");
            } else {
                alert("Failed to upload Product");
            }
        });
    };


    const onImgChange = (e) => {
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setSampleImage(imageUrl);
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        Axios.post("/api/product/uploadImage", formData).then((res) => {
            alert("success");
            setImages(res.data.image);
        });
    };
    console.log("img", Images);

    return (
        <Wrapper>
            <Form onSubmit={onSubmit}>
                <UploadImage>
                    <img src={`http://localhost:5000/${Images}`} alt=""></img>
                    <label className="input-file-button" for="input-file">
                        제품 업로드
                    </label>
                    <Input
                        id="input-file"
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={onImgChange}
                    />
                </UploadImage>
                <UploadContent>
                    <InputForm>
                        <span>Title</span>
                        <input type="text" id="Title" onChange={onChange} />
                    </InputForm>
                    <InputForm>
                        <span>Description</span>
                        <TextArea id="Description" onChange={onChange} />
                    </InputForm>
                    <InputForm>
                        <span>Price($)</span>
                        <input type="text" id="Price" onChange={onChange} />
                    </InputForm>
                    <InputForm>
                        <span>Color</span>
                        <Select onChange={onChange} id="SelectContinent">
                            {Continents.map((item) => (
                                <option key={item.key} value={item.key}>
                                    {item.value}
                                </option>
                            ))}
                        </Select>
                    </InputForm>
                    <Button>Upload</Button>
                </UploadContent>
            </Form>
        </Wrapper>
    );
};

export default Upload;
