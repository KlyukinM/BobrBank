

// КРЕДИТНЫЙ КАЛЬКУЛЯТОР

let moneyValue = 100000
let termValue = 3
let creditRate = 19.9

let moneyContainerCollection = document.getElementsByClassName('money__input__container')
let moneyContainer = moneyContainerCollection[0]

let termContainerCollection = document.getElementsByClassName('term__input__container')
let termContainer = termContainerCollection[0]

let moneySlider = document.querySelector('#money__range')
let termSlider = document.querySelector('#term__range')

let checkBox = document.querySelector('#client__checkbox')

const body = document.querySelector('body')

let areaForMonthlyPayment = document.querySelector('.monthly__payment__result')
let areaForMoneyOption = document.querySelector('.money__option')
let areaForTermOption = document.querySelector('.term__option')
let areaForRateOption = document.querySelector('.rate__option')

// Кредитный калькулятор
function calcCredit() {
    // Получаем актуальную ставку в зависимости от статуса чекбокса
    checkBoxCheck()
    // Считаем аннуитетный ежемесячный платеж 
    let monthlyCreditRate = creditRate / 1200   
    let monthlyPayment = moneyValue * (monthlyCreditRate + monthlyCreditRate / ((1 + monthlyCreditRate) ** (termValue * 12) - 1))
    // Выводим результаты на страницу    
    return areaForMonthlyPayment.innerHTML = `${addSpacesToNumber(Math.floor(monthlyPayment))} Б`,
    areaForMoneyOption.innerHTML = `${addSpacesToNumber(moneyValue)} Б`,
    areaForTermOption.innerHTML = `${correctNameForYears(termValue)}`,
    areaForRateOption.innerHTML = creditRate + '%'    
}

calcCredit()

// Функция для добавления пробелов через каждые 3 знака в цифры
function addSpacesToNumber(number) {
    return new Intl.NumberFormat('ru-RU').format(number)
}

// Меняем поля ввода на строку и обратно 


// Функция перевода поля ввода в строку для moneyInput
function moneyInputToString () {    
    // Ищем поле ввода
    let moneyInput = document.querySelector('.money')
    // Обновляем значение moneyValue и осуществляем проверку его корректности
    // А также боремся с ошибкой moneyValue = null
    moneyInput ? moneyValue = protectionForMoneyInput(moneyInput.value) : moneyValue
    // Получаем из поля значение и добавляем пробелы через каждые 3 знака
    moneyValueString = addSpacesToNumber(moneyValue)   
    // Меняем поле ввода на строку
    moneyContainer.innerHTML = `${moneyValueString} Б`
    // Добавляем класс string для moneyContainer
    moneyContainer.classList.add('string')
    // Вызываем кредитный калькулятор
    calcCredit()
    // Проверяем надо ли увеличить максимальный срок кредита
    bigTermForBigMoney(moneyValue)
    // Двигаем слайдер moneySlider 
    moneySlider.value = moneyValue
    // Возвращаем слушатель событий на слайдеры
    moneySlider.addEventListener('pointermove', moneySliderMove)
    termSlider.addEventListener('pointermove', termSliderMove)      
}

// Функция перевода строки в поле ввода для momoneyInput
function moneyInputBack () {    
    // Добываем значение из строки   
    moneyValue = parseInt(moneyContainer.textContent.replace(/\s/g,''))
    // Удаляем класс string у moneyContainer
    moneyContainer.classList.remove('string')
    // Меняем строку на поле ввода, вставив в нее значение из строки
    moneyContainer.innerHTML = `<input class='money' type="number" name="money" id="money" value="${moneyValue}"></input>`
    // Выключаем слушатель событий на слайдерах
    moneySlider.removeEventListener('pointermove', moneySliderMove) 
    termSlider.removeEventListener('pointermove', termSliderMove) 
}

// Фильтруем поля ввода от ввода лишних символов

function inputFilter (input) {
    if (input) {
        input.addEventListener('keydown', (event) => {
            // Запрещаем ввод лишних символов 
            if ("=-_+`;:'/><,.[]~!@#$%^&*()?}{".indexOf(event.key) != -1) {  
                event.preventDefault()            
            }             
        })    
    }
}

inputFilter(moneyContainer)

inputFilter(termContainer)


// Функция перевода поля ввода в строку для termInput
function termInputToString () {    
    // Ищем поле ввода
    let termInput = document.querySelector('.term')
    // Обновляем значение termInput и осуществляем проверку его корректности
    // А также боремся с ошибкой termValue = null
    termInput ? termValue = protectionForTermInput(termInput.value) : termValue  
    // Меняем поле ввода на строку
    termContainer.innerHTML = `${correctNameForYears(termValue)}`       
    // Добавляем класс string для termInput
    termContainer.classList.add('string')
    // Вызываем кредитный калькулятор
    calcCredit()
    // Двигаем слайдер termSlider 
    termSlider.value = termValue
    // Возвращаем слушатель событий на слайдеры
    moneySlider.addEventListener('pointermove', moneySliderMove)
    termSlider.addEventListener('pointermove', termSliderMove)      
}

// Функция для определения нужного слова после количества лет в строке termInput
function correctNameForYears(years) {
    if (years == 1) {
        return `${years} год`
    } else if (years >= 5) {
        return `${years} лет`
    } else {
        return `${years} года`
    }
}

// Функция перевода строки в поле ввода для termInput
function termInputBack () {    
    // Добываем значение из строки   
    termValue = parseInt(termContainer.textContent)
    // Удаляем класс string у termInput
    termContainer.classList.remove('string')
    // Меняем строку на поле ввода, вставив в нее значение из строки
    termContainer.innerHTML = `<input class='term' type="number" name="term" id="term" value="${termValue}"></input>` 
    // Выключаем слушатель событий на слайдерах
    moneySlider.removeEventListener('pointermove', moneySliderMove) 
    termSlider.removeEventListener('pointermove', termSliderMove)    
}


// Функция - маршрутизатор для кликов
function clickListenerFunction (event) {
    // Ищем поле ввода       
    if (event.target.closest('.money__input__container') && moneyContainer.classList.contains('string')) {
        moneyInputBack()             
    }
    if (!event.target.closest('.money__input__container') && !moneyContainer.classList.contains('string')) {
        moneyInputToString()        
    }
    if (event.target.closest('.term__input__container') && termContainer.classList.contains('string')) {
        termInputBack()             
    }
    if (!event.target.closest('.term__input__container') && !termContainer.classList.contains('string')) {
        termInputToString()        
    }
}

// Функция маршрутизатор для клавиши enter
function keyListenerFunction (event) {
    // Определяем нажатую клавишу
    if (event.key == 'Enter' && !moneyContainer.classList.contains('string')) {
        moneyInputToString()
    }
    if (event.key == 'Enter' && !termContainer.classList.contains('string')) {
        termInputToString() 
    }
}

// Функция включения слушателей событий
function inputCheck() {
    if(moneyContainer) {       
            body.addEventListener('mousedown', clickListenerFunction)
            document.addEventListener('keydown', keyListenerFunction) 
            // Пересчитываем кредит при изменении статуса чекбокса
            checkBox.addEventListener('change', calcCredit)
            // Слайдеры
            moneySlider.addEventListener('mousemove', moneySliderMouseMove)
            termSlider.addEventListener('mousemove', termSliderMouseMove)  
            // Слайдеры для тачскрина
            moneySlider.addEventListener('touchmove', moneySliderMove)
            termSlider.addEventListener('touchmove', termSliderMove)
            // Пересчет в случае любого изменения
            moneySlider.addEventListener('change', moneySliderMove)
            termSlider.addEventListener('change', termSliderMove)
    }     
}


// Меняем значение moneyValue при перемещении слайдера moneySlider
function moneySliderMouseMove (event) {
    // Работаем только при зажатой левой клавише мыши
    if (event.which == 1) {
        moneySliderMove()      
    }
}

function moneySliderMove () {
    moneyValue = moneySlider.value
    // Меняем значение строки moneyInput при перемещении слайдера
    moneyContainer.innerHTML = `${addSpacesToNumber(moneyValue)} Б`
    calcCredit()
    // Проверяем, нужно ли увеличит максимальный срок кредита
    bigTermForBigMoney(moneyValue) 
}

// Меняем значение termValue при перемещении слайдера termSlider
function termSliderMouseMove (event) {
    // Работаем только при зажатой левой клавише мыши
    if (event.which == 1) {
        termSliderMove()       
    }
}

function termSliderMove () {
    termValue = termSlider.value
    // Меняем значение строки termInput при перемещении слайдера
    termContainer.innerHTML = `${correctNameForYears(termValue)}`  
    calcCredit() 
}

inputCheck()

// Увеличиваем возможный срок кредита при сумме от 1 000 000
function bigTermForBigMoney (moneyValue) {
    let termComment = document.querySelector('.term__comment__second')
    if (moneyValue >= 1000000) {
        termComment.innerHTML = '15 лет'
        termSlider.max = 15
    } else {
        termComment.innerHTML = '5 лет'
        termSlider.max = 5
        if (termValue > 5) {
            termValue = 5
            termContainer.innerHTML = `${correctNameForYears(termValue)}`  
        }
    }    
}

// Меняем процентную ставку в зависимости от статуса чекбокса
function checkBoxCheck () {
    checkBox.checked == true ? creditRate = 29.9 : creditRate = 19.9    
}

// Защита от некорректного ввода данных в поле moneyInput
function protectionForMoneyInput (value) {
    // Избавляемся от знаков после запятой
    let moneyValue = Math.floor(value)
    if (moneyValue > 10000000) {
        return moneyValue = 10000000
    } else if (moneyValue < 100000) {
        return moneyValue = 100000
    } else {
        return moneyValue
    }
}

// Защита от некорректного ввода данных в поле termInput
function protectionForTermInput (value) {
    // Избавляемся от знаков после запятой
    let termValue = Math.floor(value)
    if (termValue < 1) {
        return termValue = 1
    } else if (termValue > 5 && moneyValue < 1000000) {
        return termValue = 5
    } else if (termValue > 15 && moneyValue >= 1000000) {
        return termValue = 15
    } else {
        return termValue
    }
}

// Добавляем поля ввода имени и телефона для калькулятора

const reasonList = document.getElementsByName('singleSelect')
const reasonListContainer = document.querySelector('.__select')
const nameInput = document.querySelector('#client__name')
const phoneInput = document.querySelector('#client__phone')
const submitButton = document.querySelector('.submit__button')

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
            event.keyCode = 0
            return false, event.preventDefault()
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
            val = e.target.value.replace(/\D/g, "")
             
            if (clearVal !== 'false' && e.type === 'blur') {
                if (val.length < matrix.match(/([\_\d])/g).length) {
                    e.target.value = ''
                    return;
                }
            }
            if (def.length >= val.length) val = def
            e.target.value = matrix.replace(/./g, function (a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
            })
        }
     
        let phone_inputs = document.querySelectorAll('[data-phone-pattern]')
        for (let elem of phone_inputs) {
            for (let ev of ['input', 'blur', 'focus']) {
                elem.addEventListener(ev, eventCalllback)
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
                event.keyCode = 0
                return false, event.preventDefault()
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

// Работаем с выпадающим списком
if (reasonList.length > 0 && reasonListContainer) {
    
    reasonListContainer.addEventListener('click', () => {
        reasonListContainer.classList.add('active')
        if (reasonListContainer.classList.contains('red')) {
            reasonListContainer.classList.remove('red')
        }
    })
    body.addEventListener('click', (e) => {
        if (reasonList[0].checked && !e.target.closest('.calculator__input__reason')) {
            reasonListContainer.classList.remove('active')
        }
    })
}

// Действия при нажатии кнопки
if(submitButton) {
    
    submitButton.addEventListener('click', (event) => {
        event.preventDefault()
        if (!nameInput.value || !phoneInput.value || reasonList[0].checked) {
            if (!nameInput.value) {
                nameInput.classList.add('red')
            }
            if (!phoneInput.value) {
                phoneInput.classList.add('red')
            }
            if (reasonList[0].checked) {
                reasonListContainer.classList.add('red')
            }            
        } else {
            // Получаем в popup объект 
            const currentPopup = document.getElementById('popup')
            popupOpen(currentPopup)
            event.preventDefault()            
        }
    })
}


// ВЫПАДАЮЩИЙ СПИСОК

const selectSingle = document.querySelector('.__select');
const selectSingle_title = selectSingle.querySelector('.__select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');

if (selectSingle && selectSingle_title && selectSingle_labels) {
    // Выпадающее меню
    selectSingle_title.addEventListener('click', () => {
        if ('active' === selectSingle.getAttribute('data-state')) {
          selectSingle.setAttribute('data-state', '');
        } else {
          selectSingle.setAttribute('data-state', 'active');
        }
      });
      
      // Закрываем меню при выборе пункта
      for (let i = 0; i < selectSingle_labels.length; i++) {
        selectSingle_labels[i].addEventListener('click', (evt) => {
          selectSingle_title.textContent = evt.target.textContent
          selectSingle.setAttribute('data-state', '')          
        });
      }

      // Закрываем список при клике вне списка      
      body.addEventListener('mousedown', closeList)

      function closeList (event) {
        if (!event.target.closest('.__select') && 'active' === selectSingle.getAttribute('data-state')) {
            selectSingle.setAttribute('data-state', '')
        }
      }
}


// ВСПЛЫВАЮЩЕЕ ОКНО

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
        popupText.innerHTML = `<p class="popup__greeting">Спасибо за вашу заявку, ${nameInput.value}!</p>
        <p>Мы рассмотрим ее в ближайшее никогда и обязательно не свяжемся с Вами.</p>
        <p>Ваш номер телефона ${phoneInput.value} мы передали для спам-рассылок нашим партнерам.</p>
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

