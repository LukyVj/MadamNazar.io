/** @jsx jsx */
import React, { Component } from "react";
import ReactGA from "react-ga";
import { jsx, css } from "@emotion/core";
import leaflet from "leaflet";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import HeatmapLayer from "react-leaflet-heatmap-layer";

import Infos from "../components/Infos";

import CollectorMap from "../pages/CollectorMap";
import mapStyles from "../pages/CollectorMap.css";

import hideouts from "../data/maps/gang-hideouts";
import curiosities from "../data/maps/curiosities";

const styles = {
  button: css`
    background: rgba(0, 0, 0, 0.78);
    color: var(--EcruWhite);
    font-size: 18px;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    margin-right: 16px;
    cursor: pointer;
    display: block;
    margin-right: 8px;
    text-align: center;
    border: none;

    &:hover {
      background: var(--Tabasco);
    }
  `,
  active: css`
    background: var(--Tabasco);
  `
};

class SimpleMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 51.0,
      lng: 0.0,
      zoom: 7,
      mapHidden: false,
      layerHidden: false,
      radius: 7,
      blur: 10,
      max: 0.6,
      limitAddressPoints: true,
      currentPos: null,
      heatMapOn: false,
      markersOn: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ currentPos: e.latlng });
  }

  render() {
    console.log(this.props);
    const gradient = {
      0.1: "#89BDE0",
      0.2: "#96E3E6",
      0.4: "#82CEB6",
      0.6: "#FAF3A5",
      0.8: "#F5D98B",
      "1.0": "#DE9A96"
    };

    const markerOptions = {
      iconSize: [18, 25], // size of the icon
      shadowSize: [80, 80], // size of the shadow
      iconAnchor: [10, 25], // point of the icon which will correspond to marker's location
      shadowAnchor: [40, 45], // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative
    };
    const hideoutMarker = leaflet.icon({
      iconUrl: require("../images/gang-icon.png"),
      ...markerOptions,
      iconSize: [25, 25],
      shadowUrl: require("../images/danger-shadow.png")
    });
    const normalMarker = leaflet.icon({
      iconUrl: require("../images/pin.png"),
      ...markerOptions
    });

    return (
      <div css={mapStyles.iframe} className="pos-relative">
        <button
          onClick={() =>
            this.setState({
              heatMapOn: !this.state.heatMapOn,
              markersOn: false
            })
          }
          className="pos-absolute"
          css={[
            css`
              z-index: 9000;
              top: 16px;
              right: 16px;
            `,
            styles.button
          ]}
        >
          {this.state.heatMapOn ? "remove heatmap" : "Add heatmap"}
        </button>

        <button
          onClick={() => this.setState({ markersOn: !this.state.markersOn })}
          className="pos-absolute"
          css={[
            css`
              z-index: 9000;
              top: 64px;
              right: 16px;
            `,
            styles.button
          ]}
        >
          {this.state.markersOn ? "remove markers" : "Add markers"}
        </button>
        <Map
          center={[40, -60]}
          zoom={4}
          minZoom={2}
          maxZoom={8}
          gradient={gradient}
          style={{ height: 700 }}
          dragging={true}
          detectRetina={true}
          onClick={this.handleClick}
        >
          {this.state.markersOn &&
            this.props.data.map(it => (
              <Marker
                position={[it.lat, it.lng]}
                key={it.name}
                icon={
                  this.props.map === "hideouts" ? hideoutMarker : normalMarker
                }
              >
                <Tooltip direction="top" offset={[-0, -20]} opacity={1}>
                  <span
                    css={css`
                      font-family: "RDRHapna-Regular";
                    `}
                  >
                    {it.name}
                  </span>
                  <p>{it.comment}</p>
                </Tooltip>
              </Marker>
            ))}

          {this.props.map === "simple" && this.state.currentPos && (
            <Marker position={this.state.currentPos} draggable={true}>
              <Popup position={this.state.currentPos}>
                Current location:{" "}
                <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
              </Popup>
            </Marker>
          )}

          {this.state.heatMapOn && (
            <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={this.props.data}
              longitudeExtractor={m => m.lng}
              latitudeExtractor={m => m.lat}
              intensityExtractor={m => parseFloat(m.name)}
              radius={Number(this.state.radius)}
              blur={Number(this.state.blur)}
              max={Number.parseFloat(this.state.max)}
            />
          )}
          <TileLayer
            attribution="© madamnazar.io"
            url="http://jeanropke.github.io/RDR2CollectorsMap/assets/maps/detailed/{z}/{x}_{y}.jpg"
          />
        </Map>
      </div>
    );
  }
}

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedMap: "collector" };
  }

  componentDidMount() {
    this.props.parent.setState({
      currentPage: window.location.pathname
    });
    ReactGA.pageview("/maps");
  }

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossOrigin={""}
        />
        <script src="https://raw.githubusercontent.com/pa7/heatmap.js/develop/plugins/leaflet-heatmap/leaflet-heatmap.js" />

        <div className="pos-relative">
          <div>
            <p>Discover a few interactive maps to help you in your journey</p>
          </div>
          <ul className="lis-none p-0 d-flex">
            {[
              {
                id: "simple",
                name: "Default",
                status: process.env.NODE_ENV === "development" ? 1 : 0
              },
              { id: "collector", name: "Collector's map", status: 1 },
              { id: "random", name: "Random collectibles", status: 0 },
              { id: "photo", name: "Photos spot", status: 0 },
              { id: "curiosities", name: "Curiosities", status: 0 },
              { id: "hideouts", name: "Gang hideouts", status: 1 }
            ].map(map => (
              <li
                className="d-inline-block"
                key={map.id}
                disabled={map.status === 0 && "disabled"}
                css={
                  (map.status === 1 &&
                    css`
                      order: 0;
                    `,
                  map.status === 0 &&
                    css`
                      display: none;
                    `)
                }
              >
                <button
                  onClick={() => {
                    this.setState({ selectedMap: map.id });
                    ReactGA.event({
                      category: "click.maps.selector",
                      action: `Clicked on ${map.id} map`
                    });
                  }}
                  css={[
                    styles.button,
                    this.state.selectedMap === map.id && styles.active
                  ]}
                  disabled={map.status === 0 && "disabled"}
                >
                  {map.name}
                </button>
              </li>
            ))}
          </ul>
          {this.state.selectedMap === "simple" && (
            <div className="w-100p top-200 left-0 right-0 m-auto z-4">
              <SimpleMap data={hideouts} parent={this} map="simple" />
            </div>
          )}
          {this.state.selectedMap === "photo" && (
            <div className="w-100p top-200 left-0 right-0 m-auto z-4">
              <SimpleMap data={hideouts} parent={this} map="photo" />
            </div>
          )}
          {this.state.selectedMap === "random" && (
            <div className="w-100p top-200 left-0 right-0 m-auto z-4">
              <SimpleMap data={hideouts} parent={this} map="random" />
            </div>
          )}
          {this.state.selectedMap === "curiosities" && (
            <div className="w-100p top-200 left-0 right-0 m-auto z-4">
              <SimpleMap data={curiosities} parent={this} map="curiosities" />
            </div>
          )}
          {this.state.selectedMap === "hideouts" && (
            <>
              <Infos>
                If there is some missing hideouts, please contact me on twitter
                using the link on the navigation
              </Infos>
              <div className="w-100p top-200 left-0 right-0 m-auto z-4">
                <SimpleMap data={hideouts} parent={this} map="hideouts" />
              </div>
            </>
          )}

          {this.state.selectedMap === "collector" && (
            <div className="w-100p top-200 left-0 right-0 m-auto z-4">
              <CollectorMap parent={this} />
            </div>
          )}
        </div>
      </>
    );
  }
}
export default Maps;
