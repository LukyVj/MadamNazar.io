/** @jsx jsx */
import React, { Component } from "react";
import ReactGA from "react-ga";
import { jsx, css } from "@emotion/core";
import leaflet from "leaflet";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polygon,
  FeatureGroup,
  Circle
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

import HeatmapLayer from "react-leaflet-heatmap-layer";
import mapStyles from "../../pages/CollectorMap.css";

import world from "../../data/maps/world";

const worldLabels = [
  "cities",
  "territories",
  "poker",
  "gunsmiths",
  "barbers",
  "post_offices",
  "shops",
  "fishing_shops",
  "doctors",
  "fences",
  "saloons",
  "photo_studios",
  "tailors",
  "fast_travel",
  "stables",
  "hideouts"
];

const styles = {
  button: css`
    background: rgba(0, 0, 0, 0.78);
    color: var(--EcruWhite);
    font-size: 18px;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    display: block;
    text-align: center;
    border: none;
    width: 100%;

    &:hover {
      background: var(--Tabasco);
    }
  `,
  active: css`
    background: var(--Tabasco);
  `
};

const SimpleMapNavigation = ({ parent }) => {
  return (
    <ul
      className="pos-absolute h-100p top-0 right-0 ta-right lis-none p-0 pv-8 m-0 d-flex fxd-column jc-start"
      css={css`
        z-index: 999;
        width: 200px;
      `}
    >
      <li className="fx-1 mb-8">
        <span
          className="d-flex fxd-row"
          css={css`
            button {
              appearance: none;
              border: none;
              border-radius: 4px;
              background: rgba(0, 0, 0, 0.8);
              color: white;
              font-size: 16px;

              &[disabled] {
                opacity: 0.5;
                pointer-events: none;
              }
            }

            button:nth-of-type(1) {
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
            }
            button:nth-of-type(2) {
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
            }
          `}
        >
          <button
            onClick={parent.zoomOut}
            disabled={parent.state.currentZoom === parent.state.minZoom}
            className={`pv-8 ph-16 d-inline-block fx-6 cursor-pointer`}
          >
            -
          </button>
          <button
            onClick={parent.zoomIn}
            disabled={parent.state.currentZoom === parent.state.maxZoom}
            className={`pv-8 ph-16 d-inline-block fx-6 cursor-pointer `}
          >
            +
          </button>
        </span>
      </li>
      <li className="fx-1 mb-8">
        <button
          onClick={() =>
            parent.setState({
              heatMapOn: !parent.state.heatMapOn,
              currentZoom: 2
            })
          }
          css={styles.button}
        >
          {parent.state.heatMapOn ? "remove heatmap" : "Add heatmap"}
        </button>
      </li>
      <li className="fx-1 mb-8">
        <button
          onClick={() =>
            parent.setState({ markersOn: !parent.state.markersOn })
          }
          css={styles.button}
        >
          {parent.state.markersOn ? "remove markers" : "Add markers"}
        </button>
      </li>
      <li className="fx-1 mb-8">
        <button
          onClick={() =>
            parent.setState({
              mapExpanded: !parent.state.mapExpanded,
              currentZoom: 4
            })
          }
          className="pos-absolute"
          css={styles.button}
        >
          {parent.state.mapExpanded ? "Reduce map" : "Expand map"}
        </button>
      </li>
    </ul>
  );
};

class WorldMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 51.0,
      lng: 0.0,
      zoom: 3,
      minZoom: 2,
      maxZoom: 7,
      currentZoom: 3,
      mapHidden: false,
      layerHidden: false,
      radius: 10,
      blur: 12,
      max: 0.6,
      limitAddressPoints: true,
      currentPos: null,
      heatMapOn: false,
      markersOn: true,
      mapExpanded: false,
      openMobileControls: false
    };
    this.handleClick = this.handleClick.bind(this);

    this.zoomIn = () =>
      this.setState({
        currentZoom: this.state.currentZoom + 1,
        radius: this.state.radius
      });
    this.zoomOut = () =>
      this.setState({
        currentZoom: this.state.currentZoom - 1,
        radius: this.state.radius
      });
  }

  handleClick(e) {
    this.setState({ currentPos: e.latlng });
    console.log(this.state);
  }

  handleZoomstart = map => {
    this.map && this.setState({ currentZoom: this.map.leafletElement._zoom });
  };

  getBounds = () => this.map && this.map.leafletElement.getBounds();
  fitBounds = () =>
    this.map && this.map.leafletElement.fitBounds([this.getBounds()]);

  _handleDrawStop = (elem, layer, evt) => {
    console.log(elem, layer, evt);
  };

  componentDidMount() {
    this.handleZoomstart();
  }

  render() {
    const gradient = {
      0.1: "#89BDE0",
      0.2: "#96E3E6",
      0.4: "#82CEB6",
      0.6: "#FAF3A5",
      0.8: "#F5D98B",
      "1.0": "#DE9A96"
    };

    const markerOptions = {
      shadowSize: [80, 80], // size of the shadow
      shadowAnchor: [40, 45], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative
      iconAnchor: [10, 41], // point of the icon which will correspond to marker's location
      iconSize: [25, 40], // size of the icon
      shadowUrl: require("../../images/map-icons/shadow.png")
    };

    const normalMarker = leaflet.icon({
      iconUrl: require("../../images/pin.png"),
      ...markerOptions
    });

    return (
      <div
        css={[
          mapStyles.iframe,
          this.state.mapExpanded === true &&
            css`
              position: fixed;
              top: 0;
              z-index: 9999999999;
              left: 2px;
              width: 100%;
              height: 100vh;
            `
        ]}
        className="pos-relative ov-hidden"
      >
        <div className="pos-relative">
          <button
            css={[
              styles.button,
              css`
                @media (min-width: 960px) {
                  display: none;
                }
              `
            ]}
            onClick={() =>
              this.setState({
                openMobileControls: !this.state.openMobileControls
              })
            }
          >
            {!this.state.openMobileControls ? "open" : "close"} controls
          </button>
          <div
            className="pos-relative"
            css={css`
              @media (max-width: 960px) {
                right: ${this.state.openMobileControls ? "0" : "-200px"};
              }
            `}
          >
            <SimpleMapNavigation parent={this} />
          </div>
        </div>
        <Map
          center={[40, -60]}
          zoom={this.state.currentZoom}
          minZoom={this.state.minZoom}
          maxZoom={this.state.maxZoom}
          noWrap={true}
          bounds={this.getBounds()}
          boundsOptions={{ padding: [1, 1] }}
          boxZoom={true}
          zoomControl={false}
          gradient={gradient}
          style={{ height: this.state.mapExpanded === false ? 700 : "100%" }}
          dragging={true}
          onClick={this.handleClick}
          ref={ref => {
            this.map = ref;
          }}
        >
          {world.map(it =>
            worldLabels.map(
              type =>
                console.log(it, type, it[type]) ||
                it[type].map(item =>
                  item.bounds ? (
                    <Polygon
                      positions={item.bounds}
                      color={item.color ? item.color : "var(--Tabasco)"}
                    />
                  ) : (
                    <Marker
                      position={[item.lat, item.lng]}
                      key={item.name}
                      icon={
                        type !== "cities" &&
                        type !== "regions" &&
                        type !== "territories"
                          ? leaflet.icon({
                              iconUrl: require(`../../images/map-icons/pin-${type.replace(
                                "_",
                                "-"
                              )}.png`),
                              ...markerOptions
                            })
                          : normalMarker
                      }
                    >
                      <Tooltip direction="top" offset={[-0, -20]} opacity={1}>
                        <span
                          css={css`
                            font-family: "RDRHapna-Regular";
                          `}
                        >
                          {item.name}
                        </span>
                        {item.location && (
                          <span>
                            <p>{item.location.name}</p>
                            <p>{item.location.region}</p>
                            <p>{item.location.territory.name}</p>
                            <p>{item.location.territory.code}</p>
                          </span>
                        )}
                        {/* <pre>{JSON.stringify(item.location)}</pre> */}
                      </Tooltip>
                    </Marker>
                  )
                )
            )
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
            // url="http://jeanropke.github.io/RDR2CollectorsMap/assets/maps/detailed/{z}/{x}_{y}.jpg"
            url="https://lukyvj.github.io/nazarfinder-images/{z}/{x}_{y}.jpg"
            // url="https://lukyvj.github.io/fortnite-maps/0/{z}-{x}-{y}.jpg?v=99"
          />
        </Map>
      </div>
    );
  }
}
export default WorldMap;
