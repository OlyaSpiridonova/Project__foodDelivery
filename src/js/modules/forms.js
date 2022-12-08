import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    // Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо, скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindpostData(item);
    });

    function bindpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
            form.insertAdjacentElement('afterend', statusMessage); // Метод insertAdjacentElement() добавляет переданный элемент в DOM-дерево относительно элемента, вызвавшего метод.

            /*const request = new XMLHttpRequest();
            request.open('POST', 'server.php'); */

            /* request.setRequestHeader('Content-type', 'multipart/form-data'); */ // Когда используется связка XMLHttpRequest + FormData загаловок устанавливается автоматически браузером, сомостоятельно это прописываит не нужно, так как произойдет ошибка

            // Для передачи данных в формате JSON необходим уже заголовок

            /* request.setRequestHeader('Content-type', 'application/json'); */

            // Специальный объект, который с определенной формы быстро позволяет сформировать все данные, которые заполнил пользователь, формирует также данные в формате ключ - значение FormData(form - сюда помещается форма, из которой нужно сформировать данные)
            const formData = new FormData(form);

            /* const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            }); */

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // fetch замена XMLHttpRequest, работает на промисах
            /*             fetch('server.php', {
                            method: "POST",
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(object)
                        }) */

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });


            /* const json = JSON.stringify(object); */
            /* request.send(json); */
            /* request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
    
            }); */

        });
    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;