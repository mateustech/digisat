import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default class DemoApp extends React.Component {
  render() {
    return (
      <div style={{padding: 20}}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={[
            { title: "event 1", date: "2020-07-01" },
            { title: "event 2", date: "2020-07-02" },
          ]}
        />
      </div>
    );
  }
}
