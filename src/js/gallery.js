// 'use strict'
/*global SlideShow */

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
    const elBtnBackward = document.querySelector('.modal .backward-arrow')
    const elBtnForward = document.querySelector('.modal .forward-arrow')

    const publicAPI = {
        getImages,
        openImage,
        registerEvents,
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
                        `<div class="img-container" onclick="gallery.openImage(${i})">
                            <img class="img" src="${url}" alt="${url}">
                        </div>`,
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
            const prevAction = slideShow.isFirstImage() ? 'add' : 'remove'
            const nextAction = slideShow.isLastImage() ? 'add' : 'remove'

            elBtnLeft.classList[prevAction]('disabled')
            elBtnBackward.classList[prevAction]('disabled')
            elBtnRight.classList[nextAction]('disabled')
            elBtnForward.classList[nextAction]('disabled')
        }
    }

    function registerEvents() {
        if (elClose) {
            elClose.addEventListener('click', () => elModal.classList.remove('show'))
        }

        if (elBtnLeft) {
            elBtnLeft.addEventListener('click', clickPrev)
        }

        if (elBtnRight) {
            elBtnRight.addEventListener('click', clickNext)
        }

        if (elBtnBackward) {
            elBtnBackward.addEventListener('click', goFirst)
        }

        if (elBtnForward) {
            elBtnForward.addEventListener('click', goLast)
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

        function goFirst() {
            if (slideShow) {
                if (!slideShow.isFirstImage()) {
                    slideShow.showFirst()
                    elModalImage.src = slideShow.currentUrl()
                    updateImageCaption()
                }
                setButtonsVisible()
            }
        }

        function goLast() {
            if (slideShow) {
                if (!slideShow.isLastImage()) {
                    slideShow.showLast()
                    elModalImage.src = slideShow.currentUrl()
                    updateImageCaption()
                }
                setButtonsVisible()
            }
        }
    }

    function updateImageCaption() {
        if (elCaption) {
            elCaption.innerHTML = `${slideShow.currentIndex() + 1} of ${slideShow.totalCount()}`
        }
    }
}

if (typeof exports !== 'undefined') {
    exports.Gallery = Gallery
}
