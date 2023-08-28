`use strict`;

const selectEl = document.querySelector(`.js-select`);

// ищем наименьший индекс в массиве относительно значения index
function getLeastPrevIndex(index, array) {
  // значение по умолчанию -1 (не найдено), потому что первый элемент имеет индекс 0
  let leastIndex = -1;
      
  for(const el of array) {
    if(Number(el.dataset.index) > index) break;
    leastIndex++;
  }
  
  return leastIndex;
  
}

class CustomMultipleSelect {
  constructor(elem, options) {
    this._originSelect = elem;
    this._originOptions = Array.from(this._originSelect);
    
    // создаём массив оригинальных текстовых значений элементов option
    this.textValues = this._originOptions.map(option => {
      const { textContent: text, selected } = option;
      return { text, selected };
    });
    
    // создаём экземпляр кастомного селекта
    this._coverSelect = this.createCoverSelect();
    
    // прячем оригинальный селект
    this._originSelect.hidden = `true`;
    
    // добавляем кастомный селект вместо оригинального
    this._originSelect.insertAdjacentElement(`afterend`, this._coverSelect);
    this.setOptgroupPosition = this.setOptgroupPosition.bind(this);
  }
  
  // метод создания кастомного селекта
  createCoverSelect() {
    this.wrapperEl = document.createElement(`div`);
    this.fieldEl = document.createElement(`input`);
    this.selectedOptListEl = document.createElement(`ul`);
    this.optListEl = document.createElement(`ul`);
    
    this.wrapperEl.className = `cover-select`;
    this.fieldEl.className = `cover-select__input`;
    this.optListEl.className = `cover-select__optgroup`;
    this.selectedOptListEl.className = `cover-select__optgroup_selected`;
    
    // обработчик кликов для выбора вариантов селекта
    const onChangeOriginSelectItemClick = (ev) => {
      if(!ev.target.classList.contains(`js-cover-option`)) return;

      const index = Number(ev.target.dataset.index);
      this.toggleOption(index);
      this.setOptgroupPosition();
    }
    
    // обработчик для сортировки списка вариантов селекта на основании введённого в поле поиска значения
    const onSortOptionsFieldKeyup = (ev) => {
      const fieldValue = ev.target.value.toLowerCase();
      this._coverOptions.forEach(option => {
        option.textContent.toLowerCase().startsWith(fieldValue) && option.dataset.selected ? option.classList.remove(`cover-select__option_hidden`) : option.classList.add(`cover-select__option_hidden`);
      });
      
      this.setOptgroupPosition();
    }
    
    // обработчики отображения/скрытия списка вариантов
    const onShowOptgroupFieldFocus = () => {
      this.showCoverOptgroup();
    };
    
    const onHideOptgroupWindowClick = ev => {
      if(!ev.target.closest(`.cover-select`)) this.hideCoverOptgroup();
    };

    this.optListEl.addEventListener(`click`, onChangeOriginSelectItemClick);
    this.selectedOptListEl.addEventListener(`click`, onChangeOriginSelectItemClick);
    this.fieldEl.addEventListener(`keyup`, onSortOptionsFieldKeyup);
    this.fieldEl.addEventListener(`focus`, onShowOptgroupFieldFocus);
    window.addEventListener(`click`, onHideOptgroupWindowClick);
    
    // создаём массив вариантов селекта
    this._coverOptions = this.textValues.map(({ text, selected }, index) => {
      const li = document.createElement(`li`);
      li.classList.add(`cover-select__option`, `js-cover-option`);
      li.dataset.index = index;
      li.dataset.selected = selected;
      li.textContent = text;
      
      return li;
    });
    
    // добавляем варианты в список
    this._coverOptions.forEach(item => this.optListEl.append(item));

    this.wrapperEl.append(this.fieldEl, this.selectedOptListEl, this.optListEl);

    return this.wrapperEl;
  }
  
  toggleOption(index) {
    const originOption = this._originSelect[index];
    const coverOption = this._coverOptions[index];
    
    originOption.selected = !originOption.selected;
    coverOption.dataset.selected = originOption.selected;
    this.setSelectedList(index, originOption.selected);
  }
  
  // позиционируем список вариантов в зависимости от положения относительно окна браузера
  setOptgroupPosition() {
    const windowHeight = document.documentElement.clientHeight;
    const coverSelectFullHeight = this.wrapperEl.offsetHeight + this.optListEl.offsetHeight;
    const coverSelectTop = this.wrapperEl.getBoundingClientRect().top;
    const coverSelectBottomPos = coverSelectTop + coverSelectFullHeight;
    const heightDiff = windowHeight - coverSelectBottomPos;
    
    if(heightDiff < 0) {
      this.optListEl.style.top = `-${this.optListEl.offsetHeight}px`;
    } else this.optListEl.style.top = `${this.wrapperEl.offsetHeight}px`;
  }
  
  showCoverOptgroup() {
    this.setOptgroupPosition();
    
    // записываем обработчик в свойство объекта для дальнейшего удаления
    this.onSetPositionOptgroupWindowScroll = () => this.setOptgroupPosition();
    
    window.addEventListener(`scroll`, this.onSetPositionOptgroupWindowScroll);
    
    this.optListEl.classList.add(`cover-select__optgroup_visible`);
  }
  
  hideCoverOptgroup() {
    window.removeEventListener(`scroll`, this.onSetPositionOptgroupWindowScroll);
    this.optListEl.classList.remove(`cover-select__optgroup_visible`);
  }
  
  setSelectedList(index, selected) {
    // получаем наименьший индекс элемента перед текущим значением переменной index
    const leastPrevIndex = getLeastPrevIndex(index, Array.from(this.optListEl.children));
    
    if(selected) {
      this.selectedOptListEl.append(this._coverOptions[index]);
      
      // если selected === false, возвращаем элемент в список вариантов с сохранением изначальной последовательности
    } else if(!index || !this.optListEl.children.length || leastPrevIndex === -1) {
      this.optListEl.insertAdjacentElement(`afterbegin`, this._coverOptions[index]);
    } else {
      this.optListEl.children[leastPrevIndex].insertAdjacentElement(`afterend`, this._coverOptions[index]);
    }
  }
}

new CustomMultipleSelect(selectEl);