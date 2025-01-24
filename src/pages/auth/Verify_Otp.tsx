import AyButton from "@/components/myUi/AyButton";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MyOtpTimer from "@/components/myUi/MyOtpTimer";
import { makeToast, makeToastError } from "@/utils/toaster";
import axios from "axios";
import Cookie from "js-cookie";
import { Resend_Otp_Api, Verify_Otp_Api } from "@/services/auth/route";

const formSchema = z.object({
  otp: z.string().min(6, { message: "OTP is required." }),
});

interface FormData {
  otp: string;
}

export default function VerifyOtp() {
  //   const verifyOtp = isAuthOtp();
  //
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const cookieData = Cookie.get("us_b2b_admin_otp");
    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      setMobile(parsedData.mobile);
      setEmail(parsedData.email);
    }
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otp = form.watch("otp");

  useEffect(() => {
    if (otp.length === 6) {
      form.handleSubmit(onSubmit)();  // Trigger form submission manually
    }
  }, [otp, form]);

  const onSubmit = async (form: FormData) => {
    // console.log(form.otp);
    // console.log(mobile);

    try {
      const response = await Verify_Otp_Api({
        mobile: mobile,
        otp_Admin: form.otp,
      });

      if (response.data.success) {
        makeToast("OTP verified successfully!");
        navigate("/dashboard");
        Cookie.remove("us_b2b_admin_otp");
        localStorage.setItem("otp-timer", "0"); // Save new timer in localStorage
        localStorage.removeItem("otp-finished");
      }
    } catch (error: any) {
      // console.error(error);
      if (error.response?.data) {
        makeToastError(error.response?.data.message);
      }
    }
  };

  // console.log(email,'email');
  

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const response = await Resend_Otp_Api(email);
      // const response = await axios.post(ADMIN_RESEND_OTP, {email});

      if (response.status === 200) {
        makeToast("OTP Resent Successfully");
        localStorage.setItem("otp-timer", "60"); // Save new timer in localStorage
        localStorage.removeItem("otp-finished"); // Remove finished state
      }
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          localStorage.setItem("otp-timer", "0");
          makeToastError(error.response?.data.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4  ">
          <div className="flex items-center gap-1 justify-center text-xs">
            <span>Otp Send Authorized Number</span>
            <span>******{mobile?.slice(6, 10)}</span>
          </div>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value} // Bind value from react-hook-form
                    onChange={field.onChange} // Handle change for OTP input
                  >
                    <InputOTPGroup className="space-x-2 rounded-xl">
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="border text-center text-xl rounded-xl bg-white border-gray-300"
                          onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            const otpValue = target.value;
                            field.onChange(otpValue); // Update the form state
                          }}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <MyOtpTimer
            resendOtp={handleResendOtp}
            initialTime={60}
            onTimerFinish={() => makeToast("You can resend OTP now.")}
          />
          <div className="absolute bottom-4 left-0 right-0 w-full">
            <AyButton
              loading={loading}
              title="Verify Otp"
              type="submit"
              sx={{
                mt: "10px",
                width: "100%",
              }}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
