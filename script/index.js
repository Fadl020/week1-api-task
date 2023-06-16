main();

function main() {
  const charactersList = document.querySelector("ul");
  const characterDetails = document.querySelector(".details");
  const [nameHead, imgBig, genderInfo, heightInfo, homeLink] = document.querySelectorAll(".details>*");

  homeLink.addEventListener("click", () => {
    charactersList.classList.remove("hide");
    characterDetails.classList.add("hide");
  })


  

  populate();

  async function populate() {
    let request = new Request("https://swapi.dev/api/people");
    let response = await fetch(request);
    let starWars = await response.json();

    while (starWars.next) {
      populateList(starWars);

      request = new Request(starWars.next);
      response = await fetch(request);
      starWars = await response.json();
    }
  }

  function populateList(obj) {
    obj.results.forEach(character => {
      const { name, gender, height } = character;
      const li = document.createElement("li");
      charactersList.append(li);
      const p = document.createElement("p");
      const img = document.createElement("img");
      li.append(p);
      p.innerHTML = name;
      li.addEventListener("click", () => showDetails(name, gender, height));
    })
  }

  
  

  function showDetails(name, gender, height) {
    nameHead.innerHTML = name;
    genderInfo.innerHTML = `Gender: ${gender}`;
    heightInfo.innerHTML = `Height: ${height}cm`;
    charactersList.classList.add("hide");
    characterDetails.classList.remove("hide");
  }



}
    





// module.exports = { main }
