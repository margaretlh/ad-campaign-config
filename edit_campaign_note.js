/**
 * Init jquery elements
 */
function init() {

    $('.edit-note-btn').click(e => {
        e.preventDefault();
        const text = $(e.target).data('text');
        const campaignNoteId = $(e.target).data('campaign-note-id');
        const date = $(e.target).data('date');
        const type = $(e.target).data('type');
        $('#editNoteTextModal input[name="campaign_note_id"]').val(campaignNoteId);
        $('#editNoteTextModal textarea[name="text"]').text(atob(text));
        $('#editNoteTextModal input[name="date"]').datepicker({
            format: 'yyyy-mm-dd'
        }).datepicker('setDate', date);
        if (type == 'optimization') {
            $('#editNoteTextModal input[name="optimization"]').attr('checked', true);
        }
        else {
            $('#editNoteTextModal input[name="optimization"]').attr('checked', false);
        }
        $('#editNoteTextModal').modal('show');
    });

}

module.exports = {
    init,
};
