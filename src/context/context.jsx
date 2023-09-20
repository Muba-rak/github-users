import React, { useState, useEffect, useContext, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const searchUser = async (user) => {
    const url = `${rootUrl}/users/${user}`;
    toggleError();
    setIsLoading(true);

    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) => {
        setRepos(response.data);
      });
      axios(`${followers_url}?per_page=100`).then((response) => {
        setFollowers(response.data);
      });
      // /users/${user}/repos?per_page=100
      // /users/${user}/followers
    } else {
      toggleError(true, "There is no user with that Information");
    }
    setIsLoading(false);
    checkReq();
  };

  const checkReq = async () => {
    try {
      const {
        data: {
          rate: { remaining },
        },
      } = await axios("https://api.github.com/rate_limit");
      setRequests(remaining);
      if (remaining === 0) {
        toggleError(true, "Sorry you have exceeded your hourly rate limit");
      }
    } catch (error) {
      console.log(error);
    }
  };
  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }
  useEffect(() => {
    checkReq();
  }, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        isLoading,
        requests,
        error,
        searchUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
