var siteName = document.getElementById("siteName");
var siteURl = document.getElementById("siteURL");
var siteList = JSON.parse(localStorage.getItem("allSites"))
displaySite(siteList);

var siteList = [];

function addSite() {
    if (validate(siteName) && validate(siteURL)) {
        var site = {
            name: siteName.value,
            url: siteURL.value,
        }
        siteList.push(site);
        localStorage.setItem("allSites", JSON.stringify(siteList));
        displaySite(siteList);
        clearForm();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Site Name or URL is not valid!',
            html: 'Please follow the rules below:<br>' +
                  '1. Site name must contain at least 3 characters.<br>' +
                  '2. Site URL must be a valid one.',
            footer: 'Please correct the fields and try again.',
            confirmButtonText: 'OK',
        });
    }
}

function clearForm() {
    siteName.value = "";
    siteURL.value = "";
}
function displaySite(list) {
    var blackBox = "";
    for (var i = 0; i < list.length; i++) {
        blackBox +=
            `<tr>
                <td class="index">${i + 1}</td>
                <td class="site">${list[i].name}</td>
                <td>
                <a href="${list[i].url}" target="_blank">
                    <button onclick="" type="button" class="btn btn-green btn-sm"><i class="fa-regular fa-eye px-1"></i>Visit</button>
                </a>
                </td>
                <td>
                    <button onclick="deleteSite(${i})" type="button" class="btn btn-red btn-sm"><i class="fa-solid fa-trash-can px-1"></i></i>Delete</button>
                </td>
            </tr>`
    }
    document.getElementById('tableContent').innerHTML = blackBox;
}

function deleteSite(deleteIdx) {
    siteList.splice(deleteIdx, 1);
    localStorage.setItem("allSites", JSON.stringify(siteList));
    displaySite(siteList);
}
function validate(input) {
    var regex = {
        siteName: /^[A-Za-z]{3,20}$/,
        siteURL: /^([Hh]ttps:\/\/www\.)[a-z]{1,}\.[a-z]{2,}$/
    }
    var isValid = regex[input.id].test(input.value);
    if (isValid) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        input.nextElementSibling.classList.replace("d-block", "d-none");
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        input.nextElementSibling.classList.replace("d-none", "d-block");

    }
    return isValid;
}