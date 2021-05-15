/* global expect, browser */

const NUM_IMAGES = 15
const TIMEOUT = 30000
const SCREEN_SHOT = process.env.SCREEN_SHOT

describe('gallery test', function () {
    let page
    this.timeout(TIMEOUT)

    before(async () => {
        try {
            page = await browser.newPage()
            await page.goto('http://localhost:8000/')
        } catch (e) {
            console.error(e)
        }
    })

    after(async () => {
        await page.close()
    })

    it('Should have correct page heading', async () => {
        try {
            const title = await page.evaluate(() => {
                return document.querySelector('div.title > p').innerText
            })
            expect(title).to.equal('Swan Album')
        } catch (e) {
            console.error(e)
            throw e
        }
    })

    it('Should have image class', async () => {
        try {
            for (let i = 1; i <= NUM_IMAGES; i++) {
                await page.waitForSelector(`.image:nth-child(${i})`, { visible: true, timeout: 0 })
            }
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test0.png',
                })
            }
            const numImages = await page.evaluate(() => document.querySelectorAll('.image').length)
            expect(numImages).to.equal(NUM_IMAGES)
        } catch (e) {
            console.error(e)
            throw e
        }
    })

    it('Shows that image modal is not visible', async () => {
        try {
            page.waitForSelector('.modal', { visible: true, timeout: 0 })
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test1.png',
                })
            }
            const modalHandle = await page.$('.modal')
            const displayValue = await page.evaluate((modal) => {
                const style = window.getComputedStyle(modal)
                return style.display
            }, modalHandle)
            expect(displayValue).to.equal('none')
            modalHandle.dispose()
        } catch (e) {
            console.error(e)
            throw e
        }
    })

    it('Shows modal is visible when an image is clicked', async () => {
        try {
            await page.waitForSelector('.image:nth-child(1)', { visible: true, timeout: 0 })
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test2.png',
                })
            }

            const imageElement = await page.$('.image:nth-child(1)')
            await imageElement.click()
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test3.png',
                })
            }

            const modalHandle = await page.$('.modal.show')
            const displayValue = await page.evaluate((modal) => {
                const style = window.getComputedStyle(modal)
                return style.display
            }, modalHandle)
            expect(displayValue).to.equal('block')

            const closeHandle = await page.$('.modal.show .close')
            await closeHandle.click()
            closeHandle.dispose()
            modalHandle.dispose()
        } catch (e) {
            console.error(e)
            throw e
        }
    })

    it('Shows first image src is not blank and has correct caption and visible buttons', async () => {
        try {
            await page.waitForSelector('.image:nth-child(1)', { visible: true, timeout: 0 })
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test4.png',
                })
            }

            const imageElement = await page.$('.image:nth-child(1)')
            await imageElement.click()
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test5.png',
                })
            }
            const modalHandle = await page.$('.modal.show')
            const imageSrc = await page.evaluate((modal) => modal.querySelector('#modal-image').src, modalHandle)
            const caption = await page.evaluate((modal) => modal.querySelector('#caption').innerText, modalHandle)
            const [
                btnCloseDisplay,
                btnCloseOpacity,
                btnLeftDisplay,
                btnLeftOpacity,
                btnRightDisplay,
                btnRightOpacity,
            ] = await page.evaluate((modal) => {
                const { opacity: closeOpacity, display: closeDisplay } = window.getComputedStyle(
                    modal.querySelector('.close'),
                )
                const { opacity: leftOpacity, display: leftDisplay } = window.getComputedStyle(
                    modal.querySelector('.left-arrow'),
                )
                const { opacity: rightOpacity, display: rightDisplay } = window.getComputedStyle(
                    modal.querySelector('.right-arrow'),
                )
                return [closeDisplay, closeOpacity, leftDisplay, leftOpacity, rightDisplay, rightOpacity]
            }, modalHandle)

            expect(imageSrc).to.not.equal('')
            expect(caption).to.equal(`1 of ${NUM_IMAGES}`)
            expect(btnCloseDisplay).to.equal('inline-block')
            expect(btnRightDisplay).to.equal('inline-block')
            expect(btnLeftDisplay).to.be.equal('block')
            expect(btnCloseOpacity).to.equal('1')
            expect(btnRightOpacity).to.equal('1')
            expect(btnLeftOpacity).to.equal('0')

            const closeHandle = await page.$('.modal.show .close')
            await closeHandle.click()
            closeHandle.dispose()
            modalHandle.dispose()
        } catch (e) {
            console.error(e)
            throw e
        }
    })

    it('Shows second image src is not blank and has correct caption and visible buttons', async () => {
        try {
            page.waitForSelector('.image:nth-child(2)', { visible: true, timeout: 0 })
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test6.png',
                })
            }

            const imageElement = await page.$('.image:nth-child(2)')
            await imageElement.click()
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test7.png',
                })
            }

            const modalHandle = await page.$('.modal.show')
            const imageSrc = await page.evaluate((modal) => modal.querySelector('#modal-image').src, modalHandle)
            const caption = await page.evaluate((modal) => modal.querySelector('#caption').innerText, modalHandle)
            const [
                btnCloseDisplay,
                btnCloseOpacity,
                btnLeftDisplay,
                btnLeftOpacity,
                btnRightDisplay,
                btnRightOpacity,
            ] = await page.evaluate((modal) => {
                const { opacity: closeOpacity, display: closeDisplay } = window.getComputedStyle(
                    modal.querySelector('.close'),
                )
                const { opacity: leftOpacity, display: leftDisplay } = window.getComputedStyle(
                    modal.querySelector('.left-arrow'),
                )
                const { opacity: rightOpacity, display: rightDisplay } = window.getComputedStyle(
                    modal.querySelector('.right-arrow'),
                )
                return [closeDisplay, closeOpacity, leftDisplay, leftOpacity, rightDisplay, rightOpacity]
            }, modalHandle)
            expect(imageSrc).to.not.equal('')
            expect(btnCloseDisplay).to.equal('inline-block')
            expect(btnRightDisplay).to.equal('inline-block')
            expect(btnLeftDisplay).to.be.equal('block')
            expect(btnCloseOpacity).to.equal('1')
            expect(btnRightOpacity).to.equal('1')
            expect(btnLeftOpacity).to.equal('1')
            expect(caption).to.equal(`2 of ${NUM_IMAGES}`)

            const closeHandle = await page.$('.modal.show .close')
            await closeHandle.click()
            closeHandle.dispose()
            modalHandle.dispose()
        } catch (e) {
            console.error(e)
            throw e
        }
    })

    it('Shows last image src is not blank and has correct caption and visible buttons', async () => {
        try {
            page.waitForSelector(`.image:nth-child(${NUM_IMAGES})`, { visible: true, timeout: 0 })
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test8.png',
                })
            }

            const imageElement = await page.$(`.image:nth-child(${NUM_IMAGES})`)
            await imageElement.click()
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test9.png',
                })
            }

            const modalHandle = await page.$('.modal.show')
            const imageSrc = await page.evaluate((modal) => modal.querySelector('#modal-image').src, modalHandle)
            const caption = await page.evaluate((modal) => modal.querySelector('#caption').innerText, modalHandle)
            const [
                btnCloseDisplay,
                btnCloseOpacity,
                btnLeftDisplay,
                btnLeftOpacity,
                btnRightDisplay,
                btnRightOpacity,
            ] = await page.evaluate((modal) => {
                const { opacity: closeOpacity, display: closeDisplay } = window.getComputedStyle(
                    modal.querySelector('.close'),
                )
                const { opacity: leftOpacity, display: leftDisplay } = window.getComputedStyle(
                    modal.querySelector('.left-arrow'),
                )
                const { opacity: rightOpacity, display: rightDisplay } = window.getComputedStyle(
                    modal.querySelector('.right-arrow'),
                )
                return [closeDisplay, closeOpacity, leftDisplay, leftOpacity, rightDisplay, rightOpacity]
            }, modalHandle)
            expect(imageSrc).to.not.equal('')
            expect(btnCloseDisplay).to.equal('inline-block')
            expect(btnRightDisplay).to.equal('inline-block')
            expect(btnLeftDisplay).to.be.equal('block')
            expect(btnCloseOpacity).to.equal('1')
            expect(btnRightOpacity).to.equal('0')
            expect(btnLeftOpacity).to.equal('1')
            expect(caption).to.equal(`${NUM_IMAGES} of ${NUM_IMAGES}`)

            const closeHandle = await page.$('.modal.show .close')
            await closeHandle.click()
            closeHandle.dispose()
            modalHandle.dispose()
        } catch (e) {
            console.error(e)
            throw e
        }
    })

    it('Shows right arrow button navigates to next image and updates caption', async () => {
        try {
            await page.waitForSelector('.image:nth-child(1)', { visible: true, timeout: 0 })
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test10.png',
                })
            }

            const imageElement = await page.$('.image:nth-child(1)')
            await imageElement.click()
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test11.png',
                })
            }

            const modalHandle = await page.$('.modal.show')

            let caption = await page.evaluate((modal) => modal.querySelector('#caption').innerText, modalHandle)
            expect(caption).to.equal(`1 of ${NUM_IMAGES}`)

            const rightBtnHandle = await page.$('.modal.show .right-arrow')
            await rightBtnHandle.click()

            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test12.png',
                })
            }

            caption = await page.evaluate((modal) => modal.querySelector('#caption').innerText, modalHandle)
            expect(caption).to.equal(`2 of ${NUM_IMAGES}`)

            await rightBtnHandle.click()

            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test13.png',
                })
            }

            caption = await page.evaluate((modal) => modal.querySelector('#caption').innerText, modalHandle)
            expect(caption).to.equal(`3 of ${NUM_IMAGES}`)

            const closeHandle = await page.$('.modal.show .close')
            await closeHandle.click()
            closeHandle.dispose()
            rightBtnHandle.dispose()
            modalHandle.dispose()
        } catch (e) {
            console.error(e)
            throw e
        }
    })

    it('Shows left arrow button navigates to previous image and updates caption', async () => {
        try {
            await page.waitForSelector('.image:nth-child(3)', { visible: true, timeout: 0 })
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test14.png',
                })
            }

            const imageElement = await page.$('.image:nth-child(3)')
            await imageElement.click()
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test15.png',
                })
            }

            const modalHandle = await page.$('.modal.show')

            let caption = await page.evaluate((modal) => modal.querySelector('#caption').innerText, modalHandle)
            expect(caption).to.equal(`3 of ${NUM_IMAGES}`)

            const leftBtnHandle = await page.$('.modal.show .left-arrow')
            await leftBtnHandle.click()

            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test16.png',
                })
            }

            caption = await page.evaluate((modal) => modal.querySelector('#caption').innerText, modalHandle)
            expect(caption).to.equal(`2 of ${NUM_IMAGES}`)

            await leftBtnHandle.click()

            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test17.png',
                })
            }

            caption = await page.evaluate((modal) => modal.querySelector('#caption').innerText, modalHandle)
            expect(caption).to.equal(`1 of ${NUM_IMAGES}`)

            const closeHandle = await page.$('.modal.show .close')
            await closeHandle.click()
            closeHandle.dispose()
            leftBtnHandle.dispose()
            modalHandle.dispose()
        } catch (e) {
            console.error(e)
            throw e
        }
    })

    it('Shows caption is correct for all images', async () => {
        try {
            await page.waitForSelector('.image:nth-child(1)', { visible: true, timeout: 0 })
            const imageElement = await page.$('.image:nth-child(1)')
            await imageElement.click()

            const IDX_IMAGE = 17
            const modalHandle = await page.$('.modal.show')
            const rightBtnHandle = await page.$('.modal.show .right-arrow')
            let caption = null

            for (let i = 1; i < NUM_IMAGES; i++) {
                caption = await page.evaluate((modal) => modal.querySelector('#caption').innerText, modalHandle)
                expect(caption).to.equal(`${i} of ${NUM_IMAGES}`)

                if (SCREEN_SHOT === 'true') {
                    await page.screenshot({
                        path: `./test/test${IDX_IMAGE + i}.png`,
                    })
                }
                await rightBtnHandle.click()
            }

            caption = await page.evaluate((modal) => modal.querySelector('#caption').innerText, modalHandle)
            expect(caption).to.equal(`${NUM_IMAGES} of ${NUM_IMAGES}`)

            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: `./test/test${IDX_IMAGE + NUM_IMAGES}.png`,
                })
            }

            const closeHandle = await page.$('.modal.show .close')
            await closeHandle.click()
            closeHandle.dispose()
            rightBtnHandle.dispose()
            modalHandle.dispose()
        } catch (e) {
            console.error(e)
            throw e
        }
    })

    it('Shows left arrow button is visible until first image is shown', async () => {
        try {
            await page.waitForSelector(`.image:nth-child(${NUM_IMAGES})`, { visible: true, timeout: 0 })
            const imageElement = await page.$(`.image:nth-child(${NUM_IMAGES})`)
            await imageElement.click()

            const IDX_IMAGE = 32
            const modalHandle = await page.$('.modal.show')
            const leftBtnHandle = await page.$('.modal.show .left-arrow')
            let opacity = null

            for (let i = 1; i < NUM_IMAGES; i++) {
                opacity = await page.evaluate((modal) => {
                    const { opacity } = window.getComputedStyle(modal.querySelector('.left-arrow'))
                    return opacity
                }, modalHandle)
                expect(opacity).to.equal('1')

                if (SCREEN_SHOT === 'true') {
                    await page.screenshot({
                        path: `./test/test${IDX_IMAGE + i}.png`,
                    })
                }
                await leftBtnHandle.click()
            }

            opacity = await page.evaluate((modal) => {
                const { opacity } = window.getComputedStyle(modal.querySelector('.left-arrow'))
                return opacity
            }, modalHandle)
            expect(opacity).to.equal('0')
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: `./test/test${IDX_IMAGE + NUM_IMAGES}.png`,
                })
            }

            const closeHandle = await page.$('.modal.show .close')
            await closeHandle.click()
            closeHandle.dispose()
            leftBtnHandle.dispose()
            modalHandle.dispose()
        } catch (e) {
            console.error(e)
            throw e
        }
    })

    it('Shows right arrow button is visible until last image is shown', async () => {
        try {
            await page.waitForSelector('.image:nth-child(1)', { visible: true, timeout: 0 })
            const imageElement = await page.$('.image:nth-child(1)')
            await imageElement.click()

            const IDX_IMAGE = 47
            const modalHandle = await page.$('.modal.show')
            const rightBtnHandle = await page.$('.modal.show .right-arrow')
            let opacity = null
            let closeOpacity = null

            for (let i = 1; i < NUM_IMAGES; i++) {
                opacity = await page.evaluate((modal) => {
                    const { opacity } = window.getComputedStyle(modal.querySelector('.right-arrow'))
                    return opacity
                }, modalHandle)
                closeOpacity = await page.evaluate((modal) => {
                    const { opacity } = window.getComputedStyle(modal.querySelector('.close'))
                    return opacity
                }, modalHandle)
                expect(opacity).to.equal('1')
                expect(closeOpacity).to.equal('1')
                if (SCREEN_SHOT === 'true') {
                    await page.screenshot({
                        path: `./test/test${IDX_IMAGE + i}.png`,
                    })
                }
                await rightBtnHandle.click()
            }

            opacity = await page.evaluate((modal) => {
                const { opacity } = window.getComputedStyle(modal.querySelector('.right-arrow'))
                return opacity
            }, modalHandle)
            closeOpacity = await page.evaluate((modal) => {
                const { opacity } = window.getComputedStyle(modal.querySelector('.close'))
                return opacity
            }, modalHandle)
            expect(opacity).to.equal('0')
            expect(closeOpacity).to.equal('1')
            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: `./test/test${IDX_IMAGE + NUM_IMAGES}.png`,
                })
            }

            const closeHandle = await page.$('.modal.show .close')
            await closeHandle.click()
            closeHandle.dispose()
            rightBtnHandle.dispose()
            modalHandle.dispose()
        } catch (e) {
            console.error(e)
            throw e
        }
    })
})

describe('Negative gallery test', function () {
    let page
    this.timeout(TIMEOUT)

    before(async () => {
        try {
            page = await browser.newPage()
            await page.setRequestInterception(true)
            page.on('request', (request) => {
                if (request.url().startsWith('https://pixabay.com/api/')) {
                    request.respond({
                        status: 500,
                    })
                } else {
                    request.continue()
                }
            })
            await page.goto('http://localhost:8000/')
        } catch (e) {
            console.error(e)
        }
    })

    after(async () => {
        await page.close()
    })

    it('Shows error message if api request returns error', async () => {
        try {
            await page.waitForSelector('#msgPanel', { visible: true, timeout: 0 })
            const msgPanelHandle = await page.$('#msgPanel')

            if (SCREEN_SHOT === 'true') {
                await page.screenshot({
                    path: './test/test63.png',
                })
            }

            const display = await page.evaluate((msgPanel) => window.getComputedStyle(msgPanel).display, msgPanelHandle)
            const msg = await page.evaluate(
                (msgPanel) => msgPanel.querySelector('.description').innerText,
                msgPanelHandle,
            )
            expect(display).to.not.equal('none')
            expect(msg).to.equal('Unable to retrieve images from Pixabay')
            msgPanelHandle.dispose()
        } catch (e) {
            console.error(e)
            throw e
        }
    })
})
