// Показываем загруженный контент
window.onload = function () {
    let hideElement = document.querySelector('.hide')
    let loadingPage = document.querySelector('.loader')

    if (hideElement) {
        hideElement.classList.remove('hide')
    }

    if (loadingPage) {
        loadingPage.classList.add('hide')
    }

    // ПРИЛИПАЮЩЕЕ МЕНЮ

    window.onscroll = function() {stickyMenu()}

    let navbar = document.querySelector('.navigation')

    if (navbar) {
        let sticky = navbar.offsetTop

        function stickyMenu() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky")
        }
        }
    }
}



// Спойлер и форма ввода

const submitButton = document.querySelector('.submit__button')
const spoiler = document.querySelector('.spoiler')
const nameInput = document.querySelector('#client__name')
const phoneInput = document.querySelector('#client__phone')

if (submitButton) {  
  submitButton.addEventListener('click', (event) => {
    event.preventDefault()
    if (!spoiler.classList.contains('open')) {
      spoiler.classList.add('open')      
    } else {
      if (!nameInput.value || !phoneInput.value) { 
        if (!nameInput.value) {
          nameInput.classList.add('red')
        }
        if (!phoneInput.value) {
            phoneInput.classList.add('red')
        }
      } else {
        const currentPopup = document.getElementById('popup')
        popupOpen(currentPopup)
        event.preventDefault()
        nameInput.disabled = true
        phoneInput.disabled = true
      }
    }
  })
}



if (phoneInput) {   

  // Снимаем покраснение, если обнаружено
  phoneInput.addEventListener('click', () => {
      if (phoneInput.classList.contains('red')) {
          phoneInput.classList.remove('red')
      }
  })

  phoneInput.addEventListener('keydown', (event) => {
      // Запрещаем отправку формы при нажатии Enter
      if (event.keyCode === 13) {                
          event.keyCode = 0;
          return false, event.preventDefault();
      }
  })

  // Запускаем скрипт форматирования номера
  document.addEventListener("DOMContentLoaded", function () {

      let eventCalllback = function (e) {
   
          let el = e.target,
          clearVal = el.dataset.phoneClear,
          pattern = el.dataset.phonePattern,
          matrix_def = "+7(___) ___-__-__",
          matrix = pattern ? pattern : matrix_def,
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = e.target.value.replace(/\D/g, "");
           
          if (clearVal !== 'false' && e.type === 'blur') {
              if (val.length < matrix.match(/([\_\d])/g).length) {
                  e.target.value = '';
                  return;
              }
          }
          if (def.length >= val.length) val = def;
          e.target.value = matrix.replace(/./g, function (a) {
              return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
          });
      }
   
      let phone_inputs = document.querySelectorAll('[data-phone-pattern]');
      for (let elem of phone_inputs) {
          for (let ev of ['input', 'blur', 'focus']) {
              elem.addEventListener(ev, eventCalllback);
          }
      }
  });
}

if (nameInput) {   
  // Снимаем покраснение, если обнаружено
  nameInput.addEventListener('click', () => {
      if (nameInput.classList.contains('red')) {
          nameInput.classList.remove('red')
      }
  })

  nameInput.addEventListener('keydown', (event) => {       
          // Запрещаем ввод любых символов, кроме букв и пробелов 
          if ("1234567890=-_+`;:'/><,.[]~!@#$%^&*()?}{".indexOf(event.key) != -1) {  
              event.preventDefault()            
          }
          // Запрещаем отправку формы при нажатии Enter
          if (event.keyCode === 13) {                
              event.keyCode = 0;
              return false, event.preventDefault();
          }
          // Форматируем данные в поле ввода        
          if (nameInput.value) {
              let nameString = nameInput.value.toLowerCase()
              let arrString = nameString.split(/\s+/)
              // Разрешаем форматирование только после набора более 1 буквы в последнем слове для избегания ошибки
              if (arrString[arrString.length - 1].length >= 1) {
                let newString = nameString.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')
                return nameInput.value = newString
              }
              
          }
  })
}


// ВСПЛЫВАЮЩЕЕ ОКНО

const body = document.querySelector('body')

const lockPadding = document.querySelectorAll('.lock-padding')

// Переменная необходимая для предотвращения двойных нажатий
let unlock = true

// Значение длительности анимации взятое с CSS свойства transition
const timeout = 800



// Вешаем событие на ссылки для закрытия окон
const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i]
        el.addEventListener('click', e => {
            // Функция popupClose будет искать ближайший объект с классом popup, чтобы закрыть его
            popupClose(el.closest('.popup'))
            e.preventDefault()
        })
    }
}

// Функция открытия всплывающих окон
function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        // Заполняем попап окно текстом
        const popupText = document.querySelector('.popup__text__container')
        popupText.innerHTML = `<p class="popup__greeting">Здравствуйте, ${nameInput.value}!</p>
        <p>Мы тут посмотрели на Вас и решили, что никаких карточек Вам давать нельзя.</p>
        <p>До свидания!</p>
        <p class="popup__signature">С уважением, Ваш БОБРБАНК</p>`

        const popupActive = document.querySelector('.popup.open')
        // На случай ссылки на всплывающее окно в другом всплывающем окне
        // Проверяем есть ли уже открытое окно на момент нажатия ссылки на новое
        if (popupActive) {
            // Если есть, закрываем его и запрещаем выполнять bodyUnLock()
            popupClose(popupActive, false)
        } else {
            // Блокируем скролл контента под окном
            bodyLock()
        }
        currentPopup.classList.add('open')
        currentPopup.addEventListener('click', e => {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'))
            }
        })
    }
}

// Передаем в функцию открытое всплывающее окно, ранее присвоенное переменной popupActive
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open')
        if (doUnlock) {
            bodyUnLock()
        }
        // Очищаем форму
        
    }
}

function bodyLock() {
    // Высчитываем разницу между шириной экрана и шириной объекта, находящемся на нем
    // Делается это, чтобы получить ширину скролла
    // Без этого при открытии выпадающего окна будет происходить сдвиг контента из-за исчезновения скролла справа
    const lockPaddingValue = window.innerWidth - document.querySelector('.content').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i]
            // добавляем высчитанное выше значение lockPaddingValue в качестве padding-right ко всем объектам
            // с классом lock-padding, которые мы получили в начале
            el.style.paddingRight = lockPaddingValue
        }
    }
    // А также добавляем его к body
    body.style.paddingRight = lockPaddingValue
    // Убираем скролл при добавлении класса lock к body
    // Для этого в CSS пишем body.lock { overflow: hidden; }
    body.classList.add('lock')

    // Блокируем переменную unlock на время анимации, чтобы не реагировать на двойные клики
    // В противном случае можно словить ошибку скролла, который не исчезнет
    unlock = false
    setTimeout(function () {
        unlock = true
    }, timeout)
}

// Разблокировка скролла происходит с задержкой, чтобы избежать дергания всплывающего окна при закрытиии
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i]
                el.style.paddingRight = '0px'
            }
        }
        body.style.paddingRight = '0px'
        body.classList.remove('lock')
    }, timeout)

    unlock = false
    setTimeout(function () {
        unlock = true
    }, timeout)
}

// Добавляем возможность закрытия всплывающего окна клавишей Esc

// Для этого вешаем слышатель событий на все клавиши
document.addEventListener('keydown', e => {
    // И если нажата клавиша с кодом 27, то происходит закрытие всплывающего окна
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open')
        popupClose(popupActive)
    }
})
