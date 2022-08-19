import { google } from "calendar-link";
import React from "react";
import { CalendarIcon } from "@heroicons/react/outline";

const Post = ({ title, state, scheduledStart, id, topic, hosts }: any) => {
  const renderAddToCalendar = () => {
    const event: any = {
      title,
      start: scheduledStart,
      description: `Join here : https://twitter.com/i/spaces/${id}`,
      duration: [1, "hour"],
    };
    return (
      <>
        <div className="flex flex-row items-center justify-center space-x-2 py-1 w-1/4 border-2 border-gray-800 rounded bg-gray-800 text-white">
          <CalendarIcon className="w-6 text-white" />
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

          <div className="pt-4 pb-8">
            <p className="font-bold pb-2"> Hosts </p>
            <div className="flex flex-row space-x-8">
              {hosts.map((host: any, hostIdx: number) => {
                console.log(host)
                return (
                  <div key={hostIdx} className="text-sm inline-flex items-center font-normal leading-sm tracking-wide border-2 border-gray-800  rounded py-1 px-4 bg-white text-gray-800  space-x-2">
                    <a
                      href={`https://twitter.com/${host.username}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      @{host.username}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {state !== "scheduled" ? (
            <a
              href={`https://twitter.com/i/spaces/${id}`}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-gray-800 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
