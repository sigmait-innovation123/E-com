import React, { useState } from "react";
import { Link } from "react-router-dom";
// import user from "../../model/usermodel"

// const user = require('../../model/usermodel');

export default function Signup( ) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

 

  function userName(e) {
    setName(e.target.value);
  }
  function userEmail(e) {
    setEmail(e.target.value);
  }
  function userPassword(e) {
    setPassword(e.target.value);
  }

 async function signupDetail() {

  const respons = await fetch("http://localhost:2000/api/creatuser",{
    method:"POST",
    headers:{
      "Content-Type" : "application/json"
    },
    body:JSON.stringify({name:name, email:email, password:password})
  })

    const json = await respons.json();
    console.log(json)
    
    

    
  }



  return (
    <div className="row justify-content-center pt-5">
      <form className=" col-8 text-start">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            name
          </label>
          <input
            onChange={userName}
            name="name"
            type="text"
            className="form-control"
            id="exampleInputname"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={userEmail}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={userPassword}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            
          />
        </div>
        {name && email && password ? <Link className="btn btn-primary" onClick={signupDetail} to = '/login' >
          signup
        </Link> :<div className="btn btn-primary"   >
         signup
       </div>
        }


        
      </form>
    </div>
  );
}
