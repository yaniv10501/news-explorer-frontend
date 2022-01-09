/**
 * @function lockScreen
 * @description - A function to lock the screen when popups or menu are open.
 * @param {boolean} isOpen - The isOpen state of the popup or menu.
 * @param {object} headerRef - Pass the headerRef to make header visible after mobile popup is closed.
 */

export default (isOpen, headerRef) => {
  if (isOpen) {
    document.body.classList.add('lock-screen');
  }
  if (!isOpen) {
    document.body.classList.remove('lock-screen');
    if (headerRef) {
      const headerElement = headerRef.current;
      headerElement.style.visibility = 'visible';
    }
  }
};
