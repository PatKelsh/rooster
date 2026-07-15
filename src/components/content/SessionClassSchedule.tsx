"use client";

import { useEffect, useState } from "react";
import { ClassDetailProps } from "@/lib/props";

interface SessionClassScheduleViewProps {
  classDetails: ClassDetailProps[];
}

const SessionClassScheduleView = ({
  classDetails
}: SessionClassScheduleViewProps) => {
    const consolidatedSchedule = classDetails.flatMap(detail =>
      detail.classInstances.map(instance => ({
        id: detail.id,
        className: detail.class.name,
        daysOfTheWeek: instance.daysOfTheWeek,
        startTime: instance.startTime,
        endTime: instance.endTime,
      }))
    );

  const daysOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const sortedByTime = consolidatedSchedule.reduce((acc, schedule) => {
    schedule.daysOfTheWeek.forEach(day => {
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(schedule);
    });
    return acc;
  }, {} as Record<string, typeof consolidatedSchedule >);
  
    const groupedAndOrderedByDay = Object.entries(sortedByTime).reduce((acc, [day, schedules]) => {
      acc[day] = schedules;
      return acc;
    }, {} as Record<string, typeof consolidatedSchedule>);

    const orderedByDay = Object.fromEntries(
      daysOrder.filter(day => day in groupedAndOrderedByDay).map(day => [day, groupedAndOrderedByDay[day]])
    );

  return (
    <div>
      {Object.entries(orderedByDay).map(([day, schedules]) => (
        <div key={day} className="schedule-day-group">
          <h3>{day}</h3>
          {schedules.map((schedule, idx) => (
            <div key={idx} className="schedule-item">
              {schedule.startTime} - {schedule.endTime}: <strong>{schedule.className}</strong>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default SessionClassScheduleView;