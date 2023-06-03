import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isupdate, setUpdate] = useState(false);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (data && isupdate === false) {
      console.log(data);
      stringToHTML(data.summary);
      setUpdate(true);
    }
  }, [data, isupdate]);

  const stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    document.getElementById("summary").appendChild(doc.body);
  };

  if (isLoading)
    return (
      <main>
        <Loader />
      </main>
    );

  return (
    <div className="min-h-screen overflow-hidden text-white bg-black">
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen gap-2 md:gap-20 sm:gap-12 sm:flex-row">
          <div className="w-11/12 mx-auto sm:w-1/2">
            <Link to={data.officialSite}>
              <img src={data.image.original} alt="" />
            </Link>
          </div>
          <div className="flex-1 w-11/12 px-2 mx-auto md:px-24 sm:px-12 sm:w-1/2">
            <h1 className="font-mono text-2xl font-extrabold md:text-5xl">
              {data.name}
            </h1>
            <div className="flex gap-4">
              {data.genres.map((item, key) => {
                return (
                  <span className="text-gray-400" key={key}>
                    {item}
                  </span>
                );
              })}
            </div>
            <div className="flex flex-col gap-2 mt-10 font-mono">
              <div>
                <span> Rating</span>:{" "}
                <span className="text-xl">{data.rating.average}</span>
              </div>
              <div>
                <span> Average Runtime</span>:{" "}
                <span className="text-xl">{data.averageRuntime}</span>
              </div>
              <div>
                <span> Language</span>:{" "}
                <span className="text-xl">{data.language}</span>
              </div>
              <div>
                <span> Status</span>:{" "}
                <span className="text-xl">{data.status}</span>
              </div>
              <div>
                <span> Premiered</span>:{" "}
                <span className="text-xl">{data.premiered}</span>
              </div>
            </div>
            <div>
              <h2 className="mt-10 font-mono text-xl font-bold md:text-3xl">
                Description
              </h2>
              <div id="summary" className="text-base text-gray-400"></div>
              {/* {stringToHTML(data.summary)} */}
            </div>
            <div className="mt-6">
              <button
                className="px-5 py-4 text-xl text-white transition-colors duration-500 ease-in-out bg-red-500 rounded-md hover:bg-red-600 "
                onClick={() => setShowForm(true)}
              >
                Book a ticket
              </button>
            </div>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="absolute w-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2 rounded-md top-1/2 left-1/2 backdrop-blur-2xl h-2/3">
          <div className="p-4">
            <h1 className="font-mono text-2xl font-extrabold md:text-5xl ">
              {data.name}
            </h1>
            <div className="flex gap-4">
              {data.genres.map((item, key) => {
                return (
                  <span className="text-gray-400" key={key}>
                    {item}
                  </span>
                );
              })}
            </div>
            <div className="flex flex-col gap-2 mt-10 font-mono">
              <div>
                <span> Rating</span>:{" "}
                <span className="text-xl">{data.rating.average}</span>
              </div>
              <div>
                <span> Average Runtime</span>:{" "}
                <span className="text-xl">{data.averageRuntime}</span>
              </div>
              <div>
                <span> Language</span>:{" "}
                <span className="text-xl">{data.language}</span>
              </div>
              <div>
                <span> Status</span>:{" "}
                <span className="text-xl">{data.status}</span>
              </div>
              <div>
                <span> Premiered</span>:{" "}
                <span className="text-xl">{data.premiered}</span>
              </div>
            </div>
            <div className="mt-10">
              <button
                className="px-5 py-4 text-xl text-white transition-colors duration-500 ease-in-out bg-red-500 rounded-md hover:bg-red-600 "
                onClick={() => setShowForm(false)}
              >
                Make a payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
