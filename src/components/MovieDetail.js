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
    <div className="bg-black text-white min-h-screen ">
      <div>
        <div className="flex justify-center items-center h-screen md:gap-20 sm:gap-12 gap-2">
          <div className="w-1/2 ">
            <Link to={data.officialSite}>
              <img src={data.image.original} alt="" />
            </Link>
          </div>
          <div className="w-1/2 md:px-24 sm:px-12 px-2 flex-1 ">
            <h1 className="md:text-5xl text-2xl font-mono font-extrabold">
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
            <div className="font-mono mt-10 flex flex-col gap-2">
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
              <h2 className="md:text-3xl text-xl font-mono font-bold mt-10">
                Description
              </h2>
              <div id="summary" className="text-base text-gray-400"></div>
              {/* {stringToHTML(data.summary)} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
