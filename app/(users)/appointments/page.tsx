// app/appointments/page.tsx
import { getServerSession } from "next-auth";
import AppointmentBooking from "./components/AppointmentBooking";

const AppointmentsPage = async() => {
  const session =await getServerSession(authOptions);

  return (
    <div>
      <h1>Book an Appointment with an Agro Expert</h1>
      {session ? (
        <AppointmentBooking  />
      ) : (
        <p>Please log in to book an appointment.</p>
      )}
    </div>
  );
};

export default AppointmentsPage;
