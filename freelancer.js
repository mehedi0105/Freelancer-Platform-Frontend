const handleCaregory = () => {
    // <div class="col-3 filter-section" id="filter-section">
    const category = document.getElementById("categories");
    fetch("https://freelancer-platform-api.onrender.com/buyer/category/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach(element => {
                const div = document.createElement("div");
                // div.classList.add("form-group");
                div.innerHTML = `
                    <button class="btn category-btn" onclick="categorySlugView('${element.slug}')")>${element.name}</button>
                `
                category.appendChild(div);
            });
        })
        .catch((error) => {
            console.error(error);
        });
}
handleCaregory()


const handleallJob = () => {
    fetch("https://freelancer-platform-api.onrender.com/buyer/job_list/")
        .then((res) => res.json())
        .then((data) => {

            data.forEach(jobs => {
                const parent = document.getElementById("show-job");
                const div = document.createElement("div");
                div.classList.add("card", "job-card");
                // div.classList.add("job-card", "mb-3");
                div.innerHTML = `
                <div class="card-body d-flex justify-content-between" onclick="handlePost('${jobs.id}')">
                    <div class="job-details">
                        <h5 class="card-title">${jobs.title}</h5>
                        <p class="card-subtitle mb-2 text-muted">
                            <i class="fas fa-map-marker-alt"></i> ${jobs.job_type}
                            <span class="mx-2">•</span>
                            <i class="fas fa-clock"></i> ${new Date(jobs.created_at).toLocaleDateString()}
                            <span class="mx-2">•</span>
                        </p>
                        <p class="card-text">${jobs.description.slice(0, 600)}........<a>More</a></p>
                    </div>
                    <div class="job-rate text-right">
                        <p class="h5">${jobs.salary}$</p>
                        <p class="text-muted">Fixed Price</p>
                        <button class="btn btn-success">Send Proposal</button>
                    </div>
                </div>
                `
                parent.appendChild(div);
            });


        })
        .catch((error) => {
            console.error(error);
        });
}
handleallJob()

const categorySlugView = (slug) => {
    fetch(`https://freelancer-platform-api.onrender.com/buyer/category/serch/${slug}/`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach((jobs) => {
                    const parent = document.getElementById("show-job");
                    if (parent.innerHTML != "") {
                        parent.innerHTML = "";
                    }
                    const div = document.createElement("div");
                    div.classList.add("card", "job-card");
                    // div.classList.add("job-card", "mb-3");
                    div.innerHTML = `
                        <div class="card-body d-flex justify-content-between">
                            <div class="job-details">
                                <h5 class="card-title">${jobs.title}</h5>
                                <p class="card-subtitle mb-2 text-muted">
                                    <i class="fas fa-map-marker-alt"></i> ${jobs.job_type}
                                    <span class="mx-2">•</span>
                                    <i class="fas fa-clock"></i> ${new Date(jobs.created_at).toLocaleDateString()}
                                    <span class="mx-2">•</span>
                                </p>
                                <p class="card-text">${jobs.description.slice(0, 600)}........<a>More</a></p>
                            </div>
                            <div class="job-rate text-right">
                                <p class="h5">${jobs.salary}$</p>
                                <p class="text-muted">Fixed Price</p>
                                <button class="btn btn-success">Send Proposal</button>
                            </div>
                        </div>
                        `
                    parent.appendChild(div)
                });

            } else {
                const parent = document.getElementById("show-job");
                if (parent.innerHTML != "") {
                    parent.innerHTML = "";
                }
                // const parent1 = document.getElementById("jobs-container");
                const div = document.createElement("div");
                div.classList.add("m-auto");
                div.innerHTML = `
                    <h1>Job Not Found</h1>
                `
                parent.appendChild(div);
            }
        }

        )
        .catch(error => console.error('Error:', error));
}

const salaryFilter = (event) => {
    event.preventDefault();
    const form = document.getElementById("filter-form");
    const formData = new FormData(form);
    comapany_name = localStorage.getItem("user_id");
    const minSalary = parseFloat(formData.get('minSalary'));
    const maxSalary = parseFloat(formData.get('maxSalary'));

    // console.log(minsalary, maxsalary)

    const parent = document.getElementById("show-job");
    if (parent.innerHTML != "") {
        parent.innerHTML = "";
    }
    fetch("https://freelancer-platform-api.onrender.com/buyer/job_list/")
        .then((res) => res.json())
        .then((data) => {

            data.forEach(jobs => {
                if (jobs.salary >= minSalary && jobs.salary <= maxSalary) {
                    // alert()
                    const div = document.createElement("div");
                    div.classList.add("card", "job-card");
                    // div.classList.add("job-card", "mb-3");
                    div.innerHTML = `
                        <div class="card-body d-flex justify-content-between">
                            <div class="job-details">
                                <h5 class="card-title">${jobs.title}</h5>
                                <p class="card-subtitle mb-2 text-muted">
                                    <i class="fas fa-map-marker-alt"></i> ${jobs.job_type}
                                    <span class="mx-2">•</span>
                                    <i class="fas fa-clock"></i> ${new Date(jobs.created_at).toLocaleDateString()}
                                    <span class="mx-2">•</span>
                                </p>
                                <p class="card-text">${jobs.description.slice(0, 600)}........<a>More</a></p>
                            </div>
                            <div class="job-rate text-right">
                                <p class="h5">${jobs.salary}$</p>
                                <p class="text-muted">Fixed Price</p>
                                <button class="btn btn-success">Send Proposal</button>
                            </div>
                        </div>
                    `
                    parent.appendChild(div);
                }
            });
            if (parent.innerHTML == "") {
                const div = document.createElement("div");
                div.classList.add("m-auto");
                div.innerHTML = `
                    <h1>Job Not Found</h1>
                `
                parent.appendChild(div);
            }


        })
        .catch((error) => {
            console.error(error);
        });
}


const myReveiws = () => {
    const parent = document.getElementById("freelancer")
    if (parent.innerHTML != "") {
        parent.innerHTML = "";
    }
    const user_name = localStorage.getItem("user_id");

    fetch("https://freelancer-platform-api.onrender.com/buyer/reveiw/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach(element => {
                if (element.freelancer == user_name) {

                    const div = document.createElement("div")
                    div.innerHTML = `
                        <div class="card w-25">
                        <div class="card-body">
                         <h5><small>Job Id: </small>${element.project}</h5>
                            <p> ${element.rating}</p>
                            <p> ${element.reveiw_text}</p>
                            </div>
                        </div>
                     `
                    parent.appendChild(div);
                }
            });

        })

    // parent.appendChild(div)
}


const DashBord = () => {
    const comapany_name = localStorage.getItem("user_id");
    let total_job = 0;
    fetch("https://freelancer-platform-api.onrender.com/buyer/job_list/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach(job => {
                if (job.comapany_name == comapany_name) {
                    // console.log(total_job)
                    total_job++;
                }
            });
            // console.log()
            localStorage.setItem("total_job", total_job);
        })
        .catch((error) => {
            console.error(error);
        });

    const total_jo = localStorage.getItem("total_job")
    const parent = document.getElementById("freelancer")
    if (parent.innerHTML != "") {
        parent.innerHTML = "";
    }
    const div = document.createElement("div")
    div.innerHTML = `
    <a href="find_job.html" class="btn text-white fw-medium rounded p-2 ms-auto mb-4"
                    style="background-color: #22be0d; width: 120px;">
                    Find a
                    Job</a>
                <div class="dashbord-top d-flex gap-3">
                    <div
                        class="w-25 p-4 d-flex align-items-center dashobard-widget justify-content-between bg-white rounded-4">
                        <div>
                            <h3 class="dashboard-widget-title fw-bold text-dark">
                                $00
                            </h3>
                            <p class="text text-dark">Total balance</p>
                        </div>
                        <div class="dashboard-widget-icon">
                            <img src="./images/balance.png" alt="">
                        </div>
                    </div>
                    <div
                        class="w-25 p-4 d-flex align-items-center dashobard-widget justify-content-between bg-white rounded-4">
                        <div>
                            <h3 class="dashboard-widget-title fw-bold text-dark">
                               ${total_jo}
                            </h3>
                            <p class="text-18 text-dark">Total Job</p>
                        </div>
                        <div class="dashboard-widget-icon">
                            <img src="./images/job.png" alt="">
                        </div>
                    </div>
                    <div
                        class="w-25 p-4 d-flex align-items-center dashobard-widget justify-content-between bg-white rounded-4">
                        <div>
                            <h3 class="dashboard-widget-title fw-bold text-dark">
                               00
                            </h3>
                            <p class="text text-dark">Complete Order</p>
                        </div>
                        <div class="dashboard-widget-icon">
                            <img src="./images/completeorder.png" alt="">
                        </div>
                    </div>
                    <div
                        class="w-25 p-4 d-flex align-items-center dashobard-widget justify-content-between bg-white rounded-4">
                        <div>
                            <h3 class="dashboard-widget-title fw-bold text-dark">
                                00
                            </h3>
                            <p class="text-18 text-dark">Complete Order</p>
                        </div>
                        <div class="dashboard-widget-icon">
                            <img src="./images/activeorder.png" alt="">
                        </div>
                    </div>

                </div>
                <div class="dashbord-bootom mt-4">
                    <h2>Latest Jobs</h2>
                    <div class="w-100 mt-3">
                        <table class="table align-middle mb-0 bg-white">
                            <thead class="rounded" style="background-color: rgba(34, 190, 13, 0.2);">
                                <tr>
                                    <th>Project Name</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Posted</th>
                                </tr>
                            </thead>
                            <tbody id="dashbord-table">
                                

                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="total-job"></div>
                <div class="Complete-Order"></div>
                <div class="Active-Order"></div>
    `
    parent.appendChild(div)
    DashBordTable(comapany_name)
    localStorage.removeItem("total_job");
}

const DashBordTable = (comapany_name) => {
    const parent = document.getElementById("dashbord-table");
    fetch("https://freelancer-platform-api.onrender.com/buyer/job_list/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach(job => {
                if (job.comapany_name == comapany_name) {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                    
                        <td>
                            <div class="d-flex align-items-center">
                                <div class="ms-3">
                                    <p>${job.title}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="fw-normal mb-1">${job.salary}$</p>
                        </td>
                        <td>
                            Active
                        </td>
                        <td>${new Date(job.created_at).toLocaleDateString()}</td>
                    
                    `
                    parent.appendChild(tr);
                }
            });

        })
}

DashBord()


const handlePassword = () => {
    // alert()
    const parent = document.getElementById("freelancer")
    if (parent.innerHTML != "") {
        parent.innerHTML = "";
    }
    const div = document.createElement("div");
    div.classList.add("container", "update-password-container", "w-50", "bg-white", "rounded", "p-3");
    div.innerHTML = `
        <div class="form-section">
            <h2>Update your Password</h2>
            <p>Your email address will not be published. Required fields are marked *</p>
            <form id="password-change-form">
                <div class="form-group">
                    <label for="NewPassword">New Password</label>
                    <input type="password" class="form-control p-3" name="password1" id="NewPassword" placeholder="******">
                       
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" class="form-control p-3" name="password2" id="confirmPassword" placeholder="******">
                    
                </div>
                <button type="submit" onclick="changePassword(event)" class="btn btn-success mt-3 mb-3">Update Password</button>
                <a href="./client.html" class="btn-cancel">Cancel</a>
            </form>
        </div>
    `
    parent.appendChild(div);

}



