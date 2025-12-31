let selectedAmount = 0;
let selectedTpaId = undefined;

function init(data) {
    $('.confirm-action').click(function (e) {
        const target = $(e.target);
        const tpa_id = target.data('tpaId');
        const tpa_name = target.data('tpaName');
        const revenue = target.data('revenue');
        swal({
            title: 'Confirm',
            text: `Do you want to confirm TPA ${tpa_name} earned $${revenue} this month`,
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then(() => {
            $.post('', {
                tpa_id: tpa_id,
                amount: revenue,
                type: 'confirm',
            }, function (data) {
                window.location.reload();
            })
        });
    })

    $('.edit-action').click(function (e) {
        const target = $(e.target);
        const tpa_id = target.data('tpaId');
        const tpa_name = target.data('tpaName');
        selectedAmount = target.data('revenue');

        $('#tpa-name-info').html(tpa_name);
        $('#tpa-id').val(tpa_id);


        $('#edit-amount-modal').modal('show');
    })

    $('.credentials-action').click(function (e) {
        const target = $(e.target);
        const tpa_name = target.data('tpaName');
        const password = target.data('tpaPassword');
        const loginUrl = target.data('tpaLoginUrl');
        const tpa_id = target.data('tpaId');

        $('.tpa-name-cred').val(tpa_name);
        $('.tpa-password-cred').val(password);
        $('.tpa-loginurl-cred').html(loginUrl);
        $('.tpa-loginurl-cred')[0].href = loginUrl;
        $('.tpa-notes').html('loading notes...')
        loadNotes(tpa_id)
        selectedTpaId = tpa_id;

        $('#tpa-credentials-modal').modal('show');
    })

    $('.fa-clipboard').click(function (e) {
        const target = $(e.target);
        const valTarget = target.data('val');
        const targetElement = $('.' + valTarget)
        copyToClipboard(targetElement);
    })

    $('#manual-adj-confirm').click(function (e) {
        e.preventDefault()
        const newAmount = $('#earnings-modal-input').val()
        const changeBigger10Percent = Math.abs(selectedAmount - newAmount) > selectedAmount * 0.1
        if (newAmount == 0 || changeBigger10Percent) {
            swal({
                title: 'Confirm',
                text: `Are you sure you want to change the original amount of $${selectedAmount} to $${newAmount}?`,
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
            }).then(() => {
                $('#manual-edit-form').submit()
            });
        } else {
            $('#manual-edit-form').submit()
        }

    })

    $('#tpa-notes-save').hide()

    $('.tpa-notes').keyup(function () {
        $('#tpa-notes-save').show()
    })

    $('#tpa-notes-save').click(function () {

        saveNote()
    })
}

function copyToClipboard(targetElement) {
    targetElement.select();

    document.execCommand("copy");

}

function loadNotes(tpaId) {
    $.get(`/accounting/tpa_adjustments/notes/${tpaId}/`, function (data) {
        $('.tpa-notes').html(data.notes)
    })
}

function saveNote() {
    let notes = $('.tpa-notes').val()
    console.log('>>', notes)
    $('.tpa-notes').html('')
    $.post(`/accounting/tpa_adjustments/notes/${selectedTpaId}/`, { notes: notes }, function (data) {
        $('#tpa-notes-save').hide()
        $('.tpa-notes').html(data.notes)
    })
}

module.exports = {
    init,
};
