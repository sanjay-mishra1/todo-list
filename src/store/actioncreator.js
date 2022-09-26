import moment from "moment/moment";
import database from "../firebase";
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  PROJECT_LIST,
  UPDATE_PROJECT,
} from "./actiontypes";
export const getProjectList = () => (dispatch) => {
  //console.log("inside project action");
  database
    .collection("projects")
    .where("userId", "==", localStorage.getItem("userEmail"))
    .orderBy("projectId")
    .get()
    .then((snapshot) => {
      const allProjects = snapshot.docs.map((project) => ({
        ...project.data(),
        docId: project.id,
      }));
      dispatch({
        type: PROJECT_LIST,
        payload: {
          projectList: allProjects,
        },
      });
      //console.log("useProjects triggered useEffect");
    });
};
export const addProject = (field, successFunction) => (dispatch) => {
  //console.log(
  //   "Project data to store ",
  //   field,

  //   successFunction
  // );
  database
    .collection("projects")
    .add({ ...field, createdAt: moment().valueOf() })
    .then((docRef) => {
      //  setProjects([...projects]);
      dispatch({
        type: ADD_PROJECT,
        payload: { docId: docRef.id, ...field },
      });
      successFunction();
    });
};
export const deleteProject = (docId, successFunction) => (dispatch) => {
  database
    .collection("projects")
    .doc(docId)
    .delete()
    .then(() => {
      //console.log("Deleted project successfully " + docId);
      dispatch({
        type: DELETE_PROJECT,
        payload: docId,
      });
      successFunction();
    })
    .catch((error) => {
      //console.log("Deleted project failed " + error);
    });
};
export const updateProjectDetails = (field, successFunction) => (dispatch) => {
  let docId = field.docId;
  delete field["docId"];
  database
    .collection("projects")
    .doc(docId)
    .update(field)
    .then(() => {
      console.log("updated project successfully " + docId);
      dispatch({
        type: UPDATE_PROJECT,
        payload: { ...field, docId: docId },
      });
      successFunction();
    })
    .catch((error) => {
      //console.log("Deleted project failed " + error);
    });
};
