/* global bootbox */

const ajaxRequest = require('./ajax_request');

/**
 * Initialize profile edit
 */
function init(data) {
    const { username } = data;
    const radios1 = $('input[name=rule_type]').change(() => {
        const value = radios1.filter(':checked').val();
        const oh = $('#id_overhead');

        oh.prop('disabled', value === 1);
        if (value === 1) oh.val('0.00');
    });

    const radios2 = $('input[name=rule_type2]').change(() => {
        const value = radios2.filter(':checked').val();
        const oh2 = $('.overhead2');

        oh2.prop('disabled', value === 1);
        if (value === 1) oh2.val('0.00');
    });

    $('#id_rule_type_0').prop('checked', true);
    $('#id_overhead').prop('disabled', true);

    $('#saveProfile').click(e => {
        e.preventDefault();

        ajaxRequest({
            url: `/admin/publishers/profile/edit/${username}`,
            data: $('#editProfile').serialize(),
        });
    });

    $('#createRuleForm').submit(e => {
        e.preventDefault();

        const myForm = $('#createRuleForm');

        myForm
            .find(':input:disabled')
            .removeAttr('disabled')
            .attr('disabled', 'disabled');

        ajaxRequest({
            url: '/admin/bizdev/rule/create',
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
            url: '/admin/bizdev/rule/edit',
            data: myForm.serialize(),
        });
    });

    $('#delete_bizdev_rule').click(() => {
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
                        url: '/admin/bizdev/rule/delete',
                        data: { id: ruleId },
                    });
                    $('#editBizdevRuleModal').modal('hide');
                }
            },
        });
    });

    // reset form when closed
    $('#createTpaModal').on('hidden.bs.modal', () => {
        $('#createTpaForm')[0].reset();
    });
}

module.exports = {
    init,
};
