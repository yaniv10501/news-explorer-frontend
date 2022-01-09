import { IMAGES_LOADED } from '../assets/reducerActions';

const handleImageLoad = (
  buttonOverlayRef,
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
  if (resultLength <= showAmount) {
    arrLength = resultLength;
  }
  if (resultLength > showAmount) {
    if (resultLength > cardAmount) {
      arrLength = 3;
    } else {
      arrLength = 2 - (cardAmount - resultLength);
    }
  }
  if (loadingImages.length === arrLength) {
    thunkDispatch({ type: IMAGES_LOADED });
    if (resultLength < cardAmount) setIsShowMoreVisible(false);
    if (isLoadingMore) {
      const bottomOverlay = buttonOverlayRef.current;
      bottomOverlay.classList.remove('news-card-list__button-overlay_loading');
      if (cardAmount + 1 >= resultLength) setIsShowMoreVisible(false);
      setIsLoadingMore(false);
      return [];
    }
  }
  return loadingImages;
};

export default handleImageLoad;
