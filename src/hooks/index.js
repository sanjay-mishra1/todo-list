/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import moment from "moment";
import { collatedTasksExist } from "../helpers";
import database from "../firebase";
import { getPriorityName } from "../util/helper";

export const useTasks = (selectedProject, uid, date = null) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  let todaysDate = moment().format("DD/MM/YYYY");

  //console.log("useTasks triggered", selectedProject, uid, date);
  useEffect(() => {
    let unsubscribe = database.collection("tasks").where("userId", "==", uid);
    //console.log("useTasks useEffect triggered");

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where("date", "==", todaysDate))
        : date
        ? (unsubscribe = unsubscribe.where("date", "==", date))
        : selectedProject === "PREVIOUS"
        ? (unsubscribe = unsubscribe
            .where("date", "<", todaysDate)
            .where("date", "!=", "")
            .where("archived", "==", false)
            .orderBy("date", "desc"))
        : //for next_7
        selectedProject === "NEXT_7"
        ? (unsubscribe = unsubscribe
            .where("date", ">=", todaysDate)
            .where("date", "<=", moment().add(7, "days").format("DD/MM/YYYY")))
        : selectedProject === "INBOX" || selectedProject === 0
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe;

    try {
      unsubscribe = unsubscribe.onSnapshot((snapshot) => {
        const newTasks = snapshot.docs.map((task) => ({
          id: task.id,
          ...task.data(),
          ...createGroupField(task.data()),
        }));

        setData(setTasks, selectedProject, newTasks, setArchivedTasks);
        //console.log("useTasks useEffect unsubscribe triggered");
      });
    } catch (error) {
      console.log(error);
    }

    return () => {
      try {
        unsubscribe();
      } catch (error) {
        console.log(error);
      }
    };
  }, [selectedProject, date]);

  return { tasks, archivedTasks };
};
const createGroupField = (task) => {
  // console.log(task.createdAt,task.completedOn,task.date)
  return {
    createdDateCustom: moment(task.createdAt).format("DD MMM YYYY"),
    completedOnCustom: task.completedOn
      ? moment(task.completedOn).format("DD MMM YYYY HH:[00]")
      : "",
    dateCustom: moment(task.date, "DD/MM/YYYY").format("DD MMM YYYY"),
    priorityCustom: task.priority
      ? getPriorityName(task.priority)
      : "No Priority",
  };
};
export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  return { projects, setProjects };
};
export const useTodaysCompletedData = (uid, selectedProject) => {
  const [completedTask, setcompletedTask] = useState([]);
  useEffect(() => {
    //console.log("useTasks useEffect triggered");
    let unsubscribe2 = database.collection("tasks").where("userId", "==", uid);
    try {
      //add listener for task not have todays date but completed today
      if (selectedProject === "TODAY") {
        unsubscribe2 = unsubscribe2
          .where("archived", "==", true)
          .where(
            "completedOn",
            ">=",
            parseInt(moment().startOf("day").format("x"))
          );

        unsubscribe2 = unsubscribe2.onSnapshot((snapshot) => {
          // console.log(snapshot.docs);
          const newTasks = snapshot.docs.map((task) => ({
            id: task.id,
            ...task.data(),
            ...createGroupField(task.data()),
          }));
          setcompletedTask(newTasks);
        });
      } else setcompletedTask([]);
      //console.log("useTasks useEffect unsubscribe triggered");
    } catch (error) {
      console.log(error);
    }
    return () => {
      try {
        unsubscribe2();
      } catch (error) {
        // console.log(error);
      }
    };
  }, [selectedProject]);

  return { completedTask };
};
const setData = (setTasks, selectedProject, newTasks, setArchivedTasks) => {
  setTasks(
    selectedProject === "NEXT_7"
      ? newTasks.filter(
          (task) =>
            moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
            task.archived !== true
        )
      : newTasks.filter((task) => task.archived !== true)
  );
  if (setArchivedTasks)
    setArchivedTasks(newTasks.filter((task) => task.archived !== false));
};
