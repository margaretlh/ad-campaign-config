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

        $('.delete-snippet').click(e => {
            const snippetId = $(e.target).data('snippet-id');
            const snippetName = $(e.target).data('snippet-name');

            swal({
                title: 'Are you sure?',
                text: 'Do you really want to delete the snippet ' + snippetName + ' ?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, delete it!',
            }).then(x => {
                let deleteSnippetForm = $('#deleteSnippetForm');
                deleteSnippetForm.find('input[name="snippet_id"]').val(snippetId);
                deleteSnippetForm.submit();
            });
        });
    })
}

module.exports = {
    init,
};
