/* global SlideShow, assert, expect */

describe('slideshow test', function () {
    let imageUrls = []
    let slideshow = null
    describe('undefined urls', () => {
        before(function () {
            // runs before all tests in this block
            slideshow = new SlideShow()
        })

        it('slideshow has 0 image', function () {
            assert.strictEqual(slideshow.totalCount(), 0)
        })

        it('current url should be null', function () {
            assert.strictEqual(slideshow.currentUrl(), null)
        })

        it('initial index is always -1', function () {
            assert.strictEqual(slideshow.currentIndex(), -1)
        })

        it('Slide show with 0 image should return false for isFirstImage', function () {
            assert.strictEqual(slideshow.isFirstImage(), false)
        })

        it('Slide show with 0 image should return false for isLastImage', function () {
            assert.strictEqual(slideshow.isLastImage(), false)
        })

        it('Show next image does nothing when there is 0 image', function () {
            assert.strictEqual(slideshow.showNext(), false)
            assert.strictEqual(slideshow.currentIndex(), -1)
        })

        it('Slide prev image does nothing when there is 0 image', function () {
            assert.strictEqual(slideshow.showPrev(), false)
            assert.strictEqual(slideshow.currentIndex(), -1)
        })
    })

    describe('empty slideshow', () => {
        before(function () {
            // runs before all tests in this block
            imageUrls = []
            slideshow = new SlideShow(imageUrls)
        })

        it('slideshow has 0 image', function () {
            assert.strictEqual(slideshow.totalCount(), 0)
        })

        it('current url should be null', function () {
            assert.strictEqual(slideshow.currentUrl(), null)
        })

        it('initial index is always -1', function () {
            assert.strictEqual(slideshow.currentIndex(), -1)
        })

        it('Slide show with 0 image should return false for isFirstImage', function () {
            assert.strictEqual(slideshow.isFirstImage(), false)
        })

        it('Slide show with 0 image should return false for isLastImage', function () {
            assert.strictEqual(slideshow.isLastImage(), false)
        })

        it('Show next image does nothing when there is 0 image', function () {
            assert.strictEqual(slideshow.showNext(), false)
            assert.strictEqual(slideshow.currentIndex(), -1)
        })

        it('Slide prev image does nothing when there is 0 image', function () {
            assert.strictEqual(slideshow.showPrev(), false)
            assert.strictEqual(slideshow.currentIndex(), -1)
        })
    })

    describe('single image slideshow', () => {
        before(function () {
            // runs before all tests in this block
            imageUrls = ['image1.jpg']
            slideshow = new SlideShow(imageUrls)
            slideshow.setCurrentIndex(0)
        })

        it('slideshow has 1 image', function () {
            assert.strictEqual(slideshow.totalCount(), imageUrls.length)
        })

        it('current url should be the first url', function () {
            assert.strictEqual(slideshow.currentUrl(), 'image1.jpg')
        })

        it('initial index is always 0', function () {
            assert.strictEqual(slideshow.currentIndex(), 0)
        })

        it('Slide show with 1 image is always the first image', function () {
            assert.strictEqual(slideshow.isFirstImage(), true)
        })

        it('Slide show with 1 image is always last image', function () {
            assert.strictEqual(slideshow.isLastImage(), true)
        })

        it('Show next image does nothing when there is 1 image', function () {
            assert.strictEqual(slideshow.showNext(), false)
            assert.strictEqual(slideshow.currentIndex(), 0)
        })

        it('Slide prev image with 1 image is always last image', function () {
            assert.strictEqual(slideshow.showPrev(), false)
            assert.strictEqual(slideshow.currentIndex(), 0)
        })
    })

    describe('multiple images slideshow', () => {
        let last
        before(function () {
            // runs before all tests in this block
            imageUrls = ['image1.jpg', 'image2.jpg', 'image3.jpg']
            last = imageUrls.length - 1
            slideshow = new SlideShow(imageUrls)
            slideshow.setCurrentIndex(0)
        })

        it('slideshow has 3 images', function () {
            assert.strictEqual(slideshow.totalCount(), 3)
        })

        it('current url should be the first url', function () {
            assert.strictEqual(slideshow.currentUrl(), 'image1.jpg')
        })

        it('initial index is always 0', function () {
            assert.strictEqual(slideshow.currentIndex(), 0)
        })

        it('Test first image in multiple-image slideshow', function () {
            assert.strictEqual(slideshow.isFirstImage(), true)
            assert.strictEqual(slideshow.isLastImage(), false)
        })

        it('Show next image advances index when there is more than 1 image and not the last one', function () {
            assert.strictEqual(slideshow.showNext(), true)
            assert.strictEqual(slideshow.currentIndex(), 1)
            assert.strictEqual(slideshow.isFirstImage(), false)
            assert.strictEqual(slideshow.isLastImage(), false)
            assert.strictEqual(slideshow.currentUrl(), 'image2.jpg')

            assert.strictEqual(slideshow.showNext(), true)
            assert.strictEqual(slideshow.currentIndex(), last)
            assert.strictEqual(slideshow.isFirstImage(), false)
            assert.strictEqual(slideshow.isLastImage(), true)
            assert.strictEqual(slideshow.currentUrl(), 'image3.jpg')

            assert.strictEqual(slideshow.showNext(), false)
            assert.strictEqual(slideshow.currentIndex(), last)
            assert.strictEqual(slideshow.isFirstImage(), false)
            assert.strictEqual(slideshow.isLastImage(), true)
            assert.strictEqual(slideshow.currentUrl(), 'image3.jpg')
        })
    })

    describe('multiple images slideshow navigate backward', () => {
        let last
        before(function () {
            // runs before all tests in this block
            imageUrls = ['image1.jpg', 'image2.jpg', 'image3.jpg']
            last = imageUrls.length - 1
            slideshow = new SlideShow(imageUrls)
            slideshow.setCurrentIndex(last)
        })

        it('current url should be the last url', function () {
            assert.strictEqual(slideshow.currentUrl(), 'image3.jpg')
        })

        it('Test last image in multiple-image slideshow', function () {
            assert.strictEqual(slideshow.isFirstImage(), false)
            assert.strictEqual(slideshow.isLastImage(), true)
        })

        it('Slide prev image reduces index when it is not the first image of the slideshow', function () {
            assert.strictEqual(slideshow.showPrev(), true)
            assert.strictEqual(slideshow.currentIndex(), 1)
            assert.strictEqual(slideshow.isFirstImage(), false)
            assert.strictEqual(slideshow.isLastImage(), false)
            assert.strictEqual(slideshow.currentUrl(), 'image2.jpg')

            assert.strictEqual(slideshow.showPrev(), true)
            assert.strictEqual(slideshow.currentIndex(), 0)
            assert.strictEqual(slideshow.isFirstImage(), true)
            assert.strictEqual(slideshow.isLastImage(), false)
            assert.strictEqual(slideshow.currentUrl(), 'image1.jpg')

            assert.strictEqual(slideshow.showPrev(), false)
            assert.strictEqual(slideshow.currentIndex(), 0)
            assert.strictEqual(slideshow.isFirstImage(), true)
            assert.strictEqual(slideshow.isLastImage(), false)
            assert.strictEqual(slideshow.currentUrl(), 'image1.jpg')
        })
    })

    describe('Throw error message if current index is out of bound', () => {
        before(function () {
            // runs before all tests in this block
            imageUrls = ['image1.jpg', 'image2.jpg', 'image3.jpg']
            slideshow = new SlideShow(imageUrls)
        })

        it('Throw error message if index is negative', function () {
            expect(() => slideshow.setCurrentIndex(-1)).to.throw('Non-negative integer is expected')
        })

        it('Throw error message if index is greater than the number of urls', function () {
            expect(() => slideshow.setCurrentIndex(imageUrls.length)).to.throw(
                `Greater than the last index of url: ${imageUrls.length}`,
            )
        })
    })

    describe('Do not throw error message if current index is within range', () => {
        describe('single image slideshow', () => {
            before(function () {
                // runs before all tests in this block
                imageUrls = ['image1.jpg']
                slideshow = new SlideShow(imageUrls)
            })

            it('Throw no error message if index is between 0 and length of urls minus 1', function () {
                imageUrls.forEach((_, i) => expect(() => slideshow.setCurrentIndex(i)).to.not.throw())
            })
        })

        describe('multiple image slideshow', () => {
            before(function () {
                // runs before all tests in this block
                imageUrls = ['image1.jpg', 'image2.jpg', 'image3.jpg']
                slideshow = new SlideShow(imageUrls)
            })

            it('Throw no error message if index is between 0 and length of urls minus 1', function () {
                imageUrls.forEach((_, i) => expect(() => slideshow.setCurrentIndex(i)).to.not.throw())
            })
        })
    })
})
