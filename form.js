    // Form

    let message = { // Создали объект со статусами
        loading: "Загрузка...",
        success: "Спасибо. Наш менеджер скоро с вами свяжиться",
        erorr: 'Ошибка'
    };

    let form = document.querySelector('.main-form'), // Получаем эементы
        input = document.querySelectorAll('input'),
        formBottom = document.getElementById('form'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status'); // Добовляем класс

    function sendForm(elem) {
        elem.addEventListener('submit', function (event) { // Если мы отправляем форму, работаем с формой а не с кнопкой
            event.preventDefault(); // Отменяем стандартное поведение браузера, не перезагружаем стр.
            elem.appendChild(statusMessage); // Помещаем созданный элемент в конец нашей формы

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php'); // метод передачи данных; url
            // request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // Настраиваем заголовок
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            let formData = new FormData(elem); //  Создали объект, куда записались наши данные , который ввел пользователь, ключ со значением, ключ это атрибут name  в нашей верстке

            let obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);

            request.send(json); // Тело нашей формы



            request.addEventListener('readystatechange', function () { // проверяем статус, в каком он состоянии
                if (request.readyState < 4) {
                    statusMessage.textContent = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.textContent = message.success;
                } else {
                    statusMessage.textContent = message.erorr;
                }
            });
            for (let i = 0; i < input.length; i++) { // Отчищаем инпут, после отправки
                input[i].value = '';
            }
        });
    };
    sendForm(form);
    sendForm(formBottom);
