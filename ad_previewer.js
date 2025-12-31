function initAdPreviewer(templateSelector, previewDivSelector) {
    $(templateSelector).mouseenter(function (e) {
        const target = $(e.target);
        const templateId = target.data('templateId');
        const adcId = target.data('adcId');
        const pv = $(previewDivSelector);
        pv.css({
            position: "absolute",
            top: e.pageY - 200,
            left: e.pageX + 5,
        })
        pv.show();

        if (!$('#frame').length) {
            $(previewDivSelector).html('<iframe id="frame" src="" width="100%" height="100%" onLoad="iframeLoaded();"></iframe>');
        }
        else {
            $("#frame").contents().find("body").html('');
        }

        $("#frame").attr("src", `/sponsored_links/ads/preview/${adcId}/${templateId}/`);


    }).mouseleave(function (e) {
        var container = $(previewDivSelector);
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });
}

function iframeLoaded() {
    const iframe = $("#frame")[0];
    iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
    iframe.width = Math.max(iframe.contentWindow.document.body.scrollWidth, 300) + "px";
}


module.exports = { initAdPreviewer, iframeLoaded };
