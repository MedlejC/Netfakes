import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import "./PlansScreen.css";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

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
            const newProduct = {
              [productId]: {
                ...productData,
                prices: {
                  priceId: price.id,
                  priceData: price.data(),
                },
              },
            };

            // Use functional update to ensure the state includes all products
            setProducts((prevProducts) => ({
              ...prevProducts,
              ...newProduct,
            }));
          });
        });
      });
    };

    fetchProducts();
  }, []);
  console.log(products);

  const loadCheckout = async (priceId) => {
    // Create a reference to the checkout_sessions collection under the specific user
    const sessionCollectionRef = collection(
      doc(db, "customers", user.uid),
      "checkout_sessions"
    );

    // Add the new document in the sessionCollectionRef
    const docRef = await addDoc(sessionCollectionRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    // Attach the snapshot listener to the newly created document reference
    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occurred: ${error.message}`);
      }
      if (sessionId) {
        // Redirect to Checkout
        const stripe = await loadStripe(
          "pk_test_51P5vp8KqaLd8JU0Wpkk7ci92QbiZk5qXAgJzn5dvIEVXnWNzIgENqBgnszqUhEQEVxQpzEMm5uhISOXC72OOkvBW00PUfa9heL"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (user?.uid) {
        const subscriptionsRef = collection(
          doc(db, "customers", user.uid),
          "subscriptions"
        );
        try {
          const querySnapshot = await getDocs(subscriptionsRef);
          querySnapshot.forEach((subscriptionDoc) => {
            const subData = subscriptionDoc.data();
            setSubscription({
              role: subData.role,
              current_period_start: subData.current_period_start.seconds,
              current_period_end: subData.current_period_end.seconds,
            });
          });
        } catch (error) {
          console.error("Error fetching subscriptions: ", error);
        }
      }
    };

    fetchSubscriptions();
  }, [user.uid]);

  console.log(subscription);
  return (
    <div className="plansScreen">
      {subscription && (
        <p>
          Renewal Date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen__plan--disabled"
            } plansScreen__plan`}
          >
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Plan" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
