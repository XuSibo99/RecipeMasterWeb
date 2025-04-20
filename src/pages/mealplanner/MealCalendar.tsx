import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import {
  getMealEventsByUserId,
  MealEventDTO,
  MealEventFormData,
} from "../../services/mealevent/MealEventService";
import "./MealPlanner.css";
import CreateMealDialog from "./CreateMealDialog";
import { useCreateMealEvent } from "../../services/mealevent/useCreateMealEvent";
import UpdateMealDialog from "./UpdateMealDialog";
import { useUpdateMealEvent } from "../../services/mealevent/useUpdateCreateMealEvent";

function MealCalendar() {
  const [mealEvents, setMealEvents] = useState<MealEventDTO[]>([]);
  const { createMeal } = useCreateMealEvent();
  const { updateMeal } = useUpdateMealEvent();
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
    return mealEvents.map((event) => {
      const baseEvent: Record<string, unknown> = {
        id: event.id,
        title: event.title,
        name: event.name,
        recurrence: event.recurrence,
        userId: event.userId,
      };

      if (event.recurrence) {
        baseEvent.rrule = {
          freq: event.recurrence,
          dtstart: event.start,
        };
      } else {
        baseEvent.start = event.start;
      }

      return baseEvent;
    });
  }, [mealEvents]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const meal = clickInfo.event.extendedProps as MealEventDTO;
    setSelectedMeal({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      name: meal.name,
      start: clickInfo.event.startStr,
      userId: meal.userId,
      recurrence: meal.recurrence,
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
        plugins={[dayGridPlugin, interactionPlugin, rrulePlugin]}
        initialView="dayGridMonth"
        selectable={true}
        selectMirror={true}
        events={events}
        eventClick={handleEventClick}
        select={handleDateSelect}
      />
      {createDialogOpen && (
        <CreateMealDialog
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
