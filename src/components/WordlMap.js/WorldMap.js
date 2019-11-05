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

import HeatmapLayer from "react-leaflet-heatmap-layer";
import mapStyles from "../../pages/CollectorMap.css";

import world from "../../data/maps/world";

const loadMap = true;

const worldLabels = [
  //   "cities",
  //   "territories",
  //   "regions",
  { name: "poker", id: "poker" },
  { name: "gunsmiths", id: "gunsmith" },
  { name: "barbers", id: "barber" },
  { name: "post_offices", id: "post_office" },
  { name: "shops", id: "shop" },
  { name: "fishing_shops", id: "fishing_shop" },
  { name: "doctors", id: "doctor" },
  { name: "fences", id: "fence" },
  { name: "saloons", id: "saloon" },
  { name: "photo_studios", id: "photo_studio" },
  { name: "tailors", id: "tailor" },
  { name: "fast_travel", id: "fast_travel" },
  { name: "stables", id: "stable" },
  { name: "hideouts", id: "hideout" }
];

const styles = {
  button: css`
    background: rgba(0, 0, 0, 0.78);
    color: var(--EcruWhite);
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
    <>
      <ul className=" p-0  m-0 fx-6 mb-16 md:mb-8">
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
              className={`pv-8 ph-16 d-inline-block fx-6 cursor-pointer p-8 va-middle tt-upper fw-bold`}
            >
              -
            </button>
            <button
              onClick={parent.zoomIn}
              disabled={parent.state.currentZoom === parent.state.maxZoom}
              className={`pv-8 ph-16 d-inline-block fx-6 cursor-pointer p-8 va-middle tt-upper fw-bold `}
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
            <span class="p-8 va-middle tt-upper fw-bold">
              {parent.state.heatMapOn ? "remove heatmap" : "Add heatmap"}
            </span>
          </button>
        </li>
        <li className="fx-1 mb-8">
          <button onClick={parent.handleMarker} css={styles.button}>
            {/* <span class="p-8 va-middle tt-upper fw-bold">
              {parent.state.markersOn ? "remove markers" : "Add markers"}
            </span> */}
            <span class="p-8 va-middle tt-upper fw-bold">Toggle markers</span>
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
            css={styles.button}
          >
            <span class="p-8 va-middle tt-upper fw-bold">
              {parent.state.mapExpanded ? "Reduce map" : "Expand map"}
            </span>
          </button>
        </li>
      </ul>

      <ul className="lis-none p-0 m-0 fx-1">
        {worldLabels.map(type => (
          <li key={type.id} className="p-0 m-0 d-inline-block p-4">
            <button
              css={[
                styles.button,
                css`
                  padding: 0;
                  width: auto;
                  font-size: 13px;
                  width: 100%;
                  opacity: ${parent.state.displayOnMap.find(
                    i => i.name === type.id
                  ).display
                    ? 1
                    : 0.5};
                `
              ]}
              className="ov-hidden d-flex"
              onClick={() => parent.handleCategoryClick(type)}
            >
              {type !== "cities" &&
                type !== "regions" &&
                type !== "territories" && (
                  <div
                    className="d-inline-block p-8 ta-center js-start"
                    css={css`
                      background: var(--Tabasco);
                    `}
                  >
                    <img
                      src={require(`../../images/map-icons/pin-${type.name.replace(
                        "_",
                        "-"
                      )}.png`)}
                      alt={`${type.name.replace("_", "-")}.png`}
                      className="va-middle "
                      css={css`
                        height: 32px;
                      `}
                    />
                  </div>
                )}

              <span className="p-4 ph-8 va-middle tt-upper fw-bold">
                {type.name.replace("_", " ")}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

class WorldMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 51.0,
      lng: 0.0,
      center: [40, -60],
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
      openMobileControls: false,
      heatMapPoints: [],
      allHidden: false,
      displayOnMap: [
        { name: "poker", display: true },
        { name: "gunsmith", display: true },
        { name: "barber", display: true },
        { name: "post_office", display: true },
        { name: "shop", display: true },
        { name: "fishing_shop", display: true },
        { name: "doctor", display: true },
        { name: "fence", display: true },
        { name: "saloon", display: true },
        { name: "photo_studio", display: true },
        { name: "tailor", display: true },
        { name: "fast_travel", display: true },
        { name: "stable", display: true },
        { name: "hideout", display: true }
      ]
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

  handleMarker = () => {
    let arr = this.state.displayOnMap;
    // eslint-disable-next-line no-unused-expressions
    this.state.allHidden === true
      ? arr.map(item => (item.display = true)) &&
        this.setState({ allHidden: false })
      : arr.map(item => (item.display = false)) &&
        this.setState({
          displayOnMap: arr,
          allHidden: true
        });
  };

  handleCategoryClick = type => {
    let arr = this.state.displayOnMap;
    arr.filter(i => {
      if (i.name === type.id) {
        i.display = !this.state.displayOnMap.find(i => i.name === type.id)
          .display;
      }
      return i;
    });
    this.setState({ displayOnMap: arr });
  };

  componentDidMount() {
    this.handleZoomstart();

    let arr = [];
    world.map(it =>
      worldLabels.map(type =>
        it[type.name].map(item => arr.push({ lat: item.lat, lng: item.lng }))
      )
    );
    this.setState({ heatMapPoints: arr });
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
        className="pos-relative ov-hidden d-grid g-12"
      >
        <div className="pos-relative gcstart-1 gcend-13 md:gcend-4">
          <div
            className="pos-relative h-100p p-8"
            css={css`
              background: var(--Armadillo);
            `}
          >
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
              className="pos-relative d-flex fxd-column mt-8 md:mt-0"
              css={css`
                @media (max-width: 960px) {
                  display: ${this.state.openMobileControls ? "block" : "none"};
                }
              `}
            >
              <SimpleMapNavigation parent={this} />
            </div>
          </div>
        </div>
        <div className="gcstart-1 md:gcstart-4 gcend-13">
          <Map
            center={this.state.center}
            zoom={this.state.currentZoom}
            minZoom={this.state.minZoom}
            maxZoom={this.state.maxZoom}
            animate={true}
            noWrap={true}
            maxBounds={[
              [-23.981233711026714, -184.33965792896282],
              [84.90166435265932, -184.33965792896282],
              [84.90166435265932, 73.79883293486286],
              [-23.981233711026714, 73.79883293486286]
            ]}
            boundsOptions={{ padding: [1, 1] }}
            boxZoom={true}
            zoomControl={false}
            gradient={gradient}
            style={{
              height: this.state.mapExpanded === false ? 700 : "100%"
            }}
            dragging={true}
            onClick={this.handleClick}
            ref={ref => {
              this.map = ref;
            }}
          >
            {world.map(it =>
              worldLabels.map(type =>
                it[type.name].map((item, i) =>
                  item.bounds ? (
                    <Polygon
                      positions={item.bounds}
                      color={item.color ? item.color : "var(--Tabasco)"}
                    />
                  ) : (
                    this.state.markersOn === true &&
                    loadMap === true && (
                      <Marker
                        position={[item.lat, item.lng]}
                        key={item.name + i}
                        opacity={
                          this.state.displayOnMap.find(
                            i =>
                              i.name ===
                              item.name.toLowerCase().replace(" ", "_")
                          ).display
                            ? 1
                            : 0
                        }
                        icon={
                          type.name !== "cities" &&
                          type.name !== "regions" &&
                          type.name !== "territories"
                            ? leaflet.icon({
                                iconUrl: require(`../../images/map-icons/pin-${type.name.replace(
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
            )}

            {this.state.heatMapOn && (
              <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                points={this.state.heatMapPoints}
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
      </div>
    );
  }
}
export default WorldMap;
