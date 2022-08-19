import { BookmarkIcon } from "@heroicons/react/outline";

const BookMarkButton = () => {
    return(
      <div className="flex flex-row items-center justify-center space-x-2 py-1 w-1/4 border-2 border-gray-800 rounded bg-gray-800 text-white">
      <BookmarkIcon className="w-4 text-white" />
      <a target="_blank"  rel="noreferrer noopener">
       Bookmark
      </a>
    </div>
    )
  }

  export default BookMarkButton;