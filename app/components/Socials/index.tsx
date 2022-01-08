import {
  DISCORD_URL,
  INSTAGRAM_URL,
  TELEGRAM_URL,
  TWITTER_URL,
  YOUTUBE_URL,
} from "../../constants";
import Discord from "../Icons/Discord";
import Instagram from "../Icons/Instagram";
import Telegram from "../Icons/Telegram";
import Twitter from "../Icons/Twitter";
import IconsWrapper from "../Icons/Wrapper";
import YouTube from "../Icons/YouTube";
import styles from "./Socials.module.css";

export default function Socials() {
  const openTwitter = () => window.open(TWITTER_URL, "_blank");
  const openInstagram = () => window.open(INSTAGRAM_URL, "_blank");
  const openDiscord = () => window.open(DISCORD_URL, "_blank");
  const openTelegram = () => window.open(TELEGRAM_URL, "_blank");
  const openYouTube = () => window.open(YOUTUBE_URL, "_blank");
  return (
    <div className={styles.container}>
      <IconsWrapper onClick={openTwitter}>
        <Twitter />
      </IconsWrapper>
      <IconsWrapper onClick={openInstagram}>
        <Instagram />
      </IconsWrapper>
      <IconsWrapper onClick={openDiscord}>
        <Discord />
      </IconsWrapper>
      <IconsWrapper onClick={openTelegram}>
        <Telegram />
      </IconsWrapper>
      <IconsWrapper onClick={openYouTube}>
        <YouTube />
      </IconsWrapper>
    </div>
  );
}
