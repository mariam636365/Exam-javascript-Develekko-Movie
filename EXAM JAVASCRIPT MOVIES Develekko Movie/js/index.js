"use strict";

$(document).ready(function () {

    $(".nav-menu i").click(function () { 
        let sideNav = $(".side-nav");
        let nav = $("nav");

        if (sideNav.css("margin-left") === "-250px") {
            // to open sidebar
            sideNav.css("margin-left", "0px");
            nav.css("width", "310px");
        } else {
            // to close sidebar
            sideNav.css("margin-left", "-250px");
            nav.css("width", "60px");
        }
    });

});

// annnnnnn
$(".nav-menu i").click(function () {
    let sideNav = $(".side-nav");
    let nav = $("nav");

    if (sideNav.css("margin-left") === "-250px") {
        sideNav.css("margin-left", "0px");
        nav.css("width", "310px");
        sideNav.addClass("show"); 
    } else {
        sideNav.css("margin-left", "-250px");
        nav.css("width", "60px");
        sideNav.removeClass("show"); // to make each li return back to it`s place
    }
});





// APIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

//  Variables 
let apiKey = "eba8b9a7199efdcb0ca1f96879b83c44";
let baseURL = "https://api.themoviedb.org/3/";
let imgPath = "https://image.tmdb.org/t/p/w500";

//  Hover Functions 
function cardHoverIn() {
    $(this).find($('.overlay')).css({"opacity":"1","visibility":"visible"});
    $(this).find($('.overlay .title')).removeClass('animate__slideOutLeft').addClass('animate__fadeInDown animate__delay-0s');
    $(this).find($('.overlay .desc')).removeClass('animate__slideOutLeft').addClass('animate__flipInX animate__delay-0s');
    $(this).find($('.overlay .date')).removeClass('animate__slideOutLeft').addClass('animate__fadeInUp animate__delay-0s');
    $(this).find($('.overlay .rate')).removeClass('animate__slideOutLeft').addClass('animate__fadeInUp animate__delay-0s');
    $(this).find($('.cardImage img')).addClass("animate");
}

function cardHoverOut() {
    $(this).find($('.overlay')).css({"opacity":"0","visibility":"hidden"});
    $(this).find($('.overlay .title')).removeClass('animate__fadeInDown animate__delay-0s').addClass('animate__slideOutLeft');
    $(this).find($('.overlay .desc')).removeClass('animate__flipInX animate__delay-0s').addClass('animate__slideOutLeft');
    $(this).find($('.overlay .date')).removeClass('animate__fadeInUp animate__delay-0s').addClass('animate__slideOutLeft');
    $(this).find($('.overlay .rate')).removeClass('animate__fadeInUp animate__delay-0s').addClass('animate__slideOutLeft');
    $(this).find($('.cardImage img')).removeClass("animate");
}

//  Convert vote_average to stars 
function getStars(vote) {
    let voteOutOf5 = vote / 2; // CONVERT FROM 10 STARS TO 5 ONLY
    let fullStars = Math.floor(voteOutOf5);
    let halfStar = (voteOutOf5 - fullStars >= 0.5) ? 1 : 0;
    let starHtml = "";
    for(let i=0; i<fullStars; i++) starHtml += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    if(halfStar) starHtml += `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    return starHtml;
}

//  Display Movies 
function displayMovies(movies) {
    let box = "";
    movies.forEach(movie => {
        let poster = movie.poster_path ? imgPath + movie.poster_path : (movie.backdrop_path ? imgPath + movie.backdrop_path : "assets/images/default-movie.jpg");
        let title = movie.title || movie.name;
        let overview = movie.overview.length > 300 ? movie.overview.slice(0,300) + "..." : movie.overview;
        let release = movie.release_date || movie.first_air_date || "Release Date Unknown";
        let vote = movie.vote_average.toFixed(1);
        let stars = getStars(movie.vote_average);

        box += `
        <div class="col-lg-4 col-md-6 col-sm-12 animate__animated animate__fadeIn">
            <div class="item overflow-hidden position-relative">
                <div class="cardImage">
                    <img src="${poster}" class="img-fluid">
                </div>
                <div class="overlay overflow-hidden">
                    <h1 class="animate__animated title">${title}</h1>
                    <p class="animate__animated desc">${overview}</p>
                    <p class="animate__animated date"><span>Release Date</span>: ${release}</p>
                    <h3 class="rate animate__animated">${stars}</h3>
                    <h3 class="rate animate__animated vote">${vote}</h3>
                </div>
            </div>
        </div>
        `;
    });
    $("#moviesRow").html(box);
    $(".item").mouseenter(cardHoverIn).mouseleave(cardHoverOut);
}

//  Fetch Movies 
async function getMovie(category) {
    let url = `${baseURL}${category}?api_key=${apiKey}&language=en-US`;
    try {
        let res = await fetch(url);
        let data = await res.json();
        displayMovies(data.results);
    } catch (err) {
        console.error("Error fetching movies:", err);
    }
}

async function searchMovie(query) {
    if(query.trim() === "") {
        getMovie("movie/now_playing"); // Default
        return;
    }
    let url = `${baseURL}search/movie?query=${query}&api_key=${apiKey}&language=en-US`;
    try {
        let res = await fetch(url);
        let data = await res.json();
        displayMovies(data.results);
    } catch (err) {
        console.error("Error searching movies:", err);
    }
}

//  Sidebar Clicks 
const categoryMap = {
    nowPlaying: "movie/now_playing",
    popular: "movie/popular",
    topRated: "movie/top_rated",
    trending: "trending/all/day",
    upcoming: "movie/upcoming"
};

$('.menu li a').click(function(){
    let attr = $(this).attr("attr");
    if(categoryMap[attr]){
        getMovie(categoryMap[attr]);
        // scroll to top
        $('html, body').animate({ scrollTop: 0 }, 1500,'swing');
    }
});

//  Search FOR ANY MOVIE
$('#search').on("input", e => searchMovie(e.target.value));

//  Default 
$(document).ready(function(){
    getMovie("movie/now_playing");
});



// contacttttttttttttttttttttttttttttt
$(document).ready(function(){
    function validations() {
        // Helper functions
        function showError($error, $this, msg){
            $this.css("border-bottom-color", "rgb(214, 46, 51)");
            $error.text(msg).removeClass('animate__fadeOutUp').addClass('animate__animated animate__flipInX');
        }
        function hideError($error, $this){
            $this.css("border-bottom-color", "#CED4DA");
            $error.removeClass('animate__flipInX').addClass('animate__animated animate__fadeOutUp').text('');
        }
        function checkErrors(){
            return $('#contact .error').filter(function(){ return $(this).text() != ''; }).length > 0;
        }

        // Validation events REGEX FOR CONTACT
        $('#name').on('input', function(){
            const regex = /^[a-zA-Z\s]{1,36}$/;
            const $error = $(this).next();
            if($(this).val() === '') hideError($error, $(this));
            else if(regex.test($(this).val())) hideError($error, $(this));
            else showError($error, $(this), "Invalid Name, only characters allowed");
        });
        $('#email').on('input', function(){
            const regex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
            const $error = $(this).next();
            if($(this).val() === '') hideError($error, $(this));
            else if(regex.test($(this).val())) hideError($error, $(this));
            else showError($error, $(this), "Invalid Email, try example@domain.com");
        });
        $('#phone').on('input', function(){
            const regex = /^(02)?(01)[0125][0-9]{8}$/;
            const $error = $(this).next();
            if($(this).val() === '') hideError($error, $(this));
            else if(regex.test($(this).val())) hideError($error, $(this));
            else showError($error, $(this), "Invalid Phone Number");
        });
        $('#age').on('input', function(){
            const regex = /^(1[6-9]|[2-9][0-9]|100)$/;
            const $error = $(this).next();
            if($(this).val() === '') hideError($error, $(this));
            else if(regex.test($(this).val())) hideError($error, $(this));
            else showError($error, $(this), "Your age must be over 16+");
        });
        $('#password').on('input', function(){
            const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            const $error = $(this).next();
            if($(this).val() === '') hideError($error, $(this));
            else if(regex.test($(this).val())) hideError($error, $(this));
            else showError($error, $(this), "Password must contain numbers & letters, min 8 characters");
        });
        $('#repassword').on('input', function(){
            const $error = $(this).next();
            if($(this).val() === '') hideError($error, $(this));
            else if($(this).val() === $('#password').val()) hideError($error, $(this));
            else showError($error, $(this), "Password not match");
        });

        // Show/hide password
        $('.showPass').click(function(){
            const pass = $('#password');
            if(pass.attr('type') === 'text'){
                pass.attr('type','password');
                $(this).html('<i class="fa-solid fa-eye-slash"></i>');
            } else {
                pass.attr('type','text');
                $(this).html('<i class="fa-solid fa-eye"></i>');
            }
        });
        $('#password').focus(function(){
            $('.showPass').css({"opacity":1, "bottom":"10px"});
        });
        $(document).click(function(e){
            if($(e.target)[0] === $('#password')[0] || $(e.target).closest('.showPass').length){
                $('.showPass').css({"opacity":1, "bottom":"10px"});
            } else {
                $('.showPass').css({"opacity":0, "bottom":"-20px"});
            }
        });

        // Form submit BTN
        $('#contact form').on('submit', function(e){
            if(checkErrors()){
                e.preventDefault();
                const btn = $(this).find('button');
                btn.addClass('animate__shakeX bg-danger');
                setTimeout(()=> btn.removeClass('animate__shakeX bg-danger'), 800);
            }
        });
    }

    // Initialize validations
    validations();
});



// Arrowwwwwwwwwwwww
$(document).ready(function() {
    var backToTop = $('#back-to-top');

    // لما الصفحة تتحرك بالscroll
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) { // لو عمل scroll أكثر من  100px
            backToTop.addClass('active');
        } else {
            backToTop.removeClass('active');
        }
    });

    // لما نضغط على السهم
    backToTop.click(function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 500); // scroll smooth لفوق
    });
});


// smooth contact scrolling
$('a[href="#contact"]').click(function(e){
    e.preventDefault(); // عشان ميبقاش مفاجيء
    let target = $($(this).attr('href'));  
    if(target.length){
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1500, 'swing'); 
    }
});