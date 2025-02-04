import AyButton from "@/components/myUi/AyButton";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Cookie from "js-cookie";
import { isAuthOtp } from "@/middlewares/IsAuthenticated";
import VerifyOtp from "./Verify_Otp";
import { makeToast, makeToastError } from "@/utils/toaster";
import MyBackBtn from "@/components/myUi/myBackBtn";
import { SendOtp_Login_Api } from "@/services/auth/route";
import Draggable from "react-draggable"; // Import react-draggable

export default function LoginPage() {
  const verifyOtp = isAuthOtp();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data, status } = await SendOtp_Login_Api({  emailId:email, password });

      if (status === 200) {
        localStorage.setItem("otp-timer", "60");
        localStorage.removeItem("otp-finished");
        if (data.success) {
          Cookie.set(
            "us_b2b_admin_otp",
            JSON.stringify({ mobile: data.mobile, email }),
            { expires: 0.5, sameSite: "strict" }
          );
          makeToast(`${data.message}`);
          localStorage.setItem("otp-timer", "60");
        }
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      if (error.response?.data) {
        makeToastError(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center select-none bg-[#fffbf7]"
      style={{
        backgroundImage: 'url("/img/bg/bg-admin-transparent.png")',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Draggable wrapper around the form */}
      <Draggable
      cancel="input, button, .no-drag"
      >
        <div
          className={`relative w-[320px] cursor-pointer bg-white/40 backdrop-filter overflow-hidden shadow-[#2B90EC]/50 shadow-2xl backdrop-blur-lg rounded-xl mx-1 sm:h-[400px] h-[380px] p-5 flex flex-col ${
            verifyOtp ? "" : "justify-between"
          }`}
        >
          <div className="absolute w-96 h-96 bg-[#2B90EC]/10 blur-md shadow-[#2B90EC]/50 shadow-md -z-50 rounded-full -top-[160px] -right-[160px]" />

          <div className="flex items-center justify-between w-full">
            {verifyOtp && (
              <div>
                <MyBackBtn
                  clickEvent={() => {
                    Cookie.remove("us_b2b_admin_otp");
                    localStorage.setItem("otp-timer", "0");
                    localStorage.removeItem("otp-finished");
                    window.location.reload();
                  }}
                />
              </div>
            )}
            <img src="/img/logo/Logo_black.svg" alt="Admin Logo" width={100} />
            <p>Store</p>
          </div>
          {verifyOtp ? (
            <VerifyOtp />
          ) : (
            <form onSubmit={handleLoginSubmit}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-xs p-5 mb-5"
                placeholder="Email"
                required
              />
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-xs p-5"
                  placeholder="Password"
                  required
                />
                <Icon
                  onClick={() => setShowPassword(!showPassword)}
                  icon={
                    !showPassword
                      ? "fluent:eye-off-16-regular"
                      : "fluent:eye-24-regular"
                  }
                  className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                />
              </div>

              <AyButton
                loading={loading}
                disabled={loading}
                title="LOGIN"
                type="submit"
                sx={{
                  mt: "3rem",
                  width: "100%",
                }}
              />
            </form>
          )}
        </div>
      </Draggable>
    </div>
  );
}
