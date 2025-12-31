//const numeral = require('numeral');

const move = (target) => {
    $('div.column-shifter-container > div.btn-group').addClass('column-shifter-menu').detach().appendTo(target)
};

module.exports = {
    move,
};
