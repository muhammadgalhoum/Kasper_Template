// Dropdown Menu
let bars = document.querySelector(".toggle-menu");
let ul = document.querySelector(".dropdown");

bars.onclick = function () {
  ul.classList.toggle("active");
};
document.onclick = function (e) {
  if (e.target !== bars) {
    ul.classList.remove("active");
  }
};

// Open and Close the Search Container
let searchIcon = document.querySelector(".searchIcon");
let searchContainer = document.querySelector(".searchContainer");

searchIcon.onclick = function () {
  searchContainer.classList.add("show");
};

function closeSearch() {
  searchContainer.classList.remove("show");
  searchContainer.querySelector("input").value = "";
}

// Scroll to top
let up = document.querySelector(".up");
up.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Progress Animation
let section = document.querySelector(".our-skills");
let progressSpans = document.querySelectorAll(".prog-holder span");

// Stats Animation
let statsSection = document.querySelector(".stats");
let stats = document.querySelectorAll(".stats > .container > .box > .number");
let isStarted = false;

function startCounter(ele) {
  let num = ele.dataset.num;
  let counter = setInterval(() => {
    ele.textContent++;
    if (ele.textContent === num) {
      clearInterval(counter);
    }
  }, 2000 / num);
}

window.onscroll = function () {
    window.scrollY > 1200
      ? up.classList.add("show")
    : up.classList.remove("show");
  
  if (window.scrollY >= section.offsetTop - 250) {
    progressSpans.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
  
  if (window.scrollY >= statsSection.offsetTop) {
    if (!isStarted) {
      stats.forEach((state) => startCounter(state));
    }
    isStarted = true;
  }
};

// Portfolio Filter
let lis = document.querySelectorAll(".portfolio .shuffle > li");
let divs = document.querySelectorAll(".portfolio > .imgs-container > div");

lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    lis.forEach((li) => {
      li.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    
    divs.forEach((div) => {
      div.style.display = "none";
    });
    document.querySelectorAll(e.currentTarget.dataset.cat).forEach((div) => {
      div.style.display = "block";
    });
  });
});

// Image Slider
let imgsList = ["../imgs/landing-1.webp", "../imgs/landing-2.webp", "../imgs/landing-3.webp"];
let currentBgImageIndex = 0;

let rightAngle = document.getElementById("rightAngle");
let leftAngle = document.getElementById("leftAngle");
let landing = document.querySelector(".landing");

leftAngle.onclick = prevBg;
rightAngle.onclick = nextBg;

let ulPagination = document.createElement("ul");
ulPagination.setAttribute("class", "bullets");

for (let i = 0; i < imgsList.length; i++) {
  let bullet = document.createElement("li");
  bullet.setAttribute("data-index", i);
  bullet.style.userSelect = "none";
  ulPagination.appendChild(bullet);
}
landing.appendChild(ulPagination);

// Getting the Created ul and it's children
let sliderBullets = document.querySelector(".bullets");
let bullets = sliderBullets.querySelectorAll("li");

// Looping through all the Bullets
for (let i = 0; i < bullets.length; i++) {
  bullets[i].onclick = function () {
    currentBgImageIndex = parseInt(this.getAttribute("data-index"));
    checker();
  };
}

function checker() {
  bullets.forEach((bullet) => {
    bullet.classList.remove("active");
    sliderBullets.children[currentBgImageIndex].classList.add("active");

    landing.style.backgroundImage = `url("${imgsList[currentBgImageIndex]}")`;
  });
}
checker();

function prevBg() {
  if (currentBgImageIndex === 0) {
    currentBgImageIndex = imgsList.length - 1;
    checker();
  } else {
    currentBgImageIndex--;
    checker();
  }
}

function nextBg() {
  if (currentBgImageIndex === imgsList.length - 1) {
    currentBgImageIndex = 0;
    checker();
  } else {
    currentBgImageIndex++;
    checker();
  }
}