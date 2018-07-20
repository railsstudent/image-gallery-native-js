'use strict';

function Gallery() {
    var slideShow = null;
    var API_URL = 'https://pixabay.com/api/?q=swan&per_page=15&image_type=&key=API_KEY';
    var i = 0;
    var images = [];
    var elModal = document.getElementsByClassName('modal')[0];
    var elModalImage = document.getElementById('modal-image');       
    var elClose = document.getElementsByClassName('close')[0];
    var elBtnLeft = document.getElementsByClassName('left-arrow')[0];
    var elBtnRight = document.getElementsByClassName('right-arrow')[0];
    var elMessagePanel = document.getElementById('msgPanel');
    var elContainer = document.getElementById('container');
    var elCaption = document.getElementById('caption');

    var publicAPI = {
        getImages: getImages,
        openImage: openImage,
        registerEvents: registerEvents
    };
    return publicAPI;

    function getImages() {
        return fetch(API_URL)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                var hits = jsonData.hits || []; 
                return hits.map(function(d) {
                    return d.webformatURL;
                });
            })
            .then(function(imageUrls) {
                buildImageList(imageUrls);
            })
            .catch(function(err) {
                console.error(err);
                showErrorMsg('Unable to retrieve images from Pixabay');
            });
    }

    function showErrorMsg() {
        elContainer.style.display = 'none';
        elMessagePanel.classList.add('show');
    }

    function imagePreloader(urls) {
        var img = null;
        for (i = 0; i < urls.length; i++) {
            img = new Image();
            img.src = urls[i];
            images.push(img);
        }
    }

    function buildImageList(urls) {
        slideShow = new SlideShow(urls);
        imagePreloader(urls);
        var elContainer = document.getElementById('container');
        if (elContainer) {
            var strHtml = '';
            for (i = 0; i < urls.length; i++) {
                strHtml += '<div class="image" onclick="gallery.openImage(' + i + ')"><img src="' + urls[i] + '"' + 
                    ' alt="' + urls[i] + '"></div>';
            }
            elContainer.innerHTML = strHtml;
        }
    }

    function openImage(index) {
        slideShow.setCurrentIndex(index);
        setButtonsVisible();
        if (elModal) {
            elModal.classList.add('show');
        }
        if (elModalImage) {
            elModalImage.src = slideShow.currentUrl();
        }
        updateImageCaption();
    }

    function setButtonsVisible() {
        if (slideShow.isFirstImage()) {
            elBtnLeft.classList.add('hide');
        } else {
            elBtnLeft.classList.remove('hide');
        }

        if (slideShow.isLastImage()) {
            elBtnRight.classList.add('hide');
        } else {
            elBtnRight.classList.remove('hide');
        }
    }

    function registerEvents() {
        if (elClose) {
            elClose.addEventListener('click', function() {
                elModal.classList.remove('show');
            });
        }

        if (elBtnLeft) {
            elBtnLeft.addEventListener('click', clickPrev);
        }

        if (elBtnRight) {
            elBtnRight.addEventListener('click', clickNext);
        }

        function clickPrev() {
            if (!slideShow.isFirstImage()) {
                slideShow.showPrev();
                elModalImage.src = slideShow.currentUrl();
                updateImageCaption();
            } 
            setButtonsVisible();
        }

        function clickNext() {
            if (!slideShow.isLastImage()) {
                slideShow.showNext();
                elModalImage.src = slideShow.currentUrl();
                updateImageCaption();
            }
            setButtonsVisible();
        }
    }

    function updateImageCaption() {
        if (elCaption) {
            elCaption.innerHTML = (slideShow.currentIndex() + 1) + ' of ' + slideShow.totalCount();
        }
    }
}

if(typeof exports !== 'undefined') {
    exports.Gallery = Gallery;
}

