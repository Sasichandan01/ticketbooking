import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import moment from "moment";
function Ticket() {
  const img_300 = "https://image.tmdb.org/t/p/w300";
  const noPicture =
    "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

  const location = useLocation();

  const name = location.state.name;
  const mvedata = location.state.data;
  const title = location.state.title;
  const mail = location.state.mail;
  const city = location.state.city;
  const year = location.state.year;

  var days = [
    {
      id: 0,
      name: "button-1",
      date: moment().add(1, "days").format("ddd, MMM D"),
    },
    {
      id: 1,
      name: "button-2",
      date: moment().add(2, "days").format("ddd, MMM D"),
    },
    {
      id: 2,
      name: "button-3",
      date: moment().add(3, "days").format("ddd, MMM D"),
    },
  ];

  var theatres = [
    { name: "PVR" },
    { name: "PVP" },
    { name: "INOX" },
    { name: "IMAX" },
  ];

  var costs = [
    { cost: "200", value: "200 -Reclinear" },
    { cost: "150", value: "150 -Balcony" },
    { cost: "100", value: "100 -Normal" },
  ];

  const [movie, setmovieData] = useState([]);
  const [cost, setCost] = useState(null);
  const [found, setNotFound] = useState(null);
  const [credits, setCredits] = useState(null);
  const [centredModal, setCentredModal] = useState(false);
  const [centredModal1, setCentredModal1] = useState(false);
  const [activebutton, setactive] = useState(null);
  const [activeb, setactiveb] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [review, setReview] = useState(null);
  const toggleShow = () => setCentredModal(!centredModal);
  const toggleShow1 = () => setCentredModal1(!centredModal1);
  function handlecost(data) {
    setCost(data);
  }
  function dateclick(data) {
    setactive(data);
  }
  function theatreclick(data) {
    setactiveb(data);
  }

  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?t=${title}&y=2023&plot=full&apikey=961ea94b`
    )
      .then((res) => res.json())
      .then((data) => setmovieData(data))

      .catch((err) => {
        setNotFound(true);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${mvedata.id}/credits?api_key=bee8ce9f0d5a33ee50837d31a61a64eb`
    )
      .then((res) => res.json())
      .then((data) => setCredits(data.cast))

      .catch((err) => {
        setNotFound(true);
      });
  }, []);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${mvedata.id}/videos?api_key=bee8ce9f0d5a33ee50837d31a61a64eb`
    )
      .then((res) => res.json())
      .then((data) => setTrailer(data.results))

      .catch((err) => {
        setNotFound(true);
      });
  }, []);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${mvedata.id}/reviews?api_key=bee8ce9f0d5a33ee50837d31a61a64eb`
    )
      .then((res) => res.json())
      .then((data) => setReview(data.results))

      .catch((err) => {
        setNotFound(true);
      });
  }, []);
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  var credit = null;

  if (credits !== null) {
    credit = credits.slice(0, 6);
  }
  var num = 0;

  if (movie.imdbVotes !== undefined) {
    for (var i = 0; i < movie.imdbVotes.length; i++) {
      if (movie.imdbVotes[i] !== ",") {
        num += movie.imdbVotes[i];
      }
    }
  }

  var num3 = parseInt(mvedata.vote_average);
  var imdb = movie.imdbRating === "N/A" ? num3 : movie.imdbRating;
  var num1 = parseInt(num);
  num1 = num1 / 1000;
  num1 = Math.ceil(num1);
  var num2 = parseInt(mvedata.vote_count);
 
  num2=num2/1000;
  num2 = Math.ceil(num2);
  var t = parseInt(movie.Runtime);
  var h = Math.floor(t / 60);
  var min = Math.floor(t % 60);
  var plot =
    movie.Plot?.length > mvedata.overview?.length
      ? movie.Plot
      : mvedata.overview;
  var votes = movie.imdbRating === "N/A" ? num2 : num1;

  return (
    <>
      <div className="movie">
        <div className="moviep">
          <div className="poster">
            <figure>
              <img
                className="movie-image"
                src={`https://image.tmdb.org/t/p/w500/` + mvedata.poster_path}
              />
              <figcaption>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div>
                    <button className="figcaptionbutton" onClick={toggleShow}>
                      <i
                        className="fa-brands fa-youtube"
                        style={{ color: "#FF0000", backgroundColor: "white" }}
                      ></i>
                      &nbsp; Watch Trailer
                    </button>
                  </div>
                  <div>
                    <button className="figcaptionbutton" onClick={toggleShow1}>
                      <i class="fa-solid fa-magnifying-glass"></i>
                      &nbsp;&nbsp;Reviews
                    </button>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
          <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
            <MDBModalDialog centered size="lg">
              <MDBModalContent>
                <MDBModalHeader>
                  <strong>{movie.Title}- Trailer</strong>
                </MDBModalHeader>
                <MDBModalBody>
                  {trailer !== null && (
                    <ul className="ulvideo">
                      {trailer
                        .filter((data) => data.name.includes("Trailer"))
                        .map((data1) => (
                          <div className="videodata">
                            <li>{data1.name}</li>
                            <a
                              target="_blank"
                              href={`https://www.youtube.com/watch/${data1.key}`}
                            >
                              <button className="videodatabutton">
                                <i
                                  className="fa-brands fa-youtube"
                                  style={{ color: "#FF0000" }}
                                ></i>
                              </button>
                            </a>
                          </div>
                        ))}
                    </ul>
                  )}
                </MDBModalBody>
                <MDBModalFooter>
                  <button className="close" onClick={toggleShow}>
                    Close
                  </button>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
          <MDBModal
            tabIndex="-1"
            show={centredModal1}
            setShow={setCentredModal1}
          >
            <MDBModalDialog centered size="lg">
              <MDBModalContent>
                <MDBModalHeader>
                  <strong>{movie.Title}-Reviews</strong>
                </MDBModalHeader>
                <MDBModalBody>
                  {review?.length === 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ marginRight: "10px", marginTop: "5px" }}>
                        <i class="fa-solid fa-magnifying-glass fa-2x"></i>
                      </div>

                      <div>
                        <h2>NO REVIEWS</h2>
                      </div>
                    </div>
                  )}
                  {review !== null && (
                    <ul>
                      {review.map((data) => (
                        <li>
                          <div className="reviewdata">
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                              }}
                            >
                              {" "}
                              <p>
                                Name:&nbsp;
                                <b>{data.author}</b>
                              </p>
                              <p>
                                Rating: <b>{data.author_details.rating}/10</b>
                              </p>
                            </div>

                            <p>{data.content}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </MDBModalBody>
                <MDBModalFooter>
                  <button className="close" onClick={toggleShow1}>
                    Close
                  </button>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
          <div className="matter">
            <h1 className="matter-title">{movie.Title} </h1>

            <div className="rating">
              <span className="imdb">
                <h2 className="abcd">
                  <i
                    className="fa-sharp fa-solid fa-star"
                    style={{ color: "#f84464" }}
                  ></i>
                  {imdb}/10
                </h2>
              </span>
              <span>
                <strong>{votes}k</strong> votes
              </span>
            </div>

            <div className="elements">
              <ul>
                <li>
                  {h}hr {min}min
                </li>
                <li>{movie.Genre}</li>
              </ul>
            </div>
            <div className="language">
              <li>{movie.Language}</li>
            </div>

            <div className="date">
              <label>
                <strong>SelectDate </strong>
              </label>
              {days.map((data) => (
                <button
                  type="button"
                  name={data.date}
                  id={
                    activebutton === data.date ? "datebuttonid" : "datebutton"
                  }
                  onClick={() => dateclick(data.date)}
                >
                  {data.date}
                </button>
              ))}
            </div>
            <div className="theatre">
              <label>
                <strong>Select Theatre </strong>
              </label>
              {theatres.map((data) => (
                <button
                  type="button"
                  name={data.cost}
                  id={activeb === data.name ? "datebuttonid" : "datebutton"}
                  onClick={() => theatreclick(data.name)}
                >
                  {data.name}
                </button>
              ))}
            </div>
            {activebutton && activeb && (
              <div className="theatre1">
                <label>
                  <strong>Select Cost </strong>
                </label>
                {costs.map((data) => (
                  <button
                    type="button"
                    name={data.cost}
                    value={data.value}
                 
                    id={cost === data.cost ? "datebuttonid" : "datebutton"}
                    onClick={() => handlecost(data.cost)}
                  >
                    {data.value}
                  </button>
                ))}
              </div>
            )}
            {cost && activebutton && activeb && (
              <Link
                className="book-ticket"
                state={{
                  data: activeb,
                  cost: cost,
                  date: activebutton,
                  name: name,
                  photo: mvedata.poster_path,
                  title: title,
                  mail: mail,
                  city: city,
                }}
                to="booking"
              >
                <button type="button" className="ticket-button">
                  Book tickets
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="plot">
        <h4>
          <strong>About the Movie</strong>
        </h4>
        <p>{plot}</p>
      </div>
      <div className="plot">
        <h4>
          <strong>Starring</strong>{" "}
        </h4>
        <div className="cast">
          {credit &&
            credit.map((c) => (
              <div className="castimages">
                <div>
                  <a
                    href={`https://en.wikipedia.org/wiki/${c?.name}`}
                    target="_blank"
                  >
                    <img
                      className="cast-img"
                      src={
                        c.profile_path
                          ? `${img_300}/${c.profile_path}`
                          : `https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg`
                      }
                      height="150"
                      width="150"
                    />
                  </a>
                </div>
                <div>
                  <p className="">{c?.name}</p>
                </div>
              </div>
            ))}
        </div>
        {!credit && <p>{movie.Actors}</p>}
      </div>
      <div className="plot">
        <h4>
          <strong>Directed by</strong>
        </h4>
        <b>{movie.Director}</b>
      </div>
    </>
  );
}

export default Ticket;
