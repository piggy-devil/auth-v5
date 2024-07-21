"use client";

const SendMailPage = () => {
  const mailOptions = {
    from: {
      name: "My App",
      address: "no-reply@example.com",
    },
    to: ["muupa@hotmail.com"],
    subject: "Test",
    html: "<h1>Test Send</h1><p>Some body test message</p>",
  };

  const sendMail = () => {
    fetch("/api/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailOptions),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Mail sent successfully");
        } else {
          console.error("Failed to send mail");
        }
      })
      .catch((error) => {
        console.error("Error sending mail:", error);
      });
  };

  return (
    <div>
      <button onClick={sendMail}>Send Mail</button>
    </div>
  );
};

export default SendMailPage;
