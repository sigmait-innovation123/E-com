import React, { useEffect, useState } from "react";
import "./adminpage.css";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Adminpage() {
  const [users, setUsers] = useState([{ name: "", email: "", roll: "" }]);
  const [changes, setChanges] = useState(false);
  const [editID, setEditID] = useState();
  const [editRoll, setEditRoll] = useState();


  const editeDetails = (userid) => {
    setEditID(userid)
    setChanges(true) ; 
  };

  const saveChanges = async () => {

    if (window.confirm("Confirm")) {
      await fetch("http://localhost:2000/api/edituser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editID, roll:editRoll }),
      });
      setChanges(false)
    }
    
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2000/api/getusers");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchData();
  }, [users]);
  

 

  const removeUserfunc = async (id) => {
    if (window.confirm("Are you confirm")) {
      await fetch("http://localhost:2000/api/removeuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });
    }
  };

  return (
    <div className="admin-main">
      <div className="admin-navbar">
        <div className="admin-nav-left">admin panel</div>
        <div className="admin-nav-right"></div>
      </div>
      <div className="main-content">
        <div className="left-div">
          <Link
            className="btn btn-outline-primary"
            // onClick={productHandlerNav}
            style={{ width: "100%" }}
            to={`./addproduct`}
          >
            ADD PRODUCT
          </Link>

          <button className="btn mt-2 w-100 btn-outline-primary" to="./users">
            USERS
          </button>
        </div>
        <div className="right-div p-3">
          <div className="right-inner p-4">
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col" className="text-center " >No.</th>
                  <th scope="col" className="text-center " >Name</th>
                  <th scope="col" className="text-center " >Email</th>
                  <th scope="col" className="text-center " >Roll</th>
                  <th scope="col" className="text-center">
                    Edit
                  </th>
                  <th scope="col" className="text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody style={{ cursor: "pointer" }}>
                {users.map((user, index) => (
                  <tr key={index}>
                    <th scope="row" className="text-center" >{index + 1}</th>
                    <td className="text-center" > {user.name} </td>
                    <td className="text-center" > {user.email} </td>
                    {changes === false || editID !== user._id ? (
                      <td className="text-center" > {user.roll} </td>
                    ) : (
                      <td className="">
                      
                        <select className=""  onChange={(e)=>setEditRoll(e.target.value)}>
                          <option className="" value={user.roll} >{user.roll}</option>
                          <option className="" value={user.roll === "admin" ? "user" : "admin" } >{user.roll === "admin" ? "user" : "admin" }</option>
                        </select>
                      </td>
                    )}
                    <td className="text-center">
                     
                      {changes === false || editID !== user._id ? <button
                        className="btn btn-outline-success   "
                        onClick={() =>{ editeDetails(user._id)} }
                      >
                        edit
                      </button>:<div className="d-flex gap-1 justify-content-center "><button
                        className="btn btn-outline-success "  onClick={()=>saveChanges()}  
                      > save
                      </button><button
                        className="btn btn-outline-success "   onClick={()=>setChanges(false)} > cancel
                      </button></div> }
                    </td>
                    <td
                      className="text-center fw-bolder "
                      onClick={() => removeUserfunc(user._id)}
                    >
                      X
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className=" d-flex justify-content-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
