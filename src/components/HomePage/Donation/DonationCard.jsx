import React from 'react';
import { checkout } from '@/hooks/checkout';
import Image from 'next/image';

const DonationCard = ({ title, imageUrl, totalDonated, userProfileImage, username }) => {

    const handlePaymentSuccess = async () => {
        try {
            console.log('Button clicked');
            const paymentResponse = await checkout({
                lineItems: [{ price: "price_1Nn2TMIfrNNr5g42vzeaIzwf", quantity: 1 }],
            });

            // Check if payment was successful based on Stripe's response
            if (paymentResponse) {
                console.log('Payment successful!');
            } else {
                console.log('Payment successful!');
            }
        } catch (error) {
            console.error('Payment error:', error);
        }
    };

    return (
        <div className='mb-2'>
            <div className="card w-80 glass rounded-md">
                <Image
                    src={imageUrl}
                    alt="donate"
                    layout="responsive"
                    width={400}
                    height={300}
                    className="card-image"
                />
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>

                    {/* Display user profile picture and username */}
                    <div className="flex items-center mt-3">
                        <div className="w-8 h-8 rounded-full mr-2 overflow-hidden">
                            <Image
                                src={userProfileImage}
                                alt="User Profile"
                                layout="responsive"
                                width={32}
                                height={32}
                            />
                        </div>
                        <span className="text-sm font-semibold">{username}</span>
                    </div>

                    <div className="card-actions flex mt-3">
                        <div className='flex'>
                            <div className="card-action">
                                <button
                                    className="btn rounded-md hover:bg-primary-color hover:text-white border-gray font-semibold lg:ml-5 capitalize dark:border-white dark:hover:bg-black"
                                >
                                    Total Donated {totalDonated}$
                                </button>
                            </div>
                            <div className="card-action">
                                <button

                                    onClick={handlePaymentSuccess}
                                    className="btn rounded-md hover:bg-primary-color hover:text-white border-gray font-semibold lg:ml-5 capitalize dark:border-white dark:hover:bg-black"
                                >
                                    Donate now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationCard;
