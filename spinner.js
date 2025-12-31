const spin = require('spin.js')

class Spinner {
    constructor(target) {
        var opts = {
            lines: 18, // The number of lines to draw
            length: 8, // The length of each line
            width: 5, // The line thickness
            radius: 37, // The radius of the inner circle
            scale: 1, // Scales overall size of the spinner
            corners: 1, // Corner roundness (0..1)
            color: '#2296f3', // CSS color or array of colors
            fadeColor: 'transparent', // CSS color or array of colors
            speed: 1.2, // Rounds per second
            rotate: 0, // The rotation offset
            animation: 'spinner-line-shrink', // The CSS animation name for the lines
            direction: 1, // 1: clockwise, -1: counterclockwise
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            className: 'spinner', // The CSS class to assign to the spinner
            top: '50%', // Top position relative to parent
            left: '50%', // Left position relative to parent
            shadow: '0 0 1px transparent', // Box-shadow for the lines
            position: 'absolute' // Element positioning
        };
        this.spinner = new spin(opts).spin(target);
        // this.target = $(target);
        // this.target.block({ message: null })
    }

    stop() {
        this.spinner.stop();
        // this.target.unblock();
    }
}

module.exports = Spinner;
