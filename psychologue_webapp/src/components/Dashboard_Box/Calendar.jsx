import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AppointmentsAPI from '../../services/AppointmentsAPI';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';


export function Calendar() {

  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    let eventsTemp = await AppointmentsAPI.getAppointments();
    setEvents(eventsTemp.map((event, index) => ({
      title: index,
      start: event.Creneaux,
    })));
  }
  useEffect(() => {
    fetchEvents();
  }, [])
  useEffect(() => {
    console.log(events)
  }, [events])

  // Define custom button and headerToolbar configuration here.
  const headerToolbar = {
    left: 'prev,next myCustomButton',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek',
  };
  
  const customButtons = {
    myCustomButton: {
      text: "+ Rendez-vous",
      click: function() {
        alert('clicked the custom button!');
      },
    },
  };

  const views = {
    timeGridWeek: {
        buttonText: 'Semaine',
    },
    dayGridMonth: {
        buttonText: 'Mois'
    }
  }

  // Event content renderer function.
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  return (
    <Box as='div'>
      <FullCalendar
        editable
        eventDragStop={(data) => console.log(data.event._instance.range)}
        allDaySlot={false}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        slotMinTime={"08:00:00"}
        slotMaxTime={"20:00:00"}
        slotDuration={"00:30:00"}
        initialView='timeGridWeek'
        eventDurationEditable={false}
        weekends={false}
        locale={'fr'}
        events={events}
        aspectRatio={2}
        eventContent={renderEventContent}
        views={views}
        customButtons={customButtons} // Apply custom buttons here.
        headerToolbar={headerToolbar} // Apply header toolbar configuration here.
        
      />
    </Box>
  );
}