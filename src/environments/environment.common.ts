import { BASE_URL } from './environment.const';

export const commonEnvironment = {
  production: false,
  baseUrl: BASE_URL,
  agentRegNumber: 'MXAG01',
  refresh: BASE_URL + 'v1/auth/refresh',
  TFACode: BASE_URL + 'twoFactor/2faCode',
  checkFileExisting: BASE_URL + 'customerDetails/customer/checkFileExistense',
  // TFACode: 'https://devgateway.bankoyo.com/twoFactor/2faCode',

  // Home Page APIs
  agentSendingCurrency: BASE_URL + 'agentSendingCurrency/getAllByExposableId/', //reusable API
  agentDetails: BASE_URL + 'agentDetails/getByRegNumber/',
  agentSendingReceivingCurrency:
    BASE_URL + 'agentSendingReceivingCurrency/byCurrencyCode/',
  agentCurrencyRate: BASE_URL + 'agentCurrencyRate/amountExternal/',
  contactUsEmailInquiry: BASE_URL + 'contactUs/emailInquiry',
  getCountry: BASE_URL + 'country/',
  getQuery: BASE_URL + 'documentTypes/query',

  //checkratescorrectornot
  checkratescorrect: BASE_URL + 'agentTransaction/checkCalculation',

  // Authenticate APIs
  authenticate: BASE_URL + 'v1/auth/authenticate',
  userDetails: BASE_URL + 'user/details',
  agentCooperateSender:
    BASE_URL + 'AgentCooperateSender/getAllAgentCooperateSender/',
  agentCurrencyConvert: BASE_URL + 'agentCurrencyRate/convertedAmount/',
  agentSenderDetails: BASE_URL + 'agentSender/detailsForAgentCustomer/', //reusable API
  agentSender: BASE_URL + 'agentSender/getExposableIdByUsername',
  agentCurrencyRateConvert: BASE_URL + 'agentCurrencyRate/convertedAmount/',
  agentCustomerApprovedCurrencyRate:
    BASE_URL + 'agentCustomerApprovedCurrencyRate/getByAgentSenderDetailsId/',
  agentSenderCoperateAccess: BASE_URL + 'agentSender/getCoperateAccess/',
  getSenderDetailByUserName:
    BASE_URL + 'agentSender/getAgentSenderDetailsByUsername/',

  getSenderDetailByUserEmail:
    BASE_URL + 'agentSender/detailsForAgentCustomerByEmail/',

  corporateUseracount: BASE_URL + 'agentSender/getExposableIdByUsername',
  corporateUserData: BASE_URL + 'agentSender/detailsForAgentCustomer/',
  corporateAccess: BASE_URL + 'agentSender/getCoperateAccess/',

  // Forgot Password APIs
  request: BASE_URL + 'resetPassword/request',
  resetPassword: BASE_URL + 'resetPassword/validateCustomer',
  passwordReset: BASE_URL + 'resetPassword/reset',
  verifyUser: BASE_URL + 'user/customerVerification',

  // Setting APIs
  agentSenderByExposableByUserName:
    BASE_URL + 'agentSender/getExposableIdByUsername',
  optCustomerDetailsByCriteria:
    BASE_URL + 'amlCore/customerDetails/getByCriteria',
  updateUser: BASE_URL + 'user/update',
  getUserSetting: BASE_URL + 'user/details',
  // Blog APIs
  getBlog: BASE_URL + 'blog/getBlog', // ExposableId
  blogPermLink: BASE_URL + 'blog/link',
  blogAgentDetails: BASE_URL + 'agentDetails/getByRegNumber',
  blog: BASE_URL + 'blog',

  //Secondary Identity
  getSecondaryIdentity: BASE_URL + 'agentIdentityMode/secondaryIdentity',
  saveSecondaryId: BASE_URL + 'amlCore/secondaryId/',
  // Primary Identity
  getAgentIdentity: BASE_URL + 'agentIdentityMode/getAll',
  savePrimaryIdentity: BASE_URL + 'customerImageDetails/primaryId/',
  // My Beneficiary
  getBeneficiary: BASE_URL + 'agentBeneficiaryDetails/agentBeneficiaryFilter/', //+Email
  updateAgentBeneficiaryDetails: BASE_URL + 'agentBeneficiaryDetails/update',
  updateAgentBeneficiaryStatus:
    BASE_URL + 'agentBeneficiaryDetails/updateAgentBeneficiaryStatus/update', //+beneficiaryID
  nationality: BASE_URL + 'nationality/',
  CountryCode: BASE_URL + 'countryCode/',
  clientCurrency: BASE_URL + 'clientCurrency/MN',
  getAgentRecevingCurrency:
    BASE_URL + 'agentReceivingCurrency/getAllByExposableId/',
  checkIsBeneficiaryEditable:
    BASE_URL + 'agentTransaction/checkBeneficiaryEditable/', //+AgentbeneficiaryDetailsId
  agentBeneficiaryBankAccountStatus:
    BASE_URL + 'agentBeneficiaryBankAccounts/updateById', //+agentBeneficiaryBankAccountDetailsId
  saveAgentBeneficiaryDetails: BASE_URL + 'agentBeneficiaryDetails/save',
  addBank: BASE_URL + 'agentBanks/add', //ExposableId+countryId
  agentBeneficiryBankAccount:
    BASE_URL + 'agentBeneficiaryBankAccounts/getAllDetails', //+agentBeneficiaryDetailsId
  saveAgentBeneficiaryDetailsCoporate:
    BASE_URL + 'agentBeneficiaryDetails/save',
  agentReceivingCountries:
    BASE_URL + 'agentReceivingCountries/beneficiaryCountriesByCountryId', //+currencyID
  getBeneficiaryDetailsById: BASE_URL + 'agentBeneficiaryDetails/basic/details', //+agentBeneficiaryDetailsId
  getAgentSender: BASE_URL + 'agentSender/detailsForAgentCustomer',
  getAgentCountry: BASE_URL + 'agentReceivingCountries/beneficiaryCountries',
  isBeneficiaryEditable: BASE_URL + 'agentTransaction/checkBeneficiaryEditable',
  getBankDetailsByExposableId:
    BASE_URL + 'bankDetails/byExposableIdAndCountryId',
  //corporate Acoount
  getCountryCode: BASE_URL + 'countryCode/',
  getSignupCountries: BASE_URL + 'signupCountries/all/',
  getAllCompanyType: BASE_URL + 'companyType/getAllCompanyType',
  getContactRole: BASE_URL + 'contactRole/getAllContactRole',
  addNewCorporateSender: BASE_URL + 'AgentCooperateSender/add',
  checkCorporateSenderAvailable: BASE_URL + 'AgentCooperateSender/checkEmail',
  uploadSenderDocuments: BASE_URL + 'AgentCooperateSender/uploadDocs/',

  //tranferflow flow1
  getAgentExposableId: BASE_URL + 'agentDetails/getExposableId',
  sendingRecevingCurrency:
    BASE_URL + '/agentSendingReceivingCurrency/byCurrencyCode/',
  getPaymentModes: BASE_URL + '/agentPaymentMode/',
  getTransactionModes: BASE_URL + '/agentTransactionMode/',
  getAgentTransactionFee: BASE_URL + '/agentCurrencyRate/convertedAmount/',
  getAgentConfugreTransferFee: BASE_URL + '/agentConfiguredTransferFee/',
  saveTransferFlow: BASE_URL + 'transferFlowStep/save',
  updateTransferFlow: BASE_URL + 'transferFlowStep/update',

  //tranferflow flow2 (existing benificary)
  getagentReceivingCountriesByselctCountries:
    BASE_URL + '/agentReceivingCountries/byReceivingCurrenciesId/',
  agentSenderDetailsByCriteria:
    BASE_URL + '/agentSender/detailsForAgentCustomerByEmail/',
  getBeneficiaryByFilter:
    BASE_URL + 'agentBeneficiaryDetails/agentBeneficiaryFilter/',
  getRefferences: BASE_URL + '/reference/',
  getExistingBenificaryBankDetails:
    BASE_URL + '/agentBeneficiaryBankAccounts/getAll/',
  SaveNewBenificary: BASE_URL + '/agentBeneficiaryDetails/save',
  getAllCOuntryCodes: BASE_URL + '/countryCode/',
  getNationality: BASE_URL + '/nationality/',
  addNewBank: BASE_URL + '/agentBanks/add/',
  getAllExistingBankAccdetails:
    BASE_URL + '/agentBeneficiaryBankAccounts/getAll/',
  getAllBenificaryDetails: BASE_URL + '/agentBeneficiaryDetails/basic/details/',
  getBankDetailsExcisting: BASE_URL + '/bankDetails/byExposableIdAndCountryId/',
  getFinalTransactionData: BASE_URL + '/agentBanks/baseBankDetails/',

  //save transaction
  saveTransaction: BASE_URL + '/agentTransaction/addAgentTransaction',

  //my transaction
  getTableDataWithFilter: BASE_URL + '/agentTransaction/getFillter',
  getExposableId: BASE_URL + '/agentSender/getExposableIdByUsername', //---------------------------check kara
  agentSenderDetailsForCustomer:
    BASE_URL + '/agentSender/detailsForAgentCustomer/',
  getviewCustomerTransferDetails:
    BASE_URL + '/agentTransactionDetails/getUpdatedAgentTransactionDetails/',
  getAllNationality: BASE_URL + '/nationality/',
  getAllCountryCode: BASE_URL + '/countryCode/',
  getClientCurrency: BASE_URL + '/clientCurrency/MN',
  getAgentRecevingCountries:
    BASE_URL + '/agentReceivingCountries/byReceivingCurrenciesId/',
  checkBenifisaryEditable:
    BASE_URL + '/agentTransaction/checkBeneficiaryEditable/',
  checkBenificaryBankEditable:
    BASE_URL + '/agentBeneficiaryBankAccounts/checkBeneficiaryBankIsEditable/',
  updateBenificaryDetails: BASE_URL + '/agentBeneficiaryDetails/update',
  updateBenificaryBankDetials: BASE_URL + '/agentBanks/update/',
  agentBenifisaryDetails: BASE_URL + '/agentBeneficiaryDetails/',
  //meta-data
  getAllContactTitleNames:
    BASE_URL + 'contactTitleName/getAllContactTitleNames',
  countryCode: BASE_URL + 'countryCode/',

  //sign_up
  signUpStep1: BASE_URL + 'amlCore/customerDetails/save/saveBasicDetails',
  signUp: BASE_URL + 'user/addAgentCustomer/forSigunup/',
  checkRualRegistrationOfUser:
    BASE_URL + 'dualRegistration/checkRualRegistrationOfUser',
  signupDetails: BASE_URL + 'agentSender/signupDetails/',
  updateAgentJourneyId: BASE_URL + 'user/updateAgentJourneyId/',
};
