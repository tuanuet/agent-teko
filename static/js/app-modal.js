$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$('.lio-modal').click(function (e) {
    if ($(e.target).attr('data-toggle') === 'modal' || $($(e.target)).is('button')) {
        $(this).removeClass('show');
    }
});