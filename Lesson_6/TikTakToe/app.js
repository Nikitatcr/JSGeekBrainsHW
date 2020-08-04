/**
 * У МЕНЯ ПОЧЕМУ-ТО НЕ СЛУШАЕТ КЛИКИ.УЖЕ ВСЁ ПЕРЕПРОВЕРИЛ ПО СТО РАЗ!
 */

'use strict';

let ticTakToe = {
    gameTableElement: document.getElementById('game'),
    status: 'playing',
    mapValues: [
        ['','',''],
        ['','',''],
        ['','',''],
    ],
    phase: 'X',

    /**
     * Инициализация игры
     */
    init(){
        //выводим все ячейки
        this.renderMap();
        //Инициализаиця обработчиков событий
        this.initEventHandlers();
    },

    /**
     * Вывод ячеек в html
     */
    renderMap() {
        for(let row = 0; row < 3;row++){
            const tr = document.createElement('tr'); //Почему здесь 'tr' в кавычках,
            this.gameTableElement.appendChild(tr); //а здесь без кавычек?
            for(let col = 0; col < 3; col++) {
                let td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.com = col.toString();
                tr.appendChild(td);
            }
        }
    },

    /**
     * Инициализация обработчиков событий
     */

    initEventHandlers(){
        //ставим обработчик, при клике натаблицу вызовется функция this.cellClickHandler.
        this.gameTableElement.addEventListener('click',event => this.cellClickHandler(event))
    },

    /**
     * Обработчик события клика
     * @param {MouseEvent} event
     */
    cellClickHandler(event) {
        //Если клик не нужно обрабатывать, уходим из функции
        if(!this.isCorrectClick(event)){
            return;
        }

        //Заполняем ячейку
        this.fillCell(event);
        if(this.hasWon()) {
            //ставим статус в "остановлено".
            this.setStatusStopped();
            //сообщаем о победе пользователя.
            this.sayWonPhrase();
        }

        //Меняем фигуру (крестик или нолик).
        this.togglePhase();
    },



    /**
     * Проверка был ли корректный клип, что описан в событии event
     * @param {Event}event
     * @return {boolean} Вернёт true в случае если статус игры "играем", клик, что описан в объекте event
     * был по ячейке и ячейка куда был произведен клип по пустой ячейке
     */

    isCorrectClick(event) {
        return this.isStatusPlaying() && this.isClickByCell(event) && this.isCellEmpty(event);
    },

    /**
     * Проверка что мы "играем", что игра не закончена.
     * @return {boolean} Вернёт true, статус игры "играем" , иначе false.
     */
    isStatusPlaying(){
        return this.status === 'playing';
    },

    /**
     * Проверка, что клип был по ячейке.
     * @param {event}event
     * @param {HTMLElement}event.target
     * @return {boolean} Вернёт true, если клик был по ячейке, иначе false.
     */
    isClickByCell(event){
        return event.target.tagName === 'TD';
    },


    /**
     * Проверка что в ячейку не ставили значение (крестик или нолик)
     * @param {Event} event
     * @param {HTMLElement} event.target
     * @return {boolean} Вернёт true, если ячейка пуста, иначе false
     */
    isCellEmpty(event) {
        //Получаем строку и колонку куда кликнули.
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        return this.mapValues[row][col] === '';
    },

    /**
     * Заполняет ячейку, в которую кликнул пользователь в событии event.
     * @param event
     */
    fillCell(event){
        //Получаем строку и колонку, куда кликнули
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        //Заполняем ячейку и ставим значение в массиве, в свойстве mapValues.
        this.mapValues[row][col] = this.phase;
        event.target.textContent = this.phase;
    },

    /**
     * Проверка, есть ли выигрышная ситуация на карте.
     * @returns {boolean} Вернёт true, если игра выиграна, иначе false
     */

    hasWon() {
        return this.isLineWon({x:0,y:0},{x:1,y:0},{x:2,y:0})||
            this.isLineWon({x:0,y:1},{x:1,y:1},{x:2,y:1})||
            this.isLineWon({x:0,y:2},{x:1,y:2},{x:2,y:2})||

            this.isLineWon({x:0,y:0},{x:0,y:1},{x:0,y:2})||
            this.isLineWon({x:1,y:0},{x:1,y:1},{x:1,y:2})||
            this.isLineWon({x:2,y:0},{x:2,y:1},{x:2,y:2})||

            this.isLineWon({x:0,y:0},{x:1,y:1},{x:2,y:2})||
            this.isLineWon({x:0,y:2},{x:1,y:1},{x:2,y:0});
    },

    /**
     * Проверка, есть ли выигрышная ситуация на линии
     * @param {{x:int, y:int}} a 1-ая ячейка
     * @param {{x:int, y:int}} b 2-ая ячейка
     * @param {{x:int, y:int}} c 3-ья ячейка
     * @return {boolean} Вернёт true, если линия выигрына, иначе false.
     */
    isLineWon(a,b,c) {
        let value = this.mapValues[a.y][a.x] + this.mapValues[b.y][b.x] + this.mapValues[c.y][c.x];
        return value === 'XXX' || value === '000';
    },

    /**
     * Ставит статус игры в "остановлена"
     */
    setStatusStopped() {
        this.status = 'stopped';
    },

    /**
     * Сообщает о победе
     */
    sayWonPhrase() {
        let figure = this.phase === 'X' ? 'Крестики' : 'Нолики';
        alert(`${figure} выиграли!`);
    },

    /**
     * Меняет фигуру (крестик или нолик)
     */
    togglePhase(){
        this.phase = this.phase === 'X' ? '0' : 'X';
    },
};

//Запускаем игру при полной загрузке страницы.

window.addEventListener('load',ticTakToe.init.bind(ticTakToe));