/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import moment from "moment";
import { collatedTasksExist } from "../helpers";
import database from "../firebase";

export const useTasks = (selectedProject, uid, date = null) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  //console.log("useTasks triggered", selectedProject, uid, date);
  useEffect(() => {
    let unsubscribe = database.collection("tasks").where("userId", "==", uid);
    //console.log("useTasks useEffect triggered");

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            moment().format("DD/MM/YYYY")
          ))
        : date
        ? (unsubscribe = unsubscribe.where("date", "==", date))
        : selectedProject === "INBOX" || selectedProject === 0
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe;

    try {
      unsubscribe = unsubscribe.onSnapshot((snapshot) => {
        const newTasks = snapshot.docs.map((task) => ({
          id: task.id,
          ...task.data(),
        }));

        setTasks(
          selectedProject === "NEXT_7"
            ? newTasks.filter(
                (task) =>
                  moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                  task.archived !== true
              )
            : newTasks.filter((task) => task.archived !== true)
        );
        setArchivedTasks(newTasks.filter((task) => task.archived !== false));
        //console.log("useTasks useEffect unsubscribe triggered");
      });
    } catch (error) {
      //console.log(error);
    }

    return () => unsubscribe();
  }, [selectedProject, date]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  // //console.log('useProjects triggered');
  // database
  //   .collection('projects')
  //   .where('userId', '==', localStorage.getItem('userEmail'))
  //   .orderBy('projectId')
  //   .get()
  //   .then((snapshot) => {
  //     const allProjects = snapshot.docs.map((project) => ({
  //       ...project.data(),
  //       docId: project.id,
  //     }));
  //     if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
  //       setProjects(allProjects);
  //     }
  //     //console.log('useProjects triggered useEffect');
  //   });
  // useEffect(() => {
  //   // database
  //   //   .collection('projects')
  //   //   .where('userId', '==', localStorage.getItem('userEmail'))
  //   //   .orderBy('projectId')
  //   //   .get()
  //   //   .then((snapshot) => {
  //   //     const allProjects = snapshot.docs.map((project) => ({
  //   //       ...project.data(),
  //   //       docId: project.id,
  //   //     }));
  //   //     if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
  //   //       setProjects(allProjects);
  //   //     }
  //   //     //console.log('useProjects triggered useEffect');
  //   //   });
  // }, [
  //   projects
  // ]);

  return { projects, setProjects };
};
