export const disableScroll = () => {
  const body = document.querySelector('body') as HTMLBodyElement;

  if (!body.getAttribute('scrollY')) {
    const pageY = window.scrollY;

    body.setAttribute('scrollY', pageY.toString());

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.left = '0px';
    body.style.right = '0px';
    body.style.bottom = '0px';
    body.style.top = `-${pageY}px`;
  }
};
export const enableScroll = () => {
  const { body } = document;

  if (body.getAttribute('scrollY')) {
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('left');
    body.style.removeProperty('right');
    body.style.removeProperty('bottom');

    window.scrollTo(0, Number(body.getAttribute('scrollY')));

    body.removeAttribute('scrollY');
  }
};
