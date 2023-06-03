import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    console.log("My data ", data);
  });

  if (isLoading)
    return (
      <main>
        <Loader />
      </main>
    );

  return (
    <div className="w-screen min-h-screen text-white bg-black border-2 border-black">
      <div className="">
        <h1 className="mt-8 font-sans text-5xl font-extrabold text-center text-transparent bg-clip-text bg-rado bg-gradient-to-r from-stone-100 via-rose-600 to-yellow-100">
          QuardB Tech
        </h1>
        <div className="mx-8 mt-8">
          <div className="flex flex-wrap items-center justify-center gap-8 font-mono ">
            {data &&
              data.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="p-4  hover:shadow-[-10px_-10px_30px_4px_rgba(45,78,255,0.15),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-lg transition-all duration-500 ease-in-out "
                  >
                    <img src={item.show.image.medium} alt="ss" />
                    <div className="flex justify-between my-3 text-sm">
                      <p>{item.show.name}</p>
                      <Link to={`/movie/${item.show.id}`}>
                        <p className="text-xs cursor-pointer hover:text-red-600">
                          View More
                        </p>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
