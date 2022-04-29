import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";

const Home = () => {
  const location = useLocation();
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    if (location.search) {
      fetch(`${process.env.REACT_APP_BASE_API_URL}/callback${location.search}`)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          result.success && setLogged(true);
        });
    }
    return () => {
      setLogged(false);
    };
  }, [location]);

  return (
    <main className="App">
      <section>
        <h1 className="title">
          Update twitter description with currently playing music
        </h1>
        <div className="action">
          <button className="btn-wrapper">
            <a
              className="btn-link btn-spotify"
              href={process.env.REACT_APP_BASE_API_URL + "/login"}
            >
              <img src="/icons/spotify.svg" alt="spotify icon" />
              {isLogged ? "Logged" : "Log in with spotify"}
            </a>
          </button>
          <button className="btn-wrapper">
            <a
              className="btn-link btn-twitter"
              href={process.env.REACT_APP_BASE_API_URL + "/login"}
            >
              <img src="/icons/twitter.svg" alt="twitter icon" />
              Log in with twitter
            </a>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
