import Image from '@/components/global/image'
import { Separator } from '@/components/ui/separator'


const Sec_03 = () => {
  return (
    <section className="bg-gradient-to-r from-[#FFFFFF] to-[#ECF6FF]  dark:from-neutral-300/30 w-full lg:px-0 px-3">
    <div className="lg:w-3/4 mx-auto flex lg:flex-row flex-col justify-between">
      <div className="space-y-2 lg:w-3/5  py-4">
        <h3 className=" font-bold ">Why Create Your Brand Store?</h3>
        <Separator />
        <p className="text-xs text-[#4D4D4D] font-semibold ">
          Showcase Your Brand. Connect with Retailers. Grow Faster.
        </p>
        <p className="">
          <p className="text-xs text-[#4D4D4D] ">
            Creating your Brand Store Page helps you stand out on the
            platform. Build trust with retailers, highlight your best
            products, and offer a professional shopping experience
          </p>
        </p>
      </div>
      {/* svg */}

      <Image
        src="/icons/store/Frame.svg"
        alt="Why Create Your Brand Store?"
        className="w-28 h-28"
        classNameImg="w-full h-full object-contain"
        disableLink
      />
    </div>
  </section>
  )
}

export default Sec_03