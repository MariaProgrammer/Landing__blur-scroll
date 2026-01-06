'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


const btnScroll = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScroll.addEventListener('click', function () {
  window.scrollTo({
    left: section1.getBoundingClientRect().left + window.pageXOffset,
    top: section1.getBoundingClientRect().top + window.pageYOffset,
    behavior: "smooth",

  })
  section1.scrollIntoView({behavior: 'smooth'})
})

document.querySelector(".nav__links").addEventListener('click', function(e) {
  e.preventDefault()
  console.log(e.target)
  if(e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth"});
  }
})

//табы
const tabs = document.querySelectorAll('.operations__tab')
const tabContainer = document.querySelector('.operations__tab-container')
const tabContent = document.querySelectorAll('.operations__content')

tabContainer.addEventListener('click', function(e) {
  e.preventDefault()
  const clicked = e.target.closest('.operations__tab')
  console.log(clicked)
  if(!clicked) return;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  tabContent.forEach(content => content.classList.remove('operations__content--active'))



  console.log(clicked.dataset.tab)
  
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

//навигация
const nav = document.querySelector('.nav')
const navLinks = document.querySelector('.nav__links')
const link = document.querySelector('.nav__link')

function hover(e, opacity) {
  if(e.target.classList.contains('nav__link')) {    
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    
    const logo = link.closest('.nav').querySelector('.nav__logo')

    siblings.forEach(el => {
      if(el !== link) {
        el.style.opacity = opacity;
      }
    })
    logo.style.opacity = opacity;
  }

}

nav.addEventListener('mouseover', function(e) {
  hover(e, 0.5)
})
nav.addEventListener('mouseout', function(e) {
  hover(e, 1)
})

//включение меню по прокрутке
function callback(entries) {
  
  if(!entries[0].isIntersecting) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }

}

const options = {
  threshold: 0,
  rootMargin: '-90px',
}

const observer = new IntersectionObserver(callback, options)
observer.observe(document.querySelector('.header'))

//всплытие секций при прокрутке
// const allSections = document.querySelectorAll('.section')

// function revealSection(entries, observe) {  
//   if(entries[0].isIntersecting) {
//     entries[0].target.classList.remove('section--hidden')
//     observe.unobserve(entries[0].target)
//   }  
// }

// const sectionObserver = new IntersectionObserver(revealSection, {threshold: 0.15})

// allSections.forEach(function (section) {
//   sectionObserver.observe(section)
//   section.classList.add('section--hidden')
// })

//Ленивая подгрузка изображений
const images = document.querySelectorAll('img[data-src]')



function loadImg(entries, observe) {
  console.log(entries)
  if(!entries[0].isIntersecting) return
  entries[0].target.src = entries[0].target.dataset.src
  
  entries[0].target.addEventListener('load', function() {
    entries[0].target.classList.remove('lazy-img')
  })
  observer.unobserve(entries[0].target)
}

const imgObserver = new IntersectionObserver(loadImg, {threshold: 0.15})

images.forEach(img => {
  imgObserver.observe(img)
})

//Слайдер

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dotsContainer = document.querySelector('.dots');
const maxSlides = slides.length

let currentSlide = 0;

function createDots() {
  slides.forEach(function(s, i) {
    dotsContainer.insertAdjacentHTML('beforeend', `
      <button class="dots__dot" data-slide="${i}"></button>
      ` )

  })
}

createDots();

slides.forEach(function(slide, i) {
  slide.style.transform = `translateX(${100 * i}%)`;
});

function goToSlide(slide) {
  slides.forEach(function(s, i) {
  s.style.transform = `translateX(${100 * (i-slide)}%)`;
  });
}

function activateDots(slide) {
  document.querySelectorAll('.dots__dot').forEach(function(dot) {
    dot.classList.remove('dots__dot--active')
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  })
}

goToSlide(0)
activateDots(0)

function nextSlide() {
  if(currentSlide === maxSlides - 1){
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDots(currentSlide);
}
function prevSlide() {
  if(currentSlide === 0) {
    currentSlide = maxSlides - 1
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
  activateDots(currentSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e) {  
  if(e.key === 'ArrowLeft') {
    prevSlide()
  } else if(e.key === 'ArrowRight') {
    nextSlide()
  }
})

dotsContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDots(slide);
  }

})






// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href')
//     console.log(id)
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// })

// const h1 = document.querySelector('h1')

// function alertH1() {
//   alert('Hello')
  
// }

// h1.addEventListener('mouseenter', alertH1)

// setTimeout(function () {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 4000)

// function randomInt(min, max) {
//   return Math.floor(Math.random() * (max-min + 1) + min)
// }

// function randomColor() {
//   return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
// }

// console.log(randomColor())



// nav.addEventListener('click', function(e) { 
//   this.style.backgroundColor = randomColor();

// })
// navLinks.addEventListener('click', function(e) { 
//   this.style.backgroundColor = randomColor();

// })
// link.addEventListener('click', function(e) { 
//   this.style.backgroundColor = randomColor();
//   e.stopPropagation();

// })