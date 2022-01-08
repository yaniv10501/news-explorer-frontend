const handleClick = (event, handleClose, resetForm) => {
  if (event.target.className.includes('popup_opened')) {
    handleClose();
    resetForm();
  }
};

const handleLinkClick = (event, handleClose, resetForm, setLinkPopupOpen) => {
  event.preventDefault();
  handleClose();
  resetForm();
  setTimeout(() => {
    setLinkPopupOpen(true);
  }, 350);
};

export { handleClick, handleLinkClick };
