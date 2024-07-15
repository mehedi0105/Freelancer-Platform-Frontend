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



