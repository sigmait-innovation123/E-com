import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Addproduct() {

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [price, setPrice] = useState()
  const [image, setImage] = useState()
  const [category, setCategory] = useState()
  
  let navigate = useNavigate()


  async function addProduct() {

    if(!title){
       return alert("insert title")
    }
    if(!description){
      return alert("insert description")

    }
    if(!price){
      return alert("insert price")
    }
    if(!category){
      return alert("insert category")
    }
    if(!image){
      return alert("insert image URL")
    }
    else{
    const respons = await fetch('http://localhost:2000/api/addproduct', {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({title:title,  description:description, price:price, image:image, category:category })

    } )
     const json = await respons.json();
     if (!json.success){
        
      alert(json.error)
     }

     else{
      
      console.log("succes")
      navigate('/adminpanel')
     }
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center ">
        <div className="product-add">
          <div className="cross-main">
            <h1 style={{ fontSize: "18px", marginLeft: "10px" }}>
              Add your Product
            </h1>
            <Link
              className="cross  text-decoration-none"
              style={{ color: "black" }}
              to="/adminpanel"
            >
              X
            </Link>
          </div>
          <div>
            <input
              type="text"
              style={{ borderRadius: "8px", border: "1px solid black" }}
              placeholder="Enter Title"
              onChange={(e)=>setTitle(e.target.value) }
              />
          </div>
          <div>
            <input
              type="text"
              style={{ borderRadius: "8px", border: "1px solid black" }}
              placeholder="Enter Discription"
              onChange={(e)=>setDescription(e.target.value) }
            />
          </div>
          <div>
            <input
              type="number"
              style={{ borderRadius: "8px", border: "1px solid black" }}
              placeholder="Enter price in USD"
              onChange={(e)=>setPrice(e.target.value) }
            />
          </div>
          <div className="">
            <label for="cars" style={{ display: "block" }}>
              Choose a catogry:
            </label>
            <select
              style={{ borderRadius: "8px", border: "1px solid black" }}
              name="catogery"
              id="catogery"
              onChange={(e)=>setCategory(e.target.value) }
            >
              <option value="electronics">electronics</option>
              <option value="women's clothing">women's clothing</option>
              <option value="jewelery">jewelery</option>
              <option value="men's clothing">men's clothing</option>
            </select>
          </div>
          <div>
            <h6 style={{ marginLeft: "5px" }}>Add Image URL</h6>
            <input
              type="url"
              style={{ borderRadius: "8px", border: "1px solid black" }}
              placeholder="Add Image URL"
              onChange={(e)=>setImage(e.target.value) }
            />
          </div>
          <div className="add-btn">
            <button className="btn btn-outline-success" onClick={addProduct} >Add</button>
          </div>
        </div>
      </div>
    </>
  );
}
