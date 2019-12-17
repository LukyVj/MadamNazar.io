/** @jsx jsx */
import React, { Component } from "react";
import { css, jsx } from "@emotion/core";
import ReactGA from "react-ga";
import RDAppear from "../../components/RDAppear/RDAppear";
import Map from "../../components/Map/Map";
import styles from "./styles.css";
import bgMainSml from "../../images/bgMainSml.jpg";

const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

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
          box-shadow: 0 0 32px rgba(0, 0, 0, 0.2);
          max-width: 90%;
          max-height: 60%;
          position: fixed;
          left: 0;
          right: 0;
          margin: auto;

          background-image: url(${props.parent.state.modalImage}),
            url(${bgMainSml});
          background-repeat: no-repeat, repeat;
          background-position: center center, center;
          background-size: contain, auto;
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
        <div className="w-100p h-100p " />
      </div>

      <div css={styles.posterWrapper} className="pv-32">
        <div css={[styles.posterGrid, styles.posterLayout]}>
          <section
            css={css`text-align: center;`}
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
                css={css`padding: 8px;`}
              >
                <RDAppear
                  image={props.media["tilt_shift"].full}
                  width={props.parent.state.frameWidth / 2}
                  height={480}
                  onClick={() => {
                    props.parent.setState({
                      modal: true,
                      modalImage: props.media.normal.full,
                      /*
                        modalImageDarkMode prop causes crash at this moment
                        Seems to be it's not used in child component
                        Commented it out for future use
                      */
                      // modalImageDarkMode: props.media.negative.full
                    });
                    ReactGA.event({
                      category: "click.finder.modal",
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
                      /*
                        modalImageDarkMode prop causes crash at this moment
                        Seems to be it's not used in child component
                        Commented it out for future use
                       */
                      // modalImageDarkMode: props.media.negative.zoom
                    });
                    ReactGA.event({
                      category: "click.finder.modal",
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
                category: "click.finder.map",
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

    console.log(this.props)
  }

  render() {
    return (
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
    );
  }
}
export default Finder;
