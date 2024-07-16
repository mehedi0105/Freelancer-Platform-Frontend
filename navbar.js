fetch("navbar.html")
    .then((res) => res.text())
    .then((data) => {
        const parent = document.getElementById("navbar-container").innerHTML = data;

        const navbar_nav = document.getElementById("navbar-nav")
        const nav_item = document.getElementById("nav-item")
        const token = localStorage.getItem("token")
        const user_name = localStorage.getItem("username")
        const user_type = localStorage.getItem("user_type")

        if (token) {
            if (user_type == "Freelancer") {
                nav_item.innerHTML += `
                <a href="./find_job.html" class="nav-item nav-link" style = "color: gray">Find job</a>
                `

                navbar_nav.innerHTML += `
                <p class="m-auto">Welcome [${user_name}]</p>
                <ul>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <img src="./images/profile.jpg" width="50px">
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="./freelancer.html">View DashBord</a></li>
                            <li>
                            <hr class="dropdown-divider">
                            </li>
                            <li class="bg-danger"><a class="dropdown-item text-white" onclick="handleLogOut()" href="#">Logout</a></li>
                        </ul>
                    </li>
                    </ul>
                `

            } else {
                nav_item.innerHTML += `
                <a href="./post.html" class="nav-item nav-link" style = "color: gray">Add Job</a>
                `
                navbar_nav.innerHTML += `
                <p class="m-auto">Welcome [${user_name}]</p>
                <ul>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                       <img src="./images/profile.jpg" width="50px">
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="./client.html">View DashBord</a></li>
                            <li>
                            <hr class="dropdown-divider">
                            </li>
                            <li class="bg-danger hover:bg-danger "><a class="dropdown-item text-white" onclick="handleLogOut()" href="#">Logout</a></li>
                        </ul>
                    </li>
                    </ul>
                `
            }
        } else {
            navbar_nav.innerHTML += `
            <li class="nav-item">
                <a class="nav-link sign-in" href="./login.html">Sign in</a>
            </li>
            <li class="nav-item">
                <a class="btn btn-custom" href="./registration.html">Employers / Post Job</a>
            </li>
            `
        }
    })
