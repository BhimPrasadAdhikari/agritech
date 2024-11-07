/* eslint-disable @typescript-eslint/no-unused-vars */
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Environment variables for security
    pass: process.env.SMTP_PASSWORD,
  },
});
// Function to send an email reminder
export const sendCropReminder = async (
  farmerEmail: string,
  cropName: string,
  wateringSchedule: string,
  fertilizerSuggestions: string[]
) => {
  try {
    const fertilizerList = fertilizerSuggestions.join(", ");

    // Email content
    const mailOptions = {
      from: '"AgriTech" <your-email@example.com>', // Replace with your sender email
      to: farmerEmail,
      subject: `Watering Reminder for ${cropName}`,
      text: `It's time to water your ${cropName}!\n\nWatering Schedule: ${wateringSchedule}\nFertilizer Suggestions: ${fertilizerList}`,
      html: `
        <h2>Watering Reminder for ${cropName}</h2>
        <p>It's time to water your <strong>${cropName}</strong>!</p>
        <p><strong>Watering Schedule:</strong> ${wateringSchedule}</p>
        <p><strong>Fertilizer Suggestions:</strong> ${fertilizerList}</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};

// Function to send an announcement email
export const sendAnnouncementEmail = async (
  recipientEmail: string,
  announcementTitle: string,
  announcementContent: string,
  imageUrl: string
) => {
  try {
    const mailOptions = {
      from: 'AgriTech <your-email@example.com>',
      to: recipientEmail,
      subject: `New Announcement: ${announcementTitle}`,
      text: `Hello,\n\nThere is a new announcement: "${announcementTitle}"\n\n${announcementContent}`,
      html: `
        <div style="
          font-family: Arial, sans-serif;
          color: #4e4e4e;
          background-color: #f9f7f0;
          padding: 20px;
          border-radius: 10px;
          max-width: 600px;
          margin: auto;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          animation: fadeIn 1s ease-in-out;
        ">
          <!-- Header with animation -->
          <h1 style="
            text-align: center;
            color: #6b8e23;
            font-size: 28px;
            margin-bottom: 10px;
            animation: slideDown 1s ease-out;
          ">🌾 AgriTech Announcement 🌾</h1>

          <!-- Banner Image -->
          <div style="text-align: center; margin: 20px 0;">
            <img src="${imageUrl}" alt="${announcementTitle}" style="
              width: 100%;
              max-width: 500px;
              border-radius: 8px;
              box-shadow: 0px 4px 12px rgba(0,0,0,0.15);
              animation: zoomIn 0.8s ease-out;
            ">
          </div>

          <!-- Announcement Title and Content -->
          <h2 style="color: #4e8e2e; text-align: center; font-size: 24px; margin-top: 10px;">
            ${announcementTitle}
          </h2>
          <p style="font-size: 16px; line-height: 1.6; color: #4e4e4e; text-align: justify; padding: 0 10px;">
            ${announcementContent}
          </p>

          <!-- Call to Action -->
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://www.agritech.com" style="
              background-color: #6b8e23;
              color: #ffffff;
              padding: 12px 24px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: bold;
              display: inline-block;
              transition: background-color 0.3s ease;
            " onmouseover="this.style.backgroundColor='#556b2f'" onmouseout="this.style.backgroundColor='#6b8e23'">
              Learn More
            </a>
          </div>

          <!-- Keyframe Animations -->
          <style>
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideDown {
              from { transform: translateY(-20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes zoomIn {
              from { transform: scale(0.9); opacity: 0.8; }
              to { transform: scale(1); opacity: 1; }
            }
          </style>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Announcement email sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("send_announcement_email_failed", error);
    return { success: false, error };
  }
};


export const mailOffer = async (
  offerDetails: {
    title: string;
    url: string;
    discount: number;
    description: string;
  },
  recipientEmail: string
) => {
  try {
    const mailOptions = {
      from: "AgriTech <your-email@example.com>",
      to: recipientEmail,
      subject: `Special Offer: ${offerDetails.title}`,
      text: `New Offer: "${offerDetails.title}"\n\n${offerDetails.description}`,
      html: `
      <div style="
        font-family: Arial, sans-serif;
        color: #333;
        background-color: #f9f7f0;
        padding: 20px;
        border-radius: 10px;
        width: 100%;
        max-width: 600px;
        margin: auto;
      ">
        <!-- Header with animation -->
        <h1 style="
          text-align: center;
          color: #6b8e23;
          font-size: 24px;
          animation: fadeIn 1s ease-out;
        ">🌾 AgriTech Special Offer 🌾</h1>

        <!-- Banner image -->
        <div style="text-align: center; margin: 20px 0;">
          <img src="${offerDetails.url}" alt="${offerDetails.title}" style="
            width: 100%;
            max-width: 300px;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
            animation: grow 1s ease-in-out;
          ">
        </div>

        <!-- Offer Details -->
        <p style="font-size: 18px; line-height: 1.6; color: #4e4e4e;">
          <strong>${offerDetails.title}</strong>
        </p>
        <p style="color: #6b8e23; font-size: 16px;">
          ${offerDetails.description}
        </p>

        <!-- Discount Badge with Bounce Animation -->
        <div style="
          background-color: #fff3cd;
          color: #856404;
          border-radius: 12px;
          padding: 10px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          margin: 20px auto;
          width: 80%;
          max-width: 200px;
          animation: bounce 1.2s ease infinite;
        ">
          🎉 ${offerDetails.discount}% OFF 🎉
        </div>

        <!-- CTA Button -->
        <div style="text-align: center; margin-top: 20px;">
          <a href="${offerDetails.url}" style="
            background-color: #6b8e23;
            color: #fff;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            transition: background-color 0.3s ease;
          " onmouseover="this.style.backgroundColor='#556b2f'" onmouseout="this.style.backgroundColor='#6b8e23'">
            View Offer
          </a>
        </div>

        <!-- Keyframe animations -->
        <style>
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes grow {
            from { transform: scale(0.9); }
            to { transform: scale(1); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        </style>
      </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Announcement email sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("mail_offer_failed", error);
    return { success: false, error };
  }
};
