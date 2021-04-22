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

    $('.card--2nd .card--question').html(question);
    $('.card--2nd .card--answer').html(answer);

    showNextCard();
}

function showQuestionLink(anchor) {
    var link = $('li > a[href="' + anchor + '"]');
    showQuestion(link);
}

$.fn.initFAQ = function() {
    return this.each(function() {
        showQuestionLink('#start');
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
