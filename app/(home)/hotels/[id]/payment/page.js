import PaymentForm from "@/components/payment/PaymentForm";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getHotelById, getUserByEmail } from "@/database/queries";
import { getDayDifference } from "@/utils/data-util";

const PaymentPage = async ({
  params: { id },
  searchParams: { checkin, checkout },
}) => {
  const session = await auth();
  console.log(id, checkin, checkout);

  if (!session) {
    redirect("/login");
  }

  const loggedInUser = await getUserByEmail(session?.user?.email);
  const hotelInfo = await getHotelById(id, checkin, checkout);

  const hasCheckinCHeckout = checkin && checkout;
  let cost = (hotelInfo?.highRate + hotelInfo?.lowRate) / 2;

  if (hasCheckinCHeckout) {
    const days = getDayDifference(checkin, checkout);

    cost = cost * days;
  }

  return (
    <section className="container">
      <div className="p-6 rounded-lg max-w-xl mx-auto my-12 mt-[100px]">
        <h2 className="font-bold text-2xl">Payment Details</h2>
        <p className="text-gray-600 text-sm">
          You have picked <b>{hotelInfo?.name}</b> and total price is{" "}
          <b>${cost}</b>{" "}
          {hasCheckinCHeckout &&
            `for ${getDayDifference(checkin, checkout)} day(s)`}
        </p>
        <PaymentForm
          user={loggedInUser}
          hotelInfo={hotelInfo}
          checkin={checkin}
          checkout={checkout}
        />
      </div>
    </section>
  );
};

export default PaymentPage;
