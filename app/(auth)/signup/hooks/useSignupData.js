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
    role: "619",
    code: "",
    submit_code: "",
  });
  const [signupLoading, setSignupLoading] = useState(0);
  const [message, setMessage] = useState("");
  const handleForm = (e) => {
    if (e.target.name === "company") {
      setForm((prev) => ({ ...prev, company: e.target.value }));
      return;
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const SignupButton = async () => {
    setSignupLoading(1);
    if (
      form.company === "" ||
      form.email === "" ||
      form.password === "" ||
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
      const emails = await getAllaccountsEmail(form.email); // get selected email

      if (emails.length != 0) {
        setSignupLoading(2); // email same
        setMessage("Email already used!");
        setTimeout(() => {
          setSignupLoading(0);
        }, 3000);
        return;
      }

      const insert_account = await insertCustomerAccount(
        form.username,
        form.password,
        form.email,
        form.company,
        form.role
      );
      console.log(insert_account);
      if (insert_account.status === "success") {
        setForm((prev) => ({
          ...prev,
          code: insert_account.code_verification,
        }));
        const code_ver = insert_account.code_verification;
        handleVisible(true);
        setDialogForm((prev) => ({ ...prev, code: code_ver }));
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
        setCompany(company_data.data);
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

  const submitVerification = async () => {
    if (dialogForm.code === dialogForm.code_submit) {
      const update_status = await fetch(`/api/views/signup/submit_code`, {
        method: "POST",
        body: JSON.stringify({
          display_code: form.code,
          code: dialogForm.code_submit,
          email: form.email,
        }),
      });
      const data = await update_status.json();

      if (data.status === "success") {
        handleVisible(false);
        window.location.href = "/login";
      }
    }
  };

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
