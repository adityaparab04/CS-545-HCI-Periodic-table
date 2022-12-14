import React, { useEffect } from "react";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
  Legend,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { Grid, Paper } from "@mui/material";
import { AppUserGetDb } from "../Firebase";
const moment = require("moment");
const Progress = () => {
  let d = [];
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    AppUserGetDb().then((data) => {
      for (let i = 0; i < data["scores"].length; i++) {
        d = [
          ...d,
          {
            argument: data["moment"][i],
            value: data["scores"][i],
          },
        ];
      }
      setData(d);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Paper>
        <Grid xs={12} md={12}>
          <Chart data={data}>
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries
              valueField="value"
              argumentField="argument"
              name="Score"
              color="#3f51b5"
            />
            <Title text="Progress" />
            <Legend />
          </Chart>
        </Grid>
      </Paper>
    );
  }
};

export default Progress;
