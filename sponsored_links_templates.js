/**
 * Draw templates
 */
function init() {
    $('.create_add').click(e => {
        const templateName = $(e.target).data('template-name');
        const templateId = $(e.target).data('template-id');

        $('#selected_template').val(templateId); // set template id in form
        $('#selectedTemplateName').html(templateName); // set template name in label for action
        $('#createAds').modal('show');
    });

    $('#id_template_sizes').change(e => {
        const sizes = $('#id_template_sizes')
            .val()
            .split('x');

        $('#template_width').val(sizes[0]);
        $('#template_height').val(sizes[1]);
    });

    $('#template_private').click(e => {
        if ($('#template_private').is(':checked')) {
            $('.owner_input').show();
        } else {
            $('.owner_input').hide();
        }
    });

    $('.template-preview').click(e => {
        const target = $(e.target);
        const templateId = target.data('templateId');
        const pv = $('#preview-div');
        pv.css({
            position: "absolute",
            top: e.pageY,
            left: e.pageX,
        })
        pv.show();
        pv.load(`/sponsored_links/ads/preview//${templateId}/`)
    });

    $(document).mouseup(function (e) {
        var container = $('#preview-div');

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });

    $('.delete-template').click(e => {
        const templateId = $(e.target).data('templateid');
        const templateName = $(e.target).data('template-name');

        swal({
            title: 'Are you sure?',
            text: 'Do you really want to delete the template ' + templateName + ' ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
        }).then(x => {
            $.get(`/sponsored_links/templates/delete/${templateId}/`, data => {
                console.log(data);
                location.reload();
            });
        });
    });
    $('.copy-template').click(e => {
        const templateId = $(e.target).data('templateid');
        const form = $('form#copy_template_form');
        form.find('#template_id').val(templateId);
        form.submit();
    })


}

module.exports = {
    init,
};
