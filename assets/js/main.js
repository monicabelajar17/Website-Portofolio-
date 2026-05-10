/* Contoh helper splitText yang biasanya ada di tutorial */
function splitText(selector, options) {
    const element = document.querySelector(selector);
    element.innerHTML = element.textContent.replace(/\S/g, "<span class='char'>$&</span>");
    return {
        chars: element.querySelectorAll('.char')
    };
}

/*=============== HOME SPLIT TEXT ===============*/
const { animate, text, stagger } = anime

const { chars: chars1 } = splitText('.home__profession-1', { chars: true})
const { chars: chars2 } = splitText('.home__profession-2', { chars: true})

animate(chars1, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
})

animate(chars2, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
})

/*=============== SWIPER PROJECTS ===============*/
const swiperProjects = new Swiper('.projects__swiper', {
  loop: true,
  spaceBetween: 24,
  slidesPerView: 'auto',
  grabCursor: true,
  speed: 600,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  }
})

/*=============== WORK TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetSelector = tab.dataset.target,
          targetContent = document.querySelector(targetSelector)

    // Disable all content and active tabs
    tabContents.forEach((content) => content.classList.remove('work-active'))
    tabs.forEach((t) => t.classList.remove('work-active'))

    // Active the tab and corresponding content
    tab.classList.add('work-active')
    targetContent.classList.add('work-active')
  })
})

/*=============== SERVICES ACCORDION ===============*/
const servicesButtons = document.querySelectorAll('.services__button')

servicesButtons.forEach(button => {
  // Add your height to services info
  const heightInfo = document.querySelector('.services__info')
  heightInfo.computedStyleMap.height = heightInfo.scrollHeight + 'px'

  button.addEventListener('click', () => {
    const servicesCards = document.querySelectorAll('.services__card'),
          currentCard = button.parentNode,
          currentInfo = currentCard.querySelector('.services__info'),
          isCardOpen = currentCard.classList.contains('services-open')

    // Close All other services info
    servicesCards.forEach(card => {
      card.classList.replace('services-open', 'services-close')

      const info = card.querySelector('.services__info')
            info.computedStyleMap.height = '0'
    })

    // Open only if not already open
    if(!isCardOpen){
      currentCard.classList.replace('services-close', 'services-open')
      currentInfo.computedStyleMap.height = currentInfo.scrollHeight + 'px'
    }
  })
})

/*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/
// Duplicate images to make the animation work
const tracks = document.querySelectorAll('.testimonials__content')

tracks.forEach(track => {
  const cards = [...track.children] // spread to make a static copy

  // Duplicate cards only once
  for (const card of cards) {
    track.appendChild(card.cloneNode(true))
  }
})

/*=============== COPY EMAIL IN CONTACT ===============*/
const copyBtn = document.getElementById('contact-btn'),
      copyEmail = document.getElementById('contact-email').textContent

copyBtn.addEventListener('click', () => {
  // Use the clipboard API to copy text
  navigator.clipboard.writeText(copyEmail).then(() => {
    copyBtn.innerHTML = 'Email copied <i class="ri-check-line"></i>'

    // Restore the original text
    setTimeout(() => {
      copyBtn.innerHTML = 'Copy email <i class="ri-file-copy-line"></i>'
    }, 2000)
  })
})

/*=============== CURRENT YEAR OF THE FOOTER ===============*/ 
const textYear = document.getElementById('footer-year'),
      currentYear = new Date().getFullYear()

// Each year it is updated to the current year
textYear.textContent = currentYear

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  // We get the position by scrolling down
  const scrollY = window.scrollY

  sections.forEach(section => {
    const id = section.id, // id for each section
          top = section.offsetTop - 50, // Distance from the top edge
          height = section.offsetHeight, // Element height
          link = document.querySelector('.nav__menu a[href*=' + id +']') // id nav link 

    if(!link) return

    link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
  })
}
window.addEventListener('scroll', scrollActive)

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.cursor')
let mouseX = 0, mouseY = 0 // Store mouse position

const cursorMove = () => {
  // Position the cursor
  cursor.style.left = `${mouseX}px`
  cursor.style.top = `${mouseY}px`
  cursor.style.transform = 'translate(-50%, -50%)'

  // Update the cursor animation
  requestAnimationFrame(cursorMove)
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

cursorMove()

/* Hide custom cursor on links */
const a = document.querySelectorAll('a')

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hide-cursor')
  })
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hide-cursor')
  })
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 300,
  reset: true, // Animate repeat
})

sr.reveal(`.home__image, .projects__container, .work__container, .testimonials__container, .contact__container`)
sr.reveal(`.home__data`), {delay: 900, origin: 'bottom'}
sr.reveal(`.home__info`), {delay: 1200, origin: 'bottom'}
sr.reveal(`.home__social .home__cv`, {delay: 1500})
sr.reveal(`.about__data`, {origin: 'left'})
sr.reveal(`.about__image`, {origin: 'right'})
sr.reveal(`.services__card`, {interval: 100})

const modal = document.getElementById("projectModal")

const title = document.getElementById("modalTitle")
const subtitle = document.getElementById("modalSubtitle")
const desc = document.getElementById("modalDesc")
const img = document.getElementById("modalImg")

document.querySelectorAll(".open-project").forEach(btn => {
   btn.addEventListener("click", function(e){
      e.preventDefault()

      title.textContent = this.dataset.title
      subtitle.textContent = this.dataset.subtitle
      desc.textContent = this.dataset.desc
      img.src = this.dataset.img

      modal.style.display = "flex"
   })
})

document.querySelector(".close-modal").onclick = () =>{
   modal.style.display = "none"
}

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu Muncul */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu Sembunyi (Klik Tombol X) */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* Menu Sembunyi Saat Link Diklik */
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // Saat kita klik setiap nav__link, kita hapus class show-menu
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))