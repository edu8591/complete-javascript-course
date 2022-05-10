'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const initialCoords = section1.getBoundingClientRect();
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const sections = document.querySelectorAll('.section');
const images = document.querySelectorAll('.lazy-img');

// modal window //////////////////
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//smooth scrolling

btnScrollTo.addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// smooth scrolling for links in navbar
document.querySelector('.nav__links').addEventListener('click', e => {
  if (
    e.target.classList.contains('nav__link') &&
    e.target.getAttribute('href').length > 1
  ) {
    e.preventDefault();
    const sectionId = e.target.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
  }
});

// tabbed component
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  // selecting active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // remove content fo all tabs
  tabsContent.forEach(content => {
    content.classList.remove('operations__content--active');
  });

  // activate content area for current tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// menu fade animations

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      //changed the opacity to this due to bind
      // if (el !== link) el.style.opacity = opacity;
      if (el !== link) el.style.opacity = this;
    });
    // logo.style.opacity = opacity;
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation
//////// with event listeners
// window.addEventListener('scroll', () => {
//   if (window.scrollY >= initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
//////// with intersection observer
const stickyNav = function (entries) {
  const [entry] = entries;
  !entry.isIntersecting
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // this is a margin added to the the root in pixels, meaning that the element will end 90 pixels earlier
};

const headerObserver = new IntersectionObserver(stickyNav, obsOptions);

headerObserver.observe(header);

// Section loading effect //////////////////

const sectionObsOptions = {
  root: null,
  threshold: 0.15,
};

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(
  revealSection,
  sectionObsOptions
);

sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy Loading images //////////////////

const imgObsOptions = {
  root: null,
  threshold: 0,
  rootMargin: '-200px', // this is to make the image without the user seeing what is happening
};

const loadImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  if (entry.isIntersecting) {
    entry.target.setAttribute('src', entry.target.dataset.src);
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  }
};
const imageObserver = new IntersectionObserver(loadImage, imgObsOptions);

images.forEach(image => imageObserver.observe(image));

//slider
const slider = function () {
  // selectors
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotsContainer = document.querySelector('.dots');

  // functions

  const createDots = function (slides) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('dots__dot');
      dot.setAttribute('data-slide', i);
      dotsContainer.append(dot);
    });
  };

  const setActiveDot = function (slide) {
    const dots = document.querySelectorAll('.dots__dot');
    dots.forEach(dot => {
      const { slide: data } = dot.dataset;
      Number(data) === slide
        ? dot.classList.add('dots__dot--active')
        : dot.classList.remove('dots__dot--active');
    });
  };

  const showSlide = function (position) {
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translate(${100 * (i - position)}%)`)
    );
    setActiveDot(currentSlide);
  };

  const init = function () {
    createDots(slides);
    showSlide(0);
  };

  const nextSlide = function () {
    currentSlide++;
    if (currentSlide === slides.length) currentSlide = 0;
    showSlide(currentSlide);
  };

  const prevSlide = function () {
    currentSlide--;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    showSlide(currentSlide);
  };

  //event listeners

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      currentSlide = Number(e.target.dataset.slide);
      showSlide(currentSlide);
    }
  });

  init();
};

slider();

/****************Selecting, creating and deleting elements ****************/
/*
//selecting elements
console.log(document.documentElement); // this will return the entire HTML
//to get the head and body of the html we can call it directly after the document, its not needed to select them with query Selector
console.log(document.head);
console.log(document.body);

// we can use querySelector to select a simple element, it will return the first element that matches the selector
const header = document.querySelector('.header');

// to select various elements we should use querySelectorAll

const allSections = document.querySelectorAll('.section');
console.log(allSections);

// these selectors are available on all the elements not just on the document

document.getElementById('section--1'); // we dont need to add a selector we only pass a string as the method knows it will be looking for an id

const allButtons = document.getElementsByTagName('button'); // will get all the elements that have a tag name of button
console.log(allButtons);
//this method returns an html collection  the difference with a node list is that it will be updated automatically, if one of the elements selected is deleted it will be automatically removed from the list
// and htmlCollection is also called a live collection because if the dom changes the collection will change as well

document.getElementsByClassName('btn'); // similar to getElementById but will return an HTMLCollection will all the elements that have that class name

// creating and inserting elements

// .insertAdjacentHTML can be used to create and insert an element

//sometimes its better to create the element more programatically so we do it as follows
const message = document.createElement('div'); // this element is not in the DOM, if we want it the the dom of the webpage we should insert it first, here we are just creating the dom element

message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class="btn btn--close--cookie">Got it! </button>';

// now that the element is done we only need to insert it into the document
header.prepend(message);
// prepend will add the new element as the first child of the selected element, to add as the last child we use append

header.append(message);
// we see that the element was only added oneto the document, that is because now message is a live element living inside the DOM so it can't be at multiple places at the same time
//first we prepended the element and then appended it, what the append method did was move it from being the first child to being the last one
// we can use the prepend and append element to move elements
// if we want to insert multiple copies of an element we should make a compy of said element
header.prepend(message.cloneNode(true)); // by doing this We can sucessfully add the same node multiple times

const newElement = document.createElement('button');
newElement.classList.add(...['btn', 'btn--close--cookie']);
newElement.innerText = 'using before and after methods!';

header.before(newElement);
header.after(newElement.cloneNode(true));

//deleting elements
document.querySelectorAll('.btn--close--cookie').forEach(element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    element.remove(); // this element is fairly new, before we had to choose the parent eleent ad delete the child with the remove child
    // it would have been like this

    // element.parentElement.removeChild(element);
  });
});
*/

/****************Styles, Attributes and Classes ****************/
/*
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class="btn btn--close--cookie">Got it! </button>';

// styles
// to set a style on an element
// we must type the css atributes using camelCase and values as a string
// styles set in the dom will be the same as setting in line styles
message.style.backgroundColor = '#37383d';
document.querySelector('.header').append(message);
message.style.width = '120%';

// if we try to get a style value unless we have already set the with js or is an inline style we wont be able to read it
console.log(message.style.height);
console.log(message.style.width);
console.log(message.style.color); // this is defined in the stylesheet;
// to get the styles from the stylesheet we use the getcomputedStlyle(element)

console.log(getComputedStyle(message).height); // because this returns a biiig list we choose the specific attribute we are interested
// will return the real computed style of how it is displayed in the browser, even if we did not specify it on the css
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
console.log(message.style.height); // because this returns a biiig list we choose the specific attribute we are interested

document.documentElement.style.setProperty('--color-primary', 'orangered'); // here is the root we see in the style.css file

//attributes
//html attributes are href, class, id, alt, etc that we see inside an html element
// and we can access and change those attributes with js
// will only work for standard properties
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
console.log(logo.designer); // will return undefined
// for example if an immage has an attribute called designer, we wont be able to get it with the above method because its not a standard property of the element, so we use the getAttribute method to get it
console.log(logo.getAttribute('designer')); // will return the content of the attribute

//we can also set these attributes

logo.alt = 'this is the modified logo alt message';

console.log(logo.alt);

// we can also set an attribute
logo.setAttribute('company', 'bankist'); // this will create an attribute of company and est it to bankist
console.log(logo.getAttribute('company'));
console.log(logo.src); // this will give us the absolute url, different to the one we have inside the html, to get it exacty as what we have inside the html we use the getAttribute method
console.log(logo.getAttribute('src'));
// the same happens with the href attributes

const link = document.querySelector('.twitter-link');
// here there will be no difference as the href of each are exactly the same
console.log(link.href);
console.log(link.getAttribute('href'));

const newLink = document.querySelector('.nav__link--btn');
console.log(newLink.href);
console.log(newLink.getAttribute('href'));

// data attributes
logo.setAttribute('data-version-number', '3.0');
//these attributes are a special kind of attributes that start with data
// we access data atributes as follow
console.log(logo.dataset.versionNumber); // we skip the data from the attribute name and type it in camelCase

// classes
logo.classList.add('new-class'); // adds a new class
console.log(logo.classList);
logo.classList.remove('new-class'); // removes a class
console.log(logo.classList);
logo.classList.toggle('toggle'); // inserts and removes the specified class
console.log(logo.classList);
console.log(logo.classList.contains('toggle')); //returns a boolean depending if the element contains the specified class
// we can also set the class of an element by using the className but it will override all the classes it contains so do not use it
logo.className = 'only-1-class';
console.log(logo.classList);
*/

/****************Implementing smooth scrolling ****************/

/*
// old school way of implementing smooth scrolling

// first select the button and the section we want to scroll to
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
//add an event listener on the button
btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect(); // we will get the position of the section 1 element;
  console.log(s1coords);
  console.log(window.pageYOffset);
  //getting current scroll possition

  // console.log('Current scroll (x/y)', pageXOffset, pageYOffset);
  // we can also get the hight and width of the viewport
  // console.log(
  //   'height and width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // // also with the following
  // console.log(
  //   'height and width of the viewport',
  //   window.innerHeight,
  //   window.innerWidth
  // );

  //scrolling

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // pageYOffset will give us how much we have scrolled down while s1ciirds.top will give us the how far the selected element is to the top of the viewport, by adding those together we get the total distance from the begining of the page to where the element is located

  // there is another way of doing this to get a smooth scroll

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // to make smooth behavior we must pass an object containing the desired options

  //modern approach

  section1.scrollIntoView({ behavior: 'smooth' });
});
*/

/****************Event Handlers****************/
/*
const h1 = document.querySelector('h1');

//similar to hover, will start event whenever the mouse enters the element
const alertH1 = function (e) {
  alert('addEventListener: Great! you are reading the heading');
};

h1.addEventListener('mouseenter', alertH1);

// other way to add event listeners, this is an old way of doing this, add event listeners is beter to use
h1.onmouseenter = e => {
  alert('we removed the first event listener');
};

//remove an event listener
// first it must be a named functions that we are passing

h1.removeEventListener('mouseenter', alertH1);
*/

/****************Event propagation: bubling and capturing****************/
/*
// event propagation

// rgb(255,255,255)
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('link', e.target, e.currentTarget);
  console.log(e.currentTarget === this);
  // stop event propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('container', e.target, e.currentTarget);
  console.log(e.currentTarget === this);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('nav', e.target, e.currentTarget);
    console.log(e.currentTarget === this);
  },
  true
);

*/

/****************Event Delegation****************/
/*
// Page Navigation

//without event delegation
// this is not very eficient because we are attaching the same event handler to each element
// If there were more elements it would impact performance because we would be making many copies of the same method

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', e => {
//     if (el.getAttribute('href') == '#') return;
//     console.log(el);
//     e.preventDefault();
//     document;
//     const sectionId = el.getAttribute('href');
//     document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event Delegation
// to do this we must go through 2 steps, first add the event listener to a common parent of all the elements we are interested,  and the second is to determine which element originated the event

// 1. add event listener to common paraent
document.querySelector('.nav__links').addEventListener('click', e => {
  // 2. Identify where the event originated
  if (
    e.target.classList.contains('nav__link') &&
    e.target.getAttribute('href').length > 1
  ) {
    e.preventDefault();
    const sectionId = e.target.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
  }
});
*/

/****************DOM Traversing****************/
/*
// Dom traversing is like walking through the DOM, selecting an element through another element, important when we need to select a direct child

const h1 = document.querySelector('h1');

// going downwards: selecting a child element
console.log(h1.querySelectorAll('.highlight'));
// When using selector like this it will only look for elements inside the h1 element, if there is one with that same class name outside h1, it will not be selected
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'blue';

// going upwards: selecting parents

// To get the direct parent
console.log(h1.parentNode);
console.log(h1.parentElement);

// if we need access to an element that is not a direct parent
// Doing it like this will look for the closes parent element with the specified class, if the class passed to closest is the same as the element is called on, it will return the current element
// the closest method could be looked as the oposite of querySelector
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// going sideways: Selecting siblings, we can only select direct siblings, previous and next

console.log(h1.previousElementSibling); // returns null because there is no previous element
console.log(h1.nextElementSibling);

// there is also a method for nodes

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// to get all siblings we can move to the parent element and get all the children

console.log(h1.parentElement.children);
// we can convert that html collection into an array to later loop it with a forEach
[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

/****************Building a tabbed component****************/

/*
// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  // selecting active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // remove content fo all tabs
  tabsContent.forEach(content => {
    content.classList.remove('operations__content--active');
  });

  // activate content area for current tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');

  // document
  //   .querySelector(`operations__content--${e.target.dataset.tab}`)
  //   .classList.add('operations__content--active');
});
*/

/****************Passing arguments to event handlers****************/

/*
// menu fade animations

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      //changed the opacity to this due to bind
      // if (el !== link) el.style.opacity = opacity;
      if (el !== link) el.style.opacity = this;
    });
    // logo.style.opacity = opacity;
    logo.style.opacity = this;
  }
};

// we can also use the bind method to pass an argument
// nav.addEventListener('mouseover', e => {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', e => {
//   handleHover(e, 1);
// });
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// nav.addEventListener('mouseover', e => {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });
// nav.addEventListener('mouseout', e => {
//   const link = e.target;
//   const links = link.closest('.nav').querySelectorAll('.nav__link');
//   const logo = link.closest('.nav').querySelector('img');

//   links.forEach(el => {
//     el.style.opacity = 1;
//   });
//   logo.style.opacity = 1;
// });
*/

/****************Creating a sticky navigation****************/

/*
// we will add a sticky class which will add css of position: fixed

// the scroll event is available on window

window.addEventListener('scroll', () => {
  if (window.scrollY >= initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/
/****************Intersection Observer API****************/
/*
// First we must create a new intersection observer
const observerCallback = function (entries, observer) {
  // when the target(section1) is intersecting the root(viewport) at the designated threshold this code will run
  entries.forEach(el => {
    // console.log(el);
  });
};

const observerObtions = {
  root: null, // this is where we want the intersection with the target to accur, it could be an element
  threshold: [0, 0.2], // the percentage of intersection at which the intersection will make the callback
};

const observer = new IntersectionObserver(observerCallback, observerObtions);
observer.observe(section1); // section1 here is the target
// implementing sticky navigation with intersection observer API


const stickyNav = function (entries) {
  const [entry] = entries;
  !entry.isIntersecting
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // this is a margin added to the the root in pixels, meaning that the element will end 90 pixels earlier
};
const headerObserver = new IntersectionObserver(stickyNav, obsOptions);

headerObserver.observe(header);
*/

/****************Intersection Observer API implement class to sections****************/
/*
const sectionObsOptions = {
  root: null,
  threshold: 0.15,
};

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
  // entries.forEach(section => {
  //   if (section.isIntersecting) {
  //     section.target.classList.remove('section--hidden');
  //     observer.unobserve(section.target);
  //   }
  // section.classList.remove('section--hidden');
  // });
};

const sectionObserver = new IntersectionObserver(
  revealSection,
  sectionObsOptions
);

sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
*/

/****************Lazy Loading Images****************/
// const images = document.querySelectorAll('img[data-src]'); // we can also use this selector to choose all the images that have the data-src attribute
/*
const imgObsOptions = {
  root: null,
  threshold: 0,
  rootMargin: '-200px', // this is to make the image without the user seeing what is happening
};

const loadImage = function (entries, observer) {
  const [entry] = entries;
  console.log(entries);
  console.log(entry);
  if (!entry.isIntersecting) return;
  if (entry.isIntersecting) {
    entry.target.setAttribute('src', entry.target.dataset.src);
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  }
};
const imageObserver = new IntersectionObserver(loadImage, imgObsOptions);

images.forEach(image => imageObserver.observe(image));
*/

/****************Building a slider component****************/
/*
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotsContainer = document.querySelector('.dots');

  // functions

  const createDots = function (slides) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('dots__dot');
      dot.setAttribute('data-slide', i);
      dotsContainer.append(dot);
    });
  };

  const setActiveDot = function (slide) {
    const dots = document.querySelectorAll('.dots__dot');
    // dots.forEach(dot => dot.classList.remove('dots__dot--active'));
    // dots[currentSlide].classList.add('dots__dot--active'))
    dots.forEach(dot => {
      const { slide: data } = dot.dataset;
      Number(data) === slide
        ? dot.classList.add('dots__dot--active')
        : dot.classList.remove('dots__dot--active');
    });
  };

  const showSlide = function (position) {
    // const dots = document.querySelectorAll('.dots__dot');
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translate(${100 * (i - position)}%)`)
    );
    setActiveDot(currentSlide);
    // dots.forEach(dot =>
    //   Number(dot.id) === currentSlide
    //     ? dot.classList.add('dots__dot--active')
    //     : dot.classList.remove('dots__dot--active')
    // );
  };

  const init = function () {
    createDots(slides);
    showSlide(0);
  };

  const nextSlide = function () {
    currentSlide++;
    if (currentSlide === slides.length) currentSlide = 0;
    showSlide(currentSlide);
  };

  const prevSlide = function () {
    currentSlide--;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    showSlide(currentSlide);
  };

  //event listeners

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // two different ways of doing this
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      currentSlide = Number(e.target.dataset.slide);
      showSlide(currentSlide);
    }
  });

  init();
};

slider();
*/
