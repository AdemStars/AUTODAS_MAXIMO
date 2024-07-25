  // ==UserScript==
// @name         OplusM AUTODAS Maximo
// @namespace    https://oplusm.fr
// @version      1.0
// @description  Envoie semi-automatique de prevenance Maximo
// @author       Adi Lasri
// @match        https://maximo.hivory.fr/maximo/ui/*
// @grant        none
// @updateURL
// @downloadURL
// ==/UserScript==


(function () {
    //'use strict';
  
    window.addEventListener('load', function () {
      setTimeout(function () { // récuparation des data nécéssaire
  
  
          var idElement = document.getElementById("mad5af16c-tb").value;
          var idDas = document.getElementById("ma884ccfa-tb").value;
          // var idSociete = document.getElementById("").value;
          //var idAdresse = document.getElementById("u_pti_request_external.u_pti_site_id.name").value;
          var idInter = document.getElementById("mf5148c1a-tb").value;
          var idDesc = document.getElementById("m9c58b7e2-tb").value;
          var idDatedebut= document.getElementById("m8aefd217-tb").value;
          var idDatefin = document.getElementById("m6580baa0-tb").value;
          if (idDatefin == idDatedebut){
            var DATE=" le "+idDatedebut;
          }
        else{
          DATE=' le '+idDatedebut+" jusqu\'au "+idDatefin;
        }
  
  
        // Prompt des informations récupéré dans la console
        console.log("Code site: " + idElement + " Code das : " + idDas +" Nature inter :" + idInter + " Description inter : " + idDesc);
        console.log("Date debut : " + idDatedebut + " Date fin : " + idDatefin);
  
        //Fonction de verification de la zone d'intervention
        var accessType= detectAccessType();
        console.log(accessType);
        // Appelez la fonction pour creer le mail
        sendEmail(idElement, idDas, idInter, idDesc, DATE,accessType);
  
      }, 10000);
     });
  
  
        // Fonction de détection de l'accès
        function detectAccessType() {
          var accessPyloneCheckbox  = document.getElementById("mf460a086-cb_img");
          var accessSolCheckbox  = document.getElementById("m726fbb5-cb_img");
          console.log(accessPyloneCheckbox);
          console.log(accessSolCheckbox);
  
          var accessPylone = accessPyloneCheckbox.alt.includes("Acces_pylone : activé") && !accessPyloneCheckbox.alt.includes("Acces_pylone : non activé");
          var accessSol = accessSolCheckbox.alt.includes("Acces_sol : activé") && !accessSolCheckbox.alt.includes("Acces_sol : non activé");
  
          console.log("État Accès pylone: " + accessPylone);
          console.log("État Accès sol: " + accessSol);
  
        // Déterminer le type d'accès
        if (accessPylone && !accessSol) {
          return "Accès Aérien";
        } else if (accessPylone && accessSol) {
          return "Accès sur tout le site";
        } else if (!accessPylone && accessSol) {
          return "Accès ZT";
        } else {
          return "Aucun accès spécifié";
        }
      }
  
    // fonction de création du mail
    function sendEmail(idElement, idDas, idInter, idDesc, DATE,accessType) {
      var recipient = ''; // pas de destinataire automatique
      var subject = "[HIVORY] Demande d'accès sur le site " + idElement + " / "+ idDas+ " / " + DATE  ;
      var body = 'Bonjour, %0A%0A';
      body += 'Nous vous informons que la société ' + '[SOCIETE]' + ' souhaite intervenir sur votre site situé au [ADRESSE]' + DATE + '. %0A%0A'; //corps du mail
      body += 'Ci-dessous les informations concernant l’opération :%0A%0A';
      body += 'Référence du site : ' + idElement + '.%0A';
      body += 'Lieu de l\'intervention : ' +accessType+ '.%0A';
      body += 'Nature d\'intervention : ' + idInter + '.%0A';
      body += 'Sur les équipements de l\’opérateur : ' + 'OPERATEUR' + '%0A';
      body += 'Equipements spéciaux  : ' + '%0A';
      body += 'Motif de l’intervention : ' + idDesc;
      body += '%0ALes Intervenants sont : %0A';
      body += '%0AAvons-nous votre accord pour l’intervention ? %0A';
      body += '%0APar ailleurs, pouvez-vous, svp nous donner le contact du gardien ou de la personne sur place en cas de problème ? %0A';
      body += 'Dans l’attente de votre retour.%0A';
      body += 'Cordialement,%0A';
  
  
      //var mailtoLink = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body); // encapsulage dans le mailto
      var urlOWA = "https://outlook.office365.com/owa/?path=/mail/action/compose&to=&subject="+subject+"&body="+body;
  
      window.open(urlOWA, "_blank");
      console.log("Envoie du mail");
      //window.location.href = mailtoLink;
    };
  })();
  