import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import "./PlansScreen.css";

function PlansScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), where("active", "==", true));
      const querySnapshot = await getDocs(q);
      const productsObj = {};

      querySnapshot.forEach((productDoc) => {
        const productId = productDoc.id;
        const productData = productDoc.data();

        // Fetch prices within the product document
        getDocs(collection(productDoc.ref, "prices")).then((priceSnap) => {
          priceSnap.docs.forEach((price) => {
            productsObj[productId] = {
              ...productData,
              prices: {
                priceId: price.id,
                priceData: price.data(),
              },
            };
          });
          setProducts(productsObj);
        });
      });
    };

    fetchProducts();
  }, []);

  console.log(products);

  const loadCheckout = async (priceId) => {};

  return (
    <div className="plansScreen">
      {Object.entries(products).map(([productId, productData]) => {
        return (
          <div className="plansScreen__plan">
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => loadCheckout(productData.prices.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
