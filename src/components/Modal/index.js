/** @jsx jsx */
import React, { Component } from "react";
import * as T from "prop-types";
import { css, jsx } from "@emotion/core";
import frame from "../../images/frame.png";
import bgMainSml from "../../images/bgMainSml.jpg";

const propTypes = {
  children: T.element.isRequired,
  onClose: T.func.isRequired,
  withBackgroundImage: T.bool, // if true adds "old paper" texture background
  withContentPadding: T.bool
};
const defaultProps = {
  withBackgroundImage: false,
  withContentPadding: true
};

class Modal extends Component {
  rootNode = document.getElementById('root');

  componentDidMount() {
    this.rootNode.style.overflow = 'hidden'; // scroll lock on main content
  }

  componentWillUnmount() {
    this.rootNode.style.overflow = 'auto'; // scroll release on main content
  }

  render() {
    const {
      children,
      onClose,
      withBackgroundImage,
      withContentPadding
    } = this.props;

    const styles = {
      overlay: css`
        z-index: 999;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
      `,
      modal: css`
        box-sizing: border-box;
        width: 100%;
        max-width: 600px;
        max-height: 95%;
        overflow-y: auto;
        background-color: white;
        background-image: ${
        withBackgroundImage
          ? `url(${bgMainSml});`
          : 'none;'
        }
        border-image-repeat: all;
        border-image-slice: 14;
        border-image-outset: 3px;
        border-image-source: url(${frame});
        border-style: solid;
        border-width: 6px;
        border-radius: 6px;
        box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
          0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
          0 32px 16px rgba(0, 0, 0, 0.09), 0 0 500px rgba(0, 0, 0, 0.3);
      `,
      modalContent: css`
        padding: ${withContentPadding ? '24px' : '0'}
      `,
      button: css`
        display: block;
        margin-top: ${withContentPadding ? '0' : '24px'};
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 24px;
        padding: 10px 20px;
        border-radius: 100px;
        background-color: rgba(0, 0, 0, 0.78);
        cursor: pointer;
        font-size: 18px;
        text-align: center;
        text-decoration: none;
        color: var(--EcruWhite);
    
        &:hover {
          background-color: var(--Tabasco);
        }
      `,
      buttonImg: css`
        width: 18px;
        margin-left: 8px;
        vertical-align: middle;
      `
    };

    return (
      <div
        css={styles.overlay}
        onClick={onClose}
      >
        <div
          css={styles.modal}
          onClick={e => e.stopPropagation()}
        >
          <div css={styles.modalContent}>
            { children }
          </div>
          <button
            css={styles.button}
            onClick={onClose}
          >
            Close
            <img
              src={require("../../images/cancel-icon.svg")}
              css={styles.buttonImg}
              alt="close icon"
            />
          </button>
        </div>
      </div>
    )
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
