import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import tvshowplaceholder from "../assets/tvshow-placeholder.jpg";
import Loader from "../components/Loader";
import Error from "../components/Error";

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [query, setQuery] = useState("");

  const { isLoading, isError } = useQuery(
    ["tvShows", query],
    () => getTvShows(query),
    {
      onSuccess: (data) => setTvShows(data),
    }
  );

  const getTvShows = async (query) => {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);

    if (!res.ok) {
      throw Error("Can't get data");
    }

    return res.json();
  };

  if (isLoading) return <Loader />;

  if (isError) return <Error />;

  const handleQuery = (e) => {
    e.preventDefault();

    setQuery(e.target[0].value);
  };

  return (
    <div>
      {tvShows.length < 1 ? (
        <form onSubmit={handleQuery} className="mt-72 flex justify-center">
          <input
            type="search"
            placeholder="Search"
            className="w-2/3 rounded-l bg-gray-300 p-2 dark:bg-zinc-800 dark:text-white dark:focus:outline-transparent md:w-3/12"
          />
          <button type="submit" className="rounded-r bg-blue-500 px-6">
            <HiOutlineSearch />
          </button>
        </form>
      ) : (
        <>
          <form
            onSubmit={handleQuery}
            className="mb-16 mt-8 flex justify-center"
          >
            <input
              type="search"
              placeholder="Search"
              className="w-2/3 rounded-l bg-gray-300 p-2 dark:bg-zinc-800 dark:text-white dark:focus:outline-transparent md:w-3/12"
            />
            <button
              type="submit"
              className="rounded-r bg-blue-500 px-6 focus:outline-transparent"
            >
              <HiOutlineSearch />
            </button>
          </form>

          {tvShows.map(({ show }) => (
            <div
              className="mx-6 mb-4 flex gap-4 border-b border-b-gray-400 dark:text-gray-300 md:mx-40"
              key={show.id}
            >
              <Link to={`/${show.id}`}>
                <img
                  src={show?.image?.original || tvshowplaceholder}
                  alt={show?.name}
                  className="h-60 max-h-[16rem] w-60 max-w-[9rem] md:max-w-[11rem]"
                />
              </Link>
              <div className="flex flex-col gap-2">
                {show?.premiered ? (
                  <div>
                    <Link
                      to={`/${show.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {show?.name}
                    </Link>{" "}
                    ({show?.premiered?.slice(0, -6)} -{" "}
                    {show?.ended?.slice(0, -6) || "present"})
                  </div>
                ) : (
                  <Link
                    to={`/${show.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {show.name}
                  </Link>
                )}
                {show?.genres.length > 0 && (
                  <p>Genres: {show?.genres?.join(" | ")}</p>
                )}
                {show?.language && <p>Language: {show?.language}</p>}
                {show?.status === "Running" ||
                show?.status === "In Development" ||
                show?.status === "To Be Determined" ? (
                  <p>
                    Status:{" "}
                    <span className="text-green-500">{show?.status}</span>
                  </p>
                ) : (
                  <p>
                    Status: <span className="text-red-500">{show.status}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TVShows;