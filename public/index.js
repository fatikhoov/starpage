const initPage = (path) => {
  console.log('init', path)
  window.scrollTo(0, 0)
  if (document.querySelector('.accordion__req-res')) {
    initAccordionShow()
  }
  if (document.querySelector('.carousel')) {
    initCarouselShow()
  }

  // обработчики событий для кликов по ссылкам в меню
  const menuLinks = document.querySelectorAll('.nav-link')
  menuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      const path = link.getAttribute('href')
      history.pushState({}, '', path)
      loadPage(path)
    })
  })
}

function loadPage(path) {
  fetch('/index.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load index.html`)
      }
      if (!path || path === 'undefined') {
        path = window.location.pathname
      }
      return path
    })
    .then((path) => {
      const fetchPathHtml = (path) => {
        fetch(`${path}.html`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to load ${path}`)
            }
            return response.text()
          })
          .then((html) => {
            document.querySelector('#content').innerHTML = html
            initPage(path)
          })
          .catch((error) => {
            console.error(error)
            fetch('/404.html')
              .then((response) => response.text())
              .then((html) => {
                document.querySelector('#content').innerHTML = html
              })
              .catch((error) => {
                console.error(error)
              })
          })
      }
      if (path === '/' || path === '' || path === '/home' || path === 'index') {
        ;(path = 'home'), history.replaceState({}, '', '/')
        fetchPathHtml(path)
      } else if (path === '/landing' || path === '/landing.html') {
        ;(path = 'landing'), history.replaceState({}, '', '/landing')
        fetchPathHtml(path)
      } else if (path === '/business' || path === '/business.html') {
        ;(path = 'business'), history.replaceState({}, '', '/business')
        fetchPathHtml(path)
      } else if (path === '/ecommerce' || path === '/ecommerce.html') {
        ;(path = 'ecommerce'), history.replaceState({}, '', '/ecommerce')
        fetchPathHtml(path)
      } else {
        path = '404'
        history.replaceState({}, '', '/404')
      }
    })
}

// обработчик событий для изменения URL адресной строки
window.addEventListener('popstate', () => {
  console.log('1', window.location.pathname)
  loadPage()
})

// загрузка шаблона страницы при загрузке сайта
window.addEventListener('DOMContentLoaded', () => {
  console.log('2', window.location.pathname)
  loadPage()
})
