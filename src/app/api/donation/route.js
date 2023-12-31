import Donation from "@/models/Donation";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {

    await connect();
    const donations = await Donation.find();
    return new NextResponse(JSON.stringify(donations), { status: 200 });
  } catch (error) {
    // console.log(error.name, error.message);
    return NextResponse.json({ error: error.message });
  }
};

// Post for donation
export const POST = async (request) => {
  try {
    const donationPost = await request.json();
    await connect();
    await Donation.create(donationPost);
    return NextResponse.json({ message: "Donation created successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }
};

// Update Donation Status
// export const PATCH = async (request) => {

// 	const id = request.nextUrl.searchParams.get('id');
// 	const status = await request.json()

// 	try {
// 		await connect();
// 		await Donation.findByIdAndUpdate(id, status);

// 		return NextResponse.json({ message: 'post status updated' }, { status: 200 });
// 	} catch (err) {
// 		console.log(err);
// 		return NextResponse.json({ message: 'failed to update' }, { status: 500 });
// 	}
// };

// Update Donation Status and amount
export const PATCH = async (request) => {
  const id = request.nextUrl.searchParams.get('id');
  const status = await request.json();

  try {
    await connect();
    const donation = await Donation.findById(id);

    if (!donation) {
      return NextResponse.json({ message: 'Donation not found' }, { status: 404 });
    }

    // Check if the payment was successful (You can customize this check based on your payment confirmation logic)
    if (status.paymentStatus === 'succeeded') {
      // Update the total donated amount
      donation.amount += status.amount;
      await donation.save();
    }

    return NextResponse.json({ message: 'Donation status and total donated amount updated' }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Failed to update donation' }, { status: 500 });
  }
};