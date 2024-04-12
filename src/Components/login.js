import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



export default function Login( {setHandlebtn,  setUname, setUid} ) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate()

  function loginPassword(e){
    setPassword(e.target.value)
  }

  function loginMail(e){
    setEmail(e.target.value)
  }

  async function loginDetail(e) {
    e.preventDefault()

    const respons = await fetch(`http://localhost:2000/api/loginuser`,{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({email:email, password:password })
    })
      const json = await respons.json();
      if(!json.success){
       return alert(json.error)
      }
      if(json.roll === "admin"){
        setUid(json.id)
       return navigate("/"+json.id)
      }
    

      else{
        setHandlebtn(false)
        setUname(json.name)
        setUid(json.id)
        navigate("/")

      }
    }

  return (
    <div className='row justify-content-center mt-5'><form className=" col-8 text-start">
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Email address
      </label>
      <input
        onChange={loginMail}
        type="email"
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
      onChange={loginPassword}
        type="password"
        className="form-control"
        id="exampleInputPassword1"
      />
    </div>
   
    <button type="submit" className="btn btn-primary" onClick={loginDetail}>
      Login
    </button>
    <Link  className="px-4 link-underline-dark " to="/signup">
      i'm new 
    </Link>
  </form></div>
  )
}
