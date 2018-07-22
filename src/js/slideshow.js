'use strict';

function SlideShow (urls) {
    this.urls = urls || [];
    this.index = -1;
}

// Private function
function inRange(index, urls) {
    return index >= 0 && index < urls.length;
}

SlideShow.prototype.totalCount = function() {
    return this.urls.length;
};

SlideShow.prototype.setCurrentIndex = function(index) {
    if (index < 0) {
        throw new Error('Non-negative integer is expected');
    } else if (index >= this.totalCount()) {
        throw new Error('Greater than the last index of url: ' + index);
    }
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
    if (inRange(this.index, this.urls)) {
        return this.urls[this.index];
    }
    return null;
};

SlideShow.prototype.showNext = function() {
    var newIdx = this.index + 1;
    if (inRange(newIdx, this.urls)) {
        this.index = newIdx;
        return true;
    }
    return false;
};

SlideShow.prototype.showPrev = function() {
    var newIdx = this.index - 1;
    if (inRange(newIdx, this.urls)) {
        this.index = newIdx;
        return true;
    }
    return false;
};

if(typeof exports !== 'undefined') {
    exports.SlideShow = SlideShow;
}
  