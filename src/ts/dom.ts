export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const h = (nodeName: string, attrs = {}, children: (Element | string)[] = []) => {
  const $el: Element = Object.assign(document.createElement(nodeName), attrs);

  children.forEach(child => {
    if (typeof child === 'string') {
      $el.appendChild(document.createTextNode(child));
    } else {
      $el.appendChild(child);
    }
  });
  return $el;
};
