import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditRecord() {
  let [empData, setEmpData] = useState({});
  let [errors, setErrors] = useState({});
  let navigator = useNavigate();
  let { id } = useParams();

  const fetchRecord = () => {
    fetch(`http://localhost:3000/employee/${id}`, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((empData) => {
        setEmpData(empData);
        // toast.success("Record fetched successfully");
      })
      .catch((error) => {
        console.error(error);
        // toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  let handleInput = (e) => {
    let { name, value } = e.target;

    if (name === 'hobby') {
      let newHobby = [...(empData.hobby || [])];

      if (e.target.checked) {
        newHobby.push(value);
      } else {
        let pos = newHobby.findIndex((v) => value === v);
        newHobby.splice(pos, 1);
      }
      setEmpData({ ...empData, hobby: newHobby });
    } else {
      setEmpData({ ...empData, [name]: value });
    }
  };

  let validate = () => {
    let tempErrors = {};
    if (!empData.fname) tempErrors.fname = "First Name is required.";
    if (!empData.lname) tempErrors.lname = "Last Name is required.";
    if (!empData.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(empData.email)) {
      tempErrors.email = "Email is not valid.";
    }
    if (!empData.password) tempErrors.password = "Password is required.";
    if (!empData.gender) tempErrors.gender = "Gender is required.";
    if (!empData.hobby || empData.hobby.length === 0) tempErrors.hobby = "At least one hobby is required.";
    if (!empData.address) tempErrors.address = "Address is required.";
    if (!empData.city) tempErrors.city = "City is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch(`http://localhost:3000/employee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(empData)
      }).then(() => {
        toast.info("Record Updated Successfully..")
        setTimeout(() => {
          navigator('/emprecord')
        }, 2000);
      }).catch((error) => {
        toast.error(error.message);
      });
    } else {
      toast.error("All filds are required..");
    }
  };

  return (
    <>
      <div className="container " style={{ width: "75%", margin: "70px auto" }}>
        <h3 className='d-flex justify-content-center align-items-center my-5' style={{ textDecoration: "underline" }}>Employee Update Form</h3>

        <form className="row g-3 d-flex justify-content-center align-items-center py-3" onSubmit={handleSubmit} style={{ width: "100%", backgroundColor: "rgba(228,0,112,0.3)", border: "3px solid #020024", borderRadius: "30px", fontWeight: "600" }}>
          <div className="col-md-5 my-3">
            <label className="form-label">First Name : </label>
            <input type="text" className="form-control" name='fname' value={empData.fname || ''} onChange={handleInput} />
          </div>
          <div className="col-md-5 my-3">
            <label className="form-label">Last Name : </label>
            <input type="text" className="form-control" name='lname' value={empData.lname || ''} onChange={handleInput} />
          </div>
          <div className="col-md-5 my-3">
            <div className="input-group">
              <span className="input-group-text">Email : </span>
              <input type="email" className="form-control" name='email' value={empData.email || ''} onChange={handleInput} />
            </div>
          </div>
          <div className="col-md-5 my-3">
            <div className="input-group">
              <span className="input-group-text">Password : </span>
              <input type="password" className="form-control" name='password' value={empData.password || ''} onChange={handleInput} />
            </div>
          </div>
          <div className="col-md-5 my-3">
            <label className='form-label' style={{ marginRight: "15px" }}>Gender : </label>
            <div className="form-check form-check-inline">
              <input type="radio" name='gender' value='male' className="form-check-input" checked={empData.gender === 'male'} onChange={handleInput} />
              <label htmlFor="male" className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" name='gender' value='female' className="form-check-input" checked={empData.gender === 'female'} onChange={handleInput} />
              <label htmlFor="female" className="form-check-label">Female</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" name='gender' value='other' className="form-check-input" checked={empData.gender === 'other'} onChange={handleInput} />
              <label htmlFor="other" className="form-check-label">Others</label>
            </div>
          </div>
          <div className="col-md-5 my-3">
            <label className="form-check-label" style={{ marginRight: "15px" }}>Hobbies: </label>
            <div className="form-check form-check-inline">
              <input type="checkbox" name='hobby' value='dancing' className="form-check-input" checked={empData.hobby?.includes('dancing')} onChange={handleInput} />
              <label htmlFor="dancing" className="form-check-label">Dancing</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" name='hobby' value='singing' className="form-check-input" checked={empData.hobby?.includes('singing')} onChange={handleInput} />
              <label htmlFor="singing" className="form-check-label">Singing</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" name='hobby' value='ridding' className="form-check-input" checked={empData.hobby?.includes('ridding')} onChange={handleInput} />
              <label htmlFor="ridding" className="form-check-label">Riding</label>
            </div>
          </div>
          <div className="col-md-5 my-3">
            <label className="form-label" style={{ marginRight: "10px" }}>Address : </label>
            <textarea name="address" cols="53" rows="2" value={empData.address || ''} onChange={handleInput}></textarea>
          </div>
          <div className="col-md-5 my-3">
            <label className="form-label">City : </label>
            <select className="form-select" name='city' value={empData.city || ''} onChange={handleInput}>
              <option disabled> ---Select City---</option>
              <option value="surat">Surat</option>
              <option value="pune">Pune</option>
              <option value="mumbai">Mumbai</option>
            </select>
          </div>
          <div className="col-12 d-flex justify-content-center align-items-center">
            <button className="btn fw-bold" type="submit" style={{ marginRight: "10px", background: "#020024", color: "#fff" }}>Update</button>
            <Link to='/emprecord' className='btn' style={{ backgroundColor: "#071581", color: '#fff' }}>View Record</Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default EditRecord;
