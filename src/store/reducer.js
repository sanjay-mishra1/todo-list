import { deleteArrayElement } from "../util/helper";
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  PROJECT_LIST,
  UPDATE_PROJECT,
} from "./actiontypes";

let defaultUserState = {
  projectList: null,
};

export const taskReducer = (state = defaultUserState, action) => {
  if (action.type === PROJECT_LIST) {
    let payload = action.payload;
    state = { ...state, ...payload };
    return state;
  } else if (action.type === ADD_PROJECT) {
    let payload = action.payload;
    //console.log(state);
    let temp = state.projectList;
    if (!temp) {
      //console.log("state.projectList Array is null", temp);
      temp = [];
    }
    temp.push(payload);
    //console.log("temp", temp, state.projectList);

    state = { ...state, projectList: [...temp] };
    return state;
  } else if (action.type === DELETE_PROJECT) {
    let payload = action.payload;
    //console.log(state);
    let temp = state.projectList;
    if (!temp) {
      //console.log("state.projectList Array is null", temp);
      temp = [];
    }
    let index = temp.findIndex((item) => item.docId === payload);
    if (index !== -1) {
      let temp2 = deleteArrayElement(temp, index);
      state = { ...state, projectList: [...temp2] };
    }
    //console.log("temp", temp, state.projectList);

    return state;
  } else if (action.type === UPDATE_PROJECT) {
    let payload = action.payload;
    console.log(state);
    let temp = state.projectList;
    let index = temp.findIndex((item) => item.docId === payload.docId);
    if (index !== -1) {
      temp[index].name = payload.name;
      temp[index].color = payload.color;
      state = { ...state, projectList: [...temp] };
    }
    console.log("updated project", temp, state);
    return state;
  }
  return state;
};
