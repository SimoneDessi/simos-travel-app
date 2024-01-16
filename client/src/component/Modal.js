import { useState } from "react";
import { getTags } from "../helper";
import axios from "axios";

const Modal = ({ mode, setMode, fetchData, currentPost }) => {
  const [form, setForm] = useState({
    title: currentPost?.data.title || "",
    description: currentPost?.data.description || "",
    line: currentPost?.data.address.line || "",
    town: currentPost?.data.address.town || "",
    region: currentPost?.data.address.region || "",
    country: currentPost?.data.address.country || "",
    longitude: currentPost?.data.address.coords[0] || undefined,
    latitude: currentPost?.data.address.coords[1] || undefined,
    photo: currentPost?.data.photo || "",
    website: currentPost?.data.website || "",
    nature: currentPost?.data.tags.includes("nature") || false,
    mountains: currentPost?.data.tags.includes("mountains") || false,
    hiking: currentPost?.data.tags.includes("hiking") || false,
    beach: currentPost?.data.tags.includes("beach") || false,
    sun: currentPost?.data.tags.includes("sun") || false,
  });

  const createMode = mode === "create";




  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      title: form.title,
      address: {
        line: form.line,
        town: form.town,
        region: form.region,
        country: form.country,
        coords: [Number(form.longitude), Number(form.latitude)]
      },
      photo: form.photo,
      website: form.website,
      description: form.description,
      tags: getTags(form)
    }

    try {
      if (createMode) {
        const response = await axios.post('http://localhost:8000/create', {
          data,
        })
        const success = response.status === 200

        if (success) {
          setMode(null)
          fetchData()
        } else {
          console.error(response)
        }
      } else {
        const response = await axios.put(
          `http://localhost:8000/edit/${currentPost.documentId}`,
          {
            data,
          }
        )
        const success = response.status === 200

        if (success) {
          setMode(null)
          fetchData()
        } else {
          console.error(response)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }


 

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="overlay">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div className="close-icon" onClick={() => setMode(null)}>
            ⨉
          </div>
          <h1>{createMode ? "Add" : "Edit"} your adventure</h1>
          <h5> Upload a photo of a place you visited</h5>
          <p>Paste a url from the internet</p>

          <div className="multi-input">
            <div className="image-preview">
              {form.photo && (
                <img src={form.photo} alt="uploaded photo preview" />
              )}
            </div>

            <div className="main-inputs">
              <div className="input-container">
                <label htmlFor="photo">PHOTO</label>
                <input
                  id="photo"
                  name="photo"
                  placeholder="Photo URL goes here"
                  required
                  value={form.photo}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="input-container">
                <label htmlFor="title">TITLE</label>
                <input
                  id="title"
                  name="title"
                  placeholder="Title of your post"
                  required
                  value={form.title}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="input-container">
                <label htmlFor="website">WEBSITE</label>
                <input
                  id="website"
                  name="website"
                  placeholder="Website"
                  required
                  value={form.website}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              required
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="multi-input">
            <div className="input-container">
              <label htmlFor="line"> Address</label>
              <input
                id="line"
                placeholder="First line of Address"
                required
                name="line"
                value={form.line}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                name="country"
                required
                placeholder="The Country"
                value={form.country}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="town">Town/City</label>
              <input
                id="town"
                name="town"
                required
                placeholder="Town or City"
                value={form.town}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="multi-input">
            <div className="input-container">
              <label htmlFor="longitude">LONGITUDE</label>
              <input
                id="longitude"
                name="longitude"
                required
                type="number"
                value={form.longitude}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label htmlFor="latitude">LATITUDE</label>
              <input
                id="latitude"
                name="latitude"
                required
                type="number"
                value={form.latitude}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label htmlFor="region">REGION</label>
              <input
                id="region"
                name="region"
                required
                type="text"
                value={form.region}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="multi-input">
            <div className="input-container">
              <label htmlFor="mountains">  Mountains  </label>
                <input
                  id="mountains"
                  type="checkbox"
                  name="mountains"
                  checked={form.mountains}
                  onChange={handleChange}
                />
          
            </div>

            <div className="input-container">
              <label htmlFor="nature">Nature</label>
                <input
                  id="nature"
                  type="checkbox"
                  name="nature"
                  checked={form.nature}
                  onChange={handleChange}
                />
              
            </div>

            <div className="input-container">
              <label htmlFor="hiking">Hiking </label>
                <input
                  id="hiking"
                  type="checkbox"
                  name="hiking"
                  checked={form.hiking}
                  onChange={handleChange}
                />
            </div>

            <div className="input-container">
              <label htmlFor="beach">   Beach           </label>

                <input
                  id="beach"
                  type="checkbox"
                  name="beach"
                  checked={form.beach}
                  onChange={handleChange}
                />
             
            </div>

            <div className="input-container">
              <label htmlFor="sun">Sun</label>
                <input
                  id="sun"
                  type="checkbox"
                  name="sun"
                  checked={form.sun}
                  onChange={handleChange}
                />
              
            </div>
          </div>

          <br />

          <input type="submit" value="Submit for review →" />
        </form>
      </div>
    </div>
  );
};

export default Modal;
