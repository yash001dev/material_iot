import {
  AppBar,
  Box,
  Breadcrumbs,
  Container,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { DataTable } from "../components";
import { deviceTypes, iotTheme, mainStyle } from "../utils";
import { TablePanelSchema } from "../utils/schema";

function TabPanel({ children, value, index }: TablePanelSchema) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

function Main() {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event: ChangeEvent<{}>, value: number) => {
    setActiveTab(value);
  };

  return (
    <ThemeProvider theme={iotTheme}>
      <Container style={mainStyle}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="primary" variant="h5" gutterBottom component="div">
            Devices
          </Typography>
        </Breadcrumbs>
        <AppBar position="static" color="default">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="lock list" value={0} />
            <Tab label="other iot devices" value={1} />
            <Tab label="special integration" value={2} />
          </Tabs>
        </AppBar>
        {deviceTypes?.length &&
          deviceTypes?.map((type, index) => (
            <TabPanel
              value={activeTab}
              index={index}
              // eslint-disable-next-line react/no-array-index-key
              key={`tab-panel-${index}`}
            >
              <DataTable type={type} />
            </TabPanel>
          ))}
      </Container>
    </ThemeProvider>
  );
}
export default Main;
