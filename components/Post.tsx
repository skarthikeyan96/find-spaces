import { google } from "calendar-link";
import React from "react";
import { BookmarkIcon, CalendarIcon } from "@heroicons/react/outline";
import JoinSpaceButton from "./JoinSpaceButton";
import BookMarkButton from "./BookMarkButton";
import AddToCalendar from "./AddToCalendar";

const Post = ({ title, state, scheduledStart, id, topic, hosts }: any) => {
  const renderButtons = () => {
    if (state === "live") {
      return <JoinSpaceButton />;
    }
    return (
      <AddToCalendar title={title} scheduledStart={scheduledStart} id={id} />
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
                console.log(host);
                return (
                  <div
                    key={hostIdx}
                    className="text-sm inline-flex items-center font-normal leading-sm tracking-wide border-2 border-gray-800  rounded py-1 px-4 bg-white text-gray-800  space-x-2"
                  >
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

          <div className="flex space-x-4">
            {renderButtons()}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
