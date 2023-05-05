isLoadingPage = false

const initPage = (path) => {
  window.scrollTo(0, 0)
  initTouchMove()
  //запуск функций блоков
  if (document.querySelector('.accordion__req-res')) {
    initAccordionShow()
  }
  if (document.querySelector('#cases')) {
    loadCases()
  }
  if (document.querySelector('#reviews')) {
    loadReviews()
  }
  // обработчики событий для кликов по ссылкам в меню
  if (document.querySelector('#modal-menu')) {
    //подгружать пункты меню
    loadMenuItems(path)
      .then(() => {
        const menuLinks = document.querySelectorAll('.nav-link')

        menuLinks.forEach((link) => {
          function handleLinkClick(event) {
            event.preventDefault()
            const path = link.getAttribute('href')
            if (isLoadingPage && path === window.location.pathname) return false
            // если ссылка ведет на внутреннюю страницу
            if (path.startsWith('/')) {
              // переходим на эту страницу
              isLoadingPage = true
              history.pushState({}, '', path)
              loadPage(path)
              link.removeEventListener('click', handleLinkClick)
            } else {
              // иначе скроллим до якоря на текущей странице
              const anchor = document.querySelector(path)
              if (anchor) {
                const topPosition = anchor.getBoundingClientRect().top
                anchor.scrollIntoView({ behavior: 'smooth' })
                window.scrollTo({ top: topPosition, behavior: 'smooth' })
              }
            }
          }

          // обработчики событий для кликов по ссылкам в меню
          if (!isLoadingPage) {
            link.addEventListener('click', handleLinkClick)
          }
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
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
        fetchPathHtml(path)
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
  loadPage(event.target.location.pathname)

  document.querySelectorAll('.starpage__input').forEach((input) => {
    input.addEventListener(
      'input',
      function (input) {
        myValidations(input.target)

        var inputs = document.querySelectorAll('.inputfile')
        Array.prototype.forEach.call(inputs, function (f) {
          var label = f.nextElementSibling,
            labelVal = label.innerHTML
          f.addEventListener('change', function (e) {
            var fileName = ''
            if (this.files && this.files.length > 1) {
              fileName = (
                this.getAttribute('data-multiple-caption') || ''
              ).replace('{count}', this.files.length)
            } else {
              fileName = e.target.value.split('""').pop()
            }
            if (fileName) {
              label.querySelector('span').innerHTML = fileName
            } else {
              label.innerHTML = labelVal
            }
          })
        })
      },
      false
    )

    input.addEventListener(
      'focusout',
      function (input) {
        if (input.target.value == '') {
          const parent = input.target.parentNode
          if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove()
            parent.classList.remove('error')
          }
        }
      },
      false
    )
  })
})
