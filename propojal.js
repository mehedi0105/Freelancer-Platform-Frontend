const ProposalAccept = (id, job, freelancer, proposal_post) => {

    const proposalData = {
        job: job,
        freelancer: freelancer,
        is_accepted: true,
        proposal_post: proposal_post,
    };

    fetch(`https://freelancer-platform-api.onrender.com/freelancer/update_proposal/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proposalData),
    })
        .then((rest) => rest.json())
        .then((data) => {
            // alert("Your Job Post Added Successfuly");
            window.location.href = "job_details.html";
            console.log(data)
        })
        .catch((error) => {
            console.error(error);
        });
}

const saveImportantData = (freelancer, job) => {
    // alert()
    // console.log(freelancer, " ", job)
    localStorage.setItem("reveiw-freelancer", freelancer)
    localStorage.setItem("reveiw-job", job)
    window.location.href = "reveiw.html";
}


const FreelancerReveiw = (event) => {
    event.preventDefault();
    const form = document.getElementById('ratingForm')
    const form_data = new FormData(form);
    const reveiw_freelancer = localStorage.getItem("reveiw-freelancer")
    const reveiw_job = localStorage.getItem("reveiw-job")
    console.log(form_data.get("category"))
    const post_review = {
        rating: form_data.get("rating"),
        reveiw_text: form_data.get("review_text"),
        freelancer: reveiw_freelancer,
        project: reveiw_job,
    };
    console.log(post_review)
    fetch("https://freelancer-platform-api.onrender.com/buyer/reveiw/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post_review),
    })
        .then((res) => res.json())
        .then((data) => {

            alert("freelancer reveiw successfull")
            console.log(data)
        }
        )
        .catch((error) => {
            console.error(error);
        });
}