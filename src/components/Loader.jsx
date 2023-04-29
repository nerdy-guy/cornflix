import { CgSpinner } from "react-icons/cg";

const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center text-center dark:bg-zinc-900">
      <div role="status">
        <CgSpinner
          aria-hidden="true"
          className="mr-2 inline h-12 w-12 animate-spin text-blue-500"
        />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
