/* global bootbox */

const ajaxRequest = require('./ajax_request');

/**
 * Init ajax on the page
 * @param data
 */
function init(data) {
    const { linkId } = data;

    $('#createBizdevRuleForm').submit(e => {
        e.preventDefault();

        const myForm = $('#createBizdevRuleForm');

        myForm
            .find(':input:disabled')
            .removeAttr('disabled')
            .attr('disabled', 'disabled');
        ajaxRequest({
            url: `/admin/link/biz_rule/add/${linkId}`,
            data: myForm.serialize(),
        });
    });

    $('#editBizdevRuleForm').submit(e => {
        e.preventDefault();

        const myForm = $('#editBizdevRuleForm');

        myForm
            .find(':input:disabled')
            .removeAttr('disabled')
            .attr('disabled', 'disabled');

        ajaxRequest({
            url: '/admin/link/biz_rule/edit',
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
            url: `/admin/link/rev_rule/add/${linkId}`,
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
            url: `/admin/link/rev_rule/edit`,
            data: myForm.serialize(),
        });
    });

    $('#createRevshareRuleModal').on('hidden.bs.modal', () => {
        $('#createRevshareRuleForm')[0].reset();
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
                        url: '/admin/link/rev_rule/delete',
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
