import { Router } from "express";
import queryString from "query-string";
import { generateRandomString } from "./utils/generateRandomString";
import fetch from "node-fetch";
import { TwitterApi } from "twitter-api-v2";

const {
  API_KEY_TWITTER,
  API_KEY_SECRET_TWITTER,
  ACCESS_TOKEN_TWITTER,
  ACCESS_TOKEN_SECRET_TWITTER,
  CLIENT_ID_SPOTIFY,
  CLIENT_SECRET_SPOTIFY,
  API_BASE_URL,
} = process.env;

const router = Router();

const redirect_uri = API_BASE_URL + "/callback";
const client_id = CLIENT_ID_SPOTIFY;
const client_secret = CLIENT_SECRET_SPOTIFY;

router.get("/authorize", (req, res) => {
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

router.get("/callback", async (req, res) => {
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

    try {
      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        options
      );
      const result = await response.json();

      if (!result.access_token) {
        return res.status(400).json("Ocorreu um erro!");
      }

      const new_params = new URLSearchParams([
        ["access_token", result.access_token],
        ["refresh_token", result.refresh_token],
      ]);

      await fetch(`${process.env.WORKER_URL}/?${new_params}`);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

router.get("/refresh_token", async (req, res) => {
  const { refresh_token } = req.query;

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

  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      options
    );
    const result = await response.json();

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/worker-test", async (req, res) => {
  const { access_token } = req.query;

  if (!API_KEY_TWITTER || !API_KEY_SECRET_TWITTER) {
    return res.status(500).json("Sem variáveis de ambiente!");
  }

  const userClient = new TwitterApi({
    appKey: API_KEY_TWITTER,
    appSecret: API_KEY_SECRET_TWITTER,
    accessToken: ACCESS_TOKEN_TWITTER,
    accessSecret: ACCESS_TOKEN_SECRET_TWITTER,
  });

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/currently-playing`,
      options
    );

    if (response.status === 204) {
      await userClient.v1.updateAccountProfile({
        description: `🇧🇷 Full-stack developer - UI/UX Designer - Self-taught | I'm not listening to music`,
      });
      return res.status(200).json("Atualizado com sucesso!");
    }

    const result = await response.json();

    if (result.error) {
      throw result.error;
    } else {
      await userClient.v1.updateAccountProfile({
        description: `🇧🇷 Full-stack developer - UI/UX Designer - Self-taught | I'm listening to "${result.item.name} - ${result.item.artists[0].name}"`,
      });
      return res.status(200).json("Atualizado com sucesso!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
