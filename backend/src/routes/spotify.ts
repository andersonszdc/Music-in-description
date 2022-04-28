import { Router } from "express";
import queryString from "query-string";
import { generateRandomString } from "../utils/generateRandomString";
import fetch from "node-fetch";

const router = Router();
const redirect_uri = process.env.REDIRECT_URI;
const client_id = process.env.CLIENT_ID_SPOTIFY;
const client_secret = process.env.CLIENT_SECRET_SPOTIFY;

let access_token: string;
let refresh_token: string;

router.get("/login", (req, res) => {
  let state = generateRandomString(16);
  let scope = "user-read-playback-state";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      queryString.stringify({
        response_type: "code",
        client_id,
        scope,
        redirect_uri: redirect_uri,
        state,
      })
  );
});

router.get("/callback", (req, res) => {
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        queryString.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: queryString.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri,
        client_id,
        client_secret,
      }),
    };

    fetch("https://accounts.spotify.com/api/token", options)
      .then((result) => result.json())
      .then((result: any) => {
        if (result.access_token) {
          access_token = result.access_token;
          refresh_token = result.refresh_token;
          res.json({ success: true });
        } else {
          res.json(result);
        }
      })
      .catch((error) => console.log(error));
  }
});

router.get("/refresh_token", (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token,
      client_id,
      client_secret,
    }),
  };

  fetch("https://accounts.spotify.com/api/token", options)
    .then((result) => result.json())
    .then((result: any) => {
      refresh_token = result.refresh_token;
      res.json(result);
    })
    .catch((error) => console.log(error));
});

router.get("/get-currently-playing", (req, res) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  fetch("https://api.spotify.com/v1/me/player/currently-playing", options)
    .then((result) => result.json())
    .then((result) => res.json(result))
    .catch((error) =>
      res.json({ message: error.message, status: error.status })
    );
});

export { router as authorization_spotify };
