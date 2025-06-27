import { BuilderPageIcons } from "@/components/icons/builder-page-icons";

import {
  Card,

  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Sec_04 = () => {
  const { BenefitIcon1, BenefitIcon2, BenefitIcon3, BenefitIcon4 } =
    BuilderPageIcons();

  const data = [
    {
      id: 1,
      icon: BenefitIcon1,
      title: "Your Own Digital Identity",
      paragraph: `Build a personalized storefront with your logo, banner, and store description.`,
    },
    {
      id: 2,
      icon: BenefitIcon2,
      title: "Highlight Best-Selling Products",
      paragraph: `Showcase featured items and let retailers find your top collections easily.`,
    },
    {
      id: 3,
      icon: BenefitIcon3,
      title: "Boost Sales & Trust",
      paragraph: `Retailers trust brands with a professional presence. A branded store builds confidence.`,
    },
    {
      id: 4,
      icon: BenefitIcon4,
      title: "Announce Offers",
      paragraph: `Display promotions, deals, and highlights — increase repeat orders.`,
    },
    {
      id: 5,
      icon: BenefitIcon4,
      title: "Full Control",
      paragraph: `Update your content anytime. Edit banner, featured products, or offers with ease.`,
    },
    {
      id: 6,
      icon: BenefitIcon4,
      title: `Get Discovered Easily`,
      paragraph: `Your store gets listed in platform search results with a branded page, making it easier
for retailers to find and choose you.`,
    },
  ];

  return (
    <section className="w-full lg:px-0 px-3 py-10 bg-white dark:bg-neutral-300/30 flex flex-col gap-16 justify-center items-center">
      <span className="font-bold capitalize text-lg">Key Benefits</span>

      <div className="grid grid-cols-3 gap-10 gap-y-20  w-3/4 h-auto">
        {data.map((card, index) => (
          <div className="relative h-auto">
            <div className="w-16 h-16 bg-gradient-to-b from-[#2B90EC] to-[#185286] rounded-full absolute -top-12 shadow-md right-1/2 translate-x-1/2"></div>
            <Card className=" h-fit text-center text-xs" key={index}>
              <CardHeader className="">
                <CardTitle className="text-sm">{card.title}</CardTitle>
                <CardDescription>{card.paragraph}</CardDescription>
              </CardHeader>
              {/* <CardContent className=" ">
                <CardDescription>{card.paragraph}</CardDescription>
              </CardContent> */}
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sec_04;
