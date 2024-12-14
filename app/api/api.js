import { base_url } from "./base_url";

const api = () => {
  const DecryptionKeyApi = () => {
    const getDecryptionKey = async () => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 156,
        select_fields: "2644",
      };
      try {
        const response = await fetch(base_url, {
          method: "POST",
          body: JSON.stringify(json_data),
        });
        const data = await response.json();
        return data.data;
      } catch (e) {
        console.error(e);
      }
    };
    return { getDecryptionKey };
  };
  const CustomerAccountApi = () => {
    const getUserByEmail = async (email) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 154,
        select_fields: "2616, 2614, 2615",
        filters: { 2616: email },
      };
      try {
        const response = await fetch(base_url, {
          method: "POST",
          body: JSON.stringify(json_data),
        });
        const data = await response.json();
        return data.data;
      } catch (e) {
        console.error(e);
      }
    };
    const insertLoginToken = async (parent_id, key) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "insert",
        entity_id: 165,
        items: { parent_item_id: parent_id, field_2734: key },
      };
      try {
        const response = await fetch(base_url, {
          method: "POST",
          body: JSON.stringify(json_data),
        });
        const data = await response.json();
        return data.data;
      } catch (e) {
        console.error(e);
      }
    };
    const getLoginTokenByUser = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 165,
        filters: { parent_item_id: id },
      };
      try {
        const response = await fetch(base_url, {
          method: "POST",
          body: JSON.stringify(json_data),
        });
        const data = await response.json();
        return data.data;
      } catch (e) {
        console.error(e);
      }
    };
    const getAllLoginToken = async () => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 165,
      };
      try {
        const response = await fetch(base_url, {
          method: "POST",
          body: JSON.stringify(json_data),
        });
        const data = await response.json();
        return data.data;
      } catch (e) {
        console.error(e);
      }
    };
    const getCompanyById = async (user_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 154,
        select_fields: "2630",
        filters: { id: user_id },
      };
      try {
        const response = await fetch(base_url, {
          method: "POST",
          body: JSON.stringify(json_data),
        });
        const data = await response.json();
        return data.data;
      } catch (e) {
        console.error(e);
      }
    };
    return {
      getUserByEmail,
      insertLoginToken,
      getLoginTokenByUser,
      getAllLoginToken,
      getCompanyById,
    };
  };

  const WOApi = () => {
    const getWoByUserId = async (company_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 36,
        filters: { 314: company_id },
      };
      try {
        const response = await fetch(base_url, {
          method: "POST",
          body: JSON.stringify(json_data),
        });
        const data = await response.json();
        return data.data;
      } catch (e) {
        console.error(e);
      }
    };

    return { getWoByUserId };
  };

  const ExtraMethodsApi = () => {
    const getGlobalListValueById = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "get_global_list_choices",
        list_id: 16,
      };
      try {
        const response = await fetch(base_url, {
          method: "POST",
          body: JSON.stringify(json_data),
        });
        const data = await response.json();
        return data.data;
      } catch (e) {
        console.error(e);
      }
    };
    return { getGlobalListValueById };
  };

  const CustomerDatabasApi = () => {};

  return { CustomerAccountApi, DecryptionKeyApi, WOApi, ExtraMethodsApi };
};

export default api;
