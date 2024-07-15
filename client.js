
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
    // console.log(AddJobFormData)
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
            // window.location.href = "index.html";
            // console.log(data)
        })
        .catch((error) => {
            console.error(error);
        });
}

const handlemyPost = () => {
    const parent = document.getElementById("my-job")
    const comapany_name = localStorage.getItem("user_id")
    if (parent.innerHTML !"") {
        parent.innerHTML ="";
    }
    fetch("https://freelancer-platform-api.onrender.com/buyer/job_list/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach(job => {
                if (job.comapany_name == comapany_name) {

                    const div = document.createElement("div");
                    div.classList.add("card", "col-6", 'd-card');
                    // div.onclick.add("handlePost()");
                    div.innerHTML = `
                        <div class="card-body" onclick="handlePost('${job.id}')" style="cursor:pointer">
                        <p class="text-dark"><small>Posted: ${new Date(job.created_at).toLocaleDateString()}</small></p>
                            <h5 class="card-title">${job.title}</h5>
                            <p class="card-text">Budget: ${job.salary}</p>
                            <p class="card-text">${job.description.slice(0, 450)}...[click & veiw details]</p>
                        </div>
                    `
                    parent.appendChild(div)

                }
            });
        })
        .catch((error) => {
            console.error(error);
        });
}
handlemyPost()

{/* <div class="card text-center">
    <div class="card-body">
        <h5 class="card-title">$52</h5>
        <p class="card-text">Total Balance</p>
    </div>
</div> */}

const handlePost = (id) => {
    // alert(id)
    localStorage.setItem('job_id', id);
    window.location.href = "job_details.html";
    // console.log(id)
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

{/* <div class="container update-password-container">
    
    <div class="image-section">
        <img src="https://via.placeholder.com/400" alt="Placeholder Image">
    </div>
</div> */}

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


const DashBord = () => {
    const parent = document.getElementById("my-job")
    if (parent.innerHTML != "") {
        parent.innerHTML = "";
    }
    const div = document.createElement("div")
    div.innerHTML = `
    <div class="row">
        <div class="col-8">
            <img src="./images/sellerimg1.png" width="100%" alt="">
        </div>
        <div class="col-4">
           <img src="./images/sellerimg2.png" width="100%" alt="">
        </div>
    </div>
    `
    parent.appendChild(div)
}

DashBord()

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
