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
    const getLoginTokenByToken = async (token) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 165,
        filters: { 2734: token },
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

    const getAccountById = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 154,
        filters: { id: id },
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
    const getProfilePictureById = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "download_attachment",
        entity_id: 154,
        item_id: id,
        field_id: 2637,
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
    const updateAccountData = async (id, username, email, name, content) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 154,
        data: {
          field_2614: username,
          field_2616: email,
          field_2637: [
            {
              name: name,
              content: content,
            },
          ],
        },
        update_by_field: { id: id },
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
      getLoginTokenByToken,
      getAccountById,
      getProfilePictureById,
      updateAccountData,
    };
  };

  const CustomerAccountLastLoginDataApi = () => {
    const getLastLoginAllByParentId = async (parent_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 161,
        filters: { parent_item_id: parent_id },
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
    return { getLastLoginAllByParentId };
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
    const getWoByRefNum = async (ref_num) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 36,
        filters: { 2134: ref_num },
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

    const getRefNumByWoId = async (wo_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 36,
        select_fields: "2134",
        filters: { id: wo_id },
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

    const getWoById = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 36,
        filters: { id: id },
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

    return { getWoByUserId, getWoByRefNum, getRefNumByWoId, getWoById };
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

  const CustomerDatabasApi = () => {
    const getCustomerDataById = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 36,
        filters: { id: id },
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
    return { getCustomerDataById };
  };

  const ProcessingListApi = () => {
    const DownloadAttachments = async (item_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "download_attachment",
        entity_id: 101,
        item_id: item_id,
        field_id: 1651,
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
    const getProcessingDataById = async (wo_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 75,
        select_fields: "1653,1006",
        filters: { parent_item_id: wo_id, 1006: "229" },
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
    const getProcessingListDataById = async (parent_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 101,
        filters: { parent_item_id: parent_id, 1839: "495" },
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
      DownloadAttachments,
      getProcessingDataById,
      getProcessingListDataById,
    };
  };

  const RequiredDocumentApi = () => {
    const getRequiredDocumentDataByRefNum = async (ref_num) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 127,
        filters: { 2258: ref_num },
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
    const getRequiredDocumentDataChild = async (parent_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 128,
        filters: { parent_item_id: parent_id },
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
    const UploadeAttachments = async (filename, base64Content, id) => {
      const API_JSON = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 128,
        data: {
          field_2266: [
            {
              name: filename,
              content: base64Content,
            },
          ],
        },
        update_by_field: {
          id: id,
        },
      };

      try {
        const response = await fetch(base_url, {
          method: "POST",
          body: JSON.stringify(API_JSON),
        });
        const data = await response.json();
        return data;
      } catch (e) {
        console.error(e);
      }
    };
    async function deleteAttachments(item_id, record_id) {
      const API_JSON = {
        username: "rendi",
        password: "rendi",
        action: "delete_attachment",
        entity_id: 128,
        item_id: item_id,
        field_id: record_id,
      };
      try {
        const response = await fetch(base_url, {
          method: "POST",
          body: JSON.stringify(API_JSON),
        });
        const data = await response.json();
        return data;
      } catch (e) {
        console.error(e);
      }
    }
    async function updateAttachmentStatus(value, item_id) {
      // Open: 584
      // Uploaded: 585
      const API_JSON = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 128,
        data: { field_2267: value },
        update_by_field: { id: item_id },
      };
      try {
        const response = await fetch(base_url, {
          method: "POST",
          body: JSON.stringify(API_JSON),
        });
        const data = await response.json();
        return data;
      } catch (e) {
        console.error(e);
      }
    }
    async function updateRequiredListStatus(refNum, field_2261_value = 2) {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 127,
        data: { field_2261: field_2261_value },
        update_by_field: { field_2258: refNum },
      };
      try {
        const response = await fetch(base_url, {
          method: "POST",
          body: JSON.stringify(json_data),
        });
        const data = await response.json();
        return data;
      } catch (e) {
        console.error(e);
      }
    }
    return {
      getRequiredDocumentDataByRefNum,
      getRequiredDocumentDataChild,
      UploadeAttachments,
      deleteAttachments,
      updateAttachmentStatus,
      updateRequiredListStatus,
    };
  };

  const GlobalListApi = (id) => {
    const getGlobalListValue = async () => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "get_global_list_choices",
        list_id: id,
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

    return { getGlobalListValue };
  };

  const PaymentApi = () => {
    const getPaymentByNoInvoice = async (invoice) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 110,
        filters: { "1960_db_value": invoice },
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

    const getPaymentById = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 110,
        filters: { id: id },
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
    return { getPaymentByNoInvoice, getPaymentById };
  };

  const InvoiceApi = () => {
    const getInvoiceByWo = async (wo) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 108,
        filters: { "1916_db_value": wo },
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

    const getInvoiceById = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 108,
        filters: { id: id },
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

    return { getInvoiceByWo, getInvoiceById };
  };

  return {
    CustomerAccountApi,
    DecryptionKeyApi,
    WOApi,
    ExtraMethodsApi,
    ProcessingListApi,
    RequiredDocumentApi,
    CustomerDatabasApi,
    GlobalListApi,
    CustomerAccountLastLoginDataApi,
    PaymentApi,
    InvoiceApi,
  };
};

export default api;
