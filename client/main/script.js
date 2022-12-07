//--------------------------------order form --------------------------------
const form = document.getElementById('order')
form.addEventListener('submit', orderDone)

async function orderDone(event) {
  event.preventDefault()
  const o_name = document.getElementById('o_name').value
  const o_number = document.getElementById('o_number').value
  const main_order = document.getElementById('main_order').value
  const additional_food = document.getElementById('additional_food').value
  const o_email = document.getElementById('o_email').value
  const o_delivery_time = document.getElementById('o_delivery_time').value.replace('T', '  ')
  const o_address = document.getElementById('o_address').value
  const o_message = document.getElementById('o_message').value
  const email = decodeURIComponent(document.cookie.split('=')[1]);
  const o_placed_time = Date().replace('GMT+0530 (India Standard Time)','')
  // const o_placed_time = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "  " + new Date().getHours() + ":" + new Date().getMinutes() ;

  const result = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      o_name,
      o_number,
      main_order,
      additional_food,
      email,
      o_email,
      o_placed_time,
      o_delivery_time,
      o_address,
      o_message
    })
  }).then((res) => res.json())

  if (result.status === 'ok') {
    alert(result.message)
    if (result.message === "Order Successfully")
      window.location.href = '/main';
  } else {
    swal("Opps!", result.error, "warning");
    if (result.error === "Please Sign in Again!!") {
      alert(result.error)
      window.location.href = '/';
    }
  }
}

// -------------------------------------------------------

let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec => {

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*=' + id + ']').classList.add('active');
      });
    };

  });

}

var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function loader() {
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
  setInterval(loader, 3000);
}

window.onload = fadeOut;

