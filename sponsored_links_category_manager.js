/**
 * Init page
 */
function init() {
    $(document).ready(() => {
        $("#id_category").change(function () {
            window.location = `/sponsored_links/category_manager/${$(this).val()}/`;
        });

        $('#id_category_group').change(e => {
            if ($("#id_category").val()) {
                $('#top-form').submit();
            }
        });

        $('#addKeywords').click(function () {
            $('#addKeywordsModal').modal();
        })

        $('#createCategory').click(function () {
            $('#createCategoryModal').modal();
        })

        $('#createCategoryGroup').click(function () {
            $('#createCategoryGroupModal').modal();
        })
    });
}

module.exports = {
    init,
};
