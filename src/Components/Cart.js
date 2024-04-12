import axios from "axios";
import "./Cart.css";


const Cart = ({ cutCartHandler, cartProduct, setPurchased, setCartProduct, uid }) => {
  console.log(cartProduct);
  const cartProductHandler = async (id) => {
    setCartProduct(
      cartProduct.filter((cartProduct) => cartProduct.productId !== id)
    );

    await fetch("http://localhost:2000/api/removecartproduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: uid, cartproductid: id }),
    });
  };

  const totalQuantity = cartProduct.reduce(
    (sum, product) => sum + product.qty,
    0
  );
  const totalSubtotal = cartProduct.reduce(
    (sum, product) => sum + product.subtotal,
    0
  );

  const increaseQuantity = (productId) => {
    setCartProduct((prevCartProducts) =>
      prevCartProducts.map((product) =>
        product.productId === productId
          ? {
              ...product,
              qty: product.qty + 1,
              subtotal: (product.qty + 1) * Math.round(product.price),
            }
          : product
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartProduct((prevCartProducts) =>
      prevCartProducts.map((product) =>
        product.productId === productId && product.qty > 1
          ? {
              ...product,
              qty: product.qty - 1,
              subtotal: (product.qty - 1) * Math.round(product.price),
            }
          : product
      )
    );
  };

  const checkoutHandler = async (amount) => {
    
    const {data :{key}}= await axios.get('http://localhost:2000/api/getkey')
    const {data:{order}}= await axios.post('http://localhost:2000/api/checkout',{amount})

    var options = {
      key, 
      "amount": order.amount,
      "currency": "INR",
      "name": "Ecom",
      "description": "Test Transaction",
      "image": "https://avatars.githubusercontent.com/u/127954506?v=4",
      "order_id": order.id, 
      "callback_url": "http://localhost:2000/api/paymentverification",
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000"
      },
      "notes": {
          "address": "Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  var razor = new window.Razorpay(options);
      razor.open();
}

  return (
    <div className="cart-main">
      <div className="cart-header">
        <div className="cart-title">CART PRODUCTS</div>{" "}
        <button className="cart-cross delete-button" onClick={cutCartHandler}>
          X
        </button>
      </div>

      <div className="cart-products">
        <div className="all-products">
          {cartProduct.map((product) => (
            <div className="cart-product-card">
              <div className="product-cross">
                <img
                  className="product-img"
                  src={product.image}
                  style={{ width: "150px", height: "150px" }}
                  alt="..."
                />
                <button
                  className="delete-button"
                  onClick={() => {
                    cartProductHandler(product.productId);
                  }}
                >
                  X
                </button>
              </div>
              <h5 className="right-product-title">{product.title}</h5>
              <button className="right-product-price">
                ${Math.round(product.price)}
              </button>
              <br />
              <input
                min="1"
                className="right-product-input"
                value={product.qty}
                type="number"
              />
              <br />
              <div className="inc-dic-to">
                <div>
                  <button
                    className="decrease-btn"
                    onClick={() => decreaseQuantity(product.productId)}
                  >
                    -
                  </button>
                  <button
                    className="increase-btn"
                    onClick={() => increaseQuantity(product.productId)}
                  >
                    +
                  </button>
                </div>
                <div className="sub-total">
                  Subtotal: ${Math.round(product.subtotal)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="buy-all-products">
          <div className="total">
            Subtotal ({totalQuantity} items): ${totalSubtotal}
          </div>
          <button className="buying-button">
            <span className="" onClick={() => checkoutHandler(totalSubtotal)}>
              Procced to Buy
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
