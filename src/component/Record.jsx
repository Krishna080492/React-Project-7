import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Record() {

  let [emp, setEmp] = useState([]);
  let navigator = useNavigate()
  useEffect(() => {
    fetchRecord()
  }, [])

  let fetchRecord = () => {
    fetch('http://localhost:3000/employee', {
      method: 'GET',
    }).then(async (res) => {
      let data = await res.json()
      console.log(data);
      setEmp(data)
    }).catch((error) => {
      console.log(error);
    })
  }

  let deleteRecord = (id) => {
    fetch(`http://localhost:3000/employee/${id}`, {
      method: 'DELETE'
    }).then(() => {
      console.log("Data Deleted");
      fetchRecord();
    }).catch((error) => {
      console.error(error);
    })
  }

  let editRecord = (id) => {
    navigator(`/editRecord/${id}`)
  }

  return (
    <>
      <h2 style={{ textAlign: "center", margin: "20px auto", textDecoration: "underline", color: "#1e2fac", fontWeight: "700" }}>Empoyee Data</h2>
      <div className='d-flex justify-content-center my-3'>
        <Link to='/' className='btn' style={{ backgroundColor: "#071581", color: '#fff' }}>Registration Form</Link>
      </div>
      <table className="table table-primary table-striped">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Hobbies</th>
            <th>Address</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            emp.map((e) => (
              <tr key={e.id} style={{ textAlign: 'center' }}>
                <td>{e.id}</td>
                <td>{e.fname}</td>
                <td>{e.lname}</td>
                <td>{e.email}</td>
                <td>{e.password}</td>
                <td>{e.gender}</td>
                <td>{Array.isArray(e.hobby) ? e.hobby.join(', ') : e.hobby}</td>
                <td>{e.address}</td>
                <td>{e.city}</td>
                <td><button onClick={() => deleteRecord(e.id)} className='mx-3'>Delete</button>
                  <button onClick={() => editRecord(e.id)}>Edit</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default Record