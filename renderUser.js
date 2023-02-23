"use strict";
const $container = document.querySelector(".container");
const getUsers = async () => {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  const result = await users.json();
  if (users.status === 200) {
    renderUser($container, result);
  }
};

getUsers();
function renderUser(element, users) {
  users.forEach((user) => {
    const { id, name, email, address, phone, company, website } = user;
    element.innerHTML += `
          <div class="user">
       <div class="heart active" ></div>
            <img src="https://randomuser.me/api/portraits/men/${id}.jpg" alt="user" class="user__img">
          <ul class="user__list">
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Address: ${address.street}, ${address.suite}</li>
            <li>Phone: ${phone}</li>
            <li>Website: <a href="" class="list__link">${website}</a></li>
            <li>Company: ${company.name}</li>
          </ul>
          </div>
        `;
  });

  const heart = document.querySelectorAll(".heart");
  heart.forEach((item) => {
    item.addEventListener("click", (event) => {
      let parentElement = event.target.parentNode;
      if (parentElement.nodeName === "DIV") {
        favoriteUser(parentElement);
      }
    });
  });
  const heart_active = document.querySelectorAll(".active");
  heart_active.forEach((element) => {
    element.addEventListener("click", function () {
      if (this.classList.contains("red")) {
        this.classList.remove("red");
      } else {
        this.classList.toggle("red");
      }
    });
  });
}
let clasName;
let favoritUserList = [];
function favoriteUser(user) {
  const heart = document.querySelector(".heart");
  const ul = user.querySelector(".user__list");
  const favoritList = document.querySelector(".favorite-user_list");
  const name = ul.firstElementChild.textContent.slice(6);
  clasName = name.replace(/\s+/g, "");
  const deleteName = document.querySelector(`.${clasName}`);
  if (favoritUserList.includes(name) === false) {
    favoritUserList.push(name);
    favoritList.innerHTML += `<li class="${clasName}">${name}</li>`;
  } else if (favoritUserList.includes(name) == true) {
    let index = favoritUserList.indexOf(name);
    if (index === 0) {
      favoritUserList.splice(0, 1);
    } else {
      favoritUserList.splice(index, index);
    }
    deleteName.remove();
  }
}
