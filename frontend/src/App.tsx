import React from "react";
import "./App.css";

function App() {
  return (
    <main className="App">
      <section>
        <h1 className="title">
          Update twitter description with currently playing music
        </h1>
        <div className="action">
          <button className="btn btn-spotify">
            <img src="/icons/spotify.svg" alt="spotify icon" />
            Log in with spotify
          </button>
          <button className="btn btn-twitter">
            <img src="/icons/twitter.svg" alt="twitter icon" />
            Log in with twitter
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
