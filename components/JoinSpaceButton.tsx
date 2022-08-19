import { LinkIcon } from "@heroicons/react/solid";

const JoinSpaceButton = ({ id }: any) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-2 py-1 w-1/4 border-2 border-gray-800 rounded bg-gray-800 text-white">
      <LinkIcon className="w-4 text-white" />
      <a
        target="_blank"
        href={`https://twitter.com/i/spaces/${id}`}
        rel="noreferrer noopener"
      >
        Join space
      </a>
    </div>
  );
};

export default JoinSpaceButton;
