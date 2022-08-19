import type { GetServerSideProps, NextPage } from "next";

import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { useState } from "react";
import Post from "../components/Post";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import { Listbox } from "@headlessui/react";
import Loader from "../components/Loader";


const baseUrl =
  process.env.ENVIRONMENT === "development"
    ? process.env.DEV_BASE_URL
    : process.env.PROD_DOMAIN;

const Home: NextPage = (props: any) => {
  const [topic, setTopic] = useState("tech");

  const [spaces, setSpaces] = useState(props.spaces || []);
  const [loading, setLoading] = useState(false);


  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/search?search=${topic}`
      );
      const spacesApiResponse = await response.json();

      
      setSpaces(spacesApiResponse.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setSpaces([])
      setLoading(false);
    }
  };

  const getLiveSpaces = (spaces:any) => {
    return spaces.filter((space:any) => space.state === "live")
  }

  const getScheduledSpaces = (spaces:any) => {
    return spaces.filter((space:any) => space.state === "scheduled")
  }


  const renderSpaces = () => {
    console.log(spaces)



    const isSpacesEmpty = spaces.length === 0;
    const isLiveSpacesEmpty = getLiveSpaces(spaces).length === 0

    const isScheduledSpacesEmpty = getScheduledSpaces(spaces).length === 0


    const emptyStatusText = !isSpacesEmpty && isLiveSpacesEmpty ? "Live" : "Scheduled";

    if(isSpacesEmpty){
      // render empty
      return(
        <>
        <p className="text-center"> {`Spaces not found for ${topic}`} </p>
        </>
      )
    }


    // TODO : Need to handle the empty values for live and scheduled

    
    return spaces.map((space: any, index: number) => {
      if (space.state === selected.toLowerCase()) {
        return (
          <div key={index} className="pb-8">
            <Post
              title={space.title}
              state={space.state}
              scheduledStart={space?.scheduled_start}
              id={space.id}
            ></Post>
          </div>
        );
      }
    });
  };

  const status = ["Live", "Scheduled"];

  const [selected, setSelected] = useState(status[0]);

  return (
    <Layout>
      <div>
        <Heading />
      </div>
      <div className="w-full flex items-center justify-center">
        <input
          type="text"
          onChange={(event) => setTopic(event?.target.value)}
          className="
          block
          w-full
          rounded-md
          border-gray-300
          shadow-sm
          focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
         "
          placeholder="search spaces"
        />
        <button
          className="px-6 py-1.5 border-2 border-gray-800 rounded ml-4"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="pt-4">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 w-150px overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {status.map((status, statusIdx) => (
                  <Listbox.Option
                    key={statusIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={status}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {status}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      {
        loading ? <Loader/> : <div className="pt-8 w-full">{renderSpaces()}</div>
      }
      
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(`http://localhost:3000/api/search`);
  const spaces = await response.json();

  console.log(spaces)
  return {
    props: {
      spaces: spaces.data,
      users: spaces.includes.users,
    },
  };
};
