function init() {
    InitDatePicker.init('.input-daterange', {
        format: 'yyyy-mm-dd',
    });

    $('select[name="updated_by"]').select2();
    $('select[name="publisher_filter"]').select2();
    $('#noteModal select[name="publisher"]').select2({ width: '100%' });

    $('#addNoteButton').click(function (e) {
        e.preventDefault();
        $('#noteModal #noteModalLabel').text('Create note');

        $('#noteModal input[name="action"]').val('create');
        $('#noteModal input[name="note_id"]').val('');
        $('#noteModal select[name="publisher"]').val('').trigger('change');
        $('#noteModal textarea[name="text"]').val('');
        $('#noteModal').modal('show');
    })

    $('.show-full-text-btn').click(e => {
        console.log('click being handled')
        e.preventDefault();
        const row_id = $(e.target).data('note-id');
        const element = $(`#${row_id} span`)
        if (element.css("height") === "16px") {
            element.css("height", "unset")
        } else {
            element.css("height", "16px")
        }
    })

    $('.edit-note-btn').click(function (e) {
        e.preventDefault();
        $('#noteModal #noteModalLabel').text('Edit note');

        const noteId = $(e.target).data('note-id');
        const publisherId = $(e.target).data('publisher-id');
        const text = $(e.target).data('text');
        $('#noteModal input[name="action"]').val('edit');
        $('#noteModal input[name="note_id"]').val(noteId);
        $('#noteModal select[name="publisher"]').val(publisherId).trigger('change');
        $('#noteModal textarea[name="text"]').val(atob(text));
        $('#noteModal').modal('show');
    })

    $('.delete-note-btn').click(function (e) {
        e.preventDefault();
        const noteId = $(e.target).data('note-id');
        const csrf = $('input[name="csrfmiddlewaretoken"]').val()
        swal({
            title: 'Confirm',
            text: `Do you really want to delete this note?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then(() => {
            $.post('', {
                action: 'delete',
                note_id: noteId,
                csrfmiddlewaretoken: csrf
            }, function (data) {
                window.location.reload();
            })
        });
    })

}

module.exports = {
    init,
};
