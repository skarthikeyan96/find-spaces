import React from "react";
import JoinSpaceButton from "./JoinSpaceButton";
import AddToCalendar from "./AddToCalendar";
import moment from "moment";

const Post = ({ title, state, scheduledStart, id, topic, hosts }: any) => {
  const start = moment(scheduledStart).endOf("day").fromNow();

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

          <div className="capitalize pb-4 flex flex-row items-center  space-x-1">
            <div
              className={
                state === "scheduled"
                  ? "w-2 h-2 bg-gray-500 rounded-full"
                  : "w-2 h-2 bg-red-500 rounded-full"
              }
            ></div>
            <p> {state === "scheduled" ? `${start}` : state} </p>
          </div>

          <div className="pt-4 pb-8">
            <p className="font-bold pb-2"> Hosts </p>
            <div className="flex flex-row space-x-8">
              {hosts &&
                hosts.map((host: any, hostIdx: number) => {
                  if (host) {
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
                  }
                })}
            </div>
          </div>

          <div className="flex space-x-4">{renderButtons()}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
