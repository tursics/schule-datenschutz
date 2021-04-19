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

    var links = $('.card--2nd').find('a');
    links.click(function(event) {
        var link = $(this).attr('href');
        if ((link.length > 0) && (link[0] === '#')) {
            event.preventDefault();
            showQuestion($(link));
        }
    });

    showNextCard();
}

$.fn.initFAQ = function() {
    return this.each(function() {
        var questions = $(this).find('li');

        questions.on('click', function() {
            showQuestion(this);
        });

        var link = $('#start');
        showQuestion(link);
    });
};

$('.faq').initFAQ();
