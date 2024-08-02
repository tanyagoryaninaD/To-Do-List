(function () { // создаем самовыполняющую функцию
    function createAppTitle(title) { // создаем функцию создания титульника
        let appTitle = document.createElement('h2'); // создаем элемент h2
        appTitle.innerHTML = title; // присваеваем значение функции, чтобы потом могли менять титульник
        return appTitle; // возращаем значение после изменения
    }

    function creatTodoItemForm() { // создаем функцию создания формы
        let form = document.createElement('form'); // создаем элемент формы
        let input = document.createElement('input'); // создаем элемент поля ввода
        let buttonWrapper = document.createElement('div'); // создаем элемент контейнер для кнопки
        let button = document.createElement('button'); // создаем элемент кнопки

        form.classList.add('input-group', 'md-3'); // присваиваем классы для формы
        input.classList.add('form-control'); // присваиваем класс для поля ввода
        input.placeholder = 'Введите название нового дела'; // создаем плейсхолдел для поля ввода
        buttonWrapper.classList.add('input-group-append'); // присваиваем класс для контейнера кнопки
        button.classList.add('btn', 'btn-primary'); // присваиваем классы для кнопки
        button.textContent = 'Добавить дело'; // создаем тект для кнопки
        button.disabled = true; // присваиваем атрибут кнопке
        input.addEventListener('input', function (e) { //добавляем событие на поле ввода
            if (input.value) { // если поле содержит значение
                button.disabled = false; // активность кнопки - отключена
            } else if (!input.value) { // если не содержит занчений
                button.disabled = true; // активность кнопки - включена
            }
        });

        buttonWrapper.append(button); // в контейнер кнопки добавляем кнопку
        form.append(input); // в форму добавляем поле ввода
        form.append(buttonWrapper); // в форму добавляем контейнер кнопки, к котором уже есть кнопка

        return { // возращаем значения после изменения
            form,
            input,
            button,
        }
    }

    function createTodoList() {  // создаем функцию создания списка
        let list = document.createElement('ul'); // создаем элемент ul
        list.classList.add('list-group'); // присваиваем класс для ul
        return list; // возращаем значение после изменения
    }

    function createTodoItem(object) { // создаем функцию создания item с аргументом object
        let item = document.createElement('li'); // создаем элемент li
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'aligh-items-center'); // присваеваем классы для li
        item.textContent = object.name; // присваем текст для li в аргументом {object: name}

        let buttonGroup = document.createElement('div'); // создаем контейнер для кнопок
        let doneButton = document.createElement('button'); // создаем кнопку готово
        let deleteButton = document.createElement('button'); // создаем кнопку удалить

        buttonGroup.classList.add('btn-group', 'btn-group-sm'); //прсваеваем класс для контейнера
        doneButton.classList.add('btn', 'btn-success'); // присваиваем класс для кнопки
        doneButton.textContent = 'Готово'; // добавляем текст кнопке
        deleteButton.classList.add('btn', 'btn-danger'); // присваиваем класс для кнопки
        deleteButton.textContent = 'Удалить';// добавляем текст кнопке

        buttonGroup.append(doneButton); // добавляем в контейнер кнопку "готово"
        buttonGroup.append(deleteButton); // добавляем в контейнер кнопку "удалить"
        item.append(buttonGroup); // добавляем в item контейнер с кнопками

        return { // возращаем значения после изменения
            item,
            doneButton,
            deleteButton,
        };
    }

    function createTodoApp(container, title = 'Список дел', listName) { // создаем функцию, которая добавляет все функции в контейнер с заготовком "Список дел", если оно не будет задано

        let todoAppTitle = createAppTitle(title); // вызываем фунцию создания титульника
        let todoItemForm = creatTodoItemForm(); // вызываем фунцию создания формы
        let todoList = createTodoList(); // вызываем фунцию создания списка
        let arrayList = []; // создаем массив

        container.append(todoAppTitle); // добавляем в контейнер тутульник
        container.append(todoItemForm.form); //добавляем в контейнер форму
        container.append(todoList); // добавляем в контейнер список

        let ObjGet = localStorage.getItem(listName); // получаем данные по ключу с определенной страницы 
        let ArrayGet = JSON.parse(ObjGet); // присваиваем переменную для получанного массива

        function showSaveArray() {
            for (let i = 0; i < ArrayGet.length; i++) { // перебираем массив
                let object = ArrayGet[i]; // присваиваем переменную для объекта
                let todoSaveItem = createTodoItem(object);  // присваиваем переменную для формулы создания li для объекта

                if (object.done) { // если свойство = true
                    todoSaveItem.item.classList.add('list-group-item-success'); //добавляем класс 
                }

                todoSaveItem.doneButton.addEventListener('click', function () { // обработчик событий при клике на кнопку
                    todoSaveItem.item.classList.toggle('list-group-item-success'); // доабвляется класс
                    let itemDone = arrayList.findIndex(item => item.id === object.id); // ищем по id сравнивая 
                    if (itemDone !== -1) { 
                        arrayList[itemDone].done = !arrayList[itemDone].done; // ставим значение как и у item с классом
                        localStorage.setItem(listName, JSON.stringify(arrayList)); // чтобы обновился в апликейшн
                    }
                });

                todoSaveItem.deleteButton.addEventListener('click', function () { // обработчик событий при клике на кнопку
                    if (confirm('Вы уверены?')) { // спрашивает пользователя "да" или "отмена"
                        todoSaveItem.item.remove(); // при согласии item(дело) удаляется
                        let itemDelete = arrayList.findIndex(item => item.id === object.id); // ищем по id сравнивая    
                        if (itemDelete !== -1) {
                            arrayList.splice(itemDelete, 1); // удаляем несовпадение из массива
                        }
                        arrayList.map((item, index) => { // создаем новый массив чтобы заменить id, чтобы они шли по порядку
                            item.id = index + 1; 
                            return item;
                        });
                        localStorage.setItem(listName, JSON.stringify(arrayList)); // чтобы обновился в апликейшн
                    }
                });

                todoList.append(todoSaveItem.item); // добавляем в лист сохраненый item
                arrayList.push(object); // доюавляем объект в массив
            }
        }

        window.onload = showSaveArray;

        todoItemForm.form.addEventListener('submit', function (e) { // обработчик событий при отправке формы
            e.preventDefault(); // предотвращает обновление страницы

            if (!todoItemForm.input.value) { // если нет значения в поле ввода
                return; // функция прекращается
            }

            function getId() { // функция определения макисмального числа
                let maxId = 0; // задаем значение равное 0
                for (let i = 0; i < arrayList.length; i++) { // перебираем массив
                    // сonsole.log(arrayList[i].id)
                    if (arrayList[i].id > maxId) { // если текущий id больше 
                        maxId = arrayList[i].id; // то максимальный id ставноиться равным текущему id
                    }
                }
                return maxId;
            }

            let object = { // объявляем переменную
                name: todoItemForm.input.value, // то что вводят в поле ввода
                done: false, // устанавливает, что дело не завершено 
                id: getId() + 1, // вызывает функцию определения макксимального id и прибавляет к нему 1 для создания нового
            };

            let todoItem = createTodoItem(object); // вызываем функцию создания дела

            todoItem.doneButton.addEventListener('click', function () { // обработчик событий при клике на кнопку
                todoItem.item.classList.toggle('list-group-item-success'); // доабвляется класс
                let itemDone = arrayList.findIndex(item => item.id === object.id); // ищем по id сравнивая 
                if (itemDone !== -1) {
                    arrayList[itemDone].done = !arrayList[itemDone].done; // ставим значение как и у item с классом
                    localStorage.setItem(listName, JSON.stringify(arrayList)); // чтобы обновился в апликейшн
                }
            });

            todoItem.deleteButton.addEventListener('click', function () { // обработчик событий при клике на кнопку
                if (confirm('Вы уверены?')) { // спрашивает пользователя "да" или "отмена"
                    todoItem.item.remove(); // при согласии item(дело) удаляется
                    let itemDelete = arrayList.findIndex(item => item.id === object.id); // ищем по id сравнивая 
                    if (itemDelete !== -1) {
                        arrayList.splice(itemDelete, 1); // удаляем несовпадение из массива
                    }
                    arrayList.map((item, index) => { // создаем новый массив чтобы заменить id, чтобы они шли по порядку
                        item.id = index + 1; 
                        return item;
                    });
                    localStorage.setItem(listName, JSON.stringify(arrayList)); // чтобы обновился в апликейшн
                }
            });

            todoList.append(todoItem.item); // в list добавляем li 
            arrayList.push(object); // добравляем объект в массив
            localStorage.setItem(listName, JSON.stringify(arrayList)); // чтобы обновлялся в апликейшн при добавлении новой задачи

            todoItemForm.input.value = ''; // после добавления из поля ввода в list, оно становится пустым
        });

    };

    window.createTodoApp = createTodoApp; // чтобы функция запускалась в окне браузера, а не на страницах

})();
