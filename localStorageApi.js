export class LocalStorageApi {
  constructor(key) {
    this.key = key;
    if (!localStorage.getItem(key)) {
      this.set(new Array());
    }
  }

  get() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  set(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  filter() {
    const tempArray = this.get();
    const filteredArray = tempArray.filter(...arguments);

    this.set(filteredArray);
    return filteredArray;
  }

  push(value) {
    const tempArray = this.get();
    const nativeReturnLength = tempArray.push(value);

    this.set(tempArray);
    return nativeReturnLength; //возвращаем значение (длина массива), копируя нативное поведение массива
  }

  splice() {
    const tempArray = this.get();
    const nativeReturnArray = tempArray.splice(...arguments);

    this.set(tempArray);
    return nativeReturnArray; //возвращаем значение (массив удалённых элементов), копируя нативное поведение массива
  }

  clear() {
    this.set(new Array());
  }

  map() {
    const tempArray = this.get();

    return Array.prototype.map.apply(tempArray, arguments);
  }

  get length() {
    return this.get().length;
  }
}
