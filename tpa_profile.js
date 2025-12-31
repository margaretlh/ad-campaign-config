/* global bootbox */

const ajaxRequest = require('./ajax_request');

/**
 * Init ajax request
 * @param data
 */
function init(data) {
    const { tpaId } = data;

    $('#editTpaForm').submit(e => {
        e.preventDefault();

        const myForm = $('#editTpaForm');

        myForm
            .find(':input:disabled')
            .removeAttr('disabled')
            .disabled.attr('disabled', 'disabled');

        ajaxRequest({
            url: `/admin/tpa/profile/edit/${tpaId}`,
            data: myForm.serialize(),
        });
    });

    $('#createRevshareRuleForm').submit(e => {
        e.preventDefault();

        const myForm = $('#createRevshareRuleForm');

        myForm
            .find(':input:disabled')
            .removeAttr('disabled')
            .attr('disabled', 'disabled');

        ajaxRequest({
            url: `/admin/revshare/rule/create/${tpaId}`,
            data: myForm.serialize(),
        });
    });

    $('#editRevshareRuleForm').submit(e => {
        e.preventDefault();

        const myForm = $('#editRevshareRuleForm');

        myForm
            .find(':input:disabled')
            .removeAttr('disabled')
            .attr('disabled', 'disabled');

        ajaxRequest({
            url: `/admin/revshare/rule/edit`,
            data: myForm.serialize(),
        });
    });

    $('#createRevshareRuleModal').on('hidden.bs.modal', () => {
        $('#createRevshareRuleForm')[0].reset();
    });

    $('#editBizdevRuleForm').submit(e => {
        e.preventDefault();

        const myForm = $('#editBizdevRuleForm');

        myForm
            .find(':input:disabled')
            .removeAttr('disabled')
            .attr('disabled', 'disabled');

        ajaxRequest({
            data: myForm.serialize(),
            url: '/admin/bizdev/rule/edit',
        });
    });

    $('#delete_revshare_rule').click(() => {
        // get rule ID
        const ruleId = $('input[id=id_id]').val();

        if (!ruleId) return;

        bootbox.confirm({
            message: 'Are you sure you want to delete this rule?',
            buttons: {
                confirm: { label: 'Yes', className: 'btn-success' },
                cancel: { label: 'No', className: 'btn-danger' },
            },
            callback: result => {
                if (result) {
                    ajaxRequest({
                        url: '/admin/revshare/rule/delete',
                        data: { id: ruleId },
                    });
                    $('#editRevshareRuleModal').modal('hide');
                }
            },
        });
    });
}

module.exports = {
    init,
};
