
const handleAddJob = (event) => {
    event.preventDefault();
    const form = document.getElementById("job-post-form");
    const formData = new FormData(form);
    comapany_name = localStorage.getItem("user_id")
    const AddJobFormData = {
        comapany_name: comapany_name,
        title: formData.get('jobTitle'),
        job_type: formData.get('jobType'),
        job_category: [formData.get('catType')],
        salary: formData.get('budget'),
        description: formData.get('description'),
    }
 
    fetch("https://freelancer-platform-api.onrender.com/buyer/job_list/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(AddJobFormData),
    })
        .then((res) => res.json())
        .then((data) => {
            alert("Your Job Post Added Successfuly");
            window.location.href = "client.html";
            // console.log(data)
        })
        .catch((error) => {
            console.error(error);
        });
}

const handlemyPost = () => {
    const parent = document.getElementById("my-job")
    const comapany_name = localStorage.getItem("user_id")
    if (parent.innerHTML != "") {
        parent.innerHTML = `
        <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
                <div class="table-responsive">
                    <table class="table mt-3">
                        <thead style="background-color: rgba(34, 190, 13, 0.2);">
                            <tr>
                                <th scope="col">Project Name</th>
                                <th scope="col">Budget</th>
                                <th scope="col">Status</th>
                                <th scope="col">Created</th>
                                <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody id="my-jobs-dashbord">
                                
                                <!-- Additional rows go here -->
                                </tbody>
                                </table>
                                </div>
                                </div>
                                <!-- Other tab panes go here -->
                                </div>
                                `;
    }
    const parent1 = document.getElementById("my-jobs-dashbord")
    fetch("https://freelancer-platform-api.onrender.com/buyer/job_list/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach(job => {
                if (job.comapany_name == comapany_name) {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>
                            <div class="d-flex align-items-center">
                                 <img src="assets/img/dashboard/projects/1.png" alt="" class="rounded-circle"
                                        width="40">
                                 <p class="ml-3 mb-0">${job.title}</p>
                            </div>
                                </td>
                                <td>${job.salary}$</td>
                                <td><span class="status-badge">Active</span></td>
                                <td>${new Date(job.created_at).toLocaleDateString()}</td>
                                <td>
                            <div class="d-flex justify-content-end">
                                <a onclick="handlePost('${job.id}')" class="btn btn-outline-success me-2">
                                         View details
                                </a>
                            </div>
                        </td>
                    `
                    parent1.appendChild(tr)

                }
            });
        })
        .catch((error) => {
            console.error(error);
        });
}




const handlePassword = () => {
    // alert()
    const parent = document.getElementById("my-job")
    if (parent.innerHTML !="") {
        parent.innerHTML ="";
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



const handlemyOrder = () => {
    const user_name = localStorage.getItem("user_id");

    fetch("https://freelancer-platform-api.onrender.com/freelancer/poposal/")
        .then((res) => res.json())
        .then((data) => {
            const parent = document.getElementById("my-job");
            if (parent.innerHTML !="") {
                parent.innerHTML ="";
            }
            data.forEach(element => {
                fetch("https://freelancer-platform-api.onrender.com/buyer/job_list/")
                    .then((res) => res.json())
                    .then((posts) => {
                        posts.forEach(post => {
                            // console.log(post.comapany_name, user_name);
                            if (post.comapany_name == user_name) {
                                // alert('Job found for user');
                                if (element.job == post.id) {
                                    // alert()
                                    // const div = document.createElement("div");
                                    const div = document.createElement("div");
                                    div.classList.add("card", "job-card", "w-50");
                                    div.classList.add("card", "job-card", "col-md-4", "mb-4");
                                    div.innerHTML = `
                                    <div class="card-body d-flex justify-content-between">
                                        <div class="job-details">
                                            <h5 class="card-title">Freelancer ID: ${element.freelancer}</h5>
                                            <p class="card-subtitle mb-2 text-muted">
                                                <span class="mx-2">•</span>
                                                <i class="fas fa-clock"></i> Proposal sent: ${new Date(element.created_at).toLocaleDateString()}
                                                <span class="mx-2">•</span>
                                            </p>
                                            <p class="card-text">${element.proposal_post.slice(0, 200)}...</p>
                                            <div class="d-flex flex-wrap">
                                            ${element.is_accepted === false ? `<button onclick="ProposalAccept('${element.id}','${element.job}','${element.freelancer}','${element.proposal_post}')" <button class="btn btn-warning w-50">Accept Proposal</button>    
                                        ` : `
                                                <div class="d-flex gap-3">
                                                    <button class="btn btn-warning">Completed work</button>
                                                    <button onclick="saveImportantData('${element.freelancer}','${element.job}')" class="btn btn-warning">Review Now</button>
                                                </div>`}
                                                
                                            </div>
                                        </div>
                                    </div>
                                `;
                                    parent.appendChild(div);
                                }

                            }
                        });
                    })

            });
        })

        .catch((error) => {
            console.error('Error fetching proposals:', error);
        });
}


const myReveiws = () => {
    const parent = document.getElementById("my-job")
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
    const parent = document.getElementById("my-job")
    if (parent.innerHTML != "") {
        parent.innerHTML = "";
    }
    const div = document.createElement("div")
    div.innerHTML = `
    <a onclick="PostJob()" class="btn text-white fw-medium rounded p-2 ms-auto mb-4"
                    style="background-color: #22be0d; width: 120px;">
                    Post a
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

const PostJob = () => {
    const parent = document.getElementById("my-job")
    if (parent.innerHTML != "") {
        parent.innerHTML = "";
    }
    parent.innerHTML = `
    <div class="container w-50">
        <div class="card">
            <div class="card-header">
                Job Info
            </div>
            <div class="card-body">
                <form method="" id="job-post-form" onsubmit="handleAddJob(event)">
                    <div class="form-group">
                        <label for="jobTitle">Job Title *</label>
                        <input type="text" class="form-control p-3" name="jobTitle" id="jobTitle"
                            placeholder="Title name here" required>
                    </div>
                    <div class="form-group">
                        <label for="jobType">Job Type</label>
                        <select id="jobType" class="custom-select form-control p-3" name="jobType" required>
                            <option value="Part-time">Part-time</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="catType">Job Type</label>
                        <select id="catType" class="custom-select form-control p-3" name="catType" required>
                            <option value="1">Software Engineering</option>
                            <option value="2">Web Development</option>
                            <option value="3">Mobile Development</option>
                            <option value="4">Data Science</option>
                            <option value="5">Artificial Intelligence</option>
                            <option value="6">DevOps</option>
                            <option value="7">Cyber Security</option>
                            <option value="8">Cloud Computing</option>
                            <option value="9">Networking</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="budget">Budget *</label>
                        <input type="number" class="form-control p-3" step="0.01" id="budget" name="budget"
                            placeholder="Budget here" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Description *</label>
                        <textarea class="form-control" id="description" name="description" rows="5"
                            placeholder="Description" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    </div>

    `
}
