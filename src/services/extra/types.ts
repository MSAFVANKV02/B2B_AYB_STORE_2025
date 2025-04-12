export type ICreateBundleType = {
  name: string;
  bundle: Bundle[];
};
interface Bundle {
  size: string;
  quantity: number;
}
