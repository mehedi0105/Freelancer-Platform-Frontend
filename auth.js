const handleRagistration = (event) => {
    event.preventDefault();
    const form = document.getElementById("registration-form");
    const formData = new FormData(form);

    // console.log(formData)

    const registrationFormData = {
        username: formData.get('username'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        user_type: formData.get('are-ypu'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password'),
    }
    console.log(registrationFormData)

    fetch("https://freelancer-platform-api.onrender.com/accounts/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationFormData),
    })
        .then((res) => res.json())
        .then((data) => {
            alert("Registration Complete. Please check your email.");
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error(error);
        });
}


const handleLogin = (event) => {
    event.preventDefault();
    const form = document.getElementById("login-form");
    const formData = new FormData(form);

    const loginFormData = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    }

    fetch(`https://freelancer-platform-api.onrender.com/accounts/user_type/${loginFormData.username}/`)
        .then((res) => res.json())
        .then((user) => {
            localStorage.setItem("username", loginFormData.username)
            localStorage.setItem("user_type", user.user_type)
            localStorage.setItem("user_id", user.user_id)
        })
        .catch((error) => {
            console.error(error);
        });

    fetch("https://freelancer-platform-api.onrender.com/user/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.key) {
                // alert()
                user_type = localStorage.getItem('user_type');
                if (user_type == "Freelancer") {

                    window.location.href = "freelancer.html"
                }
                else {

                    window.location.href = "client.html"
                }
                localStorage.setItem('token', data.key)
            }
        })
        .catch((error) => {
            console.error(error);
        });
}


const handleLogOut = () => {
    const token = localStorage.getItem("token")
    fetch("https://freelancer-platform-api.onrender.com/user/logout/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    })
        .then((res) => {
            if (res.ok) {
                localStorage.removeItem("token");
                localStorage.removeItem("user_type");
                localStorage.removeItem("username");
                localStorage.removeItem("user_id");
                window.location.href = "./index.html";
            }
        })
        .catch((error) => console.error(error));
}

const changePassword = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token")
    const form = document.getElementById("password-change-form");
    const formData = new FormData(form);

    const changePasswordFormData = {
        new_password1: formData.get('password1'),
        new_password2: formData.get('password2'),
    }

    fetch("https://freelancer-platform-api.onrender.com/user/password/change/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(changePasswordFormData),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            window.location.href = "./client.html";
        })
        .catch((error) => {
            console.error(error);
        });
}