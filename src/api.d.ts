interface UUIDResponse {
  featured: boolean;
  id: string;
  hobsonsId: number;
  name: string;
  shortName: string;
  nickname?: any;
  alphaName: string;
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  longitude: number;
  latitude: number;
  url: string;
  sector: number;
  admissionsEmail: string;
  intlAdmissionsEmail: string;
  hobsonsExtProfile?: any;
  ssrRequired: number;
  teacherRecsRequired: number;
  initialTranscriptRequired: number;
  coreMapping: CoreMapping;
  addressLine2: string;
  uuid: string;
}

interface CoreMapping {
  uuid: string;
}

interface AppStatistics {
  scattergrams: Scattergrams;
  applicationStatistics: ApplicationStatistics;
  applicationsByYear: ApplicationsByYear;
  userInfo: UserInfo;
  peerGpaMap: PeerGpaMap[];
}

interface PeerGpaMap {
  highschoolId: string;
  upper13: number;
  upper12: number;
  upper11: number;
  upper10: number;
  upper9: number;
  upper8: number;
  upper7: number;
  upper6: number;
  upper5: number;
  upper4: number;
  upper3: number;
  upper2: number;
  upper1: number;
}

interface UserInfo {
  userId: number;
  academics: Academics;
}

interface Academics {
  gpa: number;
  weightedGpa: number;
  rawCumulativeGpa: number;
  rawWeightedGpa: number;
  sat: number;
  psat: number;
  act: number;
}

interface ApplicationsByYear {
  '2005': AppYear;
  '2006': AppYear;
  '2007': AppYear;
  '2008': AppYear;
  '2009': AppYear;
  '2010': AppYear;
  '2011': AppYear;
  '2012': AppYear;
  '2013': AppYear;
  '2014': AppYear;
  '2015': AppYear;
  '2016': AppYear;
  '2017': AppYear;
  '2018': AppYear;
  '2019': AppYear;
  '2020': AppYear;
  '2021': AppYear;
  '2022': AppYear;
}

interface AppYear {
  totalApplied: number;
  totalAccepted?: number;
  totalEnrolled?: number;
}

interface ApplicationStatistics {
  accepted: Accepted;
  enrolled: Accepted;
}

interface Accepted {
  act: Act2;
  sat: Sat;
  gpa: ActComposite;
  weightedGpa: ActComposite;
  gpaConverted: ActComposite;
  weightedGpaConverted: ActComposite;
}

interface Sat {
  satTotal: ActComposite;
  satMath: ActComposite;
  satReadingWriting: ActComposite;
}

interface Act2 {
  actComposite: ActComposite;
  actEnglish: ActComposite;
  actMath: ActComposite;
  actReading: ActComposite;
  actScience: ActComposite;
  actWriting: ActComposite;
}

interface ActComposite {
  '25': number;
  '75': number;
}

interface Scattergrams {
  gpa: Gpa;
  weightedGpa: Gpa;
}

interface Gpa {
  gpaCount: number;
  gpaSum: number;
  gpaAvg: number;
  gpaConvSum: number;
  gpaConvAvg: number;
  act: Act;
  sat: Act;
}

interface Act {
  count: number;
  sum: number;
  avg: number;
  gpaCount: number;
  gpaSum: number;
  gpaAvg: number;
  gpaConvSum: number;
  gpaConvAvg: number;
  apps: Apps;
}

interface Apps {
  denied: Denied[];
  waitlistedUnknown: WaitlistedUnknown[];
  accepted: WaitlistedUnknown[];
  waitlistedDenied: WaitlistedUnknown[];
}

interface WaitlistedUnknown {
  currentStudent: boolean;
  typeName: string;
  actComposite: number;
  actCompositeStudent: number;
  highestComboSat: number;
  studentSAT1600Composite: number;
  gpa: number;
}

interface Denied {
  currentStudent: boolean;
  typeName: string;
  actComposite: number;
  actCompositeStudent: number;
  highestComboSat: number;
  studentSAT1600Composite: number;
  gpa: number;
  highestComboSatWWConvertedTo1600?: number;
  studentSATCompositeConvertedTo1600?: number;
}

interface StatResponse {
  scid: number;
  virtualTour: boolean;
  logo?: any;
  name: string;
  fullProfile: FullProfile;
  ipedscode: string;
}

interface FullProfile {
  field_he_minors_ref?: any;
  scholarship_info: Scholarshipinfo;
  address: Address;
  sports: Sport[];
  housing: Housing;
  studentbody: Studentbody;
  undergraduate_admissions: Undergraduateadmissions;
  field_he_id: number;
  calc_he_has_virtual_tour: boolean;
  deadlines: Deadline2[];
  transfer_admissions: Transferadmissions;
  undergraduate_financial_aid: Undergraduatefinancialaid2;
  general: General2;
  student_organization: Studentorganization;
  majors: Major[];
  computing_environment: Computingenvironment;
  field_address_id: number;
  international_admissions: Internationaladmissions;
  special_service: Specialservice;
}

interface Specialservice {
  field_he_specialserviceid_ref: Fieldhespecialserviceidref;
  last_updated: string;
}

interface Fieldhespecialserviceidref {
  field_he_ld_programs: string;
  calc_he_studyabroad: boolean;
  he_special_services_id_ref: Hespecialservicesidref;
  field_he_specserv_id: number;
  he_special_service_us: Hespecialserviceus;
  field_he_counseling_services: boolean;
  calc_he_learning_differences_support: boolean;
  calc_he_tutoringservices: boolean;
}

interface Hespecialserviceus {
  field_he_teachercertpgms: boolean;
  field_he_weekendcollege: boolean;
  field_he_honorsprogram: boolean;
  field_he_combineddegreepgms: boolean;
  field_he_ldacceptspeduhscoursewo?: any;
  field_he_rotcair: boolean;
  field_he_ldnumstudents?: any;
  field_he_acceleratedprogram: boolean;
  field_he_ldnumappsaccepted?: any;
  field_he_domstudyawaypgms: boolean;
  field_he_ldnumappssubmitted?: any;
  field_he_internships: boolean;
  field_he_ldprogramname: string;
  field_he_weekendeveningpgms: boolean;
  field_he_specialservice_comments: string;
  field_he_rotcnavy: boolean;
  field_he_independentstudy: boolean;
  field_he_ldprogramcost?: any;
  field_he_ldspecialappreq?: any;
  field_he_doublemajor: boolean;
  field_he_externaldegreeprogram?: any;
  field_he_rotcarmy: boolean;
  field_he_ldessayreq?: any;
  calc_he_intern_coop: boolean;
  field_he_ldhowprofnotified: string;
  field_he_cooperativeedupgms: boolean;
  field_he_rotcservperoppcollege: boolean;
  field_he_ldprogaccepteqschaccept?: any;
}

interface Hespecialservicesidref {
  field_he_special_services_id_ref: Fieldhespecialservicesidref[];
}

interface Fieldhespecialservicesidref {
  name: string;
  field_he_service_type_us: string;
}

interface Internationaladmissions {
  field_he_intadmissions_ref: Fieldheintadmissionsref;
}

interface Fieldheintadmissionsref {
  he_international_admissions_us: Heinternationaladmissionsus;
  admission_general_us: Admissiongeneralus;
}

interface Admissiongeneralus {
  field_he_deposit: string;
  field_he_applications_received: string;
  field_he_applications_accepted: string;
  field_he_applicationfee: string;
  field_he_applications_enrolled: string;
  field_he_deadline: string;
}

interface Heinternationaladmissionsus {
  field_he_englishcompetencytestid: string[];
}

interface Computingenvironment {
  last_updated: string;
  field_he_comenvironment_ref: Fieldhecomenvironmentref;
}

interface Fieldhecomenvironmentref {
  field_he_prefered_computer_type?: any;
  field_he_internetinlibrary: boolean;
  field_he_internetinresidencehall: boolean;
  field_he_purchaseplanoffered?: any;
  field_he_pcsinother?: any;
  field_he_computerrequired?: any;
  field_he_pcsinlibrary: string;
  field_he_macsindepartmentlabs: string;
  field_he_pcsindepartmentlabs: string;
  field_he_computerrequiredreason?: any;
  field_he_internetincentralloc: boolean;
  field_he_macsinstudentcenters?: any;
  field_he_internetwireless: boolean;
  field_he_macsinother?: any;
  field_he_pcsincomputercenters: string;
  field_he_pcsinstudentcenters: string;
  field_he_macsincomputercen: string;
  field_he_pcsinresidences: string;
  field_he_macsinlibrary?: any;
  field_he_macsinresidences?: any;
}

interface Major {
  last_updated: string;
  field_he_nbrbachelorsaward_us?: string;
  field_he_nbrgradcertificaward_us?: string;
  field_he_schoolmajor_us_ref: Fieldheschoolmajorusref;
  field_he_bachelors_us: boolean;
  field_he_major_id: string;
  field_he_gradcertificates_us: boolean;
  field_he_school_id: string;
  field_he_nbrmastersawarded_us?: string;
  field_he_nbrdoctoratesawarded_us?: string;
  field_he_masters_us: boolean;
  field_he_nbrcertificatesaward_us?: string;
  field_he_diplomas_us: boolean;
  field_he_associates_us: boolean;
  field_he_doctorates_us: boolean;
  field_he_nbrassociatesaward_us?: string;
  field_he_certificates_us: boolean;
  field_he_nbrdiplomasaward_us?: string;
}

interface Fieldheschoolmajorusref {
  field_pr_majordata_id: number;
  pr_major: Prmajor;
  area_of_study: Areaofstudy;
}

interface Areaofstudy {
  field_pr_area_of_study: Fieldprareaofstudy;
}

interface Fieldprareaofstudy {
  field_pr_cip: number;
  field_pr_name_area_of_study: string;
  field_pr_areaofstudy_id: number;
  field_pr_description_aofs: string;
}

interface Prmajor {
  field_pr_major_description: string;
  field_pr_cip: number;
  field_pr_major_name: string;
}

interface Studentorganization {
  field_he_studentorg_id_ref: Fieldhestudentorgidref;
  last_updated: string;
}

interface Fieldhestudentorgidref {
  field_he_orgrepresented: Fieldheorgrepresented[];
  field_he_numsocialsor: number;
  field_he_numsocialfrat: number;
}

interface Fieldheorgrepresented {
  field_he_active: number;
  name: string;
}

interface General2 {
  last_updated: string;
  field_he_location: Fieldhelocation;
  field_he_coedstatus: string;
  field_he_nearestcity: string;
  field_he_religious_affiliation: string;
  field_he_institution_id: number;
  field_he_act_code: number;
  field_he_name: string;
  field_he_control_id: string;
  field_he_lgbt_rating: string;
  field_he_avg_class_size: number;
  field_is_starfish_client?: any;
  field_he_programsonline_id: string;
  field_he_level: string;
  field_he_ipedscode: string;
  field_he_nearestmajorcitymiles: number;
  field_he_city_size: string;
  field_is_intersect_client?: any;
  field_he_navianceid: string;
  field_hiid: string;
  field_he_missionstatement?: any;
}

interface Fieldhelocation {
  lon: number;
  lat: number;
}

interface Undergraduatefinancialaid2 {
  field_he_undergradfinaidid_ref: Fieldheundergradfinaididref;
  last_updated: string;
}

interface Fieldheundergradfinaididref {
  field_he_meets_full_fin_needs?: any;
  financial_aid_general: Financialaidgeneral;
  contact: Contact4;
  undergraduate_financial_aid: Undergraduatefinancialaid;
  field_he_feeyear: string;
}

interface Undergraduatefinancialaid {
  field_he_typicalroomboardcharge1: number;
  field_he_typicalroomcharge: number;
  field_he_typicalboardchargeplus1: number;
  field_he_instateflatfee: number;
  field_he_books: number;
  field_he_booksplus1yr: number;
  field_he_outofstatetuition: number;
  field_he_outofstateflatfeeplus1y: number;
  field_he_typicalboardcharge: number;
  field_he_typicalroomandboardchar: number;
  field_he_instatetuitionplus1yr: number;
  field_he_typicalroomchargeplus1y: number;
  field_he_instatetuition: number;
  field_he_outofstateflatfee: number;
  field_he_outofstatetuitionplus1y: number;
  field_he_percredithourchargeamnt: number;
  field_he_instateflatfeeplus1yr: number;
  field_he_percredithourfeeplus1yr: number;
}

interface Contact4 {
  field_he_finaidcontact_ref: Fieldhefinaidcontactref;
}

interface Fieldhefinaidcontactref {
  address: Address3;
  contact: Contact3;
  field_address_id: number;
}

interface Contact3 {
  field_firstname: string;
  field_jobtitle: string;
  field_middlename?: any;
  field_lastname: string;
  field_jobdescription?: any;
  field_nameprefix: string;
}

interface Address3 {
  field_emailaddress: string;
  field_addressline1: string;
  field_addressline2: string;
  field_url: string;
  field_country_ref: Fieldcountryref;
  field_postalcode: string;
  field_faxnumber: string;
  field_city: string;
  field_phonenumber: string;
  field_tollfreenumber?: any;
  field_state_ref: Fieldstateref2;
}

interface Financialaidgeneral {
  field_he_financial_profile: Fieldhefinancialprofile[];
}

interface Fieldhefinancialprofile {
  field_he_financialaidprofiletype: string;
  field_he_value?: string;
}

interface Transferadmissions {
  field_he_xfer_ref: Fieldhexferref;
  last_updated: string;
}

interface Fieldhexferref {
  general: General;
  student_data: Studentdata;
  contact: Contact2;
  deadlines: Deadlines;
  policies_and_requirements: Policiesandrequirements;
  financial_aid: Financialaid;
}

interface Financialaid {
  field_he_xfer_scholarships_avbl?: any;
  field_he_xfer_fin_aid_url?: any;
}

interface Policiesandrequirements {
  field_he_xfer_dual_admissions?: any;
  field_he_xfer_artic_sys?: any;
  field_he_xfer_credit_cap?: any;
  field_he_xfer_admissions_req?: any;
  field_he_xfer_artic_agr?: any;
  field_he_xfer_credit_info_url?: any;
  field_he_xfer_min_home_credits?: any;
  field_he_xfer_adm_policies?: any;
}

interface Deadlines {
  field_he_xfer_deadlines?: any;
}

interface Contact2 {
  field_he_xfer_c_phone?: any;
  field_he_xfer_c_email?: any;
}

interface Studentdata {
  field_he_xfer_ft_8yr_grad_rate: number;
  field_he_xfer_in_enrollment: number;
}

interface General {
  field_he_xfer_support_url?: any;
  field_he_xfer_overview?: any;
  field_he_xfer_sems_transfer?: any;
  field_he_xfer_info_url?: any;
}

interface Deadline2 {
  last_updated: string;
  deadline: Deadline;
}

interface Deadline {
  field_he_deadlinetype: string;
  field_he_typeotherdescription?: any;
  field_he_day_of_the_deadline: number;
  field_he_ca_term: string;
  field_he_month_of_the_deadline: number;
}

interface Undergraduateadmissions {
  last_updated: string;
  field_he_undergradadmission_ref: Fieldheundergradadmissionref;
}

interface Fieldheundergradadmissionref {
  undergraduate_admissions_us: Undergraduateadmissionsus;
  qualification_data: Qualificationdata;
  field_he_job_plcmnt_rt_less_6_mo?: any;
  field_he_job_plcmnt_rt_1_yr_gr?: any;
  test: Test;
  admission_general: Admissiongeneral;
  field_he_job_plcmnt_rt_less_1_yr?: any;
  app_address_ref: Appaddressref;
  high_school_prerequisites: Highschoolprerequisites;
  graduate_rate: Graduaterate;
  field_he_coalition_app_member: boolean;
  admission_factor_data: Admissionfactordata;
  admissions_contact: Admissionscontact;
  field_he_ib_credits: string;
  field_he_common_app_member: boolean;
  field_address_id: number;
}

interface Admissionscontact {
  field_he_admissions_contact_ref: Fieldheadmissionscontactref;
}

interface Fieldheadmissionscontactref {
  address: Address2;
  contact: Contact;
  field_address_id: number;
}

interface Contact {
  field_firstname: string;
  field_jobtitle: string;
  field_middlename: string;
  field_lastname: string;
  field_jobdescription?: any;
  field_nameprefix?: any;
}

interface Address2 {
  field_emailaddress: string;
  field_addressline1: string;
  field_addressline2?: any;
  field_url: string;
  field_country_ref: Fieldcountryref;
  field_postalcode: string;
  field_faxnumber: string;
  field_city: string;
  field_phonenumber: string;
  field_tollfreenumber?: any;
  field_state_ref: Fieldstateref2;
}

interface Admissionfactordata {
  field_he_admission_factor_data: Fieldheadmissionfactordatum[];
}

interface Fieldheadmissionfactordatum {
  field_he_admissionfactortype: string;
  field_he_importance?: string;
}

interface Graduaterate {
  field_he_gradratebachelors6yrs: number;
  field_he_gradratebachelors4yrs: number;
}

interface Highschoolprerequisites {
  field_he_highschoolprerequisites: Fieldhehighschoolprerequisite[];
}

interface Fieldhehighschoolprerequisite {
  field_he_yearsrecommended?: string;
  field_he_prerequisitetype: string;
  field_he_yearsrequired?: string;
}

interface Appaddressref {
  field_addressline1: string;
  field_emailaddress?: any;
  field_addressline2?: any;
  field_url: string;
  field_country_ref: Fieldcountryref;
  field_postalcode: string;
  field_faxnumber?: any;
  field_city: string;
  field_phonenumber?: any;
  field_tollfreenumber?: any;
  field_state_ref: Fieldstateref2;
}

interface Fieldstateref2 {
  field_site_id?: any;
  field_long_name: string;
  field_state_short_name: string;
  name: string;
  field_state_id: string;
  field_country_id_ref: Fieldcountryref;
}

interface Fieldcountryref {
  field_country_three_digit_code: string;
  field_country_uk_nationality?: any;
  field_country_shortname: string;
  field_country_threeletter_code: string;
  field_country_fullname: string;
  field_country_uk_mapping?: any;
  name: string;
  field_country_id: string;
}

interface Admissiongeneral {
  field_he_deposit: string;
  field_he_applications_received: string;
  field_he_applications_accepted: string;
  field_he_applicationfee: string;
}

interface Test {
  field_he_test_us: Fieldhetestus[];
}

interface Fieldhetestus {
  field_he_low?: string;
  field_he_high_score?: string;
  field_he_testgroup_id: string;
  field_he_average?: string;
  field_he_testtype_id: string;
}

interface Qualificationdata {
  field_he_qualification_data_us: Fieldhequalificationdataus[];
}

interface Fieldhequalificationdataus {
  field_he_requiredoptrecommend?: string;
  field_he_qualification_grouping: string;
  field_he_qualification_type: string;
}

interface Undergraduateadmissionsus {
  field_he_gpa_25th_percentile?: any;
  field_he_waitinglistused: boolean;
  field_he_transferapplicationfee: number;
  field_he_gpaaverage: number;
  field_he_retentionratefulltime: number;
  field_he_earlydecision?: any;
  field_he_gpa_75th_percentile?: any;
  field_he_ceebadvancedplacementid: string;
  field_he_clepsubjectplacement_id: string;
  field_he_registrationpolicy_id: string;
  field_he_notificationpolicy_id: string;
  field_he_testoptional: boolean;
  field_he_transferappdeposit: number;
  field_he_intlbaccalaureateplcmid: string;
  field_he_apcredit: boolean;
  field_he_clepcredit: boolean;
  field_he_admissionspolicy_id: string[];
}

interface Studentbody {
  last_updated: string;
  field_he_studentbodyid_ref: Fieldhestudentbodyidref;
}

interface Fieldhestudentbodyidref {
  field_he_pcthispanic: number;
  field_he_studentfacultyratio: number;
  field_he_popularareaofstudy5: string;
  field_he_numgradfemales: number;
  field_he_popularareaofstudy1: string;
  field_he_pctraceunknown: number;
  field_he_popularareaofstudy2: string;
  field_he_popularareaofstudy3: string;
  calc_he_undergraduatesize: number;
  field_he_popularareaofstudy4: string;
  field_he_pctcaucasian: number;
  field_he_pctliveoncamp: number;
  field_he_pctoutofstate: number;
  field_he_pctasian: number;
  field_he_pctinternational: number;
  field_he_numugmales: number;
  field_he_pcttwoormoreraces: number;
  field_he_numugfemales: number;
  field_he_pctnativepacificisland: number;
  field_he_pctnonresidentalien: number;
  field_he_pctafricanam: number;
  field_he_pctstudentsgt24yrsold: number;
  field_he_numgradmales: number;
  field_he_pctnativeam: number;
}

interface Housing {
  last_updated: string;
  field_he_housing_ref: Fieldhehousingref;
}

interface Fieldhehousingref {
  field_he_sophomoresmustliveoncam?: any;
  field_he_freshmenmustliveoncampu?: any;
  field_he_camphouscap: number;
  field_he_seniorsmustliveoncampus?: any;
  field_he_juniorsmustliveoncampus?: any;
}

interface Sport {
  he_school_sport_us: Heschoolsportus;
  last_updated: string;
}

interface Heschoolsportus {
  field_he_confcoed_id?: any;
  field_he_sport_name: string;
  field_he_intramuralmen: boolean;
  field_he_assoccoed_id?: any;
  field_he_divwomen_id?: string;
  field_he_clubcoed: boolean;
  field_he_confmen_id?: string;
  field_he_divcoed_id?: any;
  field_he_intramuralcoed: boolean;
  field_he_intramuralwomen: boolean;
  field_he_assocwomen_id?: string;
  field_he_divmen_id?: string;
  field_he_clubwomen: boolean;
  field_he_assocmen_id?: string;
  field_he_confwomen_id?: string;
  field_he_clubmen: boolean;
}

interface Address {
  field_url: string;
  field_postalcode: string;
  field_city: string;
  field_state_ref: Fieldstateref;
}

interface Fieldstateref {
  field_long_name: string;
  field_state_short_name: string;
}

interface Scholarshipinfo {
  last_updated: string;
}
