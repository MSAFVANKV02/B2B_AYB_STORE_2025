import { cn } from "@/lib/utils";
import { FormFieldGenal, GeneralFormValues } from "../GeneralSection-page";
import { Input } from "@/components/ui/input";

type Props = {
  values: GeneralFormValues;
  setFieldValue: (name: string, value: any) => void;
};

type TaxDetail = {
  greaterThan: number | null;
  upto: number | null;
  igst: number | null;
  cgst: number | null;
  sgst: number | null;
  cess: number | null;
};

const GstOnItemsRate = ({ setFieldValue, values }: Props) => {
  const Fields = [
    {
      id: "greaterThan",
      title: "Greater Than",
      name: "greaterThan",
      placeholder: "Enter Greater Than",
      disabled: false,
    },
    {
      id: "upto",
      title: "Up to",
      name: "upto",
      placeholder: "Enter Up To",
      disabled: false,
    },
    {
      id: "igst",
      title: "IGST",
      name: "igst",
      placeholder: "Enter IGST",
      disabled: false,
    },
    {
      id: "cgst",
      title: "CGST",
      name: "cgst",
      placeholder: "Enter CGST",
      disabled: true,
    },
    {
      id: "sgst",
      title: "SGST",
      name: "sgst",
      placeholder: "Enter SGST",
      disabled: true,
    },
    {
      id: "cess",
      title: "Cess",
      name: "cess",
      placeholder: "Enter Cess",
      disabled: false,
    },
  ];

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, fieldName: string) => {
  //     const newValue = e.target.value;
  //     let updatedList = [...values.tax_details.on_items_rate_details];

  //     // Ensure numeric values for validation
  //     const parsedValue = newValue ? parseFloat(newValue) : 0;

  //     // Update the current field
  //     updatedList[index] = {
  //       ...updatedList[index],
  //       [fieldName]: newValue,
  //     };

  //     // ✅ Auto-set CGST & SGST when IGST is entered
  //     if (fieldName === "igst") {
  //       const igstValue = parsedValue;
  //       updatedList[index].cgst = (igstValue / 2).toString();
  //       updatedList[index].sgst = (igstValue / 2).toString();
  //     }

  //     // ✅ If 'upto' changes, auto-update the next row's 'greaterThan'
  //     if (fieldName === "upto" && updatedList[index + 1]) {
  //       updatedList[index + 1].greaterThan = parsedValue ? (parsedValue + 1).toString() : "";
  //     }

  //     // ✅ If all fields are filled, create a new row
  //     const allFieldsFilled = Fields.every((field) => updatedList[index][field.name]);
  //    // ✅ If all fields are filled, create a new row
  // if (allFieldsFilled && index === updatedList.length - 1) {
  //     const nextGreaterThan = parsedValue ? (parsedValue + 1).toString() : "";

  //     updatedList.push({
  //       greaterThan: nextGreaterThan, // ✅ Immediately set the next greaterThan value
  //       upto: "",
  //       igst: "",
  //       cgst: "",
  //       sgst: "",
  //       cess: "",
  //     });
  //   }

  //     // ✅ If 'upto' is removed, delete all rows below it
  //     if (fieldName === "upto" && newValue === "") {
  //       updatedList = updatedList.slice(0, index + 1);
  //     }

  //     setFieldValue("tax_details.on_items_rate_details", updatedList);
  //   };

  // working code =================================================================
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, fieldName: keyof TaxDetail) => {
  //     const newValue = e.target.value;
  //     let updatedList = [...values.tax_details.on_items_rate_details];

  //     // Convert value: If empty, set to null; otherwise, parse as a number
  //     const parsedValue = newValue.trim() === "" ? null : parseFloat(newValue);

  //     if (fieldName === "igst" && parsedValue !== null && parsedValue < 0) {
  //         return; // Prevent negative values for IGST
  //     }

  //     updatedList[index] = {
  //         ...updatedList[index],
  //         [fieldName]: parsedValue,
  //     };

  //     // If "upto" is removed (set to null), delete the row and all rows below it
  //     if (fieldName === "upto" && parsedValue === null) {
  //         updatedList = updatedList.slice(0, index); // Remove this row and all after
  //         return setFieldValue("tax_details.on_items_rate_details", updatedList);
  //     }

  //     // Auto-update the next row's "greaterThan" when "upto" changes
  //     if (fieldName === "upto" && updatedList[index + 1]) {
  //         updatedList[index + 1].greaterThan = parsedValue !== null ? parsedValue + 1 : null;
  //     }

  //     // Auto-calculate CGST and SGST when IGST is entered
  //     if (fieldName === "igst" && parsedValue !== null) {
  //         updatedList[index].cgst = parsedValue / 2;
  //         updatedList[index].sgst = parsedValue / 2;
  //     }

  //     // Remove extra rows only when a row is completely empty
  //     updatedList = updatedList.filter(row =>
  //         row.greaterThan !== null ||
  //         row.upto !== null ||
  //         row.igst !== null ||
  //         row.cgst !== null ||
  //         row.sgst !== null ||
  //         row.cess !== null
  //     );

  //     // If all fields are valid and it's the last row, add a new row
  //     const allFieldsValid = Fields.every((field) => {
  //         const fieldValue = updatedList[index][field.name as keyof TaxDetail];
  //         return fieldValue !== null && fieldValue > 0;
  //     });

  //     if (allFieldsValid && index === updatedList.length - 1) {
  //         updatedList.push({
  //             greaterThan: parsedValue !== null ? parsedValue + 1 : null,
  //             upto: null,
  //             igst: null,
  //             cgst: null,
  //             sgst: null,
  //             cess: null,
  //         });
  //     }

  //     setFieldValue("tax_details.on_items_rate_details", updatedList);
  // };
  // working code =================================================================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    fieldName: keyof TaxDetail
  ) => {
    const newValue = e.target.value;
    let updatedList = [...values.tax_details.on_items_rate_details];

    if (values.tax_details.calculation_types === "on_value") {
      updatedList = updatedList.map(() => ({
        greaterThan: null,
        upto: null,
        igst: null,
        cgst: null,
        sgst: null,
        cess: null,
      }));
      return setFieldValue("tax_details.on_items_rate_details", updatedList);
    }

    // Convert value: If empty, set to null; otherwise, parse as a number
    const parsedValue = newValue.trim() === "" ? null : parseFloat(newValue);

    // ✅ If "greaterThan" is removed (set to null) and it's not the first row, remove the current row and all below
    if (fieldName === "greaterThan" && parsedValue === null) {
      if (index === 0) {
        updatedList = updatedList.slice(0, index + 1); // Keep only the first row, remove all below
      } else {
        updatedList = updatedList.slice(0, index); // Remove current row and all below
      }
      return setFieldValue("tax_details.on_items_rate_details", updatedList);
    }

    if (fieldName === "igst" && parsedValue !== null && parsedValue < 0) {
      return; // Prevent negative values for IGST
    }

    updatedList[index] = {
      ...updatedList[index],
      [fieldName]: parsedValue,
    };

    // ✅ If "upto" is removed (set to null or 0), delete only rows after this one
    if (fieldName === "upto" && (parsedValue === null || parsedValue === 0)) {
      updatedList = updatedList.slice(0, index + 1); // Keep current row, remove all after
      return setFieldValue("tax_details.on_items_rate_details", updatedList);
    }

    // ✅ Auto-update the next row's "greaterThan" when "upto" changes
    if (fieldName === "upto" && updatedList[index + 1]) {
      updatedList[index + 1].greaterThan =
        parsedValue !== null ? parsedValue + 1 : null;
    }

    // ✅ Auto-calculate CGST and SGST when IGST is entered
    if (fieldName === "igst" && parsedValue !== null) {
      updatedList[index].cgst = parsedValue / 2;
      updatedList[index].sgst = parsedValue / 2;
    }

    // ✅ Remove completely empty rows
    updatedList = updatedList.filter(
      (row) =>
        row.greaterThan !== null ||
        row.upto !== null ||
        row.igst !== null ||
        row.cgst !== null ||
        row.sgst !== null ||
        row.cess !== null
    );

    // ✅ If all fields are valid and it's the last row, add a new row
    // const allFieldsValid = Fields.every((field) => {
    //     const fieldValue = updatedList[index][field.name as keyof TaxDetail];
    //     return fieldValue !== null && fieldValue > 0;
    // });
    // 🔹 Updated condition: Cess is no longer required to create a new row
    const allFieldsValid = ["upto", "igst", "cgst", "sgst"].every((field) => {
      const fieldValue = updatedList[index][field as keyof TaxDetail];
      return fieldValue !== null && fieldValue > 0;
    });

    if (allFieldsValid && index === updatedList.length - 1) {
      updatedList.push({
        greaterThan:
          updatedList[index].upto !== null ? updatedList[index].upto + 1 : null, // 🔹 Fixed: Now correctly updates based on "upto"
        upto: null,
        igst: null,
        cgst: null,
        sgst: null,
        cess: null,
      });
    }

    setFieldValue("tax_details.on_items_rate_details", updatedList);
  };

  return (
    <div className="flex lg:justify-end">
      <div className="border lg:w-3/4 w-full p-4 rounded-sm">
        {values.tax_details.on_items_rate_details.map((item, index) => (
          <div
            key={index}
            className="grid xl:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-2 mb-2"
          >
            {Fields.map((field) => (
              <FormFieldGenal
                key={field.id + index}
                titleSize="xs"
                title={field.title}
                id={`tax_details.on_items_rate_details.${index}.${field.id}`}
                name={`tax_details.on_items_rate_details.${index}.${field.name}`}
                className={cn("flex md:flex-col md:items-start items-start justify-normal")}
                fieldClassName="w-[70px] p-1"
                type="number"
                fieldAs={Input}
                value={item[field.name as keyof TaxDetail] ?? ""}
                onChange={(e) =>
                  handleChange(e, index, field.name as keyof TaxDetail)
                }
                disabled={
                  (field.name === "greaterThan" && index !== 0) ||
                  field.disabled
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GstOnItemsRate;
