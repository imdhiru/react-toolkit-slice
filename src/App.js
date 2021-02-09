import React from "react";
import "./styles.css";
import { Provider, useSelector, useDispatch } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "test",
  initialState: {
    person: {
      name: "john",
      job: {
        sg: "Slicer"
      }
    }
  },
  reducers: {
    saveTestState(state, action) {
      return action.payload;
    }
  }
});

const { saveTestState } = slice.actions;

const store = configureStore({ reducer: slice.reducer });

const TestComp = () => {
  const storeState = useSelector(state => state);
  return <div>{JSON.stringify(storeState)}</div>;
};

const ToggleJob = () => {
  const dispatch = useDispatch();
  const StoreState = useSelector(state => state);

  let sg = StoreState.person.job.sg;
  sg = sg === "Slicer" ? "Janitor" : "Slicer";
  return (
    <button
      onClick={() => {
        console.log("click");
        dispatch(
          saveTestState({
            person: {
              name: "john",
              job: {
                sg: sg
              }
            }
          })
        );
      }}
    >
      toggle job
    </button>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <TestComp />
        <ToggleJob />
      </div>
    </Provider>
  );
}
