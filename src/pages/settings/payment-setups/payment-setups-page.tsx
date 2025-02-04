import PagesLayout, {
  PageLayoutHeader,
  PagesLayoutContent,
} from "@/layouts/Pages_Layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MySwitch } from "@/components/myUi/mySwitch";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Form, Formik } from "formik";
import AyButton from "@/components/myUi/AyButton";

export default function PaymentSetupSettings() {
  const PaymentMethods = [
    {
      id: "razorpay",
      img: "/img/payments/image 125.png",
      icon: "",
      text: "Razorpay",
      textColor: "#2B90EC",
      bgColor: "#E5F3FF",
      secBgColor: "#E5F3FF",
      plateColor: "#8eb0cf1fD",
    },
    {
      id: "offline",
      img: "",
      icon: "mdi:bank",
      text: "Offline payment",
      textColor: "#2B90EC",
      bgColor: "#CD6565",
      secBgColor: "#FFE2E2",
      plateColor: "#f3c9c924",
    },
    {
      id: "cod",
      img: "",
      icon: "mdi:cash-check",
      text: "Cash on delivery",
      textColor: "#2B90EC",
      bgColor: "#CEB769",
      secBgColor: "#FFF4D2",
      plateColor: "#BA9E420D",
    },
  ] as const;

  return (
    <PagesLayout>
      <PageLayoutHeader>
        <h1>Payment settings</h1>
      </PageLayoutHeader>

      <PagesLayoutContent className="">
        <Formik
          initialValues={{
            razorpay: false,
            offline: false,
            cod: false,
          }}
          onSubmit={(values) => {
            console.log(values);
            // submit to server
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-5 max-w-screen-xl m-auto">
                {PaymentMethods.map((method, index) => (
                  <div
                    className="flex flex-col items-center gap-2 py-4 rounded-md shadow-md border border-gray-300"
                    key={index}
                    style={{ backgroundColor: method.plateColor }}
                  >
                    <Card
                      className=" h-[150px] w-[90%] rounded-lg overflow-hidden p-1 "
                      style={{ backgroundColor: method.secBgColor }}
                    >
                      <CardContent
                        className="flex items-center justify-center w-full h-[100px] p-0 rounded-md"
                        style={{ backgroundColor: method.bgColor }}
                      >
                        {method.img ? (
                          <img
                            src={method.img}
                            alt={method.text}
                            className="object-contain w-full h-full"
                          />
                        ) : (
                          <Icon
                            icon={method.icon}
                            fontSize={30}
                            color="white"
                          />
                        )}
                      </CardContent>
                      <CardFooter className="text-center flex justify-center mt-1">
                        <p
                          style={{ color: method.textColor }}
                          className="font-semibold text-sm"
                        >
                          {method.text}
                        </p>
                      </CardFooter>
                    </Card>

                    <MySwitch
                      id={method.id}
                      isOn={values[method.id]}
                      handleToggle={() => {
                        setFieldValue(method.id, !values[method.id]);
                      }}
                    />
                  </div>
                ))}
              </div>
             <div className="flex justify-end lg:w-3/4 mt-6">
             <AyButton
              title="Submit"
              sx={{
                boxShadow:"2px 2px 2px 0.5px #cccc"
              }}
              />
             </div>
            </Form>
          )}
        </Formik>
      </PagesLayoutContent>
    </PagesLayout>
  );
}
