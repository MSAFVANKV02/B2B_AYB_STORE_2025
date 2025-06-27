import { useTranslation } from "react-i18next";

const NumberFormateI18n = () => {
  const { i18n } = useTranslation();
  // const { modalState } = UseUpdateModal();

  const locale = i18n.language;

  const formatNumber = (value: number) => {
    const formatter = new Intl.NumberFormat(
      locale === "ar" || locale === "ar-EG" ? "ar-EG" : locale,
      {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    );
    return formatter.format(value);
  };
  return {
    formatNumber,
  };
};

export default NumberFormateI18n;
