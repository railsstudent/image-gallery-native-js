'use strict';

function SlideShow (urls) {
    this.urls = urls || [];
    this.index = -1;
}

SlideShow.prototype.totalCount = function() {
    return this.urls.length;
};

SlideShow.prototype.setCurrentIndex = function(index) {
    this.index = index;
};

SlideShow.prototype.currentIndex = function() {
    return this.index;
};

SlideShow.prototype.isFirstImage = function() {
    return this.index === 0;
};

SlideShow.prototype.isLastImage = function() {
    return this.index === this.urls.length - 1;
};

SlideShow.prototype.currentUrl = function() {
    if (this.index >= 0 && this.index < this.urls.length) {
        return this.urls[this.index];
    }
    return null;
};

SlideShow.prototype.showNext = function() {
    var newIdx = this.index + 1;
    if (newIdx >= 0 && newIdx < this.urls.length) {
        this.index = newIdx;
        return true;
    }
    return false;
};

SlideShow.prototype.showPrev = function() {
    var newIdx = this.index - 1;
    if (newIdx >= 0 && newIdx < this.urls.length) {
        this.index = newIdx;
        return true;
    }
    return false;
};

if(typeof exports !== 'undefined') {
    exports.SlideShow = SlideShow;
}
  