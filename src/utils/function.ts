import parser from "cron-parser";
import { DevicesSchema } from "./../utils";

export const isCronSheduled = (cron: string) => {
  let convertedCron = parser.parseExpression(cron);
  let scheduledTime = JSON.parse(JSON.stringify(convertedCron.fields));
  let currentDate = new Date();
  if (
    scheduledTime.month.includes(currentDate.getMonth()) &&
    scheduledTime.dayOfMonth.includes(currentDate.getDate()) &&
    scheduledTime.dayOfWeek.includes(currentDate.getDay())
  )
    return true;
  return false;
};

export const ActionDataHandler = (list: DevicesSchema) => {
  let disabled = false;
  let visiblity = true;
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
      visiblity = false;
    }
  } else if (list?.schedule) {
    let cronStatus = isCronSheduled(list.schedule);
    if (!cronStatus) disabled = true;
  }
  return {
    disabled,
    visiblity,
    text,
    isDimmer,
  };
};
