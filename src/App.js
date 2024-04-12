import Navbar from "./Components/Navbar";
import ProCard from "./Components/ProCard";
import Cart from "./Components/Cart";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/login";
import Signup from "./Components/signup";
import Wholecomponent from "./Components/wholecomponent";
import Carousel from "./Components/Carousel";
import Addproduct from "./Components/addproduct";
import Adminpage from "./pages/adminpage";
import Transectionsuccess from "./pages/transectionsuccess";


const App = () => {
  const [prodiv, setProdiv] = useState(true);
  const [proRight, setProRight] = useState(true);
  const [cartProduct, setCartProduct] = useState([]);
  const [cartState, setCartState] = useState(true);
  const [data, Setdata] = useState([]);
  const [Record, SetRecord] = useState([]);
  const [handlebtn, setHandlebtn] = useState(true);
  const [uname, setUname] = useState("");
  const [uid, setUid] = useState("");
  const [updated, setUpdated] = useState(true);
  const [purchased, setPurchased] = useState(false);

  
console.log(uid )
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.post('http://localhost:2000/api/getcartproduct', { id: uid });
        setCartProduct(response.data.data.cartProducts);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    if (uid) {
      fetchCartData();
    }
  }, [uid]);


  useEffect(() => {
      axios.get("http://localhost:2000/api/getproducts").then((res) => {
        Setdata(res.data);
        SetRecord(res.data);
      } 
        )
      .catch((err) => console.log(err.toJSON().message));
  }, [updated]);

  const handler = (event) => {
    SetRecord(
      data.filter((f) => f.title.toLowerCase().includes(event.target.value))
    );
  };

  function cartHandler() {
    setCartState(false);
    // setCartProduct(  )
  }

  function cutCartHandler() {
    setCartState(true);
    setProRight(true);
  }

  function productHandlerNav(e) {
    e.preventDefault();
    setProdiv(false);
    setProRight(true);
  }

  function cutHandler() {
    setProdiv(true);
    setProRight(false);
  }

  
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login setUname={setUname} setUid={setUid} setHandlebtn={setHandlebtn} />}
        />
        <Route
          path="/"
          element={
            <Wholecomponent>
              {cartState === true ? (
                <>
                  <Navbar
                    uid={uid}
                    uname={uname}
                    setUname={setUname}
                    setHandlebtn={setHandlebtn}
                    handlebtn={handlebtn}
                    productHandlerNav={productHandlerNav}
                    cartProduct={cartProduct}
                    cartHandler={cartHandler}
                    handler={handler}
                  />
                  <Carousel />
                  <ProCard
                    uid={uid}
                    prodiv={prodiv}
                    setHandlebtn={setHandlebtn}
                    handlebtn={handlebtn}
                    setProdiv={setProdiv}
                    cutHandler={cutHandler}
                    setProRight={setProRight}
                    proRight={proRight}
                    setCartProduct={setCartProduct}
                    cartProduct={cartProduct}
                    Record={Record}
                    SetRecord={SetRecord}
                    purchased={purchased}
                  />{" "}
                </>
              ) : (
                <Cart
                  cutCartHandler={cutCartHandler}
                  cartProduct={cartProduct}
                  setCartProduct={setCartProduct}
                  uid={uid}
                  setPurchased={setPurchased}

                />
              )}

            
            </Wholecomponent>
          }
        />
        < Route path={`/${uid}/addproduct`} element={ <Addproduct/>}/>
        < Route path="/:id" element={ <Adminpage uid={uid} />}/>
        < Route path="/transectionsuccess" element={ <Transectionsuccess />}/>
       
      </Routes>
    </div>
  );
};

export default App;
