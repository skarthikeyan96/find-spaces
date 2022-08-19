import { CalendarIcon } from "@heroicons/react/outline";
import { google } from "calendar-link";

const AddToCalendar = ({
  title,
  scheduledStart,
  id,
}: any) => {
  const event: any = {
    title,
    start: scheduledStart,
    description: `Join here : https://twitter.com/i/spaces/${id}`,
    duration: [1, "hour"],
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center space-x-2 py-1 w-1/4 border-2 border-gray-800 rounded bg-gray-800 text-white">
        <CalendarIcon className="w-5 text-white" />
        <a target="_blank" href={google(event)} rel="noreferrer noopener">
          Add to calendar
        </a>
      </div>
    </>
  );
};

export default AddToCalendar;
