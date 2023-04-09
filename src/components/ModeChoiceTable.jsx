import React, { useEffect } from "react";
import db_0km from "../../data/sample_db_0km.json";
import db_5km from "../../data/sample_db_5km.json";
import db_10km from "../../data/sample_db_10km.json";
import db_15km from "../../data/sample_db_15km.json";
import db_20km from "../../data/sample_db_20km.json";
import db_25km from "../../data/sample_db_25km.json";

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import ElectricRickshawIcon from "@mui/icons-material/ElectricRickshaw";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Groups2Icon from "@mui/icons-material/Groups2";
import AirlineSeatLegroomReducedIcon from "@mui/icons-material/AirlineSeatLegroomReduced";
import AirlineSeatLegroomExtraIcon from "@mui/icons-material/AirlineSeatLegroomExtra";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const ModeChoiceTable = ({ questions, answers }) => {
  const cols = 5;

  const col_modes = ["mode_1", "mode_2", "mode_4"];

  const [question_1, question_2] = questions;
  let question_1_answer =
    question_1.choices[answers.find((q) => q.questionNo == 0).optionNo];
  let question_2_answer =
    question_2.choices[answers.find((q) => q.questionNo == 1).optionNo];

  let db = null;

  switch (question_2_answer) {
    case "< 5 km":
      db = db_0km.Data[0];
      break;
    case "5 - 10 km":
      db = db_5km.Data[0];
      break;
    case "10- 15 km":
      db = db_10km.Data[0];
      break;
    case "15- 20 km":
      db = db_15km.Data[0];
      break;
    case "20- 25 km":
      db = db_20km.Data[0];
      break;
    case "> 25 km":
      db = db_25km.Data[0];
      break;

    default:
      db = null;
      break;
  }

  const getIcon = (mode, dbreq) => {
    const key = dbreq ? db[mode] : mode;
    switch (key) {
      case "Bus Type 1":
        return <DirectionsBusIcon />;
      case "Bus Type 2":
        return <DirectionsBusIcon />;
      case "Metro / Train":
        return <DirectionsTransitIcon />;
      case "Ride-hailing Car":
        return <LocalTaxiIcon />;
      case "Ride-hailing Two-wheeler":
        return <TwoWheelerIcon />;
      case "Auto":
        return <ElectricRickshawIcon />;
      case "Own Car":
        return <DirectionsCarIcon />;
      case "Own Two-wheeler":
        return <TwoWheelerIcon />;
      case "Walk / Bicycle":
        return <EmojiPeopleIcon />;
      case "Many seats available":
        return [<PeopleAltIcon />];
      case "Some seats available":
        return [<PeopleAltIcon />, <PeopleAltIcon />];
      case "All seats occupied; standing space available":
        return [<EmojiPeopleIcon />, <EmojiPeopleIcon />, <EmojiPeopleIcon />];
      case "Fully crowded or packed":
        return [
          <Groups2Icon />,
          <PeopleAltIcon />,
          <EmojiPeopleIcon />,
          <EmojiPeopleIcon />,
          <EmojiPeopleIcon />,
        ];
      case "Ordinary":
        return [<AirlineSeatLegroomReducedIcon />];
      case "Express Non-AC":
        return [<AirlineSeatLegroomExtraIcon />];
      case "Express AC":
        return [<AirlineSeatLegroomExtraIcon />, <AcUnitIcon />];
      default:
        return null;
    }
  };
  //   console.log("db: ", db, "q2: ", question_2_answer)

  const Row1Element = ({ mode }) => {
    return (
      <>
        {db[mode]} <br />
        <input
          className="form-check-input"
          type="radio"
          name={mode}
          id={mode}
        />
      </>
    );
  };

  const getRow1 = () => {
    let col_4 = [
      <Row1Element mode={"mode_9"} />,
      <Row1Element mode={"mode_8"} />,
    ];

    if (question_1_answer === "Own Two-wheeler") {
      col_4 = col_4[0];
      col_modes.push("mode_9");
    } else if (question_1_answer === "Own Car") {
      col_4 = col_4[1];
      col_modes.push("mode_8");
    } else {
      const random = Math.floor(Math.random() * 2);
      col_4 = col_4[random];
      col_modes.push(random === 0 ? "mode_9" : "mode_8");
    }

    let col_5 = [
      <Row1Element mode={"mode_7"} />,
      <Row1Element mode={"mode_5"} />,
    ];

    if (question_1_answer === "Auto") {
      col_5 = col_5[0];
      col_modes.push("mode_7");
    } else if (
      question_1_answer ===
      "App based ride hailing cab services including Ola / Uber"
    ) {
      col_5 = col_5[1];
      col_modes.push("mode_5");
    } else {
      const random = Math.floor(Math.random() * 2);
      col_5 = col_5[random];
      col_modes.push(random === 0 ? "mode_7" : "mode_5");
    }

    const row1 = [
      <Row1Element mode={"mode_1"} />,
      <Row1Element mode={"mode_2"} />,
      <Row1Element mode={"mode_4"} />,
      col_4,
      col_5,
    ];
    console.log("col_modes: ", col_modes);
    return row1;
  };

  const Row2Element = ({ icons, mode }) => {
    return (
      <div>
        {icons.map((icon, index) => {
          return (
            <span key={index}>
              {icon}{" "}
              {icons.length > 1 ? (
                <>{index < 1 ? <span> &gt;</span> : null} </>
              ) : null}
            </span>
          );
        })}
        <br />
        {db[mode + ".ivtt"]} min
      </div>
    );
  };

  const getRow3 = () => {
    let col_1 = null;
    if (db[col_modes[0]].trans === 0) {
      col_1 = (
        <Row2Element icons={[getIcon(col_modes[0], true)]} mode={col_modes[0]} />
      );
    } else {
      col_1 = (
        <Row2Element
          icons={[getIcon(col_modes[0], true), getIcon(col_modes[0], true)]}
          mode={col_modes[0]}
        />
      );
    }

    let col_2 = (
      <Row2Element icons={[getIcon(col_modes[1], true)]} mode={col_modes[1]} />
    );
    // console.log("col_modes[2]: ", col_modes[2]);
    let col_3 = (
      <Row2Element icons={[getIcon(col_modes[2], true)]} mode={col_modes[2]} />
    );
    let col_4 = (
      <Row2Element icons={[getIcon(col_modes[3], true)]} mode={col_modes[3]} />
    );
    let col_5 = (
      <Row2Element icons={[getIcon(col_modes[4], true)]} mode={col_modes[4]} />
    );

    const row3 = [col_1, col_2, col_3, col_4, col_5];

    return row3;
  };

  const getRow5 = () => {
    const row5 = [];
    for (let i = 0; i < 5; i++) {
      row5.push(
        <div>
          {db[col_modes[i] + ".waittime"] + db[col_modes[i] + ".walktime"]} min
        </div>
      );
    }

    return row5;
  };

  const getRow7 = () => {
    const row6 = [];
    for (let i = 0; i < 5; i++) {
      row6.push(<div>...upto {db[col_modes[i] + ".tvariab"]} min more</div>);
    }

    return row6;
  };

  const getRow9 = () => {
    const row9 = [];
    for (let i = 0; i < 5; i++) {
      row9.push(<div>Rs. {db[col_modes[i] + ".tcost"]}</div>);
    }

    return row9;
  };

  const Row11Element = ({ icons, text }) => {
    return (
      <div>
        {icons.map((icon, index) => {
          return <span key={index}>{icon} </span>;
        })}
        <br />
        {text}
      </div>
    );
  };

  const getRow11 = () => {
    const getCrowdInfo = (mode) => {
      switch (mode) {
        case 1:
          return "Many seats available";
        case 2:
          return "Some seats available";
        case 3:
          return "All seats occupied; standing space available";
        case 4:
          return "Fully crowded or packed";
        default:
          return "Some seats available";
      }
    };

    const row11 = [];
    for (let i = 0; i < 3; i++) {
      row11.push(
        <Row11Element
          icons={[getIcon(getCrowdInfo(db[col_modes[i] + ".crowd"]), false)]}
          text={getCrowdInfo(db[col_modes[i] + ".crowd"])}
        />
      );
    }

    return row11;
  };

  const getRow13 = () => {
    const getServiceType = (mode) => {
      switch (mode) {
        case 1:
          return "Ordinary";
        case 2:
          return "Express Non-AC";
        case 3:
          return "Express AC";
        default:
          return "Ordinary";
      }
    };

    const row13 = [];
    for (let i = 0; i < 3; i++) {
      row13.push(
        <Row11Element
          icons={[getIcon(getServiceType(db[col_modes[i] + ".serv"]))]}
          text={getServiceType(db[col_modes[i] + ".serv"])}
        />
      );
    }

    return row13;
  };

  const renderRows = () => {
    const rowsArr = [
      <tr key={"row-1"}>{renderCols(false, "", getRow1())}</tr>,
      <tr key={"row-2"}>
        {renderCols(
          true,
          "Total travel time spent while inside the vehicle(s)",
          null
        )}
      </tr>,
      <tr key={"row-3"}>{renderCols(false, "", getRow3())}</tr>,
      <tr key={"row-4"}>
        {renderCols(true, "Total travel time spent outside vehicle(s)", null)}
      </tr>,
      <tr key={"row-5"}>{renderCols(false, "", getRow5())}</tr>,
      <tr key={"row-6"}>
        {renderCols(
          true,
          "Possible delay due to traffic congestion or other uncertainties",
          null
        )}
      </tr>,
      <tr key={"row-7"}>{renderCols(false, "", getRow7())}</tr>,
      <tr key={"row-8"}>
        {renderCols(true, "Total one-way cost of travel", null)}
      </tr>,
      <tr key={"row-9"}>{renderCols(false, "", getRow9())}</tr>,
      <tr key={"row-10"}>
        {renderCols(true, "Extent of crowding in the vehicle", null)}
      </tr>,
      <tr key={"row-11"}>{renderCols(false, "", getRow11())}</tr>,
      <tr key={"row-12"}>{renderCols(true, "Service type", null)}</tr>,
      <tr key={"row-13"}>{renderCols(false, "", getRow13())}</tr>,
    ];
    // const rowsArr = [getRow1()];
    // for (let i = 0; i < rows; i++) {
    //   const merge = cellsToBeMerged.includes(i);
    //   rowsArr.push(
    //     <tr key={i}>
    //       {renderCols(
    //         cellsToBeMerged.includes(i),
    //         merge ? displayMessages[cellsToBeMerged.indexOf(i)] : ""
    //       )}
    //     </tr>
    //   );
    // }
    return rowsArr;
  };

  const renderCols = (mergeCells, displayText, data) => {
    const colsArr = [];
    if (mergeCells) {
      colsArr.push(
        <td
          key={0}
          style={{
            padding: "10px",
            border: "1px solid black",
            backgroundColor: "orange",
            fontWeight: "bolder",
          }}
          colSpan={cols}
        >
          {displayText}
        </td>
      );
    } else {
      for (let i = 0; i < cols; i++) {
        colsArr.push(
          <td
            key={i}
            style={{
              padding: "10px",
              border: "1px solid black",
              margin: "2px",
            }}
          >
            {data[i]}
          </td>
        );
      }
    }
    return colsArr;
  };

  return (
    <div className="mode-choice">
      <h2 style={{ textAlign: "center" }}>Mode Choice</h2>
      <table
        style={{
          borderCollapse: "collapse",
          borderSpacing: "5px",
          margin: "20px",
          padding: "10px",
          border: "1px solid black",
          textAlign: "center",
        }}
      >
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default ModeChoiceTable;
