import React, { useCallback, useState } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import AppInfoView from '@crema/components/AppInfoView';
import { StyledReactGalleryPhoto } from '../index.styled';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import AppLoader from '@crema/components/AppLoader';

const ReactPhotoGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [{ apiData: photos, loading }] = useGetDataApi('/gallery/photos', []);
  const openLightBox = useCallback((event, { index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  if (loading) {
    return <AppLoader />;
  }
  return (
    <StyledReactGalleryPhoto>
      <Gallery photos={photos} onClick={openLightBox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      <AppInfoView />
    </StyledReactGalleryPhoto>
  );
};
export default ReactPhotoGallery;
