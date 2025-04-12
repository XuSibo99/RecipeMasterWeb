import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import {
  getMealEventsByUserId,
  MealEventDTO,
} from "../../services/mealevent/MealEventService";
// import { v6 as uuidv6 } from "uuid";
import "./MealPlanner.css";
import CreatMealDialog, { MealEventFormData } from "./CreateMealDialog";
import { UseCreateMealEvent } from "../../services/mealevent/useCreateMealEvent";

function MealCalendar() {
  const [mealEvents, setMealEvents] = useState<MealEventDTO[]>([]);
  const { createMeal } = UseCreateMealEvent();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleEventClick = (clickInfo: EventClickArg) => {
    const eventTitle = clickInfo.event.title;
    alert(`Clicked on event: ${eventTitle}`);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo.startStr);
    setDialogOpen(true);
  };

  const handleCreateMeal = (data: MealEventFormData) => {
    createMeal(data);
  };

  return (
    <div className="meal-calendar">
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
      <CreatMealDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreateMeal}
        defaultDate={selectedDate ?? ""}
      />
    </div>
  );
}

export default MealCalendar;
