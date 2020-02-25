/** @jsx jsx */
import React, { Component } from "react";
import Iframe from "react-iframe";
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

import Infos from "../components/Infos";

import CollectorMap from "../pages/CollectorMap";
import RDOMap from "../pages/RDOMap";
import mapStyles from "../pages/CollectorMap.css";

import hideouts from "../data/maps/world/hideouts";
import curiosities from "../data/maps/curiosities";
import world from "../data/maps/world";

import { JSON_COLLECTOR_ITEMS_URL } from "../scripts/constants";
import WorldMap from "../components/WordlMap.js/WorldMap";

// console.log(world);
// [
//   "cities",
//   "territories",
//   "poker",
//   "gunsmiths",
//   "barbers",
//   "post_offices",
//   "shops",
//   "fishing_shops",
//   "doctors",
//   "fences",
//   "saloons",
//   "photo_studios",
//   "tailors",
//   "fast_travel",
//   "stables"
// ].forEach(cat => console.log(JSON.stringify(world[0][`${cat}`])));

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

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedMap: "world", collectorUpdated: false };
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
              { id: "world", name: "RDO Map", status: 1 },
              { id: "collector", name: "Collector's map", status: 1 }
            ].map(map => (
              <li
                className="d-inline-block pr-8"
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
          {this.state.selectedMap === "collector" && (
            <div className="w-100p top-200 left-0 right-0 m-auto z-4">
              <CollectorMap parent={this} />
            </div>
          )}

          {this.state.selectedMap === "world" && (
            <div className="w-100p top-200 left-0 right-0 m-auto z-4">
              <RDOMap />
            </div>
          )}
        </div>
      </>
    );
  }
}
export default Maps;
