import { Provider } from "react-redux";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import TimeSetting from "./components/TimeSetting";
import WinnerResult from "./components/WinnerResult";
import CandidateList from "./components/CandidateList";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Typography variant="h3" p={4}>
        抽獎倒數計時器
      </Typography>
      <Grid container p={4}>
        <Grid item xs={6}>
          <TimeSetting />
          <WinnerResult />
        </Grid>
        <Grid item xs={6} pl={4}>
          <CandidateList />
        </Grid>
      </Grid>
    </Provider>
  );
}

export default App;
