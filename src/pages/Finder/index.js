/** @jsx jsx */
import React, { Component, Fragment } from "react";
import { css, jsx } from "@emotion/core";
import ReactGA from "react-ga";
import RDAppear from "../../components/RDAppear/RDAppear";
import Map from "../../components/Map/Map";
import Modal from "../../components/Modal";
import styles from "./styles.css";

const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ExpandModal = (props) => {
  const { modalImage, onClose } = props;
  return (
    <Modal
      onClose={onClose}
      withBackgroundImage
      withContentPadding={false}
    >
      <img
        alt="Expanded map"
        css={css`
          width: 100%;
          height: 100%;
          object-fit: cover;
        `}
        src={modalImage}
      />
    </Modal>
  )
};

const InfoBox = props => {
  const {
    expandModalActive,
    expandModalImage,
    frameWidth,
    handleExpandModalClose,
    handleExpandModalOpen,
    media
  } = props;

  return (
    <>
      {expandModalActive && (
        <ExpandModal
          modalImage={expandModalImage}
          onClose={handleExpandModalClose}
        />
      )}
      <div css={styles.posterWrapper} className="pv-32">
        <div css={[styles.posterGrid, styles.posterLayout]}>
          <section css={css`text-align: center;`}>
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
            <p>
              In the {capitalize(props.cardinals.split(" ")[0])}
              {capitalize(props.cardinals.split(" ")[1])} side of the map.
              nearby{" "}
              {props.nearby.map((poi, index) => (
                <Fragment key={index}>
                  {index === props.nearby.length - 1 && " & "}

                  <b
                    css={css`
                      border-bottom: 2px solid var(--Tabasco);
                      display: inline-block;
                      margin: 0 2px;
                    `}
                  >
                    {capitalize(poi)}
                  </b>
                  {index !== props.nearby.length - 1 &&
                  (index !== props.nearby.length - 2 && ", ")}
                </Fragment>
              ))}
              .
            </p>
            <a href={props.link}>{props.link}</a>

            <div
              className="cursor-pointer d-grid md:g-2"
              css={css`padding: 8px;`}
            >
              <RDAppear
                image={media["tilt_shift"].full}
                onClick={() => {
                  handleExpandModalOpen(media.normal.full);
                  ReactGA.event({
                    category: "click.finder.modal",
                    action: "Open First image"
                  });
                }}
                width={frameWidth / 2}
                height={480}
              />

              <RDAppear
                image={media["tilt_shift"].zoom}
                onClick={() => {
                  handleExpandModalOpen(media.normal.zoom);
                  ReactGA.event({
                    category: "click.finder.modal",
                    action: "Open Second image"
                  });
                }}
                width={frameWidth / 2}
                height={480}
              />
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
      expandModalActive: false,
      expandModalImage: null,
      frameWidth: null
    };
  }

  handleExpandModalOpen = (imageSrc) => {
    this.setState({
      expandModalActive: true,
      expandModalImage: imageSrc
    })
  };

  handleExpandModalClose = () => {
    this.setState({
      expandModalActive: false,
      expandModalImage: null
    })
  };

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
    const {
      expandModalActive,
      expandModalImage,
      frameWidth
    } = this.state;

    return (
      <InfoBox
        expandModalActive={expandModalActive}
        expandModalImage={expandModalImage}
        frameWidth={frameWidth}
        handleExpandModalClose={this.handleExpandModalClose}
        handleExpandModalOpen={this.handleExpandModalOpen}
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
