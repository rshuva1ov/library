class DynamicAdaptive {
  constructor() {
    this.adaptiveElems = document.querySelectorAll('[data-adaptive]');
    this.bundleMap = new Map();
    this.onSetAdaptive = this.onSetAdaptive.bind(this);

    for (let elem of this.adaptiveElems) {
      this.bundleMap.set(elem, { parent: elem.parentNode, index: this.getIndexOfChild(elem) });
    }

    window.addEventListener('resize', this.onSetAdaptive);
  }

  onSetAdaptive() {
    const windowWidth = document.documentElement.clientWidth;

    for (let elem of this.adaptiveElems) {
      const { parent: initParentNode, index: initIndex } = this.getInitStateOfElem(elem);
      let [width, targetNodeId] = elem.dataset.adaptive.split(' ');
      const targetParent = document.getElementById(targetNodeId);
      width = parseInt(width);

      if (!targetParent) return;

      if (windowWidth <= width) {
        targetParent.append(elem);
      } else {
        if (initParentNode.children.length > 0 && initIndex > 0) {
          initParentNode.children[initIndex - 1].after(elem);
        } else initParentNode.append(elem);
      }
    }
  }

  getIndexOfChild(elem) {
    return Array.from(elem.parentNode.children).indexOf(elem);
  }

  getInitStateOfElem(elem) {
    return this.bundleMap.get(elem);
  }

  init() {
    this.onSetAdaptive();
  }
}