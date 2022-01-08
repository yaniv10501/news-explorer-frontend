const handleShowMore = (setIsLoadingMore, setCardAmount, cardAmount) => {
  const bottomOverlay = document.querySelector('.news-card-list__button-overlay');
  bottomOverlay.classList.add('news-card-list__button-overlay_loading');
  setIsLoadingMore(true);
  setCardAmount(cardAmount + 3);
};

export default handleShowMore;
