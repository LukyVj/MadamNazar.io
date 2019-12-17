/** @jsx jsx */
import React, { Component } from "react";
import * as ReactGA from "react-ga";
import { css, jsx } from "@emotion/core";
import {
  WEBSITE_NAME,
  PATREON_URL,
  TWITTER_URL,
  TWITTER_NAME,
  DISCORD_URL
} from "../../scripts/constants";
import Modal from "../../components/Modal";

class PatreonModal extends Component {
  handleModalClose = () => {
    const { onClose } = this.props;

    ReactGA.event({
      category: "click.patreon.modal.button",
      action: `Click on close`
    });

    onClose();
  };

  render() {
    return (
      <Modal onClose={this.handleModalClose}>
          <div className="w-100p" css={css`height: 200px;`}>
            <img
              src="https://res.cloudinary.com/hckp6e9ap/image/upload/e_grayscale/v1571648033/website/EHKUGFMXUAALGE3_jbmxwo.jpg"
              css={css`
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top center;
          `}
              alt="Madam Nazar Old Fashion"
            />
          </div>
          <p>
            Dear collectors, just a quick message you'll see only once{" "}
            <span role="img" aria-label="emoji scroll">
          📜
        </span>
          </p>
          <p>
            This website is maintained by{" "}
            <a
              href="https://twitter.com/lukyvj"
              onClick={() => {
                ReactGA.event({
                  category: "click.patreon.modal.link",
                  action: "Click on LukyVj Twitter profile"
                });
              }}
            >
              myself
            </a>{" "}
            on my free time, I do it because I love Red Dead Redemption 2, and I love
            to help communities.
          </p>
          <p>
            If you love {WEBSITE_NAME} and want to support us, you can make a donation
            on{" "}
            <a
              href={PATREON_URL}
              onClick={() => {
                ReactGA.event({
                  category: "click.patreon.modal.link",
                  action: "Click on Patreon URL"
                });
              }}
            >
              Patreon
            </a>
            . It will help us to maintain the webite (domain and such) and to keep the
            API up and running. If you feel like it, consider making a donation, even
            small ones can help a lot!
          </p>

          <p>Feel free to <a href={DISCORD_URL}>join our Discord server</a> to find some good pals to play with</p>

          <p>
            Also, following our{" "}
            <a
              href={TWITTER_URL}
              onClick={() => {
                ReactGA.event({
                  category: "click.patreon.modal.link",
                  action: `Click on ${TWITTER_NAME} Twitter profile`
                });
              }}
            >
              Twitter account
            </a>{" "}
            would be helpful 💕
          </p>

          <p>
            Thank you,
            <br />
            LukyVj 🤠👨‍💻
          </p>
      </Modal>
    )
  }
}

export default PatreonModal;
