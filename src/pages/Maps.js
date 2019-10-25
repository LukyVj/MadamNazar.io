/** @jsx jsx */
import React, { Component } from "react";
import { jsx, css } from "@emotion/core";
import items from "../data/collection-items";
import { getCycleDay } from "../scripts/helpers";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";

class SimpleExample extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 51.0,
      lng: 0.0,
      zoom: 7,
      mapHidden: false,
      layerHidden: false,
      items,
      radius: 4,
      blur: 8,
      max: 0.5,
      limitAddressPoints: true
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const bounds = [[-144, 0], [0, 176]];
    const gradient = {
      0.1: "#89BDE0",
      0.2: "#96E3E6",
      0.4: "#82CEB6",
      0.6: "#FAF3A5",
      0.8: "#F5D98B",
      "1.0": "#DE9A96"
    };

    return (
      <Map
        center={[40, -70]}
        zoom={3}
        bounds={bounds}
        minZoom={2}
        maxZoom={8}
        style={{ height: 700 }}
        dragging={true}
        detectRetina={true}
      >
        <TileLayer
          attribution="© madamnazar.io"
          url="https://s.rsg.sc/sc/images/games/RDR2/map/game/{z}/{x}/{y}.jpg"
        />

        {items.map(
          it =>
            (parseInt(it.day) === getCycleDay() && console.log(it)) || (
              <Marker position={[it.y / 2, it.x / 2]}>
                <Popup>
                  <span>{it.text}</span>
                </Popup>
                <Tooltip
                  direction="bottom"
                  offset={[-8, -2]}
                  opacity={1}
                  permanent
                >
                  <span>{it.text}</span>
                </Tooltip>
              </Marker>
            )
        )}
      </Map>
    );
  }
}

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = { expandMap: false, iframeUrl: false };
  }

  componentDidMount() {
    this.props.parent.setState({
      currentPage: window.location.pathname
    });
  }

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
        <script src="https://raw.githubusercontent.com/pa7/heatmap.js/develop/plugins/leaflet-heatmap/leaflet-heatmap.js" />

        <div className="pos-absolute w-100p top-200 left-0 z-5">
          <SimpleExample />
        </div>
        <div className="pos-relative" style={{ height: 700 }} />
      </>
    );
  }
}
export default Maps;
