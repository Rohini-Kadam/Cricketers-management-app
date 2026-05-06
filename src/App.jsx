import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [cricketers, setCricketers] = useState([]);
  const [editId, setEditId] = useState(null);

  // Add or Update cricketer
  async function savedata(data) {
    const formData = new FormData();
    formData.append("Name", data.Name);
    formData.append("Information", data.Information);
    formData.append("Image", data.Image[0]); // take the first file

    try {
      if (editId) {
        await axios.put(`http://localhost:4000/cricketers/${editId}`, data);
        alert("Cricketer updated successfully!");
        setEditId(null);
      } else {
        // Upload image first (simulate upload since JSON Server can’t handle files)
        // In real apps, backend should handle this file upload
        const imageUrl = URL.createObjectURL(data.Image[0]); // temporary preview URL

        const newCricketer = {
          Name: data.Name,
          Information: data.Information,
          Image: imageUrl, // store the preview URL or uploaded file URL
        };

        await axios.post("http://localhost:4000/cricketers", newCricketer);
        alert("Cricketer added successfully!");
      }

      reset();
      showCricketers();
    } catch (err) {
      console.error(err);
      alert("Error while saving data!");
    }
  }

  // Show cricketers
  function showCricketers() {
    axios
      .get("http://localhost:4000/cricketers")
      .then((res) => setCricketers(res.data))
      .catch((err) => console.log(err));
  }

  // Delete cricketer by ID
  function deleteCricketer(id) {
    axios
      .delete(`http://localhost:4000/cricketers/${id}`)
      .then(() => {
        alert("Cricketer deleted!");
        showCricketers();
      })
      .catch((err) => console.log(err));
  }

  // Edit cricketer
  function editCricketer(cricketer) {
    setEditId(cricketer.id);
    setValue("Name", cricketer.Name);
    setValue("Information", cricketer.Information);
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">Cricketer Management</h2>

      <form
        onSubmit={handleSubmit(savedata)}
        className="border p-4 rounded shadow"
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            {...register("Name")}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Information:</label>
          <input
            type="text"
            {...register("Information")}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image:</label>
          <input
            type="file"
            {...register("Image")}
            accept="image/*"
            className="form-control"
            required={!editId}
          />
        </div>

        <button type="submit" className="btn btn-success me-2">
          {editId ? "Update Cricketer" : "Add Cricketer"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => reset()}
        >
          Clear
        </button>
      </form>

      <div className="mt-4">
        <button onClick={showCricketers} className="btn btn-primary mb-3">
          Show Cricketers
        </button>

        <table className="table table-bordered table-striped">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Information</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {cricketers.length > 0 ? (
              cricketers.map((cricketer) => (
                <tr key={cricketer.id}>
                  <td>{cricketer.id}</td>
                  <td>{cricketer.Name}</td>
                  <td>{cricketer.Information}</td>
                  <td>
                    {cricketer.Image ? (
                      <img
                        src={cricketer.Image}
                        alt={cricketer.Name}
                        width="80"
                        height="80"
                        style={{ borderRadius: "8px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => editCricketer(cricketer)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCricketer(cricketer.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Cricketers Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
