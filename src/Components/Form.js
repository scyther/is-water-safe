/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";
import firebaseConfig from "../firebaseConfig";
const Form = () => {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [tds, setTds] = useState(0)

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
    }
  };
  return (
    <>
      <label htmlFor="state">State</label>
      <select
        name="states"
        id="state"
        onChange={(event) => setState(event.target.value)}
      >
        <option value="">Select State/UT</option>
        {states.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>

      <label htmlFor="district">Districts</label>
      <select
        name="districts"
        id="district"
        onChange={(event) => setDistrict(event.target.value)}
      >
        <option value="">Select District</option>
        {districts.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
      <input
        type="submit"
        value="Submit"
        onClick={(e) => {
          e.preventDefault();
          getResult();
        }}
      />
    </>
  );
};

export default Form;
