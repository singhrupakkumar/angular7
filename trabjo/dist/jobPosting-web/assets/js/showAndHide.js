window.onload = function() {
    var swiper = new Swiper('.services-container', {
        slidesPerView: 5,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    var swiper = new Swiper('.testimonial-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    $('.organisation-details').css('display','none');

    if($('input[name="organisationPart"]').val() == "1"){
        $('.organisation-details').show("1000");
        $("input[name=organisationPart][value=1]").prop('checked', true);
        
    }else{
        $("input[name=organisationPart][value=0]").prop('checked', true);
    }

    $('input[name="organisationPart"]').click(function(){
        if($(this).val()==1){
            $('.organisation-details').show("1000");
        }
        else{
            $('.organisation-details').hide("1000");
        }
    });
    
}