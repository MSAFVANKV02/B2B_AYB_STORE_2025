import WebBannerForm from "./Web_Banner_Form"



export default function WebpSetupPage() {
  return (
    <div>
        <div className="p-4 select-none">
            <h1 className="font-bold text-textGray text-sm">WebP Setup Page</h1>
        </div>
        {/* ÷==== */}
        <div className="page-outer space-y-3">
            <span className="text-sm ">
                Banners
            </span>
            <WebBannerForm />
        </div>
    </div>
  )
}