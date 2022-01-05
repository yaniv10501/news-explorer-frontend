const handleClick = (event, handleClose) => {
  if (event.target.className.includes('popup_opened')) {
    handleClose();
  }
};

const handleLinkClick = (event, handleClose, setLinkPopupOpen) => {
  event.preventDefault();
  handleClose();
  setTimeout(() => {
    setLinkPopupOpen(true);
  }, 350);
};

export { handleClick, handleLinkClick };
