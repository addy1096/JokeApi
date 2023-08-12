document.addEventListener("DOMContentLoaded", function () {
  console.log("Ready!");

  const jokeEl = document.getElementById("joke");
  const refreshBtn = document.getElementById("refreshBtn");
  const jokeAnswer = document.getElementById("jokeAnswer");
  const getProgrammingJoke = document.getElementById("getProgrammingJoke");
  const categories = ["Programming", "Pun"];
  const params = ["blacklistFlags=nsfw,religious,racist", "idRange=0-100"];

  refreshBtn.addEventListener("click", function () {
    getJoke("any");
  });

  getProgrammingJoke.addEventListener("click", function () {
    getJoke(categories.join(","));
  });

  function createJoke(response) {
    console.log(response);
    if (response.type === "twopart") {
      jokeEl.innerHTML = `<p>${response.setup}</p>`;
      jokeAnswer.innerHTML = `Answer: ${response.delivery}`;
    } else {
      jokeEl.innerHTML = `<p>${response.joke}</p>`;
      jokeAnswer.innerHTML = ``;
    }
  }

  function getJoke(type) {
    fetch(
      `https://jokeapi-v2.p.rapidapi.com/joke/${type}?${params.join("&")}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "q99BuSsY5Lmsht3mXUIIgvYcJaj0p1U67Mljsns8RSLssTARiT",
          "x-rapidapi-host": "jokeapi-v2.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.nsfw) {
          getJoke();
        } else {
          createJoke(response);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
});
