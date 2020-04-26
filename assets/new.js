var check=$("<i class = 'fas fa-check'></i>").click(function(){
    var p=$(this).parent();
    p.fadeOut(function(){
        $(".comp").append(p);
        p.fadeIn();
    });
    $(this).remove();
});