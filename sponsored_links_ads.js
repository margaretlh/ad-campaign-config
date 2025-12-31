/* global swal */

/**
 * prevent space as input
 */
function init() {
    function parsePasteData(data) {
        const rows = data.split('\n');
        const result = [];

        for (const i in rows) {
            const rowCells = rows[i].split('\t');

            if (rowCells.length === 4) {
                // use 4 colums
                result.push(rowCells);
            }
        }

        return result;
    }

    $('#paste_data').click(e => {
        $('#pasteAdLinks').modal('show');
    });

    $('#paste-data').click(e => {
        const data = parsePasteData($('#pasteinput').val());
        let inputRows = $('#ad-links tr');
        const dataInputDifference = data.length - inputRows.length;

        /* if existing inputs less then rows pasted -> create inputs */
        if (dataInputDifference > 0) {
            for (let i = 0; i < dataInputDifference; i++) {
                createAdLink();
            }
        }
        inputRows = $('#ad-links tr');
        /* paste data */
        for (const row in data) {
            const inputs = $(inputRows[row]).find('td input');

            for (const col in data[row]) {
                $(inputs[col]).val(data[row][col]);
            }
        }
    });

    let submitMode = 'create';

    function createAdLink() {
        let idInputFieldForEdit = '';

        if (submitMode === 'edit') {
            idInputFieldForEdit = `<input type="hidden" name="link_id" value="${0}">`;
        }

        $('#ad-links').append(
            `${'<tr>' +
            '<td><input type="text" data-model="url" name="url" class="form-control" placeholder="http://..."></td>' +
            '<td><input type="text" data-model="keyword__keyword" name="keyword" class="form-control" placeholder="Keyword"></td>' +
            '<td><input type="text" data-model="category__name" name="category" class="form-control" placeholder="Category"></td>' +
            '<td><input type="text" data-model="params" name="params" class="form-control" placeholder="eg. ?s3={id}"></td>'}${idInputFieldForEdit}</tr>`,
        );

        /* autocomplete urls */
        $('#add-modify-adcontainer-form input').each((idx, elem) => {
            const target = $(elem).data('model');

            $(elem).autocomplete({
                source: `/sponsored_links/ads/autocomplete/${target}/`,
                minLength: 0,
                select(event, ui) { },
            });
        });
    }

    function generateEditAdLinks(links) {
        for (let i in links) {
            const link = links[i];

            $('#ad-links').append(
                `${'<tr>' +
                '<td><input type="text" name="url" class="form-control" placeholder="http://..." value="'}${link.url}"></td>` +
                `<td><input type="text" name="keyword" class="form-control" placeholder="Keyword" value="${link.keyword__keyword}"></td>` +
                `<td><input type="text" name="category" class="form-control" id="exampleInputEmail1" placeholder="Category" value="${link.category__name}">` +
                `<td><input type="text" data-model="params" name="params" class="form-control" placeholder="eg. ?s3={id}" value="${link.params}"></td>` +
                `<input type="hidden" name="link_id" value="${link.id}">` +
                `</td>` +
                `</tr>`,
            );
        }
    }

    $(document).ready(() => {
        // create ad listener
        $('#create_ad').click(e => {
            submitMode = 'create';
            // reset
            $('#ad-links').html('');
            $('#ad-name').val('');
            $('#ad-title').val('');
            $('#input-method').val(submitMode);
            // toggle visibility
            $('#ad_form_container').show('normal'); // animation is optional. use toggle() for no animation..
            // ad first row
            createAdLink();
        });

        $('#add_link').click(e => {
            createAdLink();
        });
        $('.edit_ad').click(e => {
            submitMode = 'edit';

            const adid = $(e.target).data('adid');

            $('#ad_form_container').show('normal');
            $('#ad-links').html(`<input type="hidden" name="ad_id" value="${adid}">`); // add ad id for as invisible input
            $('#input-method').val(submitMode);
            jQuery.getJSON(`/sponsored_links/ads/data/${adid}/`, data => {
                if (Object.keys(data).indexOf('error') === -1) {
                    $('#ad-title').val(data.ad_data.title);
                    $('#ad-name').val(data.ad_data.name);
                    generateEditAdLinks(data.ad_links);
                } else {
                    console.log('error!', data); // TODO handle error
                }
            });
        });
        $('.delete_ad').click(e => {
            const adid = $(e.target).data('adid');

            swal({
                title: 'Really delete ad?',
                text: "You won't be able to revert this! ",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then(() => {
                swal('Deleted!', 'The ad has been deleted', 'success').then(() => {
                    window.location.href = `/sponsored_links/ads/delete/${adid}/`;
                });
            });
        });
    });
}

module.exports = {
    init,
};
