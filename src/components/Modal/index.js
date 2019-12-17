/** @jsx jsx */
import React, { Component } from "react";
import { css, jsx } from "@emotion/core";
import frame from "../../images/frame.png";

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
    border-image-repeat: all;
    border-image-slice: 14;
    border-image-outset: 3px;
    border-image-source: url(${frame});
    border-style: solid;
    border-width: 6px;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
      0 32px 16px rgba(0, 0, 0, 0.09), 0 0 500px rgba(0, 0, 0, 0.3);
  `,
  button: css`
    background: rgba(0, 0, 0, 0.78);
    color: var(--EcruWhite);
    font-size: 18px;
    padding: 10px 20px;
    border-radius: 100px;
    text-decoration: none;
    margin-right: 16px;
    cursor: pointer;
    display: block;
    margin: auto;
    text-align: center;

    &:hover {
      background: var(--Tabasco);
    }
  `
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
    const { children, onClose } = this.props;

    return (
      <div
        css={styles.overlay}
        onClick={onClose}
      >
        <div
          className="p-24 bxs-default bdr-6"
          css={[styles.modal, styles.border]}
          onClick={e => e.stopPropagation()}
        >
          { children }
          <button
            css={styles.button}
            onClick={onClose}
          >
            Close
            <img
              src={require("../../images/cancel-icon.svg")}
              css={css`width: 18px;`}
              className="va-middle ml-8"
              alt="close icon"
            />
          </button>
        </div>
      </div>
    )
  }
}

export default Modal;
