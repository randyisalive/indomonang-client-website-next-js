"use client";
import api from "@/app/api/api";
import { getLocalStorage } from "@/app/function/getLocalStorage";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

function useAccountsData() {
  // api
  const { CustomerAccountApi, CustomerAccountLastLoginDataApi } = api();
  const { getLastLoginAllByParentId } = CustomerAccountLastLoginDataApi();
  const { getAccountById, getProfilePictureById, updateAccountData } =
    CustomerAccountApi();

  // get accounts
  const [accounts, setAccounts] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(0);
  useEffect(() => {
    const getData = async () => {
      try {
        // session
        const sessions = await getSession();
        if (sessions) {
          const user_id = sessions.user.id;
          const role = sessions.user.role;

          if (user_id) {
            const accounts_data = await getAccountById(user_id);
            // const last_login = await getLastLoginAllByParentId(user_id);
            console.log(accounts_data);

            if (accounts_data.data.length === 0) {
              throw new Error("No accounts found");
            }

            /*  if (last_login.data.length === 0) {
              throw new Error("No login records found");
            } */

            const data_list = accounts_data.data.map((item) => {
              /* const userLastLogin = last_login
                .filter((x) => x.parent_item_id === item.id)
                .map((last) => {
                  return {
                    id: last.id,
                    date: last[2694],
                    login_status: last[2695],
                  };
                }); */

              const status_color = [
                { id: 0, text: "Not Verified", color: "#FFEB3B" },
                { id: 1, text: "Active", color: "#00C49A" },
                { id: 2, text: "Inactive", color: "#BFC9CA" },
              ];

              const picture = accounts_data.profile_picture_data.content;
              const filename = accounts_data.profile_picture_data.filename;

              return {
                id: item.id,
                email: item[2616],
                username: item[2614],
                user_status: status_color.filter(
                  (x) => x.text === item[2617]
                )[0],
                role: role,
                company: item[2630],
                company_id: item["2630_db_value"],
                //lastLogin: userLastLogin.length > 0 ? userLastLogin : [],
                status_controller: item[2618],
                profile_picture: {
                  content: `data:image/jpg;base64,${picture}`,
                  filename: filename,
                  content_base: picture,
                },
              };
            });

            setAccounts({ data: data_list[0], status: accounts_data.status });
            console.log("Account data: ", accounts);
            setIsLoading(1);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, [refresh]);

  // handle dialog
  const handleDialog = (item_id, status) => {
    if (accounts.length > 0) {
      setAccounts((prev) =>
        prev.map((x) =>
          x.id === item_id ? { ...x, dialog_status: status } : x
        )
      );
    }
  };

  const handleStatus = async (item_id, val) => {
    try {
      setIsLoading(1);
      const update = await updateStatusAccount(item_id, val);
      if (update) {
        setRefresh(!refresh);
        setTimeout(() => setIsLoading(0), 1000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // upload new photo
  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; // Extract the base64 content after the comma
        setAccounts((prev) => ({
          ...prev,
          profile_picture: {
            content: `data:image/jpg;base64,${base64String}`,
            filename: file.name,
            content_base: base64String,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormAccount = (e) => {
    setAccounts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // submission
  const UpdateAccountBtn = async () => {
    try {
      if (accounts) {
        const update_profile = await updateAccountData(
          accounts.id,
          accounts.username,
          accounts.email,
          accounts.profile_picture.filename,
          accounts.profile_picture.content_base
        );

        if (update_profile) {
          window.location.reload();
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // debug
  useEffect(() => {
    if (getLocalStorage("app-debug") === "true") {
      const data = { accounts: accounts };
      console.log(data);
    }
  }, [accounts]);

  return {
    accounts,
    handleDialog,
    handleStatus,
    handleFormAccount,
    handleUploadPhoto,
    UpdateAccountBtn,
    isLoading,
  };
}

export default useAccountsData;
