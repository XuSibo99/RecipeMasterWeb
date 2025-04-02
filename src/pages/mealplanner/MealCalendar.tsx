import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import {
  getMealEventsByUserId,
  MealEventDTO,
} from "../../services/mealevent/MealEventService";
import { v6 as uuidv6 } from "uuid";

function MealCalendar() {
  const [mealEvents, setMealEvents] = useState<MealEventDTO[]>([]);

  useEffect(() => {
    const fetchMealEvents = async () => {
      try {
        const data = await getMealEventsByUserId("sibo.xu");
        setMealEvents(data);
      } catch (error) {
        console.error("Error fetching MealEvents", error);
      }
    };

    fetchMealEvents();
  }, []);

  const events = useMemo(() => {
    return mealEvents.map((event) => ({
      id: event.id,
      title: event.title,
      name: event.name,
      start: event.start,
      userId: event.userId,
    }));
  }, [mealEvents]);

  console.log("events", events);
  const handleEventClick = (clickInfo: EventClickArg) => {
    const eventTitle = clickInfo.event.title;
    alert(`Clicked on event: ${eventTitle}`);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    const mealTitle = prompt("Enter a meal title (ex: Breakfast, Pasta...)");
    if (mealTitle) {
      setMealEvents((prev) => [
        ...prev,
        {
          id: uuidv6(),
          title: "Uer insert meal",
          start: selectInfo.startStr,
          name: mealTitle,
          userId: "sibo.xu",
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
      />
    </div>
  );
}

export default MealCalendar;
