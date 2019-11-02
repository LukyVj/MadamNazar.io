/* @jsx jsx */
import React, { Component } from "react";
import ReactGA from "react-ga";
import { css, jsx } from "@emotion/core";
import { IMAGES_CDN } from "../scripts/constants";

import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
  connectRefinementList,
  Configure,
  connectCurrentRefinements
} from "react-instantsearch-dom";

import Infos from "../components/Infos";
import ability_cards from "../data/ability_cards";
import styles from "../styles/globalStyles.css";

const searchClient = algoliasearch(
  "2PHAMA0DA5",
  "6887572295e888df9306e9307b611e4d"
);

const card_colors = {
  dead_eye: ["#e0a9a9", "#d88484", "#cc5050"],
  recovery: ["#bcd19d", "#6db579", "#489b5d"],
  combat: ["#fbe7be", "#f8d693", "#f5c25d"],
  defense: ["#8eb7c1", "#248a9b", "#0b657a"]
};
const imageName = name =>
  name
    .replace(/\s+/g, "_")
    .replace("’", "")
    .toUpperCase();

const FavoriteDeck = props => {
  const { parent, onClick } = props;

  return (
    <div
      onClick={onClick}
      className="d-grid g-4 ggap-8 bdr-6 p-8 ph-16 ai-center jc-center mb-16"
      css={[
        styles.card_animation_wrapper,
        css`
          background: rgba(0, 0, 0, 0.2)
            url(${require("../images/rough_bg.png")}) no-repeat center center /
            cover;
        `
      ]}
    >
      <div css={styles.card_animation}>
        <img
          src={
            !parent.state.favorite_dead_eye[0]
              ? require("../images/ability_cards/CARD_BACK_EYE.png")
              : parent.state.favorite_dead_eye[0].image
          }
          className="w-100p"
          alt="card back"
          css={
            parent.state.favorite_dead_eye.length !== 0 &&
            css`
              background: ${parent.state.favorite_dead_eye[0].color};
            `
          }
        />
      </div>
      <div css={styles.card_animation}>
        <img
          src={
            !parent.state.favorite_deck[0]
              ? require("../images/ability_cards/CARD_BACK.png")
              : parent.state.favorite_deck[0].image
          }
          className="w-100p"
          alt="card back"
          css={
            parent.state.favorite_deck[0] &&
            css`
              background: ${parent.state.favorite_deck[0].color};
            `
          }
        />
      </div>
      <div css={styles.card_animation}>
        <img
          src={
            !parent.state.favorite_deck[1]
              ? require("../images/ability_cards/CARD_BACK.png")
              : parent.state.favorite_deck[1].image
          }
          className="w-100p"
          alt="card back"
          css={
            parent.state.favorite_deck[1] &&
            css`
              background: ${parent.state.favorite_deck[1].color};
            `
          }
        />
      </div>
      <div css={styles.card_animation}>
        <img
          src={
            !parent.state.favorite_deck[2]
              ? require("../images/ability_cards/CARD_BACK.png")
              : parent.state.favorite_deck[2].image
          }
          className="w-100p"
          alt="card back"
          css={
            parent.state.favorite_deck[2] &&
            css`
              background: ${parent.state.favorite_deck[2].color};
            `
          }
        />
      </div>
    </div>
  );
};

const Card = props => {
  const { name, description, type, unlock, parent, display, onClick } = props;

  return (
    <div
      className="ov-hidden"
      data-type={type}
      css={[
        styles.card_animation_wrapper,
        css`
          ${!display && "display: none;"}

          .card-information {
            transform: translateY(100%);
            transition: transform 0.2s ease;
            will-change: transform;
          }

          .add-to-deck {
            opacity: 0;
            transform: scale(0);
            transition: transform 0.2s ease;
            will-change: transform;
            z-index: 99;
          }

          &:hover {
            .card-information {
              transform: translateY(0);
            }
            .add-to-deck {
              opacity: 1;
              transform: scale(1);
            }
          }
        `
      ]}
    >
      <div className="pos-relative" css={styles.card_animation}>
        <button
          className="add-to-deck pos-absolute m-16 bxs-default fw-bold d-none md:d-block"
          css={[
            styles.button,
            css`
              background: white;
              color: black;
              font-size: 14px;

              &:hover {
                color: white;
              }
            `
          ]}
          onClick={onClick}
        >
          Add to deck
        </button>
        <div
          css={css`
            background: ${card_colors[type][parent.state.card_level]};
            /* background-image: linear-gradient(
              to bottom right,
              ${card_colors[type][0]},
              ${card_colors[type][1]},
              ${card_colors[type][2]}
            ); */
            border-radius: 8px;
          `}
        >
          <img
            src={`${IMAGES_CDN}/ability_cards/${type}/${imageName(name)}.png`}
            alt={`Card ${type}/${imageName}`}
            className="w-100p"
            css={css`
              transform: scale(1.043) translateY(0.5%) translateX(-0.09%);
            `}
          />
        </div>
        <span
          className="pos-absolute"
          css={css`
            bottom: 12%;
            z-index: 10;
            left: 0;
            right: 0;
            margin: auto;
            width: 100%;
            text-align: center;
            z-index: 10;
          `}
        >
          {parent.state.card_level + 1 === 1
            ? "I"
            : parent.state.card_level + 1 === 2
            ? "II"
            : parent.state.card_level + 1 === 3
            ? "III"
            : null}
        </span>

        {unlock && (
          <span
            className="pos-absolute"
            css={css`
              top: 4%;
              z-index: 10;
              right: 0;
              margin: auto;
              width: 100%;
              text-align: center;
              padding: 0.5em 0.85em;
              background: url(${require("../images/rank_shield.png")}) no-repeat
                center center / contain;
              line-height: 1;
              width: 40px;
              height: 32px;
              filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.4));
              z-index: 10;
            `}
          >
            {unlock}
          </span>
        )}
      </div>
      <div
        className="pos-absolute bot-0 p-16 fsz-14 card-information ov-auto"
        css={css`
          background: rgba(0, 0, 0, 0.9);
          z-index: 11;
          max-height: 60%;
        `}
      >
        <h3 className="label color-white lsp-big p-0 m-0">{name}</h3>
        <p className="color-white">{description}</p>
        {unlock && (
          <p className="color-white">
            {" "}
            <span
              className="p-8 d-inline-block va-middle"
              css={css`
                background: url(${require("../images/rank_shield.png")})
                  no-repeat center center / contain;
                margin-right: 4px;
              `}
            ></span>{" "}
            Unlocks at rank: {unlock}
          </p>
        )}
      </div>
    </div>
  );
};

const Hits = ({ hits, parent }) => {
  return hits.map(hit => (
    <Card
      name={hit.name}
      description={hit.description}
      type={hit.type}
      unlock={hit.unlock}
      parent={parent}
      display={parent.cardDisplay(hit.type)}
      onClick={() => parent.handleClick(hit)}
    />
  ));
};

const RefinementList = ({ items, refine, createURL, parent }) => (
  <div className="d-flex fxd-row jc-around fxw-wrap md:fxw-nowrap md:fxd-column">
    {items.map(item => (
      <span className="fx-12 xs:fx-6 md:fx-12">
        <span className="mr-8 md:mr-0 d-block">
          <button
            key={item.label}
            css={[
              styles.button,
              css`
                padding: 0;
              `
            ]}
            className="w-100p mr-8 mb-8 ov-hidden d-flex"
            onClick={() => {
              refine(item.label);
              parent.setState({ card_type: item.label });
            }}
          >
            {item.label !== "all" && (
              <div
                className="d-inline-block p-8 ta-center js-start w-50"
                css={css`
                  background: ${card_colors[item.label][2]};
                `}
              >
                <img
                  src={require(`../images/icon_${item.label}.png`)}
                  alt="dead_eye"
                  className="va-middle"
                  css={css`
                    height: 24px;
                  `}
                />
              </div>
            )}
            <span className="p-8 ph-16 va-middle tt-capitalize">
              {item.label.replace("_", " ")}
            </span>
            <span className="p-8 pl-0 va-middle fw-bold">{item.count}</span>
          </button>
        </span>
      </span>
    ))}
    <span className="fx-12">
      <CardClearRefinements parent={parent} />
    </span>
  </div>
);

const ClearRefinements = ({ items, refine, parent }) => (
  <button
    css={styles.button}
    className="w-100p"
    onClick={() => {
      refine(items);
      parent.setState({ card_type: "all" });
    }}
  >
    All cards
  </button>
);

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <form noValidate action="" role="search" className="w-100p mb-8">
    <input
      type="search"
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
      className="p-16 app-none bdw-0 bgc-transparent w-100p color-white fsz-24"
      placeholder="Search a term"
      css={css`
        background: url(${require("../images/rough_bg_input.png")}) no-repeat
          center center / 100% 100%;
      `}
    />
  </form>
);

const DeckPreviewer = ({ fav_deck, dead_eye, parent }) => {
  return (
    <div
      className="pos-fixed top-0 left-0 p-48 w-100p h-100p color-white"
      css={css`
        z-index: 99999;
        background: rgba(0, 0, 0, 0.8);
      `}
    >
      <button
        css={[styles.button]}
        onClick={() => parent.setState({ displayDeckPreviewer: false })}
      >
        x
      </button>
      <div className="d-grid g-2 lg:g-4 pv-32 w-90p">
        {
          <div>
            <div className="lg:d-grid g-2">
              <div
                css={css`
                  border-radius: 8px;
                `}
              >
                <img
                  css={css`
                    background: ${dead_eye[0] ? dead_eye[0].color : "black"};
                    min-width: 140px;
                  `}
                  src={
                    dead_eye[0]
                      ? dead_eye[0].image
                      : require("../images/ability_cards/CARD_BACK_EYE.png")
                  }
                  alt={
                    dead_eye[0]
                      ? `Card dead_eye/${imageName(dead_eye[0].name)}`
                      : "back card"
                  }
                  className="w-100p"
                />
              </div>
              <div className="p-8">
                <div>
                  <h2 className="mt-0">
                    {dead_eye[0] ? dead_eye[0].name : "Not selected"}
                  </h2>
                </div>
                <p>{dead_eye[0] ? dead_eye[0].description : "Not selected"}</p>
              </div>
            </div>
          </div>
        }
        {fav_deck.map(card => (
          <div>
            <div className="lg:d-grid g-2">
              <div
                css={css`
                  border-radius: 8px;
                `}
              >
                <img
                  css={css`
                    background: ${card ? card.color : "black"};
                    min-width: 140px;
                  `}
                  src={
                    card
                      ? card.image
                      : require("../images/ability_cards/CARD_BACK.png")
                  }
                  alt={
                    card
                      ? `Card ${card.type}/${imageName(card.name)}`
                      : "back card"
                  }
                  className="w-100p"
                />
              </div>
              <div className="p-8">
                <div>
                  <h2 className="mt-0">{card ? card.name : "Not selected"}</h2>
                </div>
                <p>{card ? card.description : "Not selected"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CardSearchBox = connectSearchBox(SearchBox);

const CardClearRefinements = connectCurrentRefinements(ClearRefinements);

const CardRefinementList = connectRefinementList(RefinementList);

const CardHits = connectHits(Hits);

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_cards: [],
      all_cards_ready: false,
      card_level: 0,
      card_type: "all",
      favorite_deck: [],
      favorite_dead_eye: [],
      displayDeckPreviewer: false
    };
  }

  orderCards = () => {
    ability_cards.map(cardType => {
      cardType.cards.map(card => this.state.all_cards.push(card));
    });
    this.setState({ all_cards_ready: true });
  };

  cardDisplay = type => {
    let res;
    if (this.state.card_type === type) {
      res = true;
    } else if (this.state.card_type === "all") {
      res = true;
    } else {
      res = false;
    }
    return res;
  };

  handleClick = card => {
    let favDeck = this.state.favorite_deck;
    let favDeadEye = this.state.favorite_dead_eye;

    if (card.type === "dead_eye") {
      if (favDeadEye.length === 0) {
        favDeadEye.push({
          name: card.name,
          image: `${IMAGES_CDN}/ability_cards/${card.type}/${imageName(
            card.name
          )}.png`,
          color: card_colors[card.type][this.state.card_level],
          description: card.description
        });
      } else {
        favDeadEye = [];
      }
    } else {
      if (favDeck.length <= 2) {
        favDeck.push({
          name: card.name,
          image: `${IMAGES_CDN}/ability_cards/${card.type}/${imageName(
            card.name
          )}.png`,
          color: card_colors[card.type][this.state.card_level],
          description: card.description
        });
      } else {
        favDeck = [];
      }
    }
    this.setState({ favorite_deck: favDeck, favorite_dead_eye: favDeadEye });
  };

  displayDeck = () => {
    this.setState({ displayDeckPreviewer: !this.state.displayDeckPreviewer });
  };

  componentDidMount() {
    ReactGA.pageview("/deck");
    this.orderCards();
  }

  render() {
    return (
      <InstantSearch
        indexName="madam_nazar_ability_cards"
        searchClient={searchClient}
      >
        <Configure hitsPerPage={50} />

        {this.state.displayDeckPreviewer && (
          <DeckPreviewer
            dead_eye={this.state.favorite_dead_eye}
            fav_deck={this.state.favorite_deck}
            parent={this}
          />
        )}

        <div>
          <header className="ta-center pb-32">
            <h1>Red Dead Online Abilities Cards</h1>
            <p>
              Explore the different ability cards and learn more about what they
              do
            </p>
          </header>
          <div className="pos-relative">
            <div className="md:d-grid g-6">
              <div className=" md:gcstart-1 md:gcend-2 ">
                <div className="md:pos-sticky md:top-16">
                  <nav className="d-flex fxd-column md:pr-16 ov-auto">
                    <div className="w-100p">
                      <CardSearchBox />
                    </div>
                    <div
                      className="d-none md:d-block"
                      css={css`
                        button {
                          transform: scale(0) translateY(-50%);
                          position: absolute;
                          top: 50%;
                          left: 0;
                          right: 0;
                          z-index: 9999;
                          margin: auto;
                        }

                        &:hover {
                          .deck {
                            filter: blur(3px);
                            opacity: 0.9;
                          }

                          button {
                            transform: scale(1) translateY(-50%);
                          }
                        }
                      `}
                    >
                      <header>
                        <h3 className="lsp-big p-0 mt-8">Deck Preview</h3>
                      </header>
                      <div className="pos-relative">
                        <button
                          css={styles.button}
                          onClick={() => this.displayDeck()}
                        >
                          Open current deck
                        </button>
                        <div className="deck">
                          <FavoriteDeck parent={this} />
                        </div>
                      </div>
                    </div>
                    <div className="pv-16">
                      <header>
                        <h3 className="lsp-big p-0 mt-8">Card type</h3>
                      </header>
                      <CardRefinementList attribute="type" parent={this} />
                    </div>
                    <div className="pv-16">
                      <header>
                        <h3 className="lsp-big p-0 mt-8">Card level</h3>
                      </header>
                      <div className="d-flex fxd-row">
                        {[0, 1, 2].map(level => (
                          <button
                            key={level}
                            css={styles.button}
                            className="w-auto mr-8 mb-8 fx-4"
                            onClick={() => this.setState({ card_level: level })}
                          >
                            {level + 1 === 1
                              ? "I"
                              : level + 1 === 2
                              ? "II"
                              : level + 1 === 3
                              ? "III"
                              : null}
                          </button>
                        ))}
                      </div>
                    </div>
                  </nav>
                </div>
              </div>

              <div className="d-grid g-2 md:g-3 lg:g-4 ggap-8 pb-32 gcstart-2 gcend-7">
                <CardHits parent={this} />
              </div>
            </div>

            <Infos>
              The majority of these informations has been extracted from{" "}
              <a href="https://www.gtabase.com/news/red-dead-redemption-2/online/red-dead-online-ability-cards-full-list-of-character-abilities-loadout">
                This article
              </a>
            </Infos>
          </div>
        </div>
      </InstantSearch>
    );
  }
}
export default Deck;
