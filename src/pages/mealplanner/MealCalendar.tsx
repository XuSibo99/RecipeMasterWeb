import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import {
  getMealEventsByUserId,
  MealEventDTO,
  MealEventFormData,
} from "../../services/mealevent/MealEventService";
// import { v6 as uuidv6 } from "uuid";
import "./MealPlanner.css";
import CreatMealDialog from "./CreateMealDialog";
import { UseCreateMealEvent } from "../../services/mealevent/useCreateMealEvent";
import UpdateMealDialog from "./UpdateMealDialog";
import { UseUpdateMealEvent } from "../../services/mealevent/UseUpdateCreateMealEvent";

function MealCalendar() {
  const [mealEvents, setMealEvents] = useState<MealEventDTO[]>([]);
  const { createMeal } = UseCreateMealEvent();
  const { updateMeal } = UseUpdateMealEvent();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealEventDTO | null>(null);

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
    const meal = clickInfo.event.extendedProps as MealEventDTO;
    setSelectedMeal({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      name: meal.name,
      start: clickInfo.event.startStr,
      userId: meal.userId,
    });
    setUpdateDialogOpen(true);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo.startStr);
    setCreateDialogOpen(true);
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
      {createDialogOpen && (
        <CreatMealDialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          onSubmit={handleCreateMeal}
          defaultDate={selectedDate ?? ""}
        />
      )}
      {updateDialogOpen && (
        <UpdateMealDialog
          open={updateDialogOpen}
          onClose={() => setUpdateDialogOpen(false)}
          onSubmit={(id, data) => {
            updateMeal(id, data);
          }}
          defaultValues={selectedMeal}
        />
      )}
    </div>
  );
}

export default MealCalendar;
