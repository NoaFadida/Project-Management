import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MeetingProvider } from './context/meetingContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode><MeetingProvider><App/></MeetingProvider></React.StrictMode>);