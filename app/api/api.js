import { formatDate } from "../function/formatDate";
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
    const insertFailedLogin = async (parent_id, login_status) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "insert",
        entity_id: 161,
        items: {
          parent_item_id: parent_id,
          field_2694: formatDate(),
          field_2695: login_status,
        },
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

    const getAllaccountsEmail = async () => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 154,
        select_fields: "2616",
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
    const getAccountUsername = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        select_fields: "2614,2630,2628",
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
    const insertCustomerAccount = async (
      username,
      password,
      email,
      company,
      role
    ) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "insert",
        entity_id: 154,
        items: {
          field_2614: username,
          field_2615: password,
          field_2616: email,
          field_2630: company,
          field_2628: role,
        },
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

    const getVerificationByEmail = async (email) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 154,
        select_fields: "2619",
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

    const updateAccountStatus = async (id, value) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 154,
        data: {
          field_2618: value,
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
    const changePassword = async (id, value) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 154,
        data: {
          field_2615: value,
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
    const updateRecovery = async (email, value) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 154,
        data: {
          field_2618: value,
        },
        update_by_field: { 2616: email },
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
    const updateAccountEmail = async (id, value, pw_value) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 154,
        data: {
          field_2634: value,
          field_2636: pw_value,
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
      getAccountUsername,
      getVerificationByEmail,
      insertCustomerAccount,
      getAllaccountsEmail,
      updateAccountStatus,
      updateRecovery,
      updateAccountEmail,
      changePassword,
      insertFailedLogin,
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
    const getWoAll = async (filters_object = {}) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 36,
        //  filters: filters_object,
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

    const updateWORating = async (id, rating = 0) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 36,
        data: {
          field_2631: rating,
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
      updateWORating,
      getWoByUserId,
      getWoByRefNum,
      getRefNumByWoId,
      getWoById,
      getWoAll,
    };
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
    const getAllAutomaticActions = async (entity_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "get_process_buttons",
        entity_id: entity_id,
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
    const runProcessButton = async (entity_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "run_process",
        entity_id: entity_id,
        process_id: 104,
        item_id: 286,
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
    return { getGlobalListValueById, getAllAutomaticActions, runProcessButton };
  };

  const CustomerDatabasApi = () => {
    const getCustomerDataById = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 25,
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
    const updateCustomerDataById = async (company_id, field_id, value) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 25,
        data: { [`field_${field_id}`]: value },
        update_by_field: { id: company_id },
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
    const getEmailVerification = async (parent_item_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 171,
        filters: { parent_item_id: parent_item_id },
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
    const insertEmailVerification = async (parent_id, email) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "insert",
        entity_id: 171,
        items: {
          //field_2469: ticket_id,
          field_2834: email,
          parent_item_id: parent_id,
        },
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
    const verifiedEmail = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 171,
        data: { field_2836: 1 },
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
    const deleteEmail = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "delete",
        entity_id: 171,
        delete_by_field: { id: id },
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
      getCustomerDataById,
      updateCustomerDataById,
      getEmailVerification,
      insertEmailVerification,
      verifiedEmail,
      deleteEmail,
    };
  };
  const ExpatriateApi = () => {
    const getExpatriateByParentId = async (parent_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 78,
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
    return { getExpatriateByParentId };
  };
  const FamilyApi = () => {
    const getFamilyByParentId = async (parent_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 80,
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
    return { getFamilyByParentId };
  };
  const VisitorsApi = () => {
    const getVisitorsByParentId = async (parent_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 92,
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
    return { getVisitorsByParentId };
  };
  const CompanyDocumentApi = () => {
    const getCompanyDocumentById = async (parent_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 89,
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
    const DownloadDocument = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "download_attachment",
        entity_id: 89,
        item_id: id,
        field_id: 1309,
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
    return { getCompanyDocumentById, DownloadDocument };
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
        filters: { parent_item_id: wo_id, 1006: 229 },
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
    const UploadeAttachments = async (filename, base64Content, id, date) => {
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
          field_3220: date,
          field_3232: 1,
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
    async function DownloadRequiredListDocuments(id) {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "download_attachment",
        entity_id: 128,
        item_id: id,
        field_id: "2266",
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
    }
    const getRequiredDocumentHistory = async (ref_num) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 202,
        filters: { 3227: ref_num },
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
    const UpdateClientData = async (id, name, email) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 127,
        data: { field_3233: email, field_3234: name },
        update_by_field: { id: id },
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
    };
    return {
      getRequiredDocumentDataByRefNum,
      getRequiredDocumentDataChild,
      UploadeAttachments,
      deleteAttachments,
      updateAttachmentStatus,
      updateRequiredListStatus,
      getRequiredDocumentHistory,
      DownloadRequiredListDocuments,
      UpdateClientData,
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
    const getPaymentAll = async (invoice) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 110,
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
    return { getPaymentByNoInvoice, getPaymentById, getPaymentAll };
  };

  const InvoiceApi = () => {
    const getInvoiceByWo = async (wo) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 108,
        filters: { 1916: wo },
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
    const DownloadInvoices = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "download_attachment",
        entity_id: 108,
        item_id: id,
        field_id: "1968",
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

    return { getInvoiceByWo, getInvoiceById, DownloadInvoices };
  };

  const TicketsApi = () => {
    const getTicketsByUserId = async (user_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 141,
        filters: { 2646: user_id },
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
    const getTicketsAll = async () => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 141,
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

    const getTicketById = async (uuid) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 141,
        filters: { 2469: uuid },
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

    const getAttachmentTicketsById = async (ticket_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "download_attachment",
        entity_id: 141,
        item_id: ticket_id,
        field_id: "2745",
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

    const insertTickets = async (
      ticket_id,
      ref_num,
      name,
      email,
      category,
      ticket_detail,
      user_id,
      pic,
      priority
    ) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "insert",
        entity_id: 141,
        items: {
          //field_2469: ticket_id,
          field_2466: ref_num,
          field_2464: name,
          field_2471: email,
          field_2470: category,
          field_2465: ticket_detail,
          field_2646: user_id,
          field_2498: pic, //"25,28"
          field_2769: priority,
        },
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

    const updateTicketStatus = async (ticket_id, value) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 141,
        data: { field_2468: value },
        update_by_field: { id: ticket_id },
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

    const uploadAttachmentTickets = async (attachments, id) => {
      const API_JSON = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 141,
        data: {
          field_2745: attachments,
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

    return {
      insertTickets,
      getTicketsByUserId,
      uploadAttachmentTickets,
      getTicketById,
      getTicketsAll,
      getAttachmentTicketsById,
      updateTicketStatus,
    };
  };

  const CompanyDatabaseApi = () => {
    const getAllCompany = async () => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 25,
        select_fields: "228",
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
    return { getAllCompany };
  };

  const TicketsChatsApi = () => {
    const getTicketsChatByTicketId = async (ticket_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 157,
        filters: { 2664: ticket_id },
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

    const insertTicketsChat = async (
      uuid,
      ticket_id,
      text,
      role,
      user_id,
      attachments
    ) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "insert",
        entity_id: 157,
        items: {
          field_2654: uuid,
          field_2746: role,
          field_2664: ticket_id,
          field_2653: text,
          field_2767: user_id,
          field_2771: attachments,
        },
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

    const getAttachmentById = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "download_attachment",
        entity_id: 157,
        item_id: id,
        field_id: 2771,
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

    return { getTicketsChatByTicketId, insertTicketsChat, getAttachmentById };
  };

  const CourierApi = () => {
    const getCourierByWO = async (wo_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 28,
        filters: { 1778: wo_id },
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
    return { getCourierByWO };
  };

  const CourierItemsApi = () => {
    const getCourierItemsByParent = async (parent_item_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 28,
        filters: { parent_item_id: parent_item_id },
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
  };
  const RecentNewsApi = () => {
    const getRecentNewsAll = async (limit = 3) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 169,
        limit: limit,
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
    return { getRecentNewsAll };
  };

  const QuotationApi = () => {
    const getQuotationByCompany = async (company_id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 46,
        select_fields: "441,434,436,614,587,624,3199,439,3198, 3238",
        filters: { 3198: company_id, 441: 476 },
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
    const getQuotationAll = async () => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 46,
        select_fields: "441,434,436,614,587,624,3199,439,3198",
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

    const downloadClientApproval = async (id) => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "download_attachment",
        entity_id: 46,
        item_id: id,
        field_id: 3205,
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

    const uploadClientSignature = async (
      client_name,
      filename,
      base64Content,
      id
    ) => {
      const API_JSON = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 46,
        data: {
          field_3200: [
            {
              name: filename,
              content: base64Content,
            },
          ],
          field_3204: client_name,
        },
        update_by_field: { id: id },
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

    const ApproveQuotations = async (id) => {
      const API_JSON = {
        username: "rendi",
        password: "rendi",
        action: "run_process",
        entity_id: 46,
        item_id: id,
        process_id: 253,
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
    // rejection function
    const InputRejectionNote = async (id, rejection_note) => {
      const API_JSON = {
        username: "rendi",
        password: "rendi",
        action: "update",
        entity_id: 46,
        data: { field_3211: rejection_note },
        update_by_field: { id: id },
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
    const RejectQuotations = async (id) => {
      const API_JSON = {
        username: "rendi",
        password: "rendi",
        action: "run_process",
        entity_id: 46,
        item_id: id,
        process_id: 13,
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

    return {
      getQuotationByCompany,
      getQuotationAll,
      downloadClientApproval,
      uploadClientSignature,
      ApproveQuotations,
      RejectQuotations,
      InputRejectionNote,
    };
  };
  const TermsOfServiceApi = () => {
    const getTermsOfService = async () => {
      const json_data = {
        username: "rendi",
        password: "rendi",
        action: "select",
        entity_id: 61,
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

    return { getTermsOfService };
  };

  return {
    TermsOfServiceApi,
    CustomerAccountApi,
    QuotationApi,
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
    TicketsApi,
    TicketsChatsApi,
    CourierApi,
    CompanyDatabaseApi,
    ExpatriateApi,
    FamilyApi,
    VisitorsApi,
    RecentNewsApi,
    CompanyDocumentApi,
  };
};

export default api;
