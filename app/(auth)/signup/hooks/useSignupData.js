import api from "@/app/api/api";
import { handleHashPassword } from "@/app/function/decryptor";
import { getLocalStorage } from "@/app/function/getLocalStorage";
import React, { useEffect, useState } from "react";

const useSignupData = () => {
  // api
  const { CompanyDatabaseApi, CustomerAccountApi } = api();
  const { getAllCompany } = CompanyDatabaseApi();
  const {
    getVerificationByEmail,
    insertCustomerAccount,
    getAllaccountsEmail,
    updateAccountStatus,
  } = CustomerAccountApi();
  // form data
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    company: "",
    role: "",
  });
  const [signupLoading, setSignupLoading] = useState(0);
  const [message, setMessage] = useState("");
  const handleForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const SignupButton = async () => {
    setSignupLoading(1);
    if (
      form.company === "" ||
      form.email === "" ||
      form.password === "" ||
      form.role === "" ||
      form.username === ""
    ) {
      setSignupLoading(2);
      setMessage("Empty Form Value!");
      setTimeout(() => {
        setSignupLoading(0);
      }, 3000);
      return;
    }
    try {
      const emails = await getAllaccountsEmail();
      for (const item of emails) {
        if (item[2616] === form.email) {
          setSignupLoading(2); // email same
          setMessage("Email already used!");
          setTimeout(() => {
            setSignupLoading(0);
          }, 3000);
          return;
        }
      }
      const hashed_password = handleHashPassword(form.password);
      const insert_account = await insertCustomerAccount(
        form.username,
        hashed_password,
        form.email,
        form.company,
        form.role
      );
      if (insert_account) {
        handleVisible(true);
        const code_ver = await getCodeVerification();
        if (code_ver) {
          console.log(code_ver);
          setDialogForm((prev) => ({ ...prev, code: code_ver[0][2619] }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // get company
  const [company, setCompany] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const company_data = await getAllCompany();
        setCompany(company_data);
        console.log(company_data);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  // dialog
  const [visible, setVisible] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(0);
  const [dialogForm, setDialogForm] = useState({
    user_id: "",
    code: "",
    code_submit: "",
  });
  const handleVisible = (status) => {
    setVisible(status);
  };
  const getVerification = async () => {
    try {
      const email_verification = await getVerificationByEmail(form.email);
      console.log(email_verification);
      setDialogLoading(1);
      setTimeout(() => {
        setDialogLoading(2);
        setVisible(false);
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDialogForm = (e) => {
    setDialogForm((prev) => ({ ...prev, code_submit: e.value }));
  };

  useEffect(() => {
    if (dialogForm.code_submit.length === 0) {
      setDialogLoading(0);
    } else if (dialogForm.code_submit === dialogForm.code) {
      setDialogLoading(4);
    } else {
      setDialogLoading(3);
    }
  }, [dialogForm]);

  const getCodeVerification = async () => {
    const email_verification = await getVerificationByEmail(form.email);
    console.log(email_verification);
    if (email_verification) {
      setDialogForm((prev) => ({
        ...prev,
        user_id: email_verification[0]["id"],
        code: email_verification[0][2619],
      }));
    }
  };

  const submitVerification = async () => {
    if (dialogForm.code === dialogForm.code_submit) {
      const update_status = await updateAccountStatus(dialogForm.user_id, 1);
      console.log(update_status);
      if (update_status) {
        handleVisible(false);
        window.location.href = "/login";
      }
    }
  };

  // debug
  useEffect(() => {
    if (getLocalStorage("app-debug") === "true") {
      const data = { form: form, company: company, dialogForm: dialogForm };
      console.log(data);
    }
  }, [company, form, dialogForm]);

  return {
    form,
    handleForm,
    company,
    visible,
    handleVisible,
    getVerification,
    dialogLoading,
    SignupButton,
    signupLoading,
    message,
    handleDialogForm,
    submitVerification,
  };
};

export default useSignupData;
