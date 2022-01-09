const handleShowMore = (buttonOverlayRef, setIsLoadingMore, setCardAmount, cardAmount) => {
  const bottomOverlay = buttonOverlayRef.current;
  bottomOverlay.classList.add('news-card-list__button-overlay_loading');
  setIsLoadingMore(true);
  setCardAmount(cardAmount + 3);
};

export default handleShowMore;
