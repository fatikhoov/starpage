isLoadingPage = false

const initPage = (path) => {
  console.log('init', path)
  window.scrollTo(0, 0)
  if (document.querySelector('.accordion__req-res')) {
    initAccordionShow()
  }
  if (document.querySelector('.carousel')) {
    initCarouselShow()
  }
  if (document.querySelector('#reviews')) {
    loadReviews()
  }

  // обработчики событий для кликов по ссылкам в меню
  const menuLinks = document.querySelectorAll('.nav-link')

  menuLinks.forEach((link) => {
    function handleLinkClick(event) {
      event.preventDefault()
      const path = link.getAttribute('href')
      if (isLoadingPage && path === window.location.pathname) return false

      console.log('handl', path !== window.location.pathname)
      isLoadingPage = true
      history.pushState({}, '', path)
      loadPage(path)
    }
    if (!isLoadingPage) {
      link.addEventListener('click', handleLinkClick)
    }
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
            isLoadingPage = false
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
        ;(path = 'landing'), history.replaceState({}, '', '/')
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
window.addEventListener('popstate', (event) => {
  const path = event.state.path
  console.log('1 popstate', path, window.location.pathname)
  loadPage(path)
})

// загрузка шаблона страницы при загрузке сайта
window.addEventListener('DOMContentLoaded', (event) => {
  console.log(
    '2 DOMContentLoaded',
    event.target.location.pathname,
    window.location.pathname
  )
  loadPage(event.target.location.pathname)
})
