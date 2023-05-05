const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
function niceBytes(x) {
  let l = 0,
    n = parseInt(x, 10) || 0

  while (n >= 1024 && ++l) {
    n = n / 1024
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]
}

export function uploadInputFile(selector, options = {}) {
  let files = []
  const fileInput = document.getElementById(`${options.form}-${selector}`)
  const preview = document.getElementById(
    `${options.form}-images__file-upload-pre`
  )

  //проверка на атрибуты из опций
  if (options.multi) {
    fileInput.setAttribute('multiple', true)
  }
  if (options.accept && Array.isArray(options.accept)) {
    fileInput.setAttribute('accept', options.accept.join(','))
  }

  //Создаю кнопку открыть и загрузить
  const parent = document.querySelector(`#${options.form}-buttons__file-upload`)
  const elem = {
    name: 'a',
    className: 'btn-quiz btn-file',
    id: `${options.form}-btn-file-open`,
    href: '',
    textContent: 'Приложить фото',
    style: '',
  }

  createAndAppendElems(parent, elem)
  //Триггер открыть загрузчика
  const triggerFileOpen = () => {
    fileInput.click()
  }
  const BtnFileOpen = document.getElementById(`${options.form}-btn-file-open`)
  //Обработка загрузчика
  const changeHandlerInputFile = (event) => {
    //Если файлов нет
    if (!event.target.files.length) {
      return
    }

    //Достаем список файлов
    files = Array.from(event.target.files)
    preview.innerHTML = ''
    files.forEach((file) => {
      if (!file.type.match('image')) {
        return
      }
      const reader = new FileReader()
      reader.onload = (ev) => {
        preview.insertAdjacentHTML(
          'afterbegin',
          `
          <div class="preview-image-file-upload">
          <div class="preview-image-file-remove" data-name-file-remove="${
            file.name
          }">&times;</div>
          <img class="image-file-upload" src="${ev.target.result}" alt="${
            file.name
          }"/>
         
          <div class="preview-image-file-info">
        ${niceBytes(file.size)}
          </div>
         
          </div>
          `
        )
      }

      reader.readAsDataURL(file)
    })
  }

  const removeHandlerFileUploadElem = (event) => {
    if (!event.target.dataset.nameFileRemove) {
      return
    }
    const { nameFileRemove } = event.target.dataset
    files = files.filter((file) => file.name != nameFileRemove)

    const block = preview
      .querySelector(`[data-name-file-remove="${nameFileRemove}"]`)
      .closest('.preview-image-file-upload')
    block.classList.add('removing')
    setTimeout(() => {
      block.remove()
    }, 300)
  }

  //Слушаем открытого загрузчика
  BtnFileOpen.addEventListener('click', triggerFileOpen)
  fileInput.addEventListener('change', changeHandlerInputFile)
  preview.addEventListener('click', removeHandlerFileUploadElem)
}
