emailjs.init("F45ifcwZrmUvEcfPc"); // Encontre em "Integration" no painel do EmailJS

document.getElementById('formEmail').addEventListener('submit', function (e) {
  e.preventDefault();

  const toEmail = document.getElementById("email").value;//document.getElementById("email").value; // E-mail fixo ou dinâmico
  const fromName = "cecilia ecostuff";
  const fromEmail = "ecostuff.cotil@gmail.com"
  const message = "email veyr";

  emailjs.send(
    'service_7z6av4l', // ID do seu Email Service (ex: "default_service")
    'email_template',    // ID do seu Email Template (ex: "contact_form")
    {
      email: toEmail,
      from_name: fromName,
      from_email: fromEmail,
      message: message,
      subject: "Novo contato via site",
      passcode: "123456",
      time: "15:30:00",
    }
  )
    .then(() => alert("E-mail enviado com sucesso!")), mudar()
      .catch((error) => alert("Erro: " + error.text));
});

function mudar() {
  window.location.href = "../../view/esqueceuASenha/codigo.html";
}
//PHPMailer mudar pra php pra segurança