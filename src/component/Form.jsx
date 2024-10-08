import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {

  let [empData, setEmpData] = useState({});
  let [hobby, setHobby] = useState([]);
  let [errors, setErrors] = useState({});
  let navigator = useNavigate();

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
      setEmpData({ ...empData, hobby: newHobby }); // Update empData with the updated hobby array
    } else {
      setEmpData({ ...empData, [name]: value });
    }
  }
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
      fetch('http://localhost:3000/employee', {
        method: 'POST',
        body: JSON.stringify(empData)
      }).then(() => {
        // console.log("Data Added");
        toast.success("Record Added Successfully..")
        setTimeout(() => {
          navigator('/emprecord')
        }, 2000);
      }).catch((error) => {
        // console.log(error);
        toast.error(error)
      })
    } else {
      toast.error("All filds are required..");
    }
  }

  return (
    <>
      <div className="container " style={{ width: "75%", margin: "70px auto" }}>
        <h3 className='d-flex justify-content-center align-items-center my-5' style={{ textDecoration: "underline" }}>Employee Registration Form</h3>
        <form className="row g-3 d-flex justify-content-center align-items-center py-3" onSubmit={handleSubmit} style={{ width: "100%", backgroundColor: "rgba(228,0,112,0.3)", border: "3px solid #020024", borderRadius: "30px", fontWeight: "600" }}>
          <div className="col-md-5 my-3">
            <label className="form-label">First Name : </label>
            <input type="text" className="form-control" name='fname' onChange={handleInput}/> 
            {errors.fname && <div className="text-danger">{errors.fname}</div>}
          </div>
          <div className="col-md-5 my-3">
            <label className="form-label">Last Name : </label>
            <input type="text" className="form-control" name='lname' onChange={handleInput} /> 
            {errors.lname && <div className="text-danger">{errors.lname}</div>}
          </div>
          <div className="col-md-5 my-3">
            <div className="input-group">
              <span className="input-group-text">Email : </span>
              <input type="email" className="form-control" name='email' onChange={handleInput} />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
          </div>
          <div className="col-md-5 my-3">
            <div className="input-group">
              <span className="input-group-text">Password : </span>
              <input type="password" className="form-control" name='password' onChange={handleInput} />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
          </div>
          <div className="col-md-5 my-3">
            <label className='form-label' style={{ marginRight: "15px" }}>Gender : </label>
            <div className="form-check form-check-inline">
              <input type="radio" name='gender' value='male' className="form-check-input" onChange={handleInput} />
              <label htmlFor="male" className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" name='gender' value='female' className="form-check-input" onChange={handleInput} />
              <label htmlFor="female" className="form-check-label">Female</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" name='gender' value='other' className="form-check-input" onChange={handleInput} />
              <label htmlFor="other" className="form-check-label">Others</label>
            </div>
            {errors.gender && <div className="text-danger">{errors.gender}</div>}
          </div>
          <div className="col-md-5 my-3">
            <label className="form-check-label" style={{ marginRight: "15px" }}>Hobbies: </label>
            <div className="form-check form-check-inline">
              <input type="checkbox" name='hobby' value='dancing' className="form-check-input" onChange={handleInput} />
              <label htmlFor="dancing" className="form-check-label">Dancing</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" name='hobby' value='singing' className="form-check-input" onChange={handleInput} />
              <label htmlFor="singing" className="form-check-label">Singing</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" name='hobby' value='ridding' className="form-check-input" onChange={handleInput} />
              <label htmlFor="ridding" className="form-check-label">Ridding</label>
            </div>
            {errors.hobby && <div className="text-danger">{errors.hobby}</div>}
          </div>
          <div className="col-md-5 my-3">
            <label className="form-label" style={{ marginRight: "10px" }}>Address : </label>
            <textarea name="address" id="" cols="53" rows="2" onChange={handleInput}></textarea>
            {errors.address && <div className="text-danger">{errors.address}</div>}
          </div>
          <div className="col-md-5 my-3">
            <label className="form-label">City : </label>
            <select className="form-select" name='city' onChange={handleInput}>
              <option selected disabled> ---Select City---</option>
              <option value="surat">Surat</option>
              <option value="pune">Pune</option>
              <option value="mumbai">Mumbai</option>
            </select>
            {errors.city && <div className="text-danger">{errors.city}</div>}
          </div>
          <div className="col-12 d-flex justify-content-center align-items-center">
            <button className="btn fw-bold" type="submit" style={{ marginRight: "10px", background: "#020024", color: "#fff" }}>Submit</button>
            <Link to='/emprecord' className='btn' style={{ backgroundColor: "#071581", color: '#fff' }}>View Record</Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Form;
