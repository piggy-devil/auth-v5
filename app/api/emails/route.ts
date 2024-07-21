import { sendEmail } from "@/lib/mail";

export const POST = async (request: Request) => {
  const mailOptions = await request.json();

  try {
    const result = await sendEmail(mailOptions);

    return Response.json({
      accepted: result.accepted,
    });
  } catch (error) {
    return Response.json(
      {
        message: "Unable to send email this time",
      },
      {
        status: 500,
      }
    );
  }
};
