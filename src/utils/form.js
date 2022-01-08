const handleClick = (event, handleClose, resetForm) => {
  if (event.target.className.includes('popup_opened')) {
    handleClose();
    if (resetForm) {
      resetForm();
    }
  }
};

const handleLinkClick = (event, handleClose, resetForm, setLinkPopupOpen) => {
  event.preventDefault();
  handleClose();
  if (resetForm) {
    resetForm();
  }
  setTimeout(() => {
    setLinkPopupOpen(true);
  }, 350);
};

export { handleClick, handleLinkClick };
