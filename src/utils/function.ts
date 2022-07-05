import parser from "cron-parser";
import { DevicesSchema } from "./schema";

export const isCronScheduled = (cron: string) => {
  const convertedCron = parser.parseExpression(cron);
  const scheduledTime = JSON.parse(JSON.stringify(convertedCron.fields));
  const currentDate = new Date();
  return (
    scheduledTime.month.includes(currentDate.getMonth()) &&
    scheduledTime.dayOfMonth.includes(currentDate.getDate()) &&
    scheduledTime.dayOfWeek.includes(currentDate.getDay())
  );
};

export const ActionDataHandler = (list: DevicesSchema) => {
  let disabled = false;
  let visibility = true;
  let text = "Active";
  let isDimmer = false;

  if (
    list?.capabilities?.length &&
    list.capabilities.includes("Bluetooth") &&
    list.status !== "active"
  )
    disabled = true;
  else if (list?.state) {
    text = "On";
    if (list.type === "Dimmer Switch") isDimmer = true;
    else if (list.type === "Water Meter") {
      disabled = true;
      visibility = false;
    }
  } else if (list?.schedule) {
    const cronStatus = isCronScheduled(list.schedule);
    if (!cronStatus) disabled = true;
  }
  return {
    disabled,
    visibility,
    text,
    isDimmer,
  };
};
