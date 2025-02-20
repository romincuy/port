// typing text hero
const typed = new Typed(".typing-text", {
  strings: ["Full-Stack Developer"],
  loop: true,
  typeSpeed: 55,
  backSpeed: 25,
  backDelay: 500,
});

// auto hide navbar click
$(".click-trigger").click(function () {
  $(".navbar-collapse").collapse("hide");
});

// automatic transparent navbar
const navBar = document.getElementsByTagName("nav")[0];
window.addEventListener("scroll", function () {
  console.log(window.scrollY);
  if (window.scrollY > 1) {
    navBar.classList.replace("bg-transparent", "navbar-color");
  } else if (this.window.scrollY <= 0) {
    navBar.classList.replace("navbar-color", "bg-transparent");
  }
});

const navToggler = document.querySelector(".navbar-toggler");

navToggler.addEventListener("click", function () {
  if (navBar.classList.contains("bg-transparent")) {
    navBar.classList.replace("bg-transparent", "navbar-color");
  } 
});

document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll('.nav-links');

  // Fungsi untuk mengatur kelas 'current' berdasarkan hash URL
  function setCurrentLink() {
      const currentHash = window.location.hash; // Ambil hash saat ini

      // Jika tidak ada hash, set ke #home
      if (!currentHash) {
          window.location.hash = '#home'; // Set hash ke #home jika tidak ada
      }

      // Setelah hash ditetapkan, periksa dan set kelas 'current'
      navLinks.forEach(link => {
          if (link.getAttribute('href') === currentHash || (currentHash === '' && link.getAttribute('href') === '#home')) {
              link.classList.add('current'); // Tambahkan kelas 'current' jika cocok
          } else {
              link.classList.remove('current'); // Hapus kelas 'current' jika tidak cocok
          }
      });
  }

  // Set kelas 'current' saat halaman dimuat
  setCurrentLink();

  navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
          // Hapus kelas 'current' dari semua link
          navLinks.forEach(nav => nav.classList.remove('current'));

          // Tambahkan kelas 'current' pada link yang diklik
          this.classList.add('current');
      });
  });
});


// fetchData API
async function fetchData(type = "certification") {
  let response;
  type === "certification"
    ? (response = await fetch("certification/certification.json"))
    : (response = await fetch("project/project.json"));
  const data = await response.json();
  return data;
}

function showCertification(certification) {
  let certificationContainer = document.querySelector(
    ".certification .content"
  );
  let certificationHTML = "";
  certification.forEach((certification) => {
    certificationHTML += `
        <div class="box" data-aos="fade-down">
            <img
                draggable="false"
                src="${certification.image}"
                alt="certification"/>
            <div class="desc">
                <h3>
                    ${certification.name}
                </h3>
                <p>By
                    <span>${certification.by}</span>
                </p>
                <div class="credentials">
                    <a class="btn" target="_blank" href="${certification.links.credentials}">
                        view credentials
                        <i class="fas fa-angle-right"></i>
                    </a>
                </div>
            </div>
        </div>`;
  });
  certificationContainer.innerHTML = certificationHTML;
}


let currentItemsProject = 5;
function showProject(project) {
  let projectContainer = document.querySelector(".project .content");
  let projectHTML = "";
  project.slice(0, currentItemsProject).forEach((project) => {
    projectHTML += `
        <div class="cards" >
    <img draggable="false" src="${project.image}" alt=""/>
    <div class="desc-content d-flex flex-column text-justify">
        <div class="tag">
            <h3>${project.title}</h3>
            <h5>${project.tech}</h5>
        </div>
        <div class="desc">
            <p>
            ${project.desc}
            </p>
            <div class="btns">
                <a
                    href="${project.links.view}"
                    class="btn"
                    target="_blank">
                    <i class="fas fa-eye"></i>
                    View
                </a>
                <a
                    href="${project.links.code}"
                    class="btn"
                    target="_blank">
                    <i class="fas fa-code"></i>
                    Code
                </a>
            </div>
        </div>
    </div>
</div>`;
  });
  projectContainer.innerHTML = projectHTML;
}
fetchData("certification").then((data) => {
  showCertification(data);
});
fetchData("project").then((data) => {
  showProject(data);
});

const loadmore = document.querySelector(".loadmore-btn");
const showless = document.querySelector(".showless-btn");
let currentItems = 3;

loadmore.addEventListener("click", (e) => {
  e.preventDefault(); // Mencegah halaman bergeser
  const elementList = [...document.querySelectorAll(".certification .content .box")];

  for (let i = currentItems; i < currentItems + 3; i++) {
    if (elementList[i]) {
      elementList[i].classList.add("d-block");
    }
  }
  currentItems += 3;

  if (currentItems >= elementList.length) {
    loadmore.classList.add("d-none");
  }

  // Tampilkan tombol Show Less setelah Load More diklik
  if (currentItems > 3) {
    showless.classList.remove("d-none");
  }
});

showless.addEventListener("click", (e) => {
  e.preventDefault(); // Mencegah halaman bergeser
  const elementList = [...document.querySelectorAll(".certification .content .box")];

  if (currentItems > 3) {
    for (let i = currentItems - 1; i >= currentItems - 3; i--) {
      if (elementList[i]) {
        elementList[i].classList.remove("d-block");
      }
    }
    currentItems -= 3;
  }

  // Sembunyikan tombol Show Less jika elemen yang ditampilkan tinggal sedikit
  if (currentItems <= 3) {
    showless.classList.add("d-none");
  }

  // Pastikan tombol Load More muncul kembali jika item tersembunyi
  loadmore.classList.remove("d-none");
});



// Viewall button
const viewall = document.querySelector(".viewall-btn");

viewall.addEventListener("click", () => {
  currentItemsProject += 5;
  fetchData("project").then((data) => {
    showProject(data);
    if (data.length <= currentItemsProject) {
      viewall.classList.add("d-none");
    }
  });
});

// animate on scroll (AOS)
AOS.init();

// disable inspect element or dev mode
document.addEventListener("contextmenu", function(e){
  e.preventDefault();
});

document.onkeydown = function (e){
  if (event) {
      return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)){
      return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)){
      return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)){
      return false;
  }
  if (e.ctrlKey && e.keyCode == "I".charCodeAt(0)){
      return false;
  }
}

// Scrollspy botstrap
const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: ".navbar",
});

// scroll reveal animation content
const srtop = ScrollReveal({
  origin: "top",
  distance: "90px",
  duration: 1000,
  reset: true,
});

srtop.reveal(".home .content .intro h3", { delay: 300 });
srtop.reveal(".home .content .intro p", { delay: 300 });
srtop.reveal(".home .content .intro a", { delay: 400 });

srtop.reveal(".home .image", { delay: 600 });
srtop.reveal(".home .linkedin", { interval: 600 });
srtop.reveal(".home .github", { interval: 600 });
srtop.reveal(".home .instagram", { interval: 600 });

srtop.reveal(".about .cv-btn", { delay: 200 });


function setActiveLink() {
  const currentHash = window.location.hash;
  console.log("Current Hash:", currentHash); // Debugging

  // Jika tidak ada hash, set ke #home
  if (!currentHash) {
      window.location.hash = '#home';
  }

  navLinks.forEach(link => {
      console.log("Link Href:", link.getAttribute('href')); // Debugging
      if (link.getAttribute('href') === currentHash || (currentHash === '' && link.getAttribute('href') === '#home')) {
          link.classList.add('active');
          console.log("Set active:", link.getAttribute('href')); // Debugging
      } else {
          link.classList.remove('active');
      }
  });
}