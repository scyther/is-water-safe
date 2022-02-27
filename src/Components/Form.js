/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import Dialog from "./Dialog";
import { get, getDatabase, ref } from "firebase/database";
import firebaseConfig from "../firebaseConfig";

import { getPurifier, getQuality } from "../utils";
const Form = () => {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [tds, setTds] = useState(0);
  const [dialog, setDialog] = useState(false);
  const getStates = () => {
    const stateRef = ref(db, "state");
    get(stateRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let states = Object.keys(snapshot.val());
          console.log(states);
          setStates(states);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDistricts = (selectedState) => {
    if (selectedState !== "") {
      const districtRef = ref(db, "/state/" + selectedState);
      get(districtRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            let districts = Object.keys(snapshot.val());
            console.log(districts);
            setDistricts(districts);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    getStates();
  }, []);

  useEffect(() => {
    getDistricts(state);
  }, [state]);

  const getResult = () => {
    if (district !== "") {
      const districtRef = ref(db, "/state/" + state + "/" + district);
      get(districtRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setTds(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("here");
    }
  };
  return (
    <main className="main">
      {tds ? (
        <h1>
          TDS value is <span style={{ color: "Highlight" }}>{tds}</span> which
          is <span style={{ color: "tomato" }}>{getQuality(tds)}</span> and you
          should use{" "}
          <span style={{ color: "yellowgreen" }}>{getPurifier(tds)}</span>
        </h1>
      ) : (
        <h1>Lets check water of your area is really a drinking water.</h1>
      )}

      <div className="main-container">
        <div className="form-container">
          <div className="state-container">
            <label htmlFor="state">Enter Your State : </label>
            <div>
              <select
                name="states"
                id="state"
                onChange={(event) => setState(event.target.value)}
              >
                <option value="">Select State</option>
                {states.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <span className="form-arrow"></span>
            </div>
          </div>
          <div className="district-container">
            <label for="district">Enter Your Area : </label>
            <div>
              <select
                name="districts"
                id="district"
                onChange={(event) => setDistrict(event.target.value)}
              >
                <option value="">Select Area</option>
                {districts.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <span className="form-arrow"></span>
            </div>
          </div>

          <input
            className="submit-btn"
            type="submit"
            value="Submit"
            onClick={(e) => {
              e.preventDefault();
              getResult();
            }}
          />
        </div>
      </div>
      <button
        onClick={() => {
          setDialog(true);
        }}
        style={{ backgroundColor: "InfoBackground", border: "none" }}
      >
        Wanna submit a new reading?
      </button>

      {dialog && <Dialog setDialog={setDialog} />}
    </main>
  );
};

export default Form;
