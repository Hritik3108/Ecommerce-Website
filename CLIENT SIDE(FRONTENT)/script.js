document.addEventListener('DOMContentLoaded', function () {
    
    function includeHeader() {
        fetch('./header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header').innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading header:', error);
            });
}
includeHeader();
})

document.addEventListener('DOMContentLoaded', function () {
    
    function includeFooter() {
        fetch('./footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-div').innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
}
includeFooter();
})

document.addEventListener('DOMContentLoaded', function () {
    
    function includeCarousel() {
        fetch('./homeCarousel.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('homeCarousel').innerHTML = data;
            })
            .catch(error => {
                
            });
}
includeCarousel();
})

//Login
function loginForm(e) {
    let email = document.getElementById("e-mail").value;
    let password = document.getElementById("password").value;
    if (email === "admin@admin.com" && password === "123456") {
        alert("Login successful");
    } else {
        window.alert("Incorrect email or password");
    }
}