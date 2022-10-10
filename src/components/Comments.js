import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import { red } from "@mui/material/colors";
import moment from "moment";
import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import database from "../firebase";
import { collatedTasksExist } from "../helpers";
import { formatText } from "../util/helper";

export default function Comments({ id, user }) {
  const [isLoading, setIsLoading] = useState(true);
  const [allComments, setAllComments] = useState([]);
  const [commentInternalLoader, setCommentInternalLoader] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [notShowView, setNotShowView] = useState(false);
  React.useEffect(() => {
    setIsLoading(true);
    setAllComments([]);
    setNotShowView(collatedTasksExist(id));
    database
      .collection("comments")
      .where("id", "==", id)
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        const newTasks = snapshot.docs.map((task) => ({
          id: task.id,
          ...task.data(),
        }));
        setAllComments(newTasks);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        setIsLoading(false);
      });
  }, [id]);
  const handleChange = (event) => {
    setNewComment(event.target.value);
  };
  const sendComment = () => {
    try {
      if (newComment) {
        let data = {
          comment: newComment.trim(),
          createdAt: moment.now(),
          id: id,
          uid: user,
        };
        setCommentInternalLoader(true);
        database
          .collection("comments")
          .add(data)
          .then((docRef) => {
            let temp = allComments;
            temp.unshift({ id: docRef.id, ...data });
            setAllComments(temp);
            setCommentInternalLoader(false);
            setNewComment("");
          });
      }
    } catch (error) {
      setCommentInternalLoader(false);
    }
  };
  return (
    <>
      {!notShowView && (
        <>
          <Paper style={{ width: "100%", padding: 9, borderRadius: 11 }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <TextField
                    placeholder="Add comment"
                    value={newComment}
                    fullWidth
                    multiline
                    onChange={handleChange}
                  />
                  <Button
                    style={{ marginLeft: "1em" }}
                    variant="contained"
                    disabled={commentInternalLoader}
                    onClick={sendComment}
                    endIcon={<MdSend />}
                  >
                    {commentInternalLoader ? (
                      <>
                        Adding <CircularProgress size="20" />
                      </>
                    ) : (
                      "Add"
                    )}
                  </Button>
                </div>
                <br />
                <div className="comment-list">
                  {allComments.map((item, index) => (
                    <Card
                      variant="outlined"
                      key={index}
                      style={{ marginTop: "-4px" }}
                    >
                      <CardHeader
                        style={{ padding: 6, alignItems: "flex-start" }}
                        avatar={
                          <Tooltip title={item.uid}>
                            <Avatar
                              sx={{ bgcolor: red[500] }}
                              aria-label="user"
                            >
                              {item.uid.substring(0, 1).toUpperCase()}
                            </Avatar>
                          </Tooltip>
                        }
                        titleTypographyProps={{
                          fontSize: 15,
                        }}
                        subheaderTypographyProps={{
                          fontSize: 12,
                        }}
                        title={formatText(item.comment)}
                        subheader={moment(item.createdAt).format(
                          "DD MMM HH:mm"
                        )}
                      />
                    </Card>
                  ))}
                </div>
              </>
            )}
          </Paper>
          <br />
          <br />
          <br />
        </>
      )}
    </>
  );
}
