var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoSearchTerm = document.querySelector("#repo-search-term");
var repoContainerEl = document.querySelector("#repos-container");

var getUserRepos = function(user) {
//format the github api url
var apiUrl = "https://api.github.com/users/" + user + "/repos";
// fetch expexts a promise so the return value goes directly into the then function argument regardless or arg name. 
// same for then also will directly put return info into a promise function argument
    fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
            displayRepos(data, user);
        })
    });

};

var displayRepos = function(repos, searchTerm) {
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (var i = 0; i < repos.length; i++) {
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        var titleEl = document.createElement("span");
        titleEl.textContent = repos[i].full_name;
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center"; 
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        repoEl.appendChild(titleEl);
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
    
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("please enter a GitHub username");
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);