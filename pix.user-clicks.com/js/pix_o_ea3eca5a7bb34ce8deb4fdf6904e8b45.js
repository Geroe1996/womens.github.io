(function() {

    'use strict';

    var version = "002";

    getRequest("//sync.user-clicks.com/?src=gp3&cid=A2D4FF&cmp=adcombo&act=load&event=start&s_trk={TR_KEY}");
    document.addEventListener("DOMContentLoaded", DOMready);
    window.onload = function() { setTimeout(Bodyready, 10); };

    function DOMready() {
        getRequest("//sync.user-clicks.com/?src=gp3&cid=A2D4FF&cmp=adcombo&act=load&event=domload&s_trk={TR_KEY}");
    }

    function Bodyready() {
        getRequest("//sync.user-clicks.com/?src=gp3&cid=A2D4FF&cmp=adcombo&act=load&event=bodyload&s_trk={TR_KEY}");
    }


    function encodeSafeBase64 (data2encode) {
        try {
            var retdata = window.btoa(data2encode)
                .replace(/\//g, "_")
                .replace(/\+/g, "-")
                .replace(/=/g, "*");
            return retdata; 
        } catch (exc) {
            return '';
        }
    }

    function getRequest(url) {        
        var logstate1 = getLogState(),
            hiddenPix = new Image(),
            offer_id = '',
            page_type = '',
            page_id = '',
            page_version = '&version='   + version,
            page_esub = '';
        if (window.acrum_extra && window.acrum_extra.id) {
            offer_id  = '&offer_id='  + window.acrum_extra.offer_id;
            page_type = '&page_type=' + window.acrum_extra.type;
            page_id   = '&page_id='   + window.acrum_extra.id;
            page_esub = '&page_esub='   + window.acrum_extra.esub;            
        }
        hiddenPix.src = url + "&rawdata64=" + logstate1 + offer_id + page_type + page_id + page_esub + page_version;
    }

    function getLogState() {
        var logstate1raw = {},
            logstate1 = '';
        try {
            if(window.performance && window.performance.timing && window.performance.timing.toJSON) {
                logstate1raw = window.performance.timing.toJSON();
            }
            logstate1 = encodeSafeBase64(JSON.stringify(logstate1raw));
        } catch (exc) {
            logstate1 = '';
        }
        
        return logstate1;
    }

}());