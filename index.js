function showNextCard() {
    var cards = $('.card'),
        next = cards.filter('.card--1st');

    cards.removeClass('card--1st card--2nd card--3rd');

    next = next.length ? next : cards.first();
    next.addClass('card--3rd');
    next = next.next();
    next = next.length ? next : cards.first();
    next.addClass('card--1st');
    next = next.next();
    next = next.length ? next : cards.first();
    next.addClass('card--2nd');
}

function showQuestion(obj) {
    var question = $(obj).find('.faq--question').html();
    var answer = $(obj).find('.faq--answer').html();
    var background = $(obj).find('.faq--answer').data('bg');

    $('.card--2nd .card--question').html(question);
    $('.card--2nd .card--answer').html(answer);
    $('.card--2nd').removeClass(function(index, className) {
        return (className.match(new RegExp("\\bbg-\\S+", "g")) || []).join(' ');
    }).addClass('bg-' + background);

    showNextCard();
}

function showQuestionLink(anchor) {
    var link = $('li > a[href="' + anchor + '"]');
    showQuestion(link.parent());
}

$.fn.initFAQ = function() {
    return this.each(function() {
        var hash = location.hash || '#start';
        showQuestionLink(hash);
    });
};

function locationHashChanged() {
    var link = location.hash;
    if ((link.length > 0) && (link[0] === '#')) {
        showQuestionLink(link);
    }
}

$('.faq').initFAQ();

window.onhashchange = locationHashChanged;
