let API_Key = `85b52364659ca4e7522292a138f1cc1e`
let API_Categories = ['now_playing', 'popular', 'top_rated', 'upcoming']
let Base_URL= `https://api.themoviedb.org/3/search/movie`
let trendingFetched = false;
const movieContainer = document.getElementById('movie')


$(document).ready(function () {
    $('.loading').fadeOut(1000)
    console.log(document);
    getMovies('now_playing')
})
async function getMovies(category) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_Key}`)

    try {
        const data = await response.json();
        if (data.results) {
            console.log(data.results);
            showMovies(data.results);
        } else {
            console.error('No results found for category:', category);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}





async function showMovies(movies) {
    let movie = document.getElementById('movie')
    movie.innerHTML = ''
    if (movies && movies.length > 0) {
        movies.forEach((movie) => {
            const movieEL = document.createElement('div');
            movieEL.classList.add('col-lg-4', 'col-md-6', 'col-sm-12', 'animate__animated', 'animate__fadeIn');
            movieEL.innerHTML = `
        <div class="item overflow-hidden position-relative animate__fadeIn">
            <div class="cardImage animate__fadeIn">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-fluid">
            </div>
            <div class="overlay overflow-hidden animate__fadeIn">
                <h1 class="animate__animated title">${movie.original_title}</h1>
                <p class="animate__animated desc">${movie.overview}</p>
                <p class="animate__animated date"><span class="fst-normal">${movie.release_date}<span> : 2023-08-02</span></span></p>
                <h3 class="rate animate__animated"><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-regular fa-star-half-stroke text-warning fs-6"></i></h3>
                <h3 class="rate animate__animated vote">${movie.vote_average}</h3>
            </div>
        </div>
    `;

            movieContainer.appendChild(movieEL);
        })
    } else {
        console.error('No movies to display');
    }

}

// =============Trending=============//
async function getTrending() {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_Key}`)

    try {
        const data = await response.json();
        if (data.results) {
            console.log(data.results);
            showMovies(data.results);
        } else {
            console.error('No results found for category');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}


//================  Side Nav===================//
function openNavBar(){
    $('.side-nav-menu').css('left', '0')
    $('.open-nav').addClass('d-none')
    $('.close-nav').removeClass('d-none')
    $('.links').addClass('animate__fadeInBottomLeft')
}
function closeNavBar(){
    $('.side-nav-menu').css('left', '-230px')
    $('.open-nav').removeClass('d-none')
    $('.close-nav').addClass('d-none')
    $('.links').removeClass('animate__fadeInBottomLeft')

}
$('.open-nav').click(function () {
    openNavBar()
    });
    
    
    $('.close-nav').click(function () {
     closeNavBar()
    })
    
$('.now-playing').click(function () {
    $('body,html').animate({ scrollTop: '0px' }, 1000, function () {
        getMovies('now_playing')
        closeNavBar()
    })

})
$('.popular').click(function () {
    $('body,html').animate({ scrollTop: '0px' }, 1000, function () {

        getMovies('popular')
        closeNavBar()
    })

})
$('.top-rated').click(function () {
    $('body,html').animate({ scrollTop: '0px' }, 1000, function () {

        getMovies('top_rated')
        closeNavBar()
    })

})

$('.upcoming').click(function () {
    $('body,html').animate({ scrollTop: '0px' }, 1000, function () {

        getMovies('upcoming')
        closeNavBar()
    })

})
$('.trending').click(function () {
    $('body,html').animate({ scrollTop: '0px' }, 1000, function () {

        getTrending()
        closeNavBar()
    })

})
$('.contact').click(function () {
    let contact = $('#contact').offset().top
    $('body,html').animate({ scrollTop: contact }, 1000, function () { 
        closeNavBar()
     })
})

// =======================Search===================// 

let search = $('#search').offset().top
$(window).scroll(function () {
    let wScroll = $(window).scrollTop();
    if (wScroll > search) {
        $('#back-to-top').css('opacity', 1)
    } else {
        $('#back-to-top').css('opacity', 0)
    }
})

async function searchMovies(movieName){
    const url = `${Base_URL}?api_key=${API_Key}&query=${encodeURIComponent(movieName)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            console.log(data.results);
            showMovies(data.results);
        } else {
            console.error('No results found for movie:', movieName);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

$('#search').on('input',function(){
    const searchTerm = document.getElementById('search').value
    if(searchTerm){

        searchMovies(searchTerm)
    }else{
        getMovies('now_playing')
    }
})

//======= Validation Regex =========//
document.getElementById("name").addEventListener("input", validateName);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("phone").addEventListener("input", validatePhone);
document.getElementById("age").addEventListener("input", validateAge);
document.getElementById("password").addEventListener("input", validatePassword);
document.getElementById("repassword").addEventListener("input", validateRepassword);

function validateName() {
    let name = document.getElementById("name").value;
    let nameError = document.getElementById("nameError");
    let nameRegex=/^[A-Za-z\s]+$/;

    if (nameRegex.test(name)) {
        nameError.innerHTML = "correct";
    } else {
        nameError.innerHTML = "Please enter a valid name.";
    }
}

function validateEmail() {
    let email = document.getElementById("email").value;
    let emailError = document.getElementById("emailError");
    let emailRegex=/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (emailRegex.test(email)) {
        emailError.innerHTML = "correct";
        console.log('email');
    } else {
        emailError.innerHTML = "Please enter a valid email.";
    }
}

function validatePhone() {
    let phone = document.getElementById("phone").value;
    let phoneError = document.getElementById("phoneError");
    let phoneRegex=/^\d{10}$/;

    if (phoneRegex.test(phone)) {
        phoneError.innerHTML = "correct";
        console.log('phone');

    } else {
        phoneError.innerHTML = "Please enter a valid phone number.";
    }
}

function validateAge() {
    let age = document.getElementById("age").value;
    let ageError = document.getElementById("ageError");
    let ageRegex=/^(1[7-9]|[2-9]\d)$/;

    if (ageRegex.test(age)) {
        ageError.innerHTML = "correct";
        console.log('age');
    } else {
        ageError.innerHTML = "You must be over 16+";
    }
}

function validatePassword() {
    let password = document.getElementById("password").value;
    let passwordError = document.getElementById("passwordError");
    let passwordRegex=/^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (passwordRegex.test(password)) {
        passwordError.innerHTML = "correct";
        console.log('password');

    } else {
        passwordError.innerHTML = "Password must contain letters and numbers for at least 8 characters.";
    }
}

function validateRepassword() {
    let password = document.getElementById("password").value;
    let repassword = document.getElementById("repassword").value;
    let repasswordError = document.getElementById("repasswordError");

    if (password == repassword) {
        repasswordError.innerHTML = "correct";
        console.log('repassword');

    } else {
        repasswordError.innerHTML = "Passwords do not match.";
    }
}