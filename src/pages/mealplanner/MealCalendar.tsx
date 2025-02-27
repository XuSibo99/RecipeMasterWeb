import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
// import "@fullcalendar/common/main.css";
// import "@fullcalendar/daygrid/main.css";

interface MealEvent {
  id: string;
  title: string;
  start: string;
}

function MealCalendar() {
  const [events, setEvents] = useState<MealEvent[]>([
    {
      id: "1",
      title: "Breakfast: Omelette",
      start: "2025-01-05",
    },
    {
      id: "2",
      title: "Lunch: Caesar Salad",
      start: "2025-01-05T12:00:00",
    },
    {
      id: "3",
      title: "Dinner: Spaghetti",
      start: "2025-01-05T18:00:00",
    },
  ]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const eventTitle = clickInfo.event.title;
    alert(`Clicked on event: ${eventTitle}`);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    const mealTitle = prompt("Enter a meal title (ex: Breakfast, Pasta...)");
    if (mealTitle) {
      setEvents((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          title: mealTitle,
          start: selectInfo.startStr,
        },
      ]);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1>Meal Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        selectMirror={true}
        events={events}
        eventClick={handleEventClick}
        select={handleDateSelect}
        // If you want to control date navigation or initialDate:
        // initialDate="2025-01-01"
        // headerToolbar={{
        //   left: 'prev,next today',
        //   center: 'title',
        //   right: 'dayGridMonth,dayGridWeek'
        // }}
      />
    </div>
  );
}

export default MealCalendar;
