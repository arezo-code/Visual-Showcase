document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const gridItems = Array.from(document.querySelectorAll('.grid-item'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let activeGalleryItems = [...gridItems]; 
  let currentImgIndex = 0;

  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      const targetFilter = e.target.getAttribute('data-filter');
      gridItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (targetFilter === 'all' || itemCategory === targetFilter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });


      activeGalleryItems = gridItems.filter(item => !item.classList.contains('hidden'));
    });
  });

  const launchLightbox = (index) => {
    currentImgIndex = index;
    const targetItem = activeGalleryItems[currentImgIndex];
    const imgSource = targetItem.querySelector('img').src;
    const captionText = targetItem.querySelector('.overlay span').textContent;

    lightboxImg.src = imgSource;
    lightboxCaption.textContent = captionText;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const shutLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const shiftImage = (direction) => {
    if (direction === 'next') {
      currentImgIndex = (currentImgIndex + 1) % activeGalleryItems.length;
    } else if (direction === 'prev') {
      currentImgIndex = (currentImgIndex - 1 + activeGalleryItems.length) % activeGalleryItems.length;
    }
    launchLightbox(currentImgIndex);
  };


  gridItems.forEach(item => {
    item.addEventListener('click', () => {
      const actualIndex = activeGalleryItems.indexOf(item);
      if (actualIndex !== -1) launchLightbox(actualIndex);
    });
  });

  // Interaction Mapping Evt Listeners
  closeBtn.addEventListener('click', shutLightbox);
  nextBtn.addEventListener('click', () => shiftImage('next'));
  prevBtn.addEventListener('click', () => shiftImage('prev'));

  // Close Lightbox when clicking outside image boundary
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) shutLightbox();
  });

  // Hardware Keyboard Events Support
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') shutLightbox();
    if (e.key === 'ArrowRight') shiftImage('next');
    if (e.key === 'ArrowLeft') shiftImage('prev');
  });
});
