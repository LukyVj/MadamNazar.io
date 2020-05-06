import React, { Component } from "react";

export default class AdComponent extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className="adsbygoogle"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        data-ad-client="ca-pub-2046602277842498"
        data-ad-slot="7948800993"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    );
  }
}
