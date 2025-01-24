import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NavigationList from "@/components/navbar_/navigation";
import AyButton from "@/components/myUi/AyButton";
import {
  Create_Sub_Admins_Api,
  Update_Sub_Admins_Api,
} from "@/services/auth/route";
import { makeToast } from "@/utils/toaster";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import { IAdminTypes } from "@/types/adminUserTypes";
import MyCopyAction from "@/components/myUi/MyCopyAction";
import { Input } from "@/components/ui/input";
import { fetchAdminDetails } from "@/redux/actions/adminSlice";

const AdminCreateForm = () => {
  const { navigationItems } = NavigationList();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { admin } = useAppSelector((state) => state.admin);
  const [editAdmin, setEditAdmin] = useState<IAdminTypes | null>(null);
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(
    null
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const editId = searchParams.get("edit");

  const btnTitle = editId ? `Edit ${editAdmin?.role}` : "Create User";

  // console.log(editAdmin,'editAdmin');

  useEffect(() => {
    if (editId) {
      const filterAdmin = admin.find((admin) => admin._id === editId);
      setEditAdmin(filterAdmin || null); // Use null if filterAdmin is undefined
      dispatch(fetchAdminDetails());
    }
  }, []); // Add `admin` as a dependency

  // Helper function to flatten navigation for checkbox options
  const getAllPages = () => {
    const pages: { title: string; segment: string }[] = [];
    navigationItems.forEach((navItem) => {
      if (navItem.kind === "page") {
        pages.push({ title: navItem.title, segment: navItem.segment });
        if (navItem.children) {
          navItem.children.forEach((child) =>
            pages.push({ title: child.title, segment: child.segment })
          );
        }
      }
    });
    return pages;
  };

  const allPages = getAllPages();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    // password: Yup.string()
    //   .min(6, "Password must be at least 6 characters")
    //   .required("Password is required"),
    password: Yup.string().when([], {
      is: () => !editId, // Applies validation only if editId is falsy
      then: (schema) =>
        schema
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Za-z]/, "Password must contain at least one letter") // Letter validation
      .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character") 
      .matches(/\d/, "Password must contain at least one number")// Special character validation
      .required("Password is required"),
      otherwise: (schema) => schema.notRequired(), // Password is optional when editing
    }),
    role: Yup.string().when([], {
      is: () => editAdmin?.role !=="admin", // Applies validation only if editId is falsy
      then: (schema) =>
        schema
      .oneOf(["ecommerce", "social-media"], "Invalid role")
      .required("Role is required"),
      otherwise: (schema) => schema.notRequired(), // Password is optional when editing
    }),
    pages: Yup.array().when([], {
      is: () => editAdmin?.role !=="admin", // Applies validation only if editId is falsy
      then: (schema) =>
        schema
      .of(Yup.string())
      .required("At least one page must be selected"),
      otherwise: (schema) => schema.notRequired(), // Password is optional when editing
    }),
    // role: Yup.string()
    //   .oneOf(["ecommerce", "social-media"], "Invalid role")
    //   .required("Role is required"),
    // pages: Yup.array()
    //   .of(Yup.string())
    //   .required("At least one page must be selected"),
    mobile: Yup.string()
      .matches(/^\d/, "Mobile number must contain only digits")
      .length(10, "Mobile number must be exactly 10 digit").required("Mobile number is required")
  });

  return (
    <Formik
      initialValues={{
        name: editId ? editAdmin?.name ?? "" : "",
        email: editId ? editAdmin?.email ?? "" : "",
        mobile: editId ? editAdmin?.mobile ?? "" : "",
        password: "", // Fallback to an empty string
        role: editId ? editAdmin?.role ?? "" : "ecommerce", // Default role is admin
        pages: editId ? editAdmin?.pages ?? [] : [],
      }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={async (values, { resetForm }) => {
        // console.log("Submitted Values:", values);
        // resetForm();
        try {
          let res;
          if (editId) {
            // Call the Update API if editId exists
            res = await Update_Sub_Admins_Api(
              {
                email: values.email,
                password: values.password,
                mobile: values.mobile,
                name: values.name,
                role: values.role, // Default role is admin
                pages: values.pages,
              },
              editId
            );
          } else {
            // Call the Create API if editId does not exist
            res = await Create_Sub_Admins_Api({
              email: values.email,
              password: values.password,
              mobile: values.mobile,
              name: values.name,
              role: values.role, // Default role is admin
              pages: values.pages,
            });
          }
          if (res.status === 201 || res.status === 200) {
            setGeneratedPassword(values.password);
            setIsPasswordVisible(true);
            makeToast(`${res.data.message}`);
            resetForm();
          }
        } catch (error: any) {
          if (error.response.data.success === false) {
            return makeToast(`${error.response.data.message}`);
          }
          console.error("Error creating user:", error);
        }
      }}
    >
      {({ isSubmitting , resetForm}) => (
        <Form className="p-4 bg-white shadow-md rounded-md">
          <div className="my-5">
            <MyCopyAction
              enabled={isPasswordVisible}
              isCopy={`${generatedPassword}`}
              message="Password Copied "
              title="Please save this password. It will not be retrievable again."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold">
              Name
            </label>
            <Field
              id="name"
              as={Input}
              name="name"
              placeholder="Enter name"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold">
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              as={Input}
              placeholder="Enter email"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-bold">
              Mobile
            </label>
            <Field
              id="mobile"
              name="mobile"
              type="number"
              as={Input}
              onInput={(e:any)=>{
                if(e.target.value > 10){
                  e.target.value = e.target.value.slice(0, 10);
                }
              }}
              placeholder="Enter Mobile number"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage
              name="mobile"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold">
              Password
            </label>
            <Field
              id="password"
              name="password"
              // type="password"
              as={Input}
              placeholder="Enter password"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          {editAdmin?.role !== "admin" && (
            <>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-bold">
                  Role
                </label>
                <Field
                  as="select"
                  id="role"
                  name="role"
                  className="border p-2 w-full rounded"
                >
                  {/* <option value="admin">Admin</option> */}
                  <option value="ecommerce">Ecommerce</option>
                  <option value="social-media">Social Media</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold">Pages</label>
                <div className="grid grid-cols-2 gap-2">
                  {allPages.map((page) => (
                    <div key={page.segment} className="flex items-center">
                      <Field
                        type="checkbox"
                        name="pages"
                        value={page.segment}
                        id={`page-${page.segment}`}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`page-${page.segment}`}
                        className="text-sm"
                      >
                        {page.title}
                      </label>
                    </div>
                  ))}
                </div>
                <ErrorMessage
                  name="pages"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </>
          )}

        <div className="flex justify-end gap-5 mt-10">
        <AyButton
            title={`Cancel`}
            type="button"
            onClick={()=>{
              resetForm()
            }}
            disabled={isSubmitting}
            variant="cancel"
            outLineColor="#ccc"
            sx={{
              mt: "8",
              height: "50px",
              width: "180px",
            }}
          />
          {/* ======= */}
        <AyButton
            title={`${isSubmitting ? "Loading" : btnTitle}`}
            type="submit"
            disabled={isSubmitting}
            sx={{
              mt: "8",
              height: "50px",
              width: "180px",
            }}
          />
        </div>
        </Form>
      )}
    </Formik>
  );
};

export default AdminCreateForm;
