//nemu page setting

var winHeight = $(window).height() + 80;
$('a').click(function(){
    $('.section').height('auto');
    var currentName = $(this).attr('href').replace(/\#/g,'');
    var currentScroll = $('#'+currentName).offset();
    $('body').scrollTop(currentScroll.top);
});
