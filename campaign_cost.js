var campaign_id = 0;
var foreignContext = false;
/**
 * @summary main function called by page. call openSearchModal with campaign id if 
 *          included from foreign page
 * @param djangoContext (empty object for including in foreign page!)
 */
function main(djangoContext) {
    if ('campaign_id' in djangoContext) {
        campaign_id = djangoContext.campaign_id;
    } else {
        foreignContext = true;
    }
    $('#associate-btn').click(function () {
        openSearchModal();
    });
    $('#list-view-btn').click(function () {
        openListViewModal();
    });

    $('#type').on('change', function (e) {
        var type = $('#type').val()
        loadAutocomplete({ query: 'accounts', type: type, campaign_id: campaign_id }, 'account');

        $('#account-grp').show();
        $('#identifier-grp').hide();
    });

    $('#account').on('change', function (e) {
        var account = $('#account').val()
        loadAutocomplete({ query: 'identifiers', account: account, campaign_id: campaign_id }, 'identifier');
        $('#identifier-grp').show();
    });

    $('#identifier').on('change', function (e) {
        $('#sbm-btn').prop('disabled', false);
    });

    $('#search-tpc-form').submit(function (e) {
        e.preventDefault();
        $.getJSON('/admin/trafficguard/campaign/tpclink/search', { q: $('#search-tpclink').val(), campaign_id: campaign_id }, function (data) {
            renderTable(data)
        })
        return false;
    })
}

function renderTable(data) {
    var rowdata = [];
    var action_str = '';
    if (foreignContext) {
        action_str = 'action="/admin/trafficguard/campaign/cost/' + campaign_id + '/"'
    }
    data.results.forEach(function (result) {
        rowdata.push(
            '<tr>' +
            '<td>' + result.report_identifier + '</td>' +
            '<td>' + result.tpc_acc__name + '</td>' +
            '<td>' + result.tpc_acc__type + '</td>' +
            '<td>' + result.clicks + '</td>' +
            '<td><form method="post" ' + action_str + '> <button name="identifier" value="' + result.id + '" type="submit">Assign</button></form></td>' +
            '</tr>'
        )
    })
    $('#search-content').html(rowdata.join('\n'))
}

function openListViewModal() {
    if (foreignContext) {
        $('#assign-form').attr('action', '/admin/trafficguard/campaign/cost/' + campaign_id + '/');
        $('#internal-provider-form').attr('action', '/admin/trafficguard/campaign/cost/' + campaign_id + '/');
    }
    $('#account-grp').hide();
    $('#identifier-grp').hide();
    $('#sbm-btn').prop('disabled', true);
    loadAutocomplete({ query: 'types', campaign_id: campaign_id }, 'type')
    $('#associate-modal').modal('show');

}

function openSearchModal(campaignId) {
    if (typeof campaignId !== 'undefined')
        campaign_id = campaignId;
    if (foreignContext) {
        $('#assign-form').attr('action', '/admin/trafficguard/campaign/cost/' + campaign_id + '/');
        $('#internal-provider-form').attr('action', '/admin/trafficguard/campaign/cost/' + campaign_id + '/');
    }
    $('#associate-search-modal').modal('show');
    $('#search-content').html('');
}

function loadAutocomplete(query, element_id) {
    $.getJSON('/admin/trafficguard/campaign/tpclink/autocomplete', query, function (data) {
        let opts = '<option></option>';
        for (var l = 0; l < data.results.length; l++) {
            opts += '<option value="' + data.results[l].id + '"> ' + data.results[l].label + '</option>\n';
        }
        $('#' + element_id).html(opts)
    })
}

function removeTcl(tclId) {
    swal({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        input: 'checkbox',
        inputPlaceholder: 'Unassociate cost from this campaign'
    }).then((result) => {
        console.log('be it like that', tclId, result)

        if (result == 1) {
            window.location = `/admin/trafficguard/campaign/tpclink/remove/${tclId}/?unassociate=on`;
        } else {
            window.location = `/admin/trafficguard/campaign/tpclink/remove/${tclId}/`;
        }
        // /admin/trafficguard/campaign/tpclink/remove/{{cl.id}}/
        // $.get(`/admin/publisher/tpa/delete/${tpaId}/`, () => {
        //   window.location = `/admin/publisher/tpa_list/?username=${username}`;
        // });
    });

}

module.exports = {
    main,
    openSearchModal,
    removeTcl,
};
