$(document).ready( function() {
    isMenuOpen = false;

    $("#button").on('click', function(){
        if(isMenuOpen){
            $(".plus").removeClass('spinLeft').addClass('spinRight');
            $(".background").removeClass('expand').addClass('contract');
            isMenuOpen = false;
        } else {
            $(".plus").removeClass('spinRight').addClass('spinLeft');
            $(".background").removeClass('contract').addClass('expand');
            isMenuOpen = true;
        }
    });
});




