'use strict'

function Gallery() {
    var slideShow = null
    const API_URL = 'https://pixabay.com/api/?q=swan&per_page=15&image_type=&key=API_KEY'
    var i = 0
    const images = []
    const elModal = document.querySelector('.modal')
    const elModalImage = document.getElementById('modal-image')
    const elClose = document.querySelector('.modal .close')
    const elBtnLeft = document.querySelector('.modal .left-arrow')
    const elBtnRight = document.querySelector('.modal .right-arrow')
    const elMessagePanel = document.getElementById('msgPanel')
    const elContainer = document.getElementById('container')
    const elCaption = document.getElementById('caption')

    const publicAPI = {
        getImages: getImages,
        openImage: openImage,
        registerEvents: registerEvents,
    }
    return publicAPI

    function getImages() {
        return fetch(API_URL)
            .then((response) => response.json())
            .then((jsonData) => (jsonData.hits || []).map((d) => d.webformatURL))
            .then((imageUrls) => buildImageList(imageUrls))
            .catch(function (err) {
                console.error(err)
                showErrorMsg('Unable to retrieve images from Pixabay')
            })
    }

    function showErrorMsg() {
        elContainer.style.display = 'none'
        elMessagePanel.classList.add('show')
    }

    function imagePreloader(urls) {
        var img = null
        for (i = 0; i < urls.length; i++) {
            img = new Image()
            img.src = urls[i]
            images.push(img)
        }
    }

    function buildImageList(urls) {
        slideShow = new SlideShow(urls)
        imagePreloader(urls)
        const elContainer = document.getElementById('container')
        if (elContainer) {
            const strHtml = urls
                .map(
                    (url, i) =>
                        `<div class="image" onclick="gallery.openImage(${i})"><img src="${url}" alt="${url}"></div>`,
                )
                .join('')
            elContainer.innerHTML = strHtml
        }
    }

    function openImage(index) {
        try {
            if (slideShow) {
                slideShow.setCurrentIndex(index)
                setButtonsVisible()
                if (elModal) {
                    elModal.classList.add('show')
                }
                if (elModalImage) {
                    elModalImage.src = slideShow.currentUrl()
                }
                updateImageCaption()
            }
        } catch (e) {
            console.error(e)
        }
    }

    function setButtonsVisible() {
        if (slideShow) {
            if (slideShow.isFirstImage()) {
                elBtnLeft.classList.add('hide')
            } else {
                elBtnLeft.classList.remove('hide')
            }

            if (slideShow.isLastImage()) {
                elBtnRight.classList.add('hide')
            } else {
                elBtnRight.classList.remove('hide')
            }
        }
    }

    function registerEvents() {
        if (elClose) {
            elClose.addEventListener('click', function () {
                elModal.classList.remove('show')
            })
        }

        if (elBtnLeft) {
            elBtnLeft.addEventListener('click', clickPrev)
        }

        if (elBtnRight) {
            elBtnRight.addEventListener('click', clickNext)
        }

        function clickPrev() {
            if (slideShow) {
                if (!slideShow.isFirstImage()) {
                    slideShow.showPrev()
                    elModalImage.src = slideShow.currentUrl()
                    updateImageCaption()
                }
                setButtonsVisible()
            }
        }

        function clickNext() {
            if (slideShow) {
                if (!slideShow.isLastImage()) {
                    slideShow.showNext()
                    elModalImage.src = slideShow.currentUrl()
                    updateImageCaption()
                }
                setButtonsVisible()
            }
        }
    }

    function updateImageCaption() {
        if (elCaption) {
            elCaption.innerHTML = slideShow.currentIndex() + 1 + ' of ' + slideShow.totalCount()
        }
    }
}

if (typeof exports !== 'undefined') {
    exports.Gallery = Gallery
}
