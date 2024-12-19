"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/store/store";

const Header = () => {
  // Use useUser() hook to holds all of the information for a single user of your application and provides a set of methods to manage their account
  const { user } = useUser();

  // Get the (total) number of items in the basket
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  // Create Passkey Button
  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (error) {
      console.error("Error:", JSON.stringify(error, null, 2));
    }
  };

  return (
    <header className="relative flex flex-wrap justify-center items-center w-full h-44 sm:h-20 z-50 ">
      <div className="fixed bg-white w-full h-44 sm:h-20 md:opacity-95 shadow-md shadow-gray-400"></div>
      {/* Top row */}
      <div className="container mx-auto flex flex-wrap justify-between items-center fixed w-full px-4 pb-2 pt-4">
        <Link
          href="/"
          className="text-2xl font-medium text-blue-500 hover:opacity-70 mx-auto sm:mx-0"
        >
          <span className="font-bold">Wink</span>
          Wares
        </Link>

        {/* Search form */}
        <Form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            id=""
            placeholder="Search for products"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
          />
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 md:flex-none">
          <Link
            href="/basket"
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
          >
            <TrolleyIcon className="w-6 h-6" />

            {/* Span item count once global state is impemented */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs italic">
              {itemCount}
            </span>

            <span>My basket</span>
          </Link>

          {/* User/Admin area */}
          <ClerkLoaded>
            {/* Only show My Orders if you are Signed in */}
            <SignedIn>
              <Link
                href="/orders"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
              >
                <PackageIcon className="w-6 h-6" />
                <span>My Orders</span>
              </Link>
            </SignedIn>

            {/* User Info or Login Button */}
            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />

                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400 hidden md:block">Welcome Back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {/* Passkey for security, like: Pin, Fingerprint, QR Code, Password, etc */}
            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold px-4 py-2 rounded border-blue-300 border"
              >
                Create Your Password
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
