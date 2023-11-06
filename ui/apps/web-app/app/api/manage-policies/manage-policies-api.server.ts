import { http } from '@tauruseer/api';
import { IPolicyRules, Policy } from '@tauruseer/module';

export const getPoliciesList = async () => {
  return await http.get('policies');
};

export const getPolicyDetail = async (policyId: string) => {
  return await http.get(`policies/${policyId}`);
};

export const getPolicyConditions = async (policyId: string) => {
  return await http.get(`policies/${policyId}/metadata-conditions`);
};

export const getPolicyRules = async (policyId: string) => {
  return await http.get(`policies/${policyId}/rules`);
};
export const getTechnologies = async () => {
  return await http.get(`technologies`);
};

export const createPolicy = async (policy: Policy) => {
  return await http.post('policies', JSON.stringify(policy));
};
export const setPolicyDetail = async (policy: Policy) => {
  return await http.patch(`policies/${policy.uniqueId}`, JSON.stringify(policy));
};

export const setConditionsPolicy = async (conditions: any) => {
  return await http.put(`policies/${conditions.policyId}/conditions`, JSON.stringify(conditions));
};
// rules actions
export const setNewRule = async (policy: IPolicyRules, id: string) => {
  return await http.post(`policies/${id}/rules`, JSON.stringify(policy));
};
export const updateRule = async (policyId: string, ruleId: string, payload: any) => {
  return await http.put(`policies/${policyId}/rules/${ruleId}`, JSON.stringify(payload));
};
export const deleteRule = async (policyId: string, ruleId: string) => {
  return await http.delete(`policies/${policyId}/rules/${ruleId}`);
};
