"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Auth from "../Components/Auth/ProtectedRoute2";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import ReactiveButton from "reactive-button";
import { useSelector, useDispatch } from "react-redux";

function SignUp() {
  const [state, setState] = useState("idle");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userdp, SetUserDp] = useState(
    "https://i.pinimg.com/originals/a6/f3/c5/a6f3c55ace829310723adcb7a468869b.png"
  );
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const user = useSelector((state) => state.userauth.user);
  const dispatch = useDispatch();

  const [mypost, setMyPost] = useState([]);
  const [userbio, setUserbio] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    dispatch({ type: "userauth/getUserInformation" });
  }, []);

  const createAccount = async (e) => {
    e.preventDefault();

    try {
      setState("loading");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/signup`,
        {
          fullname,
          username,
          followers,
          following,
          userbio,
          mypost,
          email,
          password,
          userdp,
        }
      );

      if (response.status !== 201) {
        console.log("opps something went wrong, try again");
        setState("error");
      }

      setState("success");
      router.push("/signin");
    } catch (error) {
      setState("error");
    }
  };

  if (user) {
    router.push("/");
  }

  return (
    <div>
      <Navbar />
      <section className="px-2 py-16 mx-auto bg-gray-200 sm:px-6">
        <div className="flex flex-col items-center justify-center py-8 mx-auto md:h-fit lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="a flex flex-row items-center gap-4 mb-[30px]">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                  Create account
                </h1>
              </div>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={createAccount}
              >
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 text-sm border border-gray-300 rounded-lg shadow-sm pe-12"
                    placeholder="John Doe"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required={true}
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 text-sm border border-gray-300 rounded-lg shadow-sm pe-12"
                    placeholder="jonnydoexx"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={true}
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full p-4 text-sm border border-gray-300 rounded-lg shadow-sm pe-12"
                    placeholder="johndoe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full p-4 text-sm border border-gray-300 rounded-lg shadow-sm pe-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="terms"
                      className="font-light text-gray-500 dark:text-gray-800"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                <ReactiveButton
                  buttonState={state}
                  idleText="Create an account"
                  loadingText="Loading"
                  errorText="Unable to Create account"
                  successText="Account Created"
                  color="red"
                  width="100%"
                  size="medium"
                  type="submit"
                  style={{
                    display: "block",
                    borderRadius: "0.5rem",
                    backgroundColor: "#FF3131",
                    padding: "0.75rem 1.25rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "white",
                    background: "#FF3131",
                  }}
                />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
              <Toaster position="top-center" reverseOrder={false} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default SignUp;
