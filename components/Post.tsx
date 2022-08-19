import { google } from "calendar-link";
import React from "react";
import { CalendarIcon } from "@heroicons/react/outline";

const Post = ({ title, state, scheduledStart, id, topic }: any) => {
  const renderAddToCalendar = () => {
    const event: any = {
      title,
      start: scheduledStart,
      description: `Join here : https://twitter.com/i/spaces/${id}`,
      duration: [1, "hour"],
    };
    return (
      <>
        <div className="flex flex-row items-center justify-center space-x-2 py-1 w-1/4 border-2 border-gray-800 rounded">
          <CalendarIcon className="h-8 w-8" />
          <a target="_blank" href={google(event)} rel="noreferrer noopener">
            Add to calendar
          </a>
        </div>
      </>
    );
  };

  return (
    <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
      <div className="bg-white">
        <div className="p-4">
          <h3 className="w-full font-bold tracking-tight pb-4"> {title} </h3>

          <p className="capitalize pb-4 ">
            {state === "scheduled"
              ? `${state} at ${new Date(scheduledStart).toLocaleDateString()}`
              : state}
          </p>
          {state !== "scheduled" ? (
            <a
              href={`https://twitter.com/i/spaces/${id}`}
              target="_blank"
              rel="noreferrer noopener"
              className="px-6 py-1.5 border-2 border-gray-800 rounded"
            >
              Join space
            </a>
          ) : (
            renderAddToCalendar()
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
