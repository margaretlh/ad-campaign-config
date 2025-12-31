function init() {
    $(document).ready(() => {
        const editor = ace.edit('editor');

        editor.setTheme('ace/theme/chrome');
        editor.getSession().setMode('ace/mode/javascript');

        const textarea = $('#snippet_code');

        textarea.val(editor.getSession().getValue());

        editor.getSession().on('change', () => {
            textarea.val(editor.getSession().getValue());
        });
    })
}

module.exports = {
    init,
};
