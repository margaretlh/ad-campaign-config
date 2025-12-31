/**
 * Init page
 */
function init() {
    $(document).ready(() => {
        InitDatePicker.init('.input-daterange', {
            format: 'yyyy-mm-dd',
        });

        $('table').stickyTableHeaders();

        const Spinner = require('./spinner');
        const code = ace.edit('code');

        code.setTheme('ace/theme/chrome');
        code.getSession().setMode('ace/mode/html');
        code.getSession().setUseWorker(false);
        code.setReadOnly(true);

        $('.open-code').click(e => {
            var spinner = new Spinner($('#getCodeModal #code')[0]);
            code.session.setValue('');
            const showAdUrl = $(e.target).data('show-ad-url');
            $('#getCodeModal').modal('show');
            $.get(showAdUrl, function (data) {
                code.session.setValue(data);
                spinner.stop();
            });
        });
    });
}

module.exports = {
    init,
};
