/* global ace */

let { templateId, templateWidth, templateHeight } = {};

/**
 * Init template
 *
 */
function init(data) {
    ({ templateId, templateWidth, templateHeight } = data);

    $(document).ready(() => {
        const editor = ace.edit('editor');

        editor.setTheme('ace/theme/chrome');
        editor.getSession().setMode('ace/mode/html');
        const form = $('form#form');
        const textarea = form.find('#html_content');

        textarea.val(editor.getSession().getValue());

        editor.getSession().on('change', () => {
            textarea.val(editor.getSession().getValue());
        });
        form.find('button#save_template').click(e => {
            textarea.val(btoa(textarea.val()));
            form.submit();
        })

        $('#previewTemplateBtn').click(e => {
            $('#preview-content').html(
                `'<iframe class="center-block" src=/sponsored_links/ads/preview//${templateId}/ 
          width="${templateWidth}" 
          height="${templateHeight}" 
          frameBorder="0">
          </iframe>`,
            );
        });

        $('#addVariableBtn').click(e => {
            $('#createVariableModal').modal('show');
            // TODO clear forms! [MiB]
        });
        $('#createVariableBtn').click(e => {
            const varName = $('#varnameinput')
                .val()
                .replace(' ', '');
            const varType = $('#vartypeinput').val();
            const varDesc = $('#vardescinput').val();
            const availableChoices = $('#availableChoices')
                .val()
                .split(',');
            let varHtml = '<input type="hidden" name="variable_ids" value="-1">';

            if (varType === 'Text') {
                varHtml += `<div class="form-group"> \
                    <input type="hidden" name="variable_names" value="${varName}">\
                    <input type="hidden" name="variable_descriptions" value="${varDesc}">\
                    <input type="hidden" name="variable_types" value="TX">\
                    <input type="hidden" name="variable_choices" value="">\
                    <label for="${varName}-label" class="col-sm-2 control-label">${varName}</label> \
                    <div class="col-sm-10"> \
                    <input id="${varName}-label" type="text" name="variable_values" class="form-control col-xs-10" value=""> \
                    </div> \
                  </div>`;
            } else if (varType === 'Choices') {
                varHtml += `<div class="form-group">\
                                <input type="hidden" name="variable_names" value="${varName}">\
                                <input type="hidden" name="variable_descriptions" value="${varDesc}">\
                                <input type="hidden" name="variable_types" value="LB">\
                                <input type="hidden" name="variable_choices" value="${$(
                    '#availableChoices',
                ).val()}">\
                                <label for="${varName}-label" class="col-sm-2 control-label">${varName}</label>\
                                <div class="col-sm-10">\
                                <select class="form-control col-sm-6" name="variable_values">`;
                for (const i in availableChoices) {
                    varHtml += `<option>${availableChoices[i]}</option>`;
                }
                varHtml +=
                    '</select>\
                    </div>\
                    </div>';
            }
            // varHtml += '<span>delete-btn</span>';
            $('#template-vars').append(varHtml);
        });

        /* show vartype input when creating choices input */
        $('#vartypeinput').change(e => {
            if ($('#vartypeinput').val() === 'Choices')
                $('#availChoicesGroup').show();
            else $('#availChoicesGroup').hide();
        });

        $('#deleteVariable').click(e => {
            console.log('delete var', e);
        });

        $('#addChoice').click(e => {
            console.log('add choice', e);
        });


        function fillField(field, name, label) {
            let labelEl = field.find('label');
            labelEl.attr('for', name);
            labelEl.text(label);

            let inputEl = field.find('input');
            inputEl.attr('name', name);
        }


        function loadSnippetLink() {
            let selected = $('#snippetSelect').find(':selected');
            let snippetLink = $('#snippetLink');
            let currentId = selected.data('id');
            if (currentId) {
                snippetLink.attr('href', '/sponsored_links/snippets/' + currentId);
                let snippetLinkIcon = snippetLink.find('i');
                if (selected.data('templates-count') == 0) {
                    snippetLinkIcon.attr('class', 'fa fa-edit text-black');
                }
                else {
                    snippetLinkIcon.attr('class', 'fa fa-eye text-black');
                }
                snippetLink.show()
            }
        }


        $('#snippetSelect').select2();

        loadSnippetLink();

        var fieldset = $('#snippetVariables');

        $('#snippetSelect').change(function () {
            fieldset.html("");
            let selected = $(this).find(':selected');
            let variables_str = selected.data('variables');
            if (variables_str) {
                let variables = variables_str.split(',');
                variables.forEach(variable => {
                    let field = $('#fieldTemplate').clone();
                    field.show();
                    fillField(field, 'snippet_variable_' + variable, variable);
                    fieldset.append(field);
                });
            }
            loadSnippetLink();
        });
    });
}

module.exports = {
    init,
};
