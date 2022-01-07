const handleImageLoad = (
  resultLength,
  loadingImages,
  thunkDispatch,
  isLoadingMore,
  setIsLoadingMore,
  setIsShowMoreVisible,
  cardAmount,
  showAmount
) => {
  loadingImages.push(true);
  let arrLength;
  const remainingArticles = resultLength - cardAmount + 1;
  if (remainingArticles <= showAmount) {
    arrLength = remainingArticles + 1;
  }
  if (remainingArticles > showAmount) {
    arrLength = showAmount + 1;
  }
  console.log(arrLength);
  if (loadingImages.length === arrLength) {
    thunkDispatch({ type: 'IMAGES_LOADED' });
    if (isLoadingMore) {
      const bottomOverlay = document.querySelector('.news-card-list__button-overlay');
      bottomOverlay.classList.remove('news-card-list__button-overlay_loading');
      if (cardAmount + 1 >= resultLength) setIsShowMoreVisible(false);
      setIsLoadingMore(false);
      return [];
    }
  }
  return loadingImages;
};

export default handleImageLoad;
