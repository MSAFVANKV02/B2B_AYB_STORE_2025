

export default function AllOrdersBottom() {
  return (
    <div className="lg:w-3/4 w-[99%] overflow-x-auto">
        <table className="w-full border-collapse">
              <thead className=" text-textGray select-none">
                <tr className="text-left text-sm">
                  <th className="py-2 px-4 ">#</th>
                  <th className="py-2 px-4">Products</th>
                  <th className="py-2 px-4">Delivery type</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody className="border rounded-sm text-xs">
                {[1, 2, 3, 4].map((item) => (
                  <tr key={item} className="border border-gray-300">
                    <td className="py-3 px-4">{item}</td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <img
                        src="/img/products/image 83.png"
                        alt="Product Name"
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span>Product Name</span>
                    </td>
                    <td className="py-3 px-4">Cash on delivery</td>
                    <td className="py-3 px-4">2</td>
                    <td className="py-3 px-4">₹489</td>
                    <td className="py-3 px-4">₹978</td>
                  </tr>
                ))}
              </tbody>
            </table>
    </div>
  )
}