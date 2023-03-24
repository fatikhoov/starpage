const initPage = (path) => {
  console.log('init', path)
  window.scrollTo(0, 0)
  initAccordionShow()
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
      console.log('переход по клику:', path)
      if (!path || path === 'undefined') {
        path = window.location.pathname
      }
      console.log('переход по клику - забрал из адреса:', path)
      return path
    })
    .then(() => {
      const fetchPathHtml = () => {
        fetch(`${path}.html`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to load ${path}`)
            }
            console.log('res', response.ok)
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
      console.log('началась проверка:', path)
      if (path === '/' || path === '' || path === '/home' || path === 'index') {
        ;(path = 'home'), history.replaceState({}, '', '/')
        fetchPathHtml()
      } else if (path === '/landing' || path === '/landing.html') {
        ;(path = 'landing'), history.replaceState({}, '', '/landing')
        fetchPathHtml()
      } else if (path === '/business' || path === '/business.html') {
        ;(path = 'business'), history.replaceState({}, '', '/business')
        fetchPathHtml()
      } else if (path === '/ecommerce' || path === '/ecommerce.html') {
        ;(path = 'ecommerce'), history.replaceState({}, '', '/ecommerce')
        fetchPathHtml()
      } else {
        path = '404'
        history.replaceState({}, '', '/404')
        console.log('404 проверка ошибки адреса:', path)
      }
      console.log('Итоговый:', path)
    })
}

// обработчик событий для изменения URL адресной строки
window.addEventListener('popstate', () => {
  console.log('1', window.location.pathname)
  loadPage()
})

// загрузка страницы при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  console.log('2', window.location.pathname)
  loadPage()
})
