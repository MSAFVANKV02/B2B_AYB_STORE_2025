import { getAllStoreCategories } from '@/actions/category/categoryAction';
import { useQueryData } from '@/hooks/useQueryData';
import { useAppSelector } from '@/redux/hook';
import { ICategory } from '@/types/categorytypes';
import { useNode } from '@craftjs/core';
import clsx from 'clsx';


const CraftCategorySettings = () => {
  const { setProp, props } = useNode((node) => ({
    props: node.data.props,
  }));

  const { currentAdmin } = useAppSelector((state) => state.admin);

  const { data: fetchedCategory } = useQueryData(
    ["category-settings"],
    () => getAllStoreCategories(currentAdmin?._id ?? "")
  );

  const categories: ICategory[] = fetchedCategory?.data || [];


  // const categories: ICategory[] = useMemo(() => {
  //   const original = fetchedCategory?.data || [];

  //   // ✅ TEMP duplication logic for testing UI – remove in production
  //   if (original.length === 2) {
  //     const duplicated: ICategory[] = [];
  //     for (let i = 0; i < 8; i++) {
  //       original.forEach((cat:any, idx:number) => {
  //         duplicated.push({
  //           ...cat,
  //           _id: `${cat._id}-${i}-${idx}`,
  //           name: `${cat.name} ${i + 1}`,
  //         });
  //       });
  //     }
  //     return duplicated;
  //   }

  //   return original;
  // }, [fetchedCategory]);

  const toggleItem = (product: ICategory) => {
    setProp((prop: any) => {
      const exists = prop.selectedCategory?.some((p: any) => p._id === product._id);
      prop.selectedCategory = exists
        ? prop.selectedCategory.filter((p: any) => p._id !== product._id)
        : [...(prop.selectedCategory || []), product];
    }, 100);
  };

  const selectedCount = props.selectedCategory?.length || 0;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold p-2 text-sm flex items-center justify-between">
        <span>Select Categories</span>
        <span className="text-xs text-gray-500">Selected: {selectedCount}</span>
      </h3>
      <div className="space-y-1 max-h-[300px] overflow-auto bg-white p-4 rounded-md shadow-main">
        {categories.map((p) => {
           const isSelected = props.selectedCategory?.some((x: any) => x._id === p._id);
          return (
            <div
              key={p._id}
              className={clsx(
                "flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded transition",
                isSelected && "border border-green-500 bg-green-50"
              )}
              onClick={() => toggleItem(p)}
            >
              <img
                src={p.coverImage || "/placeholder.png"}
                alt="thumb"
                className="w-10 h-10 object-cover rounded"
              />
              <span className="text-xs line-clamp-1">{p.name}</span>
              {isSelected && (
                <span className="ml-auto text-green-500 text-xs">✓</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default CraftCategorySettings;
