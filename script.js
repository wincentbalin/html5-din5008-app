document.querySelector('#print').addEventListener('click', function(event) {
    window.print();
});

var inputIds = ['backaddress', 'addressnote', 'address', 'additionalinformation', 'text', 'footer'];

document.querySelector('#share').addEventListener('click', function(event) {
    var params = new URLSearchParams();
    inputIds.forEach(function(id) {
        var text = document.getElementById(id).innerText.trim();
        if (text !== '') {
            params.set(id, text);
        }
    });
    var url = [document.location.origin, document.location.pathname,
               '?', params.toString()].join('');
    var shareData = {title: 'Briefvorlage', text: url, url: url};
    if ('canShare' in navigator && navigator.canShare(shareData)) {
        navigator.share(shareData);
    } else {
        window.prompt('Kopiere die Vorlage und drücke beliebigen Knopf', url);
    }
});

if (document.location.search) {
    var params = new URLSearchParams(document.location.search);
    inputIds.forEach(function(id) {
        if (params.has(id)) {
            document.getElementById(id).innerText = params.get(id);
        }
    });
}