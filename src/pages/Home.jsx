import React from "react";
import TVShows from "./TVShows";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between dark:bg-zinc-900 dark:text-white">
      <TVShows />
      <Footer />
    </div>
  );
};

export default Home;
