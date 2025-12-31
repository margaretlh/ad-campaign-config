/* global swal */
/**
 * prevent space as input
 */
function init() {
    $('#zone_name').on({
        keydown(e) {
            if (e.which === 32) return false;
        },
        change() {
            this.value = this.value.replace(/\s/g, '');
        },
    });

    $(document).ready(() => {
        $('.show-when-optimize').hide();

        const loadData = function (zoneId, format) {
            $('#servingcode pre').html('loading...');
            $(
                '#servingcode pre',
            ).load(
                `/sponsored_links/zones/serving_code/${zoneId}/?format=${format}`,
                (data, completed) => {
                    if (completed === 'error') {
                        $('#servingcode pre').html('error! check width and height!');
                    }
                },
            );
        }

        $('button.format-code').click(function (e) {
            const zoneId = $(e.target).data('zone');
            const format = $(e.target).data('format');

            loadData(zoneId, format)
        })

        $('button#copy-bulk-serving-codes').click(function (e) {
            const range = document.createRange();
            range.selectNode($('#bulk-serving-code-result pre')[0])
            window.getSelection().removeAllRanges()
            window.getSelection().addRange(range)
            document.execCommand("copy")
            window.getSelection().removeAllRanges()
        })


        $('#select-all').click(function (e) {
            const checked = $(e.target).is(":checked")

            $('input.grid-selected-rows').each(function (i, checkbox) {
                $(checkbox).prop('checked', checked)
            })
        })

        $('button.format-codes').click(function (e) {
            const format = $(e.target).data('format')

            let selected_rows = $('input.grid-selected-rows:checked').toArray()

            // if none are selected, use all 
            if (!selected_rows.length)
                selected_rows = $('input.grid-selected-rows').toArray()

            const selected_zone_ids = selected_rows.map(el => el.value).join(',')

            $('#bulk-serving-code-result pre')
                .html('loading...')
                .load(
                    `/sponsored_links/zones/serving_codes?zone_ids=${selected_zone_ids}&format=${format}`,
                    (data, completed) => {
                        if (completed === 'error')
                            $('#servingcode pre').html('error! check width and height!')
                        else
                            $('button#copy-bulk-serving-codes').click()
                    }
                );
        })


        $('.serving-code-open').click(e => {
            const zoneId = $(e.target).data('zone_id');
            $('#getServingCodeModal').modal('show');
            $('button.format-code').each(function (idx, el) {
                $(el).data('zone', zoneId)
            })
            $('#servingcode pre').html('please select format!');
        });


        $('.delete-zone').click(e => {
            const zoneId = $(e.target).data('zone-id');
            const zoneName = $(e.target).data('zone-name');
            swal({
                title: 'Delete Zone?',
                text: `Do you really want to delete zone ${zoneName}`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete Zone!',
            }).then(() => {
                $.get(`/sponsored_links/zones/delete/${zoneId}/`, data => {
                    if (data.status == 'success') {
                        swal(
                            'Deleted!',
                            'The zone was successfully deleted',
                            'success',
                        ).then(() => {
                            location.reload();
                        });
                    } else {
                        swal(
                            'Error!',
                            `It appears the zone received traffic in the last ${data.day_range} days`,
                            'error',
                        )
                    }
                });
            });
        })



        $('#optimize_ads').click(e => {
            const isChecked = e.target.checked;

            if (isChecked) {
                $('.show-when-optimize').show();
            } else {
                $('.show-when-optimize').hide();
            }
        });

        $('.manual_optimize').click(e => {
            // href="/sponsored_links/zones/optimize_ads/{{zone.id}}/"
            const zoneid = $(e.target).data('zoneid');
            const clicks = $(e.target).data('clicks');

            swal({
                title: 'Manually optimize?',
                text: `Do you want to manually optimize all ads for this zone with more than ${clicks} clicks in given period `,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, optimize ads!',
            }).then(() => {
                $.get(`/sponsored_links/zones/optimize_ads/${zoneid}/`, data => {
                    swal(
                        'Optimized!',
                        'The zone has been optimized',
                        'success',
                    ).then(() => {
                        location.reload();
                    });
                });
            });
        });

        $('#export-serving-code').click(e => {
            $('#getBulkServingCodeModal #bulk-serving-code-result pre').html("")
            $('#getBulkServingCodeModal').modal('show')
        });

        $('#add-zone').click(e => {
            $('#adZone .ad-cloning-el').remove()
            $('#adZoneLabel').text('Ad Zone');
            $('#adZone input[name=name]').val('');
            $('#adZone input[name=width]').val('');
            $('#adZone input[name=height]').val('');
            $('#adZone input[name=zoneid]').val('');
            $('#adZone #optimize_ads').prop('checked', false);
            $('#adZone input[name=optimize_after_clicks]').val('');
            $('#adZone #optimize_strategy').val('');
            $('#adZone #optimize_go_back_days').val('');
            $('#adZone #optimize_ad_level').val('');
            $('#adZone').modal('show');
        });



        function fillForm(currentEl) {
            $('#adZone .ad-cloning-el').remove()

            const zoneId = currentEl.data('zone-id');
            const zoneName = currentEl.data('zone-name');
            const zoneWidth = currentEl.data('zone-width');
            const zoneHeight = currentEl.data('zone-height');
            const optimizeAds = currentEl.data('optimize-ads');
            const optimizeAfterClicks = currentEl.data('optimize-clicks');
            const optimizeStrategy = currentEl.data('optimize-strategy');
            const optimizeGoBackDays = currentEl.data('optimize-go-back-days');
            const optimizeAdLevel = currentEl.data('optimize-ad-level');
            const snippetCode = currentEl.data('snippet-code');

            $('#adZone input[name=name]').val(zoneName);
            $('#adZone input[name=width]').val(zoneWidth);
            $('#adZone input[name=height]').val(zoneHeight);
            $('#adZone input[name=zoneid]').val(zoneId);
            $('#adZone #optimize_ads').prop('checked', optimizeAds);
            $('#adZone input[name=optimize_after_clicks]').val(optimizeAfterClicks);
            $('#adZone #optimize_strategy').val(optimizeStrategy);
            $('#adZone #optimize_go_back_days').val(optimizeGoBackDays);
            $('#adZone #optimize_ad_level').prop('checked', optimizeAdLevel);

            /* if opt strategy checked, show  more controls */
            if (optimizeAds) {
                $('.show-when-optimize').show();
            } else {
                $('.show-when-optimize').hide();
            }

            const useSnippet = snippetCode.length > 0;
            $('#adZone #use_snippet').prop('checked', useSnippet);
            if (useSnippet) {
                ace.edit('editor').setValue(snippetCode, 1);
                $('#snippet_code_field').show();
            }
            else {
                ace.edit('editor').setValue('');
                $('#snippet_code_field').hide();
            }


            $('#adZone').modal('show');
        }



        $('.edit-zone').click(e => {
            $('#adZoneLabel').text('Edit Zone')
            var currentEl = $(e.target)
            fillForm(currentEl)
        });


        const AdNamesController = require('./ad_names_controller');

        $('.clone-zone').click(e => {
            let cloneZoneEl = $(e.target);
            let editZoneEl = cloneZoneEl.parent().parent().find('.edit-zone');
            const zoneName = editZoneEl.data('zone-name');
            $('#adZoneLabel').text(`Clone Zone ${zoneName}`);
            fillForm(editZoneEl)
            if (cloneZoneEl.data('ads').length > 0) {
                let adNamesController = new AdNamesController(cloneZoneEl);
            }
            $('.modal#adZone fieldset').prepend($('#clone_to_site_fields_template').html())
            $('.modal#adZone fieldset select#clone_to_site').select2();
        });


        const editor = ace.edit('editor');

        editor.setTheme('ace/theme/chrome');
        editor.getSession().setMode('ace/mode/javascript');

        const textarea = $('#snippet_code');

        textarea.val(editor.getSession().getValue());

        editor.getSession().on('change', () => {
            textarea.val(editor.getSession().getValue());
        });

        $('#use_snippet').click(e => {
            const isChecked = e.target.checked;

            if (isChecked) {
                $('#snippet_code_field').show();
            } else {
                $('#snippet_code_field').hide();
                ace.edit('editor').setValue('');
            }
        });

        $(document).on('change', '.modal#adZone input#to_another_site', function () {
            if (this.checked) {
                $('.modal#adZone div#clone_to_site_wrapper').show()
            }
            else {
                $('.modal#adZone div#clone_to_site_wrapper').hide()
            }
        });

        $('.modal#moveZone select#to_site').select2();
        $('.move-zone').click(e => {
            var zone_id = $(e.target).data('zone-id');
            $('.modal#moveZone input[name=zoneid]').val(zone_id);
            $('.modal#moveZone').modal('show');
        });

    });
}

module.exports = {
    init,
};
