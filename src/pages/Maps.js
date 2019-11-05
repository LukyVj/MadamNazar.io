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

import Infos from "../components/Infos";

import CollectorMap from "../pages/CollectorMap";
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

class SimpleMap extends React.Component {
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

  handleZoomstart (map) {
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
          {this.props.map === "simple" && (
            <FeatureGroup>
              <EditControl
                position="bottomleft"
                onEdited={this._onEditPath}
                onCreated={e => {
                  var layer = e.layer;
                  console.log(layer.getLatLngs()[0]);
                }}
                onDeleted={this._onDeleted}
                // onDrawStop={e => {
                //   const type = e.layerType;
                //   const layer = e.layer;

                //   console.log("draw:created->", e);
                //   // console.log(JSON.stringify(layer.toGeoJSON()));
                // }}
                draw={{
                  polyline: false,
                  circle: false,
                  marker: false,
                  circlemarker: false
                }}
              />
            </FeatureGroup>
          )}
          {this.state.markersOn && this.props.type === "complex"
            ? this.props.data.map(it =>
                worldLabels.map(type =>
                  it[type].map(item =>
                    item.bounds ? (
                      <Polygon
                        positions={item.bounds}
                        color={item.color ? item.color : "var(--Tabasco)"}
                      />
                    ) : (
                      <Marker
                        position={
                          item.x && item.y
                            ? [item.x, item.y]
                            : [item.lat, item.lng]
                        }
                        key={item.name}
                        icon={
                          type !== "cities" && type !== "regions"
                            ? leaflet.icon({
                                iconUrl: require(`../images/map-icons/pin-${type.replace(
                                  "_",
                                  "-"
                                )}.png`),
                                ...markerOptions,
                                iconAnchor: [10, 41],
                                iconSize: [25, 40]
                                // shadowUrl: require("../images/danger-shadow.png")
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
                              <p>
                                {item.location.region !== "TDF" &&
                                  item.location.region}
                              </p>
                              <p>
                                {item.location.territory.name !== "TDF" &&
                                  item.location.territory.name}
                              </p>
                              <p>
                                {item.location.territory.code !== "TDF" &&
                                  item.location.territory.code}
                              </p>
                            </span>
                          )}
                          {/* <pre>{JSON.stringify(item.location)}</pre> */}
                        </Tooltip>
                      </Marker>
                    )
                  )
                )
              )
            : this.state.markersOn &&
              this.props.type !== "complex" &&
              this.props.data.map(it => (
                <Marker
                  position={it.x && it.y ? [it.x, it.y] : [it.lat, it.lng]}
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
          }
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
            // url="http://jeanropke.github.io/RDR2CollectorsMap/assets/maps/detailed/{z}/{x}_{y}.jpg"
            url="https://lukyvj.github.io/nazarfinder-images/{z}/{x}_{y}.jpg"
            // url="https://lukyvj.github.io/fortnite-maps/0/{z}-{x}-{y}.jpg?v=99"
          />
        </Map>
      </div>
    );
  }
}

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

    // fetch(JSON_COLLECTOR_ITEMS_URL)
    //   .then(response => response.json())
    //   .then(data => this.setState({ collector: data, collectorUpdated: true }))
    //   .then(() => console.log(this.state));
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

        <div className="pos-relative ph-16">
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
              { id: "world", name: "World Map", status: 1 },
              { id: "collector", name: "Collector's map", status: 1 },
              { id: "random", name: "Random collectibles", status: 0 },
              { id: "photo", name: "Photos spot", status: 0 },
              { id: "curiosities", name: "Curiosities", status: 0 }
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
          {this.state.selectedMap === "simple" && (
            <div className="w-100p top-200 left-0 right-0 m-auto z-4">
              <SimpleMap
                data={hideouts}
                parent={this}
                map="simple"
                type="simple"
              />
            </div>
          )}
          {this.state.selectedMap === "photo" && (
            <div className="w-100p top-200 left-0 right-0 m-auto z-4">
              <SimpleMap
                data={hideouts}
                parent={this}
                map="photo"
                type="simple"
              />
            </div>
          )}
          {this.state.selectedMap === "random" && (
            <div className="w-100p top-200 left-0 right-0 m-auto z-4">
              <SimpleMap
                data={hideouts}
                parent={this}
                map="random"
                type="simple"
              />
            </div>
          )}
          {this.state.selectedMap === "curiosities" && (
            <div className="w-100p top-200 left-0 right-0 m-auto z-4">
              <SimpleMap
                data={curiosities}
                parent={this}
                map="curiosities"
                type="simple"
              />
            </div>
          )}

          {this.state.selectedMap === "world" && (
            <div className="w-100p top-200 left-0 right-0 m-auto z-4">
              <WorldMap />
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
              <div>
                <p>Thanks to these awesome contributors:</p>
                <ul>
                  {["@Noha69980668", "SethStar16T"].map(contributor => (
                    <li key={contributor}>
                      <a
                        href={`https://twitter.com/${contributor}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contributor}
                      </a>
                    </li>
                  ))}
                </ul>
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
