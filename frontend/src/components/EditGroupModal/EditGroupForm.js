import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as groupsActions from "../../store/group.js";
import './EditGroup.css';

function EditGroupForm() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const oneGroup = useSelector((state) => state.groups)

    const [name, setName] = useState(oneGroup.name);
    const [title, setTitle] = useState(oneGroup.title);
    const [location, setLocation] = useState(oneGroup.location);
    const [aboutUs, setAboutUs] = useState(oneGroup.aboutUs);
    const [categoryId, setCategoryId] = useState(oneGroup.categoryId);
    const [groupImg, setGroupImg] = useState(oneGroup.groupImg);
    const [image1, setImage1] = useState(oneGroup.image1);
    const [image2, setImage2] = useState(oneGroup.image2);
    const [image3, setImage3] = useState(oneGroup.image3);
    const [errors, setErrors] = useState([]);

    const updateName = (e) => setName(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value);
    const updateLocation = (e) => setLocation(e.target.value);
    const updateAboutUs = (e) => setAboutUs(e.target.value);
    const updateCategoryId = (e) => e.target.value === null ? oneGroup.categoryId : setCategoryId(e.target.value);
    const updateGroupImg = (e) => setGroupImg(e.target.value);
    const updateImage1 = (e) => setImage1(e.target.value);
    const updateImage2 = (e) => setImage2(e.target.value);
    const updateImage3 = (e) => setImage3(e.target.value);

    const handleSubmit = async (e) => {
        const errors = [];

        if (name?.length < 3) errors.push("Squad names must be at least 3 or more characters");
        if (title?.length < 3) errors.push("Squad-title must be at least 3 or more characters");
        // if (!categoryId || categoryId === null) errors.push("A category must be selected");
        setErrors(errors);

        if (errors.length) {
            e.preventDefault();
            return;
        }

        let edit = {
            name,
            title,
            location,
            aboutUs,
            categoryId,
            groupImg,
            image1,
            image2,
            image3,
            id
        };
        await dispatch(groupsActions.editOneGroup(edit));
    };


    return (
        <form className="edit-group-form" onSubmit={handleSubmit}>
            <div><h2 className="edit-group-header">Edit Squad</h2></div>
            <ul className="error-valid" style={{ textAlign: "center", color: 'red' }}>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                <div className="edit-group-text">What is your Squad's name?</div>
                <input
                    type="text"
                    value={name}
                    onChange={updateName}
                // required
                />
            </label>
            <label>
                <div className="edit-group-text">What is your Squad's Title?</div>
                <input
                    type="text"
                    value={title}
                    placeholder="ex. Band, Sports Team, etc"
                    onChange={updateTitle}
                // required
                />
            </label>
            <label>
                <div className="edit-group-text">Where is your Squad located?</div>
                <input
                    type="text"
                    value={location}
                    onChange={updateLocation}
                />
            </label>
            <label>
                <div className="edit-group-text">Tell us about your Squad</div>
                <textarea
                    type="text"
                    value={aboutUs}
                    className="group-aboutUs"
                    onChange={updateAboutUs}
                    placeholder="ex. We are the greatest team, assembled from all corners of the Earth. Who came together when the world needed people they can count on..."
                />
            </label>
            <label>
                <div className="edit-group-text">Category:  </div>
                <select
                    value={categoryId}
                    onChange={updateCategoryId}
                >
                    <option value={null}>Select One</option>
                    <option value={1}>Adventure</option>
                    <option value={2}>Sports</option>
                    <option value={3}>Heros</option>
                    <option value={4}>Music</option>
                    <option value={5}>Miscellaneous</option>
                </select>
            </label>
            <label>
                <div className="edit-group-text">Squad Profile Image:</div>
                <input
                    type="text"
                    value={groupImg}
                    onChange={updateGroupImg}
                />
            </label>
            <label>
                <div className="edit-group-text">Squad Images</div>
                <input
                    type="text"
                    value={image1}
                    className="create-group-images"
                    onChange={updateImage1}
                />
            </label>
            <label>
                <div>
                    <input
                        type="text"
                        value={image2}
                        placeholder="Image"
                        className="create-group-images"
                        onChange={updateImage2}
                    />
                </div>
            </label>
            <label>
                <div>
                    <input
                        type="text"
                        value={image3}
                        placeholder="Image"
                        className="create-group-images"
                        onChange={updateImage3}
                    />
                </div>
            </label>
            <div>
                <button className="submit-edit" type="submit" >Edit Squad</button>
            </div>
        </form >
    )
}

export default EditGroupForm;
