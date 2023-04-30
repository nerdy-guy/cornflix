import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Error from "../components/Error";
import tvShowPlaceholder from "../assets/tvshow-placeholder.jpg";

const TVShow = () => {
  const [tvShow, setTVShow] = useState([]);
  const { id } = useParams();
  const { isLoading, isError } = useQuery(["tvShow", id], () => getTVShow(id), {
    onSuccess: (data) => setTVShow(data),
  });

  const getTVShow = async (id) => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);

    if (!res.ok) {
      throw Error("Can't fetch data");
    }

    return res.json();
  };

  const {
    name,
    image,
    summary,
    runtime,
    genres,
    premiered,
    ended,
    language,
    network,
    officialSite,
    rating,
    status,
    type,
  } = tvShow;

  if (isLoading) return <Loader />;

  if (isError) return <Error />;

  return (
    <div className="flex min-h-screen flex-col justify-between dark:bg-zinc-900 dark:text-gray-300">
      <div className="mx-10 my-10 flex flex-col gap-8 md:mx-20 lg:flex-row">
        <img
          src={image?.original || tvShowPlaceholder}
          alt={name}
          className="h-auto w-60 rounded md:w-96"
        />
        <div className="flex flex-col gap-2 md:text-lg lg:text-2xl">
          {name && (
            <h1 className="font-bold">
              {name} ({premiered?.slice(0, -6) || "In Development"} -{" "}
              {ended?.slice(0, -6) || "Present"})
            </h1>
          )}
          {rating?.average && <p>TVmaze Rating: {rating?.average}</p>}
          {runtime && <p>Runtime: {runtime}m</p>}
          {summary && (
            <p className="max-w-lg lg:max-w-4xl">
              Plot:{" "}
              {summary?.replaceAll(
                /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g,
                ""
              )}
            </p>
          )}
          {genres?.length > 0 && <p>Genres: {genres?.join(" | ")}</p>}
          {type && <p>Type: {type}</p>}
          {language && <p>Language: {language}</p>}
          {premiered && <p>Premiered: {premiered}</p>}
          {ended && <p>Ended: {ended}</p>}
          {(status && status === "Running") ||
          status === "In Development" ||
          status === "To Be Determined" ? (
            <p>
              Status: <span className="text-green-500">{status}</span>
            </p>
          ) : (
            <p>
              Status: <span className="text-red-500">{status}</span>
            </p>
          )}
          {network?.name && <p>Network: {network?.name}</p>}
          <p>
            Official Site:{" "}
            <a
              href={officialSite}
              rel="noreferrer"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              {name}
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TVShow;
