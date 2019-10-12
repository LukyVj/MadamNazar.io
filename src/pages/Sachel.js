import React, { Component } from "react";
import { css, cx } from "emotion";
import ReactGA from "react-ga";
import styles from "./Sachel.css";
import { capitalize, isBrowser } from "../scripts/helpers";
import collectionItems from "../data/collection-items.json";
import localStorageDB from "localstoragedb";

const fetchLive = false;

const collection = [];
const itemGuid = item => `${item.text}-${item.tool}-${item.day}`;
let database = new localStorageDB("setPerCycle", localStorage);

const getCategory = filename => filename.split("_")[0];

const Sachel = (category, cycle) => {
  // return ls.get("collections").map(item => {
  //   return (
  //     <div
  //       className={cx(
  //         `item-for-cycle-${cycle}`,
  //         css`
  //           background-color: var(--Twine);
  //         `,
  //         styles.itemBox
  //       )}
  //       dataType={getCategory(item.name)}
  //     >
  //       <h3 className={cx(`p-8 m-0 wb-break-word`, styles.title)}>
  //         <span
  //           className={cx(
  //             css`
  //               display: inline-block;
  //               vertical-align: middle;
  //               width: 26px;
  //               height: 32px;
  //             `,
  //             "mr-8"
  //           )}
  //         />
  //         {/* {capitalize(item.icon.split("-")[0])}  */}
  //         {capitalize(item.name.replace(/_/g, " "))}
  //       </h3>
  //       <div className=" p-8">
  //         <p>
  //           {item.tool !== "0" && "you can get it with "}
  //           <b>
  //             {item.tool === "1" || (item.tool === "2" && "the ")}
  //             {item.tool !== "0" && this.getItemTool(parseInt(item.tool))}
  //           </b>
  //         </p>
  //         <div className="d-grid g-2">
  //           <button
  //             onClick={() => this.removeItemFromCollection(item, collection)}
  //             className={cx(styles.button, styles.buttonLeft)}
  //           >
  //             <b>- 1</b>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });
};

class Cycles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: collectionItems,
      cycle: this.props.cycle,
      selectedCategory: "all",
      itemsForCurrentCycle: 0,
      openSachel: false,
      objectTypes: [
        { name: "all", value: "all" },
        { name: "card-cups", value: "cups" },
        { name: "card-swords", value: "swords" },
        { name: "card-wands", value: "wands" },
        { name: "card-pentacles", value: "pentacles" },
        { name: "coin", value: "coin" },
        { name: "bird-eggs", value: "egg" },
        { name: "antique-bottles", value: "bottle" },
        { name: "arrowhead", value: "arrowhead" },
        { name: "family-heirlooms", value: "heirlooms" },
        { name: "american-flowers", value: "flower" },
        { name: "lost-ring", value: "ring" },
        { name: "lost-necklaces", value: "necklace" },
        { name: "lost-earrings", value: "earring" },
        { name: "lost-bracelet", value: "bracelet" }
      ]
    };
  }

  fetchData = () => {
    // Ensure that the data is alrady in the localStorare
    if (fetchLive) {
      const url =
        "https://cors-anywhere.herokuapp.com/https://jeanropke.github.io/RDR2CollectorsMap/data/items.json";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
          "Accept-Encoding": "gzip, deflate",
          Authorization:
            "Bearer AAAAAAAAAAAAAAAAAAAAABrO0AAAAAAA8qTMsAShpS43PMvZweECxqTZ728%3DFF6BCPcE2CBuqYeTo00Z88tQxNIPWerPb7fEzmpaUE75nzF8LO",
          "Cache-Control": "cached",
          Connection: "keep-alive"
        }
      })
        .then(response => response.json())
        .then(data => {
          this.setState({ data });
        })
        .catch(function(err) {
          console.log("error", err);
        });
    } else {
      // this.setState({ data: ls.get(`sets-${this.state.cycle}`) });
      // this.countData();
    }
  };

  initDb = () => {};

  getLocalData = () => {
    // Store data locally
    this.setState({ data: collectionItems });

    // Detect if the database exists
    if (database.tableExists("setPerCycle")) {
      [1, 2, 3].forEach(cycleDay => {
        const setPerDay = [];
        collectionItems.forEach(item => {
          parseInt(item.day) === cycleDay && setPerDay.push({ item });
        });

        // If it does, make sure to update the informations
        database.alterTable("setPerCycle", {
          ID: cycleDay,
          sets: setPerDay,
          cycle: cycleDay
        });
        database.commit();
      });
    } else {
      // If the table doesn't exist, create the needed ones
      console.log("new");
      database.createTable("setPerCycle", ["ID", "sets", "cycle"]);
      database.createTable("sachel", [
        "ID",
        "guid",
        "name",
        "tool",
        "day",
        "dupplicate"
      ]);
      database.commit();

      [1, 2, 3].forEach(cycleDay => {
        const setPerDay = [];
        collectionItems.forEach(item => {
          parseInt(item.day) === cycleDay && setPerDay.push({ item });
        });
        // And inset the data
        database.insert("setPerCycle", {
          ID: cycleDay,
          sets: setPerDay,
          cycle: cycleDay
        });
        database.commit();
      });
    }
  };

  componentDidMount() {
    this.props.parent.setState({
      currentPage: window.location.pathname
    });

    this.getLocalData();
  }

  componentWillUnmount() {
    this.setState({
      // itemsForCurrentCycle: this.tempCollect.length
    });
    // console.log(this.tempCollect.length);
  }

  getCategory = filename => filename.split("_")[0];
  getItemTool = toolId => {
    let toolName;
    switch (toolId) {
      case 0:
        toolName = "all";
        break;
      case 1:
        toolName = "shovel";
        break;
      case 2:
        toolName = "metal-detector";
        break;
      default:
        toolName = null;
    }

    return toolName;
  };

  clearStorage = () => {
    collection = [];
    this.setState({ updated: true, itemsInSachel: collection.length });
  };

  addItemToCollection = item => {
    // const itemExist = () =>
    //   database.queryAll("sachel", {
    //     query: function(row) {
    //       // the callback function is applied to every row in the table
    //       if (row.guid === itemGuid(item)) {
    //         // if it returns true, the row is selected
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     }
    //   });
    // if (itemExist === false) {
    //   database.insert("sachel", {
    //     ID: itemGuid(item),
    //     guid: itemGuid(item),
    //     name: item.text,
    //     tool: item.tool,
    //     day: item.day,
    //     dupplicate: 0
    //   });
    //   database.commit();
    // } else {
    //   database.alterTable("sachel", {
    //     ID: itemGuid(item),
    //     guid: itemGuid(item),
    //     name: item.text,
    //     tool: item.tool,
    //     day: item.day,
    //     dupplicate: "yes"
    //   });
    //   database.commit();
    // }

    database.queryAll("sachel", {
      query: function(row) {
        // the callback function is applied to every row in the table
        if (row.guid === itemGuid(item)) {
          database.alterTable("sachel", {
            ID: itemGuid(item),
            guid: itemGuid(item),
            name: item.text,
            tool: item.tool,
            day: item.day,
            dupplicate: "yes"
          });
          database.commit();
        } else {
          database.insert("sachel", {
            ID: itemGuid(item),
            guid: itemGuid(item),
            name: item.text,
            tool: item.tool,
            day: item.day,
            dupplicate: 0
          });
          database.commit();

        }
      }
    });
          database.commit();

    this.setState({ updated: true });
  };

  removeItemFromCollection = (item, collection) => {
    var index = collection.find(it => it._id === itemGuid(item));
    console.log(index);
    index && collection.splice(index, 1);

    this.setState({ updated: true, itemsInSachel: collection.length });
    // console.table(ls.get("collections"));
  };

  openSachel = () => {
    this.setState({ openSachel: !this.state.openSachel });
  };

  refineWithSelectedCycle = cycle => {
    this.setState({ cycle: cycle });
    this.setState({ updated: true });
  };

  render() {
    const dataExists = this.state.data !== null && this.state.data;
    // const collectionExists = ls.get("collections") ? true : false;
    return (
      <>
        <div id="frame">
          <div className="pv-32 ta-center">
            <h2>Items available for today ( Cycle {this.state.cycle} )</h2>
          </div>
          <ul className="lis-none pv-48 w-100pv d-flex fxd-row">
            <li className={cx(styles.boxBorders, "mr-8 p-8")}>
              All items {this.state.itemsForCurrentCycle}
            </li>
            <li className={cx(styles.boxBorders, "mr-8 p-8")}>
              Your collections {this.state.itemsInSachel}
            </li>
            <li className={cx(styles.boxBorders, "mr-8 ")}>
              <button
                className="p-0 d-block w-100p h-100p p-8"
                onClick={() => this.clearStorage()}
              >
                Clear sachel
              </button>
            </li>
            <li className={cx(styles.boxBorders, "mr-8 ")}>
              <button
                className="p-0 d-block w-100p h-100p p-8"
                onClick={() => this.openSachel()}
              >
                Open sachel
              </button>
            </li>
            <li>
              <label>Select a cycle</label>
              <br />
              <select
                onChange={e => {
                  this.refineWithSelectedCycle(e.target.value);
                }}
              >
                <option value="1" defaultValue={this.state.cycle === 1}>
                  1
                </option>
                <option value="2" defaultValue={this.state.cycle === 2}>
                  2
                </option>
                <option value="3" defaultValue={this.state.cycle === 3}>
                  3
                </option>
              </select>
            </li>
          </ul>
          <div className="d-grid g-6 pv-48">
            <div className="gcstart-1 gcend-2">
              <ul
                className={cx(
                  `lis-none p-0 m-0 d-flex fxw-wrap pos-sticky`,
                  css`
                    top: 116px;
                  `
                )}
              >
                {this.state.objectTypes.map((type, index) => (
                  <li
                    className={`d-inline-block p-4 label fsz-16 bdw-6 cursor-pointer mr-4 mb-4 w-100p ${cx(
                      styles.boxBordersSmall,
                      type.value === this.state.selectedCategory &&
                        styles.activeButton
                    )}`}
                    onClick={() =>
                      this.setState({
                        selectedCategory: type.value
                      })
                    }
                  >
                    <span
                      className={cx(
                        type.value !== "all" &&
                          css`
                            background: url(${require(`../images/icons/${type.name}.png`)})
                              no-repeat center top / 46px;
                            display: inline-block;
                            vertical-align: middle;
                            width: 26px;
                            height: 32px;
                          `,
                        "mr-8"
                      )}
                    />
                    {type.name.replace("-", " ")}
                  </li>
                ))}
              </ul>
            </div>
            {dataExists ? (
              <div className="gcstart-2 gcend-7">
                {this.state.openSachel === false ? (
                  <div className="d-grid sm:g-2 md:g-3 lg:g-4 ggap-8 ph-16">
                    {this.state.data.map(item => {
                      return (
                        parseInt(item.day) === this.state.cycle && (
                          <div
                            className={cx(
                              `item-for-cycle-${this.state.cycle}`,
                              css`
                                background-color: var(--Twine);
                              `,
                              styles.itemBox,
                              `${getCategory(item.text)} ${
                                getCategory(item.text) ===
                                  this.state.selectedCategory ||
                                this.state.selectedCategory === "all"
                                  ? "d-inline-block "
                                  : "d-none"
                              } `
                            )}
                            dataType={getCategory(item.text)}
                          >
                            <h3
                              className={cx(
                                `p-8 m-0 wb-break-word`,
                                styles.title
                              )}
                            >
                              <span
                                className={cx(
                                  css`
                                    background: url(${require(`../images/icons/${item.icon}.png`)})
                                      no-repeat center top / 46px;
                                    display: inline-block;
                                    vertical-align: middle;
                                    width: 26px;
                                    height: 32px;
                                  `,
                                  "mr-8"
                                )}
                              />
                              {capitalize(item.icon.split("-")[0])} 
                              {capitalize(item.text.replace(/_/g, " "))}
                            </h3>

                            <div className=" p-8">
                              <p>
                                Available during the cycle {parseInt(item.day)}
                              </p>
                              <p>
                                {item.tool !== "0" && "you can get it with "}
                                <b>
                                  {item.tool === "1" ||
                                    (item.tool === "2" && "the ")}
                                  {item.tool !== "0" &&
                                    this.getItemTool(parseInt(item.tool))}
                                </b>
                              </p>

                              {(item.tool === "1" || item.tool === "2") && (
                                <img
                                  src={require(`../images/icons/${this.getItemTool(
                                    parseInt(item.tool)
                                  )}.png`)}
                                  alt={`icon for ${item.icon}`}
                                  className={`va-middle h-50 w-auto ${item.tool ===
                                    "1" &&
                                    css`
                                      filter: drop-shadow(1px 1px 2px black);
                                    `}`}
                                />
                              )}
                              <div className="d-grid g-2">
                                <button
                                  onClick={() =>
                                    this.removeItemFromCollection(
                                      item,
                                      collection
                                    )
                                  }
                                  className={cx(
                                    styles.button,
                                    styles.buttonLeft
                                  )}
                                >
                                  <b>- 1</b>
                                </button>
                                <button
                                  onClick={() => this.addItemToCollection(item)}
                                  className={cx(
                                    styles.button,
                                    styles.buttonRight
                                  )}
                                >
                                  <b>+ 1</b>
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                ) : (
                  <Sachel
                    category={this.state.selectedCategory}
                    cycle={this.state.cycle}
                  />
                )}
              </div>
            ) : (
              <p>No data to display :'( </p>
            )}
            {this.state.fail === true && (
              <div
                css={css`
                  background: rgba(255, 0, 0, 0.1);
                  color: red;
                  padding: 16px;
                  border-radius: 8px;
                  border: 1px solid red;
                  margin: 100px auto;
                  max-width: 600px;
                  line-height: 2;
                `}
              >
                <p>
                  An error occured or there is no data to display. <br />
                  Please refresh the page, or send us a tweet at @LukyVj
                </p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
export default Cycles;
