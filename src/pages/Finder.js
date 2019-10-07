/** @jsx jsx */
import React, { Component } from "react";
import { css, jsx } from "@emotion/core";
import ReactGA from "react-ga";
import RDAppear from "../components/RDAppear/RDAppear";
import Map from "../components/Map/Map";
import styles from "./Finder.css";
import bgMainSml from "../images/bgMainSml.jpg";

const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const weekDay = new Date().getUTCDay();
let dayCycle;
switch (weekDay) {
  case 2: //tuesday
  case 4: //thursday
  case 6: //saturday
    dayCycle = 1;
    break;

  case 0: //sunday
  case 3: //wednesday
    dayCycle = 2;
    break;

  case 1: //monday
  case 5: //friday
    dayCycle = 3;
    break;
  default:
    dayCycle = 0;
}

const InfoBox = props => {
  return (
    <>
      <div
        className={`modal pos-absolute w-800 h-auto bgc-mars-0 left-0 right-0 top-0 bot-0 m-auto z-max bxs-default p-16 ${
          props.parent.state.modal === true ? "d-block" : "d-none"
        }`}
        css={css`
          z-index: 9999999999;
          border: 4px solid var(--Armadillo);
          background: var(--Armadillo);
          box-shadow: 0 0 32px rgba(0, 0, 0, 0.2);
          max-width: 90%;
          max-height: 90%;
          position: fixed;
          left: 0;
          right: 0;
          margin: auto;

          background: var(--EcruWhite);
          background: url(${bgMainSml});
          border-width: 6px;

          margin: auto;
          z-index: 100;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2),
            0 6px 22px rgba(0, 0, 0, 0.5), 0 0 45px rgba(0, 0, 0, 0.25);

          @media (max-width: 960px) {
            width: 80%;
            height: auto;
          }
        `}
      >
        <button
          onClick={() => {
            props.parent.setState({
              modal: !props.parent.state.modal,
              modalImage: null
            });
          }}
        >
          Close window
        </button>
        <img
          src={props.parent.state.modalImage}
          className="w-100p h-100p obf-contain obp-center"
          alt={props.parent.state.modalImage}
          onClick={() => {
            props.parent.setState({
              modal: !props.parent.state.modal,
              modalImage: null
            });
          }}
        />
      </div>

      {/* {props.isNewLocation === today ? (
        
      ) : (
        <div>
          <p>Oops, we haven't found her yer</p>
        </div>
      )} */}

      <div css={styles.posterWrapper} className="pv-32">
        <div css={[styles.posterGrid, styles.posterLayout]}>
          <section
            className="pv-48"
            css={css`
              text-align: center;
            `}
          >
            <div>
              <div>
                <h2
                  className="m-0 p-0 pl-24"
                  css={css`
                    display: inline-block;
                    font-size: 38px;
                    vertical-align: middle;
                  `}
                >
                  In {capitalize(props.region_precise)} in the region of{" "}
                  {capitalize(props.region)}
                </h2>
              </div>
              <div>
                <p>
                  In the {capitalize(props.cardinals.split(" ")[0])} 
                  {capitalize(props.cardinals.split(" ")[1])} side of the map.
                  nearby{" "}
                  {props.nearby.map((poi, id) => (
                    <>
                      {id === props.nearby.length - 1 && " & "}

                      <b
                        key={id}
                        css={css`
                          border-bottom: 2px solid var(--Tabasco);
                          display: inline-block;
                          margin: 0 2px;
                        `}
                      >
                        {capitalize(poi)}
                      </b>
                      {id !== props.nearby.length - 1 &&
                        (id !== props.nearby.length - 2 && ", ")}
                    </>
                  ))}
                  .
                </p>
                <a href={props.link}>{props.link}</a>
              </div>
            </div>

            <div>
              <div
                className="cursor-pointer d-grid md:g-2"
                css={css`
                  padding: 8px;
                `}
              >
                <RDAppear
                  image={props.media["tilt_shift"].full}
                  width={props.parent.state.frameWidth / 2}
                  height={480}
                  onClick={() => {
                    props.parent.setState({
                      modal: true,
                      modalImage: props.media.normal.full,
                      modalImageDarkMode: props.media.negative.full
                    });
                    ReactGA.event({
                      category: "click.modal",
                      action: "Open First image"
                    });
                  }}
                  childrenStyle={css`
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
                    transform: rotate(-0.3deg);
                    filter: sepia(1) saturate(0.65);

                    @media (max-width: 960px) {
                      width: 100% !important;
                    }
                  `}
                />

                <RDAppear
                  image={props.media["tilt_shift"].zoom}
                  width={props.parent.state.frameWidth / 2}
                  height={480}
                  onClick={() => {
                    props.parent.setState({
                      modal: true,
                      modalImage: props.media.normal.zoom,
                      modalImageDarkMode: props.media.negative.zoom
                    });
                    ReactGA.event({
                      category: "click.modal",
                      action: "Open Second image"
                    });
                  }}
                  childrenStyle={css`
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
                    transform: rotate(-0.3deg);
                    filter: sepia(1) saturate(0.65);

                    @media (max-width: 960px) {
                      width: 100% !important;
                    }
                  `}
                />
              </div>
            </div>
          </section>
          <section
            onClick={() => {
              ReactGA.event({
                category: "click.map",
                action: "Clicked the map"
              });
            }}
          >
            <Map localisation={props.id} />
          </section>
        </div>
      </div>
    </>
  );
};

class Finder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  setSize = () => {
    this.setState({
      frameWidth:
        document.getElementById("frame").getBoundingClientRect().width - 100
    });

    window.addEventListener("resize", () => {
      this.setState({
        frameWidth:
          document.getElementById("frame").getBoundingClientRect().width - 100
      });
    });
  };

  componentDidMount() {
    this.props.parent.setState({ currentPage: window.location.pathname });
    this.setSize();

    setTimeout(() => {
      this.setState({ loadMore: true });
    }, 5000);

    setTimeout(() => {
      this.setState({ loadEvenMore: true });
    }, 10000);
  }

  render() {
    const dataExists = this.props.data && this.props.data.location;
    return (
      <div id="frame">
        <InfoBox
          id={this.props.data._id}
          media={this.props.data.location.image}
          region={this.props.data.location.region.name}
          region_precise={this.props.data.location.region.precise}
          nearby={this.props.data.location["near_by"]}
          cardinals={this.props.data.location.cardinals.full}
          isNewlocation={this.props.dataFor}
          parent={this}
        />
      </div>
    );
  }
}
export default Finder;
