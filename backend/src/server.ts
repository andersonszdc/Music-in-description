import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { TwitterApi } from "twitter-api-v2";
import { authorization_spotify } from "./routes/spotify";
import cors from "cors";
import fetch from "node-fetch";

const port = process.env.PORT || 4000;
const corsOptions = {
  origin: process.env.REDIRECT_URI,
};

const app = express();

app.use(cors(corsOptions));

app.use(authorization_spotify);

app.listen(port, () => console.log("🚀👨‍🚀 server running..."));

const {
  API_KEY_TWITTER,
  API_KEY_SECRET_TWITTER,
  ACCESS_TOKEN_TWITTER,
  ACCESS_TOKEN_SECRET_TWITTER,
} = process.env;

if (API_KEY_TWITTER && API_KEY_SECRET_TWITTER) {
  const userClient = new TwitterApi({
    appKey: API_KEY_TWITTER,
    appSecret: API_KEY_SECRET_TWITTER,
    accessToken: ACCESS_TOKEN_TWITTER,
    accessSecret: ACCESS_TOKEN_SECRET_TWITTER,
  });

  (async () => {
    setInterval(async () => {
      const response = await fetch(
        `http://localhost:${port}/get-currently-playing`
      );
      const result: any = await response.json();

      if (result.error) {
        await fetch(`http://localhost:${port}/refresh_token`);
        console.log(result);
      } else {
        if (result.message) {
          // spotify desligado
          await userClient.v1.updateAccountProfile({
            description: `🇧🇷 Full-stack developer - UI/UX Designer - Self-taught | I'm not listening to music`,
          });
        } else {
          await userClient.v1.updateAccountProfile({
            description: `🇧🇷 Full-stack developer - UI/UX Designer - Self-taught | I'm listening to "${result.item.name} - ${result.item.artists[0].name}"`,
          });
        }
      }
    }, 30000);
  })();
}
