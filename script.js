document.querySelector('#print').addEventListener('click', function(event) {
    window.print();
});

var inputIds = ['backaddress', 'addressnote', 'address', 'additionalinformation', 'text', 'footer'];

document.querySelector('#share').addEventListener('click', function(event) {
    var params = inputIds.filter(function(id) {
        var text = document.getElementById(id).innerText;
        return text.trim() !== '';
    }).map(function(id) {
        var text = document.getElementById(id).innerText;
        return [id, '=', encodeURIComponent(text)].join('');
    }).join('&');
    var url = [document.location.origin, document.location.pathname,
               '?', params].join('');
    window.open(url, '_blank');
});

if (document.location.search) {
    document.location.search.substring(1).split('&').map(function(param) {
        return param.split('=');
    }).filter(function(kv) {
        var id = kv[0];
        return inputIds.indexOf(id) !== -1;
    }).forEach(function(kv) {
        var id = kv[0];
        var text = decodeURIComponent(kv[1]);
        document.getElementById(id).innerText = text;
    });
}