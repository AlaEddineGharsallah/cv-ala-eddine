//* Contrôle de saisie format email : Fn7
function validateEmail(email) {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}

//* Vérification champ vide
function verifVide(id, errorId, mesgError) {
    var val = document.getElementById(id).value;

    if (val !== "") { document.getElementById(errorId).innerHTML = ""; } else {
        document.getElementById(errorId).innerHTML = mesgError;
        document.getElementById(errorId).style.color = "red";
    }
}

function contact() {
    var lfName = document.getElementById("lfNameVisitor").value;
    var email = document.getElementById("emailVisitor").value;
    var subject = document.getElementById("subjectVisitor").value;
    var msg = document.getElementById("msgVisitor").value;

    verifVide("lfNameVisitor", "errorLfNameVisitor", "Veuillez saisire votre nom !");

    verifVide("subjectVisitor", "errorSubjectVisitor", "Veuillez mentionner votre sujet !");

    if (validateEmail(email)) { document.getElementById("errorEmailVisitor").innerHTML = ""; } else if (email === "") {
        document.getElementById("errorEmailVisitor").innerHTML = "Champ email vide!";
        document.getElementById("errorEmailVisitor").style.color = "red";
    } else {
        document.getElementById("errorEmailVisitor").innerHTML = "Format email invalide";
        document.getElementById("errorEmailVisitor").style.color = "red";
    }

    verifVide("msgVisitor", "errorMsgVisitor", "Veuillez écrire un message !");

    if (validateEmail(email) && msg !== "" && lfName !== "" && subject !== "") {
        document.getElementById("msgSuccessError").innerHTML = "Message envoyé avec succès !";
        document.getElementById("msgSuccessError").style.color = "green";
        return true;
    } else {
        document.getElementById("msgSuccessError").innerHTML = "Veuillez vérifier vos informations SVP !";
        document.getElementById("msgSuccessError").style.color = "red";
        return false;
    }
}






const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("Envoyer Message", (event) => {
    event.preventDefault();
    let mail = new FormData(form);
    sendMail(mail);
});

const sendMail = (mail) => {
    fetch("http://localhost:3000/send", {
        method: "post",
        body: mail,
    }).then((response) => {
        return response.json();
    });
};