import "./App.css";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import AuthHome from "./auth/authHome";
import Home from "./pages/home";
import { createStore } from "redux";
import { userReducer } from "./store/reducer";
import { Provider } from "react-redux";
import store from "./store/store";

document.title = `TodoList`;
var uid = "";
var userName = "";
var userImage = "";
var userEmail = "";
try {
  uid = localStorage.getItem("uid");
  userName = localStorage.getItem("userName");
  userImage = localStorage.getItem("userImage");
  userEmail = localStorage.getItem("userEmail");
} catch (error) {
  //console.log(error);
}
export { uid };
export { userName };
export { userImage };
export { userEmail };

function App({ darkModeDefault = false }) {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#643fdb",
      },
      primary: {
        main: "#774cff",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route
              path="/"
              element={<Home darkModeDefault={darkModeDefault} />}
            />
            <Route path="/auth" element={<AuthHome />} />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
