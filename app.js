$(document).ready(function () {
    var screenMiddle = window.innerHeight / 2;

    setBackgroundOpacities();

    function getCloseness(currentMiddle, section) {
        var sectionHeight = section.outerHeight();
        var sectionTop = section.position().top;
        var endThreshhold = (sectionHeight / 2) + 200;
        var sectionMiddle = sectionTop + (sectionHeight / 2);
        var sectionBeginning = sectionMiddle - endThreshhold;
        var sectionEnd = sectionMiddle + endThreshhold;
        var closeness = endThreshhold - Math.abs(currentMiddle - sectionMiddle);
        var adjustment = (closeness / endThreshhold) * 1.5;
        var under1 = Math.min(adjustment, 1);

        return Math.max(under1, 0);
    }

    function setBackgroundOpacity(backgroundDiv, closeness) {
        backgroundDiv.css('opacity', closeness);
    }

    function setBackgroundOpacities() {
        var currentMiddle = $(this).scrollTop() + screenMiddle;

        // with the currentMiddle, work out a value between 0 and 1 that is to do with the distance the currentMiddle is from the section middles
        // 0 = above or below the section
        // 1 = currentMiddle == sectionMiddle
        var oneCloseness = getCloseness(currentMiddle, $('#one'));
        var twoCloseness = getCloseness(currentMiddle, $('#two'));
        var threeCloseness = getCloseness(currentMiddle, $('#three'));

        // output the closeness values for each section
        $('#js-one').html(oneCloseness);
        $('#js-two').html(twoCloseness);
        $('#js-three').html(threeCloseness);
        $('#js-bottom').html(currentMiddle);

        // set the opacity of the backgrounds as per their closeness values
        setBackgroundOpacity($('.background.blue'), oneCloseness);
        setBackgroundOpacity($('.background.green'), twoCloseness);
        setBackgroundOpacity($('.background.pink'), threeCloseness);
    }

    $(window).scroll(function (e) {
        setBackgroundOpacities();
    });
});